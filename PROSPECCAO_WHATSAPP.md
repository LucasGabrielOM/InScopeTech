# Guia Prático de Prospecção Local & Disparo Comercial no WhatsApp

Este guia foi elaborado para apoiar a nova operação comercial da sua empresa (**LM Tech & Automação**). Ele contém o passo a passo para encontrar empresas na sua região, preparar o disparo de mensagens estilo WhatsDash com segurança e converter contatos em clientes.

---

## 🎯 ETAPA 1: Mapeamento e Mineração de Empresas Locais

Para encontrar lojas e empresas na sua cidade/região que precisam de um site ou automação:

### 1. Pesquisa Direta no Google Maps & Google Meu Negócio
- Pesquise por segmentos com alto volume de vendas diárias:
  - *Restaurantes, Hamburguerias, Pizzarias, Sushis* (Foco: Cardápio Web sem comissão).
  - *Petshops, Clínicas Estéticas, Barbearias, Estúdios de Tatuagem* (Foco: Agendamento automatizado).
  - *Imobiliárias, Concessionárias, Lojas de Roupas/Móveis* (Foco: Catalogação de produtos e captação de leads).
- **Filtro de Oportunidades**:
  - Empresas **SEM site cadastrado** no Google (possuem apenas telefone/WhatsApp).
  - Empresas com sites antigos, lentos ou não adaptados para celular.

### 2. Mineração B2B via CNPJ e Technographics
- Utilize sua ferramenta **`b2b-technographics-prospector`** (localizada em seu repositório GitHub) para filtrar empresas por CNAE e cidade na base pública de CNPJs.
- Extraia nome do sócio, telefone fixo/WhatsApp e e-mail corporativo.

---

## 🛡️ ETAPA 2: Regras de Segurança Anti-Bloqueio no WhatsApp

Se você for utilizar ferramentas de disparo em massa (WhatsDash, Evolution API, Z-API ou scripts):

> [!CAUTION]
> **Atenção ao Risco de Banimento**: Disparar centenas de mensagens iguais para números que não têm seu contato salvo pode causar bloqueio imediato do chip.

### Boas Práticas Obrigatórias:
1. **Maturação do Número (Warm-up)**:
   - Nunca use um chip recém-comprado para disparos em massa.
   - Movimente o número durante 7 a 14 dias conversando com amigos/grupos antes de iniciar a prospecção.
2. **Intervalo Randômico entre Envios**:
   - Configure um delay de **45 a 120 segundos** entre cada mensagem enviada.
3. **Uso de Spintax (Variação de Palavras)**:
   - Exemplo: `{Olá|Tudo bem|Oi}, {Nome}! {Vi|Encontrei|Notei} o perfil da sua loja...`
4. **Mensagens Curtas e Interativas**:
   - Não envie textos longos nem links no primeiro contato. Faça uma pergunta simples para que o cliente responda. Quando ele responde, o algoritmo do WhatsApp entende que a conversa é legítima.

---

## 💬 ETAPA 3: Scripts Prontos de Prospecção (Cold Messaging)

### 🍕 Modelo 1: Para Restaurantes & Food Service (Foco: Delivery sem Taxas)

**Mensagem 1 (Abordagem inicial):**
> "Oi, [Nome da Loja/Sócio]! Tudo bem? Vi a página de vocês aqui no Google. Vocês estão aceitando pedidos direto pelo WhatsApp hoje ou usam apenas os apps de delivery?"

*(Aguarde o cliente responder)*

**Mensagem 2 (Apresentação do site/cardápio):**
> "Legal! Pergunto porque nós desenvolvemos cardápios digitais próprios (com painel de cozinha em tempo real) onde o cliente pede direto no seu WhatsApp e você **não paga nenhuma taxa por pedido**. 
> 
> Montei um modelo de demonstração para empresas da região. Se quiser dar uma olhada no nosso site oficial: **https://lucasgabrielom.github.io** (LM Tech). Conseguimos rodar o seu cardápio essa semana. Posso te enviar um vídeo rápido de 1 minuto de como funciona?"

---

### 🛍️ Modelo 2: Para Lojas Locais & Comércio (Foco: Site & Catálogo)

**Mensagem 1 (Abordagem inicial):**
> "Olá! Vi a [Nome da Loja] no Google e achei os produtos incríveis. Vocês têm um site com catálogo completo ou o atendimento é feito direto por aqui?"

*(Aguarde a resposta)*

**Mensagem 2 (Oferta de valor):**
> "Show! Nós somos uma empresa de tecnologia aqui da região (LM Tech - CNPJ ativo) e criamos websites e catálogos virtuais de alta conversão para lojistas. 
> 
> Com o site, seus clientes encontram sua loja no Google 24h por dia e já chegam no seu WhatsApp prontos para fechar a compra. Você pode dar uma olhada em nossos cases entregues no site: **https://lucasgabrielom.github.io**. 
> 
> Seria útil para vocês receberem um orçamento sem compromisso essa semana?"

---

### 💈 Modelo 3: Para Clínicas, Estúdios & Prestadores de Serviço (Foco: Agendamento)

**Mensagem 1 (Abordagem inicial):**
> "Oi [Nome da Empresa], tudo bem? Vocês ainda têm horários disponíveis para atendimento nessa semana?"

*(Aguarde a resposta)*

**Mensagem 2 (Apresentação de Bot/Agendamento):**
> "Ótimo! Estava vendo que vocês atendem bastante pelo WhatsApp. Desenvolvemos robôs de atendimento e agendamento automático que tiram dúvidas de preços e marcam consultas sozinhos, mesmo fora do horário comercial. 
> 
> Dá uma olhada no site da nossa empresa com nossos cases de automação: **https://lucasgabrielom.github.io**. Gostaria de ver como funciona para o segmento de vocês?"

---

## 📌 ETAPA 4: Cadência Comercial Sugerida

1. **Dia 1**: Envio da Mensagem 1 (Abordagem com pergunta direta).
2. **Dia 2**: Se o cliente respondeu, envie a Mensagem 2 com o link do seu novo site.
3. **Dia 4 (Follow-up de quem não respondeu)**:
   > "Oi [Nome], conseguiu ver a mensagem acima? Se fizer sentido, posso te mostrar uma demonstração rápida sem compromisso!"
4. **Fechamento**: Envie proposta formal com contrato (garantia pelo seu CNPJ) e prazo de entrega rápido (3 a 7 dias).
