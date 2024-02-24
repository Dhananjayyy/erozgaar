package com.knowit.erozgaar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.knowit.erozgaar.entities.Admin;

import jakarta.transaction.Transactional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer>{

    @Query("SELECT a FROM Admin a WHERE a.user.userName = :userName")
    Admin findByUsername(@Param("userName") String userName);
    
    @Transactional
    @Modifying
    @Query("UPDATE User set phoneNumber=:phone where id=:uid")
    int updateAdmin(@Param("phone") String phone,@Param("uid") int uid);
}