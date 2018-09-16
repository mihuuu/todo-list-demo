## Todo List Demo

This project build a simple Todo List Application. 

What I do is developing the frontend & backend separately, then fetch REST APIs.

The following development tools are involved:

* **React (create-react-app)**: frontend framework
* **Django Restful Framework**: provide web API
* **MySQL**: connect to backend
* **Material UI**: provide UI components

<br>

### Run the project

The project is based on local host

For React, use `npm start` on `localhost:3000`

For Django, use `python manage.py runserver` on `http://127.0.0.1:8000`

Then you can test the demo on React app :)

<br>

## Features

#### 1. Add Todo

![add_todo](https://i.loli.net/2018/09/16/5b9e67f2880c9.gif)

<br>

#### 2. Mark Item

![mark_item](https://i.loli.net/2018/09/16/5b9e6a4fc6973.gif)

<br>

#### 3. Edit Content

![edit_content](https://i.loli.net/2018/09/16/5b9e6ab4b4b9c.gif)

<br>

#### 4. Delete Item

![edit_content](https://i.loli.net/2018/09/16/5b9e6b0cca0c9.gif)

<br>

#### 5. Set Priority

![edit_content](https://i.loli.net/2018/09/16/5b9e6b361f469.gif)

<br>

<br>

### To be improved

There are some features I haven't finished:

* Set the expiration date: I've made the entry but seem to have trouble with the transfer of date
* Sort items according to the priority or expiration date: haven't made the UI component
* configure urls with React Router
* deploy the application on the web server