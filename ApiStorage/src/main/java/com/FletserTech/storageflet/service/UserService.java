package com.FletserTech.storageflet.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.FletserTech.storageflet.models.ResponseModel;
import com.FletserTech.storageflet.models.UserModel;
import com.FletserTech.storageflet.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository ur;

    @Autowired
    private ResponseModel rm;

    public Iterable<UserModel> list(){
        return ur.findAll();
    }

    public ResponseEntity<?> registerChange(UserModel um, String status){
        if(um.getName().equals("")){
            rm.setMessage("Nome obrigatorio");
            return new ResponseEntity<ResponseModel>(rm, HttpStatus.BAD_REQUEST);
        }else if(um.getEmail().equals("")){
            rm.setMessage("Email obrigatorio");
            return new ResponseEntity<ResponseModel>(rm, HttpStatus.BAD_REQUEST);
        }else if(um.getPassword().equals("")){
            rm.setMessage("Senha obrigatoria");
            return new ResponseEntity<ResponseModel>(rm, HttpStatus.BAD_REQUEST);
        }else{
            if(status.equals("register")){
                return new ResponseEntity<UserModel>(ur.save(um),HttpStatus.CREATED);
            }else{
                return new ResponseEntity<UserModel>(ur.save(um),HttpStatus.OK);
            }
        }
    }

    public ResponseEntity<ResponseModel> remove(Long id){
        ur.deleteById(id);

        rm.setMessage("Usuario removido com sucesso!");
        return new ResponseEntity<ResponseModel>(rm, HttpStatus.OK);
    }

    // Método para autenticar o usuário com base no email e senha
    public boolean authenticate(String email, String password) {
        Optional<UserModel> user = ur.findByEmail(email);
        
        if (user.isPresent()) {
            // Verifica se a senha informada corresponde à do banco de dados
            return user.get().getPassword().equals(password);
        }
        
        return false; // Retorna falso se o email não for encontrado ou a senha estiver errada
    }


}
