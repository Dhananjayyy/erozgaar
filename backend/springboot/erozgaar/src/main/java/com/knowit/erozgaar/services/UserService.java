package com.knowit.erozgaar.services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.knowit.erozgaar.entities.User;
import com.knowit.erozgaar.repositories.SecurityQuestionRepository;
import com.knowit.erozgaar.repositories.UserRepository;



@Service
public class UserService {

	@Autowired
	UserRepository urepo;

	@Autowired
	SecurityQuestionRepository sqrepo;
	
	public User save(User u)
	{
		return urepo.save(u);
	}

	public List<User> getAll(){
		return urepo.findAll();
	}
	
	public User getUser(int id)
	{
		return urepo.findById(id).get();
	}

	public boolean existsById(int id) {
		return urepo.findById(id).isPresent();
	}

	public User existsByUsernamePassword(String username, String password) {
		User user = urepo.findUserByUsernameAndPassword(username, password);
	
		if (user != null) {
			return user;
		}
	
		return null;
	}
	

	public boolean existsByUsername(String username) {
		System.out.println(username);
		System.out.println(urepo.findUserByUsername(username));
		return urepo.findUserByUsername(username) != null;
	}

	// public UserWorker getUserWorker(int id) {
	// 	return urepo.findUserWorkerById(id);
	// }

	// public UserWorker getUserWorker(String username) {
	// 	return urepo.findUserWorkerByUsername(username);
	// }

	// public UserProvider getUserProvider(int id) {
	// 	return urepo.findUserProviderById(id);
	// }

	// public UserProvider getUserProvider(String username) {
	// 	return urepo.findUserProviderByUsername(username);
	// }
}
