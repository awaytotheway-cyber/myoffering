# Deploying to Vercel

This is a Vite application. Deploy the complete project source, not the generated `dist` folder alone.

The repository root must contain `package.json`, `package-lock.json`, `vercel.json`, `index.html`, and the complete `src` folder.

Vercel will run `npm ci`, then `npm run build`, and publish `dist` through the checked-in `vercel.json` configuration.

Set `VITE_N8N_WEBHOOK_URL`, `VITE_N8N_API_KEY`, and `VITE_N8N_TIMEOUT_MS` in the Vercel project's Environment Variables settings. Do not upload the local `.env` file.
