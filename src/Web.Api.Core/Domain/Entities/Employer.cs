using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Web.Api.Core.Shared;


namespace Web.Api.Core.Domain.Entities
{
    public class Employer : BaseEntity
    {
        [Required]
        public string Name { get; set; } // EF migrations require at least private setter - won't work on auto-property
        public string Description { get; set; }
        // public ICollection<Employee> Employees { get; set; }
        // public ICollection<Client> Clients { get; set; }


        internal Employer() { /* Required by EF */ }

        public Employer(string name)
        {
            this.Name = name;
            this.Created = DateTime.UtcNow;
        }

    }
}
