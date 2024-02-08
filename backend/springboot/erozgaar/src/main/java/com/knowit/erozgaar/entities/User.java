package com.knowit.erozgaar.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "User")
public class User {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userID;
    @Column(name = "UserName")
    private String userName;
    @Column(name = "Password")
    private String password;
    @Column(name = "RoleID")
    private int roleID;
    @Column(name = "Active")
    private boolean active;
    @Column(name = "SecurityQuestionID")
    private int securityQuestionID;
    @Column(name = "Answer")
    private String answer;
    @Column(name = "AddressID")
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

    @Override
    public String toString() {
        return "User [userID=" + userID + ", userName=" + userName + ", password=" + password + ", roleID=" + roleID
                + ", active=" + active + ", securityQuestionID=" + securityQuestionID + ", answer=" + answer
                + ", addressID=" + addressID + "]";
    }
}