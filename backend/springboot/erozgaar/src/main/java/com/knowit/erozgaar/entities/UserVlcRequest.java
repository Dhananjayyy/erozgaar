package com.knowit.erozgaar.entities;

public class UserVlcRequest {
    private int userId;
    private String userName;
    private String password;
    private String phoneNumber;
    private String gender;
    private Role role;
    private boolean active;
    private String adhaar;
    private String accountNumber;
    private SecurityQuestion securityQuestion;
    private String answer;

    private int vlcId;
    private String firstName;
    private String middleName;
    private String lastName;
    private String education;
    private Address address;

    public UserVlcRequest() {
        super();
    }

    public UserVlcRequest(int userId, String userName, String password, String phoneNumber, String gender, Role role,
            boolean active, String adhaar, String accountNumber, SecurityQuestion securityQuestion, String answer,
            int vlcId, String firstName, String middleName, String lastName, String education, Address address) {
        this.userId = userId;
        this.userName = userName;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.gender = gender;
        this.role = role;
        this.active = active;
        this.adhaar = adhaar;
        this.accountNumber = accountNumber;
        this.securityQuestion = securityQuestion;
        this.answer = answer;
        this.vlcId = vlcId;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.education = education;
        this.address = address;
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

    public String getAdhaar() {
        return adhaar;
    }

    public void setAdhaar(String adhaar) {
        this.adhaar = adhaar;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
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

    public int getVlcId() {
        return vlcId;
    }

    public void setVlcId(int vlcId) {
        this.vlcId = vlcId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
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

    @Override
    public String toString() {
        return "UserVlcRequest [userId=" + userId + ", userName=" + userName + ", password=" + password
                + ", phoneNumber=" + phoneNumber + ", gender=" + gender + ", role=" + role + ", active=" + active
                + ", adhaar=" + adhaar + ", accountNumber=" + accountNumber + ", securityQuestion=" + securityQuestion
                + ", answer=" + answer + ", vlcId=" + vlcId + ", firstName=" + firstName + ", middleName=" + middleName
                + ", lastName=" + lastName + ", education=" + education + ", address=" + address + "]";
    }

    
}
