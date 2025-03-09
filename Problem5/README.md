# Project Setup and API Usage Guide

## Installation and Running the Project

### 1. Install Dependencies
Run the following command to install all required dependencies:
```sh
npm install
```

### 2. Start the Project
Start the development server with:
```sh
npm run dev
```

The application will run on `http://localhost:3000` by default.

## API Endpoints

### 1. Create a New Record
```sh
curl --location 'http://localhost:3000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstname": "Anh", 
    "lastname": "Nguyen", 
    "email": "anhnguyen@example.com",
    "age": 33,
    "avatar": "abc.png",
    "status": "active",
    "password": "1323445"
}'
```

### 2. Get a List of Records with Filters
```sh
curl --location 'http://localhost:3000/users?firstname=giang'
```

### 3. Get Record Details
```sh
curl --location 'http://localhost:3000/users/34cd57b3-c509-4580-a20b-267103ed57c2'
```

### 4. Update a Record
```sh
curl --location --request PUT 'http://localhost:3000/users/34cd57b3-c509-4580-a20b-267103ed57c5' \
--header 'Content-Type: application/json' \
--data '{
    "firstname": "Lam", 
    "lastname": "Nguyen"
}'
```

### 5. Delete a Record
```sh
curl --location --request DELETE 'http://localhost:3000/users/34cd57b3-c509-4580-a20b-267103ed57c2' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "John Doe", 
    "email": "john@example.com"
}'
```

## Notes
- Ensure the server is running before making API requests.
- Update the URLs and record IDs based on your actual data.
- Use tools like **Postman**, **Thunder Client**, or **REST Client** in VS Code for testing API requests.
