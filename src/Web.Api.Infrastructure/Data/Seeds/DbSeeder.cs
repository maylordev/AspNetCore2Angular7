using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Domain.Enums;

namespace Web.Api.Infrastructure.Data.Seeds
{
    public class DbSeeder
    {
        private readonly AppDbContext _appDbContext;
        public DbSeeder(
            AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<int> SeedActivities()
        {
            if (!_appDbContext.Activities.Any())
            {
                _appDbContext.AddRange
                (
                    new Activity("Activity 1", "activity 1", DateTime.UtcNow),
                    new Activity("Activity 2", "activity 2", DateTime.UtcNow),
                    new Activity("Activity 3", "activity 3", DateTime.UtcNow),
                    new Activity("Activity 4", "activity 4", DateTime.UtcNow)
                );
            }
            return await _appDbContext.SaveChangesAsync();
        }
        public async Task<int> SeedClients()
        {
            if (!_appDbContext.Clients.Any())
            {
                _appDbContext.AddRange
                (
                    new Client("Client 1"),
                    new Client("Client 2"),
                    new Client("Client 3"),
                    new Client("Client 4")
                );
            }
            return await _appDbContext.SaveChangesAsync();
        }
        public async Task<int> SeedEmployers(string filePath)
        {
            if (!_appDbContext.Employers.Any())
            {
                _appDbContext.AddRange
                (
                    new Employer("Bovsi Studios"),
                    new Employer("Employer 2"),
                    new Employer("Employer 3"),
                    new Employer("Employer 4")
                );
            }
            return await _appDbContext.SaveChangesAsync();
        }
        public async Task<int> SeedEmployees()
        {
            if (!_appDbContext.Employees.Any())
            {
                _appDbContext.AddRange
                (
                    new Employee("Matt", "Taylor"),
                    new Employee("Tom", "Fobear"),
                    new Employee("Matthew", "Parks"),
                    new Employee("Denisse", "Parks")
                );
            }
            return await _appDbContext.SaveChangesAsync();
        }
        public static void Seed(AppDbContext context)
        {

        }
    }
}