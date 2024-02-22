package com.knowit.erozgaar.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.knowit.erozgaar.entities.JobAllocation;
import com.knowit.erozgaar.entities.Provider;
import com.knowit.erozgaar.entities.Worker;

@Repository
public interface ProviderRepository extends JpaRepository<Provider, Integer>{

    @Query("SELECT p FROM Provider p WHERE p.user.userName = :userName")
    Provider findByUsername(@Param("userName") String userName);
    
    @Query("SELECT p from Provider p where p.id in (SELECT u.id FROM User u where u.active = false)")
	public List<Provider> getListForApproval();
    
    @Query("SELECT p FROM Provider p WHERE p.user.id = :userId")
    Provider getProviderByUserId(@Param("userId") int userId);
    
    @Query("SELECT p.id FROM Provider p WHERE p.user.id = :userId")
    int getProviderIdByUserId(@Param("userId") int userId);
    
}