package com.knowit.erozgaar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.knowit.erozgaar.entities.Provider;
import com.knowit.erozgaar.entities.Role;
import com.knowit.erozgaar.entities.SecurityQuestion;
import com.knowit.erozgaar.entities.User;
import com.knowit.erozgaar.entities.UserProviderRequest;
import com.knowit.erozgaar.entities.UserWorkerRequest;
import com.knowit.erozgaar.entities.Worker;
import com.knowit.erozgaar.services.ProviderService;
import com.knowit.erozgaar.services.RoleService;
import com.knowit.erozgaar.services.SecurityQuestionService;
import com.knowit.erozgaar.services.WorkerService;

import jakarta.transaction.Transactional;

@RequestMapping("/register")
@CrossOrigin(origins = "http://localhost:5173")
@Transactional
@RestController
public class RegistrationController {

    @Autowired
    WorkerService wservice;

    @Autowired
    ProviderService pservice;

    @Autowired
    RoleService rservice;

    @Autowired
    SecurityQuestionService sservice;

    @PostMapping("/worker")
    public boolean saveWorker(@RequestBody UserWorkerRequest request) {
        //System.out.println("my dob "+request.getDateOfBirth());
        try {
            Role role = rservice.getById(request.getRole().getRoleId());
            SecurityQuestion securityQuestion = sservice.getById(request.getSecurityQuestion().getSecurityQuestionId());

            User u = new User(request.getId(), request.getUserName(), request.getPassword(), request.getPhoneNumber(),
            request.getGender(), role, request.isActive(), request.getAdhaar(), request.getAccountNumber(),
            securityQuestion, request.getAnswer());

            Worker w = new Worker(request.getWorkerId(), request.getFirstName(), request.getMiddleName(), request.getLastName(),
            request.getEducation(), request.getAddress(), request.getDateOfBirth(), request.isRelocation(), u);

            wservice.save(w);

            return true;
        } catch (Exception e) {
            //e.printStackTrace();
            return false;
        }
    }

    @PostMapping("/provider")
    public boolean saveProvider(@RequestBody UserProviderRequest request) {
        try {
            System.out.println("request: "+ request);

            Role role = rservice.getById(request.getRole().getRoleId());
            SecurityQuestion securityQuestion = sservice.getById(request.getSecurityQuestion().getSecurityQuestionId());

            User u = new User(request.getId(), request.getUserName(), request.getPassword(), request.getPhoneNumber(),
            request.getGender(), role, request.isActive(), request.getAdhaar(), request.getAccountNumber(),
            securityQuestion, request.getAnswer());

            Provider p = new Provider(request.getProviderId(), request.getFirstName(), request.getMiddleName(),request.getLastName(), request.getOrganization(),request.getEducation(), request.getAddress(), u);
            
            pservice.save(p);

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}