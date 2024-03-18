package com.knowit.erozgaar.controllers;

import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.knowit.erozgaar.entities.Provider;
import com.knowit.erozgaar.entities.User;
import com.knowit.erozgaar.entities.UserProviderRequest;
import com.knowit.erozgaar.entities.UserWorkerRequest;
import com.knowit.erozgaar.entities.Worker;
import com.knowit.erozgaar.services.ProviderService;
import com.knowit.erozgaar.services.UserService;

@RestController
public class UserProviderController {
	
	@Autowired
	UserService uservice;
	
	@Autowired
	ProviderService pservice;
	
//	@GetMapping("/getuserproviderbyid")
//	 public UserProviderRequest getUserProviderById(@RequestParam("uid") int uid) {
//		
//		User u= uservice.getUserById(uid);
//		Provider p= pservice.getProviderById(uid);		
//		UserProviderRequest providerdetails = new UserProviderRequest(u.getId(),u.getUserName(),u.getPassword(),u.getPhoneNumber(),
//				u.getGender(),u.getRole(),u.getActive(),u.getAdhaar(),u.getAccountNumber(),u.getSecurityQuestion(),u.getAnswer(),
//				p.getId(),p.getFirstName(),p.getMiddleName(),p.getLastName(),p.getOrganization(),p.getEducation(),p.getAddress());
//		return providerdetails;
//	 }
	
	
//	@PutMapping("/updateProvider")
//   public  int updateUserProvider( @RequestBody UserProviderRequest up) {
//		System.out.println(up);
//      
//		String fname=up.getFirstName();
//		String mname=up.getMiddleName();
//		String lname=up.getLastName();
//		String org = up.getOrganization();
//		Integer uid=up.getUserId();
//		
//		
//		return pservice.updateProvider(fname,mname,lname, org,uid);  
//   }

}
