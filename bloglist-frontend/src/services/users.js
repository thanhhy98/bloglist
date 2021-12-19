import axios from "axios"

const baseUrl = '/api/users'

const getUsers = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const addUser = async (user) => {
    const res = await axios.post(baseUrl, user)
    return res.data
}

const obj = {
    getUsers,
    addUser
}
export default obj
