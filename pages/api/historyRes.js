import axios from "axios";



const tracks = ['Kuopio', 'Vermo', 'Härmä', 'Pori', 'Ylivieska', 'Jokimaa', 'Kaustinen', 
'Seinäjoki', 'Joensuu', 'Kouvola', 'Mikkeli', 'Lappeenranta', 'Oulu', 
'Forssa', 'Turku', 'Joensuu', 'Jyväskylä','Teivo', 'Vieremä', 'Kuopio', 'Kajaani']


export default async function handler(req, res) {
    const resDay = req.body['day']
    try {
        const veikkausapi = await axios.get(`https://www.veikkaus.fi/api/toto-info/v1/cards/date/${resDay}`)
        const fiGames = veikkausapi.data['collection'].filter(x => x['country'] == "FI")
        let gameCarId = 0
        for (let i = 0; i < fiGames.length; i++){
            for (let j = 0; j < tracks.length; j++){
                if (fiGames[i]['trackName'] == tracks[j]){
                    gameCarId = fiGames[i]['cardId']
                }
            }
        }


        const resultsAll = await axios(`https://www.veikkaus.fi/api/toto-info/v1/card/${gameCarId}/results`)
       


        res.send(resultsAll.data['collection'])
    }catch(e) {
        console.log("error")
    }
    


}
  