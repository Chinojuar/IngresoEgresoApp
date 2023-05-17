import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/IngresoEgreso';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit {
  ingEgresoForm:FormGroup = new FormGroup({
    descripcion: new FormControl('',[Validators.required]),
    monto: new FormControl('',[Validators.required])
  })
  tipo:string='ingreso';

  constructor(private ingresoEgService:IngresoEgresoService) { }

  ngOnInit(): void {
  }

  cambiar(tipo:string){
    this.tipo= tipo;
  }

  agregar(){
    const {descripcion, monto} = this.ingEgresoForm.value;
    const ingresoEgreso = new IngresoEgreso(this.tipo,descripcion,monto)
console.log(this.ingEgresoForm.value);
this.ingresoEgService.GuardaIngEg(ingresoEgreso).then(() => 
Swal.fire('Registro éxitoso',descripcion,'success')).catch(err => 
  Swal.fire(err,'error'))
this.ingEgresoForm.reset();
  }

  cancelar(){
    this.ingEgresoForm.reset();
  }

}
