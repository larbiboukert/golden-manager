using Microsoft.EntityFrameworkCore;
using GoldenManagerService.Models;

namespace GoldenManagerService.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Article> Articles { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Operation> Operations { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Stakeholder> Stakeholders { get; set; }
    }
}
