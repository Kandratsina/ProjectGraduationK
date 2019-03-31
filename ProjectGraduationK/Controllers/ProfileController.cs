using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ProjectGraduationK.Data;
using ProjectGraduationK.Models;

namespace ProjectGraduationK.Controllers
{
    [Route("profile")]
    [Authorize]
    public class ProfileController : Controller
    {
        private GraduationDbContext _context;
        private UserManager<User> _userManager;

        public ProfileController(GraduationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public IActionResult Profile()
        {
            var userId = _userManager.GetUserId(HttpContext.User);
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);
            return View(user);
        }

        [HttpPost]
        public IActionResult Profile(User userData)
        {
            var senderId = _userManager.GetUserId(HttpContext.User);
            var userToUpdate = _context.Users.FirstOrDefault(u => u.Id == senderId);
            
            if(userToUpdate != null)
            {
                userToUpdate.UserName = userData.UserName;
                userToUpdate.Email = userData.Email;
                userToUpdate.PhoneNumber = userData.PhoneNumber;
                userToUpdate.Address = userData.Address;
                userToUpdate.Position = userData.Position;
                userToUpdate.BirthDate = userData.BirthDate;
            }

            _context.SaveChanges();
            return View(userData);
        }
    }
}
