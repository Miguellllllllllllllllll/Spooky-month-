import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, Row, Col, Card, Button } from 'react-bootstrap';
import DefaultImage from '../public/Problem_1.png';
import SearchBar from './searchbar';


function getRandomBackground() {
  const backgrounds = ['background.jpg', 'backgroundy.jpg', 'backgroundw.png', 'backgroundr.jpg'];
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  return backgrounds[randomIndex];
}

const backgroundStyle = {
  backgroundImage: `url(${getRandomBackground()})`,
  backgroundSize: 'percentage', 
  minHeight: '100vh',
  padding: '20px'
};

const App = () => (
  <div style={backgroundStyle}>
    {}
  </div>
);

const cardStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  padding: '20px',
  marginBottom: '20px'
};

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
          const bands = data.response.bands.map(band => ({
            name: band.name,
            image: band.image === 'https://mx3.ch/assets/missing/missing_user_square_small-9fdb823bab509b63e87a00ddc93f2a5f20b6999a779fcb6ecd262c026dbd98d6.jpg' ? DefaultImage : band.image,
            address: band.address || 'Keine Adresse verfügbar',
            language: band.language || 'Keine Sprache verfügbar',
            email: band.email || 'Keine E-Mail verfügbar',
            biographies: band.biographies || [],
            city: band.city || 'Keine Stadt verfügbar',
            country: band.country || 'Kein Land verfügbar',
            profile_views_count: band.profile_views_count,
            playlists_count: band.playlists_count,
            links: band.links || [],
            performances: band.performances || [],
            permalink: band.permalink,
            public_page_url: band.public_page_url,
            permalink_name: band.permalink_name,
            url_for_image_thumb: band.url_for_image_thumb,
            url_for_image_head: band.url_for_image_head,
            url_for_image_list: band.url_for_image_list,
            url_for_image_original: band.url_for_image_original,
            categories: band.categories.map(category => category.name).join(', '),
            state: band.state.name
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
    <div style={backgroundStyle}>
      <div className="container mt-5">
        <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />
        <div className="mt-3">
          {isLoading && <Spinner animation="border" variant="primary" className='col-md-6 col-md-offset-3' />}
          {result && result.length === 0 && (
            <Card style={cardStyle}>
              <Card.Body>
                <Card.Text>
                  Keine Ergebnisse gefunden.
                </Card.Text>
              </Card.Body>
            </Card>
          )}
          {result && (
            <Card style={cardStyle}>
              <Row>
                {result.map((band, index) => (
                  <Col md={6} className="mb-3" key={index}>
                    <Card>
                      <Row noGutters>
                        <Col md={6}>
                          <Card.Img
                            variant="left"
                            src={band.image}
                            alt={`${band.name}`}
                            style={{ width: '100%', height: 'auto', maxHeight: '300px' }}
                          />
                        </Col>
                        <Col md={6}>
                          <Card.Body>
                            <Card.Title>{band.name}</Card.Title>
                            <Card.Text>
                              <strong>Adresse:</strong> {band.address} <br />
                              <strong>Sprache:</strong> {band.language} <br />
                              <strong>Email:</strong> {band.email}
                            </Card.Text>
                            <Button variant="primary" onClick={() => toggleExpand(index)}>
                              Mehr
                            </Button>
                            {expandedBandIndex === index && (
                              <div className="mt-3">
                                <Card.Text>
                                  <strong>Biographie:</strong> {band.biographies.length > 0 ? band.biographies.map((bio, i) => <div key={i}>{bio.text || 'Keine Biographie verfügbar'}</div>) : 'Keine Biographien verfügbar'} <br />
                                  <strong>Stadt:</strong> {band.city} <br />
                                  <strong>Land:</strong> {band.country} <br />
                                  <strong>Profilansichten:</strong> {band.profile_views_count} <br />
                                  <strong>Playlist-Anzahl:</strong> {band.playlists_count} <br />
                                  <strong>Links:</strong> {band.links.length > 0 ? band.links.map((link, i) => <div key={i}><a href={link.url} target="_blank" rel="noopener noreferrer">{link.title || link.url}</a></div>) : 'Keine Links verfügbar'} <br />
                                  <strong>Auftritte:</strong> {band.performances.length > 0 ? band.performances.map((performance, i) => <div key={i}>{performance.name}</div>) : 'Keine Auftritte verfügbar'} <br />
                                  <strong>Permalink:</strong> {band.permalink} <br />
                                  <strong>Public Page URL:</strong> <a href={band.public_page_url} target="_blank" rel="noopener noreferrer">{band.public_page_url}</a> <br />
                                  <strong>Permalink Name:</strong> {band.permalink_name} <br />
                                  <strong>Kategorien:</strong> {band.categories} <br />
                                  <strong>Staat:</strong> {band.state}
                                </Card.Text>
                              </div>
                            )}
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          )}
          {error && <p>Ein Fehler ist aufgetreten: {error.message}</p>}
        </div>
      </div>
    </div>
  );
}
