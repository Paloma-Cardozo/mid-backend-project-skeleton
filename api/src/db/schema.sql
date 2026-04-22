CREATE TABLE app_user (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(255), 
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

SELECT * FROM app_user;

CREATE TABLE event (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  event_date DATE,
  event_time TIME,
  venue VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2),
  available_tickets INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

SELECT * FROM event;

CREATE TABLE customer_order (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES app_user(id),
  total_amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

SELECT * FROM customer_order;

CREATE TABLE order_item (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES customer_order(id),
  event_id INTEGER REFERENCES event(id),
  quantity INTEGER NOT NULL,
  price_snapshot DECIMAL(10, 2) NOT NULL
  );

SELECT * FROM order_item;

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES app_user(id),
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

SELECT * FROM cart;

CREATE TABLE cart_item (
  id SERIAL PRIMARY KEY,
  cart_id INTEGER REFERENCES cart(id),
  event_id INTEGER REFERENCES event(id),
  quantity INTEGER NOT NULL,
  price_snapshot DECIMAL(10, 2) NOT NULL
  );

SELECT * FROM cart_item;

CREATE UNIQUE INDEX one_active_cart_per_user 
ON cart(user_id) 
WHERE status = 'active';


