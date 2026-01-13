import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { 
  Search, 
  Loader2, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  ArrowLeft,
  Users
} from 'lucide-react';

interface Lead {
  nome: string;
  segmento: string;
  localizacao: string;
  telefone?: string;
  email?: string;
  site?: string;
  instagram?: string;
  observacao_comercial?: string;
}

const nicheOptions = [
  'Restaurantes',
  'Salões de Beleza',
  'Academias',
  'Clínicas Médicas',
  'Escritórios de Advocacia',
  'Imobiliárias',
  'Lojas de Roupas',
  'Oficinas Mecânicas',
  'Pet Shops',
  'Farmácias',
  'Escolas e Cursos',
  'Contabilidade',
  'Marketing Digital',
  'Consultórios Odontológicos',
  'Hotéis e Pousadas',
];

export default function Leads() {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('Brasil');
  const [niche, setNiche] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);

  const handleSearch = async () => {
    if (!city.trim() || !state.trim() || !niche.trim()) {
      toast.error('Preencha cidade, estado e nicho para buscar');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('find-leads', {
        body: {
          city: city.trim(),
          state: state.trim(),
          country: country.trim(),
          niche: niche.trim(),
        },
      });

      if (error) throw error;

      if (data?.leads && Array.isArray(data.leads)) {
        setLeads(data.leads);
        if (data.leads.length === 0) {
          toast.info('Nenhum lead encontrado para os critérios selecionados');
        } else {
          toast.success(`${data.leads.length} leads encontrados!`);
        }
      } else {
        setLeads([]);
        toast.info('Nenhum lead encontrado');
      }
    } catch (error: any) {
      console.error('Erro ao buscar leads:', error);
      toast.error('Erro ao buscar leads. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const getObservationColor = (observation: string) => {
    const lowerObs = observation.toLowerCase();
    if (lowerObs.includes('não possui') || lowerObs.includes('sem site') || lowerObs.includes('sem presença')) {
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
    if (lowerObs.includes('potencial') || lowerObs.includes('oportunidade')) {
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    }
    return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h1 className="font-semibold">Encontrar Clientes</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Search Section */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Buscar Leads
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Encontre potenciais clientes por localização e nicho de mercado
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  placeholder="Ex: São Paulo"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Input
                  id="state"
                  placeholder="Ex: SP"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">País</Label>
                <Input
                  id="country"
                  placeholder="Ex: Brasil"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="niche">Nicho de Mercado</Label>
                <Input
                  id="niche"
                  list="niche-options"
                  placeholder="Ex: Restaurantes"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                />
                <datalist id="niche-options">
                  {nicheOptions.map((option) => (
                    <option key={option} value={option} />
                  ))}
                </datalist>
              </div>
            </div>

            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="w-full md:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Buscar Leads
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {leads.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Resultados ({leads.length} leads encontrados)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {leads.map((lead, index) => (
                <Card key={index} className="bg-card/50 border-border/50 hover:border-primary/30 transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      {lead.nome}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{lead.segmento}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {lead.localizacao}
                    </div>

                    {lead.telefone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a 
                          href={`tel:${lead.telefone}`}
                          className="text-primary hover:underline"
                        >
                          {lead.telefone}
                        </a>
                      </div>
                    )}

                    {lead.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a 
                          href={`mailto:${lead.email}`}
                          className="text-primary hover:underline truncate"
                        >
                          {lead.email}
                        </a>
                      </div>
                    )}

                    {lead.site && (
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <a 
                          href={lead.site.startsWith('http') ? lead.site : `https://${lead.site}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline truncate"
                        >
                          {lead.site}
                        </a>
                      </div>
                    )}

                    {lead.observacao_comercial && (
                      <div className={`mt-3 p-2 rounded-lg border text-xs ${getObservationColor(lead.observacao_comercial)}`}>
                        💡 {lead.observacao_comercial}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {leads.length === 0 && !isLoading && (
          <div className="text-center py-12 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Faça uma busca para encontrar potenciais clientes</p>
          </div>
        )}
      </div>
    </div>
  );
}
