# Credit Ledger

**Explainable Credit Risk & Loan Portfolio Monitoring**  
**Aditya Makurwar / Ethen huntt**

A complete, runnable static research website: welcome page, terms acknowledgment, and commercial-loan monitoring dashboard. No npm packages, external fonts, CDN scripts, account or API key required.

## Run locally

Install Node.js 20 or newer, open a terminal in this folder, then:

```sh
npm start
```

Open http://localhost:3000. No `npm install` is needed because the project has no dependencies. Stop the server with Ctrl+C. Alternatively, open `index.html` directly in a browser. The preview server binds only to your computer.

## User flow

1. Open the welcome page and choose **Review terms & enter**.
2. Read the terms, check the acknowledgment and enter the workspace.
3. Select any obligor to inspect its stage history, reason codes and attributions.
4. Search by name, sector or ID; sort any column or filter the watchlist.
5. Adjust the DSCR slider to explore the explicitly assumed PD sensitivity.
6. Export the current table view as CSV. Whole-portfolio totals remain unchanged by filters.

The footer credit appears on every page. Terms acknowledgment is not authentication; the dashboard URL remains directly accessible. No acceptance record is stored.

## What is actually implemented

- Eight synthetic commercial obligors across six sector groupings.
- $200M total EAD, exposure-weighted PD and reconciled 12-month expected loss.
- Search, sorting, watchlist/breach/stage filters, CSV export and empty state.
- Obligor-level reason codes, review history, additive attribution graphics.
- DSCR sensitivity, with a defaulted-obligor guard.
- Responsive layouts, focus styling, semantic tables and keyboard search (Cmd/Ctrl+K).
- Welcome page, terms page, local static server and automated logic checks.

## Accuracy and scope

This is a working **frontend research demonstrator**, not a trained ML product. No backend model or training code was supplied for this build. Do not describe it as production-ready lending software.

`EL = EAD × (PD / 100) × (LGD / 100)`

EAD and EL are expressed in USD millions; PD and LGD inputs are percentages. Full-precision calculations precede display rounding. For Alder Quay: `42.1 × 0.06 × 0.45 = 1.1367` million USD. The whole-book EL is `12.22548` million USD. Weighted PD includes a defaulted obligor with 100% PD, so it differs materially from performing-book PD.

Attributions use synthetic percentage-point contributions. Baseline plus contributions equals displayed PD. They are **not computed SHAP values**. Genuine SHAP values may be in log-odds; never relabel them as percentage points without a valid transformation and additive explanation method.

Stage labels are fixture review assignments, not a rule engine. Simplified 12-month EL is **not IFRS 9 ECL**, especially for Stage 2/3. The ±20% PD sensitivity range is not a confidence interval. Missing model version history, training dates and drift statistics are honestly marked unavailable.

The DSCR scenario uses an explicit assumption: increasing DSCR by 1.00× reduces PD by 2 percentage points, capped to 0–100%. It does not change the portfolio, reassign stages or imply causation.

## Files and responsibilities

| File | Responsibility |
| --- | --- |
| `index.html` | Welcome and entry point |
| `terms.html` | Project-use terms and acknowledgment |
| `dashboard.html` | Portfolio page structure |
| `assets/styles.css` | Shared responsive editorial styling |
| `assets/dashboard.js` | Synthetic data, calculations and interactions |
| `assets/terms.js` | Acknowledgment behavior |
| `server.cjs` | Dependency-free local preview |
| `tests/dashboard.test.cjs` | Numeric, interaction-logic and link checks |
| `NOTICE.md` | Ownership and license status |

HTML defines the structure, CSS defines its appearance, and JavaScript derives values and updates the UI. Keeping them separate makes it possible to change presentation without silently changing risk calculations.

## Verify

```sh
npm test
```

Checks cover portfolio arithmetic, attribution reconciliation, probability bounds, filters, sorting, empty states, scenario behavior, terms flow and local links. These are Node-based logic checks with a minimal document mock, not full browser accessibility or visual tests.

Manual browser checks: complete the entry flow, inspect all eight obligors, operate the slider, export a filtered CSV, navigate with Tab and test a narrow mobile viewport. Browser visual validation was not available in the build environment.

## Upload to GitHub

1. Extract the ZIP. Create an empty GitHub repository named `credit-ledger`.
2. Upload the **contents** of this folder, including `assets` and `tests`, to the repository root. Keep `index.html` at the root. Do not upload only the ZIP.
3. Or use Git from this folder after replacing the URL below with your repository URL:

```sh
git init
git add .
git commit -m "Add Credit Ledger research website"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

This deliverable does not create or publish a GitHub repository for you. It contains only static assets, so any static hosting service can serve it without a build step. Choose hosting visibility deliberately: there is no application authentication.

## Connecting a real model later

1. Train and evaluate a model on an appropriate commercial-loan dataset. UCI credit-card features do not supply commercial DSCR, collateral or covenant fields.
2. Keep training, validation and test data separated; save preprocessing together with the estimator.
3. Expose a backend prediction API with a defined horizon, units, model version and source timestamps. Keep credentials on the server.
4. Return actual model explanations with their baseline, units and reconciliation check. Replace the fixture data and narrative together.
5. Add schema validation, missing-data handling and failure states before allowing uploads. This version intentionally has no CSV import or model-inference endpoint.
6. Validate calibration, drift and explanations using real evaluation evidence. Add authentication and appropriate data controls before handling confidential records.

## Privacy and licensing

The application itself has no telemetry or persistent browser storage. Hosting infrastructure may have its own request logs. All fixture obligors are synthetic. No open-source license has been selected; see `NOTICE.md`. Review the terms and select a license appropriate for your intended distribution before inviting reuse.
