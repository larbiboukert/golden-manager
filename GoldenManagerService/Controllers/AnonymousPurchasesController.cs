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
    public class AnonymousPurchasesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AnonymousPurchasesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/AnonymousPurchases
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnonymousPurchase>>> GetAnonymousPurchases()
        {
            return await _context.AnonymousPurchases.ToListAsync();
        }

        // GET: api/AnonymousPurchases/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AnonymousPurchase>> GetAnonymousPurchase(int id)
        {
            var anonymousPurchase = await _context.AnonymousPurchases.FindAsync(id);

            if (anonymousPurchase == null)
            {
                return NotFound();
            }

            return anonymousPurchase;
        }

        // PUT: api/AnonymousPurchases/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnonymousPurchase(int id, AnonymousPurchase anonymousPurchase)
        {
            if (id != anonymousPurchase.ID)
            {
                return BadRequest();
            }

            _context.Entry(anonymousPurchase).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnonymousPurchaseExists(id))
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

        // POST: api/AnonymousPurchases
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AnonymousPurchase>> PostAnonymousPurchase(AnonymousPurchase anonymousPurchase)
        {
            _context.AnonymousPurchases.Add(anonymousPurchase);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAnonymousPurchase", new { id = anonymousPurchase.ID }, anonymousPurchase);
        }

        // DELETE: api/AnonymousPurchases/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnonymousPurchase(int id)
        {
            var anonymousPurchase = await _context.AnonymousPurchases.FindAsync(id);
            if (anonymousPurchase == null)
            {
                return NotFound();
            }

            _context.AnonymousPurchases.Remove(anonymousPurchase);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AnonymousPurchaseExists(int id)
        {
            return _context.AnonymousPurchases.Any(e => e.ID == id);
        }
    }
}
