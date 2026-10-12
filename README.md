# The Comfort Coach (React)

React front end for La-Z-Boy Comfort Coach sales training. This replaces the Domo custom-app prototype and is structured for AWS hosting + LLM integration.

## Stack

- React 19 + TypeScript
- Vite
- Static assets in `public/assets`
- AI calls go through `src/lib/ai/client.ts` (mock locally, AWS API in production)

## Run locally

```bash
cd comfort-coach-web
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

Without AWS configured, guest replies use a **local mock** so UI/flow work offline.

## Connect an AWS language model

1. Copy `.env.example` to `.env`
2. Set:

```bash
VITE_AI_API_URL=https://your-api.execute-api.us-east-1.amazonaws.com/prod/chat
VITE_AI_API_KEY=optional-bearer-token
```

3. Restart `npm run dev`

### Expected API contract

`POST $VITE_AI_API_URL`

```json
{
  "system": "…guest system prompt…",
  "input": "…conversation + beat…",
  "temperature": 0.95
}
```

Response (any one of these shapes):

```json
{ "text": "Guest spoken line" }
```

```json
{ "output": "Guest spoken line" }
```

```json
{ "choices": [{ "output": "Guest spoken line" }] }
```

Recommended AWS shape:

`CloudFront / S3 (this React app)` → `API Gateway` → `Lambda` → `Amazon Bedrock` (or your approved model)

Keep model credentials in Lambda/Secrets Manager — never in the browser.

## Project layout

```
src/
  components/          # shared chrome (TopBar)
  features/
    home/              # homepage tiles + hero
    onboarding/        # Comfort Compass overview window
    drills/            # drill picker
    conversation/      # live practice chat
  data/                # Comfort Compass, personas, drills
  lib/ai/              # AI client + guest reply engine
  styles/app.css       # brand UI styles
public/assets/         # images
```

## Production build

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to S3 + CloudFront (or Amplify).

## Migration notes from Domo prototype

| Domo prototype | React app |
|---|---|
| `comfort-coach/app.js` | Split into `data/`, `lib/ai/`, React features |
| `domo.ai.generateText` | `src/lib/ai/client.ts` → AWS API |
| `domo.env` user | TBD: Cognito / SSO |
| AppDB submissions | TBD: DynamoDB / API |
| `manifest.json` / Ryuu | Not used |

The Domo folder (`../comfort-coach`) remains as the visual/content reference during migration.
