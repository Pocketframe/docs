---
sidebar_position: 2
---

# Getting Started

Pocketframe is a lightweight yet powerful PHP framework designed for building modern web applications. This section will help you get up and running with your first Pocketframe application.

## Prerequisites

Before you begin, ensure you have:
- PHP 8.1 or higher installed
- Composer package manager
- Basic understanding of PHP and MVC patterns

## Installation

To install Pocketframe, you need to have PHP and Composer installed on your system. If you don't have them installed, you can download them from the official websites:
- [PHP](https://www.php.net/downloads.php)
- [Composer](https://getcomposer.org/download/)

Once you have PHP and Composer installed, you can install Pocketframe installer using Composer:
```bash
composer global require pocketframe/installer
```
After installing the installer, you will be able to create a new Pocketframe project. You must ensure that composer is in your system path for you to access the pocketframe installer. You can check if composer is in your system path by running the following command:
```bash
composer global about
```

## Creating a New Project

To create a new Pocketframe project, run the following command in your terminal:

```bash
pocketframe new example-project
```

This will create a new directory called `example-project` with the basic structure of a Pocketframe application and install all dependencies.

During the installation, you will be prompted whether to create a database or not.

If you choose to create a database, the installer will take you to database setup and you will have the following options:

- Create new database
- Use existing database
- Skip database setup

## Database Setup

If you choose to create a new database or use an existing database, you will be prompted to select database type which include

- MySQL
- PostgreSQL

After selecting the database type, you will be prompted to provide the following information:

- Database name
- Database username
- Database password
- Database host
- Database port

After providing the database information, the installer will create the database and set up the necessary tables.

Besides database setup, the installer will also create a `.env` file in the root directory of your project and add app name, generate app key and add database configuration that was provided.

:::note
If you manually create or clone the project from git, you will need to add `.env` file manually and run the command below to generate the app key:
```bash
php pocket add:key
```
:::

## Finishing Installation

The installer will finish by prompting you to add the project to git and configure docker into your project.

## Run Your Server

To start the development server, run the following command:

```bash
php pocket serve
```

This will start a development server that will run on `http://localhost:8000`.


## Project Structure
The project structure is as follows:
```
example-project/
├── app/
│   ├── Controllers/
│   ├── Actions/
│   ├── Container/
│   ├── Entities
|   ├── Services/
|   ├── helpers.php
├── config/
├── database/
|   ├── blueprints/
|   ├── planters/
|   ├── schemas/
├── public/
├── resources/
|   ├── views/
├── routes/
├── store/
|   ├── framework/
|   |   ├── app/
|   |   ├── views/
|   ├── logs/
├── tests/
├── vendor/
├── .env
├── bootstrap.php
├── index.php
├── pocket
```

### app/
The `app` directory contains the core application files. It includes the following directories:
- `Controllers`: Contains the controller classes.
- `Actions`: Contains the action classes.
- `Container`: Contains the container classes.
- `Entities`: Contains the entity classes.
- `Services`: Contains the service classes.
- `helpers.php`: Contains the helper functions.

### config/
The `config` directory contains all the configuration files for your application.

### database/
The `database` directory contains your database related files:
- `blueprints`: Contains your database blueprint files.
- `planters`: Contains your database seeder files.
- `schemas`: Contains your database schema files.

### public/
The `public` directory contains the entry point for your application and assets.

### resources/
The `resources` directory contains your application resources:
- `views`: Contains your application view files.

### routes/
The `routes` directory contains all your route definitions.

### store/
The `store` directory contains application generated files:
- `framework/app`: Contains framework generated cache files.
- `framework/views`: Contains framework generated view files.
- `logs`: Contains application log files.

### tests/
The `tests` directory contains your application tests.

### vendor/
The `vendor` directory contains your Composer dependencies.

### Root Files
- `.env`: Contains environment variables.
- `bootstrap.php`: The application bootstrap file.
- `index.php`: The application entry point.
- `pocket`: The CLI application file.

## Next Steps

After starting the development server, you can start building your application.

