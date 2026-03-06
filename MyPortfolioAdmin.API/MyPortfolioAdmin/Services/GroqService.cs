using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;

namespace MyPortfolioAdmin.Services;

public class GroqService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;
    private readonly ILogger<GroqService> _logger;
    private static string? _cachedPrompt;
    private static readonly Lock _lock = new();

    public GroqService(HttpClient httpClient, IConfiguration config, ILogger<GroqService> logger)
    {
        _httpClient = httpClient;
        _config = config;
        _logger = logger;
    }

    public async Task<string> AskAI(string context, string userQuestion)
    {
        var apiKey = _config["Groq:ApiKey"];

        if (_cachedPrompt == null)
        {
            lock (_lock)
            {
                if (_cachedPrompt == null)
                {
                    _cachedPrompt = File.ReadAllText("Ai/portfolio-prompt.md");
                    _logger.LogInformation("System prompt loaded from file ({Length} chars)", _cachedPrompt.Length);
                }
            }
        }
        else
        {
            _logger.LogDebug("Using cached system prompt ({Length} chars)", _cachedPrompt.Length);
        }

        _logger.LogInformation("Sending request to Groq API for question: {Question}", userQuestion);

        var body = new
        {
            model = "openai/gpt-oss-120b",
            messages = new[]
            {
                new {
                    role = "system",
                    content = _cachedPrompt
                },
                new {
                    role = "user",
                    content = $"Portfolio Data:\n{context}\n\nUser Question: {userQuestion}"
                }
            }
        };

        var json = JsonConvert.SerializeObject(body);

        var request = new HttpRequestMessage(HttpMethod.Post,
            "https://api.groq.com/openai/v1/chat/completions");

        request.Headers.Authorization =
            new AuthenticationHeaderValue("Bearer", apiKey);

        request.Content = new StringContent(json, Encoding.UTF8, "application/json");

        var response = await _httpClient.SendAsync(request);

        _logger.LogInformation("Groq API responded with status {StatusCode}", (int)response.StatusCode);

        var result = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
        {
            throw new HttpRequestException($"Groq API request failed with status {response.StatusCode}: {result}");
        }

        dynamic data = JsonConvert.DeserializeObject(result);

        if (data?.choices == null || data.choices.Count == 0)
        {
            throw new InvalidOperationException("Invalid response from Groq API: missing choices");
        }


        return data.choices[0].message.content;
    }
}
