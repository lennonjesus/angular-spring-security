package com.lennonjesus.test;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

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
