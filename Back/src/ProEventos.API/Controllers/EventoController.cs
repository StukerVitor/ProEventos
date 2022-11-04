using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        public IEnumerable<Evento> _eventos = new Evento[]
            {
                new Evento()
                {
                    EventoId = 1,
                    Local = "Rio Grande do Sul",
                    Tema = "Angular 13 e .NET 5",
                    Lote = "1 Lote",
                    QtdPessoas = 250,
                    DataEvento = DateTime.Now.AddDays(2).ToString(),
                    ImagemUrl = "foto.png"
                },
                new Evento()
                {
                    EventoId = 2,
                    Local = "São Paulo",
                    Tema = "Batman",
                    Lote = "3 Lote",
                    QtdPessoas = 350,
                    DataEvento = DateTime.Now.AddDays(3).ToString(),
                    ImagemUrl = "coringa.png"
                }
            };

        public EventoController()
        {
        }

        [HttpGet]
        public IEnumerable<Evento> Get()
        {
            return _eventos;
        }

        [HttpGet("{id}")]
        public IEnumerable<Evento> GetById(int id)
        {
            return _eventos.Where(e => e.EventoId == id);
        }

        [HttpPost]
        public string Post()
        {
            return "Exemplo-Post";
        }

        [HttpPut("{id}")]
        public string Post(int id)
        {
            return $"Exemplo-Put Id: {id}";
        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            return $"Exemplo-Delete Id: {id}";
        }
    }
}
