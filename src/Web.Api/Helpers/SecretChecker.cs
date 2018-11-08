
using System;

namespace Web.Api.Helpers
{
    public static class SecretChecker
    {
        public static bool CheckUserSuppliedSecretValue(string userSuppliedValue, string secretValue)
        {
            return (string.IsNullOrWhiteSpace(userSuppliedValue) || string.IsNullOrWhiteSpace(secretValue)
                    || !string.Equals(userSuppliedValue, secretValue, StringComparison.InvariantCulture));
        }
    }
}