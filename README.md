# Project Title

This project is a simple web application that allows users to search for Github repositories of a particular user.
The site is hosted at https://ipriyam26.github.io/Git-Repos/ and the api at https://gitrepo2.onrender.com

## Features

- User can search for Github repositories of a particular user
- Displays the repositories in a grid layout
- Displays the top 3 topics for each repository
- Displays the number of stars, forks and open issues for each repository
- Pagination support for repositories
- Responsive design for all screen sizes
- Twitter link for the user if available
- Show a random abstract art for the repository

## Screenshots

![Homepage](image_url)
![Search Results](image_url)

## Built With

- Angular
- Tailwind CSS
- Github REST API
- Unsplash API

## Requirements

- Node
- Angular CLI


## Running the project locally

1. Clone the repository by running `git clone https://github.com/ipriyam26/Git-Repos.git`
2. Navigate to the project directory `cd Git-Repos`
3. Install the dependencies by running `npm install`
5. Run `ng serve` to start the development server
6. Navigate to `http://localhost:4200/` in your browser

## Deployment

The project is deployed on GitHub Pages. Here is how it is done:

1. Run `ng build --prod`
2. Run `npx ngh --dir=dist/git-repos`


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


## Authors

- [Priyam](https://github.com/ipriyam26)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

