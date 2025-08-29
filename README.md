Sombono - Website (Ready for Publishing)

Overview

This repository contains the static website for Sombono. The site is a single-page HTML/CSS/JS project. Main files:

- `Index.html` - Main page (root).
- `Home.css` - Primary stylesheet.
- `Assets/` - Images and static assets used by the site.
- `netlify.toml` - Netlify configuration (publishes the root directory and redirects all routes to `Index.html`).

What I changed

- Uncommented the faded hero logo image in `Index.html` so the branding is visible on publish.
- Added this `README.md` and a `sitemap.xml` to assist with publishing.

Publish (Netlify)

The project already contains `netlify.toml` configured to publish from the root and route all requests to `Index.html`.

Two common deployment options:

1) Drag & Drop
   - Zip the repository root (including `Index.html`, `Home.css`, `Assets/`, and `netlify.toml`) and drag it into Netlify's "Sites" -> "Add new site" -> "Deploy manually" area.

2) Connect a Git Repository
   - Push the project to a Git provider (GitHub/GitLab/Bitbucket), then connect the repo in Netlify. Netlify will use the `netlify.toml` configuration. No build command required.

Local preview

To preview locally, serve the folder with a simple static server, for example:

- Python: `python -m http.server 8000`
- Or use any local server (VS Code Live Server, http-server, etc.)

Notes & Checklist

- [x] `Index.html` contains the hero logo (uncommented).
- [x] `netlify.toml` is present and configured to publish the root and redirect all routes to `Index.html`.
- [x] `sitemap.xml` added to repository root.
- [ ] Verify fonts and external CDN links are accessible in the target hosting environment.
- [ ] Optional: Add meta tags and open graph images for social sharing.

If you want, I can also:
- Create a GitHub repo and push this project.
- Configure Netlify site from the repository (requires repository access).
- Add meta/open-graph tags and a robots.txt.

Form handling (Formspree)

To use Formspree (recommended):

1. Sign up at https://formspree.io and create a form; copy the generated form ID (looks like `f/xxxxx`).
2. Update the `action` attribute in `Index.html`'s contact form to `https://formspree.io/f/yourFormId` (replace `yourFormId`).
3. Optionally set a redirect by adding: `<input type="hidden" name="_next" value="https://yourdomain.com/thank-you.html" />`.
4. Test by deploying to a host or testing locally with a static server. Formspree will email submissions to the address you confirm.

Note: I updated the form in `Index.html` to use Formspree as a placeholder. Replace `yourFormId` with the real ID after creating the form.

Formspree + ImprovMX setup (send submissions to sales@sombono.com)

1) Formspree (receive form submissions)
   - Installed Formspree form ID: `f/xpwjqkek` (already placed in `Index.html`).
   - We added hidden fields:
      - `_replyto` = sales@sombono.com (so Formspree sets the Reply-To)
      - `_next` = https://sombono.com/thank-you.html (redirect after successful submit)

2) GoDaddy Email (you purchased mailbox) — exact records from your account
   - Your GoDaddy Email setup requires a CNAME + two MX records. Add these exact records in GoDaddy DNS Manager (Manage DNS for `sombono.com`):

      - CNAME
         - Host / Name: email
         - Points to / Target: email.secureserver.net

      - MX records
         - Host / Name: @
            Priority: 0
            Points to / Target: smtp.secureserver.net
         - Host / Name: @
            Priority: 10
            Points to / Target: mailstore1.secureserver.net

      - Recommended SPF TXT (improves deliverability):
         - Type: TXT
         - Host / Name: @
         - Value: `v=spf1 include:secureserver.net ~all`

   - Important: remove any previous ImprovMX MX records (mx1.improvmx.com / mx2.improvmx.com) so the GoDaddy Email MX records are the only MX entries for `@`.

3) Verify flow
   - After you add the DNS records, wait for propagation (usually minutes to a couple hours). Then in Formspree set the receiving address to `sales@sombono.com` — Formspree will send a verification email to that address which will arrive in your GoDaddy inbox.
   - Send a test message to sales@sombono.com and confirm it lands in the Titan/GoDaddy inbox (you showed that UI earlier).

If you want, I can update `DNS_RECORDS.txt` with these exact values (copy/paste ready) and provide the precise GoDaddy Manage DNS click-by-click instructions. Paste "yes" and I will apply the small repo edits.
3) Verify flow
   - Deploy site to GitHub Pages (or any static host) so `thank-you.html` is reachable.
   - Submit the contact form; Formspree will email the submission to the address you verified with Formspree. ImprovMX forwards any direct mail sent to sales@sombono.com to your real inbox.

ImprovMX forwarding target: `mthembu.nam@gmail.com` has been recorded.

Add these MX records at your registrar to activate ImprovMX forwarding for `sales@sombono.com`:

   - Host/Name: @    Value: mx1.improvmx.com    Priority: 10
   - Host/Name: @    Value: mx2.improvmx.com    Priority: 20

Optional (improves deliverability): add this SPF TXT record:

   - Name: @    Value: `v=spf1 include:spf.improvmx.com ~all`

Formspree note:
   - Formspree sends submissions to the email address configured/verified in your Formspree account. Make sure the receiving address in Formspree is `sales@sombono.com` (Formspree will send a verification email to that address).
   - Because ImprovMX forwards `sales@sombono.com` to `mthembu.nam@gmail.com`, confirm the verification email arrives at `mthembu.nam@gmail.com` after you add the MX records.

GitHub Pages deployment (steps)

1) Create a GitHub repository and push this project (example commands):

```powershell
cd "c:\Users\0179887\OneDrive - Transnet SOC Ltd\Documents\Sombono"
git init
git add .
git commit -m "Initial site commit"
# create a repo on GitHub, then:
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

2) Enable GitHub Pages:
   - Go to your repository on GitHub → Settings → Pages.
   - Under 'Branch', select `main` and folder `/(root)` (or choose `gh-pages` if you prefer that workflow), then Save.

3) Custom domain (`sombono.com`):
   - I added a `CNAME` file to the repo containing `sombono.com`.
   - In GitHub Pages settings, set the custom domain to `sombono.com`.

4) DNS (at your domain registrar):
   - For the apex domain (sombono.com) add these A records (GitHub Pages IPs):
      - 185.199.108.153
      - 185.199.109.153
      - 185.199.110.153
      - 185.199.111.153
   - For the www subdomain add a CNAME record:
      - Name: www  → Value: `<your-github-username>.github.io` (or the GitHub Pages default domain)

5) HTTPS: GitHub will provision a certificate via Let's Encrypt once DNS is configured. Enable 'Enforce HTTPS' in Pages settings.

Email forwarding (sales@sombono.com) — cheap option:
   - Use ImprovMX (free tier) to forward sales@sombono.com to your existing email.
   - DNS MX records to add at registrar:
      - mx1.improvmx.com (priority 10)
      - mx2.improvmx.com (priority 20)
   - Optional TXT/SPF policy: `v=spf1 include:spf.improvmx.com ~all`

Notes:
- GitHub Pages is static — `send_email.php` will not run. Use Formspree, Netlify Forms, or similar for contact handling.
- After pushing and configuring DNS, allow up to 48 hours for DNS propagation, but often it’s much faster.

If you want, I can:
- Replace the Formspree placeholder with your form ID.
- Convert the contact form to use GitHub Pages-friendly Formspree or ImprovMX instructions.
- Prepare the exact `git` commands with your GitHub repo name and push the CNAME commit for you to run locally.

Contact me with the next task and I'll continue.
