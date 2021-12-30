import { Component,OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tbl-articulos',
  templateUrl: './tbl-articulos.component.html',
  styleUrls: ['./tbl-articulos.component.css']
})
export class TblArticulosComponent implements  OnDestroy,OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  articulos:any;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
      }
    };
    this.http.get('https://blog-control.herokuapp.com/api/view_articulos')
    .subscribe((res:any) => {
      this.articulos = res.response;
      this.dtTrigger.next();
      for(let i = 0; i < this.articulos.length; i++){
        this.articulos[i].descripcion = this.articulos[i].descripcion.substring(0,10) + "...";
      }
     this.fecha_usuario();
    });


 
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  gestionArticulos(id: any){
    this.router.navigate(['/header/tbl-articulos/gestion-articulos/',id]);
  
  }
  
  fecha_usuario(){
    for(let i=0;i<this.articulos.length;i++){
      this.articulos[i].created_at=this.articulos[i].created_at.substring(0,10);
      this.articulos[i].created_at=this.articulos[i].created_at.split('-').reverse().join('/');
      this.articulos[i].created_at=this.articulos[i].created_at.split('T').join(' ');
      this.articulos[i].created_at=this.articulos[i].created_at.split('.')[0];
    }
  }
 

}
