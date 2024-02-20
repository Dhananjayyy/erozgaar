package com.knowit.erozgaar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.knowit.erozgaar.entities.Job;
import com.knowit.erozgaar.entities.JobAllocation;
import com.knowit.erozgaar.entities.Provider;
import com.knowit.erozgaar.entities.User;
import com.knowit.erozgaar.services.JobAllocationService;
import com.knowit.erozgaar.services.JobService;
import com.knowit.erozgaar.services.ProviderService;
import com.knowit.erozgaar.services.UserService;

@RestController
public class JobController {
	
	@Autowired
	JobService jservice;
	
	@Autowired
	JobAllocationService jaservice;
	
	@Autowired
	ProviderService pservice;
	
	@Autowired
	UserService uservice;
	
	@GetMapping("/getAllJobs")
	public List<Job> getAllJobs() {
		return jservice.getAllJobs();
	}
	
	@GetMapping("/getAllJobsByVlc")
	public List<Job> getAllJobsByVlc(@RequestParam int id) {
		return jservice.getAllJobsByVlc(id);
	}
	
	@PostMapping("/addJob")
	public boolean addJob(@RequestParam("userId") int userId, @RequestBody Job job) {
		Provider provider = pservice.getProviderByUserId(userId);
//		System.out.println(provider.getAddress());
//		System.out.println(provider);
//		System.out.println(job.getAddress());
		job.setProvider(provider);
		return jservice.save(job);
	}
	
	@PostMapping("/addJobAllocation")
	public JobAllocation addJobAllocation(@RequestBody JobAllocation job) {
		return jaservice.save(job);
	}

}
