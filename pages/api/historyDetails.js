import axios from "axios"


export default async function raceId(req, res) {
    const poolId = req.body['id']
   
    try{
        const resFromVeikkaus = await axios.get(`https://www.veikkaus.fi/api/toto-info/v1/race/${poolId}/competition-results`)
        res.send(resFromVeikkaus.data)


    } catch {
        res.send("Error")
    }
}