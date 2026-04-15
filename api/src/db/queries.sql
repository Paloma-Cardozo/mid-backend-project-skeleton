-- Get all events ordered by date
SELECT id, title, description, event_date, event_time, venue, price, available_tickets, created_at, updated_at
FROM event
ORDER BY event_date ASC;

-- Get a single event by ID
SELECT id, title, description, event_date, event_time, venue, price, available_tickets, created_at, updated_at
FROM event
WHERE id = $1;

