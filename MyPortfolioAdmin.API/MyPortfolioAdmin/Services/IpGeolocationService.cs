namespace MyPortfolioAdmin.Services;

public class GeoLocation
{
    public string? Country { get; set; }
    public string? CountryCode { get; set; }
}

public class IpGeolocationService
{
    private readonly HttpClient _http;
    private readonly ILogger<IpGeolocationService> _logger;

    public IpGeolocationService(HttpClient http, ILogger<IpGeolocationService> logger)
    {
        _http = http;
        _logger = logger;
    }

    public async Task<GeoLocation?> LookupAsync(string ip)
    {
        // Skip loopback / private IPs — no point calling the API
        if (IsPrivateOrLoopback(ip))
            return new GeoLocation { Country = "Local", CountryCode = "LO" };

        try
        {
            // ip-api.com — free, no key required, 45 req/min limit
            var response = await _http.GetFromJsonAsync<IpApiResponse>(
                $"http://ip-api.com/json/{ip}?fields=status,country,countryCode");

            if (response?.Status == "success")
                return new GeoLocation { Country = response.Country, CountryCode = response.CountryCode };
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "IP geolocation lookup failed for {Ip}", ip);
        }

        return null;
    }

    private static bool IsPrivateOrLoopback(string ip)
    {
        if (ip is "::1" or "127.0.0.1") return true;
        if (ip.StartsWith("192.168.") || ip.StartsWith("10.") || ip.StartsWith("172.")) return true;
        return false;
    }

    private sealed record IpApiResponse(string? Status, string? Country, string? CountryCode);
}
