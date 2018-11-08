using System;
using Web.Api.Core.Shared;

namespace Web.Api.Core.Domain.Entities
{
    public class WorkActivity : BaseEntity
    {
        public int ClientId { get; set; }
        public decimal TotalWorkTime { get; set; }
        public string Notes { get; set; }
        internal WorkActivity() { /* Required by EF */ }

        public WorkActivity(int clientId, decimal totalWorkTime, string notes)
        {
            this.ClientId = clientId;
            this.TotalWorkTime = totalWorkTime;
            this.Notes = notes;
            this.Created = DateTime.UtcNow;
        }
    }
}