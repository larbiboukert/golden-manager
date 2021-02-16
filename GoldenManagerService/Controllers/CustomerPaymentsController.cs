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
    public class CustomerPaymentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CustomerPaymentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CustomerPayments?customerId=
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerPayment>>> GetCustomerPayments
        (
            [FromQuery] int customerId
        )
        {
            var customer = await _context.Customers
                .Where(c => c.ID == customerId)
                .Include(c => c.CustomerPayments)
                .FirstOrDefaultAsync();

            return customer.CustomerPayments;
        }

        // GET: api/CustomerPayments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerPayment>> GetCustomerPayment([FromRoute]int id)
        {
            var customerPayment = await _context.CustomerPayments.FindAsync(id);

            if (customerPayment == null)
            {
                return NotFound();
            }

            return customerPayment;
        }

        // PUT: api/CustomerPayments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomerPayment(int id, CustomerPayment customerPayment)
        {
            if (id != customerPayment.ID)
            {
                return BadRequest();
            }

            _context.Entry(customerPayment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerPaymentExists(id))
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

        // POST: api/CustomerPayments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CustomerPayment>> PostCustomerPayment(
            CustomerPayment customerPayment, int customerId
        )
        {
            var customer = _context.Customers
                .Include(c => c.CustomerPayments)
                .FirstOrDefault(c => c.ID == customerId);

            customer.CustomerPayments.Add(customerPayment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomerPayment", new { id = customerPayment.ID }, customerPayment);
        }

        // DELETE: api/CustomerPayments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomerPayment(int id)
        {
            var customerPayment = await _context.CustomerPayments.FindAsync(id);
            if (customerPayment == null)
            {
                return NotFound();
            }

            _context.CustomerPayments.Remove(customerPayment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerPaymentExists(int id)
        {
            return _context.CustomerPayments.Any(e => e.ID == id);
        }
    }
}
