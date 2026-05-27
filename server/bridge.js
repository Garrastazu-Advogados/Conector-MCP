#!/usr/bin/env node
const { spawn } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const serverUrl = process.env.MCP_SERVER_URL;
const apiToken = process.env.MCP_API_TOKEN;

if (!serverUrl) {
  console.error("[ERRO] MCP_SERVER_URL nao definido.");
  process.exit(1);
}

if (!apiToken) {
  console.error("[ERRO] MCP_API_TOKEN nao definido.");
  process.exit(1);
}

function buildArgs() {
  return [
    "-y",
    "mcp-remote",
    serverUrl,
    "--transport",
    "sse-first",
    "--header",
    `AUTHORIZATION: Bearer ${apiToken}`
  ];
}

function resolveNodeWithNpxCli() {
  const candidates = process.platform === "win32"
    ? [
        process.execPath,
        "C:\\Program Files\\nodejs\\node.exe",
        "C:\\Program Files (x86)\\nodejs\\node.exe"
      ]
    : [process.execPath];

  for (const candidate of candidates) {
    if (!fs.existsSync(candidate)) {
      continue;
    }
    const npxCli = path.join(path.dirname(candidate), "node_modules", "npm", "bin", "npx-cli.js");
    if (fs.existsSync(npxCli)) {
      return { node: candidate, npxCli };
    }
  }

  return null;
}

const resolved = resolveNodeWithNpxCli();
const child = resolved
  ? spawn(resolved.node, [resolved.npxCli, ...buildArgs()], { stdio: ["pipe", "pipe", "pipe"] })
  : spawn("npx", buildArgs(), { stdio: ["pipe", "pipe", "pipe"] });

process.stdin.pipe(child.stdin);
child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);

child.on("error", (error) => {
  console.error("[ERRO] Falha ao iniciar mcp-remote:", error.message);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code == null ? 1 : code);
});
