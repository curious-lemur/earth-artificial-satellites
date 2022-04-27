// map function, json name: country-list-view

function countryListView(doc) {
  if (doc.docType === 'country' && doc.name && doc.carrierRockets && doc.firstSatelliteStartup) {
    emit(doc.name, doc.carrierRockets, doc.firstSatelliteStartup);
  }
}

// map function, json name: satellite-list-view

function satelliteListView(doc) {
  if (doc.docType === 'satellite') {
    emit(doc)
  }
}
