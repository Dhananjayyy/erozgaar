package com.knowit.erozgaar.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "vlc")
public class VillageLevelConnector {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vlc_id")
    private int id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "education")
    private String education;

    @ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name="address_id")
    private Address address;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="user_id")
    private User user;

    public VillageLevelConnector() {
        super();
    }

    public VillageLevelConnector(int id, String firstName, String middleName, String lastName, String education, Address address, User user) {
        this.id = id;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.education = education;
        this.address = address;
        this.user = user;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "VillageLevelConnector [id=" + id + ", firstName=" + firstName + ", middleName=" + middleName
                + ", lastName=" + lastName + ", education=" + education + ", address=" + address + ", user=" + user
                + "]";
    }
    
}
