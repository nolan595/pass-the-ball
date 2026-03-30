## Live deployment

| | |
|---|---|
| **Live URL** | https://pass-the-ball-hunch.netlify.app |
| **GitHub repo** | https://github.com/nolan595/pass-the-ball |
| **Netlify site name** | pass-the-ball-hunch |
| **Netlify account** | nolan595 |
| **Auto-deploy** | Enabled — every push to `main` triggers a new deploy |

## Deploying updates

Push to `main` and Netlify will automatically build and deploy:

```bash
git add .
git commit -m "your message"
git push
```

Or trigger a manual deploy:

```bash
netlify deploy --build --prod
```

## Build configuration

| | |
|---|---|
| **Build command** | `npm run build` |
| **Publish directory** | `.next` |
| **Node version** | 20 |
| **Runtime** | Next.js 16 via Netlify Next.js Runtime v5 |

## Environment variables

Set or update env vars via the Netlify CLI:

```bash
netlify env:set KEY value
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | Railway PostgreSQL connection string |
