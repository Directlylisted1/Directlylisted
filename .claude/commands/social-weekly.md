---
description: Draft next week's social content ideas and load them into the social engine
---

You are fulfilling the weekly content-drafting job for the Directly Listed social engine (local server at http://localhost:4790).

Steps:
1. Check the engine is running: GET http://localhost:4790/api/health (via curl in Bash). If it isn't, start it in the background: `npm start` in C:\directlylisted\social-engine.
2. GET http://localhost:4790/api/requests — if there is a pending `weekly-ideas` request, use its prompt and note its `id`. Otherwise GET http://localhost:4790/api/prompts/weekly for the prompt.
3. Read C:\directlylisted\social-engine\brand\brand.md and generate 7 content ideas following the prompt's JSON schema exactly. Make them varied, specific, and tied to current capital-raising trends (search the web for this week's private-market news for the "market" idea).
4. POST the ideas to http://localhost:4790/api/ideas with body `{"ideas":[...], "source":"claude-session", "requestId":"<id if any>"}`.
5. Show the user a table of the 7 ideas and remind them to approve their favorites on the dashboard (http://localhost:4790 → Ideas) or ask you to approve specific ones via POST /api/ideas/:id/approve.

$ARGUMENTS
