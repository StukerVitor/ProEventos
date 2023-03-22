using System.Threading.Tasks;
using ProEventos.Domain;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using ProEventos.Persistence.Contratos;
using ProEventos.Persistence.Contextos;

namespace ProEventos.Persistence
{
    public class PalestrantePersist : IPalestrantePersist
    {
        private readonly ProEventosContext context;

        public PalestrantePersist(ProEventosContext context)
        {
            this.context = context;
        }

        public async Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos = false)
        {
            IQueryable<Palestrante> query = context.Palestrantes.AsNoTracking()
                .Include(p => p.RedesSociais);
            
            if(includeEventos)
            {
                query = query.Include(p => p.PalestrantesEventos)
                    .ThenInclude(pe => pe.Evento);
            }
            
            query = query.OrderBy(p => p.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string nome, bool includeEventos)
        {
            IQueryable<Palestrante> query = context.Palestrantes.AsNoTracking()
                .Include(p => p.RedesSociais);
            
            if(includeEventos)
            {
                query = query.Include(p => p.PalestrantesEventos)
                    .ThenInclude(pe => pe.Evento);
            }
            
            query = query.OrderBy(p => p.Id).Where(p => p.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Palestrante> GetPalestranteByIdAsync(int palestranteId, bool includeEventos)
        {
            IQueryable<Palestrante> query = context.Palestrantes.AsNoTracking()
                .Include(p => p.RedesSociais);
            
            if(includeEventos)
            {
                query = query.Include(p => p.PalestrantesEventos)
                    .ThenInclude(pe => pe.Evento);
            }
            
            query = query.OrderBy(p => p.Id).Where(p => p.Id == palestranteId);

            return await query.FirstOrDefaultAsync();
        }
    }
}