
# API documentation

API: https://gitrepo2.onrender.com
Check out docs at: https://gitrepo2.onrender.com/docs

### `/ping`
- Method: `GET`
- Description: Endpoint to check if server is up and running
- Responses:
    - 200: `{'ping': 'pong'}`
    
### `/users/{username}`
- Method: `GET`
- Description: Endpoint to fetch the user details.
- Path Parameters:
    - `username`: The username of the user whose details you want to fetch
- Responses:
    - 200:
        ```
        {
            'login': 'username',
            'bio': 'user bio',
            'location': 'user location',
            'twitter_username': 'username',
            'blog': 'user blog url',
            'repos_url': 'url',
            'avatar_url': 'avatar url'
        }
        ```
    - 404: `{'detail': 'User not found'}`
    - 500: `{'detail': 'Server Error'}`

### `/users/{username}/repos`
- Method: `GET`
- Description: Endpoint to fetch the user repositories
- Path Parameters:
    - `username`: The username of the user whose repositories you want to fetch
- Responses:
    - 200:
    ```
    [
        {
            'name': 'Repo name',
            'stargazers_count': 123,
            'topics': ['topic1', 'topic2', ...],
            'description': 'Repo description',
            'html_url': 'html url',
            'language': 'language',
            'open_issues_count': 123,
            'forks_count': 123,
            'watchers': 123
        },
        ...
    ]
    ```
    - 404: `{'detail': 'User not found'}`
    - 500: `{'detail': 'Server Error'}`


