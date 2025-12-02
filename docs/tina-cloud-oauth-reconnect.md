# Reconnecting TinaCloud to GitHub

When TinaCloud cannot index branches and reports that a branch (for example, `main`) is missing even though the environment variables reference the correct project ID, it usually means TinaCloud never received a valid GitHub OAuth + App installation for that project. If the GitHub OAuth popup never appears, use the targeted checks below to unblock the handshake and re-trigger branch indexing.

## Why the GitHub OAuth window can disappear
- **GitHub already sees an installation**: If the Tina Cloud GitHub App is already installed under your user/org but not scoped to the repo, GitHub will skip the OAuth prompt and silently reuse the stale installation, leaving Tina without a usable `installation_id` for the new project.
- **Browser session mismatch**: Being signed into GitHub with a different account than the one that owns/installed the app prevents the Tina dashboard from obtaining the installation token, so no popup is shown.
- **Stale project metadata**: If a Tina project is tied to an installation that no longer exists or points to a different repo, Tina assumes authorization exists and never asks GitHub again. The project can get “stuck” in this pre-index state until you force a new install.
- **Popup/cookie blocking**: Third-party cookie or popup blockers (including company SSO plugins) can suppress the GitHub window entirely.

## Force a fresh OAuth + installation flow
1. **Hard-reset GitHub authorization**
   - In GitHub, go to **Settings → Applications → Authorized OAuth Apps** and revoke **Tina Cloud** for every account/org that has previously installed it.
   - In **Settings → Applications → Installed GitHub Apps → Tina Cloud**, remove the app or explicitly **deselect the affected repository** so no installation references it. Do this for both your user and the owning organization (if different).

2. **Re-open Tina in a clean session**
   - Log out of TinaCloud and GitHub in your browser. Open an incognito/private window to avoid cached sessions or blockers.
   - Sign into GitHub with the account that owns the Zenslim/Zentrust repo, then sign into TinaCloud and open **Configuration → Change Repository**.

3. **Trigger installation directly if the popup still does not appear**
   - Open `https://github.com/apps/tina-cloud/installations/new` in the same session. GitHub will force an installation/authorization flow even if Tina did not open the popup.
   - Choose the **Zenslim/Zentrust** repository, complete the authorization, and return to the Tina dashboard. Tina should now detect the installation and proceed to pull branches.

4. **Clear a potentially stuck Tina project**
   - If branches still do not appear, duplicate the Tina project (create a new project in the Tina dashboard) and update `NEXT_PUBLIC_TINA_CLIENT_ID`/`TINA_TOKEN` to the new project’s values. This ensures the project metadata is fresh and forces Tina to request a new GitHub installation token.
   - After redeploying with the new env vars, revisit **Configuration → Change Repository** and connect the repo again. This resets any stale installation ID tied to the previous project.

## Verify the indexer is running
- In the Tina dashboard, **Pull Branches** should list `main` once the installation is recognized. If it does not, re-open the installation URL above to confirm GitHub shows the repo under the Tina Cloud app.
- Redeploy on Vercel after the successful install so Tina can ingest the repo with the fresh project ID and token.

These steps focus on the situations where GitHub never shows the OAuth window and provide a deterministic way (direct installation URL or new project ID) to force TinaCloud to obtain the required GitHub token and start indexing.
