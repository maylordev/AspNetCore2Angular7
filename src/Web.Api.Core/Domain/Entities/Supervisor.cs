using System;
using Web.Api.Core.Shared;

namespace Web.Api.Core.Domain.Entities
{
    public class Supervisor : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        internal Supervisor() { /* Required by EF */ }

        public Supervisor(string firstName, string lastName)
        {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Created = DateTime.UtcNow;
        }
    }
}