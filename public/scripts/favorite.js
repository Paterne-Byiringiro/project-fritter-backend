/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

  function viewFavoritesByAuthor(fields) {
    fetch(`/api/favorites?author=${fields.author}`)
      .then(showResponse)
      .catch(showResponse);
  }
  
  function createFavorite(fields) {
    fetch('/api/favorites', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
  
  function deleteFavorite(fields) {
    fetch(`/api/favorites/${fields.id}`, {method: 'DELETE'})
      .then(showResponse)
      .catch(showResponse);
  }