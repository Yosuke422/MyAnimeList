import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Favorites from "./Favourites";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons'




const DetailPage = ({ match }) => {
  const { id } = useParams();
  const [anime, setAnime] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let navigate = useNavigate(); 
  const [clicked, setClicked] = useState(false);
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);
 
 
 

  const handleAddToFavorites = () => {
    setIsAddedToFavorites(!isAddedToFavorites);
    if (isAddedToFavorites) {
      Favorites.addToFavorites(anime.attributes.posterImage.tiny);
    }
  }

  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }

  const gotoFavourites = () =>{ 
    let path = `/favourites`; 
    navigate(path);
  }

  
  
    const handleClick = () => {
      setClicked(!clicked);
    };


  useEffect(() => {
    axios
      .get(`https://kitsu.io/api/edge/anime/${id}`)
      .then((response) => {
        setAnime(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <div>
    <header
      className="cover-header" 
      style={{
        backgroundImage: `url(${anime.attributes.coverImage.original})`
      }}>
        <button onClick={routeChange} className="gocatalogue"> 
        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
        <span>Retourner au catalogue</span>
        </button>
      </header>
    <div className="content">
      <div className="poster" style={{backgroundImage: `url(${anime.attributes.posterImage.original})`}}></div>
      <h1 className="anime">{anime.attributes.titles.en}</h1>
      <p className="synopsis">{anime.attributes.synopsis}</p>
      <p className="rang">Rang{anime.attributes.ratingRank}</p>
    </div> 
    <button  className={clicked ? 'clicked' : 'ajouter'} onClick={handleClick}>
		      <span className="ajouter-text">Ajouter aux favoris</span>
        <FontAwesomeIcon icon={faHeart} />
        </button>
        <button type="button" className="favoris" onClick={gotoFavourites}>
	      <span className="favoris-text">
		      <span>Voir les favoris</span>
	      </span>
        <FontAwesomeIcon icon={faHeart} />
	      
    </button>
  </div>
  );
};

export default DetailPage;