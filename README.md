# e-रोज़गार-Connect

## What it does

Right now, India is facing a major issue of unemployment, particularly in the unorganized sector.

The unorganized sector contains a significant portion of the Indian workforce, ranging from various informal and non-standardized jobs.
This sector often faces challenges related to job visibility, accessibility, and fair employment practices.

The unorganized sector, characterized by its diverse and informal nature, lacks a centralized platform for job seekers and employers.
Many individuals in this sector struggle to find suitable employment opportunities, while employers face difficulties in identifying and connecting with potential workers.	

The eरोज़गार-Connect job portal addresses these challenges by providing a digital space that facilitates efficient job matching, enhances job visibility, and promotes fair employment practices.

## How it works

- There are mainly three types of users:
  1. Village Level Connectors
  2. Job Service Providers
  3. Workers

- Village Level Connector will handle Job Service Provider’s and Worker’s
registration and will assign work/jobs to different workers.
- People who want to add themselves as Workers or Service Providers can apply to
the respective service by themselves or through the means of Village Level
Connector(VLC).
- Job Service Providers will add the work and job-related requirements.
- All eरोज़गार-Connect system will be maintained by Admin.
- Unorganized Workers will be getting a job through the eरोज़गार-Connect portal for
various skills with the added benefit of having Village Level Connector act as a verified
intermediary.

## Requirements
### Hardware

* Any modern computer which with > 8 GB RAM

### Software

*   Vite - React
*   springboot starter data jpa
*   springboot starter security
*   mysql connector
*   .NET Core 6
*   Enitity Framework

## Architecture

This project uses microservices architecture, wherein the data and processing management is split into two services - Springboot and .NET Core REST.

| Microservice | Module  |
|-------------------|-------------------|
| Springboot REST           | Worker, Job Provider, Village Level Connector|
| .NET REST| Admin, Payments |

## Folder/Directory Structure

- **eRozgaar**
  - *frontend*
    - React components and files
  - *backend*
    - *springboot*
      - Spring Boot project and files
    - *dotnet*
      - .NET project and files
  - *database*
    - Database-related files and scripts

## Screenshots
![Homepage eRozgaar-Connect](https://github.com/Dhananjayyy/erozgaar/assets/36818729/19cb0f6e-e16c-4f58-875c-cd2d672c1c7c)

![jobcompleted](https://github.com/Dhananjayyy/erozgaar/assets/36818729/32545362-9eae-4aa4-8a12-77301c9b82e4)

![vlcdashboard](https://github.com/Dhananjayyy/erozgaar/assets/36818729/660709ca-2191-4b21-b72d-00d2da17e519)

