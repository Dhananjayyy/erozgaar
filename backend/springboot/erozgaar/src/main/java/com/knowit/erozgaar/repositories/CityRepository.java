package com.knowit.erozgaar.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.knowit.erozgaar.entities.City;

@Repository
public interface CityRepository extends JpaRepository<City, Integer> {
	
	@Query("SELECT c FROM City c WHERE c.state.id = :id")
	public List<City> getCities(@Param("id") int id);
}
