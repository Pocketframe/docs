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
composer create-project pocketframe/application demo-app --stability dev
```

## Set Up Environment

Copy the `.env.example` to `.env` and configure your environment variables.

After adding your `.env` file, you can use the following command to generate an encryption key for your application:

```bash
php pocket add:key
```

## Run Your Server

To start the development server, run the following command:

```bash
php pocket serve
```
