INSERT INTO states (state_name) VALUES 
('Andhra Pradesh'),
('Arunachal Pradesh'),
('Assam'),
('Bihar'),
('Chhattisgarh'),
('Goa'),
('Gujarat'),
('Haryana'),
('Himachal Pradesh'),
('Jharkhand'),
('Karnataka'),
('Kerala'),
('Madhya Pradesh'),
('Maharashtra'),
('Manipur'),
('Meghalaya'),
('Mizoram'),
('Nagaland'),
('Odisha'),
('Punjab'),
('Rajasthan'),
('Sikkim'),
('Tamil Nadu'),
('Telangana'),
('Tripura'),
('Uttar Pradesh'),
('Uttarakhand'),
('West Bengal'),
('Andaman and Nicobar Islands'),
('Chandigarh');




INSERT INTO cities (city_name, state_id) VALUES 
('Bengaluru', 11),
('Mysuru', 11),
('Hubballi', 11),
('Ludhiana', 20),
('Amritsar', 20),
('Jalandhar', 20),
('Mumbai', 14),
('Pune', 14),
('Nagpur', 14),
('Nashik', 14),
('Thane', 14),
('Aurangabad', 14),
('Solapur', 14),
('Amravati', 14),
('Kolhapur', 14),
('Navi Mumbai', 14);




INSERT INTO addresses (address_line_1, address_line_2, city_id) VALUES 
('123 Near Gokhalenagar School', 'Gokhalenagar', 2),
('456 Near Gokhalenagar School', 'Gokhalenagar', 2),
('697 Near Kusalkar Putla', 'Gokhalenagar', 2),
('498 Near Patrakar Nagar', 'Gokhalenagar', 2),
('55 Near Dange Chowk', 'Pimpri', 8),
('141 Near Jain School', 'Pimpri', 2),
('16 Near D.Y.Patil Collage', 'Pimpri', 2),
('180 Near Simla Office', 'Shiavji Nagar', 2),
('207 Near COEP College stop', 'Shiavji Nagar', 8),
('2223 Near Pizza-hut Dighi', 'Alandi', 8);



INSERT INTO addresses (address_line_1, address_line_2, city_id) VALUES 
('123, MG Road', 'Near Brigade Road', 8),
('693, Koramangala', 'Near Forum Mall', 1),
('789, Indiranagar', 'Near 100 Feet Road', 1),
('101, Whitefield', 'Near ITPL', 1),
('321, Jayanagar', 'Near Lalbagh', 1),
('102, Koramangala', 'Near Sony Signal', 1),
('457, BTM Layout', 'Near Silk Board', 8),
('753, HSR Layout', 'Near BDA Complex', 8),
('220, Electronic City', 'Near Wipro Gate', 1),
('889, Marathahalli', 'Near Outer Ring Road', 8);

INSERT INTO security_questions (question)
VALUES 
    ('What is the name of your favorite Indian movie?'),
    ('What is the name of the street you grew up on?'),
    ('What is your favorite Indian dish?'),
    ('What is the name of your first pet?'),
    ('What is the name of the school you attended in the 10th grade?');

INSERT INTO roles(role_name)
VALUES
    ('Worker'),
    ('Provider'),
    ('VLC'),
    ('Admin');  

INSERT INTO users (user_name, password, phone_number,gender, role_id, active,adhaar,account_number, security_question_id, answer)
VALUES
    ('Akash.Sharma', '$2a$12$D/e/OHU5SYUOH9VV9jEuceNNGcfBpunWZVPBbQhhFAQWzP3vY2ih.',9876543210,'Male', 1, 1,"123456781234","1234567890", 1, 'Don'),
    ('Sanket.Patel', '$2a$12$zCy9kFY053oMSHLc5d8IBudiVyIFFnkeWns4Q4r.2Z60vfK8jdCuK',9856543210,'Other', 1, 1,"223456781234","2234567890", 2, 'Patil Vasti'),
    ('Shreyash.Patel', 'Shreyash@123',9876547710,'Female', 1, 1,"323456781234","3234567890", 3, 'Fish'),


    ('Ramesh.Sharma', '$2a$12$2LkldBuU7eueXxbwVVC93OEJcyC80ajMbMXnw./XMcS7UlXYQNcNu',8876543210,'Male', 2, 1,"523456781234","5234567890", 1, 'TZP'),
    ('jw.marriott', '$2a$12$/Y5GctG0/Zv6g/aWNt2KQuge4P.s5cyluw1Bt2pPNZQEtmXNAuOOu',6986543210,'Female', 2, 1,"623456781234","6234567890", 2, 'Pratap Nagar'),
    ('yash.constructions', 'Yash@123',9126587410,'Other', 2, TRUE,"723456781234","7234567890", 3, 'Dosa'),
    ('Aditi.Yadav', '$2a$12$whJbBnvcFR5s3AOBO8zVUOpnyI.Ea2t68qTZecM5OAvT2inmkWbUq',9876549875,'Female', 2, 1,"923456781234","8234567890", 4,'Simba'),

    ('Akshay.Patil', '$2a$12$3pSzrP0YwoxDaJaaiKy2HOXHqf/oHal0cntBpdRW0UUicX2/nElm6',7654543210,'Male', 3, 1,"823456781234","9234567890", 5, 'SVM'),
    ('Priya.Sharma', 'Priya@123',6845312458,'Female', 3, TRUE,"103456781234","1034567890", 1, 'Salaar'),
    ('Sneha.Mane', '$2a$12$x7Q8zKTECSYNevJlrHU/he5s7zAe1fOKZ1iXTnIamyRxubb//wiJi',5647895210,'Female', 3, 1,"113456731234","1134567890", 1, 'Yes Boss'),

    ('Pratiksha.Pawar', '$2a$12$zIWuhxUqfgHR981H5biV4eYFvaY.LZfmol5ia7mG9K/vL.sjjV2li',1176543210,'Female', 4, 1,'','', 4, 'Monu');

INSERT INTO job_category (category_name) VALUES 
('Housekeeping'),
('Cooking'),
('Cleaning'),
('Driving'),
('Security');


INSERT INTO admins (first_name, middle_name, last_name, user_id)
VALUES 
    ('Pratiksha', 'Sopan', 'Pawar', 11);

INSERT INTO vlc (first_name, middle_name, last_name, education, address_id, user_id)
VALUES 
    ('Akshay', 'Maruti', 'Patil', 'Diploma', 12, 8),
    ('Priya', 'Rajesh', 'Sharma', 'Diploma', 13, 9),
    ('Sneha', 'Aditya', 'Mane', 'Diploma', 20, 10);

-- ('Pratiksha', 'Sopan', 'Pawar', 'Diploma', 18),

INSERT INTO providers (first_name, middle_name, last_name, organization_name, education, address_id, user_id)
VALUES 
    ('Ramesh', 'Kumar', 'Sharma', '', 'Diploma', 11, 4),
    ('', '', '', 'JW Marriott', 'Basic Schooling', 2, 5),
    ('', '', '', 'Yash Constructions', 'Diploma', 3, 6),
    ('Aditi', 'Bai', 'Yadav', '', 'Graduation', 18, 7);

-- 1 ('open'),
-- 2 ('in-selection'),
-- 3 ('in-progress'),
-- 4 ('completed'),
-- 5 ('closed');

INSERT INTO jobs (job_title, job_description, job_category_id, address_id, job_status, no_of_workers, provider_id, post_date, start_date, end_date)
VALUES 
    ('Housekeeping', 'Need a housekeeper', 1, 5, 1, 1, 1, '2024-02-11', '2024-03-01', '2024-06-01'),
    ('Cooking', 'Need a cook', 2, 9, 1, 2, 4, '2024-02-10', '2024-03-01', '2024-09-01');

INSERT INTO workers (first_name, middle_name, last_name, education, address_id, date_of_birth, relocation,available, job_category_id, user_id)
VALUES 
    ('Akash', 'Swapnil', 'Sharma', 'Below 12', 5, '1990-05-15', TRUE,TRUE,1, 1),
    ('Sanket', 'Narendra', 'Patel', '12 and above', 9, '1988-09-22', FALSE,TRUE,1, 2),
    ('Shreayash', 'Hanumant', 'Singh', 'Below 12', 10, '1995-02-10', TRUE,TRUE,2, 3);

-- INSERT INTO job_allocation (job_id, worker_id)
-- VALUES 
--     (1, 1),
--     (2, 2);

-- INSERT INTO payments (amount, payment_date, job_allocation_id)
-- VALUES 
--     (30000, '2024-03-01', 1),
--     (70000, '2024-03-01', 2);