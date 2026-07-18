---
description: Generate today's multi-platform post (copy + Higgsfield video) and queue it in the social engine
---

You are fulfilling the daily post-generation job for the Directly Listed social engine (local server at http://localhost:4790).

Steps:
1. Check the engine: GET http://localhost:4790/api/health. If down, start it in the background: `npm start` in C:\directlylisted\social-engine.
2. GET http://localhost:4790/api/requests — if a pending `daily-post` request exists, use its prompt/meta and note its `id`. Otherwise GET /api/ideas, pick the first approved (else first draft) idea, and GET http://localhost:4790/api/prompts/daily/<ideaId>.
3. Generate the per-platform copy JSON exactly as the prompt specifies (respect every character limit).
4. POST to http://localhost:4790/api/queue with `{"content":{...}, "platforms":[...], "videoBrief":"...", "imagePrompt":"...", "ideaId":"...", "requestId":"<id if any>"}`.
5. **Media generation (Higgsfield):** using the videoBrief, generate a 9:16 short video with the Higgsfield MCP `generate_video` tool (use `models_explore` recommend if unsure of model). Also generate a 1:1 supporting image from the imagePrompt with `generate_image`. Download the results into C:\directlylisted\social-engine\media\ (curl the returned URLs), then attach each via POST http://localhost:4790/api/queue/<itemId>/media with `{"path":"C:\\directlylisted\\social-engine\\media\\<file>", "type":"video"|"image"}`.
   - If Higgsfield tools are unavailable in this session, skip media and tell the user the post is queued text-only with the video brief saved in content/briefs/.
6. Show the user the queued post (topic, per-platform copy preview, scheduled time) and ask nothing — they approve on the dashboard (http://localhost:4790 → Queue), or if they've told you to, approve it yourself via POST /api/queue/<id>/approve.

$ARGUMENTS
