package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.model.Location;
import com.example.demo.repos.LocationRepository;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "location")
@Controller
@RequestMapping("/location")
public class LocationController extends CrudController<Location> {
	
	public LocationController(LocationRepository repository) {
		super(repository);
	}
	
}
