import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

function Results() {
  const [places, setPlaces] = useState([]);
  const [params] = useSearchParams();
  const stateFilter = params.get("state")?.toLowerCase();
  const categoryFilter = params.get("category")?.toLowerCase();

  useEffect(() => {
    axios
      .get("http://localhost:5000/places")
      .then((res) => {
        let filtered = res.data;

        if (stateFilter) {
          filtered = filtered.filter((p) =>
            p.State.toLowerCase().includes(stateFilter)
          );
        }
        if (categoryFilter) {
          filtered = filtered.filter((p) =>
            p.Category.toLowerCase().includes(categoryFilter)
          );
        }

        setPlaces(filtered);
      })
      .catch((err) => console.error(err));
  }, [stateFilter, categoryFilter]);

  return (
    <div className="container">
      <h2>Recommended Places</h2>
      <Link className="back-link" to="/home">
        ⬅ Back to Home
      </Link>

      {places.length === 0 ? (
        <p className="no-places">No places found.</p>
      ) : (
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
              <p>
                <strong>Open:</strong> {p["Open Time"]} - {p["Close Time"]}
              </p>
              <p>
                <strong>Budget:</strong> ₹{p["Budget (INR)"]}
              </p>
              <p>
                <strong>Coordinates:</strong> {p.Coordinates}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Results;
