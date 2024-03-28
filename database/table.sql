-- Database
-- CREATE DATABASE task_management;
-- ENUM TYPE
CREATE TYPE role_type AS ENUM ('admin', 'manager', 'worker', 'superAdmin');

CREATE TYPE status_type AS ENUM ('process', 'done', 'took');

-- Tables
-- companies
CREATE TABLE companies(
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL UNIQUE
);

-- users
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    login VARCHAR(32) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    full_name VARCHAR(64) NOT NULL,
    company_id INT DEFAULT NULL,
    role role_type NOT NULL
);

-- tasks
CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    title VARCHAR(64) NOT NULL,
    description TEXT NOT NULL,
    company_id INT DEFAULT NULL,
    parent_id INT DEFAULT NULL,
    day DATE NOT NULL DEFAULT CURRENT_DATE
);

-- user_tasks
CREATE TABLE user_tasks(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    start_at DATE NOT NULL DEFAULT CURRENT_DATE,
    end_at DATE NOT NULL,
    started_date DATE DEFAULT NULL,
    ended_date DATE DEFAULT NULL,
    status status_type NOT NULL DEFAULT 'took',
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_task_id FOREIGN KEY (task_id) REFERENCES tasks(id)
);

-- audit_companies
CREATE TABLE audit_companies(
    id INT NOT NULL,
    name VARCHAR(128) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(32) NOT NULL
);

-- audit_users
CREATE TABLE audit_users(
    id INT NOT NULL,
    login VARCHAR(32) NOT NULL,
    password TEXT NOT NULL,
    role role_type NOT NULL,
    full_name VARCHAR(64) NOT NULL,
    company_id INT DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(32) NOT NULL
);