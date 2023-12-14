const  awayTeamIdInvalid = 99999;
const  homeTeamIdInvalid = 99999;
const homeTeamGoalsValid = 1;
const awayTeamGoalsValid = 1;
const awayTeamIdValid = 8;
const homeTeamIdValid = 16;


const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTcwMTg4MzAxMSwiZXhwIjoxNzAyNzQ3MDExfQ.Er2TYm2113lHArRs6M9QEHKNqPiMyMgv06JANTZd5Yk'

const match = {
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: false,
      homeTeam: {
        teamName: 'São Paulo'
      },
      awayTeam: {
        teamName: 'Grêmio'
      }
}

const matchInProgress = {
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: true,
      homeTeam: {
        teamName: 'São Paulo'
      },
      awayTeam: {
        teamName: 'Grêmio'
      }
};

const correctInputCreateMatch = {
      homeTeamId: homeTeamIdValid,
      awayTeamId: awayTeamIdValid,
      homeTeamGoals: homeTeamGoalsValid,
      awayTeamGoals: awayTeamGoalsValid,
};

const incorrectInputCreateMatch = {
      homeTeamId: homeTeamIdValid,
      awayTeamId: awayTeamIdInvalid,
      homeTeamGoals: homeTeamGoalsValid,
      awayTeamGoals: awayTeamGoalsValid,
};

const correctInputUpdateMatch = {
      homeTeamGoals: homeTeamGoalsValid,
      awayTeamGoals: homeTeamGoalsValid,
};

const inputUpdateMatchWithEqualTeams = {
  homeTeamId: 1,
  awayTeamId: 1,
  homeTeamGoals: homeTeamGoalsValid,
  awayTeamGoals: awayTeamGoalsValid,
};

const createMatchFromDB ={
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 8,
    awayTeamGoals: 2,
    inProgress: true
  }


export default {
    match,
    matchInProgress,
    correctInputCreateMatch,
    incorrectInputCreateMatch,
    correctInputUpdateMatch,
    token,
    createMatchFromDB,
    inputUpdateMatchWithEqualTeams,
}