/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function viewAllFreets(fields) {
  fetch('/api/freets')
    .then(showResponse)
    .catch(showResponse);
}

function viewFreetsByAuthor(fields) {
  fetch(`/api/freets?author=${fields.author}`)
    .then(showResponse)
    .catch(showResponse);
}

function createFreet(fields) {
  fetch('/api/freets', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function editFreet(fields) {
  fetch(`/api/freets/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteFreet(fields) {
  fetch(`/api/freets/${fields.id}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}


//for comments

function createComment(fields) {
  fetch(`/api/freets/${fields.freetId}/comment`, {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}
function viewAllComments(fields) {
  fetch('/api/freets/comments')
    .then(showResponse)
    .catch(showResponse);
}



/*function CommentsOnFreetByAuthor(fields) {
  fetch(`/api/freets/comments?${freetId=fields.freetId, authorId=fields.authorId}`)
    .then(showResponse)
    .catch(showResponse);
}
*/




function viewCommentsByAuthorId(fields) {
  fetch(`/api/freets/comments?authorId=${fields.authorId}`)
    .then(showResponse)
    .catch(showResponse);
}

function CommentsOnFreet(fields) {
  fetch(`/api/freets/comments?freetId=${fields.freetId}`)
    .then(showResponse)
    .catch(showResponse);
}
function editComment(fields) {
  fetch(`/api/freets/comments/${fields.commentId}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteComment(fields) {
  fetch(`/api/freets/comments/${fields.commentId}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}


//for likes


function createLike(fields) {
  fetch(`/api/freets/${fields.freetId}/like`, {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function viewAllLikes(fields) {
  fetch('/api/freets/likes')
    .then(showResponse)
    .catch(showResponse);
}

function viewLikesByAuthorId(fields) {
  fetch(`/api/freets/likes?authorId=${fields.authorId}`)
    .then(showResponse)
    .catch(showResponse);
}

function likesOnFreet(fields) {
  fetch(`/api/freets/likes?freetId=${fields.freetId}`)
    .then(showResponse)
    .catch(showResponse);
}

function deleteLike(fields) {
  fetch(`/api/freets/likes/${fields.likeId}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

//for dislikes

function createDislike(fields) {
  fetch(`/api/freets/${fields.freetId}/dislike`, {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function viewAllDislikes(fields) {
  fetch('/api/freets/dislikes')
    .then(showResponse)
    .catch(showResponse);
}

function viewDislikesByAuthorId(fields) {
  fetch(`/api/freets/dislikes?authorId=${fields.authorId}`)
    .then(showResponse)
    .catch(showResponse);
}

function dislikesOnFreet(fields) {
  fetch(`/api/freets/dislikes?freetId=${fields.freetId}`)
    .then(showResponse)
    .catch(showResponse);
}

function deleteDislike(fields) {
  fetch(`/api/freets/dislikes/${fields.likeId}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}
