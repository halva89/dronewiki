/*
 * Каталог дронов (пока только whoop / tiny-whoop) и комплектующих.
 * Структура: window.DRONE_DATA = { sizes, brands, drones, components }
 */
window.DRONE_DATA = {

  /* ---- Категории размеров ---- */
  sizes: [
    { id: "65mm",   label: "65 мм",            propRange: "30–40 мм (1,2\"–1,6\")", note: "Самые компактные tiny-whoop (например Air65, Meteor65)." },
    { id: "75mm",   label: "75 мм",            propRange: "40 мм (1,6\")",          note: "Золотая середина современных тупиков (Air75, Meteor75, Pavo Pico)." },
    { id: "80mm",   label: "80 мм",            propRange: "1,8\"–2\"",              note: "Переходный формат (Pavo20, Pavo20+ с 2\" пропеллерами)." },
    { id: "110mm",  label: "110 мм",           propRange: "2,5\" (иногда 2\")",     note: "Классические whoop-рамки 110 мм (H74/H78 в широких конфигурациях, BfV)." },
    { id: "120mm",  label: "120 мм",           propRange: "2,5\" (3\" в длинных рамках)", note: "Дальнобойные long-range whoop (Air120, Meteor80 Pro в 3\" — пограничный)." },
    { id: "1inch",  label: "Дюймовки (1\")",   propRange: "25–31 мм (1\")",         note: "Стандарт индустрии для крошечных тупиков (Meteor65, Cetus/Maverick)." },
    { id: "2inch",  label: "2 дюйма (2\")",    propRange: "~50 мм",                 note: "Твинсеры и лёгкие whoop-фреймы (Pavo20, Mobula6 2\"-конфигурации)." },
    { id: "3inch",  label: "3 дюйма (3\")",    propRange: "~75 мм",                 note: "Полноразмерные тупики на защищённых рамках (Meteor80, Pavo Pico LS)." },
    { id: "dji",    label: "DJI размеры",      propRange: "Кастомные (Avata: 5\", «инчи» у Neo)", note: "Проприетарные форматы DJI: Avata/Avata 2 (5\" трибладей), Neo (36 мм), FPV Combo (5\")." }
  ],

  /* ---- Бренды ---- */
  brands: [
    { id: "happymodel", name: "HappyModel", full: "HappyModel / GEPRC", country: "Китай", site: "https://www.happymodel.cn", desc: "Один из лидеров сегмента tiny-whoop: линейки Mobula, Mantis, Pluma." },
    { id: "betafpv",    name: "BetaFPV",    full: "BetaFPV",            country: "Китай", site: "https://betafpv.com",           desc: "Изобретатель формата Meteor/Cetus/Pavo; огромная экосистема аксессуаров." },
    { id: "dji",        name: "DJI",        full: "DJI",                country: "Китай", site: "https://www.dji.com",           desc: "Готовые HD/цифровые FPV-решения: Neo, Avata, FPV Combo — всё в одном." }
  ],

  /* ---- Дроны (только whoop / tiny-whoop) ---- */
  drones: [
    /* ===== HappyModel ===== */
    {
      brand: "happymodel", name: "Mobula6 (2023)", category: "tiny-whoop",
      sizes: ["65mm", "1inch"],
      frame: "65 мм рама, защита пропеллеров", props: '1"',
      weight: "~20 г (без батареи)", battery: "1S HV 300 мАч", vtx: "аналог 25 мВт",
      features: ["Минимальный размер", "Отличный полётный контроллер", "Поддержка ELRS/FlySky версий"],
      priceRub: "≈ 9 500 ₽", status: "В продаже"
    },
    {
      brand: "happymodel", name: "Mobula7", category: "tiny-whoop",
      sizes: ["75mm", "1inch"],
      frame: "75 мм рама, дуги защиты", props: '1,6"',
      weight: "~28 г", battery: "1S HV 300–450 мАч", vtx: "аналог 25–200 мВт",
      features: ["Более мощный, чем Mobula6", "Уверенно держит ветер", "Есть ELRS-версия"],
      priceRub: "≈ 11 500 ₽", status: "В продаже"
    },
    {
      brand: "happymodel", name: "Mantis8", category: "whoop",
      sizes: ["80mm", "2inch"],
      frame: "80 мм whoop-рама", props: '2"',
      weight: "~45 г", battery: "1S 450–650 мАч", vtx: "аналог",
      features: ["Закрытая защита пропеллеров", "Хорош для дома и улицы"],
      priceRub: "≈ 13 000 ₽", status: "Снят с производства (запчасти доступны)"
    },
    {
      brand: "happymodel", name: "Pluma 1S 65", category: "longrange-whoop",
      sizes: ["65mm", "1inch"],
      frame: "65 мм тонкая рамка", props: '1"',
      weight: "~15 г", battery: "1S 300 мАч", vtx: "аналог",
      features: ["Ультралёгкий", "Дальние полёты на 1S"],
      priceRub: "≈ 8 500 ₽", status: "Нишевый"
    },

    /* ===== BetaFPV ===== */
    {
      brand: "betafpv", name: "Air65", category: "tiny-whoop",
      sizes: ["65mm", "1inch"],
      frame: "65 мм, съёмные дуги", props: '1,2" Gemfan 1210',
      weight: "~18 г", battery: "1S HV 300 мАч", vtx: "аналог / HDZero-версии",
      features: ["Легендарный городской whoop", "ELRS 2.4 ГГц", "Огромный выбор запчастей"],
      priceRub: "≈ 10 000 ₽", status: "В продаже"
    },
    {
      brand: "betafpv", name: "Air75", category: "tiny-whoop",
      sizes: ["75mm", "1inch"],
      frame: "75 мм", props: '1,6" Gemfan 1508',
      weight: "~25 г", battery: "1S HV 300–450 мАч", vtx: "аналог 25–200 мВт",
      features: ["Сбалансированный", "Версии Lite / Pro / HDZero", "ELRS или FlySky"],
      priceRub: "≈ 12 000 ₽", status: "В продаже"
    },
    {
      brand: "betafpv", name: "Meteor65", category: "tiny-whoop",
      sizes: ["65mm", "1inch"],
      frame: "65 мм, закрытый canopy", props: '1" Gemfan 1210',
      weight: "~20 г", battery: "1S 300 мАч", vtx: "аналог",
      features: ["Классика жанра", "Бюджетный", "Подходит новичкам"],
      priceRub: "≈ 8 000 ₽", status: "В продаже"
    },
    {
      brand: "betafpv", name: "Meteor75 (Pro)", category: "tiny-whoop",
      sizes: ["75mm", "1inch"],
      frame: "75 мм", props: '1,6"',
      weight: "~26 г", battery: "1S HV 300–450 мАч", vtx: "аналог / Walksnail HD",
      features: ["Народный whoop", "Много модификаций", "HD-видео версии"],
      priceRub: "≈ 11 000 ₽", status: "В продаже"
    },
    {
      brand: "betafpv", name: "Pavo Pico", category: "whoop",
      sizes: ["75mm", "1inch"],
      frame: "75 мм closed-frame", props: '1,6"',
      weight: "~35 г (с камерой)", battery: "1S HV 450 мАч", vtx: "Walksnail HD / аналог",
      features: ["HD-камера в комплекте", "Для cinewhoop-начинающих"],
      priceRub: "≈ 16 000 ₽", status: "В продаже"
    },
    {
      brand: "betafpv", name: "Pavo20 / Pavo20+", category: "whoop",
      sizes: ["80mm", "2inch"],
      frame: "80 мм closed-frame", props: '2"',
      weight: "~55–70 г", battery: "2S 530–650 мАч", vtx: "аналог / HDZero / Walksnail",
      features: ["Стабильная камера", "Для съёмки в помещениях"],
      priceRub: "≈ 20 000 ₽", status: "В продаже"
    },
    {
      brand: "betafpv", name: "Cetus X (комплект)", category: "tiny-whoop-kit",
      sizes: ["65mm", "1inch"],
      frame: "65 мм, полная защита", props: '1"',
      weight: "~22 г", battery: "1S 300 мАч ×2", vtx: "аналог",
      features: ["BNRT-набор с пультом и очками", "Идеален для старта"],
      priceRub: "≈ 18 000 ₽ (комплект)", status: "В продаже"
    },
    {
      brand: "betafpv", name: "Maveric 2 (комплект)", category: "tiny-whoop-kit",
      sizes: ["75mm", "1inch"],
      frame: "75 мм", props: '1,6"',
      weight: "~30 г", battery: "1S HV 300 мАч ×2", vtx: "аналог",
      features: ["Комплект с radio-пультом LVDT и очками VR100"],
      priceRub: "≈ 25 000 ₽ (комплект)", status: "В продаже"
    },

    /* ===== DJI ===== */
    {
      brand: "dji", name: "DJI Neo", category: "micro-whoop-like",
      sizes: ["dji", "3inch"],
      frame: "Кастомная рамка DJI, встроенная защита", props: "3\" (встроенные)",
      weight: "~135 г", battery: "Встроенная (~18 мин)", vtx: "Цифровой OcuSync / Wi-Fi",
      features: ["Запуск с ладони", "Автономные режимы съёмки", "Нет классического FPV-пульта"],
      priceRub: "≈ 25 000 ₽", status: "В продаже"
    },
    {
      brand: "dji", name: "DJI Avata", category: "whoop-cinewhoop",
      sizes: ["dji", "3inch"],
      frame: "Интегрированный корпус с защитой", props: "5\" трибладей",
      weight: "~410 г", battery: "Интеллектуальный аккумулятор 1800 мАч", vtx: "Цифровой OcuSync",
      features: ["Complete FPV-экосистема (очки + пульт)", "Отличная стабилизация", "Закрытая защита винтов"],
      priceRub: "≈ 70 000 ₽ (Fly More Combo)", status: "Снят с продажи (запчасти живые)"
    },
    {
      brand: "dji", name: "DJI Avata 2", category: "whoop-cinewhoop",
      sizes: ["dji", "3inch"],
      frame: "Интегрированный корпус с защитой", props: "5\" трибладей",
      weight: "~377 г", battery: "Интеллектуальный аккумулятор", vtx: "Цифровой O3/O4",
      features: ["4K видео", "Обновлённая экосистема Goggles 3 + Motion Controller"],
      priceRub: "≈ 90 000 ₽ (Fly More Combo)", status: "В продаже"
    },
    {
      brand: "dji", name: "DJI FPV Combo", category: "freestyle-hybrid",
      sizes: ["dji"],
      frame: "Полноразмерный дрон с защитой (не whoop)", props: "5\"",
      weight: "~740 г", battery: "Интеллектуальный 2000 мАч", vtx: "Цифровой OcuSync",
      features: ["Высокая скорость до 140 км/ч", "Goggles 2 + пульт"],
      priceRub: "≈ 100 000 ₽", status: "Снят с продажи"
    }
  ],

  /* ---- Комплектующие (для будущих разделов) ---- */
  components: [
    { type: "frame",    name: "Рамка 65 мм (Gemfan / BetaFPV)", sizes: ["65mm", "1inch"] },
    { type: "frame",    name: "Рамка 75 мм (Air75 / Meteor75)", sizes: ["75mm", "1inch"] },
    { type: "frame",    name: "Canopy (тент) для whoop",        sizes: ["65mm", "75mm", "80mm"] },
    { type: "motor",    name: "Мотор 0702 / 0802 (1S)",          sizes: ["65mm", "75mm", "1inch"] },
    { type: "motor",    name: "Мотор 1103 / 1104 (2S)",          sizes: ["80mm", "2inch", "3inch"] },
    { type: "prop",     name: "Пропеллер 1210 / 1404 (1\")",     sizes: ["65mm", "1inch"] },
    { type: "prop",     name: "Пропеллер 1508 / 1608 (1,6\")",   sizes: ["75mm", "1inch"] },
    { type: "prop",     name: "Пропеллер 2\" (Gemfan 2016)",     sizes: ["80mm", "2inch"] },
    { type: "battery",  name: "Аккумулятор 1S HV 300–450 мАч",   sizes: ["65mm", "75mm", "1inch"] },
    { type: "battery",  name: "Аккумулятор 2S 450–650 мАч",      sizes: ["80mm", "2inch"] },
    { type: "fc",       name: "Полётный контроллер 1S AIO",      sizes: ["65mm", "75mm", "1inch"] },
    { type: "vtx",      name: "Видеопередатчик аналоговый 25–200 мВт", sizes: ["65mm","75mm","80mm","1inch","2inch"] },
    { type: "rx",       name: "Приёмник ELRS 2.4 ГГц",           sizes: ["65mm","75mm","80mm","110mm","120mm","1inch","2inch","3inch"] }
  ]
};
