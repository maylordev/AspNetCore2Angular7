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

    internal sealed class ClientsRepository : EfRepository<Client>, IClientsRepository
    {
        private readonly IMapper _mapper;


        public ClientsRepository(IMapper mapper, AppDbContext appDbContext) : base(appDbContext)
        {
            _mapper = mapper;
        }

        public async Task<CreateEntityResponse> Create(Client client)
        {
            var newClient = await _appDbContext.Clients.AddAsync(client);

            if (newClient.Entity.Id == null)
            {
                return new CreateEntityResponse(newClient.Entity.Id.ToString(), false, new List<Error>() { new Error("Create_Client", "Could not create Client") });
            }

            await _appDbContext.SaveChangesAsync();
            return new CreateEntityResponse(newClient.Entity.Id.ToString(), true);
        }
        public async Task<Client> FindByName(string name)
        {
            var item = await _appDbContext.Clients.FindAsync(name);
            return item;
        }
        async Task<Client> IRepository<Client>.GetById(Guid id)
        {
            var client = await _appDbContext.Clients.FindAsync(id);
            return client;
        }
        async Task<List<Client>> IRepository<Client>.ListAll()
        {
            var items = await _appDbContext.Clients.ToListAsync();
            return items;
        }

    }
}
