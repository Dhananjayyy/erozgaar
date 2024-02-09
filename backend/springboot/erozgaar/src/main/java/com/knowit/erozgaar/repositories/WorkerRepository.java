package com.knowit.erozgaar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.knowit.erozgaar.entities.Worker;

public interface WorkerRepository extends JpaRepository<Worker, Integer>{
    
}