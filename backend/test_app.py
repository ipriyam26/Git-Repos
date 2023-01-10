import json
import pytest
from fastapi.testclient import TestClient
from git import app

client = TestClient(app)

def test_read_user_success():
    response = client.get("/users/octocat")
    assert response.status_code == 200
    data = json.loads(response.text)
    assert "login" in data
    assert "bio" in data
    assert "location" in data
    assert "twitter_username" in data
    assert "blog" in data
    assert "repos_url" in data
    assert "avatar_url" in data

def test_read_user_failure():
    response = client.get("/users/nonexistentuser")
    assert response.status_code == 404
    assert "User not found" in response.text
    
def test_read_user_repos_success():
    response = client.get("/users/octocat/repos")
    assert response.status_code == 200
    data = json.loads(response.text)
    assert "name" in data[0]
    assert "stargazers_count" in data[0]
    assert "topics" in data[0]
    assert "description" in data[0]
    assert "html_url" in data[0]
    assert "language" in data[0]
    assert "open_issues_count" in data[0]
    assert "forks_count" in data[0]
    assert "watchers" in data[0]
    
def test_read_user_repos_failure():
    response = client.get("/users/nonexistentuser/repos")
    assert response.status_code == 404
    assert "User not found" in response.text
