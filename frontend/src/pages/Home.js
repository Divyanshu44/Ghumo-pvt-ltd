import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [places, setPlaces] = useState([]);
  const [allPlaces, setAllPlaces] = useState([]); // for dropdown options
  const [states, setStates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [state, setState] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/places")
      .then((res) => {
        setPlaces(res.data.slice(0, 6)); // show sample places
        setAllPlaces(res.data);

        // Generate unique states & categories from all data
        const uniqueStates = [...new Set(res.data.map((p) => p.State))].sort();
        const uniqueCategories = [
          ...new Set(res.data.map((p) => p.Category)),
        ].sort();

        setStates(uniqueStates);
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/results?state=${state}&category=${category}`);
  };

  return (
    <div className="container">
      <h1>Tourist Recommender</h1>

      {/* Search Form at Top */}
      <form className="form" onSubmit={handleSearch}>
        <select value={state} onChange={(e) => setState(e.target.value)}>
          <option value="">All States</option>
          {states.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button type="submit">Search</button>
      </form>

      {/* Featured Sample Places */}
      <h2>Featured Destinations</h2>
      <p className="intro-text">
        Explore some of our recommended tourist places:
      </p>

      <div className="places-grid">
        {places.map((p, i) => (
          <div key={i} className="place-card">
            <h3>{p.Place}</h3>
            {p["Image URL"] && (
              <img className="place-img" src={p["Image URL"]} alt={p.Place} />
            )}
            <p>
              <strong>State:</strong> {p.State} | <strong>Category:</strong>{" "}
              {p.Category}
            </p>
            <p>
              <strong>Best Season:</strong> {p["Best Season"]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
