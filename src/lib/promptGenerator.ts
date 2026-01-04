import { ProjectType, ComplexityLevel, VisualStyle, AIPlatform } from '@/store/wizardStore';

const projectTypeLabels: Record<ProjectType, string> = {
  crud: 'CRUD/Admin Panel',
  dashboard: 'Dashboard Analytics',
  saas: 'SaaS/Aplicação Web',
  landing: 'Landing Page',
  tool: 'Ferramenta/Utilitário',
  mobile: 'App Mobile/PWA',
  ecommerce: 'E-commerce/Loja',
  portfolio: 'Portfólio/Blog',
  chatbot: 'Chatbot/IA',
};

const complexityLabels: Record<ComplexityLevel, string> = {
  mvp: 'MVP (Mínimo Viável)',
  intermediate: 'Intermediário',
  advanced: 'Avançado',
};

const visualStyleLabels: Record<VisualStyle, string> = {
  minimalist: 'Minimalista',
  modern: 'Moderno',
  bold: 'Ousado/Impactante',
};

const platformLabels: Record<AIPlatform, string> = {
  lovable: 'Lovable',
  cursor: 'Cursor',
  bolt: 'Bolt.new',
  v0: 'v0 (Vercel)',
  replit: 'Replit',
  chatgpt: 'ChatGPT',
  claude: 'Claude',
  copilot: 'GitHub Copilot',
  other: 'Outra IA',
};

export const getProjectFeatures = (type: ProjectType, complexity: ComplexityLevel): string[] => {
  const baseFeatures: Record<ProjectType, string[]> = {
    crud: [
      'Listagem de dados com paginação',
      'Formulários de criação/edição',
      'Filtros e busca',
      'Confirmação de exclusão',
    ],
    dashboard: [
      'Cards de métricas principais',
      'Gráficos interativos',
      'Filtros por período',
      'Exportação de dados',
    ],
    saas: [
      'Sistema de autenticação',
      'Dashboard do usuário',
      'Área de configurações',
      'Gestão de perfil',
    ],
    landing: [
      'Hero section impactante',
      'Seção de benefícios',
      'Depoimentos/Social proof',
      'Call-to-action clara',
    ],
    tool: [
      'Interface principal da ferramenta',
      'Área de input/configuração',
      'Visualização de resultados',
      'Opção de exportar/salvar',
    ],
    mobile: [
      'Interface touch-friendly',
      'Navegação por gestos/tabs',
      'Notificações push',
      'Funcionamento offline',
    ],
    ecommerce: [
      'Catálogo de produtos',
      'Carrinho de compras',
      'Sistema de checkout',
      'Gestão de pedidos',
    ],
    portfolio: [
      'Galeria de trabalhos',
      'Página sobre/bio',
      'Formulário de contato',
      'Links para redes sociais',
    ],
    chatbot: [
      'Interface de chat',
      'Respostas inteligentes',
      'Histórico de conversas',
      'Indicador de digitação',
    ],
  };

  const advancedFeatures: Record<ProjectType, string[]> = {
    crud: [
      'Bulk actions',
      'Import/Export CSV',
      'Histórico de alterações',
      'Permissões por usuário',
    ],
    dashboard: [
      'Dashboards customizáveis',
      'Alertas configuráveis',
      'Comparativos de período',
      'Drill-down de dados',
    ],
    saas: [
      'Sistema de billing/assinatura',
      'Multi-tenancy',
      'Notificações em tempo real',
      'API pública documentada',
    ],
    landing: [
      'A/B testing ready',
      'Formulários integrados',
      'Chat widget',
      'Analytics integrado',
    ],
    tool: [
      'Histórico de uso',
      'Presets salvos',
      'Colaboração em tempo real',
      'Integrações externas',
    ],
    mobile: [
      'Sincronização em background',
      'Biometria/autenticação',
      'Cache inteligente',
      'Deep linking',
    ],
    ecommerce: [
      'Sistema de avaliações',
      'Cupons/descontos',
      'Lista de desejos',
      'Recomendações inteligentes',
    ],
    portfolio: [
      'Blog integrado',
      'Área de depoimentos',
      'Download de CV',
      'Animações interativas',
    ],
    chatbot: [
      'Integração com IA',
      'Contexto de conversa',
      'Ações automáticas',
      'Análise de sentimento',
    ],
  };

  if (complexity === 'mvp') {
    return baseFeatures[type].slice(0, 3);
  } else if (complexity === 'intermediate') {
    return baseFeatures[type];
  } else {
    return [...baseFeatures[type], ...advancedFeatures[type].slice(0, 2)];
  }
};

export const getVisualInstructions = (style: VisualStyle): string => {
  const instructions: Record<VisualStyle, string> = {
    minimalist: `
- Paleta de cores limitada (máx. 3 cores)
- Muito espaço em branco
- Tipografia clean e legível
- Elementos UI discretos
- Foco na funcionalidade`,
    modern: `
- Gradientes sutis e modernos
- Sombras suaves (soft shadows)
- Bordas arredondadas (border-radius: 1rem+)
- Animações fluidas de transição
- Glassmorphism quando apropriado`,
    bold: `
- Cores vibrantes e contrastantes
- Tipografia expressiva e grande
- Elementos gráficos marcantes
- Animações impactantes
- Layout assimétrico quando possível`,
  };

  return instructions[style];
};

const formatContextDetails = (contextAnswers: Record<string, string>): string => {
  return Object.entries(contextAnswers)
    .filter(([, value]) => value?.trim())
    .map(([key, value]) => {
      const labels: Record<string, string> = {
        dataFields: 'Dados a cadastrar',
        productInfo: 'Informações de produtos',
        scheduling: 'Sistema de agendamento',
        metrics: 'Métricas importantes',
        userJourney: 'Jornada do usuário',
        payment: 'Modelo de pagamento',
        content: 'Tipos de conteúdo',
        notifications: 'Notificações',
        integrations: 'Integrações',
        processing: 'Fluxo de processamento',
        coreFeature: 'Funcionalidade central',
        conversion: 'Ação principal',
        dataSource: 'Fonte de dados',
        mainFeatures: 'Funcionalidades principais',
        differentiator: 'Diferencial',
      };
      return `- **${labels[key] || key}:** ${value}`;
    })
    .join('\n');
};

interface PromptConfig {
  projectType: ProjectType;
  objective: string;
  contextAnswers: Record<string, string>;
  targetAudience: string;
  complexity: ComplexityLevel;
  visualStyle: VisualStyle;
  referenceImages: string[];
}

// Platform-specific prompt generators
const generators: Record<AIPlatform, (config: PromptConfig) => string> = {
  lovable: generateLovablePrompt,
  cursor: generateCursorPrompt,
  bolt: generateBoltPrompt,
  v0: generateV0Prompt,
  replit: generateReplitPrompt,
  chatgpt: generateChatGPTPrompt,
  claude: generateClaudePrompt,
  copilot: generateCopilotPrompt,
  other: generateGenericPrompt,
};

function generateLovablePrompt(config: PromptConfig): string {
  const { projectType, objective, contextAnswers, targetAudience, complexity, visualStyle, referenceImages } = config;
  const features = getProjectFeatures(projectType, complexity);
  const visualInstructions = getVisualInstructions(visualStyle);
  const contextDetails = formatContextDetails(contextAnswers);

  const referenceSection = referenceImages.length > 0 
    ? `\n---\n\n## 🖼️ REFERÊNCIAS VISUAIS\n\n**IMPORTANTE:** ${referenceImages.length} imagem(ns) de referência anexadas.\nUse como inspiração para cores, layout, componentes e estilo geral.\n` : '';

  return `# Prompt Otimizado para Lovable

## 🎯 CONTEXTO

**Tipo de Projeto:** ${projectTypeLabels[projectType]}
**Objetivo Principal:** ${objective}
**Público-Alvo:** ${targetAudience}
**Complexidade:** ${complexityLabels[complexity]}
**Estilo Visual:** ${visualStyleLabels[visualStyle]}

${contextDetails ? `### Detalhes:\n${contextDetails}` : ''}
${referenceSection}
---

## 📋 FUNCIONALIDADES

${features.map((f, i) => `${i + 1}. ${f}`).join('\n')}

---

## 🎨 ESTILO VISUAL
${visualInstructions}

### UI/UX:
- Interface responsiva (mobile-first)
- Feedback visual para ações
- Estados de loading e erro
- Navegação clara

---

## ⚡ STACK

- React + TypeScript
- Tailwind CSS
- Shadcn/UI
- Framer Motion
${complexity !== 'mvp' ? '- Supabase (backend)' : ''}

---

## 🛡️ NÃO FAÇA

❌ Cores genéricas
❌ Formulários longos sem etapas
❌ Ignorar loading/erro
❌ Lorem ipsum

---

*Prompt para Lovable*`;
}

function generateCursorPrompt(config: PromptConfig): string {
  const { projectType, objective, contextAnswers, targetAudience, complexity, visualStyle, referenceImages } = config;
  const features = getProjectFeatures(projectType, complexity);
  const contextDetails = formatContextDetails(contextAnswers);

  return `# Task: Create ${projectTypeLabels[projectType]}

## Context
- **Goal:** ${objective}
- **Target Users:** ${targetAudience}
- **Complexity:** ${complexityLabels[complexity]}
- **Style:** ${visualStyleLabels[visualStyle]}

${contextDetails ? `## Details\n${contextDetails}` : ''}

${referenceImages.length > 0 ? `## Visual References\n${referenceImages.length} reference image(s) attached. Match their style.\n` : ''}

## Requirements

### Features
${features.map((f, i) => `${i + 1}. ${f}`).join('\n')}

### Tech Stack
- React 18+ with TypeScript
- Tailwind CSS for styling
- Proper component architecture
- Type-safe code throughout

### Code Quality
- Follow React best practices
- Use custom hooks for logic
- Implement proper error handling
- Add TypeScript interfaces
- Write clean, maintainable code

### Structure
\`\`\`
src/
├── components/     # UI components
├── hooks/          # Custom hooks
├── lib/            # Utilities
├── types/          # TypeScript types
└── pages/          # Page components
\`\`\`

## Instructions
1. Start with core components
2. Add business logic
3. Implement styling
4. Add error handling
5. Refactor for quality

---
*Cursor Prompt*`;
}

function generateBoltPrompt(config: PromptConfig): string {
  const { projectType, objective, contextAnswers, targetAudience, complexity, visualStyle, referenceImages } = config;
  const features = getProjectFeatures(projectType, complexity);
  const contextDetails = formatContextDetails(contextAnswers);
  const visualInstructions = getVisualInstructions(visualStyle);

  return `Create a ${projectTypeLabels[projectType].toLowerCase()}

## What I need:
${objective}

## Target audience:
${targetAudience}

${contextDetails ? `## Specifics:\n${contextDetails}` : ''}

${referenceImages.length > 0 ? `## Design reference:\n${referenceImages.length} image(s) attached - match this style\n` : ''}

## Features to include:
${features.map(f => `• ${f}`).join('\n')}

## Visual style: ${visualStyleLabels[visualStyle]}
${visualInstructions}

## Tech requirements:
- React + TypeScript
- Tailwind CSS
- Modern, clean code
- Mobile responsive
- Proper error states

## Important:
- Keep it simple and functional
- Use placeholder data that makes sense
- Add smooth animations
- Make it production-ready

---
*Bolt.new Prompt*`;
}

function generateV0Prompt(config: PromptConfig): string {
  const { projectType, objective, targetAudience, complexity, visualStyle, referenceImages } = config;
  const features = getProjectFeatures(projectType, complexity);
  const visualInstructions = getVisualInstructions(visualStyle);

  return `Create a ${projectTypeLabels[projectType].toLowerCase()} component

${objective}

For: ${targetAudience}

${referenceImages.length > 0 ? `Match the style of the ${referenceImages.length} attached reference image(s).\n` : ''}

## Components needed:
${features.map(f => `- ${f}`).join('\n')}

## Style: ${visualStyleLabels[visualStyle]}
${visualInstructions}

## Requirements:
- Use shadcn/ui components
- Tailwind CSS styling
- TypeScript
- Responsive design
- Dark mode support
- Accessible (ARIA)

## Output:
Single file with all components, properly typed and styled.

---
*v0 Prompt*`;
}

function generateReplitPrompt(config: PromptConfig): string {
  const { projectType, objective, contextAnswers, targetAudience, complexity, visualStyle, referenceImages } = config;
  const features = getProjectFeatures(projectType, complexity);
  const contextDetails = formatContextDetails(contextAnswers);

  return `# Build: ${projectTypeLabels[projectType]}

## Goal
${objective}

## Users
${targetAudience}

${contextDetails ? `## Details\n${contextDetails}` : ''}

${referenceImages.length > 0 ? `## Reference\n${referenceImages.length} design reference(s) attached\n` : ''}

## Features
${features.map((f, i) => `${i + 1}. ${f}`).join('\n')}

## Style
${visualStyleLabels[visualStyle]}

## Stack
- React + Vite
- TypeScript
- Tailwind CSS
- File-based routing

## Structure
Create proper folder structure with:
- /src/components
- /src/pages
- /src/hooks
- /src/lib

## Notes
- Use environment variables for secrets
- Add proper error handling
- Make it mobile-friendly
- Include loading states

---
*Replit Prompt*`;
}

function generateChatGPTPrompt(config: PromptConfig): string {
  const { projectType, objective, contextAnswers, targetAudience, complexity, visualStyle, referenceImages } = config;
  const features = getProjectFeatures(projectType, complexity);
  const contextDetails = formatContextDetails(contextAnswers);
  const visualInstructions = getVisualInstructions(visualStyle);

  return `Você é um desenvolvedor frontend sênior especializado em React e TypeScript.

Preciso que você me ajude a criar um ${projectTypeLabels[projectType].toLowerCase()}.

## Contexto do Projeto

**Objetivo:** ${objective}
**Público-alvo:** ${targetAudience}
**Nível de complexidade:** ${complexityLabels[complexity]}

${contextDetails ? `## Detalhes Específicos\n${contextDetails}` : ''}

${referenceImages.length > 0 ? `## Referências Visuais\nAnexei ${referenceImages.length} imagem(ns) de referência. Use como inspiração para o design.\n` : ''}

## Funcionalidades Necessárias

${features.map((f, i) => `${i + 1}. ${f}`).join('\n')}

## Estilo Visual Desejado: ${visualStyleLabels[visualStyle]}
${visualInstructions}

## Stack Técnica

- React 18 com TypeScript
- Tailwind CSS para estilização
- Componentes funcionais com hooks
- Design responsivo

## O que preciso de você:

1. **Estrutura do projeto** - Como organizar os arquivos
2. **Componentes principais** - Código completo e comentado
3. **Lógica de negócio** - Hooks customizados se necessário
4. **Estilização** - Classes Tailwind bem organizadas

Por favor, forneça código limpo, bem organizado e pronto para produção.

---
*ChatGPT Prompt*`;
}

function generateClaudePrompt(config: PromptConfig): string {
  const { projectType, objective, contextAnswers, targetAudience, complexity, visualStyle, referenceImages } = config;
  const features = getProjectFeatures(projectType, complexity);
  const contextDetails = formatContextDetails(contextAnswers);
  const visualInstructions = getVisualInstructions(visualStyle);

  return `<context>
Você é um engenheiro de software sênior com expertise em React, TypeScript e design de sistemas.
</context>

<task>
Criar um ${projectTypeLabels[projectType].toLowerCase()} completo e funcional.
</task>

<requirements>
## Objetivo Principal
${objective}

## Público-Alvo
${targetAudience}

## Nível de Complexidade
${complexityLabels[complexity]}

${contextDetails ? `## Contexto Adicional\n${contextDetails}` : ''}

${referenceImages.length > 0 ? `## Referências Visuais\n${referenceImages.length} imagem(ns) anexada(s) como referência de design. Analise e extraia:\n- Paleta de cores\n- Tipografia\n- Layout e espaçamento\n- Estilo de componentes\n` : ''}

## Funcionalidades Requeridas
${features.map((f, i) => `${i + 1}. ${f}`).join('\n')}

## Diretrizes de Estilo: ${visualStyleLabels[visualStyle]}
${visualInstructions}
</requirements>

<technical-stack>
- React 18+ com TypeScript estrito
- Tailwind CSS para estilização
- Arquitetura de componentes limpa
- Custom hooks para lógica reutilizável
- Tratamento de erros robusto
- Acessibilidade (WCAG 2.1)
</technical-stack>

<output-format>
Forneça:
1. Estrutura de pastas recomendada
2. Tipos/interfaces TypeScript
3. Componentes com código completo
4. Hooks customizados se necessário
5. Instruções de implementação

Use blocos de código com syntax highlighting e comentários explicativos.
</output-format>

<constraints>
- Código limpo e manutenível
- Sem dependências desnecessárias
- Performance otimizada
- Mobile-first responsive
</constraints>

---
*Claude Prompt*`;
}


function generateCopilotPrompt(config: PromptConfig): string {
  const { projectType, objective, complexity, visualStyle, referenceImages } = config;
  const features = getProjectFeatures(projectType, complexity);

  return `// ${projectTypeLabels[projectType]} - ${objective}
// Style: ${visualStyleLabels[visualStyle]}
// Complexity: ${complexityLabels[complexity]}
${referenceImages.length > 0 ? `// Reference: ${referenceImages.length} design image(s) attached` : ''}

// Features to implement:
${features.map(f => `// - ${f}`).join('\n')}

// Tech: React, TypeScript, Tailwind CSS
// Requirements:
// - Functional components with hooks
// - Type-safe props and state
// - Responsive design
// - Clean code structure

// Start implementing below:

import React from 'react';

interface Props {
  // Add your props here
}

export const Component: React.FC<Props> = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Implement your component */}
    </div>
  );
};

---
*GitHub Copilot Prompt*`;
}

function generateGenericPrompt(config: PromptConfig): string {
  const { projectType, objective, contextAnswers, targetAudience, complexity, visualStyle, referenceImages } = config;
  const features = getProjectFeatures(projectType, complexity);
  const contextDetails = formatContextDetails(contextAnswers);
  const visualInstructions = getVisualInstructions(visualStyle);

  return `# Prompt para Desenvolvimento

## Contexto do Projeto

**Tipo:** ${projectTypeLabels[projectType]}
**Objetivo:** ${objective}
**Público-alvo:** ${targetAudience}
**Complexidade:** ${complexityLabels[complexity]}
**Estilo Visual:** ${visualStyleLabels[visualStyle]}

${contextDetails ? `## Detalhes\n${contextDetails}` : ''}

${referenceImages.length > 0 ? `## Referências Visuais\n${referenceImages.length} imagem(ns) de referência anexada(s). Use como inspiração.\n` : ''}

## Funcionalidades

${features.map((f, i) => `${i + 1}. ${f}`).join('\n')}

## Diretrizes de Design
${visualInstructions}

## Stack Tecnológica

- React 18+ com TypeScript
- Tailwind CSS
- Componentes modernos
- Design responsivo

## Requisitos

- Código limpo e organizado
- Tratamento de erros
- Estados de loading
- Interface intuitiva

---
*Prompt Genérico*`;
}

export const generatePrompt = (
  aiPlatform: AIPlatform,
  projectType: ProjectType,
  objective: string,
  contextAnswers: Record<string, string>,
  targetAudience: string,
  complexity: ComplexityLevel,
  visualStyle: VisualStyle,
  referenceImages: string[] = []
): string => {
  const config: PromptConfig = {
    projectType,
    objective,
    contextAnswers,
    targetAudience,
    complexity,
    visualStyle,
    referenceImages,
  };

  return generators[aiPlatform](config);
};

export { platformLabels, projectTypeLabels, complexityLabels, visualStyleLabels };
