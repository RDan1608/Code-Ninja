import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.component.html',
  styleUrls: ['./archivo.component.scss']
})
export class ArchivoComponent {
  @Input() proyectoData: any;
  @Output() buttonClick = new EventEmitter<void>()

  childButtonClicked(): void {
    this.buttonClick.emit(); // Emite el evento cuando se hace clic en el botón del componente hijo
  }

  proyectoForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
  });
  constructor(private formBuilder: FormBuilder,private httpClient: HttpClient,private router: Router) { }
  
  
  guardarCambios() {
    if (this.proyectoForm.valid) {
      const nuevosDatos = this.proyectoForm.value;
      this.httpClient.put('http://localhost:8888/proyectos/' + this.proyectoData._id, nuevosDatos)
      .subscribe((res: any) => {
        console.log('Cambios guardados exitosamente', res);
        this.proyectoForm.patchValue({
          nombre: this.proyectoData.nombre,
          descripcion: this.proyectoData.descripcion
        });
        this.proyectoForm.reset()
        this.router.navigate(['/files',this.proyectoData.carpetaid]);
        window.location.reload();
      }, error => {
        console.error('Error al guardar cambios', error);
      });
    }
  }
}
