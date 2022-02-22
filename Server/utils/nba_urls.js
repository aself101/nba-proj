/*******************************************************************************
Data sets from data.nba.net & http://stats.nba.com/
DATA: https://github.com/kashav/nba.js/blob/master/docs/api/DATA.md
STATS: https://github.com/kashav/nba.js/blob/master/docs/api/STATS.md

scoreboard: Format: 20200111
teams, players, coaches, schedule: Uses start year i.e. 2019-20 : 2019
preview_article, recap_article: date: 20200111, gameId: 0021900578
lead_tracker, play_by_play: period: 1-4
playoffsBracket: Only previous year, unless currently occuring
team_schedule: teamName: celtics, lakers, mavericks, etc(must be lowercase)
teams_config: basic app/web info about team
*******************************************************************************/

module.exports.DATA_URLS = {
  boxscore: ({date, gameId}) => `http://data.nba.net/data/10s/prod/v1/${date}/${gameId}_boxscore.json`,
  calendar: () => `http://data.nba.net/data/10s/prod/v1/calendar.json`,
  coaches: ({year}) => `http://data.nba.net/data/10s/prod/v1/${year}/coaches.json`,
  conference_standings: () => `http://data.nba.net/data/10s/prod/v1/current/standings_conference.json`,
  division_standings: () => `http://data.nba.net/data/10s/prod/v1/current/standings_division.json`,
  last3_gamelog: ({year, playerId}) => `http://data.nba.net/data/10s/prod/v1/${year}/players/${playerId}_gamelog.json`,
  lead_tracker: ({date, gameId, period}) => `http://data.nba.net/data/10s/prod/v1/${date}/${gameId}_lead_tracker_${period}.json`,
  mini_boxscore: ({date, gameId}) => `http://data.nba.net/data/10s/prod/v1/${date}/${gameId}_mini_boxscore.json`,
  players: ({year}) => `http://data.nba.net/data/10s/prod/v1/${year}/players.json`,
  player_profile: ({year, playerId}) => `http://data.nba.net/data/10s/prod/v1/${year}/players/${playerId}_profile.json`,
  play_by_play: ({date, gameId, period}) => `http://data.nba.net/data/10s/prod/v1/${date}/${gameId}_pbp_${period}.json`,
  playoffs_bracket: () => `https://data.nba.net/data/10s/prod/v1/${year}/playoffsBracket.json`,
  preview_article: ({date, gameId}) => `http://data.nba.net/data/10s/prod/v1/${date}/${gameId}_preview_article.json`,
  recap_article: ({date, gameId}) => `http://data.nba.net/data/10s/prod/v1/${date}/${gameId}_recap_article.json`,
  schedule: ({year}) => `http://data.nba.net/data/10s/prod/v1/${year}/schedule.json`,
  scoreboard: ({date}) => `http://data.nba.net/data/10s/prod/v1/${date}/scoreboard.json`,
  standings: () => `http://data.nba.net/data/10s/prod/v1/current/standings_all.json`,
  teams: ({year}) => `http://data.nba.net/data/10s/prod/v1/${year}/teams.json`,
  //team_config: ({year}) => `http://data.nba.net/data/1h/prod/${year}/teams_config.json`,
  team_stat_leaders: ({year, teamName}) => `http://data.nba.net/data/10s/prod/v1/${year}/teams/${teamName}/leaders.json`,
  team_roster: ({year, teamName}) => `http://data.nba.net/data/10s/prod/v1/${year}/teams/${teamName}/roster.json`,
  team_schedule: ({year, teamName}) => `http://data.nba.net/data/10s/prod/v1/${year}/teams/${teamName}/schedule.json`,
  team_stats_rankings: ({year}) => `http://data.nba.net/data/10s/prod/v1/${year}/team_stats_rankings.json`,
  player_headshot: ({playerId}) => `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerId}.png`
};



































/* END */
