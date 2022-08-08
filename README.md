
## Introduction

*Bird-App-Social-Media* : A working social media app like twitter based on React, JavaScript and localStorage. 

*Using React concepts* : useState, useContext, useRef, useEffect, useNavigate, Routes, Link

*Implements the following requirements:* 
1. A landing page for the social media
2. A login page at `/login`
3. A registration page at `/register`
4. When the user registers a new account, the details of user is stored in `localStorage`. `localStorage` has a key called "allUsers" and value as a JSON stringified array of `username` and `password` of all users.
    Example of what object stored in `localStorage`:
            ```
            [{
                username: 'admin',
                password: '123'
            }, {
                username: 'john',
                password: '456'
            }]
            ```
5. Basic validation to the registration: Usernames allowed are unique, alphanumeric only. Passwords validation includes 1 uppercase, 1 lowercase, 1 digit and minimum 6 characters
6. When a user logs in, iterates on this key and figures out if `allUsers` contains the user. If yes, checks if username and password matches. If they match, redirects the user to `/dashboard` screen.
7. Stores logged in user's username inside localStorage too. Uses `loggedIn` as the key and the username of the user logged in as the value.
8. The dashboard loads feed from all the users. This feed is also stored in `localStorage` as `feed` as the localStorage key, and the following structure as the value: 
        ```
        [{
            postID: '', // a unique post ID
            contents: '', // contents of the post
            postAuthor: '', // username of the author of the post
            createdOn: 0, // a unix timestamp (stored in seconds) of the time it was created
            updatedOn: 0, // a unix timestamp (stored in seconds) of time it was updated
        }]
        ```
9. Whenever a user creates a new post, it is added into the localStorage key `feed` as an individual post.
10. All posts inside `feed` localStorage are visible to everyone in random order who create an account and visits `/dashboard`
11. Only the post author will see the option to edit or delete the post.
12. Only the post author can edit and delete the post.

