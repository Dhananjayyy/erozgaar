package com.knowit.erozgaar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.knowit.erozgaar.entities.Role;
import com.knowit.erozgaar.services.RoleService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class RoleController {
    
    @Autowired
    RoleService rservice;

    @GetMapping("/roles")
    public Role getById(@RequestParam String id)
    {
        return rservice.getById(Integer.parseInt(id));
    }
}
