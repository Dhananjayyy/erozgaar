package com.knowit.erozgaar.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.knowit.erozgaar.entities.JobAllocation;
import com.knowit.erozgaar.entities.Provider;
import com.knowit.erozgaar.entities.Worker;

import jakarta.transaction.Transactional;

@Repository
public interface ProviderRepository extends JpaRepository<Provider, Integer>{

	@Query("SELECT p FROM Provider p WHERE p.user.userName = :userName")
    Provider findByUsername(@Param("userName") String userName);
    
    @Query("SELECT p from Provider p where p.user.id in (SELECT u.id FROM User u where u.active = 0 and u.role.role_id=2)")
	public List<Provider> getListForApproval();
    
    @Query("SELECT p FROM Provider p WHERE p.user.id = :userId")
    Provider getProviderByUserId(@Param("userId") int userId);
    
    @Query("SELECT p.id FROM Provider p WHERE p.user.id = :userId")
    int getProviderIdByUserId(@Param("userId") int userId);
    
    @Query("SELECT p FROM Provider p WHERE p.user.id = :uid")
   	public Provider getProviderById(@Param("uid") int uid);
  
    @Transactional
    @Modifying
    @Query("UPDATE Provider SET firstName=:fname, middleName=:mname, lastName=:lname,organization=:org WHERE user.id=:uid")
    public int updateProvider(@Param("fname") String fname, @Param("mname") String mname, @Param("lname") String lname,@Param("org") String org, @Param("uid") int uid);
    
    @Query("SELECT p FROM Provider p WHERE p.user.id IN (SELECT u.id FROM User u, Provider p WHERE u.active = 0 AND p.address.city.id = :cityId)")
    public List<Provider> getListForApprovalByCity(@Param("cityId") int cityId);
    
}