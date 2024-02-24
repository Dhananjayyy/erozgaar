package com.knowit.erozgaar.controllers;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.knowit.erozgaar.entities.User;
import com.knowit.erozgaar.entities.UserWorkerRequest;
import com.knowit.erozgaar.entities.VillageLevelConnector;
import com.knowit.erozgaar.entities.Worker;
import com.knowit.erozgaar.services.UserService;
import com.knowit.erozgaar.services.VillageLevelConnectorService;
import com.knowit.erozgaar.services.WorkerService;

import jakarta.transaction.Transactional;

@RestController
public class WorkerController {

    @Autowired
    WorkerService wservice;
    
    @Autowired
    VillageLevelConnectorService vlcservice;
    
    @Autowired
    UserService uservice;
    
    @GetMapping("/getWorkerRegRequests")
	public List<Worker> getListForApproval(@RequestParam("userId") int userId)
	{
    	int cityId = vlcservice.getCityIdbyUserId(userId);
    	System.out.println("city id: "+cityId);
		System.out.println("sending pending approvals");
		return wservice.getWorkers(cityId);
	}
    
    @GetMapping("/getAvailableWorkers")
    public List<Worker> getAvailableWorkerByVlcUid(@RequestParam("userId") int userId, @RequestParam("jobId") int jobId){
    	return wservice.getAvailableWorkerByVlcUid(userId, jobId);
    }
    
    @GetMapping("/getuserworkerbyid")
	 public UserWorkerRequest getUserWorkerById(@RequestParam("uid") int uid) {
		User u= uservice.getUserById(uid);
		Worker w= wservice.getWorkerById(uid);
		
		UserWorkerRequest workerdetails = new UserWorkerRequest(u.getId(),u.getUserName(),u.getPassword(),u.getPhoneNumber(),
				u.getGender(),u.getRole(),u.getActive(),u.getAdhaar(),u.getAccountNumber(),u.getSecurityQuestion(),u.getAnswer(),
				w.getId(),w.getFirstName(),w.getMiddleName(),w.getLastName(),w.getEducation(),w.getAddress(),w.getJobCategory(),w.getDateOfBirth(),w.isRelocation());
		return workerdetails;
	 }
	
	@Transactional
	@PutMapping("/updateWorker")
   public  int updateWorker( @RequestBody UserWorkerRequest uw) {
		System.out.println(uw);
      
		String fname=uw.getFirstName();
		String mname=uw.getMiddleName();
		String lname=uw.getLastName();
		Integer uid=uw.getUserId();
		
		boolean relocation=uw.isRelocation();
		Date dob=uw.getDateOfBirth();
		
		String phone=uw.getPhoneNumber();
		String accno =uw.getAccountNumber();
		
		uservice.updateUser(phone,accno,uid);
		
		return wservice.updateWorker(fname,mname,lname,relocation,dob,uid);  
   }
}
