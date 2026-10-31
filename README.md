# Expense Tracker with CI/CD

## Project Description

Expense Tracker is a web application that helps users record income
and expenses, view their balance, and manage transaction history.

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- GitHub Actions
- GitHub Pages

## Features

- Add income transactions
- Add expense transactions
- Categorize transactions
- Calculate total income
- Calculate total expenses
- Display remaining balance
- Delete transactions
- Save transaction data in browser local storage
- Run automated tests
- Automatically deploy the website using GitHub Actions

## Automated Testing

The project uses Node.js's built-in test runner.

Run the tests locally with:

npm test

## CI/CD Pipeline

Whenever code is pushed to the main branch:

1. GitHub Actions checks out the repository.
2. Node.js is configured.
3. Required files are checked.
4. Automated tests are executed.
5. The website is uploaded as a Pages artifact.
6. GitHub Pages deploys the website if the tests pass.

## Deployment

The website is deployed using GitHub Pages.

## Author

Expense Tracker CI/CD Mini Project
