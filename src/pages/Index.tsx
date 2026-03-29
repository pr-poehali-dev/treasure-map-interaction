import { useState } from "react";

interface Step {
  id: number;
  title: string;
  description: string;
  emoji: string;
  x: number;
  y: number;
}

const steps: Step[] = [
  { id: 1,  title: "Начало пути",        description: "Ты просыпаешься на берегу неизвестного острова. Солёный ветер треплет твои волосы, а в руках — старая карта с загадочными пометками. Великое приключение начинается!", emoji: "🏖️", x: 8, y: 75 },
  { id: 2,  title: "Таверна «Мёртвый якорь»", description: "Скрипучая дверь таверны открывается. Одноглазый хозяин кивает и шёпотом говорит: «Тебя ждут в дальнем углу». За столом сидит старый пират с ещё одним куском карты!", emoji: "🍺", x: 18, y: 58 },
  { id: 3,  title: "Загадка маяка",       description: "На вершине маяка найдена шкатулка с шифром. Три символа — череп, якорь, компас. Ты вводишь правильный порядок и слышишь щелчок замка. Внутри — ключ.", emoji: "🗼", x: 28, y: 40 },
  { id: 4,  title: "Коралловый риф",      description: "Под водой мерцают тысячи рыб. Среди кораллов ты замечаешь бронзовую таблицу с координатами. Но рядом кружит акула...", emoji: "🐠", x: 38, y: 55 },
  { id: 5,  title: "Заброшенный корабль", description: "«Морская ведьма» — так написано на борту разбитого галеона. В трюме сохранился корабельный журнал. Последняя запись: «Сокровище спрятано там, где восходит двойное солнце».", emoji: "⚓", x: 48, y: 35 },
  { id: 6,  title: "Пещера летучих мышей", description: "Тысячи крыльев взлетают в темноте. Факел освещает наскальные рисунки — карту подземных тоннелей. Один путь ведёт к свету, остальные — в никуда.", emoji: "🦇", x: 58, y: 50 },
  { id: 7,  title: "Деревня туземцев",    description: "Вождь племени встречает тебя у костра. Испытание трёх загадок — только ответив верно, ты получишь разрешение пройти через священные земли.", emoji: "🌴", x: 68, y: 68 },
  { id: 8,  title: "Гора Дракона",        description: "Склон горы усеян костями прежних искателей приключений. На вершине — огромный камень в форме дракона. Под его левой лапой скрыт вход в пещеру.", emoji: "🐉", x: 78, y: 48 },
  { id: 9,  title: "Подземное озеро",     description: "Кристально чистое озеро светится голубым светом. На острове посреди воды стоит сундук. Но мост разрушен — нужно найти лодку или другой путь.", emoji: "💧", x: 85, y: 30 },
  { id: 10, title: "Храм Нептуна",        description: "Величественные колонны уходят в небо. На алтаре лежит золотой трезубец. Надпись гласит: «Только достойный может взять это оружие».", emoji: "🔱", x: 72, y: 18 },
  { id: 11, title: "Башня с часами",      description: "Старинные часы остановились ровно в полночь. Чтобы открыть потайную дверь, нужно перевести стрелки на правильное время, указанное в корабельном журнале.", emoji: "🕰️", x: 58, y: 20 },
  { id: 12, title: "Логово пиратов",      description: "Банда Железного Крюка преграждает путь. Капитан предлагает сделку: карту в обмен на половину сокровища. Принять или попробовать перехитрить их?", emoji: "⚔️", x: 45, y: 15 },
  { id: 13, title: "Секретная бухта",     description: "Спрятанная за скалами бухта — идеальное укрытие. Здесь стоит небольшой корабль с поднятыми парусами. На борту — верная команда, готовая плыть к финальному острову.", emoji: "🚢", x: 32, y: 22 },
  { id: 14, title: "Шторм в открытом море", description: "Волны высотой с дом бьют в борт корабля. Молния освещает курс — прямо по курсу скалы! Только опытный штурман сможет провести судно через этот ад.", emoji: "⛈️", x: 20, y: 35 },
  { id: 15, title: "Остров Призраков",    description: "Туман скрывает берега проклятого острова. Призраки бывших пиратов шепчут подсказки и угрозы. Лишь тот, кто не поддастся страху, найдёт финальный знак.", emoji: "👻", x: 15, y: 52 },
  { id: 16, title: "Подводный город",     description: "Легендарный Атлантис существует! В руинах древнего города хранится последний фрагмент карты. Осьминог-страж требует решить его загадку.", emoji: "🏛️", x: 25, y: 68 },
  { id: 17, title: "Вулканический остров", description: "Земля дрожит под ногами. Лава течёт по склонам. В самом центре кратера, на каменном пьедестале — золотой компас, указывающий прямо к сокровищу!", emoji: "🌋", x: 38, y: 78 },
  { id: 18, title: "Тёмный лес",          description: "Деревья настолько высоки, что скрывают солнце. В чаще живёт мудрая черепаха, которая помнит всё. Она согласна рассказать последнюю тайну в обмен на рассказ о твоих приключениях.", emoji: "🐢", x: 52, y: 82 },
  { id: 19, title: "Золотые ворота",      description: "Огромные ворота из чистого золота преграждают путь. Семь замков — семь испытаний пройдено. Каждый ключ из прошлых приключений открывает один замок.", emoji: "🗝️", x: 65, y: 75 },
  { id: 20, title: "Сокровищница!",       description: "ТЫ НАШЁЛ ЕГО! Огромный зал заполнен золотыми монетами, драгоценными камнями и артефактами тысяч цивилизаций. В центре — сундук с главным сокровищем: картой к ещё большему приключению... 🏴‍☠️", emoji: "💰", x: 78, y: 82 },
];

// Генерируем плавный SVG path через кубические bezier-кривые
function buildCurvePath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const tension = 0.4;
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x} ${p2.y}`;
  }
  return d;
}

const curvePath = buildCurvePath(steps.map(s => ({ x: s.x, y: s.y })));

export default function Index() {
  const [activeStep, setActiveStep] = useState<Step | null>(null);

  return (
    <div className="min-h-screen bg-ink overflow-hidden relative" style={{ fontFamily: "Merriweather, serif" }}>
      {/* Фоновая текстура пергамента */}
      <div
        className="min-h-screen relative"
        style={{
          background: "radial-gradient(ellipse at 20% 20%, #c9a96e 0%, #e8d4a0 30%, #f4e4c1 55%, #e8d4a0 75%, #c9a96e 100%)",
        }}
      >
        {/* Зернистая текстура */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
            opacity: 0.6,
          }}
        />

        {/* Обожжённые края */}
        <div className="absolute inset-0 pointer-events-none" style={{
          boxShadow: "inset 0 0 80px 40px rgba(44,24,16,0.55), inset 0 0 200px 80px rgba(44,24,16,0.25)"
        }} />

        {/* Декоративные водяные пятна */}
        <div className="absolute top-[15%] left-[60%] w-48 h-32 rounded-full pointer-events-none" style={{ background: "rgba(45,106,143,0.07)", transform: "rotate(-15deg)" }} />
        <div className="absolute top-[55%] left-[10%] w-36 h-24 rounded-full pointer-events-none" style={{ background: "rgba(45,106,143,0.06)", transform: "rotate(10deg)" }} />
        <div className="absolute top-[70%] left-[70%] w-56 h-20 rounded-full pointer-events-none" style={{ background: "rgba(45,106,143,0.05)", transform: "rotate(-5deg)" }} />

        {/* ===== ПИРАТСКИЕ УКРАШЕНИЯ ===== */}

        {/* Роза ветров — правый верхний угол */}
        <div className="absolute pointer-events-none select-none" style={{ top: "4%", right: "3%", opacity: 0.18, fontSize: "130px", transform: "rotate(8deg)", lineHeight: 1 }}>🧭</div>

        {/* Большой якорь — левый нижний */}
        <div className="absolute pointer-events-none select-none" style={{ bottom: "3%", left: "2%", opacity: 0.13, fontSize: "110px", transform: "rotate(-12deg)", lineHeight: 1 }}>⚓</div>

        {/* Череп и кости — правый нижний */}
        <div className="absolute pointer-events-none select-none" style={{ bottom: "5%", right: "2%", opacity: 0.14, fontSize: "90px", transform: "rotate(10deg)", lineHeight: 1 }}>☠️</div>

        {/* Попугай — левый верхний */}
        <div className="absolute pointer-events-none select-none" style={{ top: "6%", left: "2%", opacity: 0.16, fontSize: "80px", transform: "rotate(-8deg)", lineHeight: 1 }}>🦜</div>

        {/* Корабль — центр-низ */}
        <div className="absolute pointer-events-none select-none" style={{ bottom: "2%", left: "38%", opacity: 0.12, fontSize: "100px", transform: "rotate(3deg)", lineHeight: 1 }}>⛵</div>

        {/* Кит — центр-верх правее */}
        <div className="absolute pointer-events-none select-none" style={{ top: "3%", left: "42%", opacity: 0.11, fontSize: "90px", transform: "rotate(-5deg) scaleX(-1)", lineHeight: 1 }}>🐋</div>

        {/* Пиратский флаг — по центру вверху */}
        <div className="absolute pointer-events-none select-none" style={{ top: "2%", left: "22%", opacity: 0.15, fontSize: "70px", transform: "rotate(-6deg)", lineHeight: 1 }}>🏴‍☠️</div>

        {/* Сундук — правый центр */}
        <div className="absolute pointer-events-none select-none" style={{ top: "42%", right: "1%", opacity: 0.13, fontSize: "75px", transform: "rotate(7deg)", lineHeight: 1 }}>🪙</div>

        {/* Осьминог — левый центр */}
        <div className="absolute pointer-events-none select-none" style={{ top: "44%", left: "1%", opacity: 0.12, fontSize: "80px", transform: "rotate(-9deg)", lineHeight: 1 }}>🐙</div>

        {/* Рыбы — снизу справа */}
        <div className="absolute pointer-events-none select-none" style={{ bottom: "18%", right: "3%", opacity: 0.13, fontSize: "55px", transform: "rotate(5deg)", lineHeight: 1 }}>🐠</div>
        <div className="absolute pointer-events-none select-none" style={{ bottom: "24%", right: "5%", opacity: 0.10, fontSize: "40px", transform: "rotate(-8deg) scaleX(-1)", lineHeight: 1 }}>🐟</div>

        {/* Краб — снизу слева */}
        <div className="absolute pointer-events-none select-none" style={{ bottom: "14%", left: "18%", opacity: 0.14, fontSize: "60px", transform: "rotate(-4deg)", lineHeight: 1 }}>🦀</div>

        {/* Ракушка — центр снизу чуть правее */}
        <div className="absolute pointer-events-none select-none" style={{ bottom: "6%", left: "62%", opacity: 0.13, fontSize: "55px", transform: "rotate(12deg)", lineHeight: 1 }}>🐚</div>

        {/* Кинжал — верх по центру */}
        <div className="absolute pointer-events-none select-none" style={{ top: "5%", left: "60%", opacity: 0.12, fontSize: "65px", transform: "rotate(30deg)", lineHeight: 1 }}>🗡️</div>

        {/* Подзорная труба */}
        <div className="absolute pointer-events-none select-none" style={{ top: "28%", right: "2%", opacity: 0.13, fontSize: "60px", transform: "rotate(-20deg)", lineHeight: 1 }}>🔭</div>

        {/* Монеты */}
        <div className="absolute pointer-events-none select-none" style={{ top: "72%", left: "5%", opacity: 0.11, fontSize: "50px", transform: "rotate(6deg)", lineHeight: 1 }}>🪙</div>
        <div className="absolute pointer-events-none select-none" style={{ top: "18%", left: "30%", opacity: 0.09, fontSize: "45px", transform: "rotate(-14deg)", lineHeight: 1 }}>🪙</div>

        {/* SVG декор: старые чернильные линии по краям */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.07 }} xmlns="http://www.w3.org/2000/svg">
          {/* Угловые завитки */}
          <path d="M 20,20 Q 60,10 80,40 Q 100,70 60,80" stroke="#3a1800" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M 20,20 Q 10,60 40,80 Q 70,100 80,60" stroke="#3a1800" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M 1380,20 Q 1340,10 1320,40" stroke="#3a1800" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

          {/* Рамка из точек по периметру */}
          <rect x="18" y="18" width="calc(100% - 36px)" height="calc(100% - 36px)"
            stroke="#5a2e00" strokeWidth="1" fill="none" strokeDasharray="6,8" rx="2"/>

          {/* Крест в левом верхнем */}
          <line x1="30" y1="60" x2="55" y2="60" stroke="#3a1800" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="42" y1="48" x2="42" y2="73" stroke="#3a1800" strokeWidth="1.2" strokeLinecap="round"/>

          {/* Крест-Х в правом нижнем */}
          <line x1="1300" y1="640" x2="1320" y2="660" stroke="#8b0000" strokeWidth="2" strokeLinecap="round"/>
          <line x1="1320" y1="640" x2="1300" y2="660" stroke="#8b0000" strokeWidth="2" strokeLinecap="round"/>
        </svg>

        {/* Заголовок */}
        <div className="relative z-10 text-center pt-8 pb-4 px-4">
          <div className="inline-block border-4 border-ink px-8 py-4 relative" style={{
            borderImage: "none",
            boxShadow: "4px 4px 0 rgba(44,24,16,0.4), inset 0 0 20px rgba(44,24,16,0.1)"
          }}>
            <div className="absolute -top-3 -left-3 text-2xl">🏴‍☠️</div>
            <div className="absolute -top-3 -right-3 text-2xl">🏴‍☠️</div>
            <h1
              className="text-5xl md:text-7xl text-ink leading-none tracking-wide"
              style={{ fontFamily: '"Pirata One", cursive', textShadow: "3px 3px 6px rgba(44,24,16,0.3)" }}
            >
              Карта Сокровищ
            </h1>
            <p className="text-ink-light text-sm md:text-base mt-2 italic" style={{ fontFamily: "Merriweather, serif" }}>
              20 ходов до заветного сокровища — кликни на золотой круг!
            </p>
          </div>
        </div>

        {/* Карта с кругами */}
        <div className="relative w-full" style={{ height: "calc(100vh - 180px)", minHeight: "520px" }}>
          {/* SVG путь — красивая верёвочная дорога */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <filter id="roughen">
                <feTurbulence type="turbulence" baseFrequency="0.018" numOctaves="4" seed="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.6" xChannelSelector="R" yChannelSelector="G" />
              </filter>
              <filter id="roughen2">
                <feTurbulence type="turbulence" baseFrequency="0.022" numOctaves="4" seed="7" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.4" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>

            {/* Слой 1 — широкая тёмная тень дороги */}
            <path
              d={curvePath}
              fill="none"
              stroke="rgba(44,24,16,0.28)"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#roughen)"
              transform="translate(0.3,0.5)"
            />

            {/* Слой 2 — основная дорога (светлый грунт) */}
            <path
              d={curvePath}
              fill="none"
              stroke="#c8a055"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#roughen)"
            />

            {/* Слой 3 — тёмный контур дороги сверху */}
            <path
              d={curvePath}
              fill="none"
              stroke="#7a4a10"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="0.1,99999"
              filter="url(#roughen2)"
              opacity="0.5"
            />

            {/* Слой 4 — пунктир по центру дороги (как разметка) */}
            <path
              d={curvePath}
              fill="none"
              stroke="#5a2e00"
              strokeWidth="0.55"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="1.8,2.2"
              filter="url(#roughen2)"
            />

            {/* Слой 5 — светлый блик по верхнему краю дороги */}
            <path
              d={curvePath}
              fill="none"
              stroke="rgba(255,230,140,0.45)"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#roughen)"
              transform="translate(-0.1,-0.2)"
            />
          </svg>

          {/* Сундук с сокровищами после хода 20 */}
          <div
            className="absolute pointer-events-none select-none"
            style={{
              left: `${steps[19].x}%`,
              top: `${steps[19].y}%`,
              transform: "translate(52%, -58%)",
              zIndex: 5,
              width: "120px",
              animation: "chestPulse 2.8s ease-in-out infinite",
            }}
          >
            {/* Золотое свечение под сундуком */}
            <div style={{
              position: "absolute",
              bottom: "-10px",
              left: "5%",
              width: "90%",
              height: "22px",
              background: "radial-gradient(ellipse, rgba(212,160,23,0.55) 0%, transparent 70%)",
              borderRadius: "50%",
              filter: "blur(5px)",
            }} />
            <svg width="120" height="120" viewBox="0 0 120 120" style={{ display: "block", overflow: "visible" }}>
              <defs>
                <filter id="removeWhite" x="0%" y="0%" width="100%" height="100%">
                  <feColorMatrix type="matrix"
                    values="1 0 0 0 0
                            0 1 0 0 0
                            0 0 1 0 0
                            -3 -3 -3 4 -0.5"
                  />
                  <feComposite in2="SourceGraphic" operator="in" />
                </filter>
                <filter id="chestShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="rgba(44,24,16,0.6)" />
                  <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="rgba(212,160,23,0.4)" />
                </filter>
              </defs>
              <image
                href="https://cdn.poehali.dev/projects/9862dfab-9da8-4c0a-b140-aa0e186a3d1b/bucket/0f27bd53-fbd3-43ee-bdfc-b036a3240c7a.png"
                width="120"
                height="120"
                preserveAspectRatio="xMidYMid meet"
                filter="url(#removeWhite)"
                style={{ filter: "url(#removeWhite) url(#chestShadow)" }}
              />
            </svg>
          </div>

          {/* Золотые кружки */}
          {steps.map((step) => {
            const isLast = step.id === 20;
            const sz = isLast ? 58 : 46;
            return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step)}
              className="absolute group"
              style={{
                left: `${step.x}%`,
                top: `${step.y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: 10,
                border: "none",
                background: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              {/* Внешнее кольцо — тёмно-коричневое */}
              <div
                className="relative flex items-center justify-center rounded-full transition-all duration-200 group-hover:scale-110"
                style={{
                  width: sz + 8,
                  height: sz + 8,
                  background: "radial-gradient(circle at 40% 30%, #b8860b, #8B6914 40%, #5a3e08 75%, #3a2505)",
                  boxShadow: isLast
                    ? "0 4px 16px rgba(0,0,0,0.55), 0 0 24px rgba(220,170,0,0.6)"
                    : "0 4px 12px rgba(0,0,0,0.45), 0 1px 3px rgba(0,0,0,0.3)",
                  border: "none",
                }}
              >
              {/* Основной золотой круг */}
              <div
                className="relative flex flex-col items-center justify-center rounded-full"
                style={{
                  width: sz,
                  height: sz,
                  background: isLast
                    ? "radial-gradient(circle at 38% 28%, #fffaaa 0%, #f5d020 25%, #e0a800 55%, #b07800 80%, #7a5000 100%)"
                    : "radial-gradient(circle at 38% 28%, #fff5a0 0%, #f0c030 28%, #d4a017 58%, #a07010 82%, #6e4d08 100%)",
                  boxShadow: isLast
                    ? "inset 0 3px 8px rgba(255,245,100,0.7), inset 0 -3px 8px rgba(80,40,0,0.5)"
                    : "inset 0 3px 6px rgba(255,240,80,0.6), inset 0 -3px 6px rgba(70,35,0,0.45)",
                }}
              >
                {/* Блик — имитирует выпуклость */}
                <div className="absolute rounded-full pointer-events-none" style={{
                  width: "45%", height: "28%",
                  top: "14%", left: "20%",
                  background: "rgba(255,255,200,0.6)",
                  borderRadius: "50%",
                  filter: "blur(2px)",
                }} />
                {/* Номер */}
                <span
                  className="relative select-none"
                  style={{
                    fontFamily: '"Arial Black", Arial, sans-serif',
                    fontSize: isLast ? "18px" : "14px",
                    fontWeight: 900,
                    color: "#3a1a00",
                    textShadow: "0 1px 1px rgba(255,220,80,0.5), 0 -1px 1px rgba(60,30,0,0.3)",
                    lineHeight: 1,
                  }}
                >
                  {step.id}
                </span>
              </div>
              </div>
              {/* Подпись появляется при наведении */}
              <div
                className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap"
                style={{ top: sz + 14, left: "50%", transform: "translateX(-50%)", zIndex: 20 }}
              >
                <span
                  style={{
                    fontFamily: '"Cinzel", serif',
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#2c1810",
                    background: "rgba(248,235,170,0.96)",
                    border: "1px solid #8B4513",
                    borderRadius: "4px",
                    padding: "2px 7px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
                    display: "block",
                  }}
                >
                  {step.id}. {step.title}
                </span>
              </div>
            </button>
            );
          })}

          {/* Декоративные элементы карты */}
          <div className="absolute bottom-4 right-6 text-5xl opacity-30 pointer-events-none" style={{ transform: "rotate(15deg)" }}>⚓</div>
          <div className="absolute top-4 left-6 text-4xl opacity-25 pointer-events-none" style={{ transform: "rotate(-10deg)" }}>🧭</div>
          <div className="absolute bottom-16 left-8 text-3xl opacity-20 pointer-events-none" style={{ transform: "rotate(5deg)" }}>🐋</div>
          <div className="absolute top-8 right-12 text-3xl opacity-20 pointer-events-none">🦜</div>

          {/* Роза ветров */}
          <div className="absolute bottom-8 right-16 opacity-15 pointer-events-none text-6xl" style={{ transform: "rotate(0deg)" }}>
            🧭
          </div>

          {/* Подпись автора */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <span className="text-xs text-ink-light italic opacity-50" style={{ fontFamily: "Merriweather, serif" }}>
              ~ Карта составлена в лето 2026-е ~
            </span>
          </div>
        </div>
      </div>

      {/* Модальное окно хода */}
      {activeStep && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(44,24,16,0.75)" }}
          onClick={() => setActiveStep(null)}
        >
          <div
            className="relative max-w-md w-full rounded-lg p-8 animate-fade-in"
            style={{
              background: "radial-gradient(ellipse at 30% 20%, #f4e4c1, #e8d4a0 60%, #d4b882)",
              boxShadow: "0 0 60px rgba(44,24,16,0.6), 0 20px 40px rgba(0,0,0,0.5), inset 0 0 30px rgba(44,24,16,0.1)",
              border: "3px solid #8B4513",
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Обожжённые края модалки */}
            <div className="absolute inset-0 rounded-lg pointer-events-none" style={{
              boxShadow: "inset 0 0 30px rgba(44,24,16,0.3)"
            }} />

            {/* Закрыть */}
            <button
              onClick={() => setActiveStep(null)}
              className="absolute top-3 right-4 text-ink-light hover:text-ink text-2xl font-bold transition-colors"
              style={{ fontFamily: '"Pirata One", cursive' }}
            >
              ✕
            </button>

            {/* Шапка */}
            <div className="text-center mb-4">
              <div className="text-6xl mb-2">{activeStep.emoji}</div>
              <div
                className="text-xs font-bold uppercase tracking-widest text-gold-dark mb-1"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                Ход {activeStep.id} из 20
              </div>
              <h2
                className="text-2xl md:text-3xl text-ink leading-tight"
                style={{ fontFamily: '"Pirata One", cursive', textShadow: "1px 1px 3px rgba(44,24,16,0.2)" }}
              >
                {activeStep.title}
              </h2>
            </div>

            {/* Разделитель */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-ink/20" />
              <span className="text-ink/40 text-lg">⚓</span>
              <div className="flex-1 h-px bg-ink/20" />
            </div>

            {/* Описание */}
            <p className="text-ink text-sm md:text-base leading-relaxed text-center italic" style={{ fontFamily: "Merriweather, serif" }}>
              {activeStep.description}
            </p>

            {/* Навигация */}
            <div className="flex justify-between mt-6 gap-3">
              {activeStep.id > 1 && (
                <button
                  onClick={() => setActiveStep(steps[activeStep.id - 2])}
                  className="flex-1 py-2 px-4 rounded text-sm font-bold text-ink transition-all hover:scale-105"
                  style={{
                    fontFamily: '"Cinzel", serif',
                    background: "radial-gradient(circle at 35% 35%, #f0c040, #d4a017 50%, #a07010)",
                    border: "2px solid #8B4513",
                    boxShadow: "2px 2px 6px rgba(44,24,16,0.3)",
                  }}
                >
                  ← Назад
                </button>
              )}
              {activeStep.id < 20 && (
                <button
                  onClick={() => setActiveStep(steps[activeStep.id])}
                  className="flex-1 py-2 px-4 rounded text-sm font-bold text-ink transition-all hover:scale-105"
                  style={{
                    fontFamily: '"Cinzel", serif',
                    background: "radial-gradient(circle at 35% 35%, #f0c040, #d4a017 50%, #a07010)",
                    border: "2px solid #8B4513",
                    boxShadow: "2px 2px 6px rgba(44,24,16,0.3)",
                  }}
                >
                  Вперёд →
                </button>
              )}
              {activeStep.id === 20 && (
                <button
                  onClick={() => setActiveStep(steps[0])}
                  className="flex-1 py-2 px-4 rounded text-sm font-bold text-ink transition-all hover:scale-105"
                  style={{
                    fontFamily: '"Cinzel", serif',
                    background: "radial-gradient(circle at 35% 35%, #f5e642, #d4a017 50%, #a07010)",
                    border: "2px solid #8B4513",
                    boxShadow: "0 0 15px rgba(212,160,23,0.6), 2px 2px 6px rgba(44,24,16,0.3)",
                  }}
                >
                  🏴‍☠️ Начать снова!
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}