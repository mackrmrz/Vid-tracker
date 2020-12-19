import React from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';

const CountryInfoBox = (props) => {
  const { title, cases, total } = props;
  return (
    <div className="country-info">
      <Card className="country-info__card">
        <h2>{title}</h2>
        <CardContent>
          <div className="country-info__cases">{cases}</div>
          <div className="country-info__total">{total}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CountryInfoBox;
