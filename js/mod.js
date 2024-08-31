let modInfo = {
	name: "The Time Wall Tree",
	id: "timewall",
	author: "QqQeInfinity",
	pointsName: "点数",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.2",
	name: "Compressed Update",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1 Basic</h3><br>
		- 增加一个层级，包括20个升级，3个挑战与一个可购买<br/>
		- 增加12个成就<br/>
	<h3>v0.2 Compressed Update</h3><br/>
	    - 增加2个层级，包括7个里程碑，21个升级，4个挑战与4个可购买<br/>
		- 时间墙层级增加4个升级<br/>
		- 为点数获取增加软上限与二重软上限<br/>
		- 增加21个成就`

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

function sc1power(){
	power = new Decimal(0.1)
	if (hasUpgrade('CT', 43)) power = power.add(buyableEffect('CT', 14))
	if (hasUpgrade('T', 51)) power = power.times(upgradeEffect('T', 51))
	if (hasUpgrade('T', 52)) power = power.times(upgradeEffect('T', 52))
	if (hasUpgrade('T', 53)) power = power.times(upgradeEffect('T', 53))
	if (hasUpgrade('CT', 45)) power = power.times(upgradeEffect('CT', 45))
	return power
}

function sc2power(){
	power = new Decimal(0.1)
	return power
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0.01)
	if (hasUpgrade('T', 11)) gain = new Decimal(0.01)
	if (hasUpgrade('T', 21)) gain = gain.add(0.001)
	if (hasUpgrade('T', 22)) gain = gain.add(0.002)
	if (hasUpgrade('CT', 11)) gain = gain.add(0.005)
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
	if (hasUpgrade('CT', 12)) gain = gain.times(buyableEffect('CT', 11))
	if (hasUpgrade('CT', 13)) gain = gain.times(buyableEffect('CT', 12))
	if (hasUpgrade('CT', 21)) gain = gain.times(buyableEffect('CT', 13))
	if (hasUpgrade('CT', 22)) gain = gain.times(upgradeEffect('CT', 22))
	if (hasUpgrade('CT', 24)) gain = gain.times(upgradeEffect('CT', 24))
	if (hasUpgrade('CT', 34)) gain = gain.times(upgradeEffect('CT', 34))
	if (challengeCompletions('CT', 12)) gain = gain.times(challengeEffect('CT', 12))
	if (hasMilestone('Q', 0)) gain = gain.times(1.5)
	if (hasMilestone('Q', 1)) gain = gain.times(2)
	if (hasMilestone('Q', 2)) gain = gain.times(2)
	if (hasMilestone('Q', 3)) gain = gain.times(2)
	if (hasMilestone('Q', 4)) gain = gain.times(2)
	if (hasMilestone('Q', 5)) gain = gain.times(3)
	if (hasUpgrade('T', 54)&&!inChallenge('T',13)) gain = gain.times(buyableEffect('T', 11))
	if (hasUpgrade('T', 23)&&gain.lt(1)) gain = gain.pow(0.5)
	if (hasChallenge('T', 12)) gain = gain.pow(1.01)
	if (hasChallenge('CT', 11)) gain = gain.pow(1.05)
	if (inChallenge('T', 11)&&gain.lt(1)) gain = gain.pow(2)
	if (inChallenge('T', 11)&&gain.gt(1)) gain = gain.pow(0.5)
	if (inChallenge('CT', 12)) gain = gain.pow(0.5)
	if (inChallenge('T', 12)||inChallenge('CT', 14)) gain = gain.add(1).log(10)
	if (inChallenge('T', 13)) gain = new Decimal(0.01)
	if (inChallenge('T', 13)) gain = gain.times(buyableEffect('T', 11))

	if (gain.gte(n(1000000))) gain = gain.div(n(1000000)).pow(sc1power()).times(n(1000000)) //sc1
	if (gain.gte(n(1e9))) gain = gain.div(n(1e9)).pow(sc2power()).times(n(1e9)) //sc2
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function(){a = '当前Endgame:10 QqQe308'
		if (getPointGen().gte(1000000)) a = a + '<br/>由于点数获取量超过1000000，点数获取量受到软上限限制！<br/>软上限指数：' + format(sc1power())
		if (getPointGen().gte(1e9)) a = a + '<br/>由于点数获取量超过1e9，点数获取量受到二重软上限限制！<br/>二重软上限指数：' + format(sc2power())
		return a
	}
]

// Determines when the game "ends"
function isEndgame() {
	//return player.points.gte(new Decimal("e280000000"))
	return player.Q.points.gte(10)
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

//快捷调用+提高运算速度
var zero = new Decimal(0)
var one = new Decimal(1)
var two = new Decimal(2)
var three = new Decimal(3)
var four = new Decimal(4)
var five = new Decimal(5)
var six = new Decimal(6)
var seven = new Decimal(7)
var eight = new Decimal(8)
var nine = new Decimal(9)
var ten = new Decimal(10)
//快捷定义
function n(num){
    return new Decimal(num)
}
//检测旁边的升级是否被购买
function checkAroundUpg(UPGlayer,place){
    place = Number(place)
    return hasUpgrade(UPGlayer,place-1)||hasUpgrade(UPGlayer,place+1)||hasUpgrade(UPGlayer,place-10)||hasUpgrade(UPGlayer,place+10)
}
//指数软上限
function powsoftcap(num,start,power){
	if(num.gt(start)){
		num = num.root(power).mul(start.pow(one.sub(one.div(power))))
	}
    return num
}
//e后数字开根
function expRoot(num,root){
    return ten.pow(num.log10().root(root))
}
//e后数字乘方
function expPow(num,pow){
    return ten.pow(num.log10().pow(pow))
}
//e后数字指数软上限
function expRootSoftcap(num,start,power){
    if(num.lte(start)) return num;
    num = num.log10();start = start.log10()
    return ten.pow(num.root(power).mul(start.pow(one.sub(one.div(power)))))
}
//修改class属性
function setClass(id,toClass = []){
    var classes = ""
    for(i in toClass) classes += " "+toClass[i]
    if(classes != "") classes = classes.substr(1)
    document.getElementById(id).className = classes
}
//快速创建sub元素
function quickSUB(str){
    return `<sub>${str}</sub>`
}
//快速创建sup元素
function quickSUP(str){
    return `<sup>${str}</sup>`
}
//快速给文字上色
function quickColor(str,color){
    return `<text style='color:${color}'>${str}</text>`
}