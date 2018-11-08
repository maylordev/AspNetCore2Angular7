using System;
using System.ComponentModel.DataAnnotations;
using Web.Api.Core.Shared;

namespace Web.Api.Core.Domain.Entities
{
    public class Client : BaseEntity
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        // public int EmployerId { get; set; }
        // public Employer Employer { get; set; }
        public Guid EmployerId { get; set; }

        internal Client() {/* Required by EF */}
        public Client(string name)
        {
            this.Name = name;
            this.Created = DateTime.UtcNow;
        }
    }
}