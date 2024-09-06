package com.FletserTech.storageflet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
@OpenAPIDefinition(
	info = @Info(
		title = "Storage Flet API",
		version = "1.0",
		description = "Api para gerenciamento de estoque e fornecedores.",
		contact = @Contact(name = "FletserW", email = "nicolas.s.borba1@gmail.com", url = "https://github.com/FletserW")
	)
)
public class StoragefletApplication {

	public static void main(String[] args) {
		SpringApplication.run(StoragefletApplication.class, args);
	}

}
