package com.knowit.erozgaar.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.knowit.erozgaar.entities.Job;
import com.knowit.erozgaar.entities.JobAllocation;
import com.knowit.erozgaar.entities.VillageLevelConnector;
import com.knowit.erozgaar.entities.Worker;
import com.knowit.erozgaar.repositories.JobAllocationRepository;

@Service
public class JobAllocationService {
	
	@Autowired
	JobAllocationRepository jarepo;
	
	public JobAllocation save(JobAllocation job) {
		return jarepo.save(job);
	}
	
	public void saveAllocation(Job job, Worker worker) {
		System.out.println("in service");
		jarepo.save(new JobAllocation(job, worker));
		System.out.println("one worker saved");
	}
	
	public boolean isAllocated(int jobId, int workerId) {
		return jarepo.isAllocated(jobId, workerId) != null;
	}
	
	public List<JobAllocation> getAllottedWorkersByProviderUserId(int uid) {
		return jarepo.getAllottedWorkersByProviderUserId(uid);
	}
	
	public int pick(int jaid) {
		return jarepo.pick(jaid);
	}
	
	public void updateJobStatus(int jobId) {
        jarepo.updateRejectionJobStatus(jobId);
    }
}
