using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Dto.GatewayResponses.Repositories;
using Web.Api.Core.Dto.UseCaseRequests;
using Web.Api.Core.Interfaces.Gateways.Repositories;
using Web.Api.Core.Interfaces.Services;
using Web.Api.Infrastructure.Data;
using Web.Api.Models.Request;

namespace Web.Api.Controllers
{
    [Authorize(Policy = "ApiUser")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployersController : Controller
    {
        private readonly IEmployerService _employerService;
        public EmployersController(IEmployerService employerService)
        {
            _employerService = employerService;
        }
        // GET api/employers/{id}
        [HttpGet("{id}", Name = "GetEmployer")]
        public async Task<Employer> GetEmployer(Guid id)
        {
            var employer = await _employerService.GetById(id);

            return employer;
        }
        // GET api/employers
        [HttpGet("", Name = "GetEmployers")]
        public async Task<IEnumerable<Employer>> GetEmployers()
        {
            var employers = await _employerService.ListAll();

            return employers;
        }
        [HttpPost]
        public async Task<CreateEntityResponse> Create([FromBody]CreateEmployerRequest employer)
        {
            var employerId = await _employerService.Create(employer);
            return employerId;
        }
    }
}