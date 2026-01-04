import { ProjectType, ComplexityLevel, VisualStyle } from '@/store/wizardStore';

const projectTypeLabels: Record<ProjectType, string> = {
  crud: 'CRUD/Admin Panel',
  dashboard: 'Dashboard Analytics',
  saas: 'SaaS/Aplicação Web',
  landing: 'Landing Page',
  tool: 'Ferramenta/Utilitário',
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

const getProjectFeatures = (type: ProjectType, complexity: ComplexityLevel): string[] => {
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
  };

  if (complexity === 'mvp') {
    return baseFeatures[type].slice(0, 3);
  } else if (complexity === 'intermediate') {
    return baseFeatures[type];
  } else {
    return [...baseFeatures[type], ...advancedFeatures[type].slice(0, 2)];
  }
};

const getVisualInstructions = (style: VisualStyle): string => {
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

export const generatePrompt = (
  projectType: ProjectType,
  objective: string,
  contextAnswers: Record<string, string>,
  targetAudience: string,
  complexity: ComplexityLevel,
  visualStyle: VisualStyle,
  referenceImages: string[] = []
): string => {
  const features = getProjectFeatures(projectType, complexity);
  const visualInstructions = getVisualInstructions(visualStyle);

  // Formata as respostas contextuais
  const contextDetails = Object.entries(contextAnswers)
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

  const referenceSection = referenceImages.length > 0 
    ? `
---

## 🖼️ REFERÊNCIAS VISUAIS

**IMPORTANTE:** ${referenceImages.length} imagem(ns) de referência foram anexadas a este prompt.
Use estas imagens como inspiração visual para:
- Paleta de cores
- Layout e composição
- Estilo de componentes
- Tipografia e espaçamentos
- Tom geral do design

Analise cada imagem de referência e extraia os elementos visuais mais relevantes para incorporar no projeto.
` : '';

  const prompt = `# Prompt Otimizado para Lovable

## 🎯 CONTEXTO (C.L.E.A.R. Framework)

**Tipo de Projeto:** ${projectTypeLabels[projectType]}
**Objetivo Principal:** ${objective}
**Público-Alvo:** ${targetAudience}
**Nível de Complexidade:** ${complexityLabels[complexity]}
**Estilo Visual:** ${visualStyleLabels[visualStyle]}

${contextDetails ? `### Detalhes Específicos:
${contextDetails}` : ''}
${referenceSection}
---

## 📋 LAYOUT & ESTRUTURA

Crie um ${projectTypeLabels[projectType].toLowerCase()} com as seguintes características:

### Funcionalidades Principais (Etapa 1):
${features.slice(0, Math.min(4, features.length)).map((f, i) => `${i + 1}. ${f}`).join('\n')}

${features.length > 4 ? `### Funcionalidades Adicionais (Etapa 2):
${features.slice(4).map((f, i) => `${i + 1}. ${f}`).join('\n')}` : ''}

---

## 🎨 ESTILO VISUAL

${visualInstructions}

### Requisitos de UI/UX:
- Interface intuitiva e acessível
- Design responsivo (mobile-first)
- Feedback visual para todas as ações
- Estados de loading e erro
- Navegação clara e consistente

---

## ⚡ ESPECIFICAÇÕES TÉCNICAS

### Stack Recomendada:
- React + TypeScript
- Tailwind CSS para estilização
- Shadcn/UI para componentes base
- Framer Motion para animações
${complexity !== 'mvp' ? '- Supabase para backend (se necessário)' : ''}

### Comportamentos Esperados:
- Validação de formulários em tempo real
- Tratamento de erros com mensagens amigáveis
- Persistência de dados (localStorage ou backend)
- Transições suaves entre estados

---

## 🛡️ GUARDRAILS (NÃO FAÇA)

❌ NÃO use cores genéricas ou sem identidade
❌ NÃO crie formulários longos sem divisão em etapas
❌ NÃO ignore estados de erro e loading
❌ NÃO use componentes sem acessibilidade
❌ NÃO deixe a navegação confusa
❌ NÃO implemente mais de 4 funcionalidades por etapa
❌ NÃO use placeholder content ("Lorem ipsum")

---

## ✅ VALIDAÇÕES

Antes de finalizar, verifique:
- [ ] Todas as funcionalidades listadas estão implementadas
- [ ] O design segue o estilo visual definido
- [ ] A interface é responsiva
- [ ] Os estados de loading/erro estão tratados
- [ ] A navegação é intuitiva
- [ ] O código está organizado e comentado

---

## 📝 INSTRUÇÕES DE IMPLEMENTAÇÃO

1. **Comece pelo Design System**: Defina cores, tipografia e componentes base
2. **Estruture o Layout**: Crie a navegação e estrutura de páginas
3. **Implemente as Features**: Uma por uma, testando cada uma
4. **Refine a UX**: Adicione animações, feedback e polish
5. **Teste e Otimize**: Verifique responsividade e performance

---

*Prompt gerado por Prompt Mestre Lovable • Framework C.L.E.A.R.*
`;

  return prompt;
};
