# Core chart and pillar navigation

20 November 2026

The core trend shows the approved composite and the provisional composite based on available pillars. The CapEx-only scenario is available under Hyperscalers → Capital investment → CapEx sensitivity. The Hyperscalers selection retains its conditional pillar estimate. The change is in presentation. The accepted scores and source snapshots are the same.

Pillar links use the browser’s immediate anchor jumps. The offline dashboard export at `index.html` reflects the same chart and navigation changes.

## Gateway deployments under `/ai_index/`

Vinext can request `/ai_index.rsc` during dashboard initialization. The gateway must forward this path to the same upstream application as `/ai_index/`, rewriting it to `/ai_index/.rsc` and preserving the query string. Apply the rewrite before matching the application route so its normal access and proxy handling still apply. A 404 here can trigger a reload and interrupt a pillar jump.

After deployment, confirm that `/ai_index.rsc?_rsc` returns HTTP 200 with a `text/x-component` content type. Open the dashboard through its normal launcher and verify that the page scrolls immediately after jumping to a pillar.
