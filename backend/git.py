from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, validator
from typing import List
import json
import requests
from fastapi.middleware.cors import CORSMiddleware
origins = ["*"]
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    login: str
    bio: str = None
    location: str = None
    twitter_username: str = None
    blog: str = None
    repos_url: str
    avatar_url: str
    
    @validator("bio")
    def bio_default(cls, value):
        return value or ""

    @validator("location")
    def location_default(cls, value):
        return value or ""
    
    @validator("twitter_username")
    def twitter_default(cls, value):
        return value or ""
    
    @validator("blog")
    def blog_default(cls, value):
        return value or ""

class Repo(BaseModel):
    name: str
    stargazers_count: int
    topics: List[str] = None
    description: str=None
    html_url: str
    language: str = None
    open_issues_count: int
    forks_count: int
    watchers: int

    @validator("language")
    def language_default(cls, value):
        return value or ""
    
    @validator("topics")
    def topics_default(cls, value):
        return value or []
    
    @validator("description")
    def description_default(cls, value):
        return value or ""

@app.get("/users/{username}")
async def read_user(username: str):
    url = f"https://api.github.com/users/{username}"
    
    response = requests.get(url)
    if response.status_code == 200:
        data = json.loads(response.text)
        return User(**data)
    elif response.status_code == 404:
        raise HTTPException(status_code=404, detail="User not found")
    else:
        raise HTTPException(status_code=500, detail="Server Error")

@app.get("/users/{username}/repos")
async def read_user_repos(username: str):
    url = f"https://api.github.com/users/{username}/repos"
    response = requests.get(url)
    if response.status_code == 200:
        data = json.loads(response.text)
        return [Repo(**repo) for repo in data]
    elif response.status_code == 404:
        raise HTTPException(status_code=404, detail="User not found")
    else:
        raise HTTPException(status_code=500, detail="Server Error")
