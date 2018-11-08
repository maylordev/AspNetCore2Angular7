using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Dto.GatewayResponses.Repositories;

namespace Web.Api.Core.Interfaces.Gateways.Repositories
{
    public interface IEmployeesRepository : IRepository<Employee>
    {
        Task<CreateEntityResponse> Create(string firstName, string lastName);
        Task<Employee> FindByName(string name);
    }
}