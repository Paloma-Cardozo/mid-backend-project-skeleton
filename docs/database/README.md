# Database Schema Documentation

## Overview

This project uses **PostgreSQL** with the following core entities for an events ticketing platform.

## Entity Relationship Diagram (ERD v1)

![ERD v1](<./ERD%20(v1).pdf>)

See the complete database schema design: [ERD v1](<./ERD%20(v1).pdf>)

## Core Entities

### `user` Table

Stores user account information:

- `id` (SERIAL PRIMARY KEY) - Unique identifier
- `name` (VARCHAR(255)) - User's full name
- `email` (VARCHAR(255) UNIQUE) - Email address (unique)
- `phone` (VARCHAR(255)) - Phone number
- `password_hash` (VARCHAR(255)) - Hashed password
- `created_at` (TIMESTAMP) - Account creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp

### `event` Table

Stores event details for the ticketing platform:

- `id` (SERIAL PRIMARY KEY) - Unique identifier
- `title` (VARCHAR(255) UNIQUE) - Event title (unique)
- `description` (TEXT) - Event description
- `event_date` (DATE) - Date of the event
- `event_time` (TIME) - Time of the event
- `venue` (VARCHAR(255)) - Event location/venue
- `price` (DECIMAL(10, 2)) - Ticket price
- `available_tickets` (INTEGER) - Number of available tickets
- `created_at` (TIMESTAMP) - Event creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp

## Database Files

- **Schema**: [`../../api/src/db/schema.sql`](../../api/src/db/schema.sql) - Table definitions with constraints
- **Seed Data**: [`../../api/src/db/seed.sql`](../../api/src/db/seed.sql) - Initial test data
- **Queries**: [`../../api/src/db/queries.sql`](../../api/src/db/queries.sql) - Core SQL queries

## Querying the Database

See available queries in `api/src/db/queries.sql`:

- Get all events (ordered by date)
- Get event by ID (parameterized query)

## Notes

- All queries use parameterized statements to prevent SQL injection
- The database is seeded with 6 test users and 5 events
- Timestamps use PostgreSQL's DEFAULT CURRENT_TIMESTAMP
