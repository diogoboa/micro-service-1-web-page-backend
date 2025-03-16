package com.diogo.microservices.services.implementations.imagem;

import com.diogo.microservices.services.commands.in.CriarNovaImagemCommand;
import com.diogo.microservices.services.commands.out.CriarNovaImagemCommandOut;
import com.diogo.microservices.services.interfaces.imagem.CriarNovaImagem;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class CriarNovaImagemImpl implements CriarNovaImagem {


    @Value("${urlImagens}")
    private String urlImagens;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private HttpServletRequest request;

    @Override
    public CriarNovaImagemCommandOut executar(CriarNovaImagemCommand command) {

        String token = request.getHeader("Authorization");
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization",  token);
        HttpEntity<CriarNovaImagemCommand> entity = new HttpEntity<>(command, headers);

        return restTemplate.postForObject(urlImagens, entity, CriarNovaImagemCommandOut.class);


    }








}
