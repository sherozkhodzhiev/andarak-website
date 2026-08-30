export const NAV = [
  { id: "history", label: { ru: "История", en: "History" }, to: "/history" },
  {
    id: "culture", label: { ru: "Культура", en: "Culture" },
    items: [
      { label: { ru: "Культура и традиции", en: "Culture & Traditions" }, to: "/culture" },
      { label: { ru: "Галерея", en: "Gallery" }, to: "/gallery" },
      { label: { ru: "Люди и спорт", en: "People & Sport" }, soon: true },
      { label: { ru: "Диаспора", en: "Diaspora" }, soon: true },
    ],
  },
  {
    id: "life", label: { ru: "Жизнь в Андараке", en: "Life in Andarak" },
    items: [
      { label: { ru: "Медицина и аптеки", en: "Medicine & Pharmacies" }, soon: true },
      { label: { ru: "Бизнес и магазины", en: "Business & Shops" }, soon: true },
      { label: { ru: "Школы и образование", en: "Schools & Education" }, soon: true },
      { label: { ru: "Транспорт и как добраться", en: "Transport & Getting There" }, soon: true },
      { label: { ru: "Администрация и госуслуги", en: "Administration & Services" }, soon: true },
    ],
  },
  {
    id: "guests", label: { ru: "Гостям", en: "For Guests" },
    items: [
      { label: { ru: "Туристам", en: "For Tourists" }, soon: true },
      { label: { ru: "Безопасность и риски", en: "Safety & Risks" }, soon: true },
    ],
  },
  {
    id: "students", label: { ru: "Студентам", en: "Students" },
    items: [
      { label: { ru: "Стипендии и гранты", en: "Scholarships & Grants" }, soon: true },
      { label: { ru: "Волонтёрство", en: "Volunteering" }, soon: true },
      { label: { ru: "Развитие села", en: "Village Development" }, soon: true },
    ],
  },
  {
    id: "news", label: { ru: "Новости", en: "News" },
    items: [
      { label: { ru: "Лента новостей", en: "News Feed" }, soon: true },
      { label: { ru: "Календарь событий", en: "Events Calendar" }, soon: true },
      { label: { ru: "Предложения и обсуждение", en: "Suggestions & Discussion" }, soon: true },
    ],
  },
  {
    id: "about", label: { ru: "О нас", en: "About" },
    items: [
      { label: { ru: "О проекте", en: "About the Project" }, to: "/about" },
      { label: { ru: "Связаться", en: "Contact" }, soon: true },
      { label: { ru: "Поддержать Андарак", en: "Support Andarak" }, soon: true },
    ],
  },
];

export const T = {
  brand: { ru: "АНДАРАК", en: "ANDARAK" },
  brandSub: { ru: "село в Ферганской долине", en: "a village in the Fergana valley" },
  soonBadge: { ru: "скоро", en: "soon" },
  heroSlogan: { ru: "Земля, где встречаются эпохи", en: "The land where eras meet" },
  heroLead: {
    ru: "Таджикское село в Кыргызстане. Тысячи лет люди живут на этой земле — храня свой язык, культуру и традиции.",
    en: "A Tajik village in Kyrgyzstan. For thousands of years people have lived on this land — keeping their language, culture and traditions.",
  },
  heroCta: { ru: "Исследовать историю", en: "Explore the History" },
  heroSecondary: { ru: "Культура и традиции", en: "Culture & Traditions" },
  teasersTitle: { ru: "Разделы", en: "Sections" },
  teasersEyebrow: { ru: "Что внутри", en: "What's inside" },
  soonPageTitle: { ru: "Раздел готовится", en: "Section in preparation" },
  soonPageText: {
    ru: "Этот раздел появится в одном из ближайших обновлений сайта. Пока загляните в историю села или галерею.",
    en: "This section will appear in one of the upcoming updates. Meanwhile, explore the village history or the gallery.",
  },
  soonPageBack: { ru: "На главную", en: "Back home" },
  footerLine: { ru: "Андарак — село, пережившее все империи.", en: "Andarak — the village that outlasted every empire." },
  footerContact: { ru: "Связаться с общиной", en: "Contact the community" },
  footerContactSoon: { ru: "контакты уточняются", en: "contacts to be confirmed" },
  footerNav: { ru: "Разделы", en: "Sections" },
  footerLang: { ru: "Язык", en: "Language" },
  footerPilot: {
    ru: "Пилотная версия сайта. Реальные имена и контакты будут добавлены с согласия жителей.",
    en: "Pilot version. Real names and contacts will be added with residents' consent.",
  },
  emergency: { ru: "Экстренные службы", en: "Emergency services" },
  emergencyItems: {
    ru: [["101", "Пожарная служба"], ["102", "Милиция"], ["103", "Скорая помощь"], ["112", "Единый номер"]],
    en: [["101", "Fire service"], ["102", "Police"], ["103", "Ambulance"], ["112", "Unified number"]],
  },
  historyTeaser: {
    ru: "10 эпох — от согдийских храмов огня до наших дней. Иммерсивная история с музыкой и иллюстрациями.",
    en: "10 eras — from Sogdian fire temples to the present day. An immersive history with music and artwork.",
  },
  backToPortal: { ru: "← На сайт села", en: "← Back to the village site" },
};

export const HOME_TEASERS = [
  {
    to: "/gallery", img: "/gallery/mosque-winter.png",
    title: { ru: "Галерея", en: "Gallery" },
    line: { ru: "Настоящий Андарак — горы, улицы, люди", en: "The real Andarak — mountains, streets, people" },
  },
  {
    to: "/about", img: "/gallery/memorial-arch.png",
    title: { ru: "О проекте", en: "About the Project" },
    line: { ru: "Кто и зачем делает этот сайт", en: "Who makes this site and why" },
  },
];

export const CULTURE_TOPICS = [
  {
    id: "language", span: "c-wide",
    title: { ru: "Язык", en: "Language" },
    tag: { ru: "речь села", en: "the village tongue" },
    glyph: "زبان",
    text: {
      ru: "Андарак — одно из немногих сёл Кыргызстана, где звучит таджикский язык — наследник персидской речи Согдианы. Дома говорят по-таджикски, в школе и на базаре к нему добавляются кыргызский и русский. Три языка живут рядом, как соседи на одной улице.",
      en: "Andarak is one of the few villages in Kyrgyzstan where Tajik — heir to the Persian speech of Sogdiana — is spoken. Tajik at home, Kyrgyz and Russian at school and at the market. Three languages live side by side like neighbours on one street.",
    },
  },
  {
    id: "cuisine",
    img: "/gallery/village-street.webp",
    title: { ru: "Кухня", en: "Cuisine" },
    tag: { ru: "вкус долины", en: "taste of the valley" },
    text: {
      ru: "Плов по большим дням, горячие лепёшки из тандыра, абрикосы и грецкие орехи из собственных садов. Гостя в Андараке не отпускают без чая — а чаще без полного дастархана.",
      en: "Plov on big days, hot tandoor bread, apricots and walnuts from the family orchards. No guest leaves Andarak without tea — and usually not without a full dastarkhan.",
    },
  },
  {
    id: "clothing",
    title: { ru: "Одежда", en: "Clothing" },
    tag: { ru: "нить и узор", en: "thread & pattern" },
    text: {
      ru: "Праздничные атласные платья, тюбетейки, расшитые вручную узоры — традиционная одежда надевается на свадьбы и большие праздники, соединяя поколения одной нитью.",
      en: "Festive atlas-silk dresses, tubeteika caps, hand-embroidered patterns — traditional dress comes out for weddings and major holidays, joining generations with a single thread.",
    },
  },
  {
    id: "music",
    title: { ru: "Музыка", en: "Music" },
    tag: { ru: "звук гор", en: "sound of the mountains" },
    glyph: "♪",
    text: {
      ru: "Дойра задаёт ритм свадьбам, рубаб и най ведут мелодию. Песни на таджикском передаются на слух — от аксакалов к внукам, без нот и записей.",
      en: "The doira drum sets the rhythm of weddings; the rubab and nay carry the melody. Tajik songs are passed down by ear — from elders to grandchildren, with no sheet music.",
    },
  },
  {
    id: "appearance",
    title: { ru: "Внешность", en: "Appearance" },
    tag: { ru: "лица села", en: "faces of the village" },
    text: {
      ru: "Потомки согдийцев и персов: тёмные и каштановые волосы, карие и зелёные глаза, черты, в которых читается вся история долины. Портреты жителей появятся здесь с их согласия.",
      en: "Descendants of Sogdians and Persians: dark and chestnut hair, brown and green eyes, faces that carry the valley's whole history. Residents' portraits will appear here with their consent.",
    },
  },
  {
    id: "holidays", span: "c-tall", img: "/gallery/mosque-winter.png",
    title: { ru: "Праздники", en: "Holidays" },
    tag: { ru: "год по кругу", en: "the turning year" },
    text: {
      ru: "Навруз — главный праздник весны с сумалаком, который варят всем махалля. Орозо айт и Курман айт собирают село у мечети, а свадьбы осенью длятся по несколько дней.",
      en: "Navruz — the great spring festival, with sumalak cooked by the whole mahalla. Orozo Ait and Kurman Ait gather the village at the mosque, and autumn weddings last for days.",
    },
  },
  {
    id: "customs",
    title: { ru: "Обычаи жизненного цикла", en: "Life-cycle Customs" },
    tag: { ru: "от колыбели", en: "from the cradle" },
    text: {
      ru: "Рождение ребёнка, первая колыбель, суннат-той, сватовство и никох — каждый шаг жизни отмечен своим обрядом, и на каждый собирается вся родня.",
      en: "A child's birth, the first cradle, sunnat-toy, matchmaking and nikoh — every step of life has its own rite, and every rite gathers the whole extended family.",
    },
  },
  {
    id: "honor", span: "c-wide", img: "/gallery/memorial-arch.png",
    title: { ru: "Честь и достоинство горцев", en: "Honour & Dignity of Highlanders" },
    tag: { ru: "ценности", en: "values" },
    text: {
      ru: "Слово старшего — закон, гость — от Бога, данное слово держат. Namus — честь семьи и села — здесь не абстракция, а повседневное правило жизни, переданное от дедов.",
      en: "An elder's word is law, a guest is sent by God, a promise is kept. Namus — the honour of family and village — is no abstraction here, but a daily rule of life inherited from the grandfathers.",
    },
  },
  {
    id: "literature",
    title: { ru: "Литература и поэзия", en: "Literature & Poetry" },
    tag: { ru: "слово земляков", en: "words of our people" },
    glyph: "شعر",
    text: {
      ru: "Земля Рудаки помнит стихи. Народные поговорки, бейты и строки местных авторов соберутся в этом разделе — присылайте тексты своих земляков.",
      en: "The land of Rudaki remembers its verse. Folk sayings, beits and lines by local authors will gather in this section — send in the words of your fellow villagers.",
    },
  },
];

export const CULTURE_PAGE = {
  eyebrow: { ru: "Наследие", en: "Heritage" },
  title: { ru: "Культура и традиции", en: "Culture & Traditions" },
  lead: {
    ru: "То, что не разрушили ни армии, ни границы: язык, стол, песня и правила чести. Девять граней живой культуры Андарака.",
    en: "What no army and no border could destroy: the language, the table, the song and the code of honour. Nine facets of Andarak's living culture.",
  },
};

export const GALLERY_PAGE = {
  eyebrow: { ru: "Фотоархив", en: "Photo archive" },
  title: { ru: "Галерея", en: "Gallery" },
  lead: {
    ru: "Настоящий Андарак без фильтров: горы, улицы, времена года. Архив пополняется — присылайте свои снимки села.",
    en: "The real Andarak, unfiltered: mountains, streets, seasons. The archive is growing — send in your photos of the village.",
  },
};

export const ABOUT_PAGE = {
  eyebrow: { ru: "О проекте", en: "About the project" },
  title: { ru: "Зачем этот сайт", en: "Why this site exists" },
  blocks: {
    ru: [
      ["Кто делает", "Сайт создаёт уроженец Андарака, студент, живущий за рубежом. Имя автора появится здесь после запуска полной версии."],
      ["Зачем", "Чтобы у села с 2 500-летней историей был свой дом в интернете: история, культура, новости общины и полезная информация для жителей, гостей и диаспоры."],
      ["Что дальше", "Новости и календарь событий, справочники (медицина, школы, бизнес, транспорт), раздел для студентов, интерактивная карта и голоса жителей."],
      ["Как помочь", "Присылайте фотографии, истории, стихи земляков и идеи. Блок поддержки конкретных нужд села (ремонт школы, дороги) появится в следующем обновлении."],
    ],
    en: [
      ["Who makes it", "The site is built by a native of Andarak, a student living abroad. The author's name will appear here after the full version launches."],
      ["Why", "So that a village with 2,500 years of history has its own home on the internet: history, culture, community news and practical information for residents, guests and the diaspora."],
      ["What's next", "News and an events calendar, directories (medicine, schools, business, transport), a students' section, an interactive map and voices of the residents."],
      ["How to help", "Send photos, stories, poems by fellow villagers and ideas. A support block for concrete village needs (school repairs, roads) is coming in the next update."],
    ],
  },
  pilot: {
    ru: "Пилотная версия: реальные имена, телефоны и официальные данные не публикуются до получения согласия жителей и инстанций. Вместо них — нейтральные заглушки.",
    en: "Pilot version: real names, phone numbers and official data are not published until residents and institutions give consent. Neutral placeholders are used instead.",
  },
};
