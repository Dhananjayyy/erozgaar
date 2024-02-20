package com.knowit.erozgaar.entities;

import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;

import com.knowit.erozgaar.repositories.ProviderRepository;
import com.knowit.erozgaar.services.ProviderService;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "jobs")
public class Job {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "job_id")
	private int id;
	
	@Column(name = "job_title")
	private String title;
	
	@Column(name = "job_description")
	private String description;
	
	@ManyToOne
	@JoinColumn(name="job_category_id")
	private JobCategory jobCategory;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="address_id")
	private Address address;
	
	@Column(name = "job_status")
	private int jobStatus;
	
	@Column(name = "no_of_workers")
	private int noOfWorkers;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="provider_id")
	private Provider provider;
	
	@Column(name = "post_date")
	private Date postDate;
	
	@Column(name = "start_date")
	private Date startDate;
	
	@Column(name = "end_date")
	private Date endDate;
	
//	@Column(name = "payment_amount")
//	private double paymentAmount;
	
	public Job() {
		// TODO Auto-generated constructor stub
	}

	public Job(int id, String title, String description, JobCategory jobCategory, Address address, int jobStatus,
			int noOfWorkers, Provider provider, Date postDate, Date startDate, Date endDate) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.jobCategory = jobCategory;
		this.address = address;
		this.jobStatus = jobStatus;
		this.noOfWorkers = noOfWorkers;
		this.provider = provider;
		this.postDate = postDate;
		this.startDate = startDate;
		this.endDate = endDate;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public JobCategory getJobCategory() {
		return jobCategory;
	}

	public void setJobCategory(JobCategory jobCategory) {
		this.jobCategory = jobCategory;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public int getJobStatus() {
		return jobStatus;
	}

	public void setJobStatus(int jobStatus) {
		this.jobStatus = jobStatus;
	}

	public int getNoOfWorkers() {
		return noOfWorkers;
	}

	public void setNoOfWorkers(int noOfWorkers) {
		this.noOfWorkers = noOfWorkers;
	}

	public Provider getProvider() {
		return provider;
	}

	public void setProvider(Provider provider) {
		this.provider = provider;
	}

	public Date getPostDate() {
		return postDate;
	}

	public void setPostDate(Date postDate) {
		this.postDate = postDate;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

//	public double getPaymentAmount() {
//		return paymentAmount;
//	}
//
//	public void setPaymentAmount(double paymentAmount) {
//		this.paymentAmount = paymentAmount;
//	}

	@Override
	public String toString() {
		return "Jobs [id=" + id + ", title=" + title + ", description=" + description + ", jobCategory=" + jobCategory
				+ ", address=" + address + ", jobStatus=" + jobStatus + ", noOfWorkers=" + noOfWorkers + ", provider="
				+ provider + ", postDate=" + postDate + ", startDate=" + startDate + ", endDate=" + endDate
				+ ", paymentAmount=" + "]";
	}

}
