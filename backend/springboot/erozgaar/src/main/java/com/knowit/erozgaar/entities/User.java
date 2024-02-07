package com.knowit.erozgaar.entities;

public class User {
//     CREATE TABLE User (
//     UserID INT AUTO_INCREMENT,
//     UserName VARCHAR(50) NOT NULL,
//     Password VARCHAR(50) NOT NULL,
//     RoleID INT NOT NULL,
//     Active BOOLEAN NOT NULL,
//     SecurityQuestionID INT NOT NULL,
//     Answer VARCHAR(50) NOT NULL,
//     AddressID INT NOT NULL,
//     CONSTRAINT fk_user_role FOREIGN KEY(RoleID) REFERENCES Role(RoleID) ON DELETE CASCADE,
//     CONSTRAINT fk_user_securityquestion FOREIGN KEY(SecurityQuestionID) REFERENCES SecurityQuestion(SecurityQuestionID) ON DELETE CASCADE,
//     CONSTRAINT fk_user_address FOREIGN KEY(AddressID) REFERENCES address(AddressID) ON DELETE CASCADE,
//     CONSTRAINT pk_user PRIMARY KEY(UserID)
// );
    private int userID;
    private String userName;
    private String password;
    private int roleID;
    private boolean active;
    private int securityQuestionID;
    private String answer;
    private int addressID;

    public User() {
    }

    public User(int userID, String userName, String password, int roleID, boolean active, int securityQuestionID, String answer, int addressID) {
        this.userID = userID;
        this.userName = userName;
        this.password = password;
        this.roleID = roleID;
        this.active = active;
        this.securityQuestionID = securityQuestionID;
        this.answer = answer;
        this.addressID = addressID;
    }

    public int getUserID() {
        return this.userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getRoleID() {
        return this.roleID;
    }

    public void setRoleID(int roleID) {
        this.roleID = roleID;
    }

    public boolean isActive() {
        return this.active;
    }

    public boolean getActive() {
        return this.active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public int getSecurityQuestionID() {
        return this.securityQuestionID;
    }

    public void setSecurityQuestionID(int securityQuestionID) {
        this.securityQuestionID = securityQuestionID;
    }

    public String getAnswer() {
        return this.answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public int getAddressID() {
        return this.addressID;
    }

    public void setAddressID(int addressID) {
        this.addressID = addressID;
    }
}