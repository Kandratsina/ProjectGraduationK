using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ProjectGraduationK.Controllers
{
    [Route("library")]
    [Authorize]
    public class LibraryController : Controller
    {
        public IActionResult Library()
        {
            return View();
        }
    }
}