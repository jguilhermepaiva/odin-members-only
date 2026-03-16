# 🔒 Members Only - Clubhouse

Este é um projeto de rede social exclusiva desenvolvido como parte do currículo do **The Odin Project**. O objetivo foi criar uma aplicação Fullstack onde o anonimato é a regra, a menos que você possua as credenciais corretas para entrar no clube.

## 🚀 Funcionalidades

- **Autenticação Completa:** Cadastro e Login utilizando **Passport.js** com estratégia local.
- **Segurança:** Senhas criptografadas no banco de dados com **Bcryptjs**.
- **Níveis de Acesso (RBAC):**
  - **Visitante:** Pode ler as mensagens, mas autor e data são ocultos.
  - **Membro:** Pode postar mensagens e visualizar detalhes (autor/data) de outras postagens.
  - **Admin:** Possui privilégios de moderação, podendo excluir qualquer mensagem.
- **Validação de Formulários:** Uso de `express-validator` para garantir integridade dos dados.

## 🛠️ Tecnologias Utilizadas

- **Backend:** Node.js & Express
- **Frontend:** EJS (Embedded JavaScript templates)
- **CSS:** Tailwind CSS
- **Banco de Dados:** PostgreSQL
- **Autenticação:** Passport.js & Express-Session
- **Infraestrutura:** Railway / Render

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:
- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)

## 🔧 Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone [https://github.com/SEU_USUARIO/odin-members-only.git](https://github.com/SEU_USUARIO/odin-members-only.git)