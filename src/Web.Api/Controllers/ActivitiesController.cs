using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Api.Core.Domain.Entities;

namespace Web.Api.Controllers
{
    [Authorize(Policy = "ApiUser")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : Controller
    {
        private static List<Activity> _activities = new List<Activity>()
        {
            new Activity(1, "Activity 1"),
            new Activity(1, "Activity 2"),
            new Activity(1, "Activity 3"),
            new Activity(1, "Activity 4"),
        };

        // GET api/activities/
        [HttpGet]
        public IEnumerable<Activity> GetActivities()
        {
            return _activities;
        }
    }
}