package com.knowit.erozgaar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.knowit.erozgaar.entities.Provider;
import com.knowit.erozgaar.entities.User;
import com.knowit.erozgaar.entities.UserLogin;
import com.knowit.erozgaar.entities.UserProviderRegistration;
import com.knowit.erozgaar.entities.UserWorkerRegistration;
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
    public boolean saveWorker(@RequestBody UserWorkerRegistration user) {
        try {
            //System.out.println(user);
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
    public boolean saveProvider(@RequestBody UserProviderRegistration user) {
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
    public UserLogin login(@RequestBody User user) {
        UserLogin userLogin = uservice.login(user.getUserName(), user.getPassword());

        if (userLogin != null) {
            return userLogin;
        } else {
            return null;
        }
    }
}