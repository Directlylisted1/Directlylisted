---
description: Show the social engine's status — queue, ideas, pending requests, recent activity
---

Check the Directly Listed social engine at http://localhost:4790:

1. GET http://localhost:4790/api/status (if the server is down, run `node bin/cli.js status` in C:\directlylisted\social-engine instead).
2. Summarize for the user: Publer live vs simulation, auto-publish mode, idea/queue counts, pending Claude requests, failures (with reasons), and the last few activity-log lines.
3. If there are pending requests, offer to fulfil them now (/social-weekly for weekly-ideas requests, /social-daily for daily-post requests).
4. If there are failed queue items about unmapped accounts, remind the user to connect profiles in Publer and click "Sync from Publer" on the dashboard.

$ARGUMENTS
