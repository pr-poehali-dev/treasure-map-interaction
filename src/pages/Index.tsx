import { useState } from "react";

interface Step {
  id: number;
  title: string;
  description: string;
  emoji: string;
  x: number;
  y: number;
}

// Координаты кружков точно по картинке (% от ширины и высоты)
const steps: Step[] = [
  { id: 1,  title: "Начало пути",             description: "Ты просыпаешься на берегу неизвестного острова. Солёный ветер треплет твои волосы, а в руках — старая карта с загадочными пометками. Великое приключение начинается!", emoji: "🏖️", x: 88, y: 82 },
  { id: 2,  title: "Таверна «Мёртвый якорь»", description: "Скрипучая дверь таверны открывается. Одноглазый хозяин кивает и шёпотом говорит: «Тебя ждут в дальнем углу». За столом сидит старый пират с ещё одним куском карты!", emoji: "🍺", x: 76, y: 74 },
  { id: 3,  title: "Загадка якоря",            description: "На берегу лежит ржавый якорь — под ним спрятан медальон с гравировкой. Три знака открывают следующий путь на карте.", emoji: "⚓", x: 65, y: 82 },
  { id: 4,  title: "Коралловый риф",           description: "Под водой мерцают тысячи рыб. Среди кораллов ты замечаешь бронзовую таблицу с координатами. Но рядом кружит акула...", emoji: "🐠", x: 56, y: 72 },
  { id: 5,  title: "Медуза-страж",             description: "Огромная светящаяся медуза преграждает путь. Она задаёт три загадки о море. Ответь верно — и она укажет дальнейший курс.", emoji: "🪼", x: 79, y: 58 },
  { id: 6,  title: "Штурвал судьбы",           description: "На дне моря лежит огромный штурвал. Поверни его трижды по часовой стрелке — откроется тайный проход в подводную пещеру.", emoji: "☸️", x: 79, y: 42 },
  { id: 7,  title: "Деревня туземцев",         description: "Вождь племени встречает тебя у костра. Испытание трёх загадок — только ответив верно, ты получишь разрешение пройти через священные земли.", emoji: "🌴", x: 79, y: 27 },
  { id: 8,  title: "Гора Дракона",             description: "Склон горы усеян костями прежних искателей приключений. На вершине — огромный камень в форме дракона. Под его левой лапой скрыт вход в пещеру.", emoji: "🐉", x: 70, y: 18 },
  { id: 9,  title: "Подземное озеро",          description: "Кристально чистое озеро светится голубым светом. На острове посреди воды стоит сундук. Но мост разрушен — нужно найти лодку или другой путь.", emoji: "💧", x: 60, y: 13 },
  { id: 10, title: "Храм Нептуна",             description: "Величественные колонны уходят в небо. На алтаре лежит золотой трезубец. Надпись гласит: «Только достойный может взять это оружие».", emoji: "🔱", x: 49, y: 10 },
  { id: 11, title: "Башня с часами",           description: "Старинные часы остановились ровно в полночь. Чтобы открыть потайную дверь, нужно перевести стрелки на правильное время, указанное в корабельном журнале.", emoji: "🕰️", x: 38, y: 13 },
  { id: 12, title: "Логово пиратов",           description: "Банда Железного Крюка преграждает путь. Капитан предлагает сделку: карту в обмен на половину сокровища. Принять или попробовать перехитрить их?", emoji: "⚔️", x: 28, y: 18 },
  { id: 13, title: "Секретная бухта",          description: "Спрятанная за скалами бухта — идеальное укрытие. Здесь стоит небольшой корабль с поднятыми парусами. На борту — верная команда, готовая плыть к финальному острову.", emoji: "🚢", x: 19, y: 27 },
  { id: 14, title: "Шторм в открытом море",    description: "Волны высотой с дом бьют в борт корабля. Молния освещает курс — прямо по курсу скалы! Только опытный штурман сможет провести судно через этот ад.", emoji: "⛈️", x: 14, y: 40 },
  { id: 15, title: "Остров Призраков",         description: "Туман скрывает берега проклятого острова. Призраки бывших пиратов шепчут подсказки и угрозы. Лишь тот, кто не поддастся страху, найдёт финальный знак.", emoji: "👻", x: 19, y: 52 },
  { id: 16, title: "Пиратский корабль",        description: "Чёрный парус режет горизонт. «Летучий голландец» приближается! На его борту — карты всех морей мира. Капитан готов обменять нужную карту на редкий артефакт.", emoji: "🏴‍☠️", x: 19, y: 64 },
  { id: 17, title: "Вулканический остров",     description: "Земля дрожит под ногами. Лава течёт по склонам. В самом центре кратера, на каменном пьедестале — золотой компас, указывающий прямо к сокровищу!", emoji: "🌋", x: 25, y: 74 },
  { id: 18, title: "Маяк на краю света",       description: "Старый маяк мигает сквозь туман. Смотритель — столетний пират, который видел всё. Он передаёт последний ключ и благословляет в финальный путь.", emoji: "🗼", x: 14, y: 82 },
  { id: 19, title: "Красный крест",            description: "На земле начерчен огромный красный крест — именно здесь зарыто сокровище! Но земля тверда, нужна лопата. А лопата охраняется последним стражем...", emoji: "❌", x: 8,  y: 67 },
  { id: 20, title: "Сокровищница!",            description: "ТЫ НАШЁЛ ЕГО! Огромный сундук переполнен золотыми монетами, драгоценными камнями и артефактами тысяч цивилизаций. В центре лежит свиток — карта к ещё большему приключению... 🏴‍☠️", emoji: "💰", x: 8,  y: 18 },
];

const pathPoints = steps.map(s => `${s.x},${s.y}`).join(" ");

export default function Index() {
  const [activeStep, setActiveStep] = useState<Step | null>(null);

  return (
    <div className="min-h-screen overflow-hidden relative bg-[#3a1a00]" style={{ fontFamily: "Merriweather, serif" }}>

      {/* Полноэкранная карта-фон */}
      <div
        className="relative w-full flex flex-col"
        style={{ minHeight: "100vh" }}
      >
        {/* Фоновое изображение карты */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("https://cdn.poehali.dev/projects/9862dfab-9da8-4c0a-b140-aa0e186a3d1b/bucket/03e094a1-ea26-4bcf-a610-6065ca2d954f.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Лёгкое затемнение для читаемости */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(0,0,0,0.08)" }} />

        {/* Заголовок поверх карты */}
        <div className="relative z-10 text-center pt-6 pb-2 px-4">
          <div
            className="inline-block px-6 py-3 relative"
            style={{
              background: "rgba(244,228,193,0.85)",
              border: "3px solid #8B4513",
              boxShadow: "4px 4px 0 rgba(44,24,16,0.5), inset 0 0 20px rgba(44,24,16,0.1)",
              backdropFilter: "blur(2px)",
            }}
          >
            <div className="absolute -top-3 -left-3 text-xl">🏴‍☠️</div>
            <div className="absolute -top-3 -right-3 text-xl">🏴‍☠️</div>
            <h1
              className="text-4xl md:text-6xl text-ink leading-none tracking-wide"
              style={{ fontFamily: '"Pirata One", cursive', textShadow: "2px 2px 4px rgba(44,24,16,0.3)", color: "#2c1810" }}
            >
              Карта Сокровищ
            </h1>
            <p className="text-sm md:text-base mt-1 italic" style={{ color: "#5c3d2e", fontFamily: "Merriweather, serif" }}>
              20 ходов до заветного сокровища — кликни на золотой круг!
            </p>
          </div>
        </div>

        {/* Область карты с кружками */}
        <div className="relative flex-1" style={{ height: "calc(100vh - 130px)", minHeight: "480px" }}>

          {/* SVG пунктирный путь поверх карты */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="roughen">
                <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="2" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
              </filter>
            </defs>
            <polyline
              points={pathPoints}
              fill="none"
              stroke="rgba(44,24,16,0.35)"
              strokeWidth="0.7"
              strokeDasharray="2,1.8"
              strokeLinecap="round"
              filter="url(#roughen)"
              transform="translate(0.1,0.1)"
            />
            <polyline
              points={pathPoints}
              fill="none"
              stroke="#5c2a00"
              strokeWidth="0.45"
              strokeDasharray="2,1.8"
              strokeLinecap="round"
              filter="url(#roughen)"
            />
          </svg>

          {/* Золотые кружки */}
          {steps.map((step) => {
            const isLast = step.id === 20;
            const size = isLast ? 52 : 42;
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
                }}
              >
                {/* Тень */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: size,
                    height: size,
                    background: "rgba(44,24,16,0.4)",
                    top: "3px",
                    left: "3px",
                    borderRadius: "50%",
                  }}
                />
                {/* Круг */}
                <div
                  className="relative flex items-center justify-center rounded-full transition-all duration-200 group-hover:scale-115"
                  style={{
                    width: size,
                    height: size,
                    background: isLast
                      ? "radial-gradient(circle at 32% 32%, #fff8a0, #f5d020 35%, #d4a017 65%, #8B6000)"
                      : "radial-gradient(circle at 32% 32%, #fff0a0, #f0c030 40%, #d4a017 65%, #a07010)",
                    boxShadow: isLast
                      ? "0 0 18px rgba(212,160,23,0.9), 0 0 36px rgba(212,160,23,0.5), inset 0 1px 4px rgba(255,255,255,0.5)"
                      : "0 0 8px rgba(212,160,23,0.6), 0 2px 6px rgba(0,0,0,0.3), inset 0 1px 3px rgba(255,255,255,0.4)",
                    border: isLast ? "2.5px solid #8B6000" : "2px solid #a07010",
                  }}
                >
                  <span
                    className="font-bold select-none"
                    style={{
                      fontFamily: '"Cinzel", serif',
                      fontSize: isLast ? "15px" : "13px",
                      color: "#2c1810",
                      textShadow: "0 1px 2px rgba(255,255,255,0.4)",
                      lineHeight: 1,
                    }}
                  >
                    {step.id}
                  </span>
                </div>
                {/* Подпись под кружком */}
                <div
                  className="absolute whitespace-nowrap"
                  style={{
                    top: `${size + 4}px`,
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <span
                    className="text-center block"
                    style={{
                      fontFamily: '"Cinzel", serif',
                      fontSize: "9px",
                      color: "#2c1810",
                      background: "rgba(244,228,193,0.82)",
                      padding: "1px 4px",
                      borderRadius: "3px",
                      fontWeight: 700,
                      maxWidth: "70px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      display: "block",
                    }}
                  >
                    {step.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Модальное окно */}
      {activeStep && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(44,24,16,0.78)" }}
          onClick={() => setActiveStep(null)}
        >
          <div
            className="relative max-w-md w-full rounded-lg p-7 animate-fade-in"
            style={{
              background: "radial-gradient(ellipse at 30% 20%, #f4e4c1, #e8d4a0 60%, #d4b882)",
              boxShadow: "0 0 60px rgba(44,24,16,0.7), 0 20px 40px rgba(0,0,0,0.5), inset 0 0 30px rgba(44,24,16,0.1)",
              border: "3px solid #8B4513",
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute inset-0 rounded-lg pointer-events-none" style={{ boxShadow: "inset 0 0 30px rgba(44,24,16,0.25)" }} />

            {/* Закрыть */}
            <button
              onClick={() => setActiveStep(null)}
              className="absolute top-3 right-4 text-2xl font-bold transition-opacity hover:opacity-60"
              style={{ color: "#2c1810" }}
            >
              ✕
            </button>

            {/* Шапка */}
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">{activeStep.emoji}</div>
              <div
                className="text-xs font-bold uppercase tracking-widest mb-1"
                style={{ fontFamily: '"Cinzel", serif', color: "#a07010" }}
              >
                Ход {activeStep.id} из 20
              </div>
              <h2
                className="text-2xl md:text-3xl leading-tight"
                style={{ fontFamily: '"Pirata One", cursive', color: "#2c1810", textShadow: "1px 1px 3px rgba(44,24,16,0.15)" }}
              >
                {activeStep.title}
              </h2>
            </div>

            {/* Разделитель */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px" style={{ background: "rgba(44,24,16,0.2)" }} />
              <span style={{ color: "rgba(44,24,16,0.35)", fontSize: "18px" }}>⚓</span>
              <div className="flex-1 h-px" style={{ background: "rgba(44,24,16,0.2)" }} />
            </div>

            {/* Описание */}
            <p
              className="text-sm md:text-base leading-relaxed text-center italic"
              style={{ fontFamily: "Merriweather, serif", color: "#2c1810" }}
            >
              {activeStep.description}
            </p>

            {/* Навигация */}
            <div className="flex justify-between mt-6 gap-3">
              {activeStep.id > 1 && (
                <button
                  onClick={() => setActiveStep(steps[activeStep.id - 2])}
                  className="flex-1 py-2 px-4 rounded text-sm font-bold transition-all hover:scale-105"
                  style={{
                    fontFamily: '"Cinzel", serif',
                    color: "#2c1810",
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
                  className="flex-1 py-2 px-4 rounded text-sm font-bold transition-all hover:scale-105"
                  style={{
                    fontFamily: '"Cinzel", serif',
                    color: "#2c1810",
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
                  className="flex-1 py-2 px-4 rounded text-sm font-bold transition-all hover:scale-105"
                  style={{
                    fontFamily: '"Cinzel", serif',
                    color: "#2c1810",
                    background: "radial-gradient(circle at 35% 35%, #fff8a0, #f5d020 40%, #d4a017 70%, #8B6000)",
                    border: "2px solid #8B4513",
                    boxShadow: "0 0 15px rgba(212,160,23,0.7), 2px 2px 6px rgba(44,24,16,0.3)",
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
