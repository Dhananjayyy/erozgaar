package com.knowit.erozgaar.controllers;

import java.io.IOException;
import java.util.List;

//import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import com.knowit.erozgaar.entities.Role;
import com.knowit.erozgaar.entities.User;
import com.knowit.erozgaar.entities.UserVlcRequest;
import com.knowit.erozgaar.entities.VillageLevelConnector;
import com.knowit.erozgaar.entities.Worker;

import com.knowit.erozgaar.services.RoleService;
import com.knowit.erozgaar.services.UserService;
import com.knowit.erozgaar.services.VillageLevelConnectorService;
import com.knowit.erozgaar.services.WorkerService;

import jakarta.transaction.Transactional;

@RestController
@CrossOrigin(origins = "http://localhost:5173",exposedHeaders = "**")
public class VlcController {
	
	@Autowired
	UserService uservice;
	
	@Autowired
	VillageLevelConnectorService vlcservice;

	@Autowired
	WorkerService wservice;
	
	@Autowired
	RoleService rserevice;
	
	@GetMapping("/getuservlcbyid")
	 public UserVlcRequest getUserVlcById(@RequestParam("uid") int uid) {
		User u= uservice.getUserById(uid);
		VillageLevelConnector v= vlcservice.getVlcById(uid);
		
		UserVlcRequest vlc = new UserVlcRequest(u.getId(),u.getUserName(),u.getPassword(),u.getPhoneNumber(),
				u.getGender(),u.getRole(),u.getActive(),u.getAdhaar(),u.getAccountNumber(),u.getSecurityQuestion(),u.getAnswer(),
				v.getId(),v.getFirstName(),v.getMiddleName(),v.getLastName(),v.getEducation(),v.getAddress());
		
		return vlc;
	 }
	
	@Transactional
	@PutMapping("/updateVlc")
   public  int updateVlc( @RequestBody UserVlcRequest uw) {
      
		String fname=uw.getFirstName();
		String mname=uw.getMiddleName();
		String lname=uw.getLastName();
		Integer uid=uw.getUserId();
		
		String phone=uw.getPhoneNumber();
		String accno =uw.getAccountNumber();
		int active=uw.getActive();

		int u=uservice.updateUser(phone,accno,active,uid);
		
		return vlcservice.updateVlc(fname,mname,lname,uid);
		
	}
}
