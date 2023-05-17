export class Usuario {

static fromFirebase({uid,nombre,correo}:any){

  return new Usuario(uid,nombre,correo)
}

  constructor(
    public uid: string | undefined,
    public nombre: string,
    public correo: string
  ) {}
}
