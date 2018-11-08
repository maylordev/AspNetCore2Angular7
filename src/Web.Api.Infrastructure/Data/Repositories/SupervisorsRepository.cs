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

    internal sealed class SupervisorsRepository : EfRepository<Supervisor>, ISupervisorsRepository
    {
        private readonly IMapper _mapper;


        public SupervisorsRepository(IMapper mapper, AppDbContext appDbContext) : base(appDbContext)
        {
            _mapper = mapper;
        }

        async Task<List<Supervisor>> IRepository<Supervisor>.ListAll()
        {
            var items = await _appDbContext.Supervisors.ToListAsync();
            return items;
        }
        public async Task<CreateEntityResponse> Create(string firstName, string lastName)
        {
            var supervisor = new Supervisor { FirstName = firstName, LastName = lastName };
            var newSupervisor = await _appDbContext.Supervisors.AddAsync(supervisor);

            if (newSupervisor.Entity.Id == null)
            {
                return new CreateEntityResponse(newSupervisor.Entity.Id.ToString(), false, new List<Error>() { new Error("Create_Supervisor", "Could not create Supervisor") });
            }

            await _appDbContext.SaveChangesAsync();
            return new CreateEntityResponse(newSupervisor.Entity.Id.ToString(), true);
        }
        public async Task<Supervisor> GetById(string id)
        {
            var supervisor = await _appDbContext.Supervisors.FindAsync(id);
            return supervisor;
        }
        public async Task<Supervisor> FindByName(string name)
        {
            var supervisor = await _appDbContext.Supervisors.FindAsync(name);
            return supervisor;
        }
    }
}
