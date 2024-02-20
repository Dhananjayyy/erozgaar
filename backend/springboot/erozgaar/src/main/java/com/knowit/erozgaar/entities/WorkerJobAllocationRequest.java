package com.knowit.erozgaar.entities;

import java.util.HashSet;
import java.util.Set;

public class WorkerJobAllocationRequest {
	private int jobId;
    private Set<Integer> workers;
    
    
    
	public WorkerJobAllocationRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	public WorkerJobAllocationRequest(int jobId, Set<Integer> workers) {
		super();
		this.jobId = jobId;
		this.workers = workers;
	}

	public int getJobId() {
		return jobId;
	}

	public void setJobId(int jobId) {
		this.jobId = jobId;
	}

	public Set<Integer> getWorkers() {
		return workers;
	}

	public void setWorkers(Set<Integer> workers) {
		this.workers = workers;
	}

	@Override
	public String toString() {
		return "WorkerJobAllocationRequest [jobId=" + jobId + ", workers=" + workers + "]";
	}
}
