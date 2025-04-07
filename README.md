
# Todo List Application

A full-stack Todo List application built with React for the frontend and Node.js with SQLite for the backend. The application features user authentication and comprehensive todo management capabilities.

## Repository

[GitHub Repository](https://github.com/Oscarpoco/to-do-list-app/tree/master)

## Features

- **User Authentication**
  - Account registration

- **Todo Management**
  - Create, read, update, and delete todos
  - Add detailed descriptions
  - Set due dates for tasks
  - Assign priority levels (low, medium, high)
  - Mark todos as completed

## Tech Stack

### Frontend
- React.js
- React Hooks for state management
- Fetch API for HTTP requests

### Backend
- Node.js
- Express.js
- SQLite (in-memory database)

## Project Structure

```
to-do-list-app/
├── src/
│   ├── SQLjs/
│   │   └── sql.js              # SQLite database integration file
│   ├── components/             # React components
│   ├── App.js                  # Main application component
│   ├── index.js                # Entry point
│   ├── package.json            # Project dependencies
│   └── ...
├── README.md                   # Project documentation
└── ...
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher) or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Oscarpoco/to-do-list-app.git
cd to-do-list-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. The application will be available at `http://localhost:3000`

## Backend API

The backend server operates on port 5000 and need to be ran:

```bash
cd src/SQLjs
node sql.js
```

## Usage

1. Register a new account or login with existing credentials
2. Add new todos using the "Add Todo" form
3. View your todos in the main list
4. Mark todos as completed by clicking the checkbox
5. Edit or delete todos using the respective buttons
6. Filter todos by status, priority, or due date (if implemented)

## Development

### Running the Backend Separately

```bash
node sql.js
```



## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## Author

Oscar Poco - [GitHub Profile](https://github.com/Oscarpoco)

## Acknowledgments

- React documentation
- SQLite documentation
- Express.js documentation
