package com.knowit.erozgaar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.knowit.erozgaar.entities.User;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	boolean existsById(int id);
	
	@Query("SELECT u FROM User u WHERE u.userName = :username AND u.password = :password")
    User findUserByUsernameAndPassword(@Param("username") String username, @Param("password") String password);
}
