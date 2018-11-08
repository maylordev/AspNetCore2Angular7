using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Dto.GatewayResponses.Repositories;

namespace Web.Api.Core.Interfaces.Gateways.Repositories
{
    public interface IActivitiesRepository : IRepository<Activity>
    {
        Task<CreateEntityResponse> Create(Activity activity);
        Task<Activity> FindByName(string name);
    }
}