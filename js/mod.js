let modInfo = {
	name: "The Time Wall Tree NG-",
	id: "timewall",
	author: "QqQeInfinity",
	pointsName: "点数",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	offlineLimit: Infinity,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "Basic",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1</h3><br>
		- 增加一个层级，包括19个升级，3个挑战与一个可购买<br/>
		- 增加12个成就`

let winText = `恭喜！你 >暂时< 通关了！`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
    return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0)
	if (hasUpgrade('T', 11)) gain = new Decimal(0.01)
	if (hasUpgrade('T', 21)) gain = gain.add(0.001)
	if (hasUpgrade('T', 22)) gain = gain.add(0.002)
	if (hasUpgrade('T', 12)) gain = gain.times(1.01)
	if (hasUpgrade('T', 13)) gain = gain.times(1.02)
	if (hasUpgrade('T', 14)) gain = gain.times(1.03)
	if (hasUpgrade('T', 15)) gain = gain.times(1.04)
	if (hasUpgrade('T', 24)) gain = gain.times(1.2)
	if (hasUpgrade('T', 25)) gain = gain.times((upgradeEffect('T', 25)))
	if (hasChallenge('T', 11)) gain = gain.times(2.085)
	if (hasUpgrade('T', 33)) gain = gain.times((upgradeEffect('T', 33)))
	if (hasUpgrade('T', 41)) gain = gain.times((upgradeEffect('T', 41)))
	if (hasUpgrade('T', 43)) gain = gain.times((upgradeEffect('T', 43)))
	if (hasAchievement('A', 25)) gain = gain.times(5)
	if (hasUpgrade('T', 23)&&gain.lt(1)) gain = gain.pow(0.5)
	if (hasChallenge('T', 12)) gain = gain.pow(1.01)
	if (inChallenge('T', 11)&&gain.lt(1)) gain = gain.pow(2)
	if (inChallenge('T', 11)&&gain.gt(1)) gain = gain.pow(0.5)
	if (inChallenge('T', 12)) gain = gain.add(1).log(10)
	if (inChallenge('T', 13)) gain = new Decimal(0.01)
	if (inChallenge('T', 13)) gain = gain.times(buyableEffect('T', 11))
	if (isEndgame()) gain = new Decimal(0)
	gain = tetraflow(gain,0,0.5)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
    '当前Endgame:完成TC3',
    function () {
      if (getPointGen().gt(0)) return "由于点数获取速度超过0/秒，当前点数获取受到软上限限制！"
    }
]

// Determines when the game "ends"
function isEndgame() {
	//return player.points.gte(new Decimal("e280000000"))
	return hasChallenge('T', 13)
}

// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

function tetraflow(number,start,power) { // EXPERIMENTAL FUNCTION - x => 10^^((slog10(x)-slog10(s))*p+slog10(s))
number = new Decimal(number)
    if(isNaN(number.mag))return new Decimal(NaN);
	start=new Decimal(start);
	if(number.gt(start)){
        let s = start.slog(10)
        // Fun Fact: if 0 < number.slog(10) - start.slog(10) < 1, such like overflow(number,start,power,start.slog(10).sub(1).floor())
		number=Decimal.tetrate(10,number.slog(10).sub(s).mul(power).add(s))
	}
	return number;
}