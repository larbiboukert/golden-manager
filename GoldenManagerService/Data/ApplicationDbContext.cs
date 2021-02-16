using Microsoft.EntityFrameworkCore;
using GoldenManagerService.Models;

namespace GoldenManagerService.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Article> Articles { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Supply> Supplies { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<CustomerPayment> CustomerPayments { get; set; }
        public DbSet<SupplierPayment> SupplierPayments { get; set; }
        public DbSet<SupplierPaymentProduct> SupplierPaymentProducts { get; set; }
    }
}
