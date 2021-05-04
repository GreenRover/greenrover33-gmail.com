package com.example.time_service.controller;

import javax.annotation.security.RolesAllowed;

import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/security-demo")
public class SecurityDemoController {

	@PreAuthorize("hasRole('make:booh')")
	@GetMapping(path = "PreAuthorize")
	public String demoPreAuthorize() {
		return "Validated with: PreAuthorize";
	}

	@Secured({ "ROLE_make:booh" })
	@GetMapping(path = "Secured")
	public String demoSecured() {
		return "Validated with: Secured";
	}

	@RolesAllowed({ "make:booh" })
	@GetMapping(path = "RolesAllowed")
	public String demoRolesAllowed() {
		return "Validated with: RolesAllowed";
	}

	@RolesAllowed({ "make:booh" })
	@GetMapping(path = "SayHello")
	public String demoSayHello(JwtAuthenticationToken principal) {
		return "Hello: " + principal.getTokenAttributes().get("https://mtrail.ch/nickname");
	}

}
