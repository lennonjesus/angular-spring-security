package com.lennonjesus.test;

import com.lennonjesus.test.security.ApplicationSecurity;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.groovy.template.GroovyTemplateAutoConfiguration;
import org.springframework.boot.autoconfigure.jmx.JmxAutoConfiguration;
import org.springframework.boot.autoconfigure.web.ErrorMvcAutoConfiguration;
import org.springframework.boot.autoconfigure.websocket.WebSocketAutoConfiguration;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

/**
 * @author Lennon Jesus
 */
@ComponentScan(basePackages = {"com.lennonjesus.test"})
@Configuration
@EnableWebMvc
@EnableAutoConfiguration(exclude = {ErrorMvcAutoConfiguration.class,
        WebSocketAutoConfiguration.class, JmxAutoConfiguration.class, GroovyTemplateAutoConfiguration.class})

public class App extends SpringBootServletInitializer {

    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(App.class);

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

    @Bean
    public WebSecurityConfigurerAdapter webSecurityConfigurerAdapter() {
        return new ApplicationSecurity();
    }

}