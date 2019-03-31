using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectGraduationK.Data;
using ProjectGraduationK.Models;

namespace ProjectGraduationK.Controllers
{
    [Route("calendar")]
    [Authorize]
    public class CalendarController : Controller
    {
        private GraduationDbContext _context;

        public CalendarController(GraduationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Calendar()
        {
            return View();
        }

        [HttpGet("GetEvents")]
        public JsonResult GetEvents()
        {
            var events = _context.CalendarEvents.ToList();
            return new JsonResult(events);
        }


        [HttpPost("SaveEvent")]
        public JsonResult SaveEvent(CalendarEvent calendarEvent)
        {
            var status = false;

            if (calendarEvent.EventId > 0)
            {
                //Update the event
                var eventToUpdate = _context.CalendarEvents.FirstOrDefault(e => e.EventId == calendarEvent.EventId);
                if (eventToUpdate != null)
                {
                    eventToUpdate.Subject = calendarEvent.Subject;
                    eventToUpdate.Start = calendarEvent.Start;
                    eventToUpdate.End = calendarEvent.End;
                    eventToUpdate.Description = calendarEvent.Description;
                    eventToUpdate.IsFullDay = calendarEvent.IsFullDay;
                    eventToUpdate.ThemeColor = calendarEvent.ThemeColor;
                }
            }
            else
            {
                _context.CalendarEvents.Add(calendarEvent);
            }
            _context.SaveChanges();
            status = true;

            return new JsonResult(status);
        }

        [HttpDelete("{eventId}")]
        public JsonResult DeleteEvent(int eventId)
        {
            var status = false;

            var eventToUpdate = _context.CalendarEvents.Where(a => a.EventId == eventId).FirstOrDefault();
            if (eventToUpdate != null)
            {
                _context.CalendarEvents.Remove(eventToUpdate);
                _context.SaveChanges();
                status = true;
            }

            return new JsonResult(status);
        }
    }
}