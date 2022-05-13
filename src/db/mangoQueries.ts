import nano from 'nano';

export function countryMangoQuery(bookmark: string) {
  const query: nano.MangoQuery = {
    "selector": {
      "docType": "country"
    },
    "limit": 3
  };

  if (bookmark) { query["bookmark"] = bookmark }
  return query;
}

export function satelliteMangoQuery(countryName: string, bookmark?: string) {
  const query: nano.MangoQuery = {
    "selector": {
      "$and": [
        { "docType": "satellite" },
        {
          "countries": {
            "$elemMatch": {
              "$eq": countryName
            }
          }
        }
      ]
    },
    "limit": 10
  };

  if (bookmark) { query["bookmark"] = bookmark }

  return query;
}
