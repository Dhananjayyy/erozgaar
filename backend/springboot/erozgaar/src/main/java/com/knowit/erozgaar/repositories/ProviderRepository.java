package com.knowit.erozgaar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.knowit.erozgaar.entities.Provider;

@Repository
public interface ProviderRepository extends JpaRepository<Provider, Integer>{
    
}