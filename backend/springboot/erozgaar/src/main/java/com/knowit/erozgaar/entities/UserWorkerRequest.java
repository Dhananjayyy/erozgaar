package com.knowit.erozgaar.entities;

import java.sql.Date;


public class UserWorkerRequest {
    private int userId;
    private String userName;
    private String password;
    private String phoneNumber;
    private String gender;
    private Role role;
    private boolean active;
    private SecurityQuestion securityQuestion;
    private String answer;

    private int workerId;
    private String firstName;
    private String middle_name;
    private String lastName;
    private String education;
    private Address address;
    private Date dateOfBirth;
    private boolean relocation;

    public UserWorkerRequest() {
        super();
    }

    public UserWorkerRequest(int userId, String userName, String password, String phoneNumber, String gender, Role role,
            boolean active, SecurityQuestion securityQuestion, String answer,int workerId, String firstName, String middle_name,
            String lastName, String education, Address address, Date dateOfBirth, boolean relocation) {
                this.userId = userId;
        this.userName = userName;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.gender = gender;
        this.role = role;
        this.active = active;
        this.securityQuestion = securityQuestion;
        this.answer = answer;
        this.workerId = workerId;
        this.firstName = firstName;
        this.middle_name = middle_name;
        this.lastName = lastName;
        this.education = education;
        this.address = address;
        this.dateOfBirth = dateOfBirth;
        this.relocation = relocation;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public SecurityQuestion getSecurityQuestion() {
        return securityQuestion;
    }

    public void setSecurityQuestion(SecurityQuestion securityQuestion) {
        this.securityQuestion = securityQuestion;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public int getWorkerId() {
        return workerId;
    }

    public void setWorkerId(int workerId) {
        this.workerId = workerId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middle_name;
    }

    public void setMiddleName(String middle_name) {
        this.middle_name = middle_name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public boolean isRelocation() {
        return relocation;
    }

    public void setRelocation(boolean relocation) {
        this.relocation = relocation;
    }

    @Override
    public String toString() {
        return "UserWorkerRequest [userName=" + userName + ", password=" + password + ", phoneNumber=" + phoneNumber
                + ", gender=" + gender + ", role=" + role + ", active=" + active + ", securityQuestion="
                + securityQuestion + ", answer=" + answer + ", firstName=" + firstName + ", middle_name=" + middle_name
                + ", lastName=" + lastName + ", education=" + education + ", address=" + address + ", dateOfBirth="
                + dateOfBirth + ", relocation=" + relocation + "]";
    }
}
