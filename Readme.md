# Blockchain InfluenceHub DApp

Este projeto é uma aplicação web desenvolvida com **React**, **TypeScript** e **Vite** para gerenciar um programa de influenciadores de blockchain. O sistema permite que administradores criem missões e eventos, enquanto influenciadores podem participar, submeter provas de participação e acumular pontos para subir no ranking.

## Funcionalidades

- **Autenticação:** Login e cadastro de usuários (influenciadores e administradores).
- **Dashboard:** Painel personalizado para influenciadores e administradores.
- **Missões:** Listagem, criação (admin), submissão e aprovação de missões.
- **Eventos:** Gerenciamento de eventos, check-in com código e histórico de participação.
- **Ranking:** Visualização dos influenciadores mais ativos.
- **Perfil:** Histórico de missões e eventos do usuário.

## Estrutura de Pastas

```
backend/         # Backend da aplicação (API, lógica de negócio, etc)
frontend/        # Frontend em React + TypeScript
  src/
    state/       # Contextos e dados mockados
    ui/          # Componentes de interface (Layout, autenticação)
    views/       # Páginas principais (Dashboard, Missões, Eventos, etc)
    assets/      # Imagens e ícones
    App.tsx      # Componente principal
    main.tsx     # Ponto de entrada
  public/        # Arquivos públicos (imagens, favicon, etc)
  index.html     # HTML principal
  ...            # Outros arquivos de configuração (package.json, vite.config.ts, etc)
Readme.md        # Documentação do projeto
```

## Como rodar o projeto

1. Instale as dependências:
   ```sh
   pnpm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```sh
   pnpm dev
   ```
3. Acesse [http://localhost:5173](http://localhost:5173) no navegador.

## Mock de Usuários

- **Admin:**  
  Email: `admin@exemplo.com`  
  Senha: `admin123`

- **Embaixador:**  
  Email: `embaixador@exemplo.com`  
  Senha: `senha123`

## Tecnologias

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

## Lint e Qualidade de Código

O projeto utiliza ESLint com regras para React e TypeScript. Veja exemplos de configuração em [eslint.config.js](eslint.config.js).

## Observações

- Os dados são mockados e armazenados apenas em memória.
- Não há integração com backend ou blockchain real.
- Ideal para prototipação e testes de interface.

---

Sinta-se livre para adaptar este README conforme novas funcionalidades forem