package com.knowit.erozgaar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.knowit.erozgaar.entities.User;
import com.knowit.erozgaar.entities.UserProviderRequest;
import com.knowit.erozgaar.entities.UserWorkerRequest;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	boolean existsById(int id);
	
	@Query("SELECT u FROM User u WHERE u.userName = :username AND u.password = :password")
    User findUserByUsernameAndPassword(@Param("username") String username, @Param("password") String password);

	@Query("SELECT u FROM User u WHERE u.userName = :username")
	User findUserByUsername(@Param("username") String username);

	// @Query("SELECT u FROM User u JOIN UserWorker w ON u.id = w.userId WHERE u.id = :id")
	// UserWorker findUserWorkerById(@Param("id") int id);

	// @Query("SELECT u FROM User u JOIN UserWorker w ON u.id = w.userId WHERE u.userName = :username")
	// UserWorker findUserWorkerByUsername(@Param("username") String username);

	// @Query("SELECT u FROM User u JOIN UserProvider w ON u.id = w.userId WHERE u.id = :id")
	// UserProvider findUserProviderById(@Param("id") int id);

	// @Query("SELECT u FROM User u JOIN UserProvider w ON u.id = w.userId WHERE u.userName = :username")
	// UserProvider findUserProviderByUsername(@Param("username") String username);

}
