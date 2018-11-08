using System.Collections.Generic;

namespace Web.Api.Core.Dto.GatewayResponses.Repositories
{
    public sealed class CreateEntityResponse : BaseGatewayResponse
    {
        public string Id { get; }
        public CreateEntityResponse(string id, bool success = false, IEnumerable<Error> errors = null) : base(success, errors)
        {
            Id = id;
        }
    }
}
