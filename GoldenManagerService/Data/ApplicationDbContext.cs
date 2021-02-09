using Microsoft.EntityFrameworkCore;
using GoldenManagerService.Models;

namespace GoldenManagerService.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }
        public DbSet<Article> Articles { get; set; }
        public DbSet<ProduitNeuf> ProduitsNeuf { get; set; }
        public DbSet<CasseAnonyme> CasseAnonymes { get; set; }
        public DbSet<CasseClient> CasseClients { get; set; }
        public DbSet<AchatAnonyme> AchatsAnonymes { get; set; }
        public DbSet<VersementClient> VersementsClients { get; set; }
        public DbSet<VersementFournisseur> VersementFournisseur { get; set; }
        public DbSet<Achat> Achats{ get; set; }
        public DbSet<Vente> Ventes { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Fournisseur> Fournisseurs { get; set; }
        public DbSet<Charge> Charges { get; set; }
    }
}
