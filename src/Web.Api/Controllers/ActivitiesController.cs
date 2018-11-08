using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Dto.GatewayResponses.Repositories;
using Web.Api.Core.Dto.UseCaseRequests;
using Web.Api.Core.Interfaces.Gateways.Repositories;
using Web.Api.Core.Interfaces.Services;
using Web.Api.Infrastructure.Data;

namespace Web.Api.Controllers
{
    [Authorize(Policy = "ApiUser")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : Controller
    {
        private readonly IActivityService _activityService;
        public ActivitiesController(IActivityService activityService)
        {
            _activityService = activityService;
        }
        // GET api/activities/{id}
        [HttpGet("{id}", Name = "GetActivity")]
        public async Task<Activity> GetActivity(Guid id)
        {
            var activity = await _activityService.GetById(id);

            return activity;
        }
        // GET api/activities/
        [HttpGet("", Name = "GetActivities")]
        public async Task<IEnumerable<Activity>> GetActivities()
        {
            var activities = await _activityService.ListAll();

            return activities;
        }
        [HttpPost]
        public async Task<CreateEntityResponse> Create([FromBody]CreateActivityRequest activity)
        {
            var activityId = await _activityService.Create(activity);
            return activityId;
        }
    }
}