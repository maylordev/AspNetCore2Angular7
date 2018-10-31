using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Api.Core.Domain.Entities;

namespace Web.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : Controller
    {
        private static List<Client> _clients = new List<Client>()
        {
            new Client(1, "Client 1"),
            new Client(1, "Client 2"),
            new Client(1, "Client 3"),
            new Client(1, "Client 4"),
        };

        // GET api/activities/
        [HttpGet]
        public IEnumerable<Client> GetActivities()
        {
            return _clients;
        }
    }
}