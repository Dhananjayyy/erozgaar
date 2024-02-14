package com.knowit.erozgaar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.knowit.erozgaar.entities.Worker;

@Repository
public interface WorkerRepository extends JpaRepository<Worker, Integer>{

    @Query("SELECT w FROM Worker w WHERE w.user.userName = :userName")
    Worker findByUsername(@Param("userName") String userName);

}