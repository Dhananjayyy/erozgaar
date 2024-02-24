package com.knowit.erozgaar.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.knowit.erozgaar.entities.Job;
import com.knowit.erozgaar.entities.User;

import jakarta.transaction.Transactional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	@Query("SELECT u FROM User u WHERE u.userName = :username AND u.password = :password")
	public User getUser(@Param("username") String username, @Param("password") String password);
	
	@Query("SELECT u FROM User u WHERE u.userName = :username")
	public User getUser(@Param("username") String username);
	
	@Query("SELECT u .userName FROM User u where u.userName=:username")
	public String getUserByUserName(@Param("username") String username);
	
	@Modifying
	@Query("UPDATE User SET active = 1 WHERE id = :uid")
	public int approve(@Param("uid") int uid);
	
	@Modifying
	@Query("UPDATE User set phoneNumber=:phone, accountNumber=:accno,active=:active where id=:uid")
	public int updateUser(@Param("phone")String phone,@Param("accno")String accno,@Param("active")int active,@Param("uid")Integer uid);
	
	
//	@Query("")
//	public List<Job> getJobsByVlcUserId(@Param("uid") int uid);
	
	@Modifying
	@Query("UPDATE User set phoneNumber=:phone, accountNumber=:accno where id=:uid")
	public int updateUser(@Param("phone")String phone,@Param("accno")String accno,@Param("uid")Integer uid);
	
	@Modifying
	@Query("UPDATE User SET active = 2 WHERE id = :uid")
	public int reject(@Param("uid") int uid);
	
	@Transactional
	@Modifying
	@Query("UPDATE User set phoneNumber=:phone where id=:uid")
	public int updateUser(@Param("phone")String phone,@Param("uid")Integer uid);
	
	

}
