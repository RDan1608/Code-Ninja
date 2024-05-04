import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ArchivoComponent } from '../archivo/archivo.component';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.scss']
})
export class ArchivosComponent {
  mostrarAlerta = false;
  mostrarAlerta1 = false;
  mostrarAlerta2 = false;
  foldersData: any = {};
  carpetasData: Array<any> = []
  archivosData: any = {};
  folderId!: string;
  UserId: string = '';
  Contador: number = 0;
  contadorId!: number;
  formularioRegistro = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
  });

  @ViewChild(ArchivoComponent) hijoArchivoComponent!: ArchivoComponent;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.folderId = params['folderId'];
      const inputString = this.folderId ;
      const parts = inputString.split("/");
      this.folderId = parts[parts.length - 1];
      console.log(this.folderId)
      this.fetchUsuarioCarpeta(this.folderId)
      this.fetchUserFolders(this.UserId)
      console.log(this.UserId)

    });
  }

  fetchUserFolders(userId:string): void {
    this.httpClient.get('http://localhost:8888/carpetas')
      .subscribe(
        (foldersData: any) => {
          if (Array.isArray(foldersData)) {
            this.carpetasData = foldersData.filter(folder => folder._id === this.folderId);
            this.UserId = this.carpetasData[0].usuarioid;
            this.inicializarContador(this.UserId)
            console.log(this.UserId);
          } else {
            console.error('Expected an array of folders, but received:', foldersData);
          }
        },
        error => {
          console.error(error);
        }
      );
  }




  fetchUsuarioCarpeta(userId: string): void {
    this.httpClient.get('http://localhost:8888/proyectos')
      .subscribe(
        (foldersData: any) => {
          if (Array.isArray(foldersData)) {
            this.foldersData = foldersData.filter(folder => folder.carpetaid=== this.folderId);
            console.log(this.foldersData);
          } else {
            console.error('Expected an array of folders, but received:', foldersData);
          }
        },
        error => {
          console.error(error);
        }
      );
  }

  inicializarContador(userId: string): void {
    this.httpClient.get('http://localhost:8888/usuarios/' + userId)
      .subscribe(
        (userData: any) => {
          this.Contador = userData.contadorProyectos || 0;
        },
        error => {
          console.error('Error al obtener los datos del usuario:', error);
        }
      );
  }
  modificarContadorProyectos(userId: string): void {
    // Fetch the current user data
    this.httpClient.get('http://localhost:8888/usuarios/'+this.UserId)
      .subscribe(
        (userData: any) => {
          const currentContador = userData.contadorProyectos || 0; // Default to 0 if contadorProyectos doesn't exist
          const updatedContador = currentContador + 1;
  
          const updatedUserData = {
            contadorProyectos: updatedContador
          };
  
          this.httpClient.put('http://localhost:8888/usuarios/'+this.UserId, updatedUserData)
            .subscribe(
              (response: any) => {
                console.log('Contador de proyectos actualizado:', response);
                // If you want to update the local data, you can do so here
              },
              error => {
                console.error('Error al actualizar el contador de proyectos:', error);
              }
            );
        },
        error => {
          console.error('Error al obtener los datos del usuario:', error);
        }
      );
  }

  modificarContadorProyectosRestar(userId: string): void {
    this.httpClient.get('http://localhost:8888/usuarios/' + this.UserId)
      .subscribe(
        (userData: any) => {
          const currentContador = userData.contadorProyectos || 0;
          const updatedContador = currentContador - 1; // Subtract 1
  
          const updatedUserData = {
            contadorProyectos: updatedContador
          };
  
          this.httpClient.put('http://localhost:8888/usuarios/' + this.UserId, updatedUserData)
            .subscribe(
              (response: any) => {
                console.log('Contador de proyectos actualizado:', response);
              },
              error => {
                console.error('Error al actualizar el contador de proyectos:', error);
              }
            );
        },
        error => {
          console.error('Error al obtener los datos del usuario:', error);
        }
      );
  }
  

  crearProyectos() {
    console.log(this.formularioRegistro);
    console.log(this.Contador)
    if (this.formularioRegistro.valid && this.Contador<7) {

      const formData = {
        nombre: this.formularioRegistro.get('nombre')?.value,
        descripcion: this.formularioRegistro.get('descripcion')?.value,
        carpetaid: this.folderId
      };

      console.log(formData);

      this.httpClient.post('http://localhost:8888/proyectos/'+this.folderId, formData)
        .subscribe((res: any) => {
          console.log(res);

          if (res) {
            this.formularioRegistro.reset()
            this.modificarContadorProyectos(this.UserId)
            this.fetchUsuarioCarpeta(this.folderId)
            this.mostrarAlerta1 = true;
            setTimeout(() => {
              this.mostrarAlerta1 = false;
            }, 3000);
            this.router.navigate(['/files',this.folderId]);
          } else {
            console.log("Carpeta no creada");
          }
        });
        
    
    } else {
      console.log('Formulario inválido');
      this.mostrarAlerta2 = true;
      setTimeout(() => {
        this.mostrarAlerta2 = false;
      }, 3000);
    }
  }

  eliminarProyecto(proyectoId: string): void {
    console.log(proyectoId);
    this.httpClient.delete('http://localhost:8888/proyectos/'+ proyectoId )
      .subscribe(
        response => {
          console.log('Proyecto Eliminada', response);
          this.fetchUsuarioCarpeta(this.folderId)
          this.modificarContadorProyectosRestar(this.UserId)
          this.mostrarAlerta = true;
          setTimeout(() => {
            this.mostrarAlerta = false;
          }, 3000);
          this.router.navigate(['/files',this.folderId]);

        },
        error => {
          console.error('Error al eliminar la Carpeta', error);
        }
      );
  }


  handleClickInChild(): void {
    this.hijoArchivoComponent.childButtonClicked(); // Llama al método en el componente hijo
  }
}

