import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../modules/angular-material.module';
import { LoginService } from '../../services/login.service';
import { ImagemService } from '../../services/imagem.service';
import { AlertUtilService } from '../../util/alert-util.service';
import { FormsModule } from '@angular/forms';
import { error } from 'node:console';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  imports: [FormsModule, AngularMaterialModule],
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  token: string = '';

  login: string = '';
  senha: string = '';

  base64ImageSelecionada: string | ArrayBuffer | null = null;
  base64ImagemBuscada: string | ArrayBuffer | null = null;


  chaveParaEnvio: string = '';
  chaveParaBusca: string = '';

  constructor(
    private loginService: LoginService,
    private imagemService: ImagemService,
    private alertUtilService: AlertUtilService
  ) {}

  obterToken() {
    const dados = {
      login: this.login,
      senha: this.senha
    };
    this.loginService.obterToken(dados).subscribe({
      next: (respostaToken : any) => {
        console.log(respostaToken);
        this.token = respostaToken.token;
        console.log('Token obtido:', respostaToken.token);
        sessionStorage.setItem('token', this.token);
      },
      error: (err) => {
        console.log(err);
        this.alertUtilService.popupError(err.error.message || 'Erro ao obter token');
        this.token = '';
      }
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.base64ImageSelecionada = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  enviar() {
    if (this.base64ImageSelecionada) {
      let dados = {
        chave: this.chaveParaEnvio,
        base64Img: this.base64ImageSelecionada
      };
      console.log(dados);
      this.imagemService.enviarImagem(dados).subscribe({
        next: (resposta) => {
          console.log('Imagem enviada:', resposta);
        },
        error: (err) => {
          this.alertUtilService.popupError(err.error.message);
        }
      });
    } else {
      this.alertUtilService.popupError('Nenhuma imagem selecionada');
    }
  }

  buscar() {
    this.imagemService.buscarImagem('chave').subscribe({
      next: (imagem) => {
        //this.base64ImagemBuscada = imagem;
        console.log(imagem);
      },
      error: (err) => {
        this.alertUtilService.popupError('Erro ao buscar imagem');
      }
    });
  }
}
