package com.knowit.erozgaar.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="roles")
public class Role {
	@Id
	int role_id;
	String role_name;
	public int getRoleId() {
		return role_id;
	}
	public void setRoleId(int role_id) {
		this.role_id = role_id;
	}
	public String getRoleName() {
		return role_name;
	}
	public void setRolName(String role_name) {
		this.role_name = role_name;
	}
	
	

}
