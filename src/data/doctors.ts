export type Doctor = {
  id: string;
  name: string;
  speciality: string;
  city: string;
  experience: number;
  rating: number;
  languages: string[];
  focus: string;
};

export const doctors: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Nilufar Ismoilova",
    speciality: "Terapevt",
    city: "Toshkent",
    experience: 14,
    rating: 4.9,
    languages: ["O'zbek", "Rus"],
    focus: "Umumiy shikoyatlar, qon bosimi, surunkali charchoq",
  },
  {
    id: "d2",
    name: "Dr. Sardor Rahimov",
    speciality: "Nevrolog",
    city: "Samarqand",
    experience: 11,
    rating: 4.8,
    languages: ["O'zbek", "Ingliz"],
    focus: "Bosh og'rig'i, uyqu buzilishi, sezgi o'zgarishlari",
  },
  {
    id: "d3",
    name: "Dr. Kamola Yusupova",
    speciality: "Gastroenterolog",
    city: "Toshkent",
    experience: 9,
    rating: 4.7,
    languages: ["O'zbek", "Rus"],
    focus: "Qorin og'rig'i, ichak muammolari, jigar",
  },
  {
    id: "d4",
    name: "Dr. Jasur Qodirov",
    speciality: "Kardiolog",
    city: "Buxoro",
    experience: 17,
    rating: 4.9,
    languages: ["O'zbek", "Rus", "Ingliz"],
    focus: "Ko'krak og'rig'i, yurak urishi, aritmiya",
  },
  {
    id: "d5",
    name: "Dr. Dilnoza Karimova",
    speciality: "Pulmonolog",
    city: "Namangan",
    experience: 8,
    rating: 4.6,
    languages: ["O'zbek"],
    focus: "Yo'tal, hansirash, bronxial astma",
  },
  {
    id: "d6",
    name: "Dr. Bekzod Turdiyev",
    speciality: "Endokrinolog",
    city: "Farg'ona",
    experience: 12,
    rating: 4.8,
    languages: ["O'zbek", "Rus"],
    focus: "Qandli diabet, qalqonsimon bez, vazn o'zgarishi",
  },
];
