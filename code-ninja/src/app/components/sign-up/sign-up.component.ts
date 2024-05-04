import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  mostrarAlerta = false;
  mostrarAlerta1 = false;

  formularioRegistro = new FormGroup({
    nombreUsuario: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required,Validators.pattern(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/)]),
    contraseña: new FormControl('', [Validators.required]),
    confirmarContraseña: new FormControl('', [Validators.required])
  })

  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit(): void {}
 
 
  signUp() {
    if (this.formularioRegistro.valid && this.formularioRegistro.get('contraseña')?.value==this.formularioRegistro.get('confirmarContraseña')?.value) {
      const formData = {
        nombreUsuario: this.formularioRegistro.get('nombreUsuario')?.value,
        correo: this.formularioRegistro.get('correo')?.value,
        contraseña: this.formularioRegistro.get('contraseña')?.value
      };
      console.log(formData);

      this.httpClient.post('http://localhost:8888/usuarios', formData)
        .subscribe((res: any) => { // Use type assertion (': any')
          console.log(res);

          if (res) {
            this.mostrarAlerta1 = true;

            setTimeout(() => {
              this.router.navigate(['/']);
            }, 1000);
          } else {
            console.log("Usuario no creado");
          }
        });
    } else {
      console.log('Formulario inválido');
      this.mostrarAlerta = true;
            console.log('Credenciales inválidas');
            this.formularioRegistro.reset()
            setTimeout(() => {
              this.mostrarAlerta = false;
            }, 3000);
    }
  }
}
