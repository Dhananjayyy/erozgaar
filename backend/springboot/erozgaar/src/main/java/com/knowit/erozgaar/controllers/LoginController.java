package com.knowit.erozgaar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.knowit.erozgaar.entities.User;
import com.knowit.erozgaar.services.UserService;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class LoginController {

    @Autowired
    UserService uservice;
    
    @GetMapping("/hello")
    public String hello(){
        return "hello world!";
    }
 
    public String getMethodName(@RequestParam String param) {
        return new String();
    }
    
    @GetMapping("/users")
    public List<User> getUsers(){
        return uservice.getAll();
    }
}