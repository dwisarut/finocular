# Finocular - Integrated OCR Expense Tracker with Dashboard

<img width="1662" height="880" alt="finocular" src="https://github.com/user-attachments/assets/edc5e5d8-4404-4c0b-85e8-da5515275461" />

Finocular is an expense tracker that records your transactions, but also visualize your cashflow in line charts and donut charts. Furthermore, with OCR (Optical Character Recognition) integrated in the form, easing up the
recording procedure.

## Features

- **Data visualization** - Dashboard containing visualization of your revenue, expense, and category of your transactions
- **Ledger book** - Table that record your list of transactions, included type, date, sender name, recipient name, category of transaction, and amount of each transaction
- **OCR autofill form** - Data form that handling image input with OCR with specific bounding box, capturing receipt from different provider 

## Getting started

1. Clone this repository
```
git clone https://github.com/dwisarut/finocular.git
cd finocular
```
2. Install dependencies
Installing all depedencies for frontend, then install it in backend
```
npm install
cd backend
npm install
```
3. Environment setup
This one is require you to adjust on your own, as secrets and API key are not publicly shared.
```
DB_USER='postgres'
DB_PASSWORD=
DB_PORT=
```
4. PostgreSQL setup
Required you to installed PostgreSQL, and input the following commands to psql terminal.
```
CREATE DATABASE finocular_db;
```
```
CREATE TYPE transaction_type AS ENUM ('revenue', 'expense');
```
```
CREATE TYPE transaction_category AS ENUM (
    'income',
    'saving_investment',
    'shopping',
    'entertainment',
    'billing',
    'drinking_food',
    'vacation',
    'other'
);
```
```
CREATE TABLE
    transaction (
        id SERIAL PRIMARY KEY,
        type transaction_type NOT NULL,
        date TIMESTAMPTZ NOT NULL,
        sender TEXT NOT NULL,
        recipient TEXT NOT NULL,
        category transaction_category NOT NULL,
        amount NUMERIC(12, 2) NOT NULL
    );
```
5. Run this project
```
npm run dev
```

## Limitation
The OCR that uses for capturing receipt character is limited to ttb mobile banking receipt, the source code are using bounding box to limit the area of detection. In order to
adjust for each banking, you must create a specific bounding box parameters to detect your receipt.
