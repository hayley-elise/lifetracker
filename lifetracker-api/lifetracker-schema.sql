CREATE TABLE users (
   id             SERIAL PRIMARY KEY,
   username       TEXT NOT NULL UNIQUE,
   password       TEXT NOT NULL,
   first_name     TEXT NOT NULL,
   last_name      TEXT NOT NULL,
   email          TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
   created_at     TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE nutrition (
   id                SERIAL PRIMARY KEY,
   name              TEXT NOT NULL,
   category          TEXT,
   calories          INTEGER NOT NULL,
   image_url         TEXT,
   user_id           INTEGER REFERENCES users(id) ON DELETE CASCADE,
   created_at        TIMESTAMP NOT NULL DEFAULT NOW()
);