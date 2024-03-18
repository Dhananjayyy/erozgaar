package com.knowit.erozgaar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.knowit.erozgaar.entities.User;
import com.knowit.erozgaar.entities.UserVlcRequest;
import com.knowit.erozgaar.entities.UserWorkerRequest;
import com.knowit.erozgaar.entities.VillageLevelConnector;
import com.knowit.erozgaar.entities.Worker;
import com.knowit.erozgaar.services.UserService;
import com.knowit.erozgaar.services.VillageLevelConnectorService;

@RestController
public class UserVlcController {
	
	@Autowired
	UserService uservice;
	
	@Autowired
	VillageLevelConnectorService vlcservice;
	

//	@GetMapping("/getuservlcbyid")
//	 public UserVlcRequest getUserVlcById(@RequestParam("uid") int uid) {
//		User u= uservice.getUserById(uid);
//		VillageLevelConnector v= vlcservice.getVlcById(uid);
//		
//		UserVlcRequest vlc = new UserVlcRequest(u.getId(),u.getUserName(),u.getPassword(),u.getPhoneNumber(),
//				u.getGender(),u.getRole(),u.getActive(),u.getAdhaar(),u.getAccountNumber(),u.getSecurityQuestion(),u.getAnswer(),
//				v.getId(),v.getFirstName(),v.getMiddleName(),v.getLastName(),v.getEducation(),v.getAddress());
//		
//		return vlc;
//	 }
//	
//	
//	@PutMapping("/updateVlc")
//    public  int updateVlc( @RequestBody UserVlcRequest uw) {
//       
//		String fname=uw.getFirstName();
//		String mname=uw.getMiddleName();
//		String lname=uw.getLastName();
//		Integer uid=uw.getUserId();
//		
//		
//		return vlcservice.updateVlc(fname,mname,lname,uid);
//	}
    

}
