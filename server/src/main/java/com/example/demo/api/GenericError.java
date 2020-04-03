package com.example.demo.api;

import lombok.Data;

@Data
public class GenericError {
	private int code;
    private String message;
}
