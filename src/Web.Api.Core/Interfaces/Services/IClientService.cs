using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Dto.GatewayResponses.Repositories;
using Web.Api.Core.Dto.UseCaseRequests;

namespace Web.Api.Core.Interfaces.Services
{
    public interface IClientService
    {
        Task<List<Client>> ListAll();
        Task<Client> GetById(Guid id);
        Task<CreateEntityResponse> Create(CreateClientRequest client);

    }
}