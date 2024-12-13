
CREATE TABLE prestadores (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    telefone TEXT NOT NULL UNIQUE,
    cidade TEXT NOT NULL,
    sexo TEXT,
    servicos TEXT[]
);
