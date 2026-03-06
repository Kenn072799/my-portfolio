using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace MyPortfolioAdmin.Filters;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class ApiKeyAttribute : Attribute, IAuthorizationFilter
{
    private const string ApiKeyHeaderName = "X-Api-Key";

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        if (!context.HttpContext.Request.Headers.TryGetValue(ApiKeyHeaderName, out var receivedKey))
        {
            context.Result = new UnauthorizedObjectResult("API key is missing.");
            return;
        }

        var config = context.HttpContext.RequestServices.GetRequiredService<IConfiguration>();
        var validKey = config["AdminApiKey"];

        if (string.IsNullOrEmpty(validKey) || !string.Equals(receivedKey, validKey, StringComparison.Ordinal))
            context.Result = new UnauthorizedObjectResult("Invalid API key.");
    }
}
