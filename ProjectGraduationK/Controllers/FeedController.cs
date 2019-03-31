using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectGraduationK.Data;
using ProjectGraduationK.Models;

namespace ProjectGraduationK.Controllers
{
    [Route("feed")]
    [Authorize]
    public class FeedController : Controller
    {
        private GraduationDbContext _context;

        public FeedController(GraduationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Feed()
        {
            return View();
        }


        [HttpGet("GetMessages")]
        public IActionResult GetMessages()
        {
            var messages = _context.FeedMessages.ToList();
            return new JsonResult(messages);
        }

        [HttpPost("SaveMessage")]
        public IActionResult SaveMessage(FeedMessage feedMessage)
        {
            feedMessage.PublishDate = DateTime.Now;
            //TODO: Add validation
            _context.FeedMessages.Add(feedMessage);
            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{messageId}")]
        public IActionResult DeleteMessage(int messageId)
        {
            var messageToRemove = _context.FeedMessages.Where(fm => fm.MessageId == messageId).FirstOrDefault();
            _context.FeedMessages.Remove(messageToRemove);
            _context.SaveChanges();
            return Ok();
        }
    }
}
