package com.example.time_service.config.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
		prePostEnabled = true,
		securedEnabled = true,
		jsr250Enabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Value("${spring.security.oauth2.resourceserver.audience}")
	private String audience;
	@Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
	private String issuer;

	@Override
	public void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
				.mvcMatchers(HttpMethod.POST, "/coaster/test").hasRole("make:booh")
				.mvcMatchers(HttpMethod.GET, "/coaster/scrape/**").hasRole("get:it:all")

				.mvcMatchers(HttpMethod.GET, "/*").hasRole("read:content")
				.mvcMatchers(HttpMethod.GET, "/*/*").hasRole("read:content")
				.mvcMatchers(HttpMethod.PUT, "/*/*").hasRole("write:content")
				.mvcMatchers(HttpMethod.POST, "/*").hasRole("write:content")
				.mvcMatchers(HttpMethod.DELETE, "/*/*").hasRole("delete:content")

				.anyRequest().authenticated()

				.and().cors()
				.and().oauth2ResourceServer().jwt().jwtAuthenticationConverter(jwtAuthenticationConverter());
	}

	@Bean
	JwtDecoder jwtDecoder() {
		NimbusJwtDecoder jwtDecoder = (NimbusJwtDecoder)
				JwtDecoders.fromOidcIssuerLocation(issuer);

		OAuth2TokenValidator<Jwt> audienceValidator = new AudienceValidator(audience);
		OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(issuer);
		OAuth2TokenValidator<Jwt> withAudience = new DelegatingOAuth2TokenValidator<>(withIssuer, audienceValidator);

		jwtDecoder.setJwtValidator(withAudience);

		return jwtDecoder;
	}

	Converter<Jwt, AbstractAuthenticationToken> jwtAuthenticationConverter() {
		JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
		converter.setJwtGrantedAuthoritiesConverter(new ResourceRoleConverter());
		return converter;
	}
}