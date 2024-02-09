package com.knowit.erozgaar.entities;

public class UserLogin {
    private int id;
    private String role;

    public UserLogin() {
        super();
    }

    public UserLogin(int id, String role) {
        this.id = id;
        this.role = role;
    }

    public int getId() {
        return id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}