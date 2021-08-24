# Todo List

This is a simple Todo List web app written in Node & React.

## How do I run it?

You can either use Docker or just start the server and client manually.

#### Docker

Run `docker-compose up` in the project root. (Add `-d` if you want to run it in the background)

#### Manually

Run `yarn install` in both `./client` and `./server`. Run `yarn dev` or `yarn start` in `./server` and `yarn start` in `./client`.

## Overview

### Client

The client based on CRA + TS and uses the following libs:

#### Styling & UI
- styled-components
- Blueprint

#### State & Data management
- react-query

#### Testing
- react-testing-library
- jest
- nock

### Server

The server is an Express server which exposes a REST API for managing todos.