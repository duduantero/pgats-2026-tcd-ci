# Gerador de Senhas

Um aplicativo web interativo que permite aos usuários criar senhas fortes e personalizadas com base em critérios específicos (letras maiúsculas/minúsculas, números e símbolos), além de oferecer uma interface intuitiva para o preenchimento de formulários de cadastro.

---

## Origem do Projeto

Este projeto foi originalmente baseado no repositório [password_generator_js](https://github.com/matheusbattisti/password_generator_js/tree/main) do instrutor **Matheus Battisti** (Hora de Codar).

A aplicação original serviu como uma excelente base de interface e lógica inicial. A partir dela, apliquei conceitos avançados de engenharia de software e engenharia de qualidade (QA) para transformar o projeto em um sistema robusto, testável e de fácil manutenção.

---

## Melhorias e Alterações Implementadas

Para elevar o nível de maturidade e confiabilidade da aplicação, foram realizadas as seguintes implementações:

- **Arquitetura MVC (Model-View-Controller):** O código JavaScript foi totalmente refatorado utilizando Módulos ES6. A lógica de geração de senhas e validações (Model) foi 100% isolada da manipulação de elementos da interface (View), utilizando o Controller como intermediário.
- **Tratamento de Exceções:** Implementação de regras de negócio rígidas na camada Model para impedir falhas silenciosas ou comportamentos inesperados (como inputs vazios, nulos ou senhas de tamanho zero).
- **Testes Unitários (Mocha & Chai):** Criação de uma suíte de testes focada no algoritmo da Model, validando caminhos felizes (_happy paths_), combinações de caracteres e o lançamento correto de exceções.
- **Relatórios Visuais (Mochawesome):** Integração do gerador de relatórios para documentar os resultados dos testes unitários em uma página HTML interativa e altamente visual.
- **Testes Ponta a Ponta (Cypress):** Automação do fluxo completo do usuário na interface gráfica (E2E), garantindo que elementos ocultos apareçam no momento certo, botões funcionem e o fluxo de cópia para a área de transferência seja executado sem quebras.

---

## Arquitetura de CI/CD (GitHub Actions)

## Estrutura de CI/CD: Pipeline de Testes Automatizados e Deploy Continúo

Este diretório contém a arquitetura de Integração Contínua (CI) e Entrega Contínua (CD) do projeto, desenvolvida via **GitHub Actions**. O objetivo principal é garantir a qualidade do software através da execução automatizada de testes (unitários e de ponta a ponta) e blindar o ambiente de produção (GitHub Pages) contra deploys instáveis.

A solução é dividida em três estratégias complementares de execução: **Manual**, **Agendada** e **Gatilhada por Evento (Push/PR)**.

---

## Conceitos-Chave Aplicados

Antes de detalhar as pipelines, destacam-se os princípios de arquitetura de software e QA aplicados na solução:

- **Princípio do Menor Privilégio:** As permissões de segurança (`permissions`) são moldadas especificamente para o escopo de cada arquivo. Se a pipeline apenas testa, ela recebe apenas leitura (`contents: read`). Se realiza deploy, recebe escopo restrito de escrita para o token de ID e ambiente de páginas (`pages: write`, `id-token: write`).
- **Idempotência e Instalação Limpa (`npm ci`):** Em vez do tradicional `npm install`, utiliza-se o Clean Install (`ci`). Isso garante que o Runner baixe exatamente as versões trancadas no `package-lock.json`, eliminando o risco de comportamento flutuante (_flaky_) causado por atualizações de dependências em background.
- **Garantia de Evidências de QA (`if: always()`):** Blinda a coleta de resultados. Mesmo se uma suíte de testes falhar e quebrar o fluxo do Job, o GitHub Actions é forçado a coletar os relatórios do Mocha (**Mochawesome**) e os artefatos visuais do **Cypress** para análise de causa-raiz (_root cause analysis_).
- **Deploy Blindado por Qualidade (`if: success()`):** O deploy para o GitHub Pages possui uma trava lógica condicional. A infraestrutura de produção nunca receberá código que não tenha sido 100% validado pelas suítes de testes anteriores.

---

## Detalhamento das Pipelines

### 1. [Execução Manual de Testes e Deploy](.github/workflows/manual-exec.yaml) (`manual-exec.yaml`)

Esta pipeline permite que qualquer membro do time técnico dispare o ciclo completo de validação e publicação sob demanda, diretamente pela interface gráfica (UI) do GitHub.

- **Gatilho (`on: workflow_dispatch`):** Habilita o botão "Run workflow" no painel do GitHub Actions.
- **Fluxo de Trabalho:**
  1. Executa o checkout e configura o ambiente isolado com Node.js (v20.x).
  2. Instala de forma limpa as dependências do projeto.
  3. Roda os testes unitários da camada `Model` através do **Mocha/Chai**.
  4. Levanta um servidor HTTP temporário local (`http-server`) na porta `5500`, aguarda a disponibilidade da rota `index.html` e dispara os testes de interface/E2E com o **Cypress**.
  5. Armazena os relatórios gerados como artefatos duráveis na esteira.
  6. Se **todos** os testes passarem (`success()`), empacota e realiza o deploy da pasta `src/` no GitHub Pages.

### 2. [Execução Agendada de Testes](.github/workflows/agendada-exec.yaml) (`agendada-exec.yaml`)

Voltada para o conceito de _Nightly Builds_ ou testes de regressão periódicos, esta pipeline roda de forma assíncrona para garantir a saúde do projeto mesmo sem interações humanas diretas no repositório.

- **Gatilho (`on: schedule`):** Baseado em uma expressão Cron (`0 0 * * 1`), está configurado para rodar de forma automatizada **toda segunda-feira à meia-noite UTC** (domingo às 21:00 no Horário de Brasília).
- **Segurança Restrita:** Por ser um fluxo exclusivamente focado em auditoria e saúde do código, ele aplica estritamente `contents: read`. Não há rotinas de deploy aqui.
- **Foco em QA:** Segue rigorosamente os passos de testes unitários e E2E (Cypress), consolidando os logs e gerando os artefatos (`mocha-unit-report` e `cypress-e2e-report`) para checagem do time na abertura da sprint.

### 3. [Execução Automatizada de Testes e Deploy](.github/workflows/automatizada-exec.yaml) (`automatizada-exec.yaml`)

O coração do modelo de Integração e Entrega Contínua (CI/CD) do projeto. Age como a principal barreira de qualidade do repositório em tempo real.

- **Gatilhos (`on: push` / `on: pull_request`):**
  - Disparado automaticamente a cada **Push** direcionado às branches `main` e `develop`.
  - Disparado a cada abertura ou atualização de **Pull Request** que tenha a branch `main` como destino.
- **Proteção de Branch e Deploy Restrito:** Embora os testes rodem em ambas as branches para garantir o feedback rápido ao desenvolvedor, o deploy possui uma dupla validação de segurança:
  ```yaml
  if: success() && github.ref == 'refs/heads/main'
  ```
  Isso significa que o ecossistema do GitHub Pages só será atualizado se a esteira de testes estiver completamente verde **E** se o evento de alteração de código estiver ocorrendo estritamente dentro da branch principal (`main`). Alterações na branch `develop` ou em Pull Requests apenas validam os testes, sem afetar o ambiente público.

---

## Resumo dos Ambientes e Permissões

| Pipeline         | Gatilho                 | Executa Testes? |    Realiza Deploy?     | Escopo de Permissão                                 |
| :--------------- | :---------------------- | :-------------: | :--------------------: | :-------------------------------------------------- |
| **Manual**       | `workflow_dispatch`     |       Sim       |   Sim (Se aprovado)    | `contents: read`, `pages: write`, `id-token: write` |
| **Agendada**     | `schedule` (Cron)       |       Sim       |          Não           | `contents: read`                                    |
| **Automatizada** | `push` / `pull_request` |       Sim       | Sim (Apenas na `main`) | `contents: read`, `pages: write`, `id-token: write` |

---

## Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (ES6 Modules)
- **Testes Unitários:** Mocha, Chai
- **Relatórios:** Mochawesome
- **Testes E2E:** Cypress
- **CI/CD / Infraestrutura:** GitHub Actions, GitHub Pages

---

## Próximos Passos

Este projeto está em constante evolução. As próximas melhorias planejadas incluem:

- [ ] Adicionar um medidor de força da senha gerada (Fraca, Média, Forte).

---

## Pré-requisitos e Instalação Local

Antes de começar, certifique-se de ter os seguintes requisitos instalados na sua máquina:

- **Git**: Para clonar o repositório.
- **Node.js (versão LTS - recomendada v20.x ou superior)**: Ambiente de execução JavaScript.
- **NPM (instalado junto com o Node.js)**: Gerenciador de pacotes.
- **Navegador Web**: Google Chrome, Chromium ou Electron para a execução visual dos testes de interface.

---

## Como Rodar os Testes e o Projeto Localmente

### 1. Clonar o Repositório

1. Abra o seu terminal e execute os comandos abaixo para clonar o projeto e acessar a pasta raiz:

```bash
   git clone https://github.com/duduantero/pgats-2026-tcd-ci.git
   cd pgats-2026-tcd-ci
```

### 2. Instalar as Dependências do Projeto

1. Instale as dependências de desenvolvimento:
   ```bash
   npm ci
   ```

### 3. Rodar Testes

1. Rodar Testes Unitários
   ```bash
   npm test
   ```
2. Rodar Esteria Completa localmente
   ```bash
   npm run ci:local
   ```
