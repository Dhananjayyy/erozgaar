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
('55 Near Dange Chowk', 'Pimpri', 2),
('141 Near Jain School', 'Pimpri', 2),
('16 Near D.Y.Patil Collage', 'Pimpri', 2),
('180 Near Simla Office', 'Shiavji Nagar', 2),
('207 Near COEP College stop', 'Shiavji Nagar', 2),
('2223 Near Pizza-hut Dighi', 'Alandi', 2);



INSERT INTO addresses (address_line_1, address_line_2, city_id) VALUES 
('123, MG Road', 'Near Brigade Road', 1),
('693, Koramangala', 'Near Forum Mall', 1),
('789, Indiranagar', 'Near 100 Feet Road', 1),
('101, Whitefield', 'Near ITPL', 1),
('321, Jayanagar', 'Near Lalbagh', 1),
('102, Koramangala', 'Near Sony Signal', 1),
('457, BTM Layout', 'Near Silk Board', 1),
('753, HSR Layout', 'Near BDA Complex', 1),
('220, Electronic City', 'Near Wipro Gate', 1),
('889, Marathahalli', 'Near Outer Ring Road', 1);

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
    ('Akash.Sharma', '$2a$12$D/e/OHU5SYUOH9VV9jEuceNNGcfBpunWZVPBbQhhFAQWzP3vY2ih.',9876543210,'Male', 1, TRUE,"123456781234","1234567890", 1, 'Don'),
    ('Sanket.Patel', 'Sanket@123',9856543210,'Other', 1, TRUE,"223456781234","2234567890", 2, 'Patil Vasti'),
    ('Shreyash.Patel', 'Shreyash@123',9876547710,'Female', 1, TRUE,"323456781234","3234567890", 3, 'Fish'),


    ('Ramesh.Sharma', 'Ramesh@123',8876543210,'Male', 2, TRUE,"523456781234","5234567890", 1, 'TZP'),
    ('jw.marriott', 'Jw@123',6986543210,'Female', 2, TRUE,"623456781234","6234567890", 2, 'Pratap Nagar'),
    ('yash.constructions', 'Yash@123',9126587410,'Other', 2, TRUE,"723456781234","7234567890", 3, 'Dosa'),
    ('Aditi.Yadav', 'Aditi@123',9876549875,'Female', 2, FALSE,"923456781234","8234567890", 4,'Simba'),

    ('Akshay.Patil', 'Akshay@123',7654543210,'Male', 3, TRUE,"823456781234","9234567890", 5, 'SVM'),
    ('Priya.Sharma', 'Priya@123',6845312458,'Female', 3, TRUE,"103456781234","1034567890", 1, 'Salaar'),
    ('Sneha.Mane', 'Sneha@123',5647895210,'Female', 3, TRUE,"113456731234","1134567890", 1, 'Yes Boss'),

    ('Pratiksha.Pawar', '$2a$12$zIWuhxUqfgHR981H5biV4eYFvaY.LZfmol5ia7mG9K/vL.sjjV2li',1176543210,'Female', 4, TRUE,'','', 4, 'Monu');

INSERT INTO admins (first_name, middle_name, last_name, user_id)
VALUES 
    ('Pratiksha', 'Sopan', 'Pawar', 11);

INSERT INTO vlc (first_name, middle_name, last_name, education, address_id, user_id)
VALUES 
    ('Akshay', 'Maruti', 'Patil', 'Diploma', 9, 8),
    ('Priya', 'Rajesh', 'Sharma', 'Diploma', 5, 9),
    ('Sneha', 'Aditya', 'Mane', 'Diploma', 14, 10);

-- ('Pratiksha', 'Sopan', 'Pawar', 'Diploma', 18),

INSERT INTO providers (first_name, middle_name, last_name, organization_name, education, address_id, user_id)
VALUES 
    ('Ramesh', 'Kumar', 'Sharma', '', 'Diploma', 1, 4),
    ('', '', '', 'JW Marriott', 'Basic Schooling', 2, 5),
    ('', '', '', 'Yash Constructions', 'Diploma', 3, 6),
    ('Aditi', 'Bai', 'Yadav', '', 'Graduation', 4, 7);

INSERT INTO workers (first_name, middle_name, last_name, education, address_id, date_of_birth, relocation, user_id)
VALUES 
    ('Akash', 'Swapnil', 'Sharma', 'Below 12', 19, '1990-05-15', TRUE, 1),
    ('Sanket', 'Narendra', 'Patel', '12 and above', 7, '1988-09-22', FALSE, 2),
    ('Shreayash', 'Hanumant', 'Singh', 'Below 12', 8, '1995-02-10', TRUE, 3);

