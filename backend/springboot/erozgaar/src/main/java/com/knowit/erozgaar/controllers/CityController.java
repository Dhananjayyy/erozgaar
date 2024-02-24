package com.knowit.erozgaar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.knowit.erozgaar.entities.City;
import com.knowit.erozgaar.services.CityService;

@RestController
public class CityController {
	@Autowired
	CityService cityservice;
	
	@GetMapping("/getcities")
	public List<City> getCities(@RequestParam("id") int id){
		return cityservice.getCities(id);
	}
}
