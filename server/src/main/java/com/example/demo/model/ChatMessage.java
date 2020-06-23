package com.example.demo.model;

import lombok.Data;

@Data
public class ChatMessage {
	private String from;
	private Long timeStamp;
	private String text;
}
