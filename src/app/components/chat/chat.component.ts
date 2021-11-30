import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {

  mensaje: string = '';
  elemento: any;

  constructor(
    public chats: ChatService
  ) {
    this.chats.loadMensajes().subscribe(() => {
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeigth;
      }, 200)
    });
  }

  ngOnInit(): void {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviarMensaje() {
    if (this.mensaje.length === 0) {
      return;
    } else {
      this.chats.addMensaje(this.mensaje)
        .then(() => {
          console.log('enviado');
          this.mensaje = '';
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

}
