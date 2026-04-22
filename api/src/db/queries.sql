-- Get all events ordered by date
SELECT id, title, description, event_date, event_time, venue, price, available_tickets, created_at, updated_at
FROM event
ORDER BY event_date ASC;

-- Get a single event by ID
SELECT id, title, description, event_date, event_time, venue, price, available_tickets, created_at, updated_at
FROM event
WHERE id = $1;

-- Get all events paginated
SELECT id, title, description, event_date, event_time, venue, price, available_tickets, created_at, updated_at
FROM event
ORDER BY event_date ASC
LIMIT $1 OFFSET $2;

-- Get total count 
SELECT COUNT(*) FROM event;

-- Get cart subtotal for a given cart_id
SELECT 
  SUM(quantity * price_snapshot) AS total
FROM cart_item
WHERE cart_id = $1;

-- Get order total for a given order_id
SELECT 
  SUM(quantity * price_snapshot) AS total
FROM order_item
WHERE order_id = $1;