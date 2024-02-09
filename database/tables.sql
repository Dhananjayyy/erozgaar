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

CREATE TABLE vlc (
    vlc_id INT AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    education VARCHAR(50) NOT NULL,
    address_id INT NOT NULL,
    CONSTRAINT fk_vlc_address FOREIGN KEY(address_id) REFERENCES addresses(address_id) ON DELETE CASCADE,
    CONSTRAINT pk_vlc PRIMARY KEY(vlc_id)
);

CREATE TABLE providers (
    provider_id INT AUTO_INCREMENT,
    first_name VARCHAR(50),
    middle_name VARCHAR(50),
    last_name VARCHAR(50),
    organization_name VARCHAR(50),
    education VARCHAR(50) NOT NULL,
    address_id INT NOT NULL,
    CONSTRAINT fk_provider_address FOREIGN KEY(address_id) REFERENCES addresses(address_id) ON DELETE CASCADE,
    CONSTRAINT pk_provider_id PRIMARY KEY(provider_id)
);

CREATE TABLE workers (
    worker_id INT AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    education VARCHAR(50) NOT NULL,
    address_id INT NOT NULL,
    date_of_birth DATE NOT NULL,
    relocation BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_worker_address FOREIGN KEY(address_id) REFERENCES addresses(address_id) ON DELETE CASCADE,
    CONSTRAINT pk_worker PRIMARY KEY(worker_id)
);

CREATE TABLE security_questions (
    security_question_id INT AUTO_INCREMENT,
    question VARCHAR(100) NOT NULL,
    CONSTRAINT pk_securityquestion PRIMARY KEY(security_question_id)
);

CREATE TABLE roles (
    role_id INT AUTO_INCREMENT,
    role_name VARCHAR(50) NOT NULL,
    CONSTRAINT pk_role PRIMARY KEY(role_id)
);

CREATE TABLE users (
    user_id INT AUTO_INCREMENT,
    user_name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    role_id INT NOT NULL,
    active BOOLEAN NOT NULL,
    security_question_id INT NOT NULL,
    answer VARCHAR(50) NOT NULL,
    CONSTRAINT fk_user_role FOREIGN KEY(role_id) REFERENCES roles(role_id) ON DELETE CASCADE,
    CONSTRAINT fk_user_securityquestion FOREIGN KEY(security_question_id) REFERENCES security_questions(security_question_id) ON DELETE CASCADE,
    CONSTRAINT pk_user PRIMARY KEY(user_id)
);