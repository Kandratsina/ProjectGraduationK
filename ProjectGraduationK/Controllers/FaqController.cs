using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectGraduationK.Data;
using ProjectGraduationK.Models;
using System.Linq;

namespace ProjectGraduationK.Controllers
{
    [Route("faq")]
    [Authorize]
    public class FaqController : Controller
    {
        private GraduationDbContext _context;
        public FaqController(GraduationDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetQuestions")]
        public IActionResult GetQuestions()
        {
            var questions = _context.Questions.ToList();
            return new JsonResult(questions);
        }

        [HttpGet]
        public IActionResult Faq()
        {
            return View();
        }

        [HttpPost("SaveQuestion")]
        public IActionResult SaveQuestion(Question question)
        {
            _context.Questions.Add(question);
            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{questionId}")]
        public IActionResult DeleteQuestion(int questionId)
        {
            var questionToRemove = _context.Questions.Where(fm => fm.QuestionId == questionId).FirstOrDefault();
            _context.Questions.Remove(questionToRemove);
            _context.SaveChanges();
            return Ok();
        }
    }
}