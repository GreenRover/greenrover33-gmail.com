package com.example.demo.config.security;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

public class ResourceRoleConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

	private static final String ROLE_PREFIX = "ROLE_";

	@SuppressWarnings("unchecked")
	@Override
	public Collection<GrantedAuthority> convert(Jwt jwt) {
		List<String> permissions = (List<String>) jwt.getClaims().get("permissions");

		return permissions.stream()
				.map(role -> ROLE_PREFIX + role)
				.map(SimpleGrantedAuthority::new)
				.collect(Collectors.toList());
	}
}
