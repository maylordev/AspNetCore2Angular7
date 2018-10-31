using System;
using Web.Api.Core.Shared;

namespace Web.Api.Core.Domain.Entities
{
    public class Client : BaseEntity
    {
        public string Name { get; set; }
        public Client(int Id, string Name)
        {
            this.Id = Id;
            this.Name = Name;
            this.Created = DateTime.Now;
        }
    }
}