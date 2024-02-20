package com.knowit.erozgaar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.knowit.erozgaar.entities.Provider;
import com.knowit.erozgaar.entities.Worker;
import com.knowit.erozgaar.services.ProviderService;
import com.knowit.erozgaar.services.VillageLevelConnectorService;
import com.knowit.erozgaar.services.WorkerService;

@RestController
public class ProviderController {

    @Autowired
    ProviderService pservice;
    
    @Autowired
    VillageLevelConnectorService vlcservice;
    
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
    
    
}
