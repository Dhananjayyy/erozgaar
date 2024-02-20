-- tables

SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS; 
SET FOREIGN_KEY_CHECKS=0;   

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

CREATE TABLE job_category (
    job_category_id INT AUTO_INCREMENT,
    category_name VARCHAR(50),
    CONSTRAINT pk_jobcategory PRIMARY KEY(job_category_id)
);

-- open, in-selection, in-progress, completed (when payment is done), closed (when no workers are chosen and start date is elapsed)
-- open - 1, in-selection - 2, in-progress - 3, completed - 4, closed - 5
CREATE TABLE jobs (
    job_id INT AUTO_INCREMENT,
    job_title VARCHAR(50) NOT NULL,
    job_description VARCHAR(255) NOT NULL,
    job_category_id INT NOT NULL,
    address_id INT NOT NULL,
    job_status INT NOT NULL DEFAULT 1,
    no_of_workers INT NOT NULL,
    provider_id INT NOT NULL,
    post_date DATE NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    -- payment_id INT NOT NULL,
    CONSTRAINT fk_job_category FOREIGN KEY(job_category_id) REFERENCES job_category(job_category_id) ON DELETE CASCADE,
    CONSTRAINT fk_job_address FOREIGN KEY(address_id) REFERENCES addresses(address_id) ON DELETE CASCADE,
    -- CONSTRAINT fk_job_payment FOREIGN KEY(payment_id) REFERENCES payments(payment_id) ON DELETE CASCADE,
    CONSTRAINT fk_job_provider FOREIGN KEY(provider_id) REFERENCES providers(provider_id) ON DELETE CASCADE,
    CONSTRAINT pk_job PRIMARY KEY(job_id)
);

CREATE TABLE job_allocation (
    job_allocation_id INT AUTO_INCREMENT,
    job_id INT NOT NULL,
    worker_id INT NOT NULL,
    status INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_joballocation_job FOREIGN KEY(job_id) REFERENCES jobs(job_id) ON DELETE CASCADE,
    CONSTRAINT fk_joballocation_worker FOREIGN KEY(worker_id) REFERENCES workers(worker_id) ON DELETE CASCADE,
    CONSTRAINT pk_joballocation PRIMARY KEY(job_allocation_id)
);

CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date DATE NOT NULL,
    job_allocation_id INT NOT NULL,
    CONSTRAINT fk_payment_joballocation FOREIGN KEY(job_allocation_id) REFERENCES job_allocation(job_allocation_id) ON DELETE CASCADE,
    CONSTRAINT pk_payment PRIMARY KEY(payment_id)
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
    available BOOLEAN NOT NULL DEFAULT TRUE,
    job_category_id INT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_worker_address FOREIGN KEY(address_id) REFERENCES addresses(address_id) ON DELETE CASCADE,
    CONSTRAINT pk_worker PRIMARY KEY(worker_id),
    CONSTRAINT fk_worker_jobcategory FOREIGN KEY(job_category_id) REFERENCES job_category(job_category_id) ON DELETE CASCADE,
    CONSTRAINT fk_worker_user FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;