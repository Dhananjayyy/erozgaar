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


INSERT INTO vlc (first_name, middle_name, last_name, education, address_id)
VALUES 
    ('Akshay', 'Maruti', 'Patil', 'Diploma', 9),
    ('Priya', 'Rajesh', 'Sharma', 'Diploma', 5),
    ('Amit', 'Sopan', 'Pawar', 'Diploma', 18),
    ('Sneha', 'Aditya', 'Mane', 'Diploma', 14);


INSERT INTO providers (first_name, middle_name, last_name,organization_name, education, address_id)
VALUES 
    ('Ramesh', 'Kumar', 'Sharma','', 'Diploma', 1),
    ('','','','JW Marriott','Basic Schooling', 2),
    ('','','','Yash Constructions', 'Diploma', 3),
    ('Aditi', 'Bai', 'Yadav','', 'Graduation', 4);


INSERT INTO workers (first_name, middle_name, last_name, education, address_id, date_of_birth, relocation)
VALUES 
    ('Akash', 'Swapnil', 'Sharma', 'X', 19, '1990-05-15',TRUE),
    ('Sanket', 'Narendra', 'Patel', 'XI', 7, '1988-09-22',FALSE),
    ('Shreayash', 'Hanumant', 'Singh', 'XII', 8, '1995-02-10',TRUE),
    ('Abhishek', 'Balasaheb', 'Yadav', 'VIII', 4, '1992-11-30',FALSE),
    ('Sunil', 'Sanjay', 'Gupta', 'IX', 10, '1987-07-08',TRUE);


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

INSERT INTO users (user_name, password, phone_number,gender, role_id, active, security_question_id, answer)
VALUES
    ('Akash.sharma', 'Akash@123',9876543210,'Male', 1, TRUE, 1, 'Don'),
    ('Sanket.Patel', 'Sanket@987',9856543210,'Other', 1, TRUE, 2, 'Patil Vasti'),
    ('Shreyash.Patel', 'Shreyash@345',9876547710,'Female', 1, TRUE, 3, 'Fish'),
    ('Sunil.Gupta', 'Sunil@698',9812543210,'Male', 1, TRUE, 5, 'Kudal High School'),
    ('Ramesh.Sharma', 'Ramesh@234',8876543210,'Male', 2, TRUE, 1, 'TZP'),
    ('Disha.Patel', 'Disha@963',6986543210,'Female', 2, TRUE, 2, 'Pratap Nagar'),
    ('Shubham.Shinde', 'Shubham@456',9126587410,'Other', 2, TRUE, 3, 'Dosa'),
    ('Aditi.Yadav', 'Aditi@3678',9876549875,'Female', 2, TRUE, 4,'Simba'),
    ('Akshay.Patil', 'Akshay@963',7654543210,'Male', 3, TRUE, 5, 'SVM'),
    ('Priya.Sharma', 'Priya@789',6845312458,'Female', 3, TRUE, 1, 'Salaar'),
    ('Sneha.Mane', 'Sneha@569',5647895210,'Female', 3, TRUE, 1, 'Yes Boss'),
    ('Amit.Pawar', 'Amit@789',1176543210,'Female', 4, TRUE, 4, 'Monu');

