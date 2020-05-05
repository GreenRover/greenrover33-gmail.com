package com.example.demo.repos;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Coaster;
import com.example.demo.model.Typ;

@Repository
public interface CoasterRepository extends RepositoryHavingName<Coaster> {

	List<Coaster> findByTyp(Typ typ);
	
	@Query("FROM coaster c WHERE c.typ = 81233 AND c.location = 78685")
	List<Coaster> findWoodCoaster();
}
