INSERT INTO "user" (name, email, phone, password_hash)
VALUES 
  ('Andres Cogollos', 'anco@example.com', '+45 12 34 56 78', 'hashed_password_123'),
  ('Andrea Barrero', 'anba@example.com', '+45 98 76 54 32', 'hashed_password_456'),
  ('Matilde Cardozo', 'maca@example.com', '+45 90 12 56 90', 'hashed_password_789'),
  ('Carlos Segrera', 'case@example.com', '+45 34 78 12 56', 'hashed_password_901'),
  ('Paloma Cardozo', 'paca@example.com', '+45 65 19 88 12', 'hashed_password_234'),
  ('Matilde Segrera', 'mase@example.com', '+45 28 09 19 88', 'hashed_password_567');

INSERT INTO event (title, description, event_date, event_time, venue, price, available_tickets)
VALUES
  ('Concert: La Mati', 'The best singer in Denmark', '2026-05-06', '19:00:00', 'Segrera Theater', 950.00, 300),
  ('Tech Conference 2026', 'Trends and innovations in Tech', '2026-09-28', '09:00:00', 'Mi Escritorio', 150.00, 500),
  ('Jazz Night in Spring', 'Live jazz performances by local artists', '2026-05-23', '18:30:00', 'Jazz Club', 300.00, 80),
  ('Summer Music Festival', 'Musical performances', '2026-08-07', '18:00:00', 'Central Park', 800.00, 100),
  ('Comedy Show: Looking for a job in Denmark', 'Comedians performing live', '2026-10-31', '20:00:00', 'Riendo Club', 250.00, 150);
