CREATE TABLE IF NOT EXISTS movieTalbe (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    poster_path VARCHAR(255),
    overview VARCHAR(10000)
);