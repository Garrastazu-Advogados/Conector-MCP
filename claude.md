# Plugin Claude Code — Instruções de Desenvolvimento

## Visão Geral

Este projeto é um **plugin distribuível para o Claude Code**. Ele é um plugin da Garrastazu que expõe um servidor MCP remoto construído em Laravel via HTTP/SSE. O plugin permite que usuários do Claude Code interajam com a API Laravel diretamente pelo terminal.

---

## Estrutura do Projeto

```
meu-plugin/
├── .claude-plugin/
│   └── plugin.json        ← manifesto do plugin (obrigatório)
├── .mcp.json    ← configuração do servidor MCP remoto
├── .mcpb          ← instalador
├── commands/              ← comandos slash /nome
├── skills/                ← skills contextuais (auto-invocadas)
├── hooks/                 ← scripts de eventos automáticos
└── README.md

```

**Regras de estrutura:**
- Os diretórios `commands/`, `skills/` e `hooks/` ficam sempre na raiz do plugin, NUNCA dentro de `.claude-plugin/`
- O único arquivo dentro de `.claude-plugin/` é o `plugin.json`
- O `.mcp.json` fica na raiz do plugin

---

## Arquivos Principais

### `.claude-plugin/plugin.json`
```json
{
  "name": "meu-plugin-laravel",
  "version": "1.0.0",
  "description": "Integração com API Laravel via MCP",
  "author": "seu-nome",
  "homepage": "https://github.com/seu-usuario/meu-plugin-laravel"
}
```

### `.mcp.json`
```json
{
  "mcpServers": {
    "minha-api-laravel": {
      "type": "sse",
      "url": "https://meusite.com/mcp",
      "headers": {
        "Authorization": "Bearer ${MCP_API_TOKEN}"
      }
    }
  }
}
```

---

## Servidor MCP Laravel

O backend usa o pacote `php-mcp/laravel`. Cada ferramenta exposta ao Claude é uma classe PHP com o atributo `#[McpTool]`.

**Padrão de uma Tool:**
```php
namespace App\Mcp\Tools;

use PhpMcp\Server\Attributes\McpTool;

class NomeDaFerramenta
{
    #[McpTool(
        name: 'nome_da_ferramenta',
        description: 'Descrição clara do que faz, em linguagem natural'
    )]
    public function handle(string $parametro): array
    {
        // lógica aqui
        return ['resultado' => $valor];
    }
}
```

**Regras para Tools:**
- O `name` usa snake_case
- A `description` deve ser clara o suficiente para o Claude decidir quando usar a ferramenta sem precisar de instrução adicional
- Retorne sempre um array; em caso de erro, inclua a chave `erro`
- Registre a rota em `routes/api.php` com `Mcp::web('/mcp')`

---

## Comandos Slash

Cada arquivo em `commands/` vira um comando `/nome` no Claude Code.

**Formato (`commands/nome-do-comando.md`):**
```markdown
---
name: nome-do-comando
description: O que esse comando faz
---

Instruções detalhadas para o Claude executar quando o usuário
chamar /nome-do-comando. Pode referenciar tools do MCP.
```

---

## Convenções

- Nomes de tools: `snake_case`
- Nomes de comandos: `kebab-case`
- Nomes de arquivos de skills/hooks: `kebab-case.md` ou `kebab-case.sh`
- Toda tool deve ter tratamento de erro explícito
- Variáveis de ambiente sensíveis (tokens, URLs) nunca hardcoded — sempre via `${VARIAVEL}`

---

## Como Testar Localmente

```bash
# Subir o servidor Laravel
php artisan serve

# Testar as tools com o MCP Inspector
npx @modelcontextprotocol/inspector http://localhost:8000/mcp

# Registrar o servidor no Claude Code para testes
claude mcp add meu-plugin-dev --transport sse http://localhost:8000/mcp
```

---

## Como Distribuir

```bash
# Instalar a partir do GitHub
claude plugin install github:seu-usuario/meu-plugin-laravel

# Recarregar após alterações
/reload-plugins
```

---

## O Que NÃO Fazer

- Não colocar lógica de negócio diretamente nas Tools — delegue para Services/Actions do Laravel
- Não expor endpoints MCP sem autenticação em produção
- Não criar tools com nomes genéricos como `executar` ou `processar`
- Não misturar configuração de múltiplos ambientes no mesmo `.mcp.json`
