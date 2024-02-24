package com.knowit.erozgaar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.knowit.erozgaar.entities.State;

@Repository
public interface StateRepository extends JpaRepository<State, Integer>{

}
