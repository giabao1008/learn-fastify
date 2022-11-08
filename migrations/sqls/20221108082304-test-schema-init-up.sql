/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS testTable (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
)