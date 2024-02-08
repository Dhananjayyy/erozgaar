-- tables

CREATE TABLE States (
    StateID INT AUTO_INCREMENT,
    StateName VARCHAR(50) NOT NULL,
    CONSTRAINT pk_state PRIMARY KEY(StateID)
);

CREATE TABLE Cities (
    CityID INT AUTO_INCREMENT,
    CityName VARCHAR(50) NOT NULL,
    StateID INT NOT NULL,
    CONSTRAINT fk_city_state FOREIGN KEY(StateID) REFERENCES States(StateID) ON DELETE CASCADE,
    CONSTRAINT pk_city PRIMARY KEY(CityID)
);

CREATE TABLE Addresses (
    AddressID INT AUTO_INCREMENT,
    AddressLine1 VARCHAR(100) NOT NULL,
    AddressLine2 VARCHAR(100) NOT NULL,
    CityID INT NOT NULL,
    CONSTRAINT fk_address_city FOREIGN KEY(CityID) REFERENCES Cities(CityID) ON DELETE CASCADE,
    CONSTRAINT pk_address PRIMARY KEY(AddressID)
);

CREATE TABLE VLC (
    VlcID INT AUTO_INCREMENT,
    FirstName VARCHAR(50) NOT NULL,
    MiddleName VARCHAR(50),
    LastName VARCHAR(50) NOT NULL,
    Education VARCHAR(50) NOT NULL,
    AddressID INT NOT NULL,
    CONSTRAINT fk_vlc_address FOREIGN KEY(AddressID) REFERENCES Addresses(AddressID) ON DELETE CASCADE,
    CONSTRAINT pk_vlc PRIMARY KEY(VlcID)
);

CREATE TABLE Providers (
    ProviderID INT AUTO_INCREMENT,
    FirstName VARCHAR(50),
    MiddleName VARCHAR(50),
    LastName VARCHAR(50),
    OrganizationName VARCHAR(50),
    Education VARCHAR(50) NOT NULL,
    AddressID INT NOT NULL,
    CONSTRAINT fk_provider_address FOREIGN KEY(AddressID) REFERENCES Addresses(AddressID) ON DELETE CASCADE,
    CONSTRAINT pk_ProviderID PRIMARY KEY(ProviderID)
);

CREATE TABLE Workers (
    WorkerID INT AUTO_INCREMENT,
    FirstName VARCHAR(50) NOT NULL,
    MiddleName VARCHAR(50),
    LastName VARCHAR(50) NOT NULL,
    Education VARCHAR(50) NOT NULL,
    AddressID INT NOT NULL,
    DateOfBirth DATE NOT NULL,
    Relocation BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_worker_address FOREIGN KEY(AddressID) REFERENCES Addresses(AddressID) ON DELETE CASCADE,
    CONSTRAINT pk_worker PRIMARY KEY(WorkerID)
);

CREATE TABLE SecurityQuestions (
    SecurityQuestionID INT AUTO_INCREMENT,
    Question VARCHAR(100) NOT NULL,
    CONSTRAINT pk_securityquestion PRIMARY KEY(SecurityQuestionID)
);

CREATE TABLE Roles (
    RoleID INT AUTO_INCREMENT,
    RoleName VARCHAR(50) NOT NULL,
    CONSTRAINT pk_role PRIMARY KEY(RoleID)
);

CREATE TABLE Users (
    UserID INT AUTO_INCREMENT,
    UserName VARCHAR(50) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    PhoneNumber VARCHAR(15) NOT NULL,
    RoleID INT NOT NULL,
    Active BOOLEAN NOT NULL,
    SecurityQuestionID INT NOT NULL,
    Answer VARCHAR(50) NOT NULL,
    CONSTRAINT fk_user_role FOREIGN KEY(RoleID) REFERENCES Roles(RoleID) ON DELETE CASCADE,
    CONSTRAINT fk_user_securityquestion FOREIGN KEY(SecurityQuestionID) REFERENCES SecurityQuestions(SecurityQuestionID) ON DELETE CASCADE,
    CONSTRAINT pk_user PRIMARY KEY(UserID)
);