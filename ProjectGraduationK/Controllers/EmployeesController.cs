using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ProjectGraduationK.Data;
using ProjectGraduationK.Models;

namespace ProjectGraduationK.Controllers
{
    [Route("employees")]
    [Authorize]
    public class EmployeesController : Controller
    {

        private GraduationDbContext _context;
        private UserManager<User> _userManager;

        public EmployeesController(GraduationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public IActionResult Employees()
        {
            var users = _userManager.Users.ToList();
            return View(users);
        }
    }
}