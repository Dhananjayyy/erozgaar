package com.knowit.erozgaar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.knowit.erozgaar.entities.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer>{

    @Query("SELECT a FROM Admin a WHERE a.user.userName = :userName")
    Admin findByUsername(@Param("userName") String userName);
}