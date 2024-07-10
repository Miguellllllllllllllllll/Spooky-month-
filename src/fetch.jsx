import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, Card, Button } from 'react-bootstrap';
import DefaultImage from '../public/Problem_1.png';

export default function Fetch() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedBandIndex, setExpandedBandIndex] = useState(null);

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
          // Extrahiere die gewünschten Felder und ersetze das Standardbild
          const bands = data.response.bands.map(band => ({
            name: band.name,
            image: band.image === 'https://mx3.ch/assets/missing/missing_user_square_small-9fdb823bab509b63e87a00ddc93f2a5f20b6999a779fcb6ecd262c026dbd98d6.jpg' ? DefaultImage : band.image,
            address: band.address,
            language: band.language,
            email: band.email,
            biographies: band.biographies,
            city: band.city,
            country: band.country,
            profile_views_count: band.profile_views_count,
            playlists_count: band.playlists_count,
            links: band.links,
            performances: band.performances
          }));
          setResult(bands);
        },
        e => {
          setIsLoading(false);
          setError(e);
        }
      );
  };

  const toggleExpand = (index) => {
    setExpandedBandIndex(expandedBandIndex === index ? null : index);
  };

  return (
    <div className="container mt-5">
      <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />
      <div className="mt-3">
        {isLoading && <Spinner animation="border" variant="primary" />}
        {error && <p>Ein Fehler ist aufgetreten: {error.message}</p>}
        {result && (
          <div className="row">
            {result.map((band, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <Card>
                  <Card.Img variant="top" src={band.image} alt={`${band.name}`} />
                  <Card.Body>
                    <Card.Title>{band.name}</Card.Title>
                    <Card.Text>
                      <strong>Adresse:</strong> {band.address || 'Keine Adresse verfügbar'} <br />
                      <strong>Sprache:</strong> {band.language || 'Keine Sprache verfügbar'} <br />
                      <strong>Email:</strong> {band.email || 'Keine E-Mail verfügbar'}
                    </Card.Text>
                    <Button variant="primary" onClick={() => toggleExpand(index)}>
                      More
                    </Button>
                    {expandedBandIndex === index && (
                      <div className="mt-3">
                        <Card.Text>
                          <strong>Biographien:</strong> {band.biographies.length > 0 ? band.biographies.join(', ') : 'Keine Biographien verfügbar'} <br />
                          <strong>Stadt:</strong> {band.city || 'Keine Stadt verfügbar'} <br />
                          <strong>Land:</strong> {band.country || 'Kein Land verfügbar'} <br />
                          <strong>Profilansichten:</strong> {band.profile_views_count} <br />
                          <strong>Playlist-Anzahl:</strong> {band.playlists_count} <br />
                          <strong>Links:</strong> {band.links.length > 0 ? band.links.map((link, i) => <div key={i}><a href={link.url} target="_blank" rel="noopener noreferrer">{link.title || link.url}</a></div>) : 'Keine Links verfügbar'} <br />
                          <strong>Auftritte:</strong> {band.performances.length > 0 ? band.performances.map((performance, i) => <div key={i}>{performance.name}</div>) : 'Keine Auftritte verfügbar'}
                        </Card.Text>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </div>
            ))}
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
        <Button variant="primary" onClick={handleSearch}>
          Suchen
        </Button>
      </div>
    </div>
  );
}
