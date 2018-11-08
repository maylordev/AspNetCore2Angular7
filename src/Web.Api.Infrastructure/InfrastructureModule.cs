using Autofac;
using Web.Api.Core.Interfaces.Gateways.Repositories;
using Web.Api.Core.Interfaces.Services;
using Web.Api.Infrastructure.Auth;
using Web.Api.Infrastructure.Data.Repositories;
using Web.Api.Infrastructure.Data.Services;
using Web.Api.Infrastructure.Interfaces;
using Web.Api.Infrastructure.Logging;
using Module = Autofac.Module;

namespace Web.Api.Infrastructure
{
    public class InfrastructureModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<ClientService>().As<IClientService>().InstancePerLifetimeScope();
            builder.RegisterType<ActivityService>().As<IActivityService>().InstancePerLifetimeScope();
            builder.RegisterType<EmployerService>().As<IEmployerService>().InstancePerLifetimeScope();
            builder.RegisterType<SupervisorsRepository>().As<ISupervisorsRepository>().InstancePerLifetimeScope();
            builder.RegisterType<EmployersRepository>().As<IEmployersRepository>().InstancePerLifetimeScope();
            builder.RegisterType<EmployeesRepository>().As<IEmployeesRepository>().InstancePerLifetimeScope();
            builder.RegisterType<UserRepository>().As<IUserRepository>().InstancePerLifetimeScope();
            builder.RegisterType<ActivitiesRepository>().As<IActivitiesRepository>().InstancePerLifetimeScope();
            builder.RegisterType<ClientsRepository>().As<IClientsRepository>().InstancePerLifetimeScope();
            builder.RegisterType<JwtFactory>().As<IJwtFactory>().SingleInstance().FindConstructorsWith(new InternalConstructorFinder());
            builder.RegisterType<JwtTokenHandler>().As<IJwtTokenHandler>().SingleInstance().FindConstructorsWith(new InternalConstructorFinder());
            builder.RegisterType<TokenFactory>().As<ITokenFactory>().SingleInstance();
            builder.RegisterType<JwtTokenValidator>().As<IJwtTokenValidator>().SingleInstance().FindConstructorsWith(new InternalConstructorFinder());
            builder.RegisterType<Logger>().As<ILogger>().SingleInstance();
        }
    }
}
