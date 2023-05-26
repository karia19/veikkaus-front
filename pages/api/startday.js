import axios from 'axios'

export async function getData() {
    const response = await axios.get('http://localhost:8000/api/v1/toto')
    const jsonData = await response.json()
    return jsonData
}

export default async function handler(req, res) {
    const jsonData = await getData()
    res.status(200).json(jsonData)
}