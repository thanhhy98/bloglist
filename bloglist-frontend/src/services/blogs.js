import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null;
const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config= {
    headers: {
      Authorization: token
    }
  }
  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
}

const update = async (newBlog, id) => {
  const res =  await axios.put(baseUrl + `/${id}`, newBlog);
  return res.data;
}

const remove = async  (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  await axios.delete(baseUrl + `/${id}`, config);
}

const comment = async (newComment, id) => {
  const config = {
    headers : {
      Authorization: token
    }
  }
  const res = await axios.post(baseUrl + `/${id}/comments`, newComment, config)
  return res.data
}
const obj = {
  getAll,
  setToken,
  create,
  update,
  remove,
  comment
}
export default obj;