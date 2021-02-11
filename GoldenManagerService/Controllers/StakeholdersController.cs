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
    public class StakeholdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StakeholdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Stakeholders?type=
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Stakeholder>>> GetStakeholders([FromQuery] string type)
        {
            var stakeholderType = type switch
            {
                "client" => StakeholderType.Client,
                "fournisseur" => StakeholderType.Fournisseur,
                _ => StakeholderType.Anonyme,
            };

            return await _context.Stakeholders
                .Where(s => s.Type == stakeholderType)
                .ToListAsync();
        }

        // GET: api/Stakeholders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Stakeholder>> GetStakeholder([FromRoute] int id)
        {
            var stakeholder = await _context.Stakeholders
                .Include(s => s.Operations)
                .Include(s => s.Payments)
                .FirstAsync(s => s.ID == id);

            if (stakeholder == null)
            {
                return NotFound();
            }

            return stakeholder;
        }

        // PUT: api/Stakeholders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStakeholder(int id, Stakeholder stakeholder)
        {
            if (id != stakeholder.ID)
            {
                return BadRequest();
            }

            _context.Entry(stakeholder).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StakeholderExists(id))
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

        // POST: api/Stakeholders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Stakeholder>> PostStakeholder(Stakeholder stakeholder)
        {
            _context.Stakeholders.Add(stakeholder);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStakeholder", new { id = stakeholder.ID }, stakeholder);
        }

        // DELETE: api/Stakeholders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStakeholder(int id)
        {
            var stakeholder = await _context.Stakeholders.FindAsync(id);
            if (stakeholder == null)
            {
                return NotFound();
            }

            _context.Stakeholders.Remove(stakeholder);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StakeholderExists(int id)
        {
            return _context.Stakeholders.Any(e => e.ID == id);
        }
    }
}
