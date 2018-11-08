using Web.Api.Core.Interfaces.Services;
using Web.Api.Core.Interfaces.Gateways.Repositories;
using System.Threading.Tasks;
using System.Collections.Generic;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Dto.GatewayResponses.Repositories;
using Web.Api.Core.Dto.UseCaseRequests;
using System;

namespace Web.Api.Infrastructure.Data.Services
{
    public class ActivityService : IActivityService
    {
        private readonly IActivitiesRepository _activitiesRepo;

        public ActivityService(IActivitiesRepository activitiesRepo)
        {
            _activitiesRepo = activitiesRepo;

        }

        public async Task<List<Activity>> ListAll()
        {
            return await _activitiesRepo.ListAll();
        }
        public async Task<Activity> GetById(Guid id)
        {
            return await _activitiesRepo.GetById(id);
        }
        public async Task<CreateEntityResponse> Create(CreateActivityRequest activity)
        {
            var newActivity = new Activity
            {
                Name = activity.Name,
                Description = activity.Description,
                DueDate = activity.DueDate,
                ClientId = activity.ClientId
            };

            var result = await _activitiesRepo.Create(newActivity);
            return result;
        }
    }
}