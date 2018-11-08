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
using Web.Api.Core.Dto.UseCaseRequests;
using Web.Api.Core.Interfaces.Gateways.Repositories;
using Web.Api.Core.Specifications;
using Web.Api.Infrastructure.Identity;


namespace Web.Api.Infrastructure.Data.Repositories
{

    internal sealed class ActivitiesRepository : EfRepository<Activity>, IActivitiesRepository
    {
        private readonly IMapper _mapper;


        public ActivitiesRepository(IMapper mapper, AppDbContext appDbContext) : base(appDbContext)
        {
            _mapper = mapper;
        }

        async Task<List<Activity>> IRepository<Activity>.ListAll()
        {
            var items = await _appDbContext.Activities.ToListAsync();
            return items;
        }
        public async Task<CreateEntityResponse> Create(Activity activity)
        {
            var newActivity = await _appDbContext.Activities.AddAsync(activity);

            if (newActivity.Entity.Id == null)
            {
                return new CreateEntityResponse(newActivity.Entity.Id.ToString(), false, new List<Error>() { new Error("Create_Activity", "Could not create Activity") });
            }

            await _appDbContext.SaveChangesAsync();
            return new CreateEntityResponse(newActivity.Entity.Id.ToString(), true);
        }
        public async Task<Activity> FindByName(string name)
        {
            var activity = await _appDbContext.Activities.FindAsync(name);
            return activity;
        }
        async Task<Activity> IRepository<Activity>.GetById(Guid id)
        {
            var activity = await _appDbContext.Activities.FindAsync(id);
            return activity;
        }
    }
}
