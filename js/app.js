/* DronWiki — SPA с хеш-роутингом.
 * Маршруты:
 *  #/                       — главная
 *  #/brands                 — список брендов
 *  #/brand/:id              — бренд, внутри разделы по размерам
 *  #/brand/:id/:sizeId      — дроны бренда конкретного размера
 *  #/sizes                  — список размеров
 *  #/size/:id               — размер, внутри разделы по брендам
 *  #/size/:id/:brandId      — дроны размера конкретного бренда
 *  #/drone/:brandId/:name   — карточка дрона
 *  #/components             — комплектующие (фильтр по размеру)
 *  #/compare                — сравнение всех дронов в таблице
 */
(function () {
  const DATA = window.DRONE_DATA;
  const app = document.getElementById("app");

  /* ---------- helpers ---------- */
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const slug = name => encodeURIComponent(name);
  const unslug = s => decodeURIComponent(s);

  const getBrand = id => DATA.brands.find(b => b.id === id);
  const getSize  = id => DATA.sizes.find(s => s.id === id);
  const getDrone = (brandId, name) => DATA.drones.find(d => d.brand === brandId && d.name === name);

  const dronesByBrand = id => DATA.drones.filter(d => d.brand === id);
  const dronesBySize  = id => DATA.drones.filter(d => d.sizes.includes(id));
  const brandsOfDroneSizes = d => d.sizes;

  function breadcrumb(parts) {
    return '<div class="breadcrumbs">' + parts.map(p =>
      p.href ? `<a href="${p.href}">${esc(p.label)}</a>` : `<span>${esc(p.label)}</span>`
    ).join(" / ") + "</div>";
  }

  function sizeBadges(d) {
    return d.sizes.map(sid => {
      const s = getSize(sid);
      return `<a class="badge size" href="#/size/${sid}">${esc(s ? s.label : sid)}</a>`;
    }).join("");
  }
  function brandBadge(d) {
    const b = getBrand(d.brand);
    return `<a class="badge brand" href="#/brand/${d.brand}">${esc(b ? b.name : d.brand)}</a>`;
  }

  function droneCard(d) {
    const b = getBrand(d.brand);
    return `
      <div class="card">
        <h3>${esc(d.name)}</h3>
        <div class="sub">${esc(b ? b.name : "")} · ${esc(d.category)}</div>
        <div>${brandBadge(d)}${sizeBadges(d)}</div>
        <p class="sub">Пропы: ${esc(d.props)} · Вес: ${esc(d.weight)} · ${esc(d.priceRub)}</p>
        <a class="more" href="#/drone/${d.brand}/${slug(d.name)}">Подробнее →</a>
      </div>`;
  }

  function emptyNote(text) { return `<p class="empty">${esc(text)}</p>`; }

  /* ---------- pages ---------- */

  function pageHome() {
    const totalDrones = DATA.drones.length;
    return `
      <section class="hero">
        <h1>Подбор дронов и комплектующих</h1>
        <p>Каталог whoop и tiny-whoop дронов от <b>HappyModel</b>, <b>BetaFPV</b> и <b>DJI</b>.
        Фильтруйте по бренду или размеру: 65 мм, 75 мм, 80 мм, 110 мм, 120 мм, дюймовки (1"), 2", 3" и фирменные размеры DJI.
        Сейчас в базе <b>${totalDrones}</b> моделей; раздел комплектующих готовится.</p>
      </section>

      <h2 class="section-title">Бренды</h2>
      <div class="grid cols-3">
        ${DATA.brands.map(b => `
          <div class="card">
            <h3>${esc(b.name)}</h3>
            <div class="sub">${esc(b.desc)}</div>
            <p><a class="more" href="#/brand/${b.id}">Модели (${dronesByBrand(b.id).length}) →</a></p>
          </div>`).join("")}
      </div>

      <h2 class="section-title">Размеры</h2>
      <div class="grid cols-3">
        ${DATA.sizes.map(s => `
          <div class="card">
            <h3>${esc(s.label)}</h3>
            <div class="sub">${esc(s.propRange)}</div>
            <p>${esc(s.note)}</p>
            <p><a class="more" href="#/size/${s.id}">Модели (${dronesBySize(s.id).length}) →</a></p>
          </div>`).join("")}
      </div>
    `;
  }

  function pageBrands() {
    return breadcrumb([{ label: "Главная", href: "#/" }, { label: "Бренды" }]) + `
      <h2 class="section-title">Бренды</h2>
      <div class="grid cols-3">
        ${DATA.brands.map(b => `
          <div class="card">
            <h3>${esc(b.name)}</h3>
            <div class="sub">${esc(b.full)} · ${esc(b.country)}</div>
            <p>${esc(b.desc)}</p>
            <p>${DATA.sizes.filter(s => dronesByBrand(b.id).some(d => d.sizes.includes(s.id)))
                .map(s => `<a class="badge size" href="#/brand/${b.id}/${s.id}">${esc(s.label)}</a>`).join("")}</p>
            <p><a class="more" href="#/brand/${b.id}">Все модели (${dronesByBrand(b.id).length}) →</a></p>
          </div>`).join("")}
      </div>`;
  }

  /* Бренд → разделы по размерам */
  function pageBrand(brandId, sizeId) {
    const b = getBrand(brandId);
    if (!b) return emptyNote("Бренд не найден.");
    let list = dronesByBrand(brandId);

    if (sizeId) {
      const s = getSize(sizeId);
      if (!s) return emptyNote("Размер не найден.");
      list = list.filter(d => d.sizes.includes(sizeId));
      return breadcrumb([
        { label: "Главная", href: "#/" },
        { label: "Бренды", href: "#/brands" },
        { label: b.name, href: `#/brand/${b.id}` },
        { label: s.label }
      ]) + `<h2 class="section-title">${esc(b.name)} — ${esc(s.label)}</h2>` +
        (list.length ? `<div class="grid cols-3">${list.map(droneCard).join("")}</div>` :
          emptyNote("В этом размере у бренда пока нет моделей."));
    }

    return breadcrumb([
      { label: "Главная", href: "#/" },
      { label: "Бренды", href: "#/brands" },
      { label: b.name }
    ]) + `
      <h2 class="section-title">${esc(b.name)}</h2>
      <p class="sub">${esc(b.desc)} <a href="${b.site}" target="_blank" rel="noopener">Официальный сайт ↗</a></p>
      ${DATA.sizes.map(s => {
        const inSize = list.filter(d => d.sizes.includes(s.id));
        if (!inSize.length) return "";
        return `
          <h3 style="margin-top:24px"><a href="#/brand/${b.id}/${s.id}" style="color:var(--accent)">${esc(s.label)}</a>
             <span class="sub">(${inSize.length})</span></h3>
          <div class="grid cols-3">${inSize.map(droneCard).join("")}</div>`;
      }).join("")}`;
  }

  function pageSizes() {
    return breadcrumb([{ label: "Главная", href: "#/" }, { label: "Размеры" }]) + `
      <h2 class="section-title">Размеры</h2>
      <div class="grid cols-2">
        ${DATA.sizes.map(s => `
          <div class="card">
            <h3>${esc(s.label)}</h3>
            <div class="sub">Пропеллеры: ${esc(s.propRange)}</div>
            <p>${esc(s.note)}</p>
            <p>${DATA.brands.filter(b => dronesBySize(s.id).some(d => d.brand === b.id))
                .map(b => `<a class="badge brand" href="#/size/${s.id}/${b.id}">${esc(b.name)}</a>`).join("")}</p>
            <p><a class="more" href="#/size/${s.id}">Все модели (${dronesBySize(s.id).length}) →</a></p>
          </div>`).join("")}
      </div>`;
  }

  /* Размер → разделы по брендам */
  function pageSize(sizeId, brandId) {
    const s = getSize(sizeId);
    if (!s) return emptyNote("Размер не найден.");
    let list = dronesBySize(sizeId);

    if (brandId) {
      const b = getBrand(brandId);
      if (!b) return emptyNote("Бренд не найден.");
      list = list.filter(d => d.brand === brandId);
      return breadcrumb([
        { label: "Главная", href: "#/" },
        { label: "Размеры", href: "#/sizes" },
        { label: s.label, href: `#/size/${s.id}` },
        { label: b.name }
      ]) + `<h2 class="section-title">${esc(s.label)} — ${esc(b.name)}</h2>` +
        (list.length ? `<div class="grid cols-3">${list.map(droneCard).join("")}</div>` :
          emptyNote("У этого бренда в данном размере пока нет моделей."));
    }

    return breadcrumb([
      { label: "Главная", href: "#/" },
      { label: "Размеры", href: "#/sizes" },
      { label: s.label }
    ]) + `
      <h2 class="section-title">${esc(s.label)}</h2>
      <p class="sub">Пропеллеры: ${esc(s.propRange)}. ${esc(s.note)}</p>
      ${DATA.brands.map(b => {
        const inBrand = list.filter(d => d.brand === b.id);
        if (!inBrand.length) return "";
        return `
          <h3 style="margin-top:24px"><a href="#/size/${s.id}/${b.id}" style="color:var(--accent-2)">${esc(b.name)}</a>
             <span class="sub">(${inBrand.length})</span></h3>
          <div class="grid cols-3">${inBrand.map(droneCard).join("")}</div>`;
      }).join("")}`;
  }

  function pageDrone(brandId, name) {
    const d = getDrone(brandId, unslug(name));
    if (!d) return emptyNote("Дрон не найден.");
    const b = getBrand(d.brand);
    return breadcrumb([
      { label: "Главная", href: "#/" },
      { label: b.name, href: `#/brand/${b.id}` },
      { label: d.name }
    ]) + `
      <h2 class="section-title">${esc(d.name)}</h2>
      <div>${brandBadge(d)}${sizeBadges(d)}<span class="badge">${esc(d.category)}</span><span class="badge">${esc(d.status)}</span></div>
      <table class="spec-table">
        <tr><th>Рама</th><td>${esc(d.frame)}</td></tr>
        <tr><th>Пропеллеры</th><td>${esc(d.props)}</td></tr>
        <tr><th>Вес</th><td>${esc(d.weight)}</td></tr>
        <tr><th>Аккумулятор</th><td>${esc(d.battery)}</td></tr>
        <tr><th>Видеосистема</th><td>${esc(d.vtx)}</td></tr>
        <tr><th>Цена</th><td>${esc(d.priceRub)}</td></tr>
        <tr><th>Особенности</th><td><ul style="margin:0;padding-left:18px">${d.features.map(f => `<li>${esc(f)}</li>`).join("")}</ul></td></tr>
      </table>
      <p><a class="more" href="#/brand/${b.id}">← Все модели ${esc(b.name)}</a></p>`;
  }

  function pageComponents(activeSize) {
    const typeNames = { frame: "Рамы и canopy", motor: "Моторы", prop: "Пропеллеры", battery: "Аккумуляторы", fc: "Полётные контроллеры", vtx: "Видеосистемы", rx: "Приёмники управления" };
    const list = activeSize ? DATA.components.filter(c => c.sizes.includes(activeSize)) : DATA.components;
    return breadcrumb([{ label: "Главная", href: "#/" }, { label: "Комплектующие" }]) + `
      <h2 class="section-title">Комплектующие</h2>
      <p class="sub">Раздел в разработке: каталог запчастей для 1", 2" и 3" дронов. Фильтр по размеру уже работает.</p>
      <div class="filter-bar">
        <button class="chip ${!activeSize ? "active" : ""}" onclick="location.hash='#/components'">Все</button>
        ${DATA.sizes.map(s => `<a class="chip ${activeSize === s.id ? "active" : ""}" href="#/components/${s.id}">${esc(s.label)}</a>`).join("")}
      </div>
      ${Object.keys(typeNames).map(t => {
        const items = list.filter(c => c.type === t);
        if (!items.length) return "";
        return `<h3 style="margin-top:20px">${typeNames[t]}</h3>
          <div class="grid cols-3">${items.map(c => `
            <div class="card"><h3>${esc(c.name)}</h3>
            <div>${c.sizes.map(sid => { const s = getSize(sid); return `<a class="badge size" href="#/size/${sid}">${esc(s.label)}</a>`; }).join("")}</div>
            </div>`).join("")}</div>`;
      }).join("")}`;
  }

  function pageCompare() {
    return breadcrumb([{ label: "Главная", href: "#/" }, { label: "Сравнение" }]) + `
      <h2 class="section-title">Сравнение всех моделей</h2>
      <input type="search" id="q" placeholder="Поиск по названию…" oninput="window.__renderTable(this.value)">
      <div style="overflow-x:auto">
      <table class="spec-table" id="cmp">
        <thead><tr><th>Модель</th><th>Бренд</th><th>Размеры</th><th>Пропы</th><th>Вес</th><th>Батарея</th><th>Видео</th><th>Цена</th></tr></thead>
        <tbody>${DATA.drones.map(d => `<tr data-name="${esc(d.name.toLowerCase())}">
          <td><a href="#/drone/${d.brand}/${slug(d.name)}" style="color:var(--accent)">${esc(d.name)}</a></td>
          <td>${esc(getBrand(d.brand).name)}</td>
          <td>${d.sizes.map(s => esc(getSize(s).label)).join(", ")}</td>
          <td>${esc(d.props)}</td><td>${esc(d.weight)}</td><td>${esc(d.battery)}</td><td>${esc(d.vtx)}</td><td>${esc(d.priceRub)}</td>
        </tr>`).join("")}</tbody>
      </table></div>`;
  }

  window.__renderTable = function (q) {
    q = q.trim().toLowerCase();
    document.querySelectorAll("#cmp tbody tr").forEach(tr => {
      tr.style.display = !q || tr.dataset.name.includes(q) ? "" : "none";
    });
  };

  /* ---------- router ---------- */
  function route() {
    const hash = location.hash.replace(/^#\/?/, "");
    const parts = hash.split("/").filter(Boolean);
    window.scrollTo(0, 0);

    // подсветка навигации
    document.querySelectorAll(".main-nav a").forEach(a => {
      a.classList.toggle("active", hash.startsWith(a.getAttribute("href").slice(1)));
    });

    if (parts.length === 0)                     return pageHome();
    if (parts[0] === "brands")                  return pageBrands();
    if (parts[0] === "brand")                   return pageBrand(parts[1], parts[2]);
    if (parts[0] === "sizes")                   return pageSizes();
    if (parts[0] === "size")                    return pageSize(parts[1], parts[2]);
    if (parts[0] === "drone")                   return pageDrone(parts[1], parts[2] || "");
    if (parts[0] === "components")              return pageComponents(parts[1]);
    if (parts[0] === "compare")                 return pageCompare();
    return emptyNote("Страница не найдена.");
  }

  window.addEventListener("hashchange", render);
  function render() { app.innerHTML = route(); }
  render();
})();
