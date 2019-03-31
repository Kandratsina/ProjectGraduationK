using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProjectGraduationK.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectGraduationK.Data
{
    public class GraduationDbContext : IdentityDbContext<User>
    {
        public GraduationDbContext(DbContextOptions<GraduationDbContext> options) : base(options)
        {
        }

        public DbSet<FeedMessage> FeedMessages { get; set; }
        public DbSet<CalendarEvent> CalendarEvents { get; set; }
    }
}