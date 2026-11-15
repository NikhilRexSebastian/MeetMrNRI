# Meet Mr NRI — React + Vite

A responsive website for NRI services in Kerala, with service filters and WhatsApp contact links.

## Open and run in VS Code

1. Extract the ZIP and open the `meet-mr-nri-react` folder in VS Code using **File → Open Folder**. Open the folder containing `package.json`.
2. Install Node.js 24 LTS from https://nodejs.org if you do not already have it. Restart VS Code after installing.
3. Open **Terminal → New Terminal** and run:

   ```sh
   npm install
   npm run dev
   ```

4. Open the local URL printed in the terminal, usually http://localhost:5173. Edits update the preview automatically. Press Ctrl+C to stop it.

If Windows blocks `npm.ps1`, select Command Prompt as the VS Code terminal profile or use `npm.cmd` instead of `npm`.

Do not open index.html directly or use the Live Server extension for this version. Vite runs the JSX source and resolves the installed React packages.

## Where to edit

| File                                | Purpose                                          |
| ----------------------------------- | ------------------------------------------------ |
| `src/App.jsx`                       | Sections and their order                         |
| `src/components/Header.jsx`         | Navigation                                       |
| `src/components/Hero.jsx`           | Main heading, introduction and home illustration |
| `src/components/Services.jsx`       | Service cards and filter behaviour               |
| `src/data/services.js`              | Service names, descriptions and categories       |
| `src/components/HowItWorks.jsx`     | Three steps                                      |
| `src/components/Contact.jsx`        | Contact section                                  |
| `src/components/Footer.jsx`         | Footer                                           |
| `src/components/WhatsAppButton.jsx` | Reusable contact button                          |
| `src/config/site.js`                | WhatsApp number, displayed phone and message     |
| `src/styles.css`                    | Colours, fonts, spacing and mobile styles        |
| `index.html`                        | Browser title and search description             |

WhatsApp is set to **+91 70254 55544**. Enter digits only, including the country code, in `whatsappNumber`.

React is installed through npm and bundled into the production site. Google Fonts requires an internet connection; system font fallbacks are included.

## Production build

```sh
npm run build
npm run preview
```

The generated `dist/` folder is the deployable static website. Edit `src/`, not the generated files. Run `npm run format` to format source files.

## Upload to GitHub

Upload this folder's **contents** at the repository root, preserving the `.github/workflows/azure-static-web-apps.yml` path. Include `package.json` and `package-lock.json`. Do not upload `node_modules/` or `dist/`.

When replacing the previous three-file version, replace root `index.html`, remove the old root `app.js` and `style.css`, and replace the previous Azure workflow with the supplied one. Keep unrelated repository files. The new source uses `src/main.jsx` and `src/styles.css`.

## Azure Static Web Apps

The included GitHub Action installs dependencies with `npm ci`, builds the project, and deploys `dist/` on every push to `main`. You can also run it manually from GitHub's Actions tab.

1. If you already have an Azure Static Web App and a GitHub secret named `AZURE_STATIC_WEB_APPS_API_TOKEN`, reuse them.
2. Otherwise, create a Static Web App in Azure. Select your subscription and resource group, choose a plan appropriate for your usage, and select **Other** as the deployment source.
3. In that Static Web App, open **Manage deployment token** and copy the token.
4. In GitHub, go to **Settings → Secrets and variables → Actions → New repository secret**. Name it `AZURE_STATIC_WEB_APPS_API_TOKEN` and paste the token as its value. Never commit the token.
5. Commit the project to `main`. If you add the secret after committing, use **Actions → Deploy Meet Mr NRI to Azure → Run workflow**.
6. After the action succeeds, open the URL in your Azure Static Web App's Overview page.

If your branch is named `master`, update `branches: [main]` in the workflow to `[master]`. Retain only one deployment workflow for this site.

This project does not create Azure resources or change your existing Azure deployment until you configure it and run the workflow.
