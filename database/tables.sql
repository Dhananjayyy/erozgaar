-- tables

CREATE TABLE states (
    state_id INT AUTO_INCREMENT,
    state_name VARCHAR(50) NOT NULL,
    CONSTRAINT pk_state PRIMARY KEY(state_id)
);

CREATE TABLE cities (
    city_id INT AUTO_INCREMENT,
    city_name VARCHAR(50) NOT NULL,
    state_id INT NOT NULL,
    CONSTRAINT fk_city_state FOREIGN KEY(state_id) REFERENCES states(state_id) ON DELETE CASCADE,
    CONSTRAINT pk_city PRIMARY KEY(city_id)
);

CREATE TABLE addresses (
    address_id INT AUTO_INCREMENT,
    address_line_1 VARCHAR(100) NOT NULL,
    address_line_2 VARCHAR(100) NOT NULL,
    city_id INT NOT NULL,
    CONSTRAINT fk_address_city FOREIGN KEY(city_id) REFERENCES cities(city_id) ON DELETE CASCADE,
    CONSTRAINT pk_address PRIMARY KEY(address_id)
);

CREATE TABLE security_questions (
    security_question_id INT AUTO_INCREMENT,
    question VARCHAR(100),
    CONSTRAINT pk_securityquestion PRIMARY KEY(security_question_id)
);

CREATE TABLE roles (
    role_id INT AUTO_INCREMENT,
    role_name VARCHAR(50) NOT NULL,
    CONSTRAINT pk_role PRIMARY KEY(role_id)
);

CREATE TABLE users (
    user_id INT AUTO_INCREMENT,
    user_name VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    gender VARCHAR(10) NOT NULL,
    role_id INT NOT NULL,
    active BOOLEAN NOT NULL,
    adhaar VARCHAR(12) NOT NULL UNIQUE,
    account_number VARCHAR(20) NOT NULL UNIQUE,
    security_question_id INT NOT NULL,
    answer VARCHAR(50) NOT NULL,
    CONSTRAINT fk_user_role FOREIGN KEY(role_id) REFERENCES roles(role_id) ON DELETE CASCADE,
    CONSTRAINT fk_user_securityquestion FOREIGN KEY(security_question_id) REFERENCES security_questions(security_question_id) ON DELETE CASCADE,
    CONSTRAINT pk_user PRIMARY KEY(user_id)
);

CREATE TABLE providers (
    provider_id INT AUTO_INCREMENT,
    first_name VARCHAR(50),
    middle_name VARCHAR(50),
    last_name VARCHAR(50),
    organization_name VARCHAR(50),
    education VARCHAR(50) NOT NULL,
    address_id INT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_provider_address FOREIGN KEY(address_id) REFERENCES addresses(address_id) ON DELETE CASCADE,
    CONSTRAINT pk_provider_id PRIMARY KEY(provider_id),
    CONSTRAINT fk_provider_user FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE workers (
    worker_id INT AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    education VARCHAR(50) NOT NULL,
    address_id INT NOT NULL,
    date_of_birth DATE,
    relocation BOOLEAN NOT NULL DEFAULT FALSE,
    user_id INT NOT NULL,
    CONSTRAINT fk_worker_address FOREIGN KEY(address_id) REFERENCES addresses(address_id) ON DELETE CASCADE,
    CONSTRAINT pk_worker PRIMARY KEY(worker_id),
    CONSTRAINT fk_worker_user FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE vlc (
    vlc_id INT AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    education VARCHAR(50) NOT NULL,
    address_id INT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_vlc_address FOREIGN KEY(address_id) REFERENCES addresses(address_id) ON DELETE CASCADE,
    CONSTRAINT fk_vlc_user FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT pk_vlc PRIMARY KEY(vlc_id)
);

CREATE TABLE admins (
    admin_id INT AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT pk_admin PRIMARY KEY(admin_id),
    CONSTRAINT fk_admin_user FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);