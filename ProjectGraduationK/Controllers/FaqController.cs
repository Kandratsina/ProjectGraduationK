using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ProjectGraduationK.Controllers
{
    [Route("faq")]
    [Authorize]
    public class FaqController : Controller
    {
        public IActionResult Faq()
        {
            return View();
        }
    }
}