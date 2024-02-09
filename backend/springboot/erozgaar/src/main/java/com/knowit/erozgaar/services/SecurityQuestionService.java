package com.knowit.erozgaar.services;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.knowit.erozgaar.entities.SecurityQuestion;
import com.knowit.erozgaar.repositories.SecurityQuestionRepository;


@Service
public class SecurityQuestionService {
    @Autowired
	SecurityQuestionRepository sqrepo;
	
	public SecurityQuestion getById(int id)
	{
		Optional<SecurityQuestion> or = sqrepo.findById(id);
		SecurityQuestion r;
		try
		{
			r = or.get();
		}
		catch(Exception e)
		{
			r=null;
		}
		return r;
	}
}