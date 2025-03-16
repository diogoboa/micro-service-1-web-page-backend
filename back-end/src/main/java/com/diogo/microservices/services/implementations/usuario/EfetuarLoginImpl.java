package com.diogo.microservices.services.implementations.usuario;

import com.diogo.microservices.services.commands.in.EfetuarLoginDeUsuarioCommandIn;
import com.diogo.microservices.services.commands.out.EfetuarLoginDeUsuarioCommandOut;
import com.diogo.microservices.services.interfaces.usuario.EfetuarLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class EfetuarLoginImpl implements EfetuarLogin {

    @Value("${urlLogin}")
    private String urlLogin;



    @Autowired
    private RestTemplate restTemplate;

    @Override
    public EfetuarLoginDeUsuarioCommandOut executar(EfetuarLoginDeUsuarioCommandIn command) {



        String loginUrl = urlLogin;
        return restTemplate.postForObject(loginUrl, command, EfetuarLoginDeUsuarioCommandOut.class);



    }

}
