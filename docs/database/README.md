# Database Schema Documentation

## Overview

This project uses **PostgreSQL** with the following core entities for an events ticketing platform.

## Entity Relationship Diagram (ERD v2)

![ERD v2](<./docs/ERD%20(v2).pdf>)

See the complete database schema design: [ERD v2](<./docs/ERD%20(v2).pdf>)
See previous version: [ERD v1](<./docs/ERD%20(v1).pdf>)

## Core Entities

### `app_user` Table

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

### `cart` Table

Stores shopping carts, persisted for both authenticated and unauthenticated users:

- `id` (SERIAL PRIMARY KEY) - Unique identifier
- `user_id` (INTEGER, NULLABLE FK → app_user.id) - Associated user, null for unauthenticated carts
- `status` (VARCHAR) - Cart status: `active` or `checked_out`
- `created_at` (TIMESTAMP) - Cart creation timestamp

### `cart_item` Table

Stores individual lines within a cart:

- `id` (SERIAL PRIMARY KEY) - Unique identifier
- `cart_id` (INTEGER NOT NULL FK → cart.id) - Associated cart
- `event_id` (INTEGER NOT NULL FK → event.id) - Associated event
- `quantity` (INTEGER NOT NULL) - Number of tickets
- `price_snapshot` (DECIMAL(10, 2) NOT NULL) - Price at time of adding to cart

### `customer_order` Table

Stores finalized orders created during checkout:

- `id` (SERIAL PRIMARY KEY) - Unique identifier
- `user_id` (INTEGER NOT NULL FK → app_user.id) - User who placed the order
- `total_amount` (DECIMAL(10, 2) NOT NULL) - Total order amount at checkout
- `created_at` (TIMESTAMP) - Order creation timestamp

### `order_item` Table

Stores individual lines within an order:

- `id` (SERIAL PRIMARY KEY) - Unique identifier
- `order_id` (INTEGER NOT NULL FK → customer_order.id) - Associated order
- `event_id` (INTEGER NOT NULL FK → event.id) - Associated event
- `quantity` (INTEGER NOT NULL) - Number of tickets purchased
- `price_snapshot` (DECIMAL(10, 2) NOT NULL) - Price at time of purchase

## Design Decisions

### Cart-line key strategy

Each cart line (`cart_item`) uses a simple single primary key (`id`). This means `PUT /api/cart/items/{itemId}` and `DELETE /api/cart/items/{itemId}` reference `cart_item.id` directly.

### Unauthenticated carts

`cart.user_id` is nullable, allowing carts to be created before a user logs in. Once authenticated, the cart is associated with the user.

### One active cart per authenticated user

Enforced at the database level via a partial unique index on `cart(user_id)` where `status = 'active'`. This prevents duplicate active carts while allowing unauthenticated carts with null `user_id`.

## Database Files

- **Schema**: [`../../api/src/db/schema.sql`](../../api/src/db/schema.sql) - Table definitions with constraints
- **Seed Data**: [`../../api/src/db/seed.sql`](../../api/src/db/seed.sql) - Initial test data
- **Queries**: [`../../api/src/db/queries.sql`](../../api/src/db/queries.sql) - Core SQL queries

## Querying the Database

See available queries in `api/src/db/queries.sql`:

- Get all events (ordered by date)
- Get event by ID (parameterized query)
- Get paginated events (LIMIT, OFFSET, ORDER BY)
- Calculate cart subtotal
- Calculate order total

## Notes

- All queries use parameterized statements to prevent SQL injection
- The database is seeded with 6 test users, 5 events, 1 active cart with 2 cart items, and 1 completed order with 1 order item
- Timestamps use PostgreSQL's DEFAULT CURRENT_TIMESTAMP
- Reserved SQL words avoided: `user` → `app_user`, `order` → `customer_order`
