"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type SceneKey = "forest" | "savanna" | "jungle" | "polar";
type AnimalType =
  | "butterfly" | "bird" | "rabbit" | "hedgehog" | "ladybug" | "frog" | "squirrel" | "deer"
  | "elephant" | "zebra" | "giraffe" | "lion" | "hippopotamus" | "crocodile" | "tortoise" | "antelope" | "meerkat"
  | "toucan" | "sloth" | "monkey" | "macaw" | "jaguar" | "flamingo" | "tapir" | "anaconda" 
  | "penguin" | "polarBear" | "seal" | "walrus" | "arcticFox"
  | "whale" | "orca" | "puffin" | "octopus" | "jellyfish"
  | "seaTurtle" | "fish";
type Animal = { id: string; type: AnimalType; name: string; x: number; y: number };
type Round = { type: AnimalType; title: string; instruction: string; hint: string };
type SceneData = { name: string; heading: string; image: string; imageAlt: string; icon: string; animals: Animal[]; rounds: Round[] };

const forestAnimals: Animal[] = [
  { id: "bird-1", type: "bird", name: "Fågel", x: 16, y: 15 },
  { id: "squirrel-1", type: "squirrel", name: "Ekorre", x: 91, y: 36 },
  { id: "butterfly-1", type: "butterfly", name: "Fjäril", x: 22, y: 40 },
  { id: "butterfly-2", type: "butterfly", name: "Fjäril", x: 43, y: 47 },
  { id: "butterfly-3", type: "butterfly", name: "Fjäril", x: 81, y: 74 },
  { id: "rabbit-1", type: "rabbit", name: "Kanin", x: 10, y: 72 },
  { id: "rabbit-2", type: "rabbit", name: "Kanin", x: 25, y: 63 },
  { id: "rabbit-3", type: "rabbit", name: "Kanin", x: 61, y: 72 },
  { id: "hedgehog-1", type: "hedgehog", name: "Igelkott", x: 38, y: 87 },
  { id: "ladybug-1", type: "ladybug", name: "Nyckelpiga", x: 10, y: 88 },
  { id: "ladybug-2", type: "ladybug", name: "Nyckelpiga", x: 21, y: 83 },
  { id: "ladybug-3", type: "ladybug", name: "Nyckelpiga", x: 94, y: 88 },
  { id: "frog-1", type: "frog", name: "Groda", x: 48, y: 81 },
  { id: "frog-2", type: "frog", name: "Groda", x: 88, y: 64 },
  { id: "squirrel-2", type: "squirrel", name: "Ekorre", x: 37, y: 72 },
  { id: "deer-1", type: "deer", name: "Rådjur", x: 37, y: 43 },
];

const forestRounds: Round[] = [
  { type: "butterfly", title: "Fjärilar", instruction: "Hitta och tryck på alla fjärilar i bilden.", hint: "Titta bland blommorna och ovanför bäcken!" },
  { type: "rabbit", title: "Kaniner", instruction: "Hur många kaniner hittar du?", hint: "Leta efter långa öron och mjuk päls!" },
  { type: "bird", title: "Fåglar", instruction: "Tryck på alla fåglar du kan hitta.", hint: "Titta uppe i träden och på grenarna!" },
  { type: "frog", title: "Grodor", instruction: "Nu ska vi räkna grodor!", hint: "Kika vid vattnet och på stenarna!" },
  { type: "ladybug", title: "Nyckelpigor", instruction: "Kan du hitta alla nyckelpigor?", hint: "Titta noga bland de gröna bladen!" },
  { type: "hedgehog", title: "Igelkottar", instruction: "Hur många igelkottar finns i skogen?", hint: "Leta efter små djur med taggig rygg!" },
  { type: "squirrel", title: "Ekorrar", instruction: "Dags att räkna ekorrar!", hint: "Titta uppe vid trädstammarna och nere på marken!" },
  { type: "deer", title: "Rådjur", instruction: "Kan du hitta rådjuret?", hint: "Titta bland träden och på ängen!" },
];

const savannaAnimals: Animal[] = [
  // Bird in the tree
  { id: "bird-1", type: "bird", name: "Afrikansk fågel", x: 15, y: 10 },

  // Large animals on the left
  { id: "elephant-1", type: "elephant", name: "Elefant", x: 16, y: 42 },
  { id: "zebra-1", type: "zebra", name: "Zebra", x: 29, y: 45 },
  { id: "zebra-2", type: "zebra", name: "Zebra", x: 13, y: 69 },
  { id: "giraffe-1", type: "giraffe", name: "Giraff", x: 37, y: 40 },

  // Lion
  { id: "lion-1", type: "lion", name: "Lejon", x: 90, y: 36 },

  // Butterflies
  { id: "butterfly-1", type: "butterfly", name: "Fjäril", x: 33, y: 26 },
  { id: "butterfly-2", type: "butterfly", name: "Fjäril", x: 83, y: 38 },
  { id: "butterfly-3", type: "butterfly", name: "Fjäril", x: 67, y: 72 },

  // Animals around the water
  { id: "hippopotamus-1", type: "hippopotamus", name: "Flodhäst", x: 56, y: 57 },
  { id: "crocodile-1", type: "crocodile", name: "Krokodil", x: 75, y: 55 },

  // Animals on the right
  { id: "tortoise-1", type: "tortoise", name: "Sköldpadda", x: 81, y: 80 },
  { id: "antelope-1", type: "antelope", name: "Antilop", x: 88, y: 59 },

  // Meerkats grouped on the rock
  { id: "meerkat-1", type: "meerkat", name: "Surikat", x: 27, y: 69 },
  { id: "meerkat-2", type: "meerkat", name: "Surikat", x: 31, y: 66 },
  { id: "meerkat-3", type: "meerkat", name: "Surikat", x: 35, y: 67 },
];

const savannaRounds: Round[] = [
  { type: "elephant", title: "Elefanter", instruction: "Hitta elefanten i savannen.", hint: "Titta på den stora grå elefanten till vänster!" },
  { type: "zebra", title: "Zebror", instruction: "Kan du hitta alla zebror?", hint: "Leta efter svartvita ränder – en zebra står längre bak och en längre fram." },
  { type: "giraffe", title: "Giraffer", instruction: "Hitta giraffen med den långa halsen.", hint: "Titta högt upp bland träden, nära mitten av bilden!" },
  { type: "lion", title: "Lejon", instruction: "Kan du hitta lejonet?", hint: "Leta på klippan uppe till höger." },
  { type: "butterfly", title: "Fjärilar", instruction: "Hitta och tryck på alla fjärilar.", hint: "Titta i luften ovanför gräset och vattnet!" },
  { type: "hippopotamus", title: "Flodhästar", instruction: "Vem plaskar i vattnet? Hitta flodhästen.", hint: "Flodhästen ligger mitt i vattenhålet." },
  { type: "crocodile", title: "Krokodiler", instruction: "Kan du upptäcka krokodilen?", hint: "Titta vid vattenkanten på den högra sidan." },
  { type: "tortoise", title: "Sköldpaddor", instruction: "Hitta sköldpaddan som går på marken.", hint: "Leta långt ner till höger i bilden." },
  { type: "antelope", title: "Antiloper", instruction: "Hitta antilopen vid vattenhålet.", hint: "Titta på den brunvita, långbenta antilopen till höger." },
  { type: "meerkat", title: "Surikater", instruction: "Hur många surikater hittar du?", hint: "De små surikaterna står tillsammans på en klippa nere till vänster." },
  { type: "bird", title: "Fåglar", instruction: "Kan du hitta den färgglada fågeln?", hint: "Titta uppe i trädet längst till vänster." },
];
const jungleAnimals: Animal[] = [
  { id: "toucan-1", type: "toucan", name: "Tukan", x: 10, y: 10 },
  { id: "sloth-1", type: "sloth", name: "Sengångare", x: 29, y: 13 },
  { id: "monkey-1", type: "monkey", name: "Apa", x: 44, y: 13 },
  { id: "monkey-2", type: "monkey", name: "Apa", x: 48, y: 13 },
  { id: "macaw-1", type: "macaw", name: "Ara", x: 91, y: 12 },
  { id: "jaguar-1", type: "jaguar", name: "Jaguar", x: 15, y: 46 },
  { id: "elephant-1", type: "elephant", name: "Skogselefant", x: 37, y: 39 },
  { id: "flamingo-1", type: "flamingo", name: "Flamingo", x: 48, y: 42 },
  { id: "flamingo-2", type: "flamingo", name: "Flamingo", x: 53, y: 43 },
  { id: "flamingo-3", type: "flamingo", name: "Flamingo", x: 57, y: 42 },
  { id: "tapir-1", type: "tapir", name: "Tapir", x: 85, y: 47 },
  { id: "crocodile-1", type: "crocodile", name: "Krokodil", x: 76, y: 57 },
  { id: "hippopotamus-1", type: "hippopotamus", name: "Flodhäst", x: 55, y: 64 },
  { id: "tortoise-1", type: "tortoise", name: "Sköldpadda", x: 77, y: 73 },
  { id: "frog-1", type: "frog", name: "Groda", x: 92, y: 79 },
  { id: "frog-2", type: "frog", name: "Groda", x: 10, y: 73 },
  { id: "anaconda-1", type: "anaconda", name: "Anakonda", x: 37, y: 85 },
  { id: "butterfly-1", type: "butterfly", name: "Fjäril", x: 91, y: 34 },
  { id: "butterfly-2", type: "butterfly", name: "Fjäril", x: 35, y: 70 },
];

const jungleRounds: Round[] = [
  { type: "jaguar", title: "Jaguaren", instruction: "Kan du hitta jaguaren?", hint: "Leta efter den stora fläckiga katten till vänster." },
  { type: "monkey", title: "Apor", instruction: "Hur många apor hittar du?", hint: "Titta högt uppe bland grenarna." },
  { type: "toucan", title: "Tukanen", instruction: "Hitta fågeln med den stora näbben.", hint: "Titta uppe i trädet längst till vänster." },
  { type: "sloth", title: "Sengångaren", instruction: "Kan du hitta sengångaren?", hint: "Leta efter djuret som hänger och vilar i en gren." },
  { type: "flamingo", title: "Flamingor", instruction: "Räkna alla flamingor vid vattnet.", hint: "De rosa fåglarna står i vattnet nära vattenfallet." },
  { type: "frog", title: "Grodor", instruction: "Hur många grodor kan du hitta?", hint: "Titta bland bladen längst ner i bilden." },
  { type: "butterfly", title: "Fjärilar", instruction: "Hitta alla fjärilar.", hint: "Titta bland de gröna bladen och uppe i luften." },
  { type: "elephant", title: "Skogselefanten", instruction: "Kan du hitta elefanten?", hint: "Leta efter det stora grå djuret till vänster om vattenfallet." },
  { type: "tapir", title: "Tapiren", instruction: "Hitta tapiren i grönskan.", hint: "Titta på högra sidan, nära vattnet." },
  { type: "crocodile", title: "Krokodilen", instruction: "Kan du hitta krokodilen?", hint: "Leta i vattnet på höger sida." },
  { type: "hippopotamus", title: "Flodhästen", instruction: "Vem plaskar i vattnet?", hint: "Titta mitt i vattnet." },
  { type: "macaw", title: "Ara-papegojan", instruction: "Hitta den färgglada arapapegojan.", hint: "Titta uppe i trädet längst till höger." },
  { type: "anaconda", title: "Anakondan", instruction: "Kan du upptäcka anakondan?", hint: "Leta efter den långa, mönstrade ormen längst ner." },
  { type: "tortoise", title: "Sköldpaddan", instruction: "Hitta sköldpaddan.", hint: "Titta nere till höger vid vattnet." },
];

const polarAnimals: Animal[] = [
  // Djur på isen
  { id: "polarBear-1", type: "polarBear", name: "Isbjörn", x: 25, y: 22 },
  { id: "polarBear-2", type: "polarBear", name: "Isbjörnsunge", x: 31, y: 32 },

  { id: "puffin-1", type: "puffin", name: "Lunnefågel", x: 4, y: 6 },
  { id: "puffin-2", type: "puffin", name: "Lunnefågel", x: 9, y: 12 },
  { id: "puffin-3", type: "puffin", name: "Lunnefågel", x: 6, y: 26 },

  { id: "penguin-1", type: "penguin", name: "Pingvin", x: 42, y: 27 },
  { id: "penguin-2", type: "penguin", name: "Pingvin", x: 45, y: 27 },
  { id: "penguin-3", type: "penguin", name: "Pingvinunge", x: 48, y: 26 },

  { id: "walrus-1", type: "walrus", name: "Valross", x: 81, y: 25 },
  { id: "arcticFox-1", type: "arcticFox", name: "Fjällräv", x: 96, y: 27 },
  { id: "seal-ice-1", type: "seal", name: "Säl", x: 68, y:26 },

  // Djur under vattenytan
  { id: "whale-1", type: "whale", name: "Val", x: 68, y: 45 },
  { id: "orca-1", type: "orca", name: "Späckhuggare", x: 38, y: 64 },
  { id: "seal-water-1", type: "seal", name: "Säl", x: 14, y: 58 },
  { id: "jellyfish-1", type: "jellyfish", name: "Manet", x: 91, y: 66 },
  { id: "octopus-1", type: "octopus", name: "Bläckfisk", x: 12, y: 83 },
  { id: "seaTurtle-1", type: "seaTurtle", name: "Havssköldpadda", x: 51, y: 82 },

  // Små fiskar
  { id: "fish-1", type: "fish", name: "Fisk", x: 30, y: 83 },
  { id: "fish-2", type: "fish", name: "Fisk", x: 60, y: 72 },
  { id: "fish-3", type: "fish", name: "Fisk", x: 78, y: 72 },
  { id: "fish-4", type: "fish", name: "Fisk", x: 88, y: 89 },
];



const polarRounds: Round[] = [
  {
    type: "penguin",
    title: "Pingviner",
    instruction: "Hur många pingviner hittar du?",
    hint: "Leta bland stenarna till vänster och på isen längre bak.",
  },
  {
    type: "polarBear",
    title: "Isbjörnar",
    instruction: "Hitta isbjörnarna på isen.",
    hint: "Titta på de stora vita björnarna till vänster.",
  },
  {
    type: "puffin",
    title: "Lunnefåglar",
    instruction: "Kan du hitta alla lunnefåglar?",
    hint: "Leta efter fåglar med färgglada näbbar.",
  },
  {
    type: "seal",
    title: "Sälar",
    instruction: "Hitta sälarna vid och under vattenytan.",
    hint: "Leta både på isen och under vattnet.",
  },
  {
    type: "walrus",
    title: "Valross",
    instruction: "Kan du hitta valrossen?",
    hint: "Leta uppe på isen till höger.",
  },
  {
    type: "arcticFox",
    title: "Fjällräv",
    instruction: "Hitta fjällräven i snön.",
    hint: "Titta på den högra sidan av bilden.",
  },
  {
    type: "whale",
    title: "Val",
    instruction: "Hitta valen som sticker upp ur vattnet.",
    hint: "Titta mitt i vattnet, strax ovanför vattenytan.",
  },
  {
    type: "orca",
    title: "Späckhuggare",
    instruction: "Kan du hitta späckhuggaren?",
    hint: "Leta efter den svartvita valen under vattenytan.",
  },
  {
    type: "jellyfish",
    title: "Manet",
    instruction: "Hitta maneten i havet.",
    hint: "Titta under vattnet långt till höger.",
  },
  {
    type: "octopus",
    title: "Bläckfisk",
    instruction: "Kan du hitta bläckfisken?",
    hint: "Leta nere till vänster bland tången.",
  },
  {
    type: "seaTurtle",
    title: "Havssköldpadda",
    instruction: "Hitta havssköldpaddan som simmar.",
    hint: "Titta under vattenytan, ungefär mitt i bilden.",
  },
  {
    type: "fish",
    title: "Fiskar",
    instruction: "Hur många fiskstim kan du hitta?",
    hint: "Leta efter små fiskar under vattenytan.",
  },
];



const scenes: Record<SceneKey, SceneData> = {
  forest: {
    name: "Skogen", heading: "Räkna djuren i skogen", image: "/images/djurens-varld.png",
    imageAlt: "En färgglad skog med fåglar, fjärilar, rådjur, kaniner, grodor, ekorrar, igelkottar och nyckelpigor.",
    icon: "🌳", animals: forestAnimals, rounds: forestRounds,
  },
  savanna: {
    name: "Afrikas savann", heading: "Räkna djuren på savannen", image: "/images/afrikas-savann.png",
    imageAlt: "En färgglad afrikansk savann med elefant, zebror, giraff, lejon, surikater, flodhäst, krokodil, sköldpadda, antilop, fjärilar och en färgglad fågel.",
    icon: "🦒", animals: savannaAnimals, rounds: savannaRounds,
  },
  jungle: {
    name: "Tropisk regnskog",
    heading: "Räkna djuren i regnskogen",
    image: "/images/tropisk-regnskog.png",
    imageAlt: "En frodig tropisk regnskog med jaguar, sengångare, apor, tukan, arapapegoja, skogselefant, flamingor, tapir, krokodil, flodhäst, sköldpadda, grodor, anakonda och fjärilar.",
    icon: "🌴",
    animals: jungleAnimals,
    rounds: jungleRounds,
  },
   polar: {
    name: "Polarområdet och havet",
    heading: "Räkna djuren vid isen och i havet",
    image: "/images/polar-hav.png",
    imageAlt: "En färgglad polarvärld med isbjörnar, pingviner, lunnefåglar, sälar, valross, fjällräv, val, späckhuggare, havssköldpadda, bläckfisk, manet och fiskar.",
    icon: "🐧",
    animals: polarAnimals,
    rounds: polarRounds,
  },


};

const animalEmojis: Record<AnimalType, string> = {
  butterfly: "🦋", bird: "🐦", rabbit: "🐰", hedgehog: "🦔", ladybug: "🐞", frog: "🐸", squirrel: "🐿️", deer: "🦌",
  elephant: "🐘", zebra: "🦓", giraffe: "🦒", lion: "🦁", hippopotamus: "🦛", crocodile: "🐊", tortoise: "🐢", antelope: "🦌", meerkat: "🐾",toucan: "🐦", sloth: "🦥", monkey: "🐒", macaw: "🦜", jaguar: "🐆",
  flamingo: "🦩", tapir: "🐗", anaconda: "🐍",penguin: "🐧",
  polarBear: "🐻‍❄️", seal: "🦭", walrus: "🦭", arcticFox: "🦊", whale: "🐋", orca: "🐳", puffin: "🐧", octopus: "🐙", jellyfish: "🪼", seaTurtle: "🐢", fish: "🐟", 
};

function shuffleRounds(items: Round[]): Round[] {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  return shuffled;
}

export default function DjurensVarldPage() {
  const [selectedScene, setSelectedScene] = useState<SceneKey | null>(null);
  const [gameRounds, setGameRounds] = useState<Round[]>(forestRounds);
  const [roundIndex, setRoundIndex] = useState(0);
  const [foundAnimals, setFoundAnimals] = useState<string[]>([]);
  const [message, setMessage] = useState("Ta god tid på dig och titta noga!");
  const [showHint, setShowHint] = useState(false);

  // Return to the scene-selection screen and clear the previous game.
  function resetSceneSelection() {
    setSelectedScene(null);
    setGameRounds(shuffleRounds(forestRounds));
    setRoundIndex(0);
    setFoundAnimals([]);
    setMessage("Ta god tid på dig och titta noga!");
    setShowHint(false);
  }

  // Also reset if the browser restores this page from its navigation cache.
  useEffect(() => {
    const resetOnHistoryNavigation = () => {
      setSelectedScene(null);
      setGameRounds(shuffleRounds(forestRounds));
      setRoundIndex(0);
      setFoundAnimals([]);
      setMessage("Ta god tid på dig och titta noga!");
      setShowHint(false);
    };

    window.addEventListener("pageshow", resetOnHistoryNavigation);
    window.addEventListener("popstate", resetOnHistoryNavigation);
    return () => {
      window.removeEventListener("pageshow", resetOnHistoryNavigation);
      window.removeEventListener("popstate", resetOnHistoryNavigation);
    };
  }, []);

  const scene = selectedScene ? scenes[selectedScene] : null;
  const round = gameRounds[roundIndex];
  const animals = scene?.animals ?? [];
  const targets = animals.filter((animal) => animal.type === round?.type);
  const complete = targets.length > 0 && foundAnimals.length === targets.length;
  const allComplete = Boolean(scene && roundIndex === gameRounds.length - 1 && complete);

  function chooseScene(key: SceneKey) {
    setSelectedScene(key);
    setGameRounds(shuffleRounds(scenes[key].rounds));
    setRoundIndex(0);
    setFoundAnimals([]);
    setMessage("Ta god tid på dig och titta noga!");
    setShowHint(false);
  }

  function handleAnimalClick(animal: Animal) {
    if (!round) return;
    if (animal.type !== round.type) {
      setMessage(`Bra spanat! Men just nu letar vi efter ${round.title.toLowerCase()}.`);
      return;
    }
    if (foundAnimals.includes(animal.id)) {
      setMessage("Den har du redan räknat! Leta efter en till.");
      return;
    }
    const updated = [...foundAnimals, animal.id];
    setFoundAnimals(updated);
    if (updated.length === targets.length) setMessage("Fantastiskt! Du hittade allihop! 🎉");
    else setMessage(`Bra jobbat! Du har hittat ${updated.length} av ${targets.length}.`);
  }

  function nextRound() {
    if (!complete || roundIndex >= gameRounds.length - 1) return;
    setRoundIndex((current) => current + 1);
    setFoundAnimals([]);
    setMessage("Ta god tid på dig och titta noga!");
    setShowHint(false);
  }

  function restartGame() {
    if (!selectedScene) return;
    setGameRounds(shuffleRounds(scenes[selectedScene].rounds));
    setRoundIndex(0);
    setFoundAnimals([]);
    setMessage("Ta god tid på dig och titta noga!");
    setShowHint(false);
  }

  return (
    <main className="min-h-screen bg-[#FFFCF2] px-4 py-5 text-[#07594F] sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" onClick={resetSceneSelection} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#D7F1E1] px-5 py-3 font-bold transition hover:bg-[#C3E9D4]">
            <span aria-hidden="true">←</span> Tillbaka till startsidan
          </Link>
          <Link href="/" onClick={resetSceneSelection} className="text-xl font-extrabold tracking-tight sm:text-2xl">🐢 Djurens värld</Link>
          {scene && (
            <div className="rounded-full bg-[#DDF2E4] px-5 py-3">
              <p className="text-sm font-bold">Uppdrag {roundIndex + 1} av {gameRounds.length}</p>
              <div className="mt-2 flex gap-1.5" aria-label={`${roundIndex + 1} av ${gameRounds.length} uppdrag`}>
                {gameRounds.map((item, index) => <span key={`${item.title}-${index}`} className={`h-3 w-3 rounded-full ${index <= roundIndex ? "bg-[#159D76]" : "bg-[#B9DCC9]"}`} />)}
              </div>
            </div>
          )}
        </div>

        {!scene ? (
          <section className="mx-auto mt-12 max-w-4xl text-center">
            <span className="inline-flex rounded-full bg-[#CDEEDF] px-5 py-2 text-sm font-extrabold">Djurens värld</span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Vart ska vi på djurspaning?</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8">Välj en plats att utforska! Leta efter djuren i bilden, räkna dem och samla alla uppdrag.</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <button type="button" onClick={() => chooseScene("forest")} className="group overflow-hidden rounded-[2rem] border-2 border-[#CBE7D4] bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-[#159D76] hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400">
                <img src="/images/djurens-varld.png" alt="Illustration av skogen med vilda djur" className="aspect-[16/9] w-full object-cover" />
                <div className="p-6"><h2 className="text-2xl font-extrabold">Skogen</h2><p className="mt-2 leading-6">Spana efter kaniner, ekorrar, grodor och fler skogsvänner.</p><span className="mt-5 inline-flex rounded-full bg-[#087C66] px-6 py-3 font-extrabold text-white transition group-hover:bg-[#07594F]">Utforska skogen →</span></div>
              </button>
              <button type="button" onClick={() => chooseScene("savanna")} className="group overflow-hidden rounded-[2rem] border-2 border-[#CBE7D4] bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-[#159D76] hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400">
                <img src="/images/afrikas-savann.png" alt="Illustration av den afrikanska savannen med vilda djur" className="aspect-[16/9] w-full object-cover" />
                <div className="p-6"><h2 className="text-2xl font-extrabold">Afrikas savann</h2><p className="mt-2 leading-6">Hitta elefanter, zebror, surikater och andra savanndjur.</p><span className="mt-5 inline-flex rounded-full bg-[#087C66] px-6 py-3 font-extrabold text-white transition group-hover:bg-[#07594F]">Utforska savannen →</span></div>
              </button>
              <button type="button" onClick={() => chooseScene("jungle")} className="group overflow-hidden rounded-[2rem] border-2 border-[#CBE7D4] bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-[#159D76] hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400">
                <img src="/images/tropisk-regnskog.png" alt="Illustration av en tropisk regnskog med djur" className="aspect-[16/9] w-full object-cover" />
                <div className="p-6"><h2 className="text-2xl font-extrabold">Tropisk regnskog</h2><p className="mt-2 leading-6">Spana efter jaguarer, apor, sengångare och färgglada fåglar.</p><span className="mt-5 inline-flex rounded-full bg-[#087C66] px-6 py-3 font-extrabold text-white transition group-hover:bg-[#07594F]">Utforska regnskogen →</span></div>
              </button>
              <button type="button" onClick={() => chooseScene("polar")} className="group overflow-hidden rounded-[2rem] border-2 border-[#CBE7D4] bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-[#159D76] hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400">
                <img src="/images/polar-hav.png" alt="Illustration av polarområdet och havet med djur" className="aspect-[16/9] w-full object-cover"/>
                 <div className="p-6"><h2 className="text-2xl font-extrabold">Polarområdet och havet</h2><p className="mt-2 leading-6">Räkna pingviner, sälar, valar och andra djur i isen och havet.</p><span className="mt-5 inline-flex rounded-full bg-[#087C66] px-6 py-3 font-extrabold text-white transition group-hover:bg-[#07594F]">Utforska polarvärlden →</span></div>
              </button>


            </div>
          </section>
        ) : (
          <>
            <section className="mt-8 grid items-center gap-5 lg:grid-cols-[1fr_auto]">
              <div>
                <span className="inline-flex rounded-full bg-[#CDEEDF] px-5 py-2 text-sm font-extrabold">{scene.name}</span>
                <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">{scene.heading}</h1>
                <p className="mt-3 max-w-3xl text-base leading-7 sm:text-xl sm:leading-8">{round.instruction} Följ hur många du hittar!</p>
              </div>
              <div className="hidden items-center gap-3 rounded-full bg-[#E0F4E5] p-4 md:flex"><span className="text-6xl" aria-hidden="true">{scene.icon}</span><p className="max-w-32 font-extrabold">Du klarar det! 💚</p></div>
            </section>

            {allComplete ? (
              <section className="mt-8 rounded-[2rem] bg-[#DFF4E4] px-6 py-16 text-center shadow-sm sm:px-12">
                <p className="text-7xl" aria-hidden="true">🏆</p><h2 className="mt-5 text-3xl font-extrabold sm:text-5xl">Du klarade det!</h2>
                <p className="mx-auto mt-4 max-w-xl text-lg leading-8">Vilken fantastisk djurspanare du är! Du har klarat alla {gameRounds.length} uppdrag i {scene.name}.</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3"><button onClick={restartGame} className="rounded-full bg-[#087C66] px-8 py-4 font-extrabold text-white transition hover:bg-[#07594F]">Spela igen ↻</button><button onClick={() => setSelectedScene(null)} className="rounded-full border-2 border-[#087C66] px-8 py-4 font-extrabold transition hover:bg-white">Välj en annan plats</button></div>
              </section>
            ) : (
              <section className="mt-6 grid items-stretch gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(280px,1fr)]">
                <div className="relative h-fit overflow-hidden rounded-3xl border border-[#CBE7D4] bg-[#DFF4E4] shadow-sm">
                  <img src={scene.image} alt={scene.imageAlt} className="block h-auto w-full select-none" draggable={false} />
                  {animals.map((animal) => {
                    const isFound = foundAnimals.includes(animal.id);
                    const isTarget = animal.type === round.type;
                    return <button key={animal.id} type="button" aria-label={isFound ? `${animal.name}, redan räknad` : `Tryck för att räkna ${animal.name.toLowerCase()}`} aria-pressed={isFound} onClick={() => handleAnimalClick(animal)} style={{ left: `${animal.x}%`, top: `${animal.y}%`, width: scene === scenes.polar
    ? (animal.type === "fish" || animal.type === "penguin" || animal.type === "puffin" ? "4.5%" : "6%")
    : scene === scenes.savanna && animal.type === "meerkat"
      ? "4.5%"
      : scene === scenes.savanna
        ? "6%"
        : "7%",
 height: "auto", aspectRatio: "1 / 1", transform: "translate(-50%, -50%)" }} className={`absolute flex items-center justify-center rounded-full border-2 transition-all duration-200 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400 ${isFound ? "z-[2] scale-110 border-[#087C66] bg-[#A7E9C6]/65 shadow-[0_0_0_4px_rgba(8,124,102,0.35)]" : "border-transparent bg-transparent hover:border-white/80 hover:bg-white/20"}`}>
                      {isFound && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#087C66] text-xs font-black text-white shadow sm:h-8 sm:w-8 sm:text-base">✓</span>}
                      {!isFound && isTarget && <span className="sr-only">Hitta mig</span>}
                    </button>;
                  })}
                </div>

                <aside className="flex flex-col rounded-3xl bg-[#E1F4E5] p-5 sm:p-7">
                  
<div className="flex min-w-0 items-center gap-3 sm:gap-4">
  <div
    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-4xl sm:h-20 sm:w-20"
    aria-hidden="true"
  >
    {animalEmojis[round.type]}
  </div>

  <div className="min-w-0 flex-1">
    <h2 className="break-words text-xl font-extrabold leading-tight sm:text-2xl lg:text-3xl">{round.title}</h2><p className="mt-1 text-sm leading-5 sm:text-base sm:leading-6">Hitta och tryck på alla.</p></div></div>
                  <div className="mt-6 flex items-center justify-center gap-4 rounded-3xl border-2 border-[#C9E8D6] bg-white px-4 py-6" aria-live="polite" aria-atomic="true"><span className="text-4xl" aria-hidden="true">{animalEmojis[round.type]}</span><p className="text-4xl font-extrabold tabular-nums sm:text-5xl">{foundAnimals.length} / {targets.length}</p></div>
                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#C7E4D1]" role="progressbar" aria-label="Uppdragets framsteg" aria-valuemin={0} aria-valuemax={targets.length} aria-valuenow={foundAnimals.length}><div className="h-full rounded-full bg-[#159D76] transition-all duration-300" style={{ width: `${(foundAnimals.length / targets.length) * 100}%` }} /></div>
                  <p className="mt-5 min-h-14 font-semibold leading-6" aria-live="polite">{message}</p>
                  <button type="button" onClick={() => setShowHint((current) => !current)} className="mt-3 flex items-center gap-3 rounded-2xl px-2 py-3 text-left transition hover:bg-white/60" aria-expanded={showHint}><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-2xl" aria-hidden="true">💡</span><span className="font-bold">{showHint ? "Dölj ledtråden" : "Behöver du en ledtråd?"}</span></button>
                  {showHint && <p className="rounded-2xl bg-white/70 p-4 text-sm leading-6">{round.hint}</p>}
                  <div className="mt-auto pt-6"><button type="button" onClick={nextRound} disabled={!complete} className="w-full rounded-full bg-[#087C66] px-5 py-4 font-extrabold text-white transition hover:bg-[#07594F] disabled:cursor-not-allowed disabled:bg-[#A5CDB9] disabled:text-[#315F50]">Nästa uppdrag →</button>{!complete && <p className="mt-3 text-center text-sm text-[#47776A]">Hitta alla {targets.length} så kan du gå vidare!</p>}</div>
                  <button type="button" onClick={resetSceneSelection} className="mt-4 rounded-full px-4 py-2 text-sm font-bold text-[#47776A] transition hover:bg-white/60">← Byt plats</button>
                </aside>
              </section>
            )}
          </>
        )}
        <footer className="py-8 text-center text-sm font-medium text-[#47776A]">🌿 En trygg och lekfull plats att öva matematik. 🌼</footer>
      </div>
    </main>
  );
}
