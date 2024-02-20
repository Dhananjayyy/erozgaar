package com.knowit.erozgaar.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="cities")
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="city_id")
    private int id;

    @Column(name="city_name")
    private String cityName;

    @ManyToOne
	@JoinColumn(name="state_id")
    private State state;

    public City() {
        super();
    }

    public City(int id, String cityName, State state) {
        this.id = id;
        this.cityName = cityName;
        this.state = state;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String city_name) {
        this.cityName = city_name;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "City [id=" + id + ", city_name=" + cityName + ", state=" + state + "]";
    }
}
