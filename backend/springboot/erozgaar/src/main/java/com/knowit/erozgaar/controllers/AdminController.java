package com.knowit.erozgaar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.knowit.erozgaar.entities.Provider;
import com.knowit.erozgaar.services.AdminService;
import com.knowit.erozgaar.services.ProviderService;

@RestController
public class AdminController {
	
	@Autowired
	AdminService aservice;
	
	@Autowired
	ProviderService pservice;
	
	  @GetMapping("/getProviderRegRequests")
		public List<Provider> getListForApproval()
		{
			System.out.println("sending pending approvals");
			return pservice.getProviders();
		}
	
	

}
