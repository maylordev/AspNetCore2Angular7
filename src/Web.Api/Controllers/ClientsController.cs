using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Dto.GatewayResponses.Repositories;
using Web.Api.Core.Dto.UseCaseRequests;
using Web.Api.Core.Interfaces.Gateways.Repositories;
using Web.Api.Core.Interfaces.Services;

namespace Web.Api.Controllers
{
    [Authorize(Policy = "ApiUser")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : Controller
    {
        private readonly IClientService _clientService;

        public ClientsController(IClientService clientService)
        {
            _clientService = clientService;
        }

        // GET api/client/{id}
        [HttpGet("{id}", Name = "GetClient")]
        public async Task<Client> GetClient(Guid id)
        {
            var client = await _clientService.GetById(id);

            return client;
        }
        // GET api/clients
        [HttpGet("", Name = "GetCients")]
        public async Task<IEnumerable<Client>> GetClients()
        {
            var clients = await _clientService.ListAll();

            return clients;
        }
        [HttpPost]
        public async Task<CreateEntityResponse> Create([FromBody]CreateClientRequest client)
        {
            var clientId = await _clientService.Create(client);
            return clientId;
        }
    }
}