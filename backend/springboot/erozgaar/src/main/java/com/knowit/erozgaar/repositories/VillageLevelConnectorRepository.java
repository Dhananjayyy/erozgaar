package com.knowit.erozgaar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.knowit.erozgaar.entities.VillageLevelConnector;

import jakarta.transaction.Transactional;

@Repository
public interface VillageLevelConnectorRepository extends JpaRepository<VillageLevelConnector, Integer>{
    
    @Query("SELECT v FROM VillageLevelConnector v WHERE v.user.userName = :userName")
    VillageLevelConnector findByUsername(@Param("userName") String userName);
    
    @Query("SELECT v.address.city.id FROM VillageLevelConnector v WHERE v.user.id = :userId")
    public int getCityIdbyUserId(@Param("userId") int userId);
    
    @Query("SELECT v FROM VillageLevelConnector v WHERE v.user.id = :uid")
	public VillageLevelConnector getVlc(@Param("uid") int uid);
    
    @Transactional
    @Modifying
    @Query("UPDATE VillageLevelConnector SET firstName=:fname, middleName=:mname, lastName=:lname WHERE user.id=:uid")
    public int updateVlc(@Param("fname") String fname, @Param("mname") String mname, @Param("lname") String lname, @Param("uid") int uid);
}