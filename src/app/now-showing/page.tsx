import React from "react";
import NowShowingCard, { Movie } from "../now-showing/components/Card";
// import NowShowingCard

const dummyMovies: Movie[] = [
  {
    id: 1,
    title: "The Mystery Island",
    image: "https://source.unsplash.com/400x600/?movie,1",
    genre: "Adventure, Mystery",
    duration: "2h 15m",
    director: "Jane Doe",
    ageRating: "13+",
    synopsis:
      "Seorang petualang muda menemukan pulau misterius yang penuh rahasia dan bahaya yang tak terduga.",
  },
  {
    id: 2,
    title: "Love Beyond Time",
    image: "https://source.unsplash.com/400x600/?movie,2",
    genre: "Romance, Sci-Fi",
    duration: "1h 55m",
    director: "John Smith",
    ageRating: "PG-13",
    synopsis:
      "Kisah cinta antara dua orang dari era yang berbeda yang dipersatukan oleh mesin waktu yang rusak.",
  },
  {
    id: 3,
    title: "Guardian of Galaxy Cats",
    image: "https://source.unsplash.com/400x600/?movie,3",
    genre: "Comedy, Sci-Fi",
    duration: "2h 5m",
    director: "Emily Chan",
    ageRating: "SU",
    synopsis:
      "Tim kucing luar angkasa menyelamatkan galaksi dari ancaman alien dengan kekonyolan dan keberanian mereka.",
  },
];

const NowShowingPage = () => {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Now Showing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dummyMovies.map((movie) => (
          <NowShowingCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
};

export default NowShowingPage;
