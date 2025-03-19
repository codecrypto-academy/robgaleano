# Docker Database Engine Connections with TypeScript

This repository contains working examples of connecting to various database engines running in Docker containers using TypeScript. The project demonstrates how to set up, configure, and interact with different database systems in a containerized environment.

## Purpose

The main goal of this repository is to provide practical examples for developers who want to:

- Learn how to connect to different database engines from TypeScript applications
- Understand Docker containerization for database systems
- Implement database operations using modern TypeScript patterns
- Compare different database technologies in a consistent environment

## Technologies Used

### Core Technologies

- **TypeScript**: Strongly-typed language built on JavaScript that provides better tooling at any scale
- **Node.js**: JavaScript runtime for executing server-side code
- **Docker**: Containerization platform for creating, deploying, and running applications in isolated environments
- **Docker Compose**: Tool for defining and running multi-container Docker applications

### Database Engines

The repository includes examples for connecting to and working with:

- **PostgreSQL**: Advanced open-source relational database
- **MySQL/MariaDB**: Popular open-source relational database management system
- **Oracle**: Enterprise-grade relational database management system
- **SQL Server**: Microsoft's enterprise relational database management system

### Libraries

- **pg**: Non-blocking PostgreSQL client for Node.js
- **mysql2**: MySQL client for Node.js with focus on performance
- **oracledb**: Oracle Database driver for Node.js
- **mssql**: SQL Server client for Node.js

## Project Structure

Each database example is organized in its own connections directory and follows a consistent pattern:

- Connection setup and configuration
- Query execution examples
- Error handling

## Getting Started

1. Clone the repository
2. Make sure Docker and Docker Compose are installed on your machine
3. Install dependencies with `npm install`
4. Run `yarn docker:run-<database-name>` to start the database container
5. Run the specific sql script for the desired database
5. Run the example with `yarn start:<database-name>`

## Examples Included

- Basic connection establishment
- Data querying examples
- Connection pooling configurations
- Error handling patterns

## Requirements

- Node.js (v22+)
- Docker
- TypeScript (v5.8+)
- Yarn

## Contributing

Contributions are welcome! If you'd like to add examples for other database engines or improve existing ones, please open a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.