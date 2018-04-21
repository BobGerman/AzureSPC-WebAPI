using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using REManager.Models;

namespace REManager.DataAccess
{
    public class REPropertyDbContext : DbContext
    {
        public REPropertyDbContext(DbContextOptions<REPropertyDbContext> options)
            :base (options) { }

        public DbSet<REProperty> ReProperties { get; set; }
    }
}
