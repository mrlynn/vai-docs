---
title: "vai workflow create"
description: "Scaffold a publish-ready npm workflow package"
sidebar_position: 9
---

# vai workflow create

Scaffold a publish-ready npm package from an existing workflow JSON file or from scratch.

## Synopsis

```bash
vai workflow create [options]
```

## Description

`vai workflow create` generates a complete npm package structure for sharing a workflow with the community. It creates the `package.json` (with the `vai` field populated), copies or scaffolds the `workflow.json`, generates a README template, and adds a LICENSE file.

The generated package can be published to npm with `npm publish`.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--from <file>` | Existing workflow JSON to package | (none) |
| `--name <name>` | Package name (without `vai-workflow-` prefix) | derived from workflow |
| `--author <name>` | Author name | from git config |
| `--output <dir>` | Output directory | `./vai-workflow-<name>/` |

## Examples

### Package an existing workflow

```bash
vai workflow create --from ./legal-research.json --name legal-research
```

Output:

```
Creating workflow package: vai-workflow-legal-research

✔ Validated workflow definition
✔ Created vai-workflow-legal-research/
  ├── package.json
  ├── workflow.json
  ├── README.md
  └── LICENSE

Next steps:
  1. Edit README.md with usage instructions
  2. cd vai-workflow-legal-research
  3. npm publish
```

### Interactive mode (no --from)

```bash
vai workflow create
```

Prompts for a name, description, category, and author, then generates a template directory with an empty workflow you can fill in.

### Custom output directory

```bash
vai workflow create --from ./my-workflow.json --output ./packages/my-workflow
```

## Generated Package Structure

```
vai-workflow-<name>/
├── package.json          # npm metadata with vai field
├── workflow.json         # Workflow definition
├── README.md             # Usage instructions template
└── LICENSE               # MIT license
```

The scaffolder automatically:
- Extracts tools from workflow steps for the `vai.tools` field
- Copies input definitions for the `vai.inputs` field
- Infers a category from the tools used
- Generates a README template with input documentation

## Related Commands

- [`vai workflow validate`](./workflow-validate) — Validate a workflow before packaging
- [`vai workflow install`](./workflow-install) — Install a published workflow
- [Publishing Workflows Guide](/docs/guides/workflows/publishing-workflows) — Full publishing guide
