const STORAGE_KEY = "manosDeObra.v1";

const DEFAULT_SETTINGS = {
  hourlyRate: 60,
  wastePercent: 10,
  toolWearPercent: 5,
  lightPerPiece: 2,
  packagingCost: 3,
  minMargin: 40,
  recommendedMargin: 100,
  premiumMargin: 150,
  wholesaleDiscount: 15,
  defaultDeliveryDays: 2,
  currency: "MXN"
};

const UNITS = ["pza", "m", "cm", "g", "ml", "hoja", "paquete", "frasco", "set", "servicio"];

const CATEGORIES = [
  "Todos", "Hilo", "Cuentas", "Dijes", "Cadena", "Herrajes", "Piedras", "Llaveros",
  "Arcilla", "Pintura", "Acabados", "Dibujo", "Empaque", "Consumibles", "Otros"
];

const DEFAULT_SUPPLIES = [
  { name: "Hilo encerado", category: "Hilo", totalCost: 30, purchasedQty: 20, unit: "m" },
  { name: "Hilo elástico", category: "Hilo", totalCost: 25, purchasedQty: 10, unit: "m" },
  { name: "Nylon transparente", category: "Hilo", totalCost: 35, purchasedQty: 50, unit: "m" },
  { name: "Cuentas acrílicas", category: "Cuentas", totalCost: 35, purchasedQty: 100, unit: "pza" },
  { name: "Cuentas de cristal", category: "Cuentas", totalCost: 85, purchasedQty: 100, unit: "pza" },
  { name: "Separadores metálicos", category: "Herrajes", totalCost: 45, purchasedQty: 100, unit: "pza" },
  { name: "Dijes metálicos", category: "Dijes", totalCost: 80, purchasedQty: 20, unit: "pza" },
  { name: "Cadena metálica", category: "Cadena", totalCost: 64, purchasedQty: 20, unit: "m" },
  { name: "Broche de cierre", category: "Herrajes", totalCost: 50, purchasedQty: 20, unit: "pza" },
  { name: "Argollas metálicas", category: "Herrajes", totalCost: 40, purchasedQty: 100, unit: "pza" },
  { name: "Ganchos para arete", category: "Herrajes", totalCost: 55, purchasedQty: 50, unit: "pza" },
  { name: "Base para anillo", category: "Herrajes", totalCost: 70, purchasedQty: 20, unit: "pza" },
  { name: "Argolla para llavero", category: "Llaveros", totalCost: 65, purchasedQty: 50, unit: "pza" },
  { name: "Piedra natural chica", category: "Piedras", totalCost: 120, purchasedQty: 50, unit: "pza" },
  { name: "Arcilla polimérica", category: "Arcilla", totalCost: 90, purchasedQty: 500, unit: "g" },
  { name: "Arcilla secado al aire", category: "Arcilla", totalCost: 75, purchasedQty: 1000, unit: "g" },
  { name: "Pintura acrílica", category: "Pintura", totalCost: 25, purchasedQty: 100, unit: "ml" },
  { name: "Barniz brillante", category: "Acabados", totalCost: 40, purchasedQty: 100, unit: "ml" },
  { name: "Pegamento fuerte", category: "Consumibles", totalCost: 35, purchasedQty: 20, unit: "ml" },
  { name: "Papel opalina", category: "Dibujo", totalCost: 75, purchasedQty: 100, unit: "hoja" },
  { name: "Hoja para impresión", category: "Dibujo", totalCost: 35, purchasedQty: 100, unit: "hoja" },
  { name: "Lápiz / color / marcador", category: "Dibujo", totalCost: 150, purchasedQty: 1, unit: "set" },
  { name: "Bolsita de empaque", category: "Empaque", totalCost: 100, purchasedQty: 50, unit: "pza" },
  { name: "Etiqueta de marca", category: "Empaque", totalCost: 80, purchasedQty: 100, unit: "pza" },
  { name: "Tarjeta de agradecimiento", category: "Empaque", totalCost: 120, purchasedQty: 100, unit: "pza" }
].map((s, index) => ({ id: cryptoId(), createdAt: Date.now() + index, ...s }));

const PRODUCTS = {
  pulseras: {
    title: "Pulseras",
    singular: "Pulsera personalizada",
    icon: "○",
    description: "Ideal para hilo, cuentas, dijes, separadores y broches.",
    hints: ["Cuentas", "Dijes", "Hilo", "Herrajes", "Empaque"],
    fields: [
      { id: "measure", label: "Medida de la pulsera", unit: "cm", type: "number", default: 18 },
      { id: "workTime", label: "Tiempo de trabajo", unit: "min", type: "number", default: 45 },
      { id: "quantity", label: "Cantidad de piezas", unit: "pzas", type: "number", default: 1 }
    ]
  },
  collares: {
    title: "Collares",
    singular: "Collar personalizado",
    icon: "♢",
    description: "Para cadenas, hilo, dijes, broches, piedras y acabados.",
    hints: ["Cadena", "Dijes", "Piedras", "Herrajes", "Empaque"],
    fields: [
      { id: "measure", label: "Largo del collar", unit: "cm", type: "number", default: 45 },
      { id: "workTime", label: "Tiempo de trabajo", unit: "min", type: "number", default: 60 },
      { id: "quantity", label: "Cantidad de piezas", unit: "pzas", type: "number", default: 1 }
    ]
  },
  aretes: {
    title: "Aretes",
    singular: "Par de aretes personalizados",
    icon: "❧",
    description: "Para ganchos, argollas, dijes, cuentas y piedras.",
    hints: ["Herrajes", "Dijes", "Cuentas", "Piedras", "Empaque"],
    fields: [
      { id: "pairs", label: "Pares a realizar", unit: "pares", type: "number", default: 1 },
      { id: "workTime", label: "Tiempo de trabajo", unit: "min", type: "number", default: 35 },
      { id: "quantity", label: "Cantidad a cotizar", unit: "sets", type: "number", default: 1 }
    ]
  },
  anillos: {
    title: "Anillos",
    singular: "Anillo personalizado",
    icon: "◌",
    description: "Para bases, alambre, piedras, dijes pequeños y acabado.",
    hints: ["Herrajes", "Piedras", "Dijes", "Acabados", "Empaque"],
    fields: [
      { id: "size", label: "Talla / medida", unit: "", type: "text", default: "Ajustable" },
      { id: "workTime", label: "Tiempo de trabajo", unit: "min", type: "number", default: 40 },
      { id: "quantity", label: "Cantidad de piezas", unit: "pzas", type: "number", default: 1 }
    ]
  },
  llaveros: {
    title: "Llaveros",
    singular: "Llavero personalizado",
    icon: "⚿",
    description: "Para argollas, dijes, resina, arcilla, impresión o nombre personalizado.",
    hints: ["Llaveros", "Dijes", "Arcilla", "Pintura", "Acabados", "Empaque"],
    fields: [
      { id: "size", label: "Tamaño aproximado", unit: "cm", type: "number", default: 5 },
      { id: "workTime", label: "Tiempo de trabajo", unit: "min", type: "number", default: 45 },
      { id: "quantity", label: "Cantidad de piezas", unit: "pzas", type: "number", default: 1 }
    ]
  },
  arcilla: {
    title: "Arcilla",
    singular: "Artículo de arcilla personalizado",
    icon: "◒",
    description: "Para figuras, dijes, barnizado, pintura y piezas decorativas.",
    hints: ["Arcilla", "Pintura", "Acabados", "Consumibles", "Empaque"],
    fields: [
      { id: "size", label: "Tamaño de la pieza", unit: "cm", type: "number", default: 7 },
      { id: "workTime", label: "Tiempo de modelado y acabado", unit: "min", type: "number", default: 90 },
      { id: "quantity", label: "Cantidad de piezas", unit: "pzas", type: "number", default: 1 }
    ]
  },
  dibujos: {
    title: "Dibujos",
    singular: "Dibujo personalizado",
    icon: "✎",
    description: "Para ilustraciones físicas o digitales, impresión y acabados.",
    hints: ["Dibujo", "Pintura", "Consumibles", "Empaque"],
    fields: [
      { id: "format", label: "Formato", unit: "", type: "select", default: "Carta", options: ["Digital", "Media carta", "Carta", "Postal", "Personalizado"] },
      { id: "workTime", label: "Tiempo de trabajo", unit: "min", type: "number", default: 120 },
      { id: "quantity", label: "Cantidad", unit: "pzas", type: "number", default: 1 }
    ]
  }
};

const DIFFICULTY = {
  basica: { label: "Básica", percent: 0 },
  media: { label: "Media", percent: 15 },
  detallada: { label: "Detallada", percent: 30 },
  personalizada: { label: "Personalizada", percent: 50 },
  urgente: { label: "Urgente / especial", percent: 70 }
};

let state = loadState();
let currentView = "home";
let selectedSupplyFilter = "Todos";
let activeProductKey = null;
let lastResult = null;
let deferredInstallPrompt = null;

const view = document.querySelector("#view");
const backBtn = document.querySelector("#backBtn");
const installBtn = document.querySelector("#installBtn");

init();

function init() {
  bindGlobalEvents();
  renderHome();
  registerServiceWorker();
}

function bindGlobalEvents() {
  document.querySelectorAll("[data-action]").forEach((el) => {
    el.addEventListener("click", () => navigate(el.dataset.action));
  });

  backBtn.addEventListener("click", () => renderHome());

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    installBtn.classList.remove("hidden");
  });

  installBtn.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    installBtn.classList.add("hidden");
  });
}

function navigate(action) {
  const routes = {
    home: renderHome,
    supplies: renderSupplies,
    history: renderHistory,
    settings: renderSettings
  };

  if (routes[action]) routes[action]();
}

function setView(name, options = {}) {
  currentView = name;
  backBtn.classList.toggle("hidden", name === "home");
  document.querySelectorAll(".nav-item").forEach((btn) => {
    const action = btn.dataset.action;
    btn.classList.toggle("active", action === name || (name === "calculator" && action === "home"));
  });
  if (options.scroll !== false) window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderHome() {
  setView("home");
  lastResult = null;
  view.innerHTML = `
    <section class="hero">
      <div class="logo-hand">♡</div>
      <h1>Manos<br>de Obra</h1>
      <p>Cotiza tu arte, porque tu trabajo vale y mucho.</p>
    </section>

    <section class="section-title">
      <div>
        <h2>Nueva cotización</h2>
        <p>Elige el tipo de pieza y calcula costo real, precio mínimo, recomendado, premium y mayoreo.</p>
      </div>
    </section>

    <section class="grid grid-2">
      ${Object.entries(PRODUCTS).map(([key, product]) => `
        <button class="action-card" type="button" data-product="${key}">
          <span class="action-icon">${product.icon}</span>
          <strong>${product.title}</strong>
          <small>${product.description}</small>
        </button>
      `).join("")}
    </section>

    <section class="section-title">
      <div>
        <h2>Herramientas</h2>
        <p>Administra costos, guarda cotizaciones y ajusta tu fórmula.</p>
      </div>
    </section>

    <section class="grid grid-3">
      <button class="action-card quick-card" type="button" data-go="supplies"><span class="action-icon">◈</span><strong>Insumos</strong></button>
      <button class="action-card quick-card" type="button" data-go="history"><span class="action-icon">◷</span><strong>Historial</strong></button>
      <button class="action-card quick-card" type="button" data-go="settings"><span class="action-icon">⚙</span><strong>Ajustes</strong></button>
    </section>
  `;

  view.querySelectorAll("[data-product]").forEach((btn) => {
    btn.addEventListener("click", () => renderCalculator(btn.dataset.product));
  });

  view.querySelectorAll("[data-go]").forEach((btn) => {
    btn.addEventListener("click", () => navigate(btn.dataset.go));
  });
}

function renderSupplies() {
  setView("supplies");
  const filtered = selectedSupplyFilter === "Todos"
    ? state.supplies
    : state.supplies.filter((s) => s.category === selectedSupplyFilter);

  view.innerHTML = `
    <section class="screen-title">
      <h1>Insumos</h1>
      <p>Registra lo que compras y la app calcula el costo unitario automáticamente.</p>
    </section>

    <div class="chips" aria-label="Filtros de insumos">
      ${CATEGORIES.map((category) => `
        <button class="chip ${category === selectedSupplyFilter ? "active" : ""}" type="button" data-filter="${category}">${category}</button>
      `).join("")}
    </div>

    <div class="actions-stack" style="margin-bottom: 14px;">
      <button class="primary-btn" type="button" id="addSupplyBtn">+ Agregar insumo</button>
      <button class="ghost-btn" type="button" id="showSupplyGuideBtn">Ver guía de insumos recomendados</button>
    </div>

    <section class="list-card">
      ${filtered.length ? filtered.map(renderSupplyItem).join("") : `<div class="empty">No hay insumos en esta categoría.</div>`}
    </section>
  `;

  view.querySelectorAll("[data-filter]").forEach((chip) => {
    chip.addEventListener("click", () => {
      selectedSupplyFilter = chip.dataset.filter;
      renderSupplies();
    });
  });

  view.querySelector("#addSupplyBtn").addEventListener("click", () => openSupplyModal());
  view.querySelector("#showSupplyGuideBtn").addEventListener("click", openSupplyGuideModal);

  view.querySelectorAll("[data-edit-supply]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const supply = state.supplies.find((s) => s.id === btn.dataset.editSupply);
      openSupplyModal(supply);
    });
  });

  view.querySelectorAll("[data-delete-supply]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.deleteSupply;
      const supply = state.supplies.find((s) => s.id === id);
      if (!confirm(`¿Eliminar "${supply?.name || "este insumo"}"?`)) return;
      state.supplies = state.supplies.filter((s) => s.id !== id);
      saveState();
      renderSupplies();
      showToast("Insumo eliminado");
    });
  });
}

function renderSupplyItem(supply) {
  const unitCost = getUnitCost(supply);
  return `
    <article class="supply-item">
      <div class="item-top">
        <div>
          <div class="item-title">${escapeHtml(supply.name)}</div>
          <div class="item-sub">${escapeHtml(supply.category)} · Compraste ${formatNumber(supply.purchasedQty)} ${escapeHtml(supply.unit)} por ${money(supply.totalCost)}</div>
        </div>
        <span class="price-pill">${money(unitCost)} / ${escapeHtml(supply.unit)}</span>
      </div>
      <div class="item-actions">
        <button class="small-btn" type="button" data-edit-supply="${supply.id}">Editar</button>
        <button class="small-btn danger" type="button" data-delete-supply="${supply.id}">Eliminar</button>
      </div>
    </article>
  `;
}

function renderSettings() {
  setView("settings");
  const s = state.settings;
  view.innerHTML = `
    <section class="screen-title">
      <h1>Configuración</h1>
      <p>Estos valores se usan en todas las cotizaciones. Puedes cambiarlos cuando tus costos suban o bajen.</p>
    </section>

    <form id="settingsForm" class="form-card form-grid">
      ${numberField("hourlyRate", "Mano de obra por hora", s.hourlyRate, "$", "Ej. 60")}
      ${numberField("wastePercent", "Merma", s.wastePercent, "%", "Ej. 10")}
      ${numberField("toolWearPercent", "Desgaste de herramientas", s.toolWearPercent, "%", "Ej. 5")}
      ${numberField("lightPerPiece", "Luz por pieza", s.lightPerPiece, "$", "Ej. 2")}
      ${numberField("packagingCost", "Empaque básico por pieza", s.packagingCost, "$", "Ej. 3")}
      ${numberField("minMargin", "Margen mínimo", s.minMargin, "%", "Ej. 40")}
      ${numberField("recommendedMargin", "Margen recomendado", s.recommendedMargin, "%", "Ej. 100")}
      ${numberField("premiumMargin", "Margen premium", s.premiumMargin, "%", "Ej. 150")}
      ${numberField("wholesaleDiscount", "Descuento mayoreo", s.wholesaleDiscount, "%", "Ej. 15")}
      ${numberField("defaultDeliveryDays", "Días de entrega sugeridos", s.defaultDeliveryDays, "días", "Ej. 2")}
      <button class="secondary-btn" type="submit">Guardar cambios</button>
    </form>

    <section class="section-title">
      <div>
        <h2>Respaldo</h2>
        <p>Guarda o restaura tus insumos, ajustes e historial.</p>
      </div>
    </section>

    <div class="actions-stack">
      <button class="ghost-btn" id="exportBtn" type="button">Exportar respaldo JSON</button>
      <label class="ghost-btn" style="display:grid;place-items:center;">
        Importar respaldo JSON
        <input id="importInput" type="file" accept="application/json" class="hidden" />
      </label>
      <button class="danger-btn" id="resetBtn" type="button">Reiniciar app a valores base</button>
    </div>
  `;

  view.querySelector("#settingsForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    Object.keys(DEFAULT_SETTINGS).forEach((key) => {
      if (key === "currency") return;
      state.settings[key] = sanitizeNumber(form.get(key), DEFAULT_SETTINGS[key]);
    });
    saveState();
    showToast("Configuración guardada");
    renderSettings();
  });

  view.querySelector("#exportBtn").addEventListener("click", exportBackup);
  view.querySelector("#importInput").addEventListener("change", importBackup);
  view.querySelector("#resetBtn").addEventListener("click", () => {
    if (!confirm("Esto borrará insumos, historial y ajustes. ¿Seguro que quieres reiniciar la app?")) return;
    state = createDefaultState();
    saveState();
    showToast("App reiniciada");
    renderHome();
  });
}

function renderCalculator(productKey, draft = null) {
  setView("calculator");
  activeProductKey = productKey;
  const product = PRODUCTS[productKey];
  const quote = draft || createQuoteDraft(productKey);
  const suggestedSupplies = getSuggestedSupplies(product.hints);

  view.innerHTML = `
    <section class="screen-title">
      <h1>Cotizar ${product.title.toLowerCase()}</h1>
      <p>${product.description}</p>
    </section>

    <form id="quoteForm" class="form-card form-grid">
      <div class="notice">
        Primero agrega los materiales que sí usarás. La app calcula el costo real considerando materiales, mano de obra, empaque, luz, merma y desgaste.
      </div>

      <div class="two-cols">
        ${product.fields.map((field) => renderProductField(field, quote.fields[field.id])).join("")}
      </div>

      <div class="field">
        <label for="difficulty">Dificultad</label>
        <select id="difficulty" name="difficulty">
          ${Object.entries(DIFFICULTY).map(([key, item]) => `<option value="${key}" ${quote.difficulty === key ? "selected" : ""}>${item.label} (+${item.percent}%)</option>`).join("")}
        </select>
      </div>

      <div class="field">
        <label>Materiales usados</label>
        <div id="materialsList" class="grid">
          ${quote.materials.map((mat, index) => renderMaterialRow(mat, index)).join("")}
        </div>
        <button class="ghost-btn" type="button" id="addMaterialBtn">+ Agregar material</button>
      </div>

      ${suggestedSupplies.length ? `
        <div class="notice">
          Recomendados para este producto: ${suggestedSupplies.map((s) => `<span class="kbd">${escapeHtml(s.name)}</span>`).join(" ")}
        </div>
      ` : ""}

      <div class="toggle-row">
        <span>¿Incluye empaque?</span>
        <label class="switch"><input type="checkbox" name="includePackaging" ${quote.includePackaging ? "checked" : ""}><span class="slider"></span></label>
      </div>

      <div class="toggle-row">
        <span>¿Es venta a mayoreo?</span>
        <label class="switch"><input type="checkbox" name="isWholesale" ${quote.isWholesale ? "checked" : ""}><span class="slider"></span></label>
      </div>

      <button class="primary-btn" type="submit">Calcular costo</button>
    </form>
  `;

  const form = view.querySelector("#quoteForm");

  view.querySelector("#addMaterialBtn").addEventListener("click", () => {
    syncQuoteFromForm(quote, form);
    quote.materials.push({ supplyId: state.supplies[0]?.id || "", amount: 1 });
    renderCalculator(productKey, quote);
  });

  view.querySelectorAll(".remove-material").forEach((btn) => {
    btn.addEventListener("click", () => {
      syncQuoteFromForm(quote, form);
      quote.materials.splice(Number(btn.dataset.index), 1);
      renderCalculator(productKey, quote);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    syncQuoteFromForm(quote, form);
    const result = calculateQuote(quote);
    lastResult = { quote, result };
    renderResult(quote, result);
  });
}

function renderProductField(field, value) {
  const label = `${field.label}${field.unit ? ` (${field.unit})` : ""}`;
  if (field.type === "select") {
    return `
      <div class="field">
        <label for="${field.id}">${label}</label>
        <select id="${field.id}" name="${field.id}">
          ${field.options.map((option) => `<option value="${escapeHtml(option)}" ${String(value) === option ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}
        </select>
      </div>
    `;
  }
  return `
    <div class="field">
      <label for="${field.id}">${label}</label>
      <input id="${field.id}" name="${field.id}" type="${field.type}" value="${escapeHtml(String(value ?? field.default ?? ""))}" min="0" step="any" />
    </div>
  `;
}

function renderMaterialRow(mat, rowIndex) {
  const index = cryptoId();
  const selectedId = mat.supplyId || state.supplies[0]?.id || "";
  return `
    <div class="material-row" data-material-row>
      <div class="field">
        <label>Insumo</label>
        <select name="materialSupply">
          ${state.supplies.map((s) => `<option value="${s.id}" ${s.id === selectedId ? "selected" : ""}>${escapeHtml(s.name)} · ${money(getUnitCost(s))}/${escapeHtml(s.unit)}</option>`).join("")}
        </select>
      </div>
      <div class="field">
        <label>Cantidad</label>
        <input name="materialAmount" type="number" min="0" step="any" value="${formatInput(mat.amount || 1)}" />
      </div>
      <button class="remove-material" type="button" aria-label="Quitar material" data-index="${rowIndex}">×</button>
    </div>
  `;
}

function renderResult(quote, result) {
  setView("calculator");
  const product = PRODUCTS[quote.productKey];
  const message = buildWhatsappMessage(quote, result);
  view.innerHTML = `
    <section class="screen-title">
      <h1>Resultado</h1>
      <p>${product.singular}</p>
    </section>

    <section class="result-card">
      <div class="summary-row"><span>Materiales</span><strong>${money(result.materialsCost)}</strong></div>
      <div class="summary-row"><span>Mano de obra</span><strong>${money(result.laborCost)}</strong></div>
      <div class="summary-row"><span>Dificultad</span><strong>${money(result.difficultyCost)}</strong></div>
      <div class="summary-row"><span>Costos extra</span><strong>${money(result.extrasCost)}</strong></div>
      <div class="summary-row"><span>Merma y desgaste</span><strong>${money(result.wasteCost + result.toolWearCost)}</strong></div>

      <div class="result-total">
        <div class="summary-row"><span>Costo real por lote</span><strong>${money(result.realTotal)}</strong></div>
        <div class="summary-row"><span>Costo real por pieza</span><strong>${money(result.realPerPiece)}</strong></div>
        <div class="summary-row"><span>Ganancia con precio recomendado</span><strong>${money(result.recommendedProfitTotal)}</strong></div>
      </div>

      <div class="price-grid">
        <div class="price-card"><small>Precio mínimo</small><strong>${money(result.minPrice)}</strong></div>
        <div class="price-card highlight"><small>Precio recomendado</small><strong>${money(result.recommendedPrice)}</strong></div>
        <div class="price-card"><small>Precio premium</small><strong>${money(result.premiumPrice)}</strong></div>
        <div class="price-card"><small>Mayoreo sugerido</small><strong>${money(result.wholesalePrice)}</strong></div>
      </div>

      <div class="message-preview" id="messagePreview">${escapeHtml(message)}</div>

      <div class="actions-row">
        <button class="ghost-btn" type="button" id="copyMessageBtn">Copiar mensaje</button>
        <button class="secondary-btn" type="button" id="saveQuoteBtn">Guardar</button>
      </div>
      <div class="actions-row">
        <button class="ghost-btn" type="button" id="editQuoteBtn">Editar</button>
        <button class="ghost-btn" type="button" id="newQuoteBtn">Nueva cotización</button>
      </div>
    </section>
  `;

  view.querySelector("#copyMessageBtn").addEventListener("click", () => copyText(message));
  view.querySelector("#saveQuoteBtn").addEventListener("click", () => saveQuoteToHistory(quote, result, message));
  view.querySelector("#editQuoteBtn").addEventListener("click", () => renderCalculator(quote.productKey, quote));
  view.querySelector("#newQuoteBtn").addEventListener("click", renderHome);
}

function renderHistory() {
  setView("history");
  const history = [...state.history].sort((a, b) => b.createdAt - a.createdAt);
  view.innerHTML = `
    <section class="screen-title">
      <h1>Historial</h1>
      <p>Consulta, copia o duplica cotizaciones guardadas.</p>
    </section>

    <section class="list-card">
      ${history.length ? history.map(renderHistoryItem).join("") : `<div class="empty">Todavía no tienes cotizaciones guardadas.</div>`}
    </section>

    ${history.length ? `<button class="danger-btn" style="margin-top:14px;" type="button" id="clearHistoryBtn">Vaciar historial</button>` : ""}
  `;

  view.querySelectorAll("[data-copy-history]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = state.history.find((h) => h.id === btn.dataset.copyHistory);
      if (item) copyText(item.message);
    });
  });

  view.querySelectorAll("[data-duplicate-history]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = state.history.find((h) => h.id === btn.dataset.duplicateHistory);
      if (item) renderCalculator(item.quote.productKey, structuredCloneSafe(item.quote));
    });
  });

  view.querySelectorAll("[data-delete-history]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.history = state.history.filter((h) => h.id !== btn.dataset.deleteHistory);
      saveState();
      renderHistory();
      showToast("Cotización eliminada");
    });
  });

  const clearHistoryBtn = view.querySelector("#clearHistoryBtn");
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", () => {
      if (!confirm("¿Vaciar todo el historial?")) return;
      state.history = [];
      saveState();
      renderHistory();
      showToast("Historial vacío");
    });
  }
}

function renderHistoryItem(item) {
  const product = PRODUCTS[item.quote.productKey];
  const date = new Date(item.createdAt).toLocaleString("es-MX", { dateStyle: "medium", timeStyle: "short" });
  return `
    <article class="history-item">
      <div class="item-top">
        <div>
          <div class="item-title">${escapeHtml(product?.singular || "Cotización")}</div>
          <div class="item-sub">${date} · ${item.quote.fields.quantity || 1} pza(s) · Recomendado ${money(item.result.recommendedPrice)}</div>
        </div>
        <span class="price-pill">Total ${money(item.result.recommendedTotal)}</span>
      </div>
      <div class="item-actions">
        <button class="small-btn accent" type="button" data-copy-history="${item.id}">Copiar</button>
        <button class="small-btn" type="button" data-duplicate-history="${item.id}">Duplicar</button>
        <button class="small-btn danger" type="button" data-delete-history="${item.id}">Eliminar</button>
      </div>
    </article>
  `;
}

function openSupplyModal(supply = null) {
  const editing = Boolean(supply);
  const item = supply || { name: "", category: "Otros", totalCost: "", purchasedQty: "", unit: "pza" };
  openModal(`
    <div class="modal-header">
      <h2>${editing ? "Editar insumo" : "Agregar insumo"}</h2>
      <button class="close-btn" type="button" data-close-modal>×</button>
    </div>
    <form id="supplyForm" class="form-grid">
      <div class="field">
        <label for="supplyName">Nombre del insumo</label>
        <input id="supplyName" name="name" type="text" value="${escapeHtml(item.name)}" placeholder="Ej. Cuentas acrílicas rojas" required />
      </div>
      <div class="two-cols">
        <div class="field">
          <label for="supplyCategory">Categoría</label>
          <select id="supplyCategory" name="category">
            ${CATEGORIES.filter((c) => c !== "Todos").map((c) => `<option value="${c}" ${item.category === c ? "selected" : ""}>${c}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label for="supplyUnit">Unidad</label>
          <select id="supplyUnit" name="unit">
            ${UNITS.map((u) => `<option value="${u}" ${item.unit === u ? "selected" : ""}>${u}</option>`).join("")}
          </select>
        </div>
      </div>
      <div class="two-cols">
        <div class="field">
          <label for="supplyTotalCost">Costo de compra ($)</label>
          <input id="supplyTotalCost" name="totalCost" type="number" min="0" step="any" value="${formatInput(item.totalCost)}" placeholder="Ej. 35" required />
        </div>
        <div class="field">
          <label for="supplyQty">Cantidad comprada</label>
          <input id="supplyQty" name="purchasedQty" type="number" min="0.0001" step="any" value="${formatInput(item.purchasedQty)}" placeholder="Ej. 100" required />
        </div>
      </div>
      <div class="notice" id="unitCostPreview">Costo unitario: ${money(getUnitCost(item))} / ${escapeHtml(item.unit || "pza")}</div>
      <button class="secondary-btn" type="submit">${editing ? "Guardar insumo" : "Agregar insumo"}</button>
    </form>
  `);

  const form = document.querySelector("#supplyForm");
  const preview = document.querySelector("#unitCostPreview");
  form.addEventListener("input", () => {
    const data = Object.fromEntries(new FormData(form));
    const unitCost = sanitizeNumber(data.totalCost, 0) / Math.max(sanitizeNumber(data.purchasedQty, 1), 0.0001);
    preview.textContent = `Costo unitario: ${money(unitCost)} / ${data.unit}`;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const saved = {
      id: supply?.id || cryptoId(),
      createdAt: supply?.createdAt || Date.now(),
      name: data.name.trim(),
      category: data.category,
      totalCost: sanitizeNumber(data.totalCost, 0),
      purchasedQty: Math.max(sanitizeNumber(data.purchasedQty, 1), 0.0001),
      unit: data.unit
    };

    if (editing) {
      state.supplies = state.supplies.map((s) => s.id === supply.id ? saved : s);
    } else {
      state.supplies.unshift(saved);
    }
    saveState();
    closeModal();
    renderSupplies();
    showToast(editing ? "Insumo actualizado" : "Insumo agregado");
  });
}

function openSupplyGuideModal() {
  const guide = [
    ["Pulseras", "Hilo encerado o elástico, cuentas, dijes, separadores, broches, argollas, bolsita, etiqueta."],
    ["Collares", "Cadena o hilo, broche, argollas, dijes, piedras, separadores, empaque y tarjeta de cuidado."],
    ["Aretes", "Ganchos, argollas, dijes, cuentas, piedras, topes de silicón, cartoncillo o tarjeta para montar."],
    ["Anillos", "Base ajustable, alambre, piedra, dije pequeño, pegamento, barniz o acabado protector."],
    ["Llaveros", "Argolla, cadena corta, dije, arcilla o resina, pintura, barniz, etiqueta y empaque."],
    ["Arcilla", "Arcilla, pintura acrílica, barniz, pegamento, lija, pinceles, herramienta de modelado, empaque."],
    ["Dibujos", "Papel, lápiz/color/marcador, tinta, impresión, mica, empaque rígido y tiempo de diseño."]
  ];

  openModal(`
    <div class="modal-header">
      <h2>Guía de insumos</h2>
      <button class="close-btn" type="button" data-close-modal>×</button>
    </div>
    <div class="form-grid">
      ${guide.map(([title, text]) => `
        <div class="notice"><strong>${title}:</strong> ${text}</div>
      `).join("")}
    </div>
  `);
}

function openModal(content) {
  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";
  backdrop.innerHTML = `<div class="modal">${content}</div>`;
  document.body.appendChild(backdrop);
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop || event.target.matches("[data-close-modal]")) closeModal();
  });
}

function closeModal() {
  document.querySelector(".modal-backdrop")?.remove();
}

function createQuoteDraft(productKey) {
  const product = PRODUCTS[productKey];
  const fields = {};
  product.fields.forEach((field) => {
    fields[field.id] = field.default;
  });

  return {
    id: cryptoId(),
    productKey,
    fields,
    difficulty: "media",
    materials: getStarterMaterials(product.hints),
    includePackaging: true,
    isWholesale: false
  };
}

function getStarterMaterials(hints) {
  const matched = getSuggestedSupplies(hints).slice(0, 3);
  const fallback = state.supplies.slice(0, 2);
  return (matched.length ? matched : fallback).map((s) => ({ supplyId: s.id, amount: 1 }));
}

function getSuggestedSupplies(hints) {
  return state.supplies.filter((s) => hints.includes(s.category));
}

function syncQuoteFromForm(quote, form) {
  const data = new FormData(form);
  const product = PRODUCTS[quote.productKey];
  product.fields.forEach((field) => {
    const raw = data.get(field.id);
    quote.fields[field.id] = field.type === "number" ? sanitizeNumber(raw, field.default || 0) : raw;
  });
  quote.difficulty = data.get("difficulty") || "media";
  quote.includePackaging = data.get("includePackaging") === "on";
  quote.isWholesale = data.get("isWholesale") === "on";

  const supplies = data.getAll("materialSupply");
  const amounts = data.getAll("materialAmount");
  quote.materials = supplies
    .map((supplyId, index) => ({ supplyId, amount: sanitizeNumber(amounts[index], 0) }))
    .filter((mat) => mat.supplyId && mat.amount > 0);
}

function calculateQuote(quote) {
  const settings = state.settings;
  const quantity = Math.max(sanitizeNumber(quote.fields.quantity || quote.fields.pairs, 1), 1);
  const workMinutes = Math.max(sanitizeNumber(quote.fields.workTime, 0), 0);
  const materialsCost = quote.materials.reduce((sum, mat) => {
    const supply = state.supplies.find((s) => s.id === mat.supplyId);
    return sum + (supply ? getUnitCost(supply) * mat.amount : 0);
  }, 0);

  const laborCost = (workMinutes / 60) * settings.hourlyRate;
  const difficultyPercent = DIFFICULTY[quote.difficulty]?.percent || 0;
  const difficultyCost = laborCost * (difficultyPercent / 100);
  const lightCost = settings.lightPerPiece * quantity;
  const packagingCost = quote.includePackaging ? settings.packagingCost * quantity : 0;
  const extrasCost = lightCost + packagingCost;
  const preSubtotal = materialsCost + laborCost + difficultyCost + extrasCost;
  const wasteCost = materialsCost * (settings.wastePercent / 100);
  const toolWearCost = preSubtotal * (settings.toolWearPercent / 100);
  const realTotal = preSubtotal + wasteCost + toolWearCost;
  const realPerPiece = realTotal / quantity;

  const minPrice = roundNice(realPerPiece * (1 + settings.minMargin / 100));
  const recommendedPrice = roundNice(realPerPiece * (1 + settings.recommendedMargin / 100));
  const premiumPrice = roundNice(realPerPiece * (1 + settings.premiumMargin / 100));
  const wholesalePrice = roundNice(recommendedPrice * (1 - settings.wholesaleDiscount / 100));
  const selectedUnitPrice = quote.isWholesale ? wholesalePrice : recommendedPrice;

  return {
    quantity,
    workMinutes,
    materialsCost,
    laborCost,
    difficultyCost,
    extrasCost,
    wasteCost,
    toolWearCost,
    realTotal,
    realPerPiece,
    minPrice,
    recommendedPrice,
    premiumPrice,
    wholesalePrice,
    selectedUnitPrice,
    recommendedTotal: recommendedPrice * quantity,
    selectedTotal: selectedUnitPrice * quantity,
    recommendedProfitTotal: (recommendedPrice * quantity) - realTotal
  };
}

function buildWhatsappMessage(quote, result) {
  const product = PRODUCTS[quote.productKey];
  const priceLabel = quote.isWholesale ? "Precio mayoreo" : "Precio unitario";
  return [
    `Cotización: ${product.singular}`,
    `Cantidad: ${result.quantity} pieza(s)`,
    `${priceLabel}: ${money(result.selectedUnitPrice)}`,
    `Total: ${money(result.selectedTotal)}`,
    `Tiempo estimado: ${state.settings.defaultDeliveryDays} día(s)`,
    "",
    "Gracias por valorar el trabajo artesanal."
  ].join("\n");
}

function saveQuoteToHistory(quote, result, message) {
  const entry = {
    id: cryptoId(),
    createdAt: Date.now(),
    quote: structuredCloneSafe(quote),
    result: structuredCloneSafe(result),
    message
  };
  state.history.unshift(entry);
  state.history = state.history.slice(0, 80);
  saveState();
  showToast("Cotización guardada");
}

function getUnitCost(supply) {
  return sanitizeNumber(supply.totalCost, 0) / Math.max(sanitizeNumber(supply.purchasedQty, 1), 0.0001);
}

function roundNice(value) {
  if (!Number.isFinite(value)) return 0;
  if (value <= 20) return Math.ceil(value);
  return Math.ceil(value / 5) * 5;
}

function money(value) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: state?.settings?.currency || "MXN",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2
  }).format(Number(value || 0));
}

function formatNumber(value) {
  return new Intl.NumberFormat("es-MX", { maximumFractionDigits: 4 }).format(Number(value || 0));
}

function formatInput(value) {
  if (value === "" || value === null || value === undefined) return "";
  return String(Number(value));
}

function sanitizeNumber(value, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function numberField(name, label, value, prefix = "", placeholder = "") {
  return `
    <div class="field">
      <label for="${name}">${label}</label>
      <input id="${name}" name="${name}" type="number" min="0" step="any" value="${formatInput(value)}" placeholder="${placeholder}" />
      ${prefix ? `<small class="item-sub">Valor en ${prefix}</small>` : ""}
    </div>
  `;
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultState();
    const parsed = JSON.parse(raw);
    return normalizeState(parsed);
  } catch (error) {
    console.warn("No se pudo cargar el estado local", error);
    return createDefaultState();
  }
}

function createDefaultState() {
  return {
    settings: { ...DEFAULT_SETTINGS },
    supplies: structuredCloneSafe(DEFAULT_SUPPLIES),
    history: []
  };
}

function normalizeState(input) {
  return {
    settings: { ...DEFAULT_SETTINGS, ...(input.settings || {}) },
    supplies: Array.isArray(input.supplies) && input.supplies.length ? input.supplies : structuredCloneSafe(DEFAULT_SUPPLIES),
    history: Array.isArray(input.history) ? input.history : []
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function exportBackup() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `manos-de-obra-respaldo-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("Respaldo exportado");
}

function importBackup(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      state = normalizeState(parsed);
      saveState();
      showToast("Respaldo importado");
      renderHome();
    } catch (error) {
      showToast("El archivo no es válido");
    }
  };
  reader.readAsText(file);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Mensaje copiado");
  } catch (error) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    showToast("Mensaje copiado");
  }
}

function showToast(message) {
  document.querySelector(".toast")?.remove();
  const template = document.querySelector("#toastTemplate");
  const toast = template.content.firstElementChild.cloneNode(true);
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2400);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cryptoId() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
  return `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function structuredCloneSafe(value) {
  if (globalThis.structuredClone) return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch((error) => {
      console.warn("No se pudo registrar el service worker", error);
    });
  });
}
