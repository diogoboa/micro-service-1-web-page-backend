package com.diogo.microservices.exceptions;


import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClientException;

import java.lang.reflect.InvocationTargetException;
import java.time.LocalDateTime;


@Slf4j
@ControllerAdvice
public class ResourceExceptionHandler {



    @ExceptionHandler(HttpServerErrorException.class)
    public ResponseEntity<?> httpServerErrorException(HttpServerErrorException e, HttpServletRequest request) {
        log.error("Erro na requisição HTTP: {}", e.getMessage());

        LocalDateTime dataHora = LocalDateTime.now();
        //int httpValue = e.getStatusCode().value();
        String messageError = e.getResponseBodyAsString();
        //String path = request.getRequestURI();

        //StandardError error = new StandardError(dataHora, httpValue, "Erro na Requisição", messageError, path);

        return ResponseEntity.status(e.getStatusCode()).body(messageError);
    }


    @ExceptionHandler(ResourceAccessException.class)
    public ResponseEntity<StandardError> handleResourceAccessException(ResourceAccessException e, HttpServletRequest request) {
        log.error("Erro na comunicação com serviço externo: {}", e.getMessage());

        LocalDateTime dataHora = LocalDateTime.now();
        int httpValue = HttpStatus.SERVICE_UNAVAILABLE.value();
        String messageError = "Servico indisponivel";
        String path = request.getRequestURI();

        StandardError error = new StandardError(dataHora, httpValue, "Erro de comunicação com serviço", messageError, path);

        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(error);
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<StandardError> execptionAll(Exception e, HttpServletRequest request){

        LocalDateTime dataHora = LocalDateTime.now();
        String erro = "ERRO";
        int httpValue = HttpStatus.FORBIDDEN.value();
        String messageError = e == null ? "Erro desconhecido" : e.getLocalizedMessage();
        String path = request.getRequestURI();
        StandardError error = new StandardError(dataHora, httpValue, erro, messageError, path);



        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }








}
