package com.example.time_service.controller;

import javax.annotation.security.RolesAllowed;

import com.example.time_service.model.Timestamp;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "time")
@RestController
@RequestMapping("/time")
public class TimeController {

	@Operation(description = "Get the local time", tags = {"time"})
	@GetMapping("")
	@RolesAllowed("make:booh")
	public Timestamp scrapeCoasterToDisplay() {
		return new Timestamp(System.currentTimeMillis());
	}

}
