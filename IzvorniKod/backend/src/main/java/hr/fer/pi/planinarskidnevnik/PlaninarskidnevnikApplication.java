package hr.fer.pi.planinarskidnevnik;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class PlaninarskidnevnikApplication {

    public static void main(String[] args) {
        SpringApplication.run(PlaninarskidnevnikApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(
                                "https://planinarski-dnevnik-frontend.herokuapp.com",
                                "http://localhost:3000",
                                "https://frontend-planinarskidnevnik.herokuapp.com",
                                "https://pdnevnik.herokuapp.com" )
                        .allowedMethods("POST", "GET", "PATCH", "PUT", "DELETE").exposedHeaders("Authorization");
            }
        };
    }

}
