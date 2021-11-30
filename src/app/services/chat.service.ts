import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Mensaje } from '../interfaces/mensaje.interface';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // got it, it's because typescript 2.7.2 included a strict class checking where all properties should be declared in constructor. 
  // So to work around that, just add a bang sign (!) like: name!:string;
  private itemsCollection!: AngularFirestoreCollection<Mensaje>;
  public chat: Mensaje[] = [];
  public usuario: any = {};

  constructor(
    private afs: AngularFirestore,
    private auth: AngularFireAuth
  ) {
    auth.authState.subscribe(user => {
      console.log('estado', user);

      if (!user) {
        return;
      } else {
        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;
      }
    })
  }

  login(prov: string) {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  
  logout() {
    this.auth.signOut();
  }

  loadMensajes() {
    // el segundo parametro de collection es la query
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(5));

    return this.itemsCollection.valueChanges().pipe(map((msj: Mensaje[]) => {
      this.chat = [];

      // volvemos a hacer el arreglo de los chat en orden invertido
      for (let m of msj) {
        this.chat.unshift(m);
      }

      return this.chat;
    }));
  }

  // agregar msj en firebase
  addMensaje(txt: string) {
    let msj: Mensaje = {
      emisor: this.usuario.nombre,
      mensaje: txt,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    }

    // regresa una promesa, por el then y catch
    return this.itemsCollection.add(msj);
  }
}
