const pair = (en, ru) => ({ en, ru });

export const CULTURE_GROUPS = [
  { id: "expression", title: pair("Words & expression", "Слово и творчество") },
  { id: "everyday", title: pair("The art of everyday life", "Культура повседневности") },
  { id: "together", title: pair("The ties that connect us", "То, что нас объединяет") },
];

export const CULTURE_DIRECTORY = [
  { id: "language", group: "expression", icon: "speech", title: pair("Language & local speech", "Язык и местная речь"), placeholder: pair("A space for language and local expressions. More information coming soon.", "Раздел о языке и местных выражениях. Подробности появятся позже.") },
  { id: "literature", group: "expression", icon: "book", title: pair("Poetry & the spoken word", "Поэзия и устное слово"), placeholder: pair("A space for poems, proverbs, and stories. More information coming soon.", "Раздел о стихах, пословицах и рассказах. Подробности появятся позже.") },
  { id: "music", group: "expression", icon: "music", title: pair("Music & song", "Музыка и песни"), placeholder: pair("A space for music and songs. More information coming soon.", "Раздел о музыке и песнях. Подробности появятся позже.") },
  { id: "oral-histories", group: "expression", icon: "voices", title: pair("Oral histories", "Устные истории"), placeholder: pair("A space for personal memories and stories. More information coming soon.", "Раздел для личных воспоминаний и историй. Подробности появятся позже.") },
  { id: "cuisine", group: "everyday", icon: "food", title: pair("Food & the dastarkhan", "Кухня и дастархан"), placeholder: pair("A space for food and recipes. More information coming soon.", "Раздел о кухне и рецептах. Подробности появятся позже.") },
  { id: "hospitality", group: "everyday", icon: "tea", title: pair("Hospitality & tea", "Гостеприимство и чай"), placeholder: pair("A space for hospitality and tea. More information coming soon.", "Раздел о гостеприимстве и чаепитии. Подробности появятся позже.") },
  { id: "clothing", group: "everyday", icon: "dress", title: pair("Dress & embroidery", "Одежда и вышивка"), placeholder: pair("A space for clothing and embroidery. More information coming soon.", "Раздел об одежде и вышивке. Подробности появятся позже.") },
  { id: "crafts", group: "everyday", icon: "craft", title: pair("Crafts & handmade skills", "Ремёсла и ручная работа"), placeholder: pair("A space for crafts and handmade work. More information coming soon.", "Раздел о ремёслах и ручной работе. Подробности появятся позже.") },
  { id: "holidays", group: "together", icon: "calendar", title: pair("Festivals & the seasons", "Праздники и времена года"), placeholder: pair("A space for holidays and celebrations. More information coming soon.", "Раздел о праздниках и торжествах. Подробности появятся позже.") },
  { id: "weddings", group: "together", icon: "celebration", title: pair("Weddings & family celebrations", "Свадьбы и семейные торжества"), placeholder: pair("A space for weddings and family celebrations. More information coming soon.", "Раздел о свадьбах и семейных торжествах. Подробности появятся позже.") },
  { id: "customs", group: "together", icon: "family", title: pair("Birth & childhood customs", "Рождение и детские обычаи"), placeholder: pair("A space for birth and childhood customs. More information coming soon.", "Раздел об обычаях рождения и детства. Подробности появятся позже.") },
  { id: "honor", group: "together", icon: "values", title: pair("Respect & shared values", "Уважение и общие ценности"), placeholder: pair("A space for respect and shared values. More information coming soon.", "Раздел об уважении и общих ценностях. Подробности появятся позже.") },
  { id: "appearance", group: "together", icon: "people", title: pair("People & identity", "Люди и самобытность"), placeholder: pair("A space for people and identity. More information coming soon.", "Раздел о людях и самобытности. Подробности появятся позже.") },
];
