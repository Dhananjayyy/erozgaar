package com.knowit.erozgaar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.knowit.erozgaar.entities.Provider;
import com.knowit.erozgaar.entities.User;
import com.knowit.erozgaar.services.AdminService;
import com.knowit.erozgaar.services.ProviderService;
import com.knowit.erozgaar.services.UserService;

@RestController
public class AdminController {
	
	@Autowired
	UserService uservice;
	
	@Autowired
	ProviderService pservice;
	
	@Autowired
	AdminService aservice;

  @GetMapping("/getadminbyid")
  public User getUserAdmin(@RequestParam("uid") int uid) {
	System.out.println("get admin "+uid);
	  return uservice.getUser(uid);
  }
  
  @PutMapping("/updateAdmin")
  public int updateAdmin(@RequestBody User u) {
	  String phone=u.getPhoneNumber();
	  System.out.println(phone);
	  Integer uid=u.getId();
	  return aservice.updateAdmin(phone,uid);
  }
}
