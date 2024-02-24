package com.knowit.erozgaar.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.knowit.erozgaar.entities.City;
import com.knowit.erozgaar.repositories.CityRepository;

@Service
public class CityService {
	@Autowired
	CityRepository cityrepo;
	
	public List<City> getCities(int id){
		return cityrepo.getCities(id);
	}
}
