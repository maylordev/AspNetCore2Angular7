using System;
using System.Runtime.Serialization;
using Web.Api.Core.Shared;

namespace Web.Api.Core.Domain.Entities
{
    public class Activity : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        [DataMemberAttribute]
        public DateTime DueDate { get; set; }
        public Guid ClientId { get; set; }
        internal Activity() { /* Required by EF */ }

        public Activity(string name, string description, DateTime dueDate)
        {
            this.Name = name;
            this.Description = description;
            this.DueDate = dueDate;
            this.Created = DateTime.UtcNow;
        }
    }
}