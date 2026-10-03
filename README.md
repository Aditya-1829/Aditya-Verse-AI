# Aditya-Verse.AI

A ChatGPT-style web frontend connected to a secure Netlify serverless backend.

## Files
- `index.html` — frontend
- `netlify/functions/chat.js` — backend AI endpoint
- `netlify.toml` — Netlify configuration
- `package.json` — backend dependency
- `.gitignore` — keeps secrets out of Git

## Deploy
1. Upload these files to a GitHub repository.
2. Import the repository into Netlify.
3. Build command: leave empty.
4. Publish directory: `.`
5. Add an environment variable in Netlify:
   - Key: `OPENAI_API_KEY`
   - Value: your API key
6. Optional model variable:
   - Key: `OPENAI_MODEL`
   - Value: `gpt-6-luna`
7. Deploy/redeploy.

NEVER put the API key inside `index.html`, GitHub, or client-side JavaScript.

## Important
The AI API is usage-billed according to the provider's current pricing. Set spending/usage controls where available before sharing the app publicly.

Firebase is not required for the basic AI chat. It can be added later for user accounts, saved chats, and database features.
