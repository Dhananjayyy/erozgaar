package com.knowit.erozgaar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.knowit.erozgaar.entities.User;
import com.knowit.erozgaar.entities.UserName;
import com.knowit.erozgaar.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    UserService uService;

    @GetMapping("/getusers")
    public List<User> getUsers() {
        return uService.getAll();
    }

    @PostMapping("/checkusername")
    public boolean checkUsername(@RequestBody UserName username) {
        return uService.existsByUsername(username.getUsername());
    }
}