
const axios = require('axios');
const { DATA_URLS } = require('../utils/nba_urls');
const MongoDB = require('./general');
const { exec } = require('child_process');
const mongo = new MongoDB('nba');

async function fetchData(url, params={}) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
      .finally(() => console.log('We did it guys!'));
  });
}


async function curl(url) {
  return new Promise((resolve, reject) => {
    exec(`curl -v ${url}`, (err, stdout, stderr) => {
      if (err) reject(err);
      if (stdout) resolve(JSON.parse(stdout));
      resolve(null);
    })
  });
}


async function main() {
  try {
    let db = await mongo.connect();
    let col = 'players';

    let data = [];
    let years = ['2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022'];
    for (let y of years) {
      let players = await fetchData(DATA_URLS.players({year: y}));
      let _league = players.league;
      let _standard = _league.standard;
      for (let player of _standard) {
        let playerProfile = await curl(DATA_URLS.player_profile({ year: y, playerId: player.personId }));
        if (playerProfile) {
          let { league } = playerProfile;
          let { standard } = league;
          if (standard) player.stats = standard;
          console.log(`\n *** Player Profile Exists ${y}!! *** \n`)
          console.log(player)
        }
        let result = await mongo.insertDocument({ col, data: { year: y, player } });
        console.log(result)
      }
    }

    //let result =  await mongo.insertDocuments({ col, data });

    //let docs = await mongo.findDocumentByKeyVal({ col, key: 'year', val: '2017' });
    //console.log(docs)
    /*for (let d of docs) {
      let { year, players } = d;
      for (let p of players) {

        console.log(p)
      }

    }*/
    //console.log(docs)
    await mongo.close();
  } catch (e) {
    console.error(e)
    process.on('unhandledRejection', (err) => { console.error(err) });
  } finally {
    console.log('Exiting!');
    await process.exit(1);
  }
}

main();








/* END */
