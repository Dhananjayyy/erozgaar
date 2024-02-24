package com.knowit.erozgaar.controllers;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.knowit.erozgaar.entities.Job;
import com.knowit.erozgaar.entities.JobAllocation;
import com.knowit.erozgaar.entities.PickWorker;
import com.knowit.erozgaar.entities.Worker;
import com.knowit.erozgaar.entities.WorkerJobAllocationRequest;
import com.knowit.erozgaar.services.JobAllocationService;
import com.knowit.erozgaar.services.JobService;
import com.knowit.erozgaar.services.WorkerService;

import jakarta.transaction.Transactional;

@RestController
public class JobAllocationController {
	
	@Autowired
	JobAllocationService jaservice;
	
	@Autowired
	JobService js;
	
	@Autowired
	WorkerService ws;
	
	
	@PostMapping("/sendWorkers")
	public boolean allocateJob(@RequestBody WorkerJobAllocationRequest wjar) {
		try {
            Job job = js.getById(wjar.getJobId());
            Set<Integer> workers = wjar.getWorkers();
//            System.out.println(jobId);
//            System.out.println(workers);
            
            for(int workerId : workers) {
            	System.out.println("is allocated"+jaservice.isAllocated(wjar.getJobId(), workerId));
            	System.out.println("is available "+ws.isAvailable(workerId));
            	if(!jaservice.isAllocated(wjar.getJobId(), workerId) && ws.isAvailable(workerId)) {
            		Worker worker = ws.getById(workerId);
            		jaservice.saveAllocation(job, worker);
            	}
            }
            return true;
        } catch (Exception e) {
            return false;
        }
	}
	
	@GetMapping("/getAllocatedWorkers")
	public List<JobAllocation> getAllocatedWorkers(@RequestParam("userId") int userId){
		List<JobAllocation> list = null;
		try {
			list = jaservice.getAllottedWorkersByProviderUserId(userId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	@GetMapping("/getAssignedWorkers")
	public List<Worker> getAssignedWorkers(@RequestParam("jobId") int jobId){
		List<Worker> w = null;
		try {
			w = jaservice.getWorkerByJob(jobId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return w;
	}
	
	@Transactional
	@PostMapping("/pickWorkers")
	public boolean pickWorkers(@RequestParam("jobId") int jobId,@RequestBody PickWorker pw) {
		//System.out.println("Job id " + jobId);
		for(int jobAllocationId : pw.getAllocationIds()){
			System.out.println("job allocation ids");
			System.out.println(jobAllocationId);
			jaservice.pick(jobAllocationId);
		}
		jaservice.updateJobStatus(jobId);
		return true;
	}
}
