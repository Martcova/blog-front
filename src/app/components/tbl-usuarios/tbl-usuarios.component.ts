import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';



@Component({
  selector: 'app-tbl-usuarios',
  templateUrl: './tbl-usuarios.component.html',
  styleUrls: ['./tbl-usuarios.component.css']
})
export class TblUsuariosComponent implements OnDestroy,OnInit {

 usuarios:any;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
   
  constructor(private dataservice: DataService, private router:Router) { }
  
 
  ngOnInit() :void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
      }
     
    };

    this.dataservice.getUsuarios().subscribe(
      (res: any) => {
      this.usuarios= res.response;
      this.rol_usuario();
      this.fecha_usuario();

       this.dtTrigger.next();
      
    });
    
  }

  ngOnDestroy():void {
    this.dtTrigger.unsubscribe();
  }

   editarUsuario(id: any){
     this.router.navigate(['/header/tbl-usuarios/gestion-usuario/',id]);
   }


 rol_usuario(){ //recorre los usuarios y retorna "administrador" si es 1 o "usuario" si es 2
  for(let i=0;i<this.usuarios.length;i++){
    if(this.usuarios[i].rol_id==1){
      this.usuarios[i].rol_id="administrador";
    }else{
      this.usuarios[i].rol_id="usuario";
    }
  }
 }

//recorrer los usuarios y darle formato a la fecha 'd M, Y, g:i a' a created_at
  fecha_usuario(){
    for(let i=0;i<this.usuarios.length;i++){
      this.usuarios[i].created_at=this.usuarios[i].created_at.substring(0,10);
      this.usuarios[i].created_at=this.usuarios[i].created_at.split('-').reverse().join('/');
      this.usuarios[i].created_at=this.usuarios[i].created_at.split('T').join(' ');
      this.usuarios[i].created_at=this.usuarios[i].created_at.split('.')[0];
    }
  }
 



 }

 
  

  

  
    
   


    





