import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



import { DataService } from 'src/app/services/data.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-agrega-articulo',
  templateUrl: './agrega-articulo.component.html',
  styleUrls: ['./agrega-articulo.component.css']
})
export class AgregaArticuloComponent implements OnInit {


  formregistroA: FormGroup = new FormGroup({});

 constructor(private dataservice: DataService,private formBuilder:FormBuilder, private cookie:CookieService) { }

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
  this.dataservice.agregaArticulo('https://blog-control.herokuapp.com/api/articulos', 
  this.formregistroA.value)
  .subscribe(respuesta => {
    console.log('usuario agregado');
   
  })
 }


 //asignar datos al formulario

 









}
