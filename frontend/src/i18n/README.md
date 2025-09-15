# Sistema de Internacionalização (i18n)

Este projeto utiliza `react-i18next` e `i18next` para suportar múltiplos idiomas.

## Estrutura

```
src/i18n/
├── index.ts              # Configuração principal do i18next
├── hooks/
│   └── useTranslation.ts # Hook personalizado para traduções
├── types.ts              # Tipos TypeScript para traduções
├── locales/
│   ├── pt-BR.json        # Traduções em português brasileiro
│   └── en-US.json        # Traduções em inglês americano
└── README.md             # Esta documentação
```

## Como usar

### 1. Importar o hook

```tsx
import { useTranslation } from '../i18n/hooks/useTranslation'
```

### 2. Usar em componentes

```tsx
export function MyComponent() {
  const { t, changeLanguage, currentLanguage } = useTranslation()
  
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <p>{t('landing.heroDescription')}</p>
      <button onClick={() => changeLanguage('en-US')}>
        Switch to English
      </button>
    </div>
  )
}
```

### 3. Adicionar novas traduções

1. Adicione as chaves no arquivo `types.ts`
2. Adicione as traduções em `locales/pt-BR.json`
3. Adicione as traduções em `locales/en-US.json`

### 4. Usar o seletor de idioma

```tsx
import { LanguageSelector } from '../ui/LanguageSelector'

export function Header() {
  return (
    <header>
      <LanguageSelector />
    </header>
  )
}
```

## Chaves de tradução organizadas

### common
Elementos comuns da interface: botões, labels, mensagens de erro, etc.

### landing
Conteúdo da página inicial/landing page.

### auth
Formulários e mensagens relacionadas à autenticação.

### dashboard
Conteúdo do painel principal.

### missions
Conteúdo relacionado às missões.

### events
Conteúdo relacionado aos eventos.

### ranking
Conteúdo relacionado ao ranking.

### profile
Conteúdo relacionado ao perfil do usuário.

### admin
Conteúdo administrativo.

### notifications
Mensagens de notificação e feedback.

## Idiomas suportados

- **pt-BR**: Português brasileiro (padrão)
- **en-US**: Inglês americano

## Funcionalidades

- ✅ Detecção automática do idioma do navegador
- ✅ Persistência da escolha do usuário no localStorage
- ✅ Fallback para português quando tradução não encontrada
- ✅ Tipagem TypeScript completa
- ✅ Hook personalizado para facilitar o uso
- ✅ Componente de seleção de idioma
- ✅ Suporte a interpolação de variáveis

## Exemplo de interpolação

```tsx
// No arquivo de tradução
{
  "welcome": "Olá, {{name}}!"
}

// No componente
const { t } = useTranslation()
const message = t('welcome', { name: 'João' })
// Resultado: "Olá, João!"
```
