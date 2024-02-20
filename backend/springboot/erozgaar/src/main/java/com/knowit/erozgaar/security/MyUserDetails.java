package com.knowit.erozgaar.security;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import com.knowit.erozgaar.entities.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class MyUserDetails implements UserDetails {
	
	  private int id;

	  private String username;
	  
	  private String password;
	  
	  private Role role;

	  private List<? extends GrantedAuthority> authorities;
	  
	  private boolean active;
	  
	  public static MyUserDetails build(com.knowit.erozgaar.entities.User user) {
		  	Role r = user.getRole();
			//String [] roles = s.split(",");
			List<SimpleGrantedAuthority> authority = new ArrayList<>(); 
			//for(String role : roles)
			//{
				authority.add(new SimpleGrantedAuthority(r.getRoleName()));
			//}
			
			
			System.out.println(authority);
		   System.out.println(user);
			return new MyUserDetails( user.getId(),user.getUserName(), user.getPassword(), authority, user.isActive());
		  }

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
	  
	 public Role getRole()
	 {
		 return role;
	 }
	 
	 public MyUserDetails(int id, String uid, String pwd, List<? extends GrantedAuthority> authorities, boolean active)
		{
			this.id = id;
			this.username  = uid;
			this.password = pwd;
			this.authorities = authorities;
			this.active = active;
		}
	 
	 @Override
		public Collection<? extends GrantedAuthority> getAuthorities() {
			// TODO Auto-generated method stub
			return authorities;
		}

		@Override
		public String getPassword() {
			// TODO Auto-generated method stub
			return password;
		}

		@Override
		public String getUsername() {
			// TODO Auto-generated method stub
			return username;
		}
		
		public int getId()
		{
			return id;
		}
}
