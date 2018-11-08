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
    public class EmployerService : IEmployerService
    {
        private readonly IEmployersRepository _employersRepo;
        public EmployerService(IEmployersRepository employersRepo)
        {
            _employersRepo = employersRepo;
        }

        public async Task<List<Employer>> ListAll()
        {
            return await _employersRepo.ListAll();
        }
        public async Task<Employer> GetById(Guid id)
        {
            return await _employersRepo.GetById(id);
        }
        public async Task<CreateEntityResponse> Create(CreateEmployerRequest employer)
        {
            var newEmployer = new Employer
            {
                Name = employer.Name,
                Description = employer.Description
            };

            var result = await _employersRepo.Create(newEmployer);
            return result;
        }
    }
}