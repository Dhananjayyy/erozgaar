-- data

INSERT INTO States (StateName) VALUES 
('Bihar'),
('Karnataka'),
('Kerala'),
('Madhya Pradesh'),
('Maharashtra'),
('Uttar Pradesh'),
('West Bengal'),
('Tamil Nadu'),
('Rajasthan'),
('Gujarat');

INSERT INTO Cities (CityName, StateID) VALUES 
('Patna', 1),
('Bhopal', 4),
('Bengaluru', 2),
('Kochi', 3),
('Pune', 5);


INSERT INTO Addresses (AddressLine1, AddressLine2, CityID) VALUES 
('1 Main Street', 'Gandhi Nagar', 1),
('123 ABC Road', 'Maharana Pratap Nagar', 2),
('456 XYZ Avenue', 'Koramangala', 3),
('789 PQR Lane', 'Fort Kochi', 4),
('1011 MNO Street', 'Shivaji Nagar', 5);

INSERT INTO VLC (FirstName, MiddleName, LastName, Education, AddressID)
VALUES 
    ('Anjali', 'Pradip', 'Gupta', '12', 4),
    ('Prakash', 'Rakesh', 'Pandey', '12', 1),
    ('Sunita', 'Kumari', 'Verma', 'Diploma', 3),
    ('Rajesh', 'Kumar', 'Sinha', '12', 2),
    ('Pooja', 'Sunil', 'Patil', '12', 5);

