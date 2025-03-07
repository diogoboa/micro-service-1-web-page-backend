package com.diogo.microservices.services.commands.out;

import java.time.LocalDateTime;

public record EfetuarLoginDeUsuarioCommandOut(

        String usuario,
        String token,
        LocalDateTime expiraEm
) {
}
