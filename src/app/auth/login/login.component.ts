import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import * as ui from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  formLogin!: FormGroup;
  public cargando!:boolean;
  unSubscription!:Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store:Store<AppState>
  ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group ({
      // nombre:['',Validators.required],
      correo:['',[Validators.required,Validators.email] ],
      password: ['', Validators.required],
    });

    this.unSubscription = this.store.select('ui').subscribe(ui =>{
      this.cargando = ui.isLoading;
      console.log('cargando subs')
    })
  }

  ngOnDestroy(): void {
    this.unSubscription.unsubscribe();
  }

  login() {

    this.store.dispatch( ui.isLoading() )
  //   Swal.fire({
  //     title: 'Ingresando a tu cuenta de usuario',
  //     didOpen: () => {
  //       Swal.showLoading()
  //   }
  // })
    const { correo, password } = this.formLogin.value;
    this.authService.login(correo,password)
     .then(response => {
      this.store.dispatch( ui.stopLoading());
      // Swal.close()
      this.router.navigate(['/'])
     console.log(response)
     }).catch(error =>{
      this.store.dispatch( ui.stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
      })
     });
  }
}
