# LepKit

> Scaffold a Leptos app from the **leptos-setter** template.

LepKit is a CLI that recreates the full `leptos-setter` project — a Leptos 0.8
CSR app with theming, routing, a reusable UI kit and a device-fleet landing
page — in a new project directory. It rewrites the project name everywhere it
appears and initializes a fresh git repository.

## Requirements

- [Rust](https://rustup.rs) (edition 2024, e.g. Rust 1.85+)
- The `wasm32-unknown-unknown` target for building the generated app:

  ```sh
  rustup target add wasm32-unknown-unknown
  ```

## Installation

The project template is embedded inside the crate, so the CLI works standalone
from anywhere:

```sh
cargo install --path CLI                  # from inside this repository
cargo install --git https://github.com/execute-soft/LepKit  # from the LepKit repo
cargo install lepkit                      # from crates.io (after publishing)
```

For quick local runs without installing:

```sh
cargo run --manifest-path CLI/Cargo.toml -- my-app
```

## Usage

```sh
lepkit my-app                 # create ./my-app
lepkit my-app --path ~/code   # create ~/code/my-app
lepkit my-app --no-git        # skip git init + initial commit
lepkit my-app --force         # overwrite an existing non-empty directory
lepkit --help                 # all options
```

## What it creates

A full copy of the project with the new name, excluding tooling/build
directories (`.git`, `target`, `dist`, `node_modules`, `CLI`, `.opencode`,
`openspec`):

```text
my-app/
  Cargo.toml          # package name rewritten to your project name
  Cargo.lock
  index.html          # <title> set to your project name
  package.json        # name rewritten
  Trunk.toml
  style/              # Tailwind v4 + theme tokens
  public/
  src/
    app/              # providers, router, routes
    components/       # layout + reusable UI kit
    core/             # theme, storage, loading
    features/         # pages
    config/           # app constants
    hooks/
    utils/
```

The project name may contain letters, digits, `-` and `_`.

## Next steps after scaffolding

```sh
cd my-app
npm install            # installs @tailwindcss/cli used by the Trunk pre-build hook
rustup target add wasm32-unknown-unknown   # if not already installed
trunk serve            # start the dev server at http://localhost:8080
```

## Development

```sh
cargo build --manifest-path CLI/Cargo.toml
./CLI/target/debug/lepkit my-app
```

## Publishing

### 1. Prepare the manifest

`CLI/Cargo.toml` already carries `description`; add metadata before your first
release (license, repository, keywords, categories, readme). Example:

```toml
[package]
name = "lepkit"
version = "0.1.0"
edition = "2024"
description = "Scaffold a Leptos app from the leptos-setter template"
license = "MIT"
repository = "https://github.com/morshedulmunna/leptos-setter"
readme = "README.md"
keywords = ["leptos", "scaffold", "cli", "template"]
categories = ["command-line-utilities", "development-tools"]
rust-version = "1.85"

[dependencies]
clap = { version = "4", features = ["derive"] }
```

### 2. Publish to crates.io

```sh
cd CLI
cargo login                     # enter your crates.io API token (https://crates.io/settings/tokens)
cargo package --list            # sanity check the files that will be shipped
cargo publish --dry-run         # verify everything builds and packages
cargo publish                   # upload v0.1.0
```

Users can then install it:

```sh
cargo install lepkit
```

### Updating the template

The template lives in `CLI/template/` and is shipped inside the published
crate. When the project changes, refresh it before releasing:

```sh
rsync -a --delete \
  --exclude '.git' --exclude 'target' --exclude 'dist' --exclude 'node_modules' \
  --exclude 'CLI' --exclude '.opencode' --exclude 'openspec' --exclude 'AGENTS.md' \
  ./ CLI/template/
```

## License

MIT