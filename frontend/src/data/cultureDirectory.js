const pair = (en, ru) => ({ en, ru });

export const CULTURE_GROUPS = [
  { id: "expression", title: pair("Words & expression", "Слово и творчество") },
  { id: "everyday", title: pair("The art of everyday life", "Культура повседневности") },
  { id: "together", title: pair("The ties that connect us", "То, что нас объединяет") },
];

export const CULTURE_DIRECTORY = [
  { id: "language", group: "expression", icon: "speech", title: pair("Language & local speech", "Язык и местная речь") },
  { id: "literature", group: "expression", icon: "book", title: pair("Poetry & the spoken word", "Поэзия и устное слово") },
  { id: "music", group: "expression", icon: "music", title: pair("Music & song", "Музыка и песни") },
  { id: "oral-histories", group: "expression", icon: "voices", title: pair("Oral histories", "Устные истории") },
  { id: "cuisine", group: "everyday", icon: "food", title: pair("Food & the dastarkhan", "Кухня и дастархан") },
  { id: "hospitality", group: "everyday", icon: "tea", title: pair("Hospitality & tea", "Гостеприимство и чай") },
  { id: "clothing", group: "everyday", icon: "dress", title: pair("Dress & embroidery", "Одежда и вышивка") },
  { id: "crafts", group: "everyday", icon: "craft", title: pair("Crafts & handmade skills", "Ремёсла и ручная работа") },
  { id: "holidays", group: "together", icon: "calendar", title: pair("Festivals & the seasons", "Праздники и времена года") },
  { id: "weddings", group: "together", icon: "celebration", title: pair("Weddings & family celebrations", "Свадьбы и семейные торжества") },
  { id: "customs", group: "together", icon: "family", title: pair("Birth & childhood customs", "Рождение и детские обычаи") },
  { id: "honor", group: "together", icon: "values", title: pair("Respect & shared values", "Уважение и общие ценности") },
  { id: "appearance", group: "together", icon: "people", title: pair("People & identity", "Люди и самобытность") },
];
