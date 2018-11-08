using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Dto.GatewayResponses.Repositories;

namespace Web.Api.Core.Interfaces.Gateways.Repositories
{
    public interface IEmployersRepository : IRepository<Employer>
    {
        Task<CreateEntityResponse> Create(Employer employer);
        Task<Employer> FindByName(string name);
    }
}