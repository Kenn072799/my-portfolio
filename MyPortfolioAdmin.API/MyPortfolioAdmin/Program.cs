using Microsoft.AspNetCore.HttpOverrides;
using MyPortfolioAdmin.Extensions;
using MyPortfolioAdmin.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddMemoryCache();
builder.Services.AddDatabase(builder.Configuration);
builder.Services.AddCorsPolicy(builder.Configuration);
builder.Services.AddChatRateLimiting();
builder.Services.AddHttpClient<GroqService>();
builder.Services.AddHttpClient<IpGeolocationService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

// Render handles SSL at the proxy level — skip HTTPS redirect inside the container
if (app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseCors("PortfolioPolicy");
app.UseRateLimiter();
app.UseAuthorization();
app.MapControllers();

// Render injects PORT at runtime; fall back to 8080 locally
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
app.Run($"http://0.0.0.0:{port}");
