-- tables

CREATE TABLE state (
    StateID INT AUTO_INCREMENT,
    StateName VARCHAR(50) NOT NULL,
    CONSTRAINT pk_state PRIMARY KEY(StateID)
);

CREATE TABLE city (
    CityID INT AUTO_INCREMENT,
    CityName VARCHAR(50) NOT NULL,
    StateID INT NOT NULL,
    CONSTRAINT fk_city_state FOREIGN KEY(StateID) REFERENCES state(StateID) ON DELETE CASCADE,
    CONSTRAINT pk_city PRIMARY KEY(CityID)
);

CREATE TABLE address (
    AddressID INT AUTO_INCREMENT,
    AddressLine1 VARCHAR(100) NOT NULL,
    AddressLine2 VARCHAR(100),
    CityID INT NOT NULL,
    CONSTRAINT fk_address_city FOREIGN KEY(CityID) REFERENCES city(CityID) ON DELETE CASCADE,
    CONSTRAINT pk_address PRIMARY KEY(AddressID)
);

CREATE TABLE VLC (
    VlcID INT AUTO_INCREMENT,
    FirstName VARCHAR(50) NOT NULL,
    MiddleName VARCHAR(50),
    LastName VARCHAR(50) NOT NULL,
    Education VARCHAR(50) NOT NULL,
    AddressID INT NOT NULL,
    SevaKendraID INT NOT NULL,
    CONSTRAINT fk_vlc_address FOREIGN KEY(AddressID) REFERENCES address(AddressID) ON DELETE CASCADE,
    CONSTRAINT pk_vlc PRIMARY KEY(VlcID)
);

CREATE TABLE Organization (
    OrganizationID INT AUTO_INCREMENT,
    OrganizationName VARCHAR(50) NOT NULL,
    AddressID INT NOT NULL,
    CONSTRAINT fk_org_address FOREIGN KEY(AddressID) REFERENCES address(AddressID) ON DELETE CASCADE,
    CONSTRAINT pk_prganization PRIMARY KEY(OrganizationID)
);

CREATE TABLE Provider (
    ProviderID INT AUTO_INCREMENT,
    FirstName VARCHAR(50) NOT NULL,
    MiddleName VARCHAR(50),
    LastName VARCHAR(50) NOT NULL,
    Education VARCHAR(50) NOT NULL,
    AddressID INT NOT NULL,
    OrganizationID INT,
    CONSTRAINT fk_provider_address FOREIGN KEY(AddressID) REFERENCES address(AddressID) ON DELETE CASCADE,
    CONSTRAINT fk_provider_organization FOREIGN KEY(OrganizationID) REFERENCES Organization(OrganizationID) ON DELETE CASCADE,
    CONSTRAINT pk_ProviderID PRIMARY KEY(ProviderID)
);

CREATE TABLE Worker (
    WorkerID INT AUTO_INCREMENT,
    FirstName VARCHAR(50) NOT NULL,
    MiddleName VARCHAR(50),
    LastName VARCHAR(50) NOT NULL,
    Education VARCHAR(50) NOT NULL,
    AddressID INT NOT NULL,
    DateOfBirth DATE NOT NULL,
    CONSTRAINT fk_worker_address FOREIGN KEY(AddressID) REFERENCES address(AddressID) ON DELETE CASCADE,
    CONSTRAINT pk_worker PRIMARY KEY(WorkerID)
);

CREATE TABLE SecurityQuestion (
    SecurityQuestionID INT AUTO_INCREMENT,
    Question VARCHAR(100) NOT NULL,
    CONSTRAINT pk_securityquestion PRIMARY KEY(SecurityQuestionID)
);

CREATE TABLE Role (
    RoleID INT AUTO_INCREMENT,
    RoleName VARCHAR(50) NOT NULL,
    CONSTRAINT pk_role PRIMARY KEY(RoleID)
);

CREATE TABLE User (
    UserID INT AUTO_INCREMENT,
    UserName VARCHAR(50) NOT NULL,
    Password VARCHAR(50) NOT NULL,
    RoleID INT NOT NULL,
    Active BOOLEAN NOT NULL,
    SecurityQuestionID INT NOT NULL,
    Answer VARCHAR(50) NOT NULL,
    AddressID INT NOT NULL,
    CONSTRAINT fk_user_role FOREIGN KEY(RoleID) REFERENCES Role(RoleID) ON DELETE CASCADE,
    CONSTRAINT fk_user_securityquestion FOREIGN KEY(SecurityQuestionID) REFERENCES SecurityQuestion(SecurityQuestionID) ON DELETE CASCADE,
    CONSTRAINT fk_user_address FOREIGN KEY(AddressID) REFERENCES address(AddressID) ON DELETE CASCADE,
    CONSTRAINT pk_user PRIMARY KEY(UserID)
);