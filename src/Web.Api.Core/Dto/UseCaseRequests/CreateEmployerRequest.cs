using System;
using System.ComponentModel.DataAnnotations;
using Web.Api.Core.Dto.GatewayResponses.Repositories;
using Web.Api.Core.Dto.UseCaseResponses;
using Web.Api.Core.Interfaces;

namespace Web.Api.Core.Dto.UseCaseRequests
{
    public class CreateEmployerRequest : IUseCaseRequest<CreateEntityResponse>
    {
        [Required]
        public string Name { get; set; }
        [StringLength(500, ErrorMessage = "Description cannot be longer than 70 characters.")]
        public string Description { get; set; }
        public DateTime Created { get; set; }

        public CreateEmployerRequest(string name, string description)
        {
            Name = name;
            Description = description;
        }
    }
}
