package com.knowit.erozgaar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.knowit.erozgaar.entities.User;

import jakarta.transaction.Transactional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	
}
