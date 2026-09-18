export type Book = {
  id: string;
  title: string;
  titleUz: string;
  author: string;
  category: "klassika" | "xotira" | "ommabop";
  year: string;
  about: string;
  topics: string[];
};

export const categoryLabels: Record<Book["category"], string> = {
  klassika: "Tibbiy-ilmiy va darsliklar",
  xotira: "Shifokorlar xotiralari",
  ommabop: "Ommabop salomatlik",
};

export const books: Book[] = [
  {
    id: "netter",
    title: "Atlas of Human Anatomy",
    titleUz: "Inson anatomiyasi atlasi",
    author: "Frank H. Netter",
    category: "klassika",
    year: "1989",
    about:
      "Inson tanasining bosqichma-bosqich tasvirlangan anatomik atlasi. Organlar, tomirlar va nervlarning joylashuvini aniqlashda asos.",
    topics: ["Anatomiya", "Topografiya", "Organlar tizimi"],
  },
  {
    id: "harrison",
    title: "Harrison's Principles of Internal Medicine",
    titleUz: "Ichki kasalliklar asoslari",
    author: "J. Larry Jameson va boshqalar",
    category: "klassika",
    year: "1950",
    about:
      "Ichki kasalliklar bo'yicha eng nufuzli qo'llanma: simptomlardan tashxisga o'tish algoritmlari va davolash tamoyillari.",
    topics: ["Ichki kasalliklar", "Differensial tashxis", "Davolash"],
  },
  {
    id: "guyton",
    title: "Guyton and Hall Textbook of Medical Physiology",
    titleUz: "Tibbiy fiziologiya darsligi",
    author: "John E. Hall",
    category: "klassika",
    year: "1956",
    about:
      "Organizm funksiyalarining normal va buzilgan holatlari. Simptom qanday fiziologik mexanizmdan kelib chiqqanini tushuntiradi.",
    topics: ["Fiziologiya", "Gomeostaz", "Qon aylanish"],
  },
  {
    id: "robbins",
    title: "Robbins & Cotran Pathologic Basis of Disease",
    titleUz: "Kasalliklarning patologik asoslari",
    author: "Vinay Kumar, Abul K. Abbas, Jon C. Aster",
    category: "klassika",
    year: "1957",
    about:
      "Kasallik jarayonlarining hujayra va to'qima darajasidagi sabablari — yallig'lanish, o'sma va degenerativ o'zgarishlar.",
    topics: ["Patologiya", "Yallig'lanish", "Onkologiya"],
  },
  {
    id: "kalanithi",
    title: "When Breath Becomes Air",
    titleUz: "Nafas havoga aylanganda",
    author: "Paul Kalanithi",
    category: "xotira",
    year: "2016",
    about:
      "Neyroxirurgning saraton bilan yuzlashuvi. Bemor va shifokor nuqtai nazarining birlashishi haqidagi xotira.",
    topics: ["Onkologiya", "Empatiya", "Hayot sifati"],
  },
  {
    id: "gawande-mortal",
    title: "Being Mortal",
    titleUz: "O'limli mavjudotlar",
    author: "Atul Gawande",
    category: "xotira",
    year: "2014",
    about:
      "Umr oxiridagi tibbiy qarorlar, palliativ yordam va bemorning haqiqiy istaklarini eshitish san'ati.",
    topics: ["Palliativ yordam", "Geriatriya", "Qaror qabul qilish"],
  },
  {
    id: "marsh",
    title: "Do No Harm",
    titleUz: "Zarar yetkazma",
    author: "Henry Marsh",
    category: "xotira",
    year: "2014",
    about:
      "Miya jarrohining hayot, o'lim va xato haqidagi ochiq hikoyalari. Nevrologik belgilarning og'irligi haqida tushuncha beradi.",
    topics: ["Neyroxirurgiya", "Miya", "Xavf-xatar"],
  },
  {
    id: "mukherjee",
    title: "The Emperor of All Maladies",
    titleUz: "Barcha kasalliklar imperatori",
    author: "Siddhartha Mukherjee",
    category: "xotira",
    year: "2010",
    about: "Saraton kasalligining tarixi, tashxis usullari va zamonaviy davolash yo'llari haqida biografiya.",
    topics: ["Saraton", "Tarix", "Skrining"],
  },
  {
    id: "sacks",
    title: "The Man Who Mistook His Wife for a Hat",
    titleUz: "Xotinini shlyapa deb o'ylagan odam",
    author: "Oliver Sacks",
    category: "xotira",
    year: "1985",
    about: "Nevrologik buzilishlarning g'ayrioddiy klinik holatlari — idrok, xotira va shaxsiyat o'zgarishlari.",
    topics: ["Nevrologiya", "Idrok", "Klinik holatlar"],
  },
  {
    id: "complications",
    title: "Complications",
    titleUz: "Asoratlar",
    author: "Atul Gawande",
    category: "xotira",
    year: "2002",
    about: "Jarrohlik amaliyotidagi noaniqlik: nega shifokorlar xato qiladi va qanday qilib xavfni kamaytiradi.",
    topics: ["Jarrohlik", "Xavfsizlik", "Noaniqlik"],
  },
  {
    id: "adamkay",
    title: "This Is Going to Hurt",
    titleUz: "Bu og'riydi",
    author: "Adam Kay",
    category: "xotira",
    year: "2017",
    about: "Yosh shifokorning tungi smenalari kundaligi — akusherlik va shoshilinch holatlar haqida ochiq hikoya.",
    topics: ["Akusherlik", "Shoshilinch yordam", "Kasb"],
  },
  {
    id: "bryson",
    title: "The Body: A Guide for Occupants",
    titleUz: "Tana: egalari uchun qo'llanma",
    author: "Bill Bryson",
    category: "ommabop",
    year: "2019",
    about: "Inson tanasining har bir tizimi haqida tushunarli tilda ilmiy sayohat.",
    topics: ["Anatomiya", "Immunitet", "Salomatlik"],
  },
  {
    id: "vanderkolk",
    title: "The Body Keeps the Score",
    titleUz: "Tana hisobni yuritadi",
    author: "Bessel van der Kolk",
    category: "ommabop",
    year: "2014",
    about: "Ruhiy travma tanada qanday jismoniy simptomlarga aylanadi va tiklanish yo'llari.",
    topics: ["Travma", "Ruhiy salomatlik", "Psixosomatika"],
  },
  {
    id: "enders",
    title: "Gut: The Inside Story",
    titleUz: "Ichak: ichki hikoya",
    author: "Giulia Enders",
    category: "ommabop",
    year: "2014",
    about: "Hazm tizimi, mikrobiota va ovqat hazm qilish bilan bog'liq shikoyatlarning sabablari.",
    topics: ["Gastroenterologiya", "Mikrobiota", "Ovqatlanish"],
  },
  {
    id: "walker",
    title: "Why We Sleep",
    titleUz: "Nega uxlaymiz",
    author: "Matthew Walker",
    category: "ommabop",
    year: "2017",
    about: "Uyquning organizmga ta'siri, uyqu buzilishlari va ularning kasalliklar bilan aloqasi.",
    topics: ["Uyqu", "Nevrologiya", "Profilaktika"],
  },
];

export const bookTitlesForPrompt = books
  .map((b) => `- "${b.title}" — ${b.author} (${categoryLabels[b.category]})`)
  .join("\n");
