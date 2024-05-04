import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarpetaComponent } from '../carpeta/carpeta.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carpetas',
  templateUrl: './carpetas.component.html',
  styleUrls: ['./carpetas.component.scss']
})
export class CarpetasComponent implements OnInit {
  carpetasData: any = {};
  selectedCarpetaData: any;
  userId!: string;
  mostrarAlerta = false;
  mostrarAlerta1 = false;
  mostrarAlerta2 = false;
  formularioRegistro = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
  });

  @ViewChild(CarpetaComponent) hijoCarpetaComponent!: CarpetaComponent;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.fetchUserFolders(this.userId);
    });
  }

  fetchUserFolders(userId: string): void {
    this.httpClient.get('http://localhost:8888/carpetas')
      .subscribe(
        (foldersData: any) => {
          if (Array.isArray(foldersData)) {
            this.carpetasData = foldersData.filter(folder => folder.usuarioid === userId);
            console.log(this.carpetasData);
          } else {
            console.error('Expected an array of folders, but received:', foldersData);
          }
        },
        error => {
          console.error(error);
        }
      );
  }

  CrearCarpetas() {
    if (this.formularioRegistro.valid) {
      const formData = {
        nombre: this.formularioRegistro.get('nombre')?.value,
        descripcion: this.formularioRegistro.get('descripcion')?.value,
        usuarioid: this.userId
      };

      console.log(formData);

      this.httpClient.post('http://localhost:8888/carpetas', formData)
        .subscribe((res: any) => {
          console.log(res);

          if (res) {
            this.fetchUserFolders(this.userId)
            this.formularioRegistro.reset()
            this.mostrarAlerta1 = true;
            setTimeout(() => {
              this.mostrarAlerta1 = false;
            }, 3000);
            this.router.navigate(['/folders',this.userId]);
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

  eliminarCarpeta(carpetaId: string): void {
    console.log(carpetaId);
    this.httpClient.delete('http://localhost:8888/carpetas/'+ carpetaId )
      .subscribe(
        response => {
          console.log('Carpeta Eliminada', response);
          this.fetchUserFolders(this.userId)
          this.mostrarAlerta = true;
          setTimeout(() => {
            this.mostrarAlerta = false;
          }, 3000);
          this.router.navigate(['/folders',this.userId]);
          window.location.reload();
        },
        error => {
          console.error('Error al eliminar la Carpeta', error);
        }
      );
  }
  handleClickInChild(): void {
    this.hijoCarpetaComponent.childButtonClicked(); // Llama al método en el componente hijo
  }

}
