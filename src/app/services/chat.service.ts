import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Mensaje } from '../interfaces/mensaje.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // got it, it's because typescript 2.7.2 included a strict class checking where all properties should be declared in constructor. 
  // So to work around that, just add a bang sign (!) like: name!:string;
  private itemsCollection!: AngularFirestoreCollection<Mensaje>;
  public chat: Mensaje[] = [];

  constructor(
    private afs: AngularFirestore
  ) { }

  loadMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats');

    return this.itemsCollection.valueChanges().pipe(map((msj: Mensaje[]) => {
      console.log(msj);
      this.chat = msj;
    }));
  }

  addMensaje(txt: string) {
    let msj: Mensaje = {
      emisor: 'Carlos',
      mensaje: txt,
      fecha: new Date().getTime()
    }

    // regresa una promesa, por el then y catch
    return this.itemsCollection.add(msj);
  }
}
