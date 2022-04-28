// map function, json name: country-list
// its design document - countries

function countryList(doc) {
  if (doc.docType === 'country' && doc.name && doc.carrierRockets && doc.firstSatelliteStartup) {
    emit(doc.name, doc.carrierRockets, doc.firstSatelliteStartup);
  }
}

// map function, json name: satellite-list
// its design document - satellites

function satelliteList(doc) {
  if (doc.docType === 'satellite') {
    emit(doc)
  }
}
