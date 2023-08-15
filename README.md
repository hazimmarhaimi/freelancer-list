# Freelancer List

The Freelancer List is a web application built using React and React-Bootstrap that allows you to manage a list of freelancers. It provides features to view, create, edit, and delete freelancers from the system. Additionally, the application supports filtering the list of freelancers based on various criteria.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoint](#api-endpoint)
- [Filtering](#filtering)
- [Pagination](#pagination)

## Features

- View the list of freelancers with their basic details such as ID, Username, Email, Phone Number, and Skillsets.
- Create new freelancers with mandatory fields including Username, Email, Phone Number, Skillsets, and Hobby.
- Edit existing freelancer details, update their information, and save changes.
- Delete freelancers from the list after a confirmation prompt.
- Filter freelancers based on different criteria such as ID, Username, Email, Phone Number, and Skillsets.
- View detailed information of a freelancer in a separate modal window.
- Pagination support for navigating through the list of freelancers.

## Prerequisites

Before running the application, make sure you have the following dependencies installed:

- Node.js: Ensure you have Node.js installed on your machine.

## Installation

1. Clone the repository to your local machine using `git clone https://github.com/hazimmarhaimi/freelancer-list.git`.
2. Navigate to the project directory using the terminal or command prompt.
3. Run `npm install` to install all the required dependencies.

## Usage

1. Start the development server by running `npm start` in the project directory.
2. The application will be accessible at `http://localhost:3002/` in your web browser.
3. The Freelancer List page displays a table of freelancers with basic information, including ID, Username, Email, Phone Number, and Skillsets.
4. Use the "Create" button (+ icon) to add a new freelancer. Fill in the required fields in the modal and click "Save."
5. To edit a freelancer, click the "Edit" button (pencil icon) in the Actions column of the table. Modify the freelancer's details in the modal and click "Update."
6. To delete a freelancer, click the "Delete" button (trash icon) in the Actions column of the table. Confirm the deletion in the prompt.
7. Use the search bar to filter freelancers based on different criteria (ID, Username, Email, Phone Number, and Skillsets).
8. Pagination buttons are available at the bottom of the table for navigating between pages.

## API Endpoint

The application fetches and interacts with the freelancer data through a RESTful API. The API endpoint is set in the `FreelancerList.js` file. Make sure to update the endpoint to your actual API URL in the `apiEndpoint` constant.

```jsx
const apiEndpoint = "http://YOUR_NEW_IP_ADDRESS/api/FreelancerData";
```

Replace `'YOUR_NEW_IP_ADDRESS'` with the actual IP address of your API server.

## Filtering

The application supports filtering the list of freelancers based on various criteria such as ID, Username, Email, Phone Number, and Skillsets. The filtering logic is implemented in the `handleFilterChange` and `handleGetFilter` functions in `FreelancerList.js`.

## Pagination

Pagination is implemented to display a limited number of freelancers per page. You can change the number of freelancers displayed per page by modifying the `itemsPerPage` constant in `FreelancerList.js`.

```jsx
const itemsPerPage = 5; // Number of items to display per page
```
