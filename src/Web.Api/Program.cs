using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Web.Api.Helpers;
using Web.Api.Infrastructure.Data;
using Web.Api.Infrastructure.Data.Seeds;

namespace Web.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            string env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT").ToUppercaseFirst();

            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddEnvironmentVariables()
                .AddJsonFile($"./appsettings.{env}.json", optional: false, reloadOnChange: true)
                .Build();

            var host = BuildWebHost(args, config);

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                try
                {
                    var appDbContext = services.GetRequiredService<Infrastructure.Data.AppDbContext>();
                    EnsureDataStorageIsReady(appDbContext);

                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred while migrating the database.");
                }
            }

            host.Run();
        }

        public static IWebHost BuildWebHost(string[] args, IConfigurationRoot config) =>
            WebHost.CreateDefaultBuilder(args)
                    .ConfigureLogging((hostingContext, logging) =>
                    {
                        logging.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
                        logging.AddConsole();
                        logging.AddDebug();
                    })
                    .UseConfiguration(config)
                    .UseUrls("https://localhost:5002")
                .UseStartup<Startup>()
                .Build();

        private static void EnsureDataStorageIsReady(AppDbContext appDbContext)
        {
            DbSeeder.Seed(appDbContext);
        }
    }
}
// ? CreateDefaultBuilder Defautls
// var builder = new WebHostBuilder()
//     .UseKestrel()
//     .UseContentRoot(Directory.GetCurrentDirectory())
//     .ConfigureAppConfiguration((hostingContext, config) => { /* setup config */  })
//     .ConfigureLogging((hostingContext, logging) =>  { /* setup logging */  })
//     .UseIISIntegration()
//     .UseDefaultServiceProvider((context, options) =>  { /* setup the DI container to use */  })
//     .ConfigureServices(services => 
//     {
//         services.AddTransient<IConfigureOptions<KestrelServerOptions>, KestrelServerOptionsSetup>();
//     });