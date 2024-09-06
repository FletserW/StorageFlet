package com.FletserTech.storageflet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.FletserTech.storageflet.models.ResponseModel;
import com.FletserTech.storageflet.models.UserModel;
import com.FletserTech.storageflet.service.UserService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService us;

    @PostMapping("/register")
    @Operation(summary = "Rota responsável pelo cadastro de usuario")
    public ResponseEntity<?>register(@RequestBody UserModel um){
        return us.registerChange(um, "register" );
    }

     @DeleteMapping("/remove/{id}")
     @Operation(summary = "Rota responsável pela remoção de usuarios")
    public ResponseEntity<ResponseModel> remove(@PathVariable long id) {
        return us.remove(id); 
    }

    @PutMapping("/change")
    @Operation(summary = "Rota responsável pela modificação de usuarios")
    public ResponseEntity<?>change(@RequestBody UserModel um){
        return us.registerChange(um, "change" );
    }

    @GetMapping("/list")
    @Operation(summary = "Rota responsável por listar usuarios")
    public Iterable<UserModel> list(){
        return us.list();
    }

    @PostMapping("/login")
    @Operation(summary = "Rota responsável pelo login de usuarios")
    public ResponseEntity<?> login(@RequestBody UserModel um) {
        boolean isAuthenticated = us.authenticate(um.getEmail(), um.getPassword());

        if (isAuthenticated) {
            return ResponseEntity.ok("Login bem-sucedido");
        } else {
            return ResponseEntity.status(401).body("Email ou senha incorretos");
        }
    }

    @GetMapping("/")
    @Operation(summary = "Rota responsável pelo teste de conexão")
    public String rota(){
        return "Api funcionando";
    }

}
