package com.knowit.erozgaar.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.knowit.erozgaar.entities.State;
import com.knowit.erozgaar.repositories.StateRepository;

@Service
public class StateService {
	
	@Autowired
	StateRepository srepo;
	
	public List<State> getStates(){
		return srepo.findAll();
	}
}
