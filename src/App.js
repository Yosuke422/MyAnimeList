import React from "react";
import "./index.scss";
import { BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import SearchResults from "./components/SearchResults";
import DetailPage from "./components/DetailPage";
import Header from "./components/Header";
import Favourites from "./components/Favourites";






function App() {
  
  return (
    <Router>
        
          <Routes>
            <Route exact path="/"  element={[<Header/>, <SearchResults/>]}/>
            
            <Route exact path="/details/:id" element={<DetailPage/>} />

            <Route exact path="/favourites" element={<Favourites/>} />
            
          </Routes>
      </Router>
  );
};

export default App;
