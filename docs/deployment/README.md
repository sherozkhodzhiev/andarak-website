# Hosting preparation

The website has not been published by this preparation.

## Reproducible build

Use Node.js 24 and pnpm 9.15.9 (pinned in frontend/package.json).
From frontend/:

    pnpm install --frozen-lockfile
    pnpm run build

The output is frontend/build/. Dependencies must be installed from source.
Do not copy or commit the local node_modules link.

ESLint 8.57.1 matches the existing Create React App 5 toolchain. Linting
remains enabled. Dependency pins formerly expressed as Yarn resolutions now
use pnpm overrides. This is deployment preparation, not a migration from
the older Create React App toolchain or a complete dependency-security audit.

## Netlify import

1. Sign in to your own Netlify account and import the GitHub repository.
2. Choose main as the production branch.
3. The root netlify.toml defines base frontend, build pnpm run build,
   publish build (relative to frontend), Node 24, and frozen pnpm installs.
4. Review the deployment settings before authorizing the first publication.
5. Test the temporary site before connecting or purchasing a domain.

frontend/public/_redirects supplies the SPA fallback for direct links and
refreshes on /history, /culture, /gallery, /about, and culture topic paths.

The original GitHub Pages workflow is archived here with a .disabled
extension. It no longer runs on pushes and cannot publish this repository.

## Public files

The three legacy source/overview documents were moved from frontend/public
to docs/legacy. They remain in source control but are not in the production
website output. Files committed to a public GitHub repository remain public
there; moving them is not a privacy or history-erasure measure.

## Launch checks

- Test direct page links and refreshes on the hosting provider.
- Test English/Russian and light/dark modes on desktop and a real phone.
- Test Gallery, Maps, Instagram, weather, chapter navigation, and music.
- Confirm that intended draft topics remain empty.
- Confirm rights to publish supplied photos, artwork, patterns, and media.
- Set the final domain and verify HTTPS after DNS is connected.
- Any browser audio-autoplay restrictions still apply after deployment.

## Keeping local and GitHub aligned

Prefer normal Git pull/push from one checkout once authentication is set up.
If edits are applied through the GitHub connector, compare actual file
contents before assuming matching commit histories or performing a merge.
Do not reset one side blindly: the existing histories contain separate
commits for equivalent edits.
