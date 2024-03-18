package com.knowit.erozgaar.controllers;


import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.knowit.erozgaar.entities.User;
import com.knowit.erozgaar.entities.UserWorkerRequest;
import com.knowit.erozgaar.entities.Worker;
import com.knowit.erozgaar.services.UserService;
import com.knowit.erozgaar.services.WorkerService;

@RestController
public class UserWorkerController {
	
	@Autowired
	UserService uservice;
	
	@Autowired
	WorkerService wservice;
	
	@GetMapping("/getuserworkerbyid")
	 public UserWorkerRequest getUserWorkerById(@RequestParam("uid") int uid) {
		User u= uservice.getUserById(uid);
		Worker w= wservice.getWorkerById(uid);
		
		UserWorkerRequest workerdetails = new UserWorkerRequest(u.getId(),u.getUserName(),u.getPassword(),u.getPhoneNumber(),
				u.getGender(),u.getRole(),u.getActive(),u.getAdhaar(),u.getAccountNumber(),u.getSecurityQuestion(),u.getAnswer(),
				w.getId(),w.getFirstName(),w.getMiddleName(),w.getLastName(),w.getEducation(),w.getAddress(),w.getJobCategory(),w.getDateOfBirth(),w.isRelocation());
		return workerdetails;
	 }
	
	
	@PutMapping("/updateWorker")
    public  int updateWorker( @RequestBody UserWorkerRequest uw) {
		System.out.println(uw);
       
		String fname=uw.getFirstName();
		String mname=uw.getMiddleName();
		String lname=uw.getLastName();
		Integer uid=uw.getUserId();
		
		boolean relocation=uw.isRelocation();
		Date dob=uw.getDateOfBirth();
		
		
		return wservice.updateWorker(fname,mname,lname,relocation,dob,uid);  
    }

}
