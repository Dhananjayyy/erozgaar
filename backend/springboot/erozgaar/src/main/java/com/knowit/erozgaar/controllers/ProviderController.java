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
import com.knowit.erozgaar.entities.UserProviderRequest;
import com.knowit.erozgaar.entities.Worker;
import com.knowit.erozgaar.services.ProviderService;
import com.knowit.erozgaar.services.UserService;
import com.knowit.erozgaar.services.VillageLevelConnectorService;
import com.knowit.erozgaar.services.WorkerService;

import jakarta.transaction.Transactional;

@RestController
public class ProviderController {

    @Autowired
    ProviderService pservice;
    
    @Autowired
    VillageLevelConnectorService vlcservice;
    
    @Autowired
    UserService uservice;
    
//    @GetMapping("/getProvRegRequests")
//	public List<Worker> getListForApproval(@RequestParam("userId") int userId)
//	{
//    	int cityId = vlcservice.getCityIdbyUserId(userId);
//    	System.out.println("city id: "+cityId);
//		System.out.println("sending pending approvals");
//		return pservice.getProviders(cityId);
//	}
    
    @GetMapping("/getProviderByUserId")
    public Provider getProviderByUserId(int id){
    	return pservice.getProviderByUserId(id);
    }
    
//    @GetMapping("/getProviderRegRequests")
//	public List<Provider> getListForApproval()
//	{
//		System.out.println("sending pending approvals");
//		return pservice.getProviders();
//	}
    
    @GetMapping("/getuserproviderbyid")
	 public UserProviderRequest getUserProviderById(@RequestParam("uid") int uid) {
		
		User u= uservice.getUserById(uid);
		Provider p= pservice.getProviderById(uid);		
		UserProviderRequest providerdetails = new UserProviderRequest(u.getId(),u.getUserName(),u.getPassword(),u.getPhoneNumber(),
				u.getGender(),u.getRole(),u.getActive(),u.getAdhaar(),u.getAccountNumber(),u.getSecurityQuestion(),u.getAnswer(),
				p.getId(),p.getFirstName(),p.getMiddleName(),p.getLastName(),p.getOrganization(),p.getEducation(),p.getAddress());
		return providerdetails;
	 }
	
	@Transactional
	@PutMapping("/updateProvider")
  public  int updateProvider( @RequestBody UserProviderRequest up) {
		System.out.println(up);
     
		String fname=up.getFirstName();
		String mname=up.getMiddleName();
		String lname=up.getLastName();
		String org=up.getOrganization();
		Integer uid=up.getUserId();
		
		String phone=up.getPhoneNumber();
		String accno =up.getAccountNumber();
		int active=up.getActive();
		
		uservice.updateUser(phone,accno,uid);
		
		
		return pservice.updateProvider(fname,mname,lname,org,uid);  
  }
}
