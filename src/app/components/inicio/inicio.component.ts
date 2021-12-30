import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
articulos : any;
  constructor(private http:HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get('https://blog-control.herokuapp.com/api/view_articulos')
    .subscribe((res:any) => {
      this.articulos = res.response;
 
     this.recortar();
   1
    });
  }

  recortar(){
  //cortar el texto de la descripcion de todos los articulos
  for(let i = 0; i < this.articulos.length; i++){
    this.articulos[i].descripcion = this.articulos[i].descripcion.substring(0,1000) + "...";
  }
}


vistaArticulo(id: any){
  this.router.navigate(['inicio/vista-articulo/',id]);

}
}