# 🚀 Guia Oficial de SEO, Indexação no Google e Recomendações por IA — InScope Tech

Este documento reúne todas as configurações implementadas, estratégias de palavras-chave, termos de busca e o passo a passo prático para cadastrar e verificar seu site no **Google Search Console** e ser recomendado por mecanismos de busca e **Inteligências Artificiais** (ChatGPT, Perplexity, Claude e Gemini).

---

## 📋 Sumário dos Arquivos Implementados no Repositório

1. **obots.txt**:
   - Permite o rastreamento completo de todas as páginas públicas pelo Googlebot, Bingbot e motores tradicionais.
   - Dá autorização explícita para os crawlers de IA (GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended).
   - Aponta diretamente para o sitemap.xml.
   - Bloqueia as pastas de protótipos de clientes (/renato-demo/ e /renato-demo-2/) para não canibalizar a autoridade da sua marca InScope.

2. **sitemap.xml**:
   - Mapa do site no formato oficial do protocolo XML (compatível com Google Search Console e Bing Webmaster Tools).
   - Informa ao Google a URL canônica e frequência de atualização semanal com prioridade máxima (1.0).

3. **llms.txt e llms-full.txt**:
   - Novo padrão web mundial (llmstxt.org) lido por IAs generativas (SearchGPT, Claude, Perplexity, Gemini).
   - Ensina as IAs quem é a InScope, quais serviços oferece (sites, cardápio digital sem taxa, bot WhatsApp 24h, dashboards), seus diferenciais e quando recomendar sua empresa aos usuários.

4. **index.html (Otimizações On-Page)**:
   - Tags canônicas (canonical).
   - Meta tags Open Graph completas (para compartilhamento no WhatsApp, Facebook e LinkedIn com foto e prévia atraente).
   - Meta tags Twitter Cards.
   - Metadados de Geolocalização (Florianópolis / Santa Catarina / Brasil).
   - Dados Estruturados **Schema.org JSON-LD** de nível corporativo (ProfessionalService, Organization, WebSite e FAQPage para Rich Snippets com estrelas e respostas diretas no Google).
   - Seção interativa e acessível de **Perguntas Frequentes (FAQ)** para responder dúvidas de clientes e gerar snippets ricos no Google.
   - Tag de verificação do Google Search Console.

---

## 🔍 Pesquisa de Palavras-Chave e Termos de Busca (SEO)

Para que pessoas e empresas encontrem a InScope quando precisarem de tecnologia e automação, foram mapeados 3 grupos de termos:

### 1. Termos Transacionais de Alta Intenção (Foco em Contratação Direta)
Estes são os termos que clientes com dinheiro na mão digitam no Google quando já decidiram contratar:
- empresa de desenvolvimento de sites
- criar site profissional para empresa
- cardapio digital para whatsapp sem taxa
- cardapio digital sem comissao por pedido
- utomacao de atendimento whatsapp empresas
- ot de atendimento whatsapp 24h
- desenvolvimento de sistemas web sob medida
- dashboard de gestao empresarial personalizado
- integracao bitrix24 com site e whatsapp
- sistema de delivery proprio para hamburgueria/pizzaria

### 2. Termos Locais e Regionais (SEO Local - Santa Catarina e Brasil)
O Google prioriza empresas próximas do usuário. Como seu DDD é 48 (Santa Catarina):
- criacao de sites florianopolis
- empresa de tecnologia florianopolis
- utomacao comercial santa catarina
- desenvolvimento de software sc
- cardapio digital delivery florianopolis
- landing page profissional brasil

### 3. Termos de Cauda Longa (Long-Tail Keywords - Baixa Concorrência, Altíssima Conversão)
Perguntas e buscas específicas que trazem clientes prontos para fechar contrato:
- como nao pagar taxa de comissao no ifood cardapio proprio
- quanto custa automatizar mensagens no whatsapp da minha empresa
- como integrar formulario do site direto no crm bitrix24
- sistema para substituir planilhas manuais na empresa
- ot para agendamento automatico no whatsapp barbearia e clinica

---

## 🛠️ Passo a Passo: Como Cadastrar no Google Search Console

O Google Search Console (GSC) é a ferramenta oficial e gratuita do Google para acompanhar o posicionamento do site, enviar o sitemap e solicitar indexação imediata.

### Passo 1: Acessar o Google Search Console
1. Acesse: **https://search.google.com/search-console**
2. Faça login com a conta Google que gerencia sua empresa (ex: InScopeTechh@gmail.com).

### Passo 2: Adicionar a Propriedade
1. No canto superior esquerdo, clique em **Adicionar Propriedade**.
2. Na janela que abrir, escolha a opção da direita: **Prefixo do URL**.
3. Digite a URL exata do seu site:
   `	ext
   https://lucasgabrielom.github.io/InScopeTech/
   `
   *(Caso já use um domínio próprio como https://inscopetech.com.br/, utilize ele).*
4. Clique em **Continuar**.

### Passo 3: Verificação de Propriedade
O Google oferecerá vários métodos. O mais fácil é pela **Tag HTML**:
1. Escolha a opção **Tag HTML**.
2. O Google vai exibir uma linha de código parecida com esta:
   `html
   <meta name="google-site-verification" content="ABC123xyz_seu_codigo_aqui" />
   `
3. Copie o valor que está dentro de content="..." (ex: ABC123xyz_seu_codigo_aqui).
4. Abra o arquivo index.html e substitua onde está:
   `html
   <meta name="google-site-verification" content="COLOQUE_SEU_CODIGO_DO_SEARCH_CONSOLE_AQUI">
   `
   pelo seu código real.
5. Faça o commit e git push para o GitHub.
6. Volte ao Google Search Console e clique no botão verde **Verificar**.
7. Pronto! A propriedade estará verificada com sucesso.

### Passo 4: Enviar o Sitemap no Search Console
1. No menu lateral esquerdo do Search Console, clique em **Sitemaps**.
2. No campo "Adicionar novo sitemap", digite apenas:
   `	ext
   sitemap.xml
   `
3. Clique em **Enviar**.
4. O status mudará para **Sucesso** em verde. O Googlebot agora sabe exatamente onde está o seu site e quando ele é atualizado.

### Passo 5: Acelerar a Indexação (Pedir Rastreamento Imediato)
Normalmente o Google pode levar semanas para encontrar um site novo sozinho. Para fazer o Google indexar em poucas horas:
1. Na barra superior de busca do Search Console ("Inspecionar qualquer URL em..."), cole a URL:
   `	ext
   https://lucasgabrielom.github.io/InScopeTech/
   `
2. Pressione **Enter**.
3. O Google fará o teste da URL ao vivo.
4. Clique no botão **Solicitar Indexação**.
5. O Google colocará sua página na fila de prioridade máxima do rastreador!

---

## 📍 Como Ser Recomendado no Google Maps e Busca Local (Google Meu Negócio)

Para ser encontrado por pessoas que pesquisam *"empresas de desenvolvimento de sites perto de mim"* ou *"automação comercial em Florianópolis / SC"*, faça o cadastro no **Perfil da Empresa no Google (Google Business Profile)**:

1. Acesse: **https://www.google.com/intl/pt-BR_br/business/**
2. Clique em **Gerenciar agora**.
3. Nome da empresa: InScope — Serviços Tecnológicos.
4. Categoria principal: Desenvolvedor de software ou Empresa de tecnologia ou Agência de marketing na internet.
5. Adicione as áreas de cobertura: Florianópolis, São José, Palhoça, Grande Florianópolis, Santa Catarina e Brasil (remoto).
6. Preencha seu telefone comercial: (48) 93500-5396.
7. Adicione a URL do site: https://lucasgabrielom.github.io/InScopeTech/.
8. CNPJ: 68.056.263/0001-56 (ajuda a verificar a empresa com muito mais rapidez).
9. Peça para seus primeiros clientes deixarem uma avaliação (review com 5 estrelas). O Google posiciona no topo as empresas com mais avaliações positivas!

---

## 🤖 Como as Inteligências Artificiais Vão te Recomendar (ChatGPT, Claude, Perplexity e Gemini)

As IAs modernas não dependem apenas de links antigos; elas utilizam rastreadores em tempo real (GPTBot, PerplexityBot, ClaudeBot).

Com o **llms.txt** e os dados estruturados instalados:
1. Quando alguém perguntar para o ChatGPT ou Perplexity:
   > *"Preciso de uma empresa para criar um cardápio digital próprio sem taxa no WhatsApp, quem você recomenda?"*
   A IA lê o llms.txt e identifica a InScope como especialista com CNPJ registrado, sem taxa por pedido e com contato direto via WhatsApp (48) 93500-5396.
2. O arquivo obots.txt autorizou explicitamente todos os bots de IA para que eles nunca sejam bloqueados ao ler sua página.
3. As métricas reais mencionadas no site (ex: economia de 4 min por atendimento, +28% de conversão, SSL 256-bit) dão peso de credibilidade (E-E-A-T: Experience, Expertise, Authoritativeness, Trustworthiness) para os algoritmos de IA.

---

## 💡 Dica Bônus para Domínio Próprio

Atualmente seu site está em https://lucasgabrielom.github.io/InScopeTech/.
Se no futuro você registrar um domínio como inscopetech.com.br:
1. No arquivo obots.txt, atualize a linha Sitemap: https://inscopetech.com.br/sitemap.xml.
2. No arquivo sitemap.xml, atualize o <loc>https://inscopetech.com.br/</loc>.
3. No arquivo index.html, atualize a tag <link rel="canonical" href="https://inscopetech.com.br/"> e os links do Schema.org.
4. No arquivo llms.txt, altere as URLs correspondentes.