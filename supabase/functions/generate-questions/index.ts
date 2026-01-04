import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { objective, projectType } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const projectTypeLabels: Record<string, string> = {
      crud: 'CRUD/Admin Panel',
      dashboard: 'Dashboard Analytics',
      saas: 'SaaS/Aplicação Web',
      landing: 'Landing Page',
      tool: 'Ferramenta/Utilitário',
    };

    const systemPrompt = `Você é um especialista em desenvolvimento de software e UX. 
Sua tarefa é gerar perguntas contextuais relevantes para ajudar a definir melhor um projeto.

Regras:
- Gere exatamente 3-5 perguntas específicas baseadas no objetivo do usuário
- As perguntas devem ajudar a clarificar requisitos técnicos e funcionais
- Cada pergunta deve ter um ID único (snake_case) e um placeholder de exemplo
- Responda APENAS com JSON válido, sem markdown ou texto adicional`;

    const userPrompt = `Tipo de projeto: ${projectTypeLabels[projectType] || projectType}
Objetivo principal: ${objective}

Gere perguntas contextuais para entender melhor este projeto. Responda com um JSON no formato:
{
  "questions": [
    {
      "id": "exemplo_id",
      "question": "Pergunta aqui?",
      "placeholder": "Ex: resposta exemplo"
    }
  ]
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    // Parse the JSON response
    let questions;
    try {
      // Remove markdown code blocks if present
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      questions = JSON.parse(cleanContent);
    } catch (e) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse AI response");
    }

    return new Response(JSON.stringify(questions), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
