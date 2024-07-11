// BackgroundCard.jsx
import React from 'react';
import { Card } from 'react-bootstrap';

const BackgroundCard = () => {
  return (
    <div className="background">
      <Card className="white-card">
        <Card.Body>
          <Card.Title>Suchergebnisse</Card.Title>
          <Card.Text>
            Hier werden die Suchergebnisse angezeigt.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BackgroundCard;
