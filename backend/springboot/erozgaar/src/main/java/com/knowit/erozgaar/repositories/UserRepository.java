package com.knowit.erozgaar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.knowit.erozgaar.entities.User;

import jakarta.transaction.Transactional;

@Transactional
public interface UserRepository extends JpaRepository<User, Integer> {
	@Query("SELECT u FROM User u WHERE u.userName = :username AND u.password = :password")
	public User getUser(@Param("username") String username, @Param("password") String password);
	
	@Query("SELECT u FROM User u WHERE u.userName = :username")
	public User getUser(@Param("username") String username);
	
	@Modifying
	@Query("UPDATE User SET active = true WHERE id = :uid")
	public int approve(@Param("uid") int uid);

}
