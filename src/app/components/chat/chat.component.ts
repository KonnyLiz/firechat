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

  constructor(
    private chats: ChatService
  ) {
    this.chats.loadMensajes().subscribe((msj: any[]) => {
      console.log(msj);
    });
  }

  ngOnInit(): void {
  }

  enviarMensaje() {
    console.log(this.mensaje);
  }

}
