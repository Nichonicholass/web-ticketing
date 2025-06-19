"use client";

import React from "react";

export interface Movie {
  id: number;
  title: string;
  image: string;
  genre: string;
  duration: string;
  director: string;
  ageRating: string;
  synopsis: string;
}

const NowShowingCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <img
        src={movie.image}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
        <p className="text-sm text-gray-600 mb-1">🎬 Genre: {movie.genre}</p>
        <p className="text-sm text-gray-600 mb-1">⏱️ Durasi: {movie.duration}</p>
        <p className="text-sm text-gray-600 mb-1">
          🎥 Sutradara: {movie.director}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          🔞 Rating Usia: {movie.ageRating}
        </p>
        <p className="text-sm text-gray-700 mt-2 line-clamp-3">
          {movie.synopsis}
        </p>
      </div>
    </div>
  );
};

export default NowShowingCard;
