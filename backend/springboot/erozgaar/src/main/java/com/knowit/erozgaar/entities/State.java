package com.knowit.erozgaar.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="states")
public class State {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="state_id")
    private int id;
    @Column(name="state_name")
    private String stateName;

    public State() {
        super();
    }

    public State(int id, String state_name) {
        this.id = id;
        this.stateName = state_name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStateName() {
        return stateName;
    }

    public void setStateName(String state_name) {
        this.stateName = state_name;
    }

    @Override
    public String toString() {
        return "State [id=" + id + ", state_name=" + stateName + "]";
    }

}
