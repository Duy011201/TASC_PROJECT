package com.example.fileservice;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.FileSystemResource;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.RouterFunctions;
import org.springframework.web.servlet.function.ServerResponse;

@Configuration
public class FileServiceWebConfig  {
    @Bean
    public RouterFunction<ServerResponse> staticResources() {
        return RouterFunctions.resources("/uploads/**", new FileSystemResource("uploads/"));
    }
}
