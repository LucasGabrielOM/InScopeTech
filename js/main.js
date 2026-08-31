// Main Client-Side Logic for INSCOP Tech (Theme Switcher, Project Configurator, ROI Calculator)

const PHONE_NUMBER = "5548996116327";
const REAL_CNPJ = "68.056.263/0001-56";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Theme (Dark by default, restore preference)
  initTheme();

  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Render Projects Grid
  renderProjects("all");

  // Setup Event Listeners
  setupThemeToggle();
  setupPortfolioFilters();
  setupRoiCalculator();
  setupCustomProjectBuilder();
  setupWhatsAppForm();
  setupCnpjCopy();
  setupMobileMenu();
});

// Theme Toggle Management (Fix for Light/Dark Mode)
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme);
}

function applyTheme(theme) {
  const html = document.documentElement;
  if (theme === "light") {
    html.classList.remove("dark");
    html.classList.add("light");
  } else {
    html.classList.remove("light");
    html.classList.add("dark");
  }
  localStorage.setItem("theme", theme);
  updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
  const iconContainer = document.getElementById("theme-icon");
  if (!iconContainer) return;
  
  if (theme === "light") {
    iconContainer.setAttribute("data-lucide", "moon");
    iconContainer.className = "w-4 h-4 text-indigo-600 pointer-events-none";
  } else {
    iconContainer.setAttribute("data-lucide", "sun");
    iconContainer.className = "w-4 h-4 text-amber-400 pointer-events-none";
  }
  if (window.lucide) lucide.createIcons();
}

function setupThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle-btn");
  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const isLight = document.documentElement.classList.contains("light");
    const nextTheme = isLight ? "dark" : "light";
    applyTheme(nextTheme);
  });
}

// Render Projects Cards
function renderProjects(filterCategory) {
  const container = document.getElementById("projects-grid");
  if (!container) return;

  const filtered = filterCategory === "all"
    ? projectsData
    : projectsData.filter(p => p.category === filterCategory);

  container.innerHTML = filtered.map(p => `
    <div class="shadcn-card p-6 flex flex-col justify-between group cursor-pointer" onclick="openProjectModal('${p.id}')">
      <div>
        <div class="flex items-center justify-between mb-4">
          <span class="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            ${p.badge || p.categoryName}
          </span>
          <div class="p-2 rounded-xl bg-slate-800/60 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition">
            <i data-lucide="${p.icon || 'code'}" class="w-5 h-5"></i>
          </div>
        </div>

        <h3 class="text-xl font-bold text-white group-hover:text-indigo-400 transition mb-2">
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
            <i data-lucide="check-circle" class="w-3.5 h-3.5"></i>
            ${p.metrics.split('|')[0]}
          </span>
          <a href="${p.demo || '#'}" target="_blank" onclick="event.stopPropagation()" class="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white text-xs font-bold transition flex items-center gap-1">
            Ver Site Live <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
          </a>
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

  const whatsappMessage = encodeURIComponent(`Olá INSCOP Tech! Vi o projeto "${project.title}" no seu site e gostaria de um orçamento para uma solução parecida no meu negócio.`);
  const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${whatsappMessage}`;

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

      <div class="mb-6 bg-slate-900/80 p-4 rounded-xl border border-white/10">
        <h4 class="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">Resultado Real para o Cliente:</h4>
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
        ${project.demo ? `
          <a href="${project.demo}" target="_blank" class="flex-1 py-3.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition">
            <i data-lucide="external-link" class="w-5 h-5"></i>
            Acessar Site do Cliente (Ao Vivo)
          </a>
        ` : ''}

        <a href="${whatsappUrl}" target="_blank" class="py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
          Solicitar Orçamento no WhatsApp
        </a>
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

// Custom Project Configurator ("Monte seu Projeto Personalizado")
function setupCustomProjectBuilder() {
  const checkboxes = document.querySelectorAll(".project-opt");
  const resultTime = document.getElementById("custom-est-time");
  const btnSend = document.getElementById("btn-send-custom-project");

  if (!checkboxes.length || !btnSend) return;

  function updateEstimate() {
    let selected = [];
    let days = 0;

    checkboxes.forEach(cb => {
      if (cb.checked) {
        selected.push(cb.value);
        days += parseInt(cb.getAttribute("data-days") || "3");
      }
    });

    if (days === 0) days = 3;
    if (resultTime) resultTime.innerText = `Estimativa: ${days} a ${days + 3} dias úteis`;

    const text = selected.length > 0 
      ? `Olá INSCOP Tech! Quero montar um projeto personalizado com as seguintes soluções:\n\n` + selected.map(s => `• ${s}`).join("\n") + `\n\nQual o valor estimado e próximos passos?`
      : `Olá INSCOP Tech! Gostaria de um orçamento personalizado para a minha empresa.`;

    btnSend.href = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
  }

  checkboxes.forEach(cb => cb.addEventListener("change", updateEstimate));
  updateEstimate();
}

// ROI Calculator
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

    const hoursSaved = Math.round((orders * 4) / 60);
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

    const text = `Olá INSCOP Tech! Meu nome é *${name}*${company ? ` da empresa *${company}*` : ''}.\nTenho interesse em: *${service}*.\n${detail ? `Detalhes: ${detail}` : ''}\n\nGostaria de solicitar um orçamento sem compromisso!`;

    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  });
}

// CNPJ Copy Function
function setupCnpjCopy() {
  const btn = document.getElementById("btn-copy-cnpj");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const cnpj = REAL_CNPJ;
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
