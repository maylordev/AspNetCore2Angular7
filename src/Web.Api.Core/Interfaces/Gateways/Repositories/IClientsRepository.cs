using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Dto.GatewayResponses.Repositories;

namespace Web.Api.Core.Interfaces.Gateways.Repositories
{
    public interface IClientsRepository : IRepository<Client>
    {
        Task<CreateEntityResponse> Create(Client client);
        Task<Client> FindByName(string name);
    }
}