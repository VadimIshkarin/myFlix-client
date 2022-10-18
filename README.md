# MyFlixDB

### Screenshots of the app:

### Main view:

  <img src="/img/myflixdb.png" alt="Alt text" style="display: inline-block; margin: 0 auto; max-width: 800px">

### Single Movie view:

  <img src="/img/myflixdb1.png" alt="Alt text" style="display: inline-block; margin: 0 auto; max-width: 800px">

### Profile view (and list of added favorite movies):

  <img src="/img/myflixdb2.png" alt="Alt text" style="display: inline-block; margin: 0 auto; max-width: 800px">

### Login view:

  <img src="/img/myflixdblogin.png" alt="Alt text" style="display: inline-block; margin: 0 auto; max-width: 800px">

### Registration view:

  <img src="/img/myflixdbreg.png" alt="Alt text" style="display: inline-block; margin: 0 auto; max-width: 800px">

## Overview

This is a client-side of a movie database app called MyFlixDB. It fetches data from its server-side (movie-API). It allows users to search for and save information about different movies, directors, and genres. Users will also be able to register, update their personal information, and create a list of their favorite movies.

A user needs to create an account to register/to access the full features of MyFlixDB app.

## Essential Views and Features:

### Login view

- Allows users to log in with a username and password

### Registration view

- Allows new users to register (username, password, email, birthday)

### Main view

- Returns a list of ALL movies to the user (each listed item with an image, title, and release year)
- Sorting and filtering
- Ability to select a movie for more details

### Single Movie view

- Returns data (image, title, release year, description, genre, director, actors) about a single movie to the user.
- Allows users to add a movie to their list of favorites
- Allow users to move to director and genre view

### Director view

- Returns data about a director's name, bio and birthday.

### Genre view

- Returns data about a genre, with a name and description.

### Profile view

- Allows users to update their user info (username, password, email, date of birth)
- Allows existing users to deregister
- Displays user's favorite movies
- Allows users to remove a movie from their list of favorites

## Technical Features:

- It is a single-page application (SPA)
- It uses state routing to navigate between views and share URLs
- It gives users the option to filter movies
- It initially uses Parcel as its build tool
- React Redux is written using the React library and React Redux
- It uses React Bootstrap as a UI library for styling and responsiveness
- It contains a mix of class components and function components
- It is hosted online

## Dependencies:

- React
- React-bootstrap
- React-dom
- React-redux
- React-router-dom
- Redux
- Axios
- Prop-types
- Redux-devtools-extension

---
