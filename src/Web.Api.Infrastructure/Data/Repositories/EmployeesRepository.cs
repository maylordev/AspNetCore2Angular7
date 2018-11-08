using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Dto;
using Web.Api.Core.Dto.GatewayResponses.Repositories;
using Web.Api.Core.Interfaces.Gateways.Repositories;

namespace Web.Api.Infrastructure.Data.Repositories
{
    internal sealed class EmployeesRepository : EfRepository<Employee>, IEmployeesRepository
    {
        private readonly IMapper _mapper;
        public EmployeesRepository(IMapper mapper, AppDbContext appDbContext) : base(appDbContext)
        {
            _mapper = mapper;
        }
        public async Task<CreateEntityResponse> Create(string firstName, string lastName)
        {
            var employee = new Employee { FirstName = firstName, LastName = lastName };
            var newActivity = await _appDbContext.Employees.AddAsync(employee);

            if (newActivity.Entity.Id == null)
            {
                return new CreateEntityResponse(newActivity.Entity.Id.ToString(), false, new List<Error>() { new Error("Create_Employee", "Could not create Employee") });
            }

            await _appDbContext.SaveChangesAsync();
            return new CreateEntityResponse(newActivity.Entity.Id.ToString(), true);
        }
        public async Task<Employee> FindByName(string name)
        {
            var item = await _appDbContext.Employees.FindAsync(name);
            return item;
        }
        async Task<Employee> IRepository<Employee>.GetById(Guid id)
        {
            var employee = await _appDbContext.Employees.FindAsync(id);
            return employee;
        }
        async Task<List<Employee>> IRepository<Employee>.ListAll()
        {
            var items = await _appDbContext.Employees.ToListAsync();
            return items;
        }
    }
}