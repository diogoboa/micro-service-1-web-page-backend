package com.diogo.microservices.services.interfaces.imagem;

import com.diogo.microservices.model.Imagem;
import com.diogo.microservices.services.commands.in.CriarNovaImagemCommand;
import com.diogo.microservices.services.commands.out.CriarNovaImagemCommandOut;

public interface CriarNovaImagem {
    CriarNovaImagemCommandOut executar(CriarNovaImagemCommand command);
}
