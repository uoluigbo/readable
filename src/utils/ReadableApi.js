const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
 'Accept': 'application/json',
 'Authorization': token
}

export const getAllCategories = () =>
fetch(`${api}/categories`, { headers })
 .then(res => res.json())
 .then(data => data.categories)

export const getCategoryPosts = (categoryId) =>
fetch(`${api}/${categoryId}/posts`, { headers })
 .then(res => res.json())
 .then(data => data)

 export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    //.then(data => data.posts)

export const getPost = (postId) =>
fetch(`${api}/posts/${postId}`, { headers })
 .then(res => res.json())
 //.then(data => data)

export const addPost = (body) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const updatePostVote = (postId, body) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const editPost = (postId, body) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const deletePost = (postId) =>
fetch(`${api}/posts/${postId}`, { method: 'DELETE', headers })
.then(res => res.json())


export const getPostComments = (postId) =>
fetch(`${api}/posts/${postId}/comments`, { headers })
 .then(res => res.json())
//.then(data => data)

export const getComment = (commentId) =>
 fetch(`${api}/comments/${commentId}`, { headers })
 .then(res => res.json())
//.then(data => data)

export const addComment = (body) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const updateCommentVote = (commentId, body) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const editComment = (commentId, body) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const deleteComment = (commentId) =>
fetch(`${api}/comments/${commentId}`, { method: 'DELETE', headers })
.then(res => res.json())

export function getInitialData () {
    return Promise.all([
        getAllCategories(),
        getAllPosts(),
    ]).then(([categories, posts]) => ({
        categories,
        posts,
    }))
}

