const USSR = {
  collection: "countries",
  name: "Советский Союз",
  satellitesList: [
    {
      collection: "satellites",
      name: "Спутник 1",
      startupDate:  "14.04.1999"
    },
    {
      collection: "satellites",
      name: "Спутник 2",
      startupDate: "27.10.2017"
    }
  ]
};

const China = {
  collection: "countries",
  name: "Китай",
  satellitesList: [
    {
      collection: "satellites",
      name: "zho feng xiao 1",
      startupDate:  "14.04.1999"
    },
    {
      collection: "satellites",
      name: "li wu mei 2",
      startupDate: "27.10.2017"
    }
  ]
};

const data = [USSR, China];

module.exports = data;
