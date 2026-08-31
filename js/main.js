// InScope Serviços Tecnológicos - Client Logic & Theme Handler

const PHONE_NUMBER = "5548996116327";
const REAL_CNPJ = "68.056.263/0001-56";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Theme (Dark by default, restore stored preference)
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
  setupWhatsAppForm();
  setupCustomServiceSelectHandler();
  setupMobileMenu();
});

// Theme Toggle Handler (Light / Dark Mode Fix)
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

// Dynamic Custom Service Field Handler
function setupCustomServiceSelectHandler() {
  const serviceSelect = document.getElementById("lead-service");
  const customFieldContainer = document.getElementById("custom-service-container");

  if (!serviceSelect || !customFieldContainer) return;

  serviceSelect.addEventListener("change", () => {
    if (serviceSelect.value === "Serviço Personalizado") {
      customFieldContainer.classList.remove("hidden");
    } else {
      customFieldContainer.classList.add("hidden");
    }
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
    <div class="inscope-card p-6 flex flex-col justify-between group cursor-pointer" onclick="openProjectModal('${p.id}')">
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
            Acessar Site Live <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
          </a>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

// Portfolio Filter Setup
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

  const whatsappMessage = encodeURIComponent(`Olá InScope! Vi o projeto "${project.title}" no seu site e gostaria de um orçamento para uma solução parecida.`);
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
          <img src="assets/favicon.png" alt="WhatsApp" class="w-5 h-5">
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

// WhatsApp Lead Form Setup with Custom Service Field
function setupWhatsAppForm() {
  const form = document.getElementById("whatsapp-lead-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("lead-name")?.value.trim() || "";
    const company = document.getElementById("lead-company")?.value.trim() || "";
    const service = document.getElementById("lead-service")?.value || "Site/Landing Page";
    const customServiceDetail = document.getElementById("lead-custom-service")?.value.trim() || "";
    const detail = document.getElementById("lead-detail")?.value.trim() || "";

    let text = `Olá InScope! Meu nome é *${name}*${company ? ` da empresa *${company}*` : ''}.\nTenho interesse em: *${service}*.\n`;
    
    if (service === "Serviço Personalizado" && customServiceDetail) {
      text += `Especificação do Serviço Personalizado: *${customServiceDetail}*\n`;
    }
    
    if (detail) {
      text += `Detalhes do projeto: ${detail}\n`;
    }

    text += `\nGostaria de solicitar um orçamento sem compromisso!`;

    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
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
