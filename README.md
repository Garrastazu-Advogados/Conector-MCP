# Garrastazu Laravel Superset MCP

Extensao MCP da Garrastazu para conectar o Claude Desktop ao endpoint Laravel Superset via SSE.

## Configuracao

Durante a instalacao da extensao, informe:

- `mcp_server_url`: `http://127.0.0.1:8000/mcp/superset`
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
