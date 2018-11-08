using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Dto.GatewayResponses.Repositories;
using Web.Api.Core.Dto.UseCaseRequests;

namespace Web.Api.Core.Interfaces.Services
{
    public interface IEmployerService
    {
        Task<List<Employer>> ListAll();
        Task<Employer> GetById(Guid id);
        Task<CreateEntityResponse> Create(CreateEmployerRequest employer);

    }
}