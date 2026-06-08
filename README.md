<<<<<<< HEAD
# Garrastazu Laravel Superset MCP

Este e um plugin da Garrastazu para conectar o Claude Desktop ao endpoint Laravel Superset via MCP (SSE).

## Configuracao

Durante a instalacao da extensao, informe:

- `mcp_server_url`: `http://mcp.garrastazu.com.br:8000/mcp/e-garra`
- `mcp_api_token`: token Bearer do servidor Laravel

## Desenvolvimento local

Validar o manifesto:

```bash
npx -y @anthropic-ai/mcpb validate .
```

Gerar o pacote:

```bash
npx -y @anthropic-ai/mcpb pack .
```

## Observacoes

- Nao versionar tokens reais.
- O launcher usa `mcp-remote` com `sse-first`.
- O endpoint Laravel deve estar acessivel antes da instalacao.

