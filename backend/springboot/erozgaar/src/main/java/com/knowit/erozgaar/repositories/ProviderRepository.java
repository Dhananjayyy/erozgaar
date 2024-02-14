package com.knowit.erozgaar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.knowit.erozgaar.entities.Provider;

@Repository
public interface ProviderRepository extends JpaRepository<Provider, Integer>{

    @Query("SELECT p FROM Provider p WHERE p.user.userName = :userName")
    Provider findByUsername(@Param("userName") String userName);
    
}