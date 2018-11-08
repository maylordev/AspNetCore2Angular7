using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Interfaces.Gateways.Repositories;
using Web.Api.Infrastructure.Data;

namespace Web.Api.Controllers
{
    [Authorize(Policy = "ApiUser")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class SupervisorsController : Controller
    {
        private readonly ISupervisorsRepository _supervisorsRepo;
        public SupervisorsController(ISupervisorsRepository supervisorsRepo)
        {
            _supervisorsRepo = supervisorsRepo;
        }
        // GET api/supervisors/
        [HttpGet]
        public async Task<IEnumerable<Supervisor>> GetSupervisors()
        {
            var supervisors = await _supervisorsRepo.ListAll();

            return supervisors;
        }
    }
}