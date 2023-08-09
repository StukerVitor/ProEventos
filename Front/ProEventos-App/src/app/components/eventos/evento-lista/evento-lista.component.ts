import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { Evento } from 'src/app/models/Evento';
import { ToastrService } from 'ngx-toastr';
import { EventoService } from 'src/app/services/evento.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {
  modalRef?: BsModalRef;

  public eventos: Evento[] = [];
  public eventosFiltrados : Evento[] = [];

  public larguraImg : number = 150;
  public margemImg : number = 2;
  public exibirImagem : boolean = true;
  private filtroListado : string = '';

  public get filtroLista() : string {
    return this.filtroListado;
  }

  public set filtroLista(filtro:string){
    this.filtroListado = filtro;
    this.eventosFiltrados = this.filtroListado ? this.filtrarEventos(this.filtroLista) : this.eventos; //verifica se tem valor no _filtroLista
  }

  public filtrarEventos(filtro:string) : Evento[] {
    filtro = filtro.toLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; local: string; }) => evento.tema.toLocaleLowerCase().indexOf(filtro) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filtro) !== -1
    );
  }

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
    ) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('O evento foi deletado com sucesso.', 'Deletado');
  }

  decline(): void {
    this.modalRef?.hide();
  }

  public ngOnInit(): void {
    this.spinner.show();
    this.getEventos();
  }

  public alterarImagem(): void {
    this.exibirImagem = !this.exibirImagem;
  }

  public getEventos() : void {
    this.eventoService.getEventos().subscribe({
      next: (eventos: Evento[]) => {
        this.eventos = eventos,
        this.eventosFiltrados = this.eventos;
      },
      error: (error:any) => {
        this.spinner.hide()
        this.toastr.error('Erro ao carregar os eventos.', 'Erro!');
        console.log(error)
      },
      complete: () => this.spinner.hide()
    }
    );
  }

  detalheEvento(id:number) : void {
    this.router.navigate([`eventos/detalhe/${id}`]);
  }
}
