package com.knowit.erozgaar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.knowit.erozgaar.entities.JobCategory;

@Repository
public interface JobCategoryRepository extends JpaRepository<JobCategory, Integer>{

}
