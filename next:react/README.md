# Webspace

Frontend and runtime workspace for execute.

Structure guide:

- [workspace structure](/Users/morshedulmunna/Developer/execute/webspace/WORKSPACE_STRUCTURE.md)

## Apps

- `apps/hack`: operator console for organizations, plans, theme registry, plugin registry, DNS verification, and tenant provisioning
- `apps/controller`: CDN-served tenant storefront runtime shell that fetches host-based runtime config, loads the assigned theme bundle, and passes tenant/plugin refs into the theme runtime
- `apps/plugins`: browser plugin bundles published to CDN and registered in `hack`
- `apps/themes/*`: tenant themes published to CDN and assigned per site
- `apps/systems`: internal React app for tenant systems hosts such as `system.<tenant-domain>`
- `apps/docs`: documentation app

## Source of truth

- Rust `core` owns runtime tenant resolution by host
- `hack` owns theme/plugin registration and site assignment
- DigitalOcean Spaces, AWS S3, or other S3-compatible object storage stores immutable theme/plugin artifacts
- `controller` never chooses local themes/plugins by itself in production

## Common commands

From `/Users/morshedulmunna/Developer/execute/webspace`:

```bash
bun run dev
bun run build
bun run check-types
```

Targeted deploy helpers:

```bash
bun run deploy:hack
bun run deploy:controller
bun run deploy:theme:default
```

## Controller runtime flow

1. Request hits a tenant domain.
2. `api/apps/cdn` maps the unknown verified storefront host to `apps/controller/latest`.
3. `apps/controller` fetches Rust runtime config from `/tenant-config`.
4. Rust returns verified tenant, theme, and plugin manifest metadata.
5. Controller fetches the theme manifest from CDN and imports the selected browser theme module.
6. Dynamic data requests go directly to the Rust API.

See:

- [controller README](/Users/morshedulmunna/Developer/execute/webspace/apps/controller/README.md)
- [themes workspace](/Users/morshedulmunna/Developer/execute/webspace/apps/themes/README.md)

## CDN publishing

- Themes publish under `/themes/<theme>/<version>/`
- Plugins publish under `/plugins/<version>/`
- `latest` aliases may exist for operator convenience, but runtime tenant assignment should store versioned URLs
- Static app deploys under `web/apps` auto-register the app in the backend Website Registry after upload, except the internal `administration` app. Future apps under `web/apps/themes/*` are covered when they use the shared static deploy script. The script posts to `/auth/websites` using the uploaded CDN URL; if `APP_KEY` already exists, it treats the conflict as already registered and skips.

Website Registry deploy variables:

- `DEPLOY_REGISTER_WEBSITE`: set to `0` to disable auto-registration or `1` to enable it; defaults to enabled for every app except `administration`.
- `DEPLOY_REQUIRE_WEBSITE_REGISTRATION`: set to `1` only when registry failure should fail the whole app deploy. Defaults to non-blocking registration.
- `DEPLOY_REGISTRY_API_BASE_URL`: production core gateway base URL, for example `https://api.example.com`. Deploy registration refuses localhost and non-HTTPS URLs by default.
- `DEPLOY_REGISTRY_EMAIL`, `DEPLOY_REGISTRY_PASSWORD`: optional deploy login credentials. When set, the deploy script logs in through `/auth/login` and uses the returned HttpOnly cookie for Website Registry registration.
- `DEPLOY_REGISTRY_TOKEN`, `DEPLOY_REGISTRY_COOKIE`: optional compatibility credentials. Use one of these instead of deploy login credentials when a reusable deploy credential is available.
- `APP_DISPLAY_NAME`, `APP_FRAMEWORK`, `APP_DESCRIPTION`: optional metadata overrides.
- `APP_MANIFEST_URL`, `APP_ASSET_PREFIX`, `APP_BUILD_CHECKSUM`, `DEPLOY_REGISTRY_DEPLOYED_BY`: optional deployment metadata.
- `DEPLOY_ALLOW_LOCAL_REGISTRY`: set to `1` only for local dry-run testing when intentionally pointing deploy registration at localhost.

The docs deploy script sets `DEPLOY_REGISTER_WEBSITE=1` and
`DEPLOY_REGISTRY_API_BASE_URL=https://api.executesoft.com` by default so the
`docs` website is registered after each successful upload. It keeps
`DEPLOY_REQUIRE_WEBSITE_REGISTRATION=0` unless an operator overrides it.

Relevant scripts:

- [deploy-theme.sh](/Users/morshedulmunna/Developer/execute/webspace/scripts/deploy-theme.sh)
- [deploy-static-app.sh](/Users/morshedulmunna/Developer/execute/webspace/scripts/deploy-static-app.sh)

## Production frontend routes

- `hacks.execute.store` is served by `hack-app` at the host root
- `system.<tenant-domain>` is served by `systems-app` at the host root
- tenant storefront traffic is served by `apps/controller/latest` through `api/apps/cdn` for `execute.store`, `*.execute.store`, and verified custom domains
