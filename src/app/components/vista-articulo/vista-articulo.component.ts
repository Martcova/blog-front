import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vista-articulo',
  templateUrl: './vista-articulo.component.html',
  styleUrls: ['./vista-articulo.component.css']
})
export class VistaArticuloComponent implements OnInit {
 articulo: any;
 art = []
  constructor(private dataservice: DataService,private activerouter: ActivatedRoute) { }
  articuloid = this.activerouter.snapshot.paramMap.get('id');
  
  ngOnInit(): void {
    //traime un articulo
    this.dataservice.getunArticulo(this.articuloid).subscribe((data:any) =>{
      this.articulo = data ['message'];
     
      //pasar un objeto a un array
      this.art.push(this.articulo);
      
    
    console.log(this.art);
    })


  }


 
  
 

}

