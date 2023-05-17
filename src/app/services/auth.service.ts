import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
import { EmailValidator } from '@angular/forms';
import { Subscription, map } from 'rxjs';
import { Usuario } from '../models/User';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubscription!:Subscription;
private _user!:Usuario | null;

  constructor(private auth: AngularFireAuth,
    private firestore:AngularFirestore,private store:Store) {}

    getUser(){
      return {...this._user};
    }

  userState() {
    this.auth.authState.subscribe((fuser:any) => {
      console.log(fuser?.uid)
      if(fuser){
       this.userSubscription = this.firestore.doc(`${ fuser.uid }/user`).valueChanges().subscribe((firestoreUser:any) =>{
          console.log(firestoreUser);
          const user = Usuario.fromFirebase(firestoreUser)
          this._user = user;
          this.store.dispatch(authActions.setUser({user}));
        })
      }else{
        this._user = null;
        this.store.dispatch(authActions.unSetUser())
        this.userSubscription.unsubscribe();
      }
    });
  }

  enviarRegistro(nombre: string, correo: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(correo, password)
      .then(({ user }) => {
        const newUser = new Usuario(user?.uid, nombre, correo);
       return this.firestore.doc(`${user?.uid}/user`).set({...newUser})
      });
  }

  login(correo: string, password: string) {
    return this.auth.signInWithEmailAndPassword(correo, password);
  }

  logOut() {
    return this.auth.signOut();
  }

  guardRoute() {
    return this.auth.authState.pipe(map((fbUser) => fbUser != null));
  }
}
