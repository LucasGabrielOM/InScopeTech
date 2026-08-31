// Main Client-Side Logic for Agency Website

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Render Projects Grid
  renderProjects("all");

  // Setup Portfolio Filter Listeners
  setupPortfolioFilters();

  // Setup ROI Calculator
  setupRoiCalculator();

  // Setup WhatsApp Form Lead Generator
  setupWhatsAppForm();

  // Setup CNPJ Copy Button
  setupCnpjCopy();

  // Mobile Menu Toggle
  setupMobileMenu();
});

// Render Projects Cards
function renderProjects(filterCategory) {
  const container = document.getElementById("projects-grid");
  if (!container) return;

  const filtered = filterCategory === "all"
    ? projectsData
    : projectsData.filter(p => p.category === filterCategory);

  container.innerHTML = filtered.map(p => `
    <div class="glass-card rounded-2xl p-6 flex flex-col justify-between group cursor-pointer border border-white/5 hover:border-indigo-500/40 transition-all duration-300" onclick="openProjectModal('${p.id}')">
      <div>
        <div class="flex items-center justify-between mb-4">
          <span class="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            ${p.badge || p.categoryName}
          </span>
          <div class="p-2 rounded-xl bg-white/5 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition">
            <i data-lucide="${p.icon || 'code'}" class="w-5 h-5"></i>
          </div>
        </div>

        <h3 class="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition">
          ${p.title}
        </h3>
        <p class="text-slate-400 text-sm mb-4 line-clamp-2">
          ${p.shortDesc}
        </p>
      </div>

      <div>
        <div class="flex flex-wrap gap-1.5 mb-4">
          ${p.techs.slice(0, 4).map(t => `
            <span class="px-2 py-0.5 text-[11px] rounded bg-slate-800/80 text-slate-300 border border-slate-700">
              ${t}
            </span>
          `).join('')}
        </div>

        <div class="pt-4 border-t border-white/10 flex items-center justify-between">
          <span class="text-xs text-emerald-400 font-medium flex items-center gap-1">
            <i data-lucide="trending-up" class="w-3.5 h-3.5"></i>
            ${p.metrics.split('|')[0]}
          </span>
          <span class="text-xs text-indigo-400 group-hover:translate-x-1 transition font-semibold flex items-center gap-1">
            Detalhes <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </span>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

// Portfolio Filter Buttons Setup
function setupPortfolioFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => {
        b.classList.remove("bg-indigo-600", "text-white", "shadow-lg", "shadow-indigo-500/30");
        b.classList.add("bg-slate-800/60", "text-slate-400", "hover:bg-slate-700");
      });

      btn.classList.remove("bg-slate-800/60", "text-slate-400", "hover:bg-slate-700");
      btn.classList.add("bg-indigo-600", "text-white", "shadow-lg", "shadow-indigo-500/30");

      const category = btn.getAttribute("data-category");
      renderProjects(category);
    });
  });
}

// Open Project Detail Modal
function openProjectModal(id) {
  const project = projectsData.find(p => p.id === id);
  if (!project) return;

  const modal = document.getElementById("project-modal");
  const content = document.getElementById("modal-content");
  if (!modal || !content) return;

  const whatsappMessage = encodeURIComponent(`Olá Lucas! Vi o projeto "${project.title}" no seu site e gostaria de um orçamento para uma solução parecida no meu negócio.`);
  const whatsappUrl = `https://wa.me/5548999999999?text=${whatsappMessage}`;

  content.innerHTML = `
    <div class="p-6 md:p-8">
      <div class="flex justify-between items-start mb-6">
        <div>
          <span class="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            ${project.categoryName}
          </span>
          <h2 class="text-2xl md:text-3xl font-extrabold text-white mt-2">${project.title}</h2>
        </div>
        <button onclick="closeProjectModal()" class="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition">
          <i data-lucide="x" class="w-6 h-6"></i>
        </button>
      </div>

      <p class="text-slate-300 text-base leading-relaxed mb-6">
        ${project.fullDesc}
      </p>

      <div class="mb-6 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <h4 class="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">Impacto Real no Cliente:</h4>
        <p class="text-emerald-400 font-semibold text-sm flex items-center gap-2">
          <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400"></i>
          ${project.metrics}
        </p>
      </div>

      <div class="mb-6">
        <h4 class="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">Tecnologias Utilizadas:</h4>
        <div class="flex flex-wrap gap-2">
          ${project.techs.map(t => `<span class="px-3 py-1 rounded-lg bg-indigo-950/60 text-indigo-300 text-xs border border-indigo-800/40">${t}</span>`).join('')}
        </div>
      </div>

      <div class="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
        <a href="${whatsappUrl}" target="_blank" class="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition">
          <i data-lucide="message-circle" class="w-5 h-5"></i>
          Quero uma solução similar no meu WhatsApp
        </a>

        ${project.github ? `
          <a href="${project.github}" target="_blank" class="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-center flex items-center justify-center gap-2 transition">
            <i data-lucide="github" class="w-5 h-5"></i>
            Ver Repositório
          </a>
        ` : ''}

        ${project.demo ? `
          <a href="${project.demo}" target="_blank" class="py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-center flex items-center justify-center gap-2 transition">
            <i data-lucide="external-link" class="w-5 h-5"></i>
            Ver Demo Online
          </a>
        ` : ''}
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  if (window.lucide) lucide.createIcons();
}

function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

// ROI / Economy Calculator
function setupRoiCalculator() {
  const ordersSlider = document.getElementById("roi-orders");
  const valueSlider = document.getElementById("roi-value");
  const ordersValSpan = document.getElementById("roi-orders-val");
  const valueValSpan = document.getElementById("roi-value-val");
  const resultHours = document.getElementById("roi-result-hours");
  const resultMoney = document.getElementById("roi-result-money");

  if (!ordersSlider || !valueSlider) return;

  function updateRoi() {
    const orders = parseInt(ordersSlider.value) || 300;
    const avgTicket = parseInt(valueSlider.value) || 50;

    ordersValSpan.innerText = orders;
    valueValSpan.innerText = `R$ ${avgTicket}`;

    // Calculation estimates:
    // Manual order handling takes approx 5 mins of staff time per order on WhatsApp/Phone.
    // Automation saves 80% of that time = 4 mins saved per order.
    // Saved hours per month = (orders * 4 mins) / 60
    const hoursSaved = Math.round((orders * 4) / 60);

    // Additional turnover / prevented loss:
    // Having a fast web store / bot increases conversion & prevents customer abandonment by ~12%
    const extraRevenue = Math.round(orders * avgTicket * 0.12);

    resultHours.innerText = `${hoursSaved} Horas/Mês`;
    resultMoney.innerText = `R$ ${extraRevenue.toLocaleString('pt-BR')}/Mês`;
  }

  ordersSlider.addEventListener("input", updateRoi);
  valueSlider.addEventListener("input", updateRoi);
  updateRoi();
}

// WhatsApp Lead Form Setup
function setupWhatsAppForm() {
  const form = document.getElementById("whatsapp-lead-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("lead-name")?.value.trim() || "";
    const company = document.getElementById("lead-company")?.value.trim() || "";
    const service = document.getElementById("lead-service")?.value || "Site/Landing Page";
    const detail = document.getElementById("lead-detail")?.value.trim() || "";

    const text = `Olá! Meu nome é *${name}*${company ? ` da empresa *${company}*` : ''}.\nTenho interesse em: *${service}*.\n${detail ? `Detalhes: ${detail}` : ''}\n\nGostaria de solicitar um orçamento sem compromisso!`;

    const phone = "5548999999999"; // Can be replaced by real phone number
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  });
}

// CNPJ Copy Function
function setupCnpjCopy() {
  const btn = document.getElementById("btn-copy-cnpj");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const cnpj = btn.getAttribute("data-cnpj") || "50.000.000/0001-00";
    navigator.clipboard.writeText(cnpj).then(() => {
      const originalText = btn.innerText;
      btn.innerText = "CNPJ Copiado!";
      btn.classList.add("bg-emerald-600", "text-white");
      setTimeout(() => {
        btn.innerText = originalText;
        btn.classList.remove("bg-emerald-600", "text-white");
      }, 2000);
    });
  });
}

// Mobile Navigation Toggle
function setupMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
}
