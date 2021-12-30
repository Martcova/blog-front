import { Component,OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tbl-comentarios',
  templateUrl: './tbl-comentarios.component.html',
  styleUrls: ['./tbl-comentarios.component.css']
})
export class TblComentariosComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  comentarios:any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType:'full_numbers',
      pageLength: 5,
      language: {
        "url":"//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
      }
     
    };
    this.http.get('https://blog-control.herokuapp.com/api/view_comentarios')
    .subscribe((res:any) => {
      this.comentarios = res.response;
      
      this.dtTrigger.next();
      
    });
    
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}
