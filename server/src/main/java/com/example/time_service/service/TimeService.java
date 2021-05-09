package com.example.time_service.service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
@RequiredArgsConstructor
public class TimeService {
	private final RestTemplate timeServiceRestTemplate;

	public long getTimestmap() {
		Timestamp timeStamp = timeServiceRestTemplate.getForObject("/time", Timestamp.class);
		return timeStamp.getTs();
	}

	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	private static class Timestamp {
		private long ts;
	}

}
