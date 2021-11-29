import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
// got it, it's because typescript 2.7.2 included a strict class checking where all properties should be declared in constructor. 
// So to work around that, just add a bang sign (!) like: name!:string;
  private itemsCollection!: AngularFirestoreCollection<any>;
  public chat: any[] = [];

  constructor(
    private afs: AngularFirestore
  ) { }

  loadMensajes(){
    this.itemsCollection = this.afs.collection<any>('chats');
    return this.itemsCollection.valueChanges();
  }
}
