using System.IO;
using System.Linq;
using Web.Api.Infrastructure.Data.Seeds;

namespace Web.Api.Infrastructure.Data
{
    public static class AppDbContextExtensions
    {
        public static int EnsureSeedData(this AppDbContext context)
        {
            var activitiesCount = default(int);
            var organizationsCount = default(int);
            var clientsCount = default(int);
            var employeesCount = default(int);

            // Because each of the following seed method needs to do a save
            // (the data they're importing is relational), we need to call
            // SaveAsync within each method.
            // So let's keep tabs on the counts as they come back

            var dbSeeder = new DbSeeder(context);
            if (!context.Employers.Any())
            {
                var pathToSeedData = Path.Combine(Directory.GetCurrentDirectory(), "SeedData", "EmployerssSeedData.json");
                organizationsCount = dbSeeder.SeedEmployers(pathToSeedData).Result;
            }
            // if (!context.Activities.Any())
            // {
            //     activitiesCount = dbSeeder.SeedActivities().Result;
            // }
            // if (!context.Clients.Any())
            // {
            //     clientsCount = dbSeeder.SeedClients().Result;
            // }
            // if (!context.Employees.Any())
            // {
            //     employeesCount = dbSeeder.SeedEmployees().Result;
            // }

            return activitiesCount + organizationsCount + employeesCount + clientsCount;
        }
    }
}