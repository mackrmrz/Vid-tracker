import React from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';

const CountryInfoBox = (props) => {
  const { title, cases, total } = props;
  return (
    <div className="country-info">
      <Card className="country-info__card">
        <h2>{title}</h2>
        <CardContent>
          <div className="country-info__cases">
            <h4>{cases}</h4>
          </div>
          <div className="country-info__total">
            <h6>TOTAL:</h6>{total}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CountryInfoBox;
