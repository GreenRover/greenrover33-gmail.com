package com.example.time_service.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.time_service.model.Location;
import com.example.time_service.repos.LocationRepository;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "location")
@Controller
@RequestMapping("/location")
public class LocationController extends CrudController<Location> {
	
	public LocationController(LocationRepository repository) {
		super(repository);
	}
	
}
