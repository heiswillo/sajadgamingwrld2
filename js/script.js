/* =====================================
   SAJAD GAMING WORLD
   MAIN JAVASCRIPT FILE
   PART 1B-1
===================================== */


/* =====================================
   CREATE DEFAULT ADMIN
===================================== */

function createAdmin(){

    const admin = {
        id: 1,
        username: "Administrator",
        email: "admin@sajad.com",
        password: "admin123",
        role: "admin"
    };

    if(!localStorage.getItem(admin.email)){
        localStorage.setItem(
            admin.email,
            JSON.stringify(admin)
        );
    }
}

createAdmin();


/* =====================================
   REGISTER USER
===================================== */

const registerForm =
document.getElementById(
"registerForm"
);

if(registerForm){

registerForm.addEventListener(
"submit",
function(e){

e.preventDefault();

const username =
document.getElementById(
"username"
).value;

const email =
document.getElementById(
"email"
).value;

const password =
document.getElementById(
"password"
).value;

if(
localStorage.getItem(email)
){

alert(
"Account already exists"
);

return;

}

const user = {

id: Date.now(),

username,

email,

password,

role: "user",

createdAt:
new Date().toISOString()

};

localStorage.setItem(
email,
JSON.stringify(user)
);

alert(
"Registration Successful"
);

window.location.href =
"login.html";

});

}


/* =====================================
   LOGIN USER
===================================== */

const loginForm =
document.getElementById(
"loginForm"
);

if(loginForm){

loginForm.addEventListener(
"submit",
function(e){

e.preventDefault();

const email =
document.getElementById(
"loginEmail"
).value;

const password =
document.getElementById(
"loginPassword"
).value;

const user =
JSON.parse(
localStorage.getItem(email)
);

if(
user &&
user.password === password
){

localStorage.setItem(
"currentUser",
JSON.stringify(user)
);

alert(
"Login Successful"
);

if(
user.role === "admin"
){

window.location.href =
"admin.html";

}
else{

window.location.href =
"dashboard.html";

}

}
else{

alert(
"Invalid Email or Password"
);

}

});

}


/* =====================================
   LOGOUT
===================================== */

function logout(){

localStorage.removeItem(
"currentUser"
);

window.location.href =
"login.html";

}


/* =====================================
   GET CURRENT USER
===================================== */

function getCurrentUser(){

return JSON.parse(
localStorage.getItem(
"currentUser"
)
);

}


/* =====================================
   PROTECT USER PAGES
===================================== */

function checkLogin(){

const currentUser =
getCurrentUser();

if(!currentUser){

window.location.href =
"login.html";

}

}


/* =====================================
   PROTECT ADMIN PAGES
===================================== */

function checkAdmin(){

const currentUser =
getCurrentUser();

if(!currentUser){

window.location.href =
"login.html";

return;

}

if(
currentUser.role !== "admin"
){

alert(
"Access Denied"
);

window.location.href =
"dashboard.html";

}

}


/* =====================================
   LOAD USER NAME
===================================== */

function loadUser(){

const welcome =
document.getElementById(
"welcomeUser"
);

if(!welcome) return;

const currentUser =
getCurrentUser();

if(currentUser){

welcome.innerHTML =
`Welcome ${currentUser.username}`;

}

}

loadUser();


/* =====================================
   CREATE TEAM
===================================== */

const teamForm =
document.getElementById(
"teamForm"
);

if(teamForm){

teamForm.addEventListener(
"submit",
function(e){

e.preventDefault();

const currentUser =
getCurrentUser();

if(!currentUser){

alert(
"Please login"
);

return;

}

const teamName =
document.getElementById(
"teamName"
).value;

const motto =
document.getElementById(
"teamMotto"
).value;

const logoInput =
document.getElementById(
"teamLogo"
);

const file =
logoInput.files[0];

if(file){

const reader =
new FileReader();

reader.onload =
function(event){

saveTeam(
currentUser,
teamName,
motto,
event.target.result
);

};

reader.readAsDataURL(file);

}
else{

saveTeam(
currentUser,
teamName,
motto,
"images/logo.png"
);

}

});

}


/* =====================================
   SAVE TEAM
===================================== */

function saveTeam(
user,
teamName,
motto,
logo
){

const team = {

id: Date.now(),

ownerId:
user.id,

owner:
user.username,

teamName,

motto,

logo,

played:0,

wins:0,

draws:0,

losses:0,

goalsFor:0,

goalsAgainst:0,

goalDifference:0,

points:0

};

localStorage.setItem(

`team_${user.email}`,

JSON.stringify(team)

);

alert(
"Team Created Successfully"
);

location.reload();

}


/* =====================================
   LOAD TEAM
===================================== */

function loadTeam(){

const teamSection =
document.getElementById(
"teamSection"
);

if(!teamSection) return;

const currentUser =
getCurrentUser();

if(!currentUser) return;

const team =
JSON.parse(

localStorage.getItem(
`team_${currentUser.email}`
)

);

if(!team) return;

teamSection.innerHTML = `

<div class="team-profile">

<img
src="${team.logo}"
alt="Team Logo">

<h3>
${team.teamName}
</h3>

<p>
Owner:
${team.owner}
</p>

<p>
Motto:
${team.motto}
</p>

<p>
Played:
${team.played}
</p>

<p>
Wins:
${team.wins}
</p>

<p>
Draws:
${team.draws}
</p>

<p>
Losses:
${team.losses}
</p>

<p>
Points:
${team.points}
</p>

<button
onclick="editTeam()">

Edit Team

</button>

</div>

`;

}

loadTeam();


/* =====================================
   EDIT TEAM
===================================== */

function editTeam(){

const currentUser =
getCurrentUser();

const team =
JSON.parse(

localStorage.getItem(
`team_${currentUser.email}`
)

);

const newName =
prompt(
"Enter New Team Name",
team.teamName
);

if(newName){

team.teamName =
newName;

localStorage.setItem(

`team_${currentUser.email}`,

JSON.stringify(team)

);

location.reload();

}

}


/* =====================================
   LOAD ALL TEAMS
===================================== */

function loadAllTeams(){

const container =
document.getElementById(
"allTeams"
);

if(!container) return;

container.innerHTML = "";

for(
let i=0;
i<localStorage.length;
i++
){

const key =
localStorage.key(i);

if(
key.startsWith(
"team_"
)
){

const team =
JSON.parse(
localStorage.getItem(key)
);

container.innerHTML += `

<div class="tournament-card">

<h3>
${team.teamName}
</h3>

<p>
Owner:
${team.owner}
</p>

<p>
Points:
${team.points}
</p>

</div>

`;

}

}

}

loadAllTeams();

/* =====================================
   TOURNAMENT CREATION
===================================== */

const tournamentForm =
document.getElementById(
"tournamentForm"
);

if(tournamentForm){

tournamentForm.addEventListener(
"submit",
function(e){

e.preventDefault();

let tournaments =
JSON.parse(
localStorage.getItem(
"tournaments"
)
) || [];

const tournament = {

id: Date.now(),

name:
document.getElementById(
"tournamentName"
).value,

type:
document.getElementById(
"tournamentType"
).value,

maxTeams:
parseInt(
document.getElementById(
"maxTeams"
).value
),

status:"Open",

teams:[],

createdAt:
new Date().toISOString()

};

tournaments.push(
tournament
);

localStorage.setItem(
"tournaments",
JSON.stringify(
tournaments
)
);

alert(
"Tournament Created"
);

location.reload();

});

}


/* =====================================
   LOAD ADMIN TOURNAMENTS
===================================== */

function loadAdminTournaments(){

const container =
document.getElementById(
"adminTournamentList"
);

if(!container) return;

const tournaments =
JSON.parse(
localStorage.getItem(
"tournaments"
)
) || [];

container.innerHTML = "";

tournaments.forEach(t=>{

container.innerHTML += `

<div class="tournament-card">

<h3>${t.name}</h3>

<p>
Type: ${t.type}
</p>

<p>
Status: ${t.status}
</p>

<p>
Teams:
${t.teams.length}
/
${t.maxTeams}
</p>

<button
onclick="generateFixtures(${t.id})">

Generate Fixtures

</button>

<button
onclick="openScoreEntry(${t.id})">

Enter Scores

</button>

</div>

`;

});

}

loadAdminTournaments();


/* =====================================
   LOAD TOURNAMENTS FOR USERS
===================================== */

function loadTournaments(){

const container =
document.getElementById(
"tournamentList"
);

if(!container) return;

const tournaments =
JSON.parse(
localStorage.getItem(
"tournaments"
)
) || [];

container.innerHTML = "";

tournaments.forEach(t=>{

container.innerHTML += `

<div class="tournament-card">

<h3>${t.name}</h3>

<p>
Type:
${t.type}
</p>

<p>
Status:
${t.status}
</p>

<p>
Teams Joined:
${t.teams.length}
/
${t.maxTeams}
</p>

<button
onclick="joinTournament(${t.id})">

Join Tournament

</button>

</div>

`;

});

}

loadTournaments();


/* =====================================
   JOIN TOURNAMENT
===================================== */

function joinTournament(id){

const currentUser =
getCurrentUser();

if(!currentUser){

alert("Login First");

return;

}

const team =
JSON.parse(

localStorage.getItem(
`team_${currentUser.email}`
)

);

if(!team){

alert(
"Create a Team First"
);

return;

}

let tournaments =
JSON.parse(
localStorage.getItem(
"tournaments"
)
) || [];

const tournament =
tournaments.find(
t => t.id === id
);

if(!tournament){

return;

}

if(
tournament.teams.length >=
tournament.maxTeams
){

alert(
"Tournament Full"
);

return;

}

const exists =
tournament.teams.find(
name =>
name ===
team.teamName
);

if(exists){

alert(
"Already Joined"
);

return;

}

tournament.teams.push(
team.teamName
);

localStorage.setItem(
"tournaments",
JSON.stringify(
tournaments
)
);

alert(
"Tournament Joined"
);

location.reload();

}


/* =====================================
   GENERATE FIXTURES
===================================== */

function generateFixtures(
tournamentId
){

let tournaments =
JSON.parse(
localStorage.getItem(
"tournaments"
)
) || [];

const tournament =
tournaments.find(
t => t.id === tournamentId
);

if(!tournament){

return;

}

if(
tournament.teams.length < 2
){

alert(
"Need At Least 2 Teams"
);

return;

}

let fixtures = [];

for(
let i=0;
i<tournament.teams.length;
i++
){

for(
let j=i+1;
j<tournament.teams.length;
j++
){

fixtures.push({

id:
Date.now()
+
Math.random(),

tournamentId,

homeTeam:
tournament.teams[i],

awayTeam:
tournament.teams[j],

status:
"Scheduled",

homeScore:
null,

awayScore:
null

});

}

}

localStorage.setItem(

`fixtures_${tournamentId}`,

JSON.stringify(fixtures)

);

alert(
"Fixtures Generated"
);

}


/* =====================================
   LOAD FIXTURES
===================================== */

function loadFixtures(){

const container =
document.getElementById(
"fixturesContainer"
);

if(!container) return;

let html = "";

const tournaments =
JSON.parse(
localStorage.getItem(
"tournaments"
)
) || [];

tournaments.forEach(t=>{

const fixtures =
JSON.parse(

localStorage.getItem(
`fixtures_${t.id}`
)

) || [];

if(fixtures.length){

html += `

<h2>
${t.name}
</h2>

`;

fixtures.forEach(f=>{

html += `

<div class="tournament-card">

<h3>

${f.homeTeam}

VS

${f.awayTeam}

</h3>

<p>

Status:
${f.status}

</p>

</div>

`;

});

}

});

container.innerHTML =
html;

}

loadFixtures();


/* =====================================
   LOAD MY MATCHES
===================================== */

function loadMyMatches(){

const container =
document.getElementById(
"myMatches"
);

if(!container) return;

const currentUser =
getCurrentUser();

if(!currentUser) return;

const team =
JSON.parse(

localStorage.getItem(
`team_${currentUser.email}`
)

);

if(!team) return;

let html = "";

const tournaments =
JSON.parse(
localStorage.getItem(
"tournaments"
)
) || [];

tournaments.forEach(t=>{

const fixtures =
JSON.parse(

localStorage.getItem(
`fixtures_${t.id}`
)

) || [];

fixtures.forEach(f=>{

if(

f.homeTeam ===
team.teamName

||

f.awayTeam ===
team.teamName

){

html += `

<div class="tournament-card">

<h3>

${f.homeTeam}

VS

${f.awayTeam}

</h3>

<p>

Status:
${f.status}

</p>

</div>

`;

}

});

});

container.innerHTML =
html;

}

loadMyMatches();


/* =====================================
   OPEN SCORE ENTRY
===================================== */

function openScoreEntry(id){

localStorage.setItem(
"selectedTournament",
id
);

window.location.href =
"admin-scores.html";

}

/* =====================================
   LOAD SCORE FIXTURES
===================================== */

function loadScoreFixtures(){

const container =
document.getElementById(
"scoreFixtures"
);

if(!container) return;

const tournamentId =
localStorage.getItem(
"selectedTournament"
);

const fixtures =
JSON.parse(
localStorage.getItem(
`fixtures_${tournamentId}`
)
) || [];

container.innerHTML = "";

fixtures.forEach(f=>{

if(f.status === "Completed"){
return;
}

container.innerHTML += `

<div class="tournament-card">

<h3>
${f.homeTeam}
VS
${f.awayTeam}
</h3>

<input
type="number"
id="home_${f.id}"
placeholder="Home Score">

<input
type="number"
id="away_${f.id}"
placeholder="Away Score">

<button
onclick="saveResult(${f.id})">
Save Result
</button>

</div>

`;

});

}

loadScoreFixtures();


/* =====================================
   SAVE RESULT
===================================== */

function saveResult(fixtureId){

const tournamentId =
localStorage.getItem(
"selectedTournament"
);

let fixtures =
JSON.parse(
localStorage.getItem(
`fixtures_${tournamentId}`
)
) || [];

const fixture =
fixtures.find(
f => f.id === fixtureId
);

if(!fixture) return;

const homeScore =
parseInt(
document.getElementById(
`home_${fixtureId}`
).value
);

const awayScore =
parseInt(
document.getElementById(
`away_${fixtureId}`
).value
);

if(
isNaN(homeScore)
||
isNaN(awayScore)
){

alert(
"Enter valid scores"
);

return;

}

fixture.homeScore =
homeScore;

fixture.awayScore =
awayScore;

fixture.status =
"Completed";

updateTeamStats(
fixture,
homeScore,
awayScore
);

localStorage.setItem(
`fixtures_${tournamentId}`,
JSON.stringify(fixtures)
);

alert(
"Result Saved"
);

location.reload();

}


/* =====================================
   UPDATE TEAM STATS
===================================== */

function updateTeamStats(
fixture,
homeScore,
awayScore
){

updateSingleTeam(
fixture.homeTeam,
homeScore,
awayScore
);

updateSingleTeam(
fixture.awayTeam,
awayScore,
homeScore
);

}


/* =====================================
   UPDATE SINGLE TEAM
===================================== */

function updateSingleTeam(
teamName,
goalsFor,
goalsAgainst
){

for(
let i=0;
i<localStorage.length;
i++
){

const key =
localStorage.key(i);

if(
key.startsWith(
"team_"
)
){

let team =
JSON.parse(
localStorage.getItem(key)
);

if(
team.teamName ===
teamName
){

team.played++;

team.goalsFor =
(team.goalsFor || 0)
+
goalsFor;

team.goalsAgainst =
(team.goalsAgainst || 0)
+
goalsAgainst;

team.goalDifference =
team.goalsFor
-
team.goalsAgainst;

if(
goalsFor >
goalsAgainst
){

team.wins++;

team.points += 3;

}
else if(
goalsFor <
goalsAgainst
){

team.losses++;

}
else{

team.draws++;

team.points += 1;

}

localStorage.setItem(
key,
JSON.stringify(team)
);

}

}

}

}


/* =====================================
   LOAD RESULTS
===================================== */

function loadResults(){

const container =
document.getElementById(
"resultsContainer"
);

if(!container) return;

let html = "";

const tournaments =
JSON.parse(
localStorage.getItem(
"tournaments"
)
) || [];

tournaments.forEach(t=>{

const fixtures =
JSON.parse(
localStorage.getItem(
`fixtures_${t.id}`
)
) || [];

fixtures.forEach(f=>{

if(
f.status ===
"Completed"
){

html += `

<div class="tournament-card">

<h3>

${f.homeTeam}

${f.homeScore}

-

${f.awayScore}

${f.awayTeam}

</h3>

</div>

`;

}

});

});

container.innerHTML =
html;

}

loadResults();


/* =====================================
   LEADERBOARD
===================================== */

function loadLeaderboard(){

const body =
document.getElementById(
"leaderboardBody"
);

if(!body) return;

let teams = [];

for(
let i=0;
i<localStorage.length;
i++
){

const key =
localStorage.key(i);

if(
key.startsWith(
"team_"
)
){

teams.push(
JSON.parse(
localStorage.getItem(key)
)
);

}

}

teams.sort((a,b)=>{

if(
b.points !== a.points
){
return b.points-a.points;
}

if(
(b.goalDifference || 0)
!==
(a.goalDifference || 0)
){
return (
b.goalDifference || 0
)
-
(
a.goalDifference || 0
);
}

return (
b.goalsFor || 0
)
-
(
a.goalsFor || 0
);

});

body.innerHTML = "";

teams.forEach(
(team,index)=>{

body.innerHTML += `

<tr>

<td>${index+1}</td>

<td>${team.teamName}</td>

<td>${team.played}</td>

<td>${team.wins}</td>

<td>${team.draws}</td>

<td>${team.losses}</td>

<td>${team.goalsFor}</td>

<td>${team.goalsAgainst}</td>

<td>${team.goalDifference}</td>

<td>${team.points}</td>

</tr>

`;

});

}

loadLeaderboard();


/* =====================================
   ADMIN DASHBOARD STATS
===================================== */

function loadAdminStats(){

const usersCard =
document.getElementById(
"totalUsers"
);

if(!usersCard) return;

let users = 0;
let teams = 0;
let matches = 0;

for(
let i=0;
i<localStorage.length;
i++
){

const key =
localStorage.key(i);

if(
key.includes("@")
){
users++;
}

if(
key.startsWith(
"team_"
)
){
teams++;
}

if(
key.startsWith(
"fixtures_"
)
){

const fixtures =
JSON.parse(
localStorage.getItem(key)
);

matches +=
fixtures.length;

}

}

document.getElementById(
"totalUsers"
).textContent =
users;

document.getElementById(
"totalTeams"
).textContent =
teams;

document.getElementById(
"totalMatches"
).textContent =
matches;

document.getElementById(
"totalTournaments"
).textContent =
(
JSON.parse(
localStorage.getItem(
"tournaments"
)
) || []
).length;

}

loadAdminStats();


/* =====================================
   REPORTS
===================================== */

function loadReports(){

const container =
document.getElementById(
"reportContainer"
);

if(!container) return;

let teams = [];

for(
let i=0;
i<localStorage.length;
i++
){

const key =
localStorage.key(i);

if(
key.startsWith(
"team_"
)
){

teams.push(
JSON.parse(
localStorage.getItem(key)
)
);

}

}

teams.sort(
(a,b)=>
b.points-a.points
);

const bestTeam =
teams[0];

container.innerHTML = `

<div class="card">

<h3>
Top Team
</h3>

<p>
${bestTeam ?
bestTeam.teamName :
"None"}
</p>

</div>

<div class="card">

<h3>
Highest Points
</h3>

<p>
${bestTeam ?
bestTeam.points :
0}
</p>

</div>

<div class="card">

<h3>
Total Teams
</h3>

<p>
${teams.length}
</p>

</div>

`;

}

loadReports();

function loadDashboardStats(){

const currentUser =
getCurrentUser();

if(!currentUser) return;

const team =
JSON.parse(

localStorage.getItem(
`team_${currentUser.email}`
)

);

if(!team) return;

const teamName =
document.getElementById(
"teamNameCard"
);

const points =
document.getElementById(
"pointsCard"
);

const matches =
document.getElementById(
"matchesCard"
);

const wins =
document.getElementById(
"winsCard"
);

if(teamName){

teamName.textContent =
team.teamName;

}

if(points){

points.textContent =
team.points;

}

if(matches){

matches.textContent =
team.played;

}

if(wins){

wins.textContent =
team.wins;

}

}

loadDashboardStats();