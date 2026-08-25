import asyncio
import base64
import os
import uuid
from dotenv import load_dotenv

load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage

OUT_DIR = "/app/frontend/public/art"
os.makedirs(OUT_DIR, exist_ok=True)

STYLE = (
    "Epic cinematic historical matte painting, painterly digital oil, dramatic chiaroscuro. "
    "Palette: deep charcoal ink shadows, warm parchment highlights, glowing ember-orange firelight, "
    "touches of antique gold. Ancient Central Asia, Fergana valley setting. "
    "Rich atmospheric haze, film-grain texture, museum-quality concept art. Wide 4:3 composition. No text, no watermark."
)

SCENES = [
    ("01-sogdiana", "Zoroastrian Sogdian fire temple at dusk, 6th century BC. Priests in flowing white robes tend a great sacred eternal flame on a stone altar, smoke rising into golden light. Clay-brick village homes of the Fergana valley behind, mountains on the horizon. Villagers bow with offerings of bread and water."),
    ("02-invasion", "Fierce ancient battle, 329 BC: Sogdian horse archers in scale armor wheeling and firing bows, clashing with a Macedonian bronze phalanx with long sarissa spears and round shields. Dust clouds, dramatic low sun, chaos of cavalry charge on the Central Asian steppe."),
    ("03-alexandria", "Hellenistic city under construction on the river Jaxartes, 329 BC: Greek stone columns and fortress walls rising, Greek and Sogdian stonemasons working side by side, wooden scaffolding, half-built temples, wide river and mountains behind. Alexandria Eschate, the Furthest City."),
    ("04-death", "Peaceful Sogdian harvest scene after Alexander's death: farmers cutting golden wheat with sickles beneath towering ochre mountain cliffs, a small distant Macedonian garrison column departing along a river road. Serene golden-hour light, fire temple smoke still rising in the far village."),
    ("05-conquest", "8th century Arab conquest of Transoxiana: armored Arab cavalry under dark banners entering an ancient Sogdian stone town, a fire altar being extinguished, smoke and embers, early brick minaret rising where the temple stood. Somber, heavy, ember-lit dusk."),
    ("06-samanid", "Samanid golden age, 10th century Bukhara at dawn: luminous brick domes and geometric patterned madrasas glowing gold, Persian scholars bent over illuminated manuscripts, an astronomer with an astrolabe charting stars, a poet reciting in a courtyard garden. Radiant, hopeful, ornate."),
    ("07-mongol", "Mongol siege of Samarkand, 1219: horse archers of Genghis Khan pouring across the plain, burning brick citadel and collapsing city gates, libraries aflame, pages and ash falling like snow against a blood-dark sky. The darkest, most catastrophic scene."),
    ("08-steppe", "Silk Road revival, 14th century: nomadic yurts beside a mountain village, bustling khanate bazaar with silk bolts and spice sacks, a camel caravan crossing a river ford toward snow-capped peaks. Warm steppe greens and gold, lively and settled."),
    ("09-empires", "1924 Soviet Central Asia: uniformed cartographers bent over a huge table drawing red pencil borders across a topographic map of the Fergana valley, oil lamps, a Tsarist flag folded in the corner and a red banner on the wall. Cold lamplight over ink and paper, quiet bureaucratic tension."),
    ("10-today", "Modern day Andarak village, Kyrgyzstan: mudbrick and clay homes with flat roofs beneath the towering Turkestan mountain range, children playing in a dusty lane, elders in conversation under a walnut tree, walnut groves and apricot orchards, warm evening light. Peaceful, alive, enduring."),
]


async def gen_one(slug, prompt):
    out = os.path.join(OUT_DIR, f"{slug}.png")
    if os.path.exists(out) and os.path.getsize(out) > 10000:
        print(f"SKIP {slug} (exists)", flush=True)
        return
    for attempt in range(3):
        try:
            chat = LlmChat(
                api_key=os.getenv("EMERGENT_LLM_KEY"),
                session_id=f"andarak-{slug}-{uuid.uuid4().hex[:8]}",
                system_message="You are a world-class historical concept artist.",
            )
            chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
            msg = UserMessage(text=f"{prompt}\n\nArt direction: {STYLE}")
            text, images = await chat.send_message_multimodal_response(msg)
            if images:
                data = base64.b64decode(images[0]["data"])
                with open(out, "wb") as f:
                    f.write(data)
                print(f"OK {slug} ({len(data)//1024} KB)", flush=True)
                return
            print(f"EMPTY {slug} attempt {attempt+1}: {str(text)[:120]}", flush=True)
        except Exception as e:
            print(f"ERR {slug} attempt {attempt+1}: {str(e)[:200]}", flush=True)
            await asyncio.sleep(5)


async def main():
    for slug, prompt in SCENES:
        await gen_one(slug, prompt)
    print("DONE", flush=True)


asyncio.run(main())
