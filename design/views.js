// map function, json name: country-list
// its design document - countries

function countryList(doc) {
  if (doc.docType === 'country') {
    emit(doc._id, null);
  }
}

// map function, json name: satellite-list
// its design document - satellites

function satelliteList(doc) {
  if (doc.docType === "satellite") {
    emit(doc._id, null);
    emit(doc._id, { "_id": doc.countryId} )
  }
}
