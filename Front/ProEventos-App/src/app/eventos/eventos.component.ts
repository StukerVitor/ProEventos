import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  public eventosFiltrados : any = [];

  larguraImg : number = 150;
  margemImg : number = 2;
  exibirImagem : boolean = true;
  private _filtroLista : string = '';

  public get filtroLista() : string {
    return this._filtroLista;
  }

  public set filtroLista(filtro:string){
    this._filtroLista = filtro;
    this.eventosFiltrados = this._filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos; //verifica se tem valor no _filtroLista
  }

  filtrarEventos(filtro:string) : any {
    filtro = filtro.toLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; local: string; }) => evento.tema.toLocaleLowerCase().indexOf(filtro) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filtro) !== -1
    )
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
  }

  alterarImagem() {
    this.exibirImagem = !this.exibirImagem;
  }

  public getEventos() : void {
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      response => {
        this.eventos = response,
        this.eventosFiltrados = this.eventos;
      },
      error => console.log(error)
    );
  }
}

