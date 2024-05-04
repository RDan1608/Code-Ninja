import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carpeta',
  templateUrl: './carpeta.component.html',
  styleUrls: ['./carpeta.component.scss']
})
export class CarpetaComponent {
  @Input() carpetaData: any;
  @Output() buttonClick = new EventEmitter<void>()
  childButtonClicked(): void {
    this.buttonClick.emit(); // Emite el evento cuando se hace clic en el botón del componente hijo
  }

  carpetaForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
  });
  constructor(private formBuilder: FormBuilder,private httpClient: HttpClient,private router: Router) { }
  
  

  guardarCambios() {
    if (this.carpetaForm.valid) {
      const nuevosDatos = this.carpetaForm.value;
      this.httpClient.put('http://localhost:8888/carpetas/' + this.carpetaData._id, nuevosDatos)
      .subscribe((res: any) => {
        console.log('Cambios guardados exitosamente', res);
        this.carpetaForm.patchValue({
          nombre: this.carpetaData.nombre,
          descripcion: this.carpetaData.descripcion
        });
        this.carpetaForm.reset()
        this.router.navigate(['/folders',this.carpetaData.usuarioid]);
      }, error => {
        console.error('Error al guardar cambios', error);
      });
    }
  }
}
