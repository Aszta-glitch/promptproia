const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LeadSearchParams {
  city: string;
  state?: string;
  country?: string;
  niche: string;
}

interface Lead {
  name: string;
  segment: string;
  location: string;
  instagram?: string;
  website?: string;
  googleMaps?: string;
  phone?: string;
  whatsapp?: string;
  commercialObservation: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { city, state, country, niche } = await req.json() as LeadSearchParams;

    if (!city || !niche) {
      return new Response(
        JSON.stringify({ success: false, error: 'Cidade e nicho são obrigatórios' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const locationParts = [city];
    if (state) locationParts.push(state);
    if (country) locationParts.push(country);
    const fullLocation = locationParts.join(', ');

    const systemPrompt = `Você é um especialista em prospecção de leads B2B e pesquisa de mercado.
Sua tarefa é gerar uma lista realista de empresas/estabelecimentos que existiriam em uma determinada região e nicho.

IMPORTANTE: Gere informações que pareçam reais e úteis para prospecção comercial. 
Inclua observações comerciais relevantes sobre a presença digital de cada empresa.

Retorne EXATAMENTE um JSON válido no seguinte formato, sem texto adicional:
{
  "leads": [
    {
      "name": "Nome da Empresa",
      "segment": "Segmento específico",
      "location": "Endereço ou região",
      "instagram": "@usuario ou null",
      "website": "url ou null",
      "googleMaps": "link do Google Maps ou null",
      "phone": "telefone ou null",
      "whatsapp": "número WhatsApp ou null",
      "commercialObservation": "Observação comercial relevante"
    }
  ]
}`;

    const userPrompt = `Gere uma lista de 8 a 12 empresas/estabelecimentos do nicho "${niche}" localizadas em "${fullLocation}".

Inclua empresas de TODOS os portes: microempresas, pequeno porte, médio porte e grande porte.

Para cada empresa, forneça:
- Nome realista e criativo
- Segmento específico dentro do nicho
- Localização aproximada (bairro/região da cidade)
- Redes sociais (Instagram quando aplicável)
- Website (se provável que tenha)
- Informações de contato
- Uma observação comercial útil para vendedores de serviços digitais (ex: "não possui site próprio", "Instagram desatualizado há 6 meses", "boa presença no Google mas sem site", "potencial cliente para automação", "precisa de presença digital", etc.)

Foque em empresas que seriam bons leads para vendas de:
- Criação de sites
- Marketing digital
- Gestão de redes sociais
- Automações e SaaS

Retorne APENAS o JSON, sem explicações.`;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Configuração do servidor incompleta.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Generating leads for:', { fullLocation, niche });

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ success: false, error: 'Limite de requisições atingido. Tente novamente em alguns minutos.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ success: false, error: 'Erro ao gerar leads. Tente novamente.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error('No content in response');
      return new Response(
        JSON.stringify({ success: false, error: 'Resposta vazia do modelo.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse the JSON response
    let leads: Lead[] = [];
    try {
      // Clean up the response - remove markdown code blocks if present
      let cleanContent = content.trim();
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.slice(7);
      } else if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.slice(3);
      }
      if (cleanContent.endsWith('```')) {
        cleanContent = cleanContent.slice(0, -3);
      }
      cleanContent = cleanContent.trim();

      const parsed = JSON.parse(cleanContent);
      leads = parsed.leads || [];
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError, 'Content:', content);
      return new Response(
        JSON.stringify({ success: false, error: 'Erro ao processar resposta. Tente novamente.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Successfully generated', leads.length, 'leads');

    return new Response(
      JSON.stringify({ 
        success: true, 
        leads,
        searchParams: { city, state, country, niche }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in find-leads function:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Erro interno do servidor.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
