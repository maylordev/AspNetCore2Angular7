using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Dto;
using Web.Api.Core.Dto.GatewayResponses.Repositories;
using Web.Api.Core.Interfaces.Gateways.Repositories;
using Web.Api.Core.Specifications;
using Web.Api.Infrastructure.Identity;


namespace Web.Api.Infrastructure.Data.Repositories
{

    internal sealed class EmployersRepository : EfRepository<Employer>, IEmployersRepository
    {
        private readonly IMapper _mapper;


        public EmployersRepository(IMapper mapper, AppDbContext appDbContext) : base(appDbContext)
        {
            _mapper = mapper;
        }

        async Task<List<Employer>> IRepository<Employer>.ListAll()
        {
            var items = await _appDbContext.Employers.ToListAsync();
            return items;
        }
        public async Task<CreateEntityResponse> Create(Employer employer)
        {
            var newEmployer = await _appDbContext.Employers.AddAsync(employer);

            if (newEmployer.Entity.Id == null)
            {
                return new CreateEntityResponse(newEmployer.Entity.Id.ToString(), false, new List<Error>() { new Error("Create_Employers", "Could not create Employers") });
            }

            await _appDbContext.SaveChangesAsync();
            return new CreateEntityResponse(newEmployer.Entity.Id.ToString(), true);
        }
        async Task<Employer> IRepository<Employer>.GetById(Guid id)
        {
            var employer = await _appDbContext.Employers.FirstAsync(e => e.Id == id);
            return employer;
        }
        public async Task<Employer> FindByName(string name)
        {
            var employer = await _appDbContext.Employers.FindAsync(name);
            return employer;
        }
    }
}
