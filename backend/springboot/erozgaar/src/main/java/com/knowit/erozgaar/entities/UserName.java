package com.knowit.erozgaar.entities;

public class UserName {
    private String username;

    public UserName() {
        super();
    }

    public UserName(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "UserName [username=" + username + "]";
    }

    
}