import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ArticuloI } from '../../modelos/articulo.interface';
import { DataService } from '../../services/data.service';
import Swal from 'sweetalert2';
import { ResponseI } from '../../modelos/response.interface';

@Component({
  selector: 'app-gestion-articulos',
  templateUrl: './gestion-articulos.component.html',
  styleUrls: ['./gestion-articulos.component.css']
})
export class GestionArticulosComponent implements OnInit {
  

  constructor( private activerouter: ActivatedRoute,
    private router: Router,
    private api: DataService,
    private cookieservice: CookieService) { }

datosarticulos : ArticuloI
articuloid = this.activerouter.snapshot.paramMap.get('id');
editarFormA= new FormGroup({
  nombre: new FormControl('', [Validators.required]),
  descripcion: new FormControl( '', [Validators.required]),
})

  ngOnInit(): void {
    console.log(this.articuloid);
    this.api.getunArticulo(this.articuloid).subscribe(data =>{
      this.datosarticulos = data ['message'];
      console.log(this.datosarticulos);
      this.editarFormA.setValue({
         'nombre': this.datosarticulos.nombre,
         'descripcion': this.datosarticulos.descripcion,
      })
    })
    
  }

postform(form:ArticuloI){

  
  Swal.fire({
    title: 'Esta seguro?',
    text: "Esta acción se puede revertir!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, actualizar articulo!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Actualizado!',
        'El articulo ha sido actualizado correctamente!.',
        'success'
      )
      this.api.editarArticulo(form,this.articuloid).subscribe(data=>{
        let respuesta: ResponseI = data;
       })
   
    }
    this.router.navigate(['header/tbl-articulos']);
  })

 
}


eliminarArticulo(){
  Swal.fire({
    title: 'Estas seguro(a)?',
    text: "No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '¡Sí, bórralo!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      
      Swal.fire(
        '¡Eliminado!',
        'Articulo eliminado con éxito.',
        'success'
      )
      let datos: ArticuloI= this.editarFormA.value;
      this.api.eliminarArticulo(datos,this.articuloid).subscribe(data=>{
        console.log(data); 
      })
    }
    this.router.navigate(['header/tbl-articulos']);
  })
}





}


