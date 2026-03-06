# ── Build stage ──────────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Restore dependencies first (layer cache friendly)
COPY MyPortfolioAdmin/MyPortfolioAdmin.csproj MyPortfolioAdmin/
RUN dotnet restore MyPortfolioAdmin/MyPortfolioAdmin.csproj

# Copy everything and publish
COPY MyPortfolioAdmin/ MyPortfolioAdmin/
WORKDIR /src/MyPortfolioAdmin
RUN dotnet publish -c Release -o /app/publish --no-restore

# ── Runtime stage ─────────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_ENVIRONMENT=Production

# Render injects PORT at runtime; default to 8080 for local Docker testing
EXPOSE 8080

ENTRYPOINT ["dotnet", "MyPortfolioAdmin.dll"]
