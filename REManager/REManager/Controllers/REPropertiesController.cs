using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using REManager.DataAccess;
using REManager.Models;

namespace REManager.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/REProperties")]
    public class REPropertiesController : Controller
    {
        private readonly REPropertyDbContext _context;

        public REPropertiesController(REPropertyDbContext context)
        {
            _context = context;
        }

        // GET: api/REProperties
        [HttpGet]
        public IEnumerable<REProperty> GetReProperties()
        {
            return _context.ReProperties;
        }

        // GET: api/REProperties/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetREProperty([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var rEProperty = await _context.ReProperties.SingleOrDefaultAsync(m => m.Id == id);

            if (rEProperty == null)
            {
                return NotFound();
            }

            return Ok(rEProperty);
        }

        // PUT: api/REProperties/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutREProperty([FromRoute] long id, [FromBody] REProperty rEProperty)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != rEProperty.Id)
            {
                return BadRequest();
            }

            _context.Entry(rEProperty).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!REPropertyExists(id))
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

        // POST: api/REProperties
        [HttpPost]
        public async Task<IActionResult> PostREProperty([FromBody] REProperty rEProperty)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.ReProperties.Add(rEProperty);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetREProperty", new { id = rEProperty.Id }, rEProperty);
        }

        // DELETE: api/REProperties/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteREProperty([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var rEProperty = await _context.ReProperties.SingleOrDefaultAsync(m => m.Id == id);
            if (rEProperty == null)
            {
                return NotFound();
            }

            _context.ReProperties.Remove(rEProperty);
            await _context.SaveChangesAsync();

            return Ok(rEProperty);
        }

        private bool REPropertyExists(long id)
        {
            return _context.ReProperties.Any(e => e.Id == id);
        }
    }
}