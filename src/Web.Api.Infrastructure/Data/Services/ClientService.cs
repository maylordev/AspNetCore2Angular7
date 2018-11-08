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
    public class ClientService : IClientService
    {
        private readonly IClientsRepository _clientsRepo;
        public ClientService(IClientsRepository clientsRepo)
        {
            _clientsRepo = clientsRepo;
        }

        public async Task<List<Client>> ListAll()
        {
            return await _clientsRepo.ListAll();
        }
        public async Task<Client> GetById(Guid id)
        {
            return await _clientsRepo.GetById(id);
        }
        public async Task<CreateEntityResponse> Create(CreateClientRequest client)
        {
            var newClient = new Client
            {
                Name = client.Name,
                Description = client.Description,
                EmployerId = client.EmployerId
            };

            var result = await _clientsRepo.Create(newClient);
            return result;
        }
    }
}