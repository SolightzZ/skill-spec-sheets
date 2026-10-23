# Skills and MCP Docs Index

A static documentation index for 12 agent-skill and MCP collections.

The site provides searchable Thai and English reference pages for skills, commands, workflows, and MCP servers. Each page keeps source links and license information.

## Preview locally

Open `index.html` directly in a browser. The site supports `file://` and has no runtime dependencies.

## Build and check

```bash
node tools/build-pages.cjs
node tools/build-pages.cjs --check
node tools/check-docs.cjs
```

The build step composes the page shell with the shared components and page data. The check step validates schemas, IDs, counts, examples, and source paths.

## Project layout

```text
index.html                  Home page
apps/                       Generated documentation pages
components/                 Shared page templates and page data
js/core/                    Shared rendering and interaction code
js/pages/                   Collection data modules
styles/                     Shared and page-specific CSS
tools/                      Build and validation scripts
DOC-SCHEMA.md               Item data schema
```

## Updating content

1. Update the relevant file in `components/pages/<page>/data.json` or `js/pages/<page>.js`.
2. Update `index.html` when a collection name, description, or count changes.
3. Run the build and validation commands above.
4. Keep source links, licenses, counts, and technical claims aligned with the upstream collection.

Do not edit generated files in `apps/` directly. Edit the source components or data, then rebuild.

## Scope

The index covers these 12 collections and links each one to its upstream repository:

- [Agent Skills](https://github.com/addyosmani/agent-skills)
- [Karpathy Guidelines](https://github.com/forrestchang/andrej-karpathy-skills)
- [Caveman](https://github.com/JuliusBrussee/caveman)
- [Graphify](https://github.com/Graphify-Labs/graphify)
- [Impeccable](https://github.com/pbakaus/impeccable)
- [Matt Pocock's Skills](https://github.com/mattpocock/skills)
- [MCP Servers](https://github.com/modelcontextprotocol/servers)
- [Ponytail](https://github.com/DietrichGebert/ponytail)
- [Security Audit](https://github.com/cloudflare/security-audit-skill)
- [Superpowers](https://github.com/obra/superpowers)
- [Taste Skill](https://github.com/Leonxlnx/taste-skill)
- [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)

This project is a static reference index. It does not install, run, or modify the upstream skills and servers.
