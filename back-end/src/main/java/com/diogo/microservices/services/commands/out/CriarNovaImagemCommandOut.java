package com.diogo.microservices.services.commands.out;

public record CriarNovaImagemCommandOut(

        String chave,
        String base64Img

) {
}
