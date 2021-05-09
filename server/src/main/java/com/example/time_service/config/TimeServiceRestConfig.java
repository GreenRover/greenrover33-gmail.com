package com.example.time_service.config;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.client.RootUriTemplateHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.DefaultOAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.token.DefaultAccessTokenRequest;
import org.springframework.security.oauth2.client.token.DefaultRequestEnhancer;
import org.springframework.security.oauth2.client.token.grant.client.ClientCredentialsAccessTokenProvider;
import org.springframework.security.oauth2.client.token.grant.client.ClientCredentialsResourceDetails;
import org.springframework.web.client.RestTemplate;

@Configuration
public class TimeServiceRestConfig {
	@Bean
	public RestTemplate timeServiceRestTemplate(
			@Value("${restapi.time-service.uri}") String apiClewUri,
			@Value("${restapi.time-service.audience}") String audience) {

		OAuth2RestTemplate restTemplate = new OAuth2RestTemplate(oAuthAdminDetails(), oAuthDefaultClientContext(audience));
		restTemplate.setAccessTokenProvider(oAuthAudienceTokenProvider());
		RootUriTemplateHandler.addTo(restTemplate, apiClewUri);
		return restTemplate;
	}

	@Bean
	@ConfigurationProperties("restapi.time-service.oauth2-client")
	protected ClientCredentialsResourceDetails oAuthAdminDetails() {
		return new ClientCredentialsResourceDetails();
	}

	protected DefaultOAuth2ClientContext oAuthDefaultClientContext(String audience) {
		//Add extra parameters
		DefaultAccessTokenRequest defaultAccessTokenRequest = new DefaultAccessTokenRequest();
		Map<String,String> params = new HashMap<>();
		params.put("audience", audience);
		defaultAccessTokenRequest.setAll(params);

		return new DefaultOAuth2ClientContext(defaultAccessTokenRequest);
	}

	protected ClientCredentialsAccessTokenProvider oAuthAudienceTokenProvider() {
		//Create a RequestEnhancer that will look for extra parameters
		DefaultRequestEnhancer defaultRequestEnhancer = new DefaultRequestEnhancer();
		defaultRequestEnhancer.setParameterIncludes(Collections.singletonList("audience"));

		//Create a new Token Provider
		ClientCredentialsAccessTokenProvider clientCredentialsAccessTokenProvider =  new ClientCredentialsAccessTokenProvider();
		clientCredentialsAccessTokenProvider.setTokenRequestEnhancer(defaultRequestEnhancer);

		return clientCredentialsAccessTokenProvider;
	}
}
