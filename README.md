# Garrastazu E-Garra MCP (Remote Connector)

Este repositorio foi migrado para o alvo de conector remoto do Claude.ai.

Endpoint canonico:

- `https://mcp.garrastazu.com.br/mcp/e-garra`

## Objetivo

- Entregar um servidor MCP remoto em Laravel para uso por usuarios do Claude.ai (organizacao).
- Autenticacao principal por OAuth2 (Authorization Code + PKCE).
- HTTPS obrigatorio em producao.

## Fluxo de credenciais para o usuario

- Opcao recomendada: login OAuth na UI do connector.
- Opcao de contingencia: token manual temporario com expiracao curta.

## Estado do repositorio

- Codigo do servidor Laravel MCP em `laravel-mcp-enterprise/`.
- Este diretorio `plugin/` permanece apenas com documentacao/transicao.

## Notas operacionais

- Nao versionar tokens reais.
- Validar endpoint e autenticacao antes de rollout para usuarios finais.
- Manter monitoramento de erros e auditoria de chamadas MCP.

