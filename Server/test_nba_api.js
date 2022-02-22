const { generateJSON, readJSONFile, fetchData, curl,
  saveImageToDisk } = require('./utils/utils')
const { DATA_URLS } = require('./utils/nba_urls')
const path = require('path')
const fs = require('fs')
const years = ['2012','2013','2014','2015','2016','2017','2018','2019','2020','2021']

const main = async () => {
  try {

    let playerProfileDir = path.resolve(__dirname, `files/players/profiles`)
    let playerImageDir = path.resolve(__dirname, `files/players/images`)
    //let teamDir = path.resolve(__dirname, `files/teams`)
    //let filename = 'teams_stats_ranking.json'
    const players = readJSONFile(path.resolve(__dirname, `files/players/players_2021.json`))
    /*const _teams = readJSONFile(path.resolve(__dirname, `files/teams/teams_2021.json`))
                    .filter((t,i) => t.isNBAFranchise === true)
    let y = years[years.length-1]
    */

    for (let p of players) {
      const { firstName, lastName, personId } = p
      const image = `${firstName}_${lastName}_${personId}.png`
      const imagePath = path.resolve(playerImageDir, image)
      saveImageToDisk({
        url: DATA_URLS.player_headshot({playerId: personId}),
        imagePath
      })
    }



    /*let { league } = json
    let { standard } = league
    let { preseason, regularSeason, playoffs } = standard
    let { teams: preseasonTeams } = preseason
    let { teams: regSeasonTeams } = regularSeason
    let { teams: playoffTeams } = playoffs

    let teamsData = regSeasonTeams.map((t,i) => {
      if (_teams.find((team) => team.teamId === t.teamId)) return t
    }).filter((t) => t !== undefined)*/

    //generateJSON({ filename: path.resolve(teamDir, filename), data: teamsData })

    return
  } catch (e) {
    throw new Error(`Testing fetch in main: ${e}`)
  }
}

main();


/*
for (let p of players) {
  let json = await fetchData({
    url: DATA_URLS.player_profile({
      year: y,
      playerId: p.personId
    })
  })
  let { league } = json
  let { standard } = league
  let { teamSitesOnly } = p
  let { playerCode } = teamSitesOnly
  generateJSON({ filename: path.resolve(playerProfileDir, `${playerCode}.json`), data: standard })
  console.log(`Fetched player profile for: ${playerCode}`)
}

let json = await fetchData({
  url: DATA_URLS.team_stats_rankings({
    year: y
  })
})

let { league } = json
let { standard } = league
let { preseason, regularSeason, playoffs } = standard
let { teams: preseasonTeams } = preseason
let { teams: regSeasonTeams } = regularSeason
let { teams: playoffTeams } = playoffs

let teamsData = regSeasonTeams.map((t,i) => {
  if (_teams.find((team) => team.teamId === t.teamId)) return t
}).filter((t) => t !== undefined)

*/















/* END */
