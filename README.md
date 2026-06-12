# Gerador de Senhas Seguro 🔐

Um aplicativo web interativo que permite aos usuários criar senhas fortes e personalizadas com base em critérios específicos (letras maiúsculas/minúsculas, números e símbolos), além de oferecer uma interface intuitiva para o preenchimento de formulários de cadastro.

---

## 📌 Origem do Projeto

Este projeto foi originalmente baseado no repositório [password_generator_js](https://github.com/matheusbattisti/password_generator_js/tree/main) do instrutor **Matheus Battisti** (Hora de Codar).

A aplicação original serviu como uma excelente base de interface e lógica inicial. A partir dela, apliquei conceitos avançados de engenharia de software e engenharia de qualidade (QA) para transformar o projeto em um sistema robusto, testável e de fácil manutenção.

---

## 🚀 Melhorias e Alterações Implementadas

Para elevar o nível de maturidade e confiabilidade da aplicação, foram realizadas as seguintes implementações:

- **Arquitetura MVC (Model-View-Controller):** O código JavaScript foi totalmente refatorado utilizando Módulos ES6. A lógica de geração de senhas e validações (Model) foi 100% isolada da manipulação de elementos da interface (View), utilizando o Controller como intermediário.
- **Tratamento de Exceções:** Implementação de regras de negócio rígidas na camada Model para impedir falhas silenciosas ou comportamentos inesperados (como inputs vazios, nulos ou senhas de tamanho zero).
- **Testes Unitários (Mocha & Chai):** Criação de uma suíte de testes focada no algoritmo da Model, validando caminhos felizes (_happy paths_), combinações de caracteres e o lançamento correto de exceções.
- **Relatórios Visuais (Mochawesome):** Integração do gerador de relatórios para documentar os resultados dos testes unitários em uma página HTML interativa e altamente visual.
- **Testes Ponta a Ponta (Cypress):** Automação do fluxo completo do usuário na interface gráfica (E2E), garantindo que elementos ocultos apareçam no momento certo, botões funcionem e o fluxo de cópia para a área de transferência seja executado sem quebras.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (ES6 Modules)
- **Testes Unitários:** Mocha, Chai
- **Relatórios:** Mochawesome
- **Testes E2E:** Cypress

---

## 📈 Próximos Passos (Melhorias Contínuas)

Este projeto está em constante evolução. As próximas melhorias planejadas incluem:

- [ ] Criar um feedback visual customizado na View para exibição de erros (substituindo os `alert` nativos).
- [ ] Adicionar um medidor de força da senha gerada (Fraca, Média, Forte).
- [ ] Configurar uma esteira de CI (Continuous Integration) via GitHub Actions para rodar a suíte de testes automaticamente a cada commit.

---

## 🏃‍♂️ Como Rodar os Testes

1. Instale as dependências de desenvolvimento:
   ```bash
   npm install
   ```
