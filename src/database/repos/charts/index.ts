import database, { DBQuery } from "../../../common/connection";
import axios from 'axios'

export default class ChartRepo {

  static async getChartList() {
    const result = await axios.get('https://apis.naver.com/vibeWeb/musicapiweb/vibe/v1/chart/track/total?start=1&display=100')
    .then(function (response) {
      // handle success
      const result = response['data']['response']['result'];
      
      const tracks = result['chart']['items']['tracks']
      return tracks
 
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      console.log("success")
      // always executed
    });

    return result
    
  
  }

  static async insertCharts(input: any[])
    {
      let artist
      let queries = [];
      for(let obj of input){
        for(let i = 0; i < obj['artists'].length; i ++){
          artist = obj['artists'][i]['artistName']
        }

        let statement =
        `INSERT INTO charts
         (
          trackId,
          trackTitle,
          artists
         )

          VALUES ($1, $2, $3)
        `;
        let variables = [obj.trackId, obj.trackTitle, artist|| ""];
        queries.push({ statement, variables });
        
      }
      const result = await database.queryInTransaction(queries).catch(e=>{
        console.log(e)
      });
      console.log(result)
      return result

  }

  static async getbyArtist(artists: string) {
    console.log(artists)
    const sql =
      `SELECT trackId, trackTitle, artists
        FROM charts
        WHERE artists LIKE '${artists}%'`;

    const results = await database.query(sql);
    console.log(results.rows)

    return results.rowCount ? results.rows[0]: null;
  }

}
