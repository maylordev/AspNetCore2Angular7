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
    public class EmployeesController : Controller
    {
        private readonly IEmployeesRepository _employeesRepo;
        public EmployeesController(IEmployeesRepository employeesRepo)
        {
            _employeesRepo = employeesRepo;
        }
        // GET api/employees/
        [HttpGet]
        public async Task<IEnumerable<Employee>> GetEmployees()
        {
            var employees = await _employeesRepo.ListAll();

            return employees;
        }
    }
}