import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap';

export default function Example() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (!query) {
      setError(new Error('Bitte geben Sie etwas ein'));
      return;
    }

    setIsLoading(true);
    setError(null);

    const endpoint = `https://api.srgssr.ch/mx3/v2/bands?query=${encodeURIComponent(query)}`;

    fetch(endpoint, {
      headers: {
        Accept: "application/json",
        Authorization: 'Bearer TjZY7IPgnMZlJFFg0N0ILGmHORM9'
      }
    })
      .then(r => {
        if (!r.ok) {
          throw new Error(`HTTP error! code: ${r.status}`);
        }
        return r.json();
      })
      .then(
        data => {
          setIsLoading(false);
          // holt dir das, was du willst.
          const bands = data.response.bands.map(band => ({
            name: band.name,
            image: band.image,
            address: band.address,
            language: band.language,
            email: band.email
          }));
          setResult(bands);
        },
        e => {
          setIsLoading(false);
          setError(e);
        }
      );
  };

  return (
    <div>
      <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />
      <div className="mt-3">
        {isLoading && <Spinner animation="border" variant="primary" />}
        {error && <p>Ein Fehler ist aufgetreten: {error.message}</p>}
        {result && (
          <div>
            <ul>
              {result.map((band, index) => (
                <li key={index}>
                  <strong>Name:</strong> {band.name} <br />
                  {band.image && <img src={band.image} alt={`${band.name}`} style={{width: '100px', height: '100px'}} />} <br />
                  <strong>Address:</strong> {band.address || 'Keine Adresse verfügbar'} <br />
                  <strong>Language:</strong> {band.language || 'Keine Sprache verfügbar'} <br />
                  <strong>Email:</strong> {band.email || 'Keine E-Mail verfügbar'}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function SearchBar({ query, setQuery, handleSearch }) {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Suche nach Bands..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="input-group-append">
        <button className="btn btn-primary" onClick={handleSearch}>
          Suchen
        </button>
      </div>
    </div>
  );
}
