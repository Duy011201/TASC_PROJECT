package com.example.cloudgateway.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;


@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter implements WebFilter {

    private final JwtConfig jwtConfig;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String requestURI = exchange.getRequest().getURI().toString();

        if (requestURI.startsWith("/api/auth")) {
            return chain.filter(exchange);
        }

        String token = jwtConfig.getJwtFromRequest(exchange.getRequest());
        if (token != null && jwtConfig.validateJwtToken(token)) {
            Authentication authentication = jwtConfig.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        return chain.filter(exchange);
    }
}
