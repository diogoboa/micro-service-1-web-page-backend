package com.diogo.microservices.services.implementations.imagem;

import com.diogo.microservices.services.commands.in.CriarNovaImagemCommand;
import com.diogo.microservices.services.interfaces.imagem.CriarNovaImagem;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class CriarNovaImagemImpl implements CriarNovaImagem {




    @Override
    public void executar(CriarNovaImagemCommand command) {


    }








}
