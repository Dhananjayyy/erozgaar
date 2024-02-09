package com.knowit.erozgaar.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.knowit.erozgaar.entities.Worker;
import com.knowit.erozgaar.repositories.WorkerRepository;

@Service
public class WorkerService {
    @Autowired
	WorkerRepository urepo;
	
	public Worker save(Worker u)
	{
		return urepo.save(u);
	}
}