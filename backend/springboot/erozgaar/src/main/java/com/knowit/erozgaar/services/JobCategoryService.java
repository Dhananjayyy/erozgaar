package com.knowit.erozgaar.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.knowit.erozgaar.entities.JobCategory;
import com.knowit.erozgaar.entities.Role;
import com.knowit.erozgaar.repositories.JobCategoryRepository;

@Service
public class JobCategoryService {
	
	JobCategoryRepository jcrepo;
	
	public JobCategory getById(int id)
	{
		Optional<JobCategory> or = jcrepo.findById(id);
		JobCategory jc;
		try
		{
			jc = or.get();
		}
		catch(Exception e)
		{
			jc=null;
		}
		return jc;
	}
}
