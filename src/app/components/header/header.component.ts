import { Component, OnInit } from '@angular/core';
import {CargarScriptsService} from '../../cargar-scripts.service';
import { DataService } from '../../services/data.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private _CargarScripts:CargarScriptsService, private dataservice: 
    DataService, private cookie:CookieService) {
    _CargarScripts.carga("../assets/headercomplement.js");
   }
public edit : boolean;
   
  ngOnInit(): void {
         
    
  }

  //metodo para cerrar sesion
  cerrarSesion(){
   this.dataservice.cerrarSesion().subscribe(
     (res:any)=>{
      console.log(res);
      //eliminar token
      this.cookie.delete('token');
      this.cookie.delete('id');
      this.cookie.delete('rol_id');
     }
   )
  

  }


 hiddenElments(){
  const token = this.cookie.check('token');

   if (token==true){
    return  this.edit = true;
   }else{
     return this.edit = false;
   }
 }


 //metodo para cambiar ocultar elementos del header si el usuario no es admin
  hiddenElmentsAdmin(){
    const rol_id = this.cookie.get('rol_id');
    const token = this.cookie.check('token');

    if (rol_id == '1' && token==true){
      
      return  this.edit = true;
    }if(rol_id == '2' && token == true){
      return this.edit = false;
    
    }else{
      return this.edit = false;
    }
  }

}
