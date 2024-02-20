package com.knowit.erozgaar.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.knowit.erozgaar.entities.Worker;
import com.knowit.erozgaar.repositories.WorkerRepository;

@Service
public class WorkerService {
    @Autowired
	WorkerRepository wrepo;
	
	public Worker save(Worker u)
	{
		return wrepo.save(u);
	}

	public Worker getByUsername(String username) {
		return wrepo.findByUsername(username);
	}
}