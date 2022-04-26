// map function, json name: country-view

function countryView(doc) {
  if (docType === 'country' && doc.name && doc.firstSatelliteStartup) {
    emit(doc.name, doc.firstSatelliteStartup);
  }
}
