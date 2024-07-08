package com.springreactshop.shop.admin.security;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain configureHttpSecurity(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable());

        http
        // .cors(httpSecurityCorsConfigurer -> {
        //             CorsConfiguration configuration = new CorsConfiguration();
        //             configuration.setAllowedOrigins(Arrays.asList("*"));
        //             configuration.setAllowedMethods(Arrays.asList("*"));
        //             configuration.setAllowedHeaders(Arrays.asList("*"));
        //             UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        //             source.registerCorsConfiguration("/**", configuration);
        //             httpSecurityCorsConfigurer.configurationSource(source);
        //         })
        .authorizeHttpRequests((auth) -> auth
            .requestMatchers("/api/v1/admin/**")
            .permitAll()
            .anyRequest().authenticated());


        return http.build();
    }
}
