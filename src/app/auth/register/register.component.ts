import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import * as ui from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  formControl!: FormGroup;
  uiSubscribe!:Subscription;
  cargando:boolean =false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router:Router, private store:Store<AppState>) {}

  ngOnInit(): void {
    this.formControl = this.fb.group ({
       nombre:['',Validators.required],
      correo:['',[Validators.required,Validators.email] ],
      password: ['', Validators.required],
    });


this.uiSubscribe = this.store.select('ui').subscribe(ui =>{
  this.cargando = ui.isLoading;
  console.log('cargando subs')
})
  }

  ngOnDestroy(): void {
    this.uiSubscribe.unsubscribe();
  }

  onSubmit() {
    console.log(this.formControl.value);
  }

  enviar() {
    this.store.dispatch(ui.isLoading());
    const {nombre, correo, password } = this.formControl.value;
    this.authService
      .enviarRegistro(nombre,correo, password)
      .then((credenciales) => {
        this.store.dispatch(ui.stopLoading());
        console.log(credenciales)
this.router.navigate(['/'])
      })
      .catch((err) => {
      this.store.dispatch(ui.stopLoading());
      console.error(err)});
  }
}
