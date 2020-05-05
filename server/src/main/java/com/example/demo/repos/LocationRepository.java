package com.example.demo.repos;

import org.springframework.stereotype.Repository;

import com.example.demo.model.Location;

@Repository
public interface LocationRepository extends RepositoryHavingName<Location> {
		
}
