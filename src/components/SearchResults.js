
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";


const SearchResults = () => {
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  let navigate = useNavigate(); 
 
  
  useEffect(() => {
    
    fetchData();
   
  }, []);

  const gotoFavourites = () =>{ 
    let path = `/favourites`; 
    navigate(path);
  }


  const fetchData = () => {
    axios
      .get(`https://kitsu.io/api/edge/anime?page[limit]=${resultsPerPage}&page[offset]=${(currentPage - 1) * resultsPerPage}`)
      .then((response) => {
        setData(data.concat(response.data.data));
        setTotalPages(response.data.meta.pageCount);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  

  const handleKeyUp = (e) => {
    // it triggers by pressing the enter key
    if (e.keyCode === 13) {
      setCurrentPage(1);
      setData([]);
      axios
        .get(`https://kitsu.io/api/edge/anime?filter[text]=${query}&page[limit]=${resultsPerPage}&page[offset]=${(currentPage - 1) * resultsPerPage}`)
        .then((response) => {
          setData(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  
 
  const handleChangePage = (direction) => {
    if (direction === "previous") {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(currentPage + 1);
      fetchData();
    }
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResults.length > 0 ? searchResults.slice(indexOfFirstResult, indexOfLastResult) : data.slice(indexOfFirstResult, indexOfLastResult);
const pageNumbers = [];
for (let i = 1; i <= Math.ceil(data.length / resultsPerPage); i++) {
  pageNumbers.push(i);
}
  
  return (
    <div>
       
      <input id="search" type="text" value={query}  onKeyUp={handleKeyUp} placeholder="Recherche"
        onChange={(e) => setQuery(e.target.value)}/>
      <h1 className='title'>Catalogue</h1>
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Titre japonais</th>
            <th>Age Recommandé</th>
            <th>Date de sortie</th>
            <th>Rang</th>
          </tr>
        </thead>
        <tbody>
          {currentResults.map((result) => (
            <tr key={result.id}>
            <td>{result.attributes.titles.en_jp}</td>
            <td>{result.attributes.titles.ja_jp}</td>
            <td>{result.attributes.ageRatingGuide}</td>
            <td>{result.attributes.startDate}</td>
            <td>{result.attributes.ratingRank}</td>
            <td>
            <Link  style={{color:"#4334C8"}} to={`/details/${result.id}`}>Voir les détails</Link>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button className="previous button" onClick={() => handleChangePage("previous")}
           disabled={currentPage === 1}>
            Previous
        </button>
        <button className="next button" onClick={() => handleChangePage("next")} 
          disabled={currentPage === totalPages}>
            Next
        </button>
      </div>
      <button type="button" className="favoris" onClick={gotoFavourites}>
	      <span className="favoris-text">
		      <span>Voir les favoris</span>
	      </span>
        <FontAwesomeIcon icon={faHeart} />
	      
    </button>
    </div>
  );
};

export default SearchResults;

