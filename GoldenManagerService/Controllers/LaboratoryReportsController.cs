using GoldenManagerService.Data;
using GoldenManagerService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenManagerService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LaboratoryReportsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LaboratoryReportsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/LaboratoryReports
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LaboratoryReport>>> GetLaboratoryReports()
        {
            return await _context.LaboratoryReports.ToListAsync();
        }

        // GET: api/LaboratoryReports/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LaboratoryReport>> GetLaboratoryReport(int id)
        {
            var laboratoryReport = await _context.LaboratoryReports.FindAsync(id);

            if (laboratoryReport == null)
            {
                return NotFound();
            }

            return laboratoryReport;
        }

        // PUT: api/LaboratoryReports/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLaboratoryReport(int id, LaboratoryReport laboratoryReport)
        {
            if (id != laboratoryReport.ID)
            {
                return BadRequest();
            }

            _context.Entry(laboratoryReport).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LaboratoryReportExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/LaboratoryReports
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<IEnumerable<LaboratoryReport>>> PostLaboratoryReports(
            List<LaboratoryReport> laboratoryReports,
            int supplierPaymentId
        )
        {
            var supplierPayment = _context.SupplierPayments
                .Include(p => p.LaboratoryReports)
                .FirstOrDefault(p => p.ID == supplierPaymentId);

            laboratoryReports.ForEach(r =>
            {
                if (r.Customer != null) r.Customer = _context.Customers.Find(r.Customer.ID);
            });

            supplierPayment.LaboratoryReports.AddRange(laboratoryReports);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                "GetSupplierPayments",
                "SupplierPayments",
                new { id = supplierPayment.ID },
                laboratoryReports
            );
        }


        // DELETE: api/LaboratoryReports/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLaboratoryReport(int id)
        {
            var laboratoryReport = await _context.LaboratoryReports.FindAsync(id);
            if (laboratoryReport == null)
            {
                return NotFound();
            }

            _context.LaboratoryReports.Remove(laboratoryReport);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LaboratoryReportExists(int id)
        {
            return _context.LaboratoryReports.Any(e => e.ID == id);
        }
    }
}
