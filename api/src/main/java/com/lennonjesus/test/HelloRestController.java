package com.lennonjesus.test;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Lennon Jesus
 */
@RestController
public class HelloRestController {

    @RequestMapping("/public")
    public String publicHello() {
        return "Public info";
    }

    @RequestMapping("/secret")
    public String secret() {
        return "Top secret!";
    }

}
