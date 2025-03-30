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

To install Pocketframe, you need to have PHP and Composer installed on your system.

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

### Database Setup

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

### Finish

The installer will finish by prompting you to add the project to git and configure docker into your project.

## Run Your Server

To start the development server, run the following command:

```bash
php pocket serve
```

This will start a development server that will run on `http://localhost:8000`.

## Next Steps

After starting the development server, you can start building your application.

