using System;
using System.ComponentModel.DataAnnotations;
using Web.Api.Core.Dto.GatewayResponses.Repositories;
using Web.Api.Core.Dto.UseCaseResponses;
using Web.Api.Core.Interfaces;

namespace Web.Api.Core.Dto.UseCaseRequests
{
    public class CreateActivityRequest : IUseCaseRequest<CreateEntityResponse>
    {
        [Required]
        public string Name { get; set; }
        [StringLength(500, ErrorMessage = "Description cannot be longer than 70 characters.")]
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public Guid ClientId { get; set; }
        public DateTime Created { get; set; }

        public CreateActivityRequest(string name, string description)
        {
            Name = name;
            Description = description;
        }
    }
}
