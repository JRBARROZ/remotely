# Remotely - Manage Yourself Anywhere ⏱️

Remotely is an application that aims to help in the transition from the traditional to the remote work model.
With the pandemic, several employees had to adapt to work in a completely new way, this caused a big mess in their routine. With a focus on that, we thought about Remotely, which is a project where we seek to help improve the control of the activities performed, communication between teams and the control of working hours, which is one of the most affected points during and after the pandemic.

Follow the instructions below to execute our project :D .
> if you want to select a section.

- [Requirements](#Requirements)
- [Features](#Features)
- [Execution](#Execution)
- [Tools](#Tools)
- [Team](#Team)

### Clone
- Clone the repository in your computer : ```git clone https://github.com/JRBARROZ/remotely.git```
### Requirements

- Laravel 8 [Official website](https://laravel.com/docs/8.x/installation)
- PHP 7.4 [Official website](https://www.php.net/downloads.php)
- VueJs 3 [Official website](https://v3.vuejs.org/guide/installation.html)
- Mysql Server

### Features

- Live chat
- Task timer
- To do list

### Execution

To run our project, you need to clone our repository and must have installed the softwares listed on [Requirements](#Requirements) session
Once you have the environment ready, open the project's folder on a terminal and follow the instructions below:

_**Installing dependencies (Frontend)**_

 _``cd frontend``_
 
 using yarn: _``yarn``_
 
 using npm: _``npm install``_
 
**_Running the frontend_**

 using yarn: _``yarn serve``_
 
 using npm: _``npm run serve``_
 
 _**Installing dependencies (Backend)**_

On root directory, run de following commands:

``cd laravel-jwt-auth``

``composer install``

You must configure your `.env file`. To do this, create a copy of the `.env.example` file and rename it to `.env`

In this file, you will set the database informations and SMTP configuration as well

e.g.

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_api
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
```
and

```
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_mail
MAIL_PASSWORD=mail_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=mail_from_address (e.g. remotely@gmail.com)
MAIL_FROM_NAME="${APP_NAME}"
```

At this point, you already have the dependencies installed and the `.env` file configured

Now, let's get the environment ready to run. To do this, run the following commands on `laravel-jwt-auth` directory:

`php artisan key:generate`

`php artisan jwt:secret`

Setting the database:

`php artisan migrate`

Now your environment is ready. To start the server, run `php artisan serve`


## Tools

- [Laravel](https://laravel.com/) - PHP Framework
- [Vue.js](https://vuejs.org/) - Javascript Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework

## Team

| <a href="https://github.com/JRBARROZ" target="_blank">JRBARROZ</a> | <a href="https://github.com/ArthurViniciusE" target="_blank">ArthurViniciusE</a> | <a href="https://github.com/bertonnipaz" target="_blank">bertonnipaz</a> | <a href="https://github.com/fabiomrtins" target="_blank">fabiomrtins</a> |
| :---: |:---:| :---:| :---:|
| [![Murielson](https://avatars0.githubusercontent.com/u/40250320?s=460&v=4)](https://github.com/JRBARROZ)    | [![ArthurViniciusE](https://avatars.githubusercontent.com/u/43966598?s=400&u=b13fc6fc701d736fca69e7a24d24d6870991a27d&v=4)](https://github.com/ArthurViniciusE) | [![bertonnipaz](https://avatars.githubusercontent.com/u/15380309?s=400&v=4)](https://github.com/bertonnipaz) | [![fabiomrtins](https://avatars.githubusercontent.com/u/72530039?s=300&v=4)](https://github.com/fabiomrtins) |
| <a href="https://github.com/JRBARROz" target="_blank">`github.com/JRBARROZ`</a> | <a href="https://github.com/ArthurViniciusE" target="_blank">`github.com/ArthurViniciusE`</a> | <a href="https://github.com/bertonnipaz" target="_blank">`github.com/bertonnipaz`</a> | <a href="https://github.com/fabiomrtins" target="_blank">`github.com/fabiomrtins`</a> |

