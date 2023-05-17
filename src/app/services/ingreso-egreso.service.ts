import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GuardGuard } from './guard.guard';
import { IngresoEgreso } from '../models/IngresoEgreso';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore:AngularFirestore ,private authService:AuthService) { }


GuardaIngEg(ingresoEgreso:IngresoEgreso){

const uid = this.authService.getUser().uid;
 return this.firestore.doc(`${uid}/ingresos-egresos`).collection('items').add({... ingresoEgreso})

}


}