package com.knowit.erozgaar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.knowit.erozgaar.entities.User;
import com.knowit.erozgaar.services.UserService;

import jakarta.transaction.Transactional;

@RestController
public class UserController {

	@Autowired
	UserService uservice;

	@Transactional
	@GetMapping("/approve")
	public boolean approve(@RequestParam("id") int id)
	{
		return uservice.approve(id);
	}

	@Transactional
	@GetMapping("/reject")
	public boolean reject(@RequestParam("id") int id)
	{
		return uservice.reject(id);
	}

	@GetMapping("getUser")
	public User getUser(@RequestParam("id") int id) {
		return uservice.getUser(id);
	}

	@GetMapping("checkusername")
	public boolean getUser(@RequestParam("userName") String userName) {
		return uservice.getUserByUserName(userName);
	}
}
