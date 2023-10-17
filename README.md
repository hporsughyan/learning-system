# Learning System

## Description

The Learning System is a hierarchical learning platform designed to gauge the depth of understanding of various topics through a tree structure of questions and sub-questions. This system allows students to navigate through primary questions, sub-questions, and answers while tracking their progress and understanding of a given topic.

## Features

- Administrator capabilities for managing topics, questions, and answers.
- Tree-like structure for organizing questions and sub-questions.
- Student interaction for answering questions and unlocking deeper layers.
- Scoring mechanism to calculate the depth of understanding.

## Getting Started

These instructions will help you set up and run the Learning System on your local machine.

### Prerequisites

- Node.js and npm installed.
- PostgreSQL database set up with appropriate tables.

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/hporsughyan/learning-system.git
   cd learning-system
   ```

2. Install the project dependencies:

   ```bash
   npm install
   ```

3. Configure the database connection in the `database.ts` file.

4. Initialize the database schema and tables.


### Usage

1. Start the application:

   ```bash
   npm start
   ```

2. Access the Learning System at `http://localhost:3000`.

### API Endpoints

- `POST /topics`: Create a new topic.
- `GET /topics/:id/primary-questions`: Retrieve primary questions for a topic.
- `GET /questions/:id/sub-questions`: Retrieve sub-questions for a primary question.
- `GET /questions/:id/answers`: Retrieve answers for a question.

### Tests

Run unit tests with:

```bash
npm test
```

## Built With

- Node.js
- Express.js
- PostgreSQL
- Mocha and Chai (for testing)
