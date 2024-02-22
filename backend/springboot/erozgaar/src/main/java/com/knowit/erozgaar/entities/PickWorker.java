package com.knowit.erozgaar.entities;

import java.util.Set;

public class PickWorker {
	
	private Set<Integer> allocationIds;
	
	public PickWorker() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PickWorker(Set<Integer> allocationIds) {
		super();
		this.allocationIds = allocationIds;
	}

	public Set<Integer> getAllocationIds() {
		return allocationIds;
	}

	public void setAllocationIds(Set<Integer> allocationIds) {
		this.allocationIds = allocationIds;
	}

	@Override
	public String toString() {
		return "PickWorker [allocationIds=" + allocationIds + "]";
	}
	
}
