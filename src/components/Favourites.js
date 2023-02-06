import React, { useState } from "react";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (posterImage) => {
    setFavorites([...favorites, posterImage]);
  };

  return (
    <div>
      {favorites.map((posterImage) => (
        <img src={posterImage} alt="favorite anime poster" />
      ))}
    </div>
  );
};

export default Favorites;
