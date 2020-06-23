package com.example.demo.controler;

import javax.annotation.PostConstruct;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.ChatMessage;

import reactor.core.publisher.ConnectableFlux;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;

@CrossOrigin(origins = "*")
@RestController
public class ChatController {
	
	private FluxSink<ChatMessage> sink;
	private ConnectableFlux<ChatMessage> flux;

	@PostConstruct
	private void init() {
		Flux<ChatMessage> f = Flux.create(sink -> {
			this.sink = sink;
		});
		this.flux = f.publish();
	}
	
	@GetMapping(value = "chat")
	public Flux<ChatMessage> getChatMessages() {
		return flux;
	}

	@PostMapping(value = "chat/save")
	public void saveNewMessage(@RequestBody ChatMessage message) {
		sink.next(message);
	}
	
	@PostMapping(value = "chat/close")
	public void closeChat() {
		sink.complete();
	}
}
