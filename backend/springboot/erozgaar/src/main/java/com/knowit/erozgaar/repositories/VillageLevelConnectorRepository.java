package com.knowit.erozgaar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.knowit.erozgaar.entities.VillageLevelConnector;

@Repository
public interface VillageLevelConnectorRepository extends JpaRepository<VillageLevelConnector, Integer>{
    
    @Query("SELECT v FROM VillageLevelConnector v WHERE v.user.userName = :userName")
    VillageLevelConnector findByUsername(@Param("userName") String userName);
    
    @Query("SELECT v.address.city.id FROM VillageLevelConnector v WHERE v.user.id = :userId")
    public int getCityIdbyUserId(@Param("userId") int userId);
}