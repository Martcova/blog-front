import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


import { DataService } from 'src/app/services/data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agrega-articulo',
  templateUrl: './agrega-articulo.component.html',
  styleUrls: ['./agrega-articulo.component.css']
})
export class AgregaArticuloComponent implements OnInit {


  formregistroA: FormGroup = new FormGroup({});

 constructor(private dataservice: DataService,private formBuilder:FormBuilder, private cookie:CookieService,  private router: Router) { }

  ngOnInit(): void {
    this.formregistroA =this.formBuilder.group(
      {
        user_id:new FormControl(''),
      nombre: new FormControl('',[
        Validators.required,
        Validators.pattern('[a-zA-Z ]*')
      ]),
      descripcion:new FormControl('',[
        Validators.required,
      ]),
    }
    )
    let id = this.cookie.get('id');
    this.formregistroA.setValue({
    
      'user_id': id,
      'nombre': '',
      'descripcion': ''
    })
  }
 


 enviarDatosA(){
  Swal.fire({
    title: 'Esta seguro(a)?',
  
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, agregar!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      
  this.dataservice.agregaArticulo('https://blog-control.herokuapp.com/api/articulos', 
  this.formregistroA.value)
  .subscribe(respuesta => {
    console.log('usuario agregado');
  })
      Swal.fire(
        'Articulo agregado!',
        'El articulo ha sido agregado correctamente.',
        'success'
      )
      this.router.navigate(['header/tbl-articulos']);
    }
  })




 }


 //asignar datos al formulario

}
