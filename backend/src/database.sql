-- NOTE: PostgreSQL commands for creating finocular database
CREATE DATABASE finocular_db;

CREATE TYPE transaction_type AS ENUM ('revenue', 'expense');

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