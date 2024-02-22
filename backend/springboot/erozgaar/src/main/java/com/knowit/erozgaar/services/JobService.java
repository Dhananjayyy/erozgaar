package com.knowit.erozgaar.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.knowit.erozgaar.entities.Job;
import com.knowit.erozgaar.repositories.JobRepository;

@Service
public class JobService {
	
	@Autowired
	JobRepository jrepo;
	
	public boolean save(Job job) {
		return jrepo.save(job) != null;
	}
	
	public List<Job> getAllJobs() {
		return jrepo.findAll();
	}
	
	public List<Job> getAllJobsByVlc(int id) {
		return jrepo.getAllJobsByVlcCity(id);
	}
	
	public Job getById(int id) {
		return jrepo.getJobById(id);
	}
	
	public List<Job> getByUserId(int uid){
		return jrepo.getJobByUserId(uid);
	}
	
	public List<Job> getAllJobsForWorker(int id)
	{
		return jrepo.getAllJobsForWorker(id);
	}
	
	public void updateCompletionJobStatus(int jobId) {
        jrepo.UpdateCompletionJobStatus(jobId);
    }

}
