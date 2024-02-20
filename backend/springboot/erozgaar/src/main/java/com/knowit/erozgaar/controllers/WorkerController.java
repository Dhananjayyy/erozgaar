package com.knowit.erozgaar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.knowit.erozgaar.entities.VillageLevelConnector;
import com.knowit.erozgaar.entities.Worker;
import com.knowit.erozgaar.services.VillageLevelConnectorService;
import com.knowit.erozgaar.services.WorkerService;

@RestController
public class WorkerController {

    @Autowired
    WorkerService wservice;
    
    @Autowired
    VillageLevelConnectorService vlcservice;
    
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
    
    @GetMapping("/getworkerbyid")
  	 public Worker getWorkerById(@RequestParam("uid") int uid) {
  		 return wservice.getWorkerById(uid);
  	 }
}
