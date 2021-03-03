using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GoldenManagerService.Data;
using GoldenManagerService.Models;

namespace GoldenManagerService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DashboardController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Dashboard
        [HttpGet]
        public IActionResult GetDashboardInfo()
        {
            var totalMoneyClientsPayments = _context.CustomerPayments.Sum(p => p.Money);
            var totalGramsClientsPayments = _context.CustomerPayments.Sum(p => p.Grams);
            var totalMoneySold = _context.Sales.Include(s => s.Products).ToList().Sum(s => s.TotalMoney);
            var totalGoldSold = _context.Sales.Include(s => s.Products).ToList().Sum(s => s.TotalGrams);
            var totalMoneySuppliersPayments = _context.SupplierPayments.Sum(p => p.Money);
            var totalGramsSuppliersPayments = _context.SupplierPayments.Sum(p => p.Grams);
            var totalMoneySupplied = _context.Supplies.Include(s => s.Products).ToList().Sum(s => s.TotalMoney);
            var totalGoldSupplied = _context.Supplies.Include(s => s.Products).ToList().Sum(s => s.TotalGrams);
            var totalMoneyAnonymousPurchses = _context.AnonymousPurchases.ToList().Sum(p => p.Total);
            var totalGramsAnonymousPurchses = _context.AnonymousPurchases.Sum(p => p.Grams);
            var totalExpenses = _context.Expenses.Sum(e => e.Money);

            return Ok(new
            {
                totalMoneyClientsPayments,
                totalGramsClientsPayments,
                totalMoneySold,
                totalGoldSold,
                totalMoneySuppliersPayments,
                totalGramsSuppliersPayments,
                totalMoneySupplied,
                totalGoldSupplied,
                totalMoneyAnonymousPurchses,
                totalGramsAnonymousPurchses,
                totalExpenses
            });
        }
    }
}
