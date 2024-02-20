package com.knowit.erozgaar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.knowit.erozgaar.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

}
