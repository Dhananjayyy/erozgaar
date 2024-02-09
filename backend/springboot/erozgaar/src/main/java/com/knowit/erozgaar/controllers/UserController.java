package com.knowit.erozgaar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.knowit.erozgaar.entities.Provider;
import com.knowit.erozgaar.entities.Role;
import com.knowit.erozgaar.entities.User;
import com.knowit.erozgaar.entities.UserProviderRequest;
import com.knowit.erozgaar.entities.UserWorkerRequest;
import com.knowit.erozgaar.entities.Worker;
import com.knowit.erozgaar.services.ProviderService;
import com.knowit.erozgaar.services.UserService;
import com.knowit.erozgaar.services.WorkerService;

@RestController
public class UserController {

    @Autowired
    UserService uservice;

    @Autowired
    WorkerService wservice;

    @Autowired
    ProviderService pservice;

    @GetMapping("/getusers")
    public List<User> getUsers() {
        return uservice.getAll();
    }

    @PostMapping("/registerworker")
    public boolean saveWorker(@RequestBody UserWorkerRequest user) {
        try {
            if (uservice.existsById(user.getUserId())) {
                return false;
            }
            uservice.save(new User(user.getUserId(), user.getUserName(), user.getPassword(), user.getPhoneNumber(),
                    user.getGender(), user.getRole(), user.isActive(), user.getSecurityQuestion(), user.getAnswer()));
            wservice.save(new Worker(user.getWorkerId(), user.getFirstName(), user.getMiddleName(), user.getLastName(),
                    user.getEducation(), user.getAddress(), user.getDateOfBirth(), user.isRelocation()));

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @PostMapping("/registerprovider")
    public boolean saveProvider(@RequestBody UserProviderRequest user) {
        try {
            if (uservice.existsById(user.getUserId())) {
                return false;
            }
            uservice.save(new User(user.getUserId(), user.getUserName(), user.getPassword(), user.getPhoneNumber(),
                    user.getGender(), user.getRole(), user.isActive(), user.getSecurityQuestion(), user.getAnswer()));
            pservice.save(new Provider(user.getProviderId(), user.getFirstName(), user.getMiddleName(),
                    user.getMiddleName(), user.getLastName(), user.getOrganization(), user.getAddress()));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        Role role = uservice.login(user.getUserName(), user.getPassword());

        if (role != null) {
            return role.getRoleName();
        } else {
            return null;
        }
    }
}