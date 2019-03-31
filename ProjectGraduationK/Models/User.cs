using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectGraduationK.Models
{
    public class User : IdentityUser
    {
        public string Address { get; set; }
        public string Position { get; set; }
        public DateTime BirthDate { get; set; }
    }
}
