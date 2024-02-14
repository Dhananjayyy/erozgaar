package com.knowit.erozgaar.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserProviderRequest extends User{

    private int providerId;

    private String firstName;
    private String middleName;
    private String lastName;
    private String organization;
    private String education;
    private Address address;

    public UserProviderRequest() {
        super();
    }

    public UserProviderRequest(int userId, String userName, String password, String phoneNumber, String gender,
            Role role, boolean active, String adhaar, String accountNumber, SecurityQuestion securityQuestion,
            String answer, int providerId, String firstName, String middleName, String lastName, String organization,
            String education, Address address) {
        super(userId, userName, password, phoneNumber, gender, role, active, adhaar, accountNumber, securityQuestion, answer);
        this.providerId = providerId;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.organization = organization;
        this.education = education;
        this.address = address;
    }

    public int getProviderId() {
        return providerId;
    }

    public void setProviderId(int providerId) {
        this.providerId = providerId;
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

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
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
        return "UserProviderRegistration [" + super.toString() + ", providerId=" + providerId + ", firstName=" + firstName + ", middleName="
                + middleName + ", lastName=" + lastName + ", organization=" + organization + ", education=" + education
                + ", address=" + address + "]";
    }

}