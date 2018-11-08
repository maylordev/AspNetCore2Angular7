using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Dto.GatewayResponses.Repositories;
using Web.Api.Core.Dto.UseCaseRequests;

namespace Web.Api.Core.Interfaces.Services
{
    public interface IActivityService
    {
        Task<List<Activity>> ListAll();
        Task<Activity> GetById(Guid id);
        Task<CreateEntityResponse> Create(CreateActivityRequest employer);
        Task<Activity> Delete(Activity id);

    }
}