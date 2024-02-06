-- tables
CREATE TABLE IF NOT EXISTS Users (
    UserID INT AUTO_INCREMENT,
    Title VARCHAR(50) NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100),
    PhoneNumber VARCHAR(20),
    NewExistingUser VARCHAR(20) DEFAULT 'New',
    Budget DECIMAL(10,2),
    ZeroDebtAndThirdParty VARCHAR(5),
    VehicleRegistrationNumber VARCHAR(20),
    CONSTRAINT uc_Email UNIQUE (Email),
    CONSTRAINT chk_Budget CHECK (Budget >= 0),
    CONSTRAINT chk_phone CHECK ((LENGTH(PhoneNumber) = 10) AND PhoneNumber > 0),
    CONSTRAINT pk_UserID PRIMARY KEY(UserID)
);