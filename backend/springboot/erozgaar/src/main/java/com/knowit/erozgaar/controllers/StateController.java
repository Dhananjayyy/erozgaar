package com.knowit.erozgaar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.knowit.erozgaar.entities.State;
import com.knowit.erozgaar.services.StateService;

@RestController
public class StateController {
	@Autowired
	StateService sservice;

	@GetMapping("/getstates")
	public List<State> getStates()
	{

		return sservice.getStates();
	}
}
