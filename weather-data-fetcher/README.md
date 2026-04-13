# Weather Data Fetcher

A small MCP server built with the Model Context Protocol TypeScript SDK. It exposes mock package-tracking and weather tools over stdio, plus a couple of static resources.

## What this project does

The server currently provides:

- `trackPackage`: accepts a tracking number and returns a mock delivery-status message
- `getWeatherByCityName`: accepts a city name and returns mock weather data for `New York` or `London`
- `fights://airports`: a static text resource listing supported airport codes
- `weather://cities`: a static text resource listing supported cities

## Project files

- [server.ts](/Users/tienhuynh-tn/Study/coursera/coursera-vibe-coding-essentials-build-apps-with-ai-specialization/weather-data-fetcher/server.ts): MCP server implementation
- [package.json](/Users/tienhuynh-tn/Study/coursera/coursera-vibe-coding-essentials-build-apps-with-ai-specialization/weather-data-fetcher/package.json): package metadata and start script

## Requirements

- Node.js 18+
- npm

## Install

```bash
npm install
```

## Useful commands

Initialize a new package:

```bash
npm init -y
```

Install runtime dependencies:

```bash
npm install @modelcontextprotocol/sdk zod
```

Install TypeScript development dependencies:

```bash
npm install -D @types/node typescript
```

Install `tsx` so the start script works:

```bash
npm install -D tsx
```

## Run the server

The repo's `start` script runs `tsx server.ts`, but `tsx` is not currently listed in `package.json`. The most direct way to run the project is:

```bash
npx tsx server.ts
```

If you want `npm start` to work reliably in a fresh checkout, install `tsx` first:

```bash
npm install -D tsx
npm start
```

## Inspect with MCP Inspector

```bash
npx @modelcontextprotocol/inspector@latest
```

Then point the inspector at this server using stdio and the command:

```bash
npx tsx server.ts
```

Or, after adding `tsx` as a dev dependency:

```bash
npm start
```

## Tool behavior

### `trackPackage`

Input:

```json
{
  "trackingNumber": "1Z999AA10123456784"
}
```

Response:

```json
{
  "content": [
    {
      "type": "text",
      "text": "Checking delivery status for: 1Z999AA10123456784"
    }
  ]
}
```

### `getWeatherByCityName`

Supported cities:

- `New York`
- `London`

Example input:

```json
{
  "city": "London"
}
```

Example response:

```json
{
  "content": [
    {
      "type": "text",
      "text": "{\"temp\":\"16°C\",\"forecast\":\"Rainy and overcast\"}"
    }
  ]
}
```

If the city is not supported, the tool returns a JSON string with an error message.

## Resources

### `fights://airports`

Returns plain text for:

- `JFK` (New York)
- `LHR` (London Heathrow)
- `SFO` (San Francisco)

### `weather://cities`

Returns plain text for:

- `New York (USA)`
- `London (UK)`

## Notes

- Tool names and log messages are slightly inconsistent in the current source. The implemented weather tool name is `getWeatherByCityName`.
- The airport resource URI is `fights://airports` in the code.
