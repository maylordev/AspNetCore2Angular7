using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Web.Api.Core.Domain.Entities;
using Web.Api.Core.Shared;


namespace Web.Api.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Employer> Employers { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Supervisor> Supervisors { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<WorkActivity> WorkActivities { get; set; }
        public DbSet<Client> Clients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(ConfigureUser);

            // modelBuilder.Entity<Organization>()
            //     .HasMany<Employee>(o => o.Employees)
            //     .WithOne(e => e.Organization)
            //     .HasForeignKey(e => e.OrganizationId)
            //     // Cascade delete automatically deletes the child row 
            //     // when the related parent row is deleted. 
            //     // For example, if an Organization is deleted, then all the Employees
            //     // in that org should also be deleted from the database automatically
            //     .OnDelete(DeleteBehavior.Cascade);
        }

        public void ConfigureUser(EntityTypeBuilder<User> builder)
        {
            var navigation = builder.Metadata.FindNavigation(nameof(User.RefreshTokens));
            //EF access the RefreshTokens collection property through its backing field
            navigation.SetPropertyAccessMode(PropertyAccessMode.Field);

            builder.Ignore(b => b.Email);
            builder.Ignore(b => b.PasswordHash);
        }
        public override int SaveChanges()
        {
            AddAuitInfo();
            return base.SaveChanges();
        }

        public async Task<int> SaveChangesAsync()
        {
            AddAuitInfo();
            return await base.SaveChangesAsync();
        }

        private void AddAuitInfo()
        {
            var entries = ChangeTracker.Entries().Where(x => x.Entity is BaseEntity && (x.State == EntityState.Added || x.State == EntityState.Modified));
            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    ((BaseEntity)entry.Entity).Created = DateTime.UtcNow;
                }
                ((BaseEntity)entry.Entity).Modified = DateTime.UtcNow;
            }
        }
    }
}


