package com.knowit.erozgaar.entities;

import java.sql.Date;


public class UserWorkerRequest extends User {
    private int workerId;
    private String firstName;
    private String middleName;
    private String lastName;
    private String education;
    private Address address;

    //@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateOfBirth;
    private boolean relocation;

    public UserWorkerRequest() {
        super();
    }

    public UserWorkerRequest(int userId, String userName, String password, String phoneNumber, String gender,
            Role role, boolean active, String adhaar, String accountNumber, SecurityQuestion securityQuestion,
            String answer, int workerId, String firstName, String middleName, String lastName, String education,
            Address address, Date dateOfBirth, boolean relocation) {
        
        super(userId, userName, password, phoneNumber, gender, role, active, adhaar, accountNumber, securityQuestion,
        answer);
        this.workerId = workerId;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.education = education;
        this.address = address;
        this.dateOfBirth = dateOfBirth;
        this.relocation = relocation;
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
        return middleName;
    }

    public void setMiddleName(String middle_name) {
        this.middleName = middle_name;
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
        return "UserWorkerRegistration [" + super.toString() + ", workerId=" + workerId + ", firstName=" + firstName + ", middle_name="
                + middleName + ", lastName=" + lastName + ", education=" + education + ", address=" + address
                + ", dateOfBirth=" + dateOfBirth + ", relocation=" + relocation + "]";
    }

}
