package com.example.time_service.api;

import lombok.Data;

@Data
public class GenericError {
	private int code;
    private String message;
}
