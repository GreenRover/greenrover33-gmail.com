package com.example.demo.repos;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import com.example.demo.model.HavingPK;

@NoRepositoryBean
public interface RepositoryHavingName<T extends HavingPK> extends JpaRepository<T, Integer> {

	Page<T> findByNameStartingWith(String name, Pageable pageable);
}
