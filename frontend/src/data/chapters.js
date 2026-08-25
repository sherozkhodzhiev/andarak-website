const FIRE_VIDEO = "https://upload.wikimedia.org/wikipedia/commons/b/bb/Fantastic-fireplace-fire-chimney-hearth-_background_-_texture_-_motion_graphics_-_free_video_library.webm";
const WHEAT_VIDEO = "https://upload.wikimedia.org/wikipedia/commons/a/af/ASMR_field_of_wheat_-_nature.webm";

export const CHAPTERS = [
  {
    id: "sogdiana", num: "01", flame: "alive", sound: "fire", embers: true,
    art: "/art/01-sogdiana.png", video: FIRE_VIDEO, audio: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Ustad_Gada_Mohammad_-_Rababa.ogg",
    eyebrow: { en: "Sogdiana, before empire", ru: "Согдиана, до империй" },
    title: { en: "A Land of <em>Fire</em>", ru: "Земля <em>Огня</em>" },
    body: {
      en: "Before empires, before conquerors — this was Sogdiana. Golden light over the Fergana valley, smoke rising from an eternal flame inside a stone temple. Priests in white tend the fire; villagers bow, offer bread and water. A people who worshipped light, and called it Ahura Mazda.",
      ru: "До империй и завоевателей это была Согдиана. Золотой свет над Ферганской долиной, дым вечного огня в каменном храме. Жрецы в белых одеждах поддерживают пламя; жители приносят хлеб и воду. Народ, поклонявшийся свету и звавший его Ахура Мазда.",
    },
    caption: {
      en: "Sogdian priests in white robes tending the sacred fire-altar, clay homes behind",
      ru: "Согдийские жрецы в белых одеждах у священного алтаря огня",
    },
    cue: { en: "Sacred, meditative — soft flute, deep drone, distant temple bells", ru: "Священно, медитативно — тихая флейта, гул, далёкие колокола" },
  },
  {
    id: "invasion", num: "02", flame: "alive", sound: "storm", embers: false,
    art: "/art/02-invasion.png", audio: "https://upload.wikimedia.org/wikipedia/commons/9/97/02_Taiko2_%28short%29.oga",
    eyebrow: { en: "329 BC", ru: "329 г. до н.э." },
    title: { en: "Alexander <em>Invades</em>", ru: "Вторжение <em>Александра</em>" },
    body: {
      en: "Dust rises on the horizon. Greek phalanxes cross the Jaxartes. Sogdian horsemen resist fiercely, led by Spitamenes' guerrilla raids. A young king from Macedon has crossed the world to claim this land — it will not fall quietly.",
      ru: "Пыль поднимается на горизонте. Греческие фаланги пересекают Яксарт. Согдийские всадники отчаянно сопротивляются под руководством Спитамена. Молодой царь Македонии пересёк мир, чтобы захватить эту землю — но она не сдастся без боя.",
    },
    caption: {
      en: "Sogdian horse-archers clash with Macedonian bronze phalanxes",
      ru: "Согдийские конные лучники против македонских фаланг",
    },
    cue: { en: "Battle drums, rising brass — tension before the clash", ru: "Боевые барабаны, нарастающее напряжение" },
  },
  {
    id: "alexandria", num: "03", flame: "alive", sound: "wind", embers: false,
    art: "/art/03-alexandria.png",
    eyebrow: { en: "Khujand", ru: "Худжанд" },
    title: { en: "Alexandria <em>Eschate</em>", ru: "Александрия <em>Крайняя</em>" },
    body: {
      en: "On the river's edge, new walls rise from Sogdian soil. Greek and local stonemasons work side by side, column and native form fused into one. At the furthest edge of his known world, Alexander built a city — 'the Furthest' — Greek stone on Sogdian earth.",
      ru: "На берегу реки из согдийской земли поднимаются новые стены. Греческие и местные каменщики работают бок о бок. На самом краю известного ему мира Александр построил город — «Крайний» — греческий камень на согдийской земле.",
    },
    caption: {
      en: "Hellenistic pillars and fortresses rise beside Sogdian settlements",
      ru: "Эллинистические колонны рядом с согдийскими домами",
    },
    cue: { en: "Triumphant but uneasy brass, fading into something solemn", ru: "Триумфальная, но тревожная музыка строительства" },
  },
  {
    id: "death", num: "04", flame: "alive", sound: "calm", embers: false,
    art: "/art/04-death.png", video: WHEAT_VIDEO, audio: null,
    eyebrow: { en: "323 BC", ru: "323 г. до н.э." },
    title: { en: "The King Dies, the Land <em>Breathes</em>", ru: "Царь Умирает, Земля <em>Вздыхает</em>" },
    body: {
      en: "Alexander died young in Babylon, his generals dividing the map he left behind. Far from the throne rooms, Sogdiana's fire temples still burned, untouched — and the land quietly returned to itself.",
      ru: "Александр умер молодым в Вавилоне, и его полководцы разделили оставленную им карту. Вдали от тронных залов храмы огня Согдианы всё так же горели, нетронутые — и земля тихо вернулась к своей жизни.",
    },
    caption: {
      en: "Sogdian farmers harvest beneath the cliffs as garrisons withdraw",
      ru: "Согдийские дехкане собирают урожай, гарнизоны уходят",
    },
    cue: { en: "Mournful strings — a lone duduk, sparse and slow", ru: "Скорбные струны — одинокий дудук" },
  },
  {
    id: "conquest", num: "05", flame: "dying", sound: "fire", embers: true,
    art: "/art/05-conquest.png", video: FIRE_VIDEO, audio: null,
    eyebrow: { en: "8th century", ru: "VIII век" },
    title: { en: "The Fires Are <em>Put Out</em>", ru: "Огни <em>Угасают</em>" },
    body: {
      en: "Arab armies swept across Transoxiana under the banners of the caliphate. Fire temples burned — not with sacred flame now, but with conquest. Nobles and scholars resisted, then fell. Old symbols were chiselled from the walls. Villagers knelt in the shadow of new minarets, rising where fire-altars once stood. Islam took root in blood and prayer.",
      ru: "Арабские армии прошлись по Мавераннахру под знамёнами халифата. Храмы огня горели — теперь не священным пламенем, а огнём завоевания. Старые символы сбивали со стен. Жители склонялись в тени новых минаретов, поднявшихся на месте алтарей. Ислам укоренился в крови и молитвах.",
    },
    caption: {
      en: "Arab cavalry enters the stone towns; altars extinguished, first minarets rise",
      ru: "Арабская конница входит в города; потушенные алтари, первые минареты",
    },
    cue: { en: "Dark war drums building to violence — then abrupt silence", ru: "Тёмные барабаны войны — и внезапная тишина" },
  },
  {
    id: "samanid", num: "06", flame: "reborn", sound: "calm", embers: true,
    art: "/art/06-samanid.png",
    eyebrow: { en: "9th–10th century", ru: "IX–X века" },
    title: { en: "A Golden Age, <em>Reborn</em>", ru: "Золотой Век, <em>Возрождение</em>" },
    body: {
      en: "Generations later, a Persian dynasty rose from the same soil — ruling now in the name of Islam, but reviving Persian language and science. Bukhara's domes glowed at dawn; Avicenna bent over manuscripts, astronomers charted the stars, Rudaki recited verse at court. Out of conquest, a civilization of medicine, philosophy, and poetry — wrapped in a new faith.",
      ru: "Спустя поколения персидская династия Саманидов поднялась на этой же земле, возродив персидский язык и науки. Купола Бухары сияли на рассвете; Ибн Сина работал над рукописями, астрономы изучали звёзды, Рудаки читал стихи. Из завоеваний родилась цивилизация медицины, философии и поэзии.",
    },
    caption: {
      en: "Scholars, poets and architects in Samanid Bukhara at dawn",
      ru: "Учёные, поэты и зодчие Бухары эпохи Саманидов",
    },
    cue: { en: "Elegant and victorious — oud, strings, a hopeful rising melody", ru: "Изящно и победно — уд, струны, светлая мелодия" },
  },
  {
    id: "mongol", num: "07", flame: "dying", sound: "storm", embers: true,
    art: "/art/07-mongol.png",
    eyebrow: { en: "1219", ru: "1219 год" },
    title: { en: "The Mongols <em>Arrive</em>", ru: "Нашествие <em>Монголов</em>" },
    body: {
      en: "Genghis Khan's horsemen pour across the steppe. Bukhara and Samarkand burn. The same libraries filled with science and poetry are put to the torch. Ash falls like snow — a civilization built over centuries falls in weeks.",
      ru: "Всадники Чингисхана хлынули через степь. Бухара и Самарканд горят. Библиотеки, полные книг по науке и поэзии, преданы огню. Пепел падает как снег — цивилизация, строившаяся веками, рушится за считаные недели.",
    },
    caption: {
      en: "Mongol horse-archers against burning citadels and collapsing gates",
      ru: "Монгольские конники на фоне горящих цитаделей",
    },
    cue: { en: "Thunderous drums, screaming brass, chaos — the darkest cue", ru: "Громовые барабаны, хаос — самая тёмная глава" },
  },
  {
    id: "steppe", num: "08", flame: "ember", sound: "wind", embers: false,
    art: "/art/08-steppe.png",
    eyebrow: { en: "13th–16th century", ru: "XIII–XVI века" },
    title: { en: "New Peoples, <em>New Roots</em>", ru: "Новые Народы, <em>Новые Корни</em>" },
    body: {
      en: "Generations pass. Turkic and Mongolic tribes settle the land, intermarry, adopt Persian-Islamic culture. New khanates rise — the Bukhara Khanate carries old traditions forward in new hands. Markets bustle again; caravans move silk and spice.",
      ru: "Проходят поколения. Тюркские и монгольские племена селятся на этой земле, смешиваются с местным населением и перенимают персидско-исламскую культуру. Поднимаются новые ханства, рынки снова шумят, а караваны везут шёлк и специи.",
    },
    caption: {
      en: "Yurts beside mountain villages; Silk Road caravans trade silk and spice",
      ru: "Юрты рядом с горными селениями, караваны Шёлкового пути",
    },
    cue: { en: "Steppe strings — horsehead fiddle, slowly turning warm", ru: "Струнные степи — тепло и размеренно" },
  },
  {
    id: "empires", num: "09", flame: "ember", sound: "calm", embers: false,
    art: "/art/09-empires.jpg", audio: null,
    eyebrow: { en: "19th–20th century", ru: "XIX–XX века" },
    title: { en: "Empires Draw <em>the Lines</em>", ru: "Империи Чертят <em>Границы</em>" },
    body: {
      en: "Russian imperial troops arrive with maps and rifles; the Tsar's flag gives way to the hammer and sickle. In 1924, Soviet cartographers bend over a table, pencils cutting through valleys and villages that never had borders — carving Central Asia into republics. Andarak, a Tajik-Persian village, ends up inside the new Kyrgyz SSR.",
      ru: "Войска Российской империи приходят с картами и ружьями; флаг царя уступает место серпу и молоту. В 1924 году советские картографы чертят границы прямо по долинам и деревням. Андарак, таджикско-персидское село, оказывается в составе Киргизской ССР.",
    },
    caption: {
      en: "Samarkand in the final years of the Emirate — colour photograph by S. Prokudin-Gorsky, c. 1911",
      ru: "Самарканд в последние годы эмирата — цветная фотография С. Прокудина-Горского, ок. 1911",
    },
    cue: { en: "Cold imperial march fading into bureaucratic quiet", ru: "Холодный марш, растворяющийся в тишине кабинетов" },
  },
  {
    id: "today", num: "10", flame: "alive", sound: "birds", embers: true,
    art: "/art/10-today.jpg", audio: null,
    eyebrow: { en: "Today", ru: "Наши дни" },
    title: { en: "Andarak <em>Still Stands</em>", ru: "Андарак <em>Всё Ещё Стоит</em>" },
    body: {
      en: "After Sogdians, Greeks, Arabs, Samanids, Mongols, Turkic khanates, empires and unions — the village is still here. Mountains, homes, daily life, children, elders. This is where I am from.",
      ru: "После согдийцев, греков, арабов, саманидов, монголов, тюркских ханов, империй и союзов — село всё ещё здесь. Горы, дома, повседневная жизнь, дети и аксакалы. Это моё родное место.",
    },
    caption: {
      en: "Andarak — the village today, from the author's archive",
      ru: "Андарак — село сегодня, фото из архива автора",
    },
    cue: { en: "Warm and hopeful — the flute from chapter one returns", ru: "Тепло и светло — возвращается флейта первой главы" },
  },
];

export const FLAME_STATES = {
  alive:  { color: "#E4572E", cls: "flame-alive",  label: { en: "the fire — alive", ru: "огонь — жив" } },
  dying:  { color: "#8C2F2F", cls: "flame-dying",  label: { en: "the fire — burning cities", ru: "огонь — пожар городов" } },
  ember:  { color: "#8A8170", cls: "flame-ember",  label: { en: "the fire — an ember, remembered", ru: "огонь — тлеющий уголь" } },
  reborn: { color: "#C9A227", cls: "flame-reborn", label: { en: "the fire — reborn, transformed", ru: "огонь — возрождён" } },
};

export const UI = {
  kicker: { en: "A history of Andarak", ru: "История Андарака" },
  heroName: { en: "ANDARAK", ru: "АНДАРАК" },
  heroSub: {
    en: "Fire, Empire, and What Remains",
    ru: "Огонь, Империи и то, что осталось",
  },
  heroGhost: { en: "FERGANA", ru: "ФЕРГАНА" },
  heroIntro: {
    en: "Ten chapters. Two and a half thousand years. One village in the Fergana valley that outlasted every empire that passed through it.",
    ru: "Десять глав. Две с половиной тысячи лет. Одно село в Ферганской долине, пережившее все прошедшие через него империи.",
  },
  scrollHint: { en: "Scroll to begin", ru: "Прокрутите, чтобы начать" },
  audioOff: { en: "Audio: Off", ru: "Звук: Выкл" },
  audioOn: { en: "Audio: On", ru: "Звук: Вкл" },
  play: { en: "Play through", ru: "Воспроизвести" },
  playing: { en: "Playing…", ru: "Идёт показ…" },
  score: { en: "score", ru: "партитура" },
  marqueeItems: {
    en: ["Sogdiana", "Alexander the Great", "The Arab Conquest", "Samanid Dawn", "Genghis Khan", "The Khanates", "Empires & Borders", "Andarak"],
    ru: ["Согдиана", "Александр Македонский", "Арабское завоевание", "Эпоха Саманидов", "Чингисхан", "Ханства", "Империи и границы", "Андарак"],
  },
  artPending: {
    en: "Artwork in preparation — the archive is being restored",
    ru: "Иллюстрация готовится — архив восстанавливается",
  },
  galleryEyebrow: { en: "From the author's archive", ru: "Из архива автора" },
  galleryTitle: { en: "The Village, <em>Now</em>", ru: "Село, <em>Сейчас</em>" },
  galleryIntro: {
    en: "Not a painting, not a reconstruction — Andarak as it is. Snow on the mosque dome, poplars over the main street, the valley green in summer.",
    ru: "Не картина и не реконструкция — Андарак такой, какой он есть. Снег на куполе мечети, тополя над главной улицей, зелёная долина летом.",
  },
};

export const GALLERY = [
  {
    src: "/gallery/valley-green.png", span: "g-wide",
    caption: {
      en: "Andarak from above — poplars, orchards and clay roofs filling the valley floor",
      ru: "Андарак с высоты — тополя, сады и глиняные крыши на дне долины",
    },
  },
  {
    src: "/gallery/mosque-winter.png", span: "g-tall",
    caption: {
      en: "The golden dome of the village mosque under first snow",
      ru: "Золотой купол сельской мечети под первым снегом",
    },
  },
  {
    src: "/gallery/memorial-arch.png", span: "",
    caption: {
      en: "The memorial arch above the village — Turkestan range on the horizon",
      ru: "Мемориальная арка над селом — Туркестанский хребет на горизонте",
    },
  },
  {
    src: "/gallery/village-street.webp", span: "g-wide",
    caption: {
      en: "A market lane in early spring — walnut trees, Zhigulis, everyday life",
      ru: "Базарная улочка ранней весной — орешины, «Жигули», повседневная жизнь",
    },
  },
  {
    src: "/gallery/winter-street.png", span: "",
    caption: {
      en: "The main street in winter, poplars standing like sentries",
      ru: "Главная улица зимой, тополя стоят как часовые",
    },
  },
];

export const YT_TRACKS = {
  sogdiana: "DjJ9mOuACoc",
  invasion: "tBV5QhJV8Gk",
  alexandria: "SIVbDe7CpnE",
  death: "FfemUP21T0U",
  conquest: "QulvRHVs8ks",
  samanid: "Ov5ljc44Ajs",
  mongol: "58JoSx396a4",
  steppe: "VAHHaafpHcw",
  empires: "4tjyxHqDNtc",
  today: "vtjhaNtHzMo",
};
