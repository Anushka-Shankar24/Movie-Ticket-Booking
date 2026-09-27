import ThreeIdiots from "../assets/posters/3 Idiots.jpg";
import Baahubali from "../assets/posters/Baahubali.jpg";
import ChandMeraDil from "../assets/posters/Chand Mera dil.jpg";
import Cocktail from "../assets/posters/Cocktail.jpg";
import Dangal from "../assets/posters/Dangal.jpg";
import Dhadak2 from "../assets/posters/Dhadak2.jpg";
import Dhurandhar from "../assets/posters/Dhurandhar.jpg";
import HunumanAnsh from "../assets/posters/Hunuman Ansh.jpg";
import Jawan from "../assets/posters/Jawan.jpg";
import LaapataaLadies from "../assets/posters/Laapataa_Ladies.jpg";
import ParamSundari from "../assets/posters/Param-Sundari.jpg";
import Pathaan from "../assets/posters/Pathaan.jpg";
import Pushpa from "../assets/posters/Pushpa.jpg";
import Saiyaara from "../assets/posters/Saiyaara.jpg";
import Shershaah from "../assets/posters/Shershaah.jpg";
import TheVVAAN from "../assets/posters/The VVAAN.jpg";

const movies = [
  {
    id: 1,
    title: "Saiyaara",
    genre: "Romance, Drama",
    language: "Hindi",
    duration: "2h 30m",
    rating: 8.0,
    releaseDate: "2025",
    poster: Saiyaara,
    description:
      "A romantic musical drama about two young people whose lives become connected through music and love.",
    trailer: "9r-tT5IN0vg",
  },

  {
    id: 2,
    title: "The VVAAN",
    genre: "Action, Fantasy",
    language: "Hindi",
    duration: "2h 30m",
    rating: 8.1,
    releaseDate: "2026",
    poster: TheVVAAN,
    description:
      "An action fantasy movie with a powerful story and larger-than-life characters.",
    trailer: "ed6E9UFv7jQ",
  },

  {
    id: 3,
    title: "Hanuman Ansh",
    genre: "Devotional, Drama",
    language: "Hindi",
    duration: "2h 30m",
    rating: 8.2,
    releaseDate: "2026",
    poster: HunumanAnsh,
    description:
      "A devotional drama inspired by the story and values associated with Lord Hanuman.",
    trailer: "YpGhCA2X3gU",
  },

  {
    id: 4,
    title: "3 Idiots",
    genre: "Comedy, Drama",
    language: "Hindi",
    duration: "2h 50m",
    rating: 8.4,
    releaseDate: "2009",
    poster: ThreeIdiots,
    description:
      "A story about friendship, college life, dreams and the importance of following your passion.",
    trailer: "K0eDlFX9GMc",
  },

  {
    id: 5,
    title: "Dangal",
    genre: "Biography, Sports, Drama",
    language: "Hindi",
    duration: "2h 41m",
    rating: 8.3,
    releaseDate: "2016",
    poster: Dangal,
    description:
      "A sports drama about a former wrestler and his daughters who pursue wrestling.",
    trailer: "x_7YlGv9u1g",
  },

  {
    id: 6,
    title: "Param Sundari",
    genre: "Romance, Comedy",
    language: "Hindi",
    duration: "2h 10m",
    rating: 7.5,
    releaseDate: "2025",
    poster: ParamSundari,
    description:
      "A romantic comedy featuring an entertaining story of two people from different backgrounds.",
    trailer: "fdWnfzsx-ks",
  },

  {
    id: 7,
    title: "Cocktail 2",
    genre: "Romance, Comedy, Drama",
    language: "Hindi",
    duration: "2h 15m",
    rating: 7.2,
    releaseDate: "2026",
    poster: Cocktail,
    description:
      "A romantic comedy-drama about relationships, friendship and complicated emotions.",
    trailer: "XXxUqLHq1xg",
  },

  {
    id: 8,
    title: "Chand Mera Dil",
    genre: "Romance, Drama",
    language: "Hindi",
    duration: "2h 20m",
    rating: 7.4,
    releaseDate: "2025",
    poster: ChandMeraDil,
    description:
      "A romantic story exploring love, relationships and the challenges faced by two people.",
    trailer: "rRQ8oKCoYrQ",
  },

  {
    id: 9,
    title: "Dhadak 2",
    genre: "Romance, Drama",
    language: "Hindi",
    duration: "2h 20m",
    rating: 7.6,
    releaseDate: "2025",
    poster: Dhadak2,
    description:
      "A romantic drama exploring love and relationships against social and personal challenges.",
    trailer: "GRq6nXiJdug",
  },

  {
    id: 10,
    title: "Baahubali",
    genre: "Action, Drama, Epic",
    language: "Telugu, Hindi",
    duration: "2h 39m",
    rating: 8.0,
    releaseDate: "2015",
    poster: Baahubali,
    description:
      "An epic action drama following a mysterious young man and his royal legacy.",
    trailer: "VdafjyFK3ko",
  },

  {
    id: 11,
    title: "Pushpa",
    genre: "Action, Drama, Thriller",
    language: "Telugu, Hindi",
    duration: "2h 59m",
    rating: 7.6,
    releaseDate: "2021",
    poster: Pushpa,
    description:
      "An action drama following Pushpa Raj and his rise through the world of red sandalwood smuggling.",
    trailer: "pKctjlxbFDQ",
  },

  {
    id: 12,
    title: "Pathaan",
    genre: "Action, Thriller",
    language: "Hindi",
    duration: "2h 26m",
    rating: 7.1,
    releaseDate: "2023",
    poster: Pathaan,
    description:
      "An action thriller following an Indian agent who returns to protect the country from a dangerous threat.",
    trailer: "vqu4z34wENw",
  },

  {
    id: 13,
    title: "Dhurandhar",
    genre: "Action, Spy Thriller",
    language: "Hindi",
    duration: "3h 34m",
    rating: 8.0,
    releaseDate: "2025",
    poster: Dhurandhar,
    description:
      "An action spy thriller featuring an undercover mission and a high-stakes story.",
    trailer: "BKOVzHcjEIo",
  },

  {
    id: 14,
    title: "Laapataa Ladies",
    genre: "Comedy, Drama",
    language: "Hindi",
    duration: "2h 2m",
    rating: 8.0,
    releaseDate: "2024",
    poster: LaapataaLadies,
    description:
      "A comedy-drama about two brides who get separated during a train journey.",
    trailer: "sm8t7aW5_4s",
  },

  {
    id: 15,
    title: "Shershaah",
    genre: "Biography, War, Drama",
    language: "Hindi",
    duration: "2h 15m",
    rating: 8.3,
    releaseDate: "2021",
    poster: Shershaah,
    description:
      "A biographical war drama based on the life and military journey of Captain Vikram Batra.",
    trailer: "Q0FTXnefVBA",
  },

  {
    id: 16,
    title: "Jawan",
    genre: "Action, Thriller",
    language: "Hindi",
    duration: "2h 49m",
    rating: 7.6,
    releaseDate: "2023",
    poster: Jawan,
    description:
      "An action thriller following a man driven by a personal mission to correct social injustices.",
    trailer: "MWOlnZSnXJo",
  },
];

export default movies;