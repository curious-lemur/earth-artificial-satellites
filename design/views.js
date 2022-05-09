// map function, json name: country-list
// its design document - countries

function countryList(doc) {
  if (doc.docType === 'country') {
    emit(null, null);
  }
}

// map function, json name: satellite-list-with-countries
// its design document - satellites

function satelliteListWithCountries(doc) {
  if (doc.docType === "satellite") {
    emit(null, null);
    for (let i = 0; i < doc.countries.length; i++) {
      emit(null, { "_id": doc.countries[i] })
    }
  }
}

// map function, json name: satellite-list
// its design document - satellites

function satelliteList(doc) {
  if (doc.docType === "satellite") {
    emit(doc.country, null);
  }
}
