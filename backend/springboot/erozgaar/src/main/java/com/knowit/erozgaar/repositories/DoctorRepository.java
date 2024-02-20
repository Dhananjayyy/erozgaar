package com.knowit.erozgaar.repositories;

import java.util.List;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.knowit.erozgaar.entities.Doctor;
import com.knowit.erozgaar.entities.User;

@Transactional
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
	
	@Query("select d from Doctor d where d.login_id = :l")
	public Doctor getDoctor(User l);
	
	@Query("select d from Doctor d where d.login_id in (select l from User l where active = false)")
	public List<Doctor> getListForApproval();
	
	@Modifying
	@Query("update Doctor set picture = :data where doctor_id = :id")
	public int upload(int id,byte [] data);

}
