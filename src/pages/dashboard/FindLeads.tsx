import { useState } from 'react';
import { Search, MapPin, Building2, Instagram, Globe, Phone, MessageCircle, AlertCircle, Loader2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

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

const nicheSuggestions = [
  'Restaurantes e Bares',
  'Clínicas Médicas',
  'Clínicas Odontológicas',
  'Academias e Fitness',
  'Salões de Beleza',
  'Imobiliárias',
  'Lojas de Roupas',
  'Pet Shops',
  'Escritórios de Advocacia',
  'Escritórios de Contabilidade',
  'Oficinas Mecânicas',
  'Escolas e Cursos',
  'Hotéis e Pousadas',
  'Construtoras',
  'Agências de Viagem',
];

const businessTypeOptions = [
  { value: 'micro', label: 'Microempresa' },
  { value: 'pequeno', label: 'Pequeno porte' },
  { value: 'medio', label: 'Médio porte' },
  { value: 'local', label: 'Negócio local' },
];

export default function FindLeads() {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('Brasil');
  const [niche, setNiche] = useState('');
  const [businessType, setBusinessType] = useState('pequeno');
  const [isLoading, setIsLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!city.trim()) {
      toast.error('Por favor, informe a cidade');
      return;
    }
    if (!niche.trim()) {
      toast.error('Por favor, informe um nicho');
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const { data, error } = await supabase.functions.invoke('find-leads', {
        body: {
          city: city.trim(),
          state: state.trim() || undefined,
          country: country.trim() || 'Brasil',
          niche: niche.trim(),
          businessType: businessTypeOptions.find(b => b.value === businessType)?.label || businessType,
        },
      });

      if (error) {
        console.error('Error finding leads:', error);
        toast.error('Erro ao buscar leads. Tente novamente.');
        return;
      }

      if (data?.success && data.leads) {
        setLeads(data.leads);
        toast.success(`${data.leads.length} leads encontrados!`);
      } else {
        toast.error(data?.error || 'Erro ao buscar leads');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao buscar leads. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const getObservationColor = (observation: string) => {
    const lower = observation.toLowerCase();
    if (lower.includes('não possui') || lower.includes('sem site') || lower.includes('inativo') || lower.includes('desatualizado')) {
      return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    }
    if (lower.includes('potencial') || lower.includes('precisa') || lower.includes('oportunidade')) {
      return 'bg-green-500/20 text-green-300 border-green-500/30';
    }
    return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
          Encontrar Clientes Reais
        </h1>
        <p className="text-muted-foreground">
          Busque leads qualificados para vendas de serviços digitais, marketing e automações.
        </p>
      </div>

      {/* Search Form */}
      <Card className="relative overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5">
              <Search className="h-5 w-5 text-primary" />
            </div>
            Configurar Busca
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">Cidade *</Label>
              <Input
                id="city"
                placeholder="Ex: São Paulo"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                placeholder="Ex: SP"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">País</Label>
              <Input
                id="country"
                placeholder="Ex: Brasil"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessType">Tipo de Negócio</Label>
              <Select value={businessType} onValueChange={setBusinessType}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {businessTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="niche">Nicho *</Label>
            <Input
              id="niche"
              placeholder="Ex: Restaurantes, Clínicas, Academias..."
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="bg-background/50"
              list="niche-suggestions"
            />
            <datalist id="niche-suggestions">
              {nicheSuggestions.map((suggestion) => (
                <option key={suggestion} value={suggestion} />
              ))}
            </datalist>
          </div>

          <Button 
            onClick={handleSearch} 
            disabled={isLoading}
            className="w-full md:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Buscando leads...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Buscar Leads
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {hasSearched && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {leads.length > 0 ? `${leads.length} Leads Encontrados` : 'Nenhum lead encontrado'}
            </h2>
          </div>

          {leads.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {leads.map((lead, index) => (
                <Card 
                  key={index} 
                  className="relative overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-white/20 transition-all duration-300"
                >
                  <CardContent className="p-5 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate">{lead.name}</h3>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                          <Building2 className="h-3.5 w-3.5 flex-shrink-0" />
                          <span className="truncate">{lead.segment}</span>
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
                      <span>{lead.location}</span>
                    </div>

                    {/* Contact Links */}
                    <div className="flex flex-wrap gap-2">
                      {lead.instagram && (
                        <Badge variant="outline" className="bg-pink-500/10 border-pink-500/30 text-pink-300 gap-1.5">
                          <Instagram className="h-3 w-3" />
                          {lead.instagram}
                        </Badge>
                      )}
                      {lead.website && (
                        <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-300 gap-1.5 cursor-pointer hover:bg-blue-500/20">
                          <Globe className="h-3 w-3" />
                          Site
                          <ExternalLink className="h-2.5 w-2.5" />
                        </Badge>
                      )}
                      {lead.phone && (
                        <Badge variant="outline" className="bg-gray-500/10 border-gray-500/30 text-gray-300 gap-1.5">
                          <Phone className="h-3 w-3" />
                          {lead.phone}
                        </Badge>
                      )}
                      {lead.whatsapp && (
                        <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-300 gap-1.5">
                          <MessageCircle className="h-3 w-3" />
                          WhatsApp
                        </Badge>
                      )}
                    </div>

                    {/* Commercial Observation */}
                    <div className={`flex items-start gap-2 p-3 rounded-lg border ${getObservationColor(lead.commercialObservation)}`}>
                      <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{lead.commercialObservation}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02]">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">
                  Nenhum lead encontrado para os critérios selecionados.
                </p>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  Tente ajustar os filtros e buscar novamente.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
