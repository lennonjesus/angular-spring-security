package com.lennonjesus.test.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

/**
 * @author Lennon Jesus
 */
@RestController
public class HelloRestController {

    @RequestMapping(value = "/public", produces = "application/json")
    public Mensagem publicHello() {
        return new Mensagem("This is public info!");
    }

    @RequestMapping("/secret")
    public @ResponseBody
    Mensagem secret() {
        return new Mensagem("This is top secret info!");
    }

    @RequestMapping("/user")
    public Principal getUser(Principal user) {
        return user;
    }

    class Mensagem {

        private String texto;

        public Mensagem(String texto) {
            this.texto = texto;
        }

        public String getTexto() {
            return texto;
        }

        public void setTexto(String texto) {
            this.texto = texto;
        }
    }

}
