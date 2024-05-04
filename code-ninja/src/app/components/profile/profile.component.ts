import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
userData: any = {}
profileImageURL: string = '../assets/img/Usuario.png'; 
mostrarAlerta = false;
mostrarAlerta1 = false;
mostrarAlerta2 = false;

formularioRegistro = new FormGroup({
  nombreUsuario: new FormControl(''),
  contraseña: new FormControl('',[Validators.required]),
  biografia: new FormControl(''),
  nombre: new FormControl(''),
  apellido: new FormControl(''),
  correo: new FormControl('',[Validators.required]),
  profesion: new FormControl(''),
  industria: new FormControl(''),
  situacion: new FormControl(''),
  enlace: new FormControl(''),
})
userId!: string;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute,private router: Router) {}



ngOnInit(): void {
    this.route.params.subscribe(params => {
    this.userId = params['userId'];
    window.localStorage.setItem('userId', this.userId);
    this.fetchUserData(this.userId);
    });
  }

fetchUserData(userId: string): void {
    this.httpClient.get('http://localhost:8888/usuarios/'+ userId)
      .subscribe(
        (userData: any) => {
          this.userData = userData;
          console.log(userData);
          this.formularioRegistro.patchValue({
            nombreUsuario: this.userData.nombreUsuario,
            contraseña: this.userData.contraseña,
            correo: this.userData.correo,
            biografia: this.userData.biografia,
            nombre: this.userData.nombre.primerNombre,
            apellido: this.userData.nombre.apellido,
            industria: this.userData.industria,
            profesion: this.userData.profesion,
            situacion: this.userData.situacion_laboral,
            enlace: this.userData.enlace_empresa

          });
        },
        error => {
          console.error(error);
        }
      );
  }  
  
  
  actulizarDatos(): void {
    if (this.formularioRegistro.valid) {
      const updatedUserData = {
        correo: this.formularioRegistro.value.correo,
        contraseña: this.formularioRegistro.value.contraseña,
        biografia: this.formularioRegistro.value.biografia,
        primerNombre:this.formularioRegistro.value.nombre,
        apellido:this.formularioRegistro.value.apellido,     
        industria:this.formularioRegistro.value.industria,
        profesion:this.formularioRegistro.value.profesion,
        situacion_laboral:this.formularioRegistro.value.situacion,
        enlace_empresa:this.formularioRegistro.value.enlace

      };
      console.log(updatedUserData);
      this.httpClient.put('http://localhost:8888/usuarios/' + this.userData._id, updatedUserData)
      .subscribe(
        response => {
          console.log('los datos del usuario fueron actualizados', response);
          this.mostrarAlerta2 = true;

            setTimeout(() => {
             this.mostrarAlerta2 = false;
             this.router.navigate(['/profile', this.userId]);
            }, 1000);
          
        },
        error => {
          console.error('Error al actulizar los datos del usuario', error);
        }
      );
  }
  else{
    this.mostrarAlerta = true;
    setTimeout(() => {
      this.mostrarAlerta = false;
    }, 3000);
  }
}
  
eliminarUsuario(): void {
  this.httpClient.delete('http://localhost:8888/usuarios/' + this.userData._id)
    .subscribe(
      response => {
        console.log('Usuario eliminado', response);
        this.mostrarAlerta1 = true;

            setTimeout(() => {
              this.router.navigate(['/']);
            }, 1000);
      },
      error => {
        console.error('Error al eliminar el usuario', error);
      }
    );
}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // Función para manejar el cambio de la foto seleccionada
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImageURL = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Función para eliminar la foto de perfil actual
  removeProfilePhoto(): void {
    this.profileImageURL = '../assets/img/Usuario.png'; // Reestablecer a la imagen por defecto
  }

  // Función para guardar los cambios (aquí debes implementar el envío al servidor si es necesario)
  saveChanges(): void {
    // Implementa la lógica para guardar los cambios, si es necesario.
  }








  
}
