
DROP TABLE IF EXISTS tasks CASCADE;

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(255),
  description TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  creation_date TIMESTAMP,
  completion_date TIMESTAMP

);
