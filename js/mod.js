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
	num: "0.99.9",
	name: "Eternity Challenge Update(END)",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1 Basic</h3><br>
		- 增加一个层级，包括20个升级，3个挑战与一个可购买<br/>
		- 增加12个成就<br/>
	<h3>v0.2 Compressed Update</h3><br/>
	    - 增加2个层级，包括7个里程碑，21个升级，4个挑战与4个可购买<br/>
		- 时间墙层级增加4个升级<br/>
		- 为点数获取增加软上限与二重软上限<br/>
		- 增加21个成就<br/>
        - 增加一个彩蛋<br/>
	<h3>v0.25 QqQeInfinity Update</h3><br>
	    - 增加1个层级，包括1个里程碑与超人功能<br/>
		- 时间墙层级增加1个升级，压缩时间墙层级增加3个升级<br/>
		- 增加2个成就<br/>
		- 增加层级之间的连线<br/>
	<h3>v0.3 Double Compressed Update</h3><br>
	    - 增加2个层级，包括15个里程碑，4个挑战与16个二重压缩成就<br/>
		- QqQeInfinity层级增加1个里程碑，可以让QqQeInfinity超cokecole<br/>
		- 增加12个成就<br/>
		- 一些细节修改<br/>
	<h3>v0.35 Pre-Infinity Update</h3><br>
	    - DC层级增加1个里程碑，Co层级增加2个里程碑<br/>
		- 增加3+1个成就与成就统计<br/>
		- 增加了下一个层级(请等待下次更新)<br/>
	<h3>v0.4 Infnity Update (Part. I)</h3><br/>
	    - 增加了2个成就、8个维度与一个挑战<br>
	<h3>v0.45 Pre-break Update</h3><br/>
	    - 增加了1个成就与7个挑战<br>
		- 增加了黑洞与打破无限(不过都没有效果)<br>
		- 增加了一个新层级(也没什么用)<br>
	<h3>v0.5 Breaking Update 2025/2/6</h3><br/>
	    - 增加了12个成就与3个挑战<br>
		- 增加了12个无限升级，7个可购买<br>
		- 打破无限与qaqe308层级有效果了<br>
	<h3>v0.55 Black Hole Update 2025/2/8~2025/2/12</h3><br/>
	    - 黑洞有效果了<br>
		- 增加了1个可购买，5个挑战，10个成就与不知道多少个里程碑<br>
		- 增加了复制器(还没用)<br>
	<h3>v0.6 Replicanti Update 2025/4/5~2025/4/13</h3><br/>
	    - 实装复制器<br>
		- 增加10个成就，2个可购买与不知道多少个里程碑<br>
		- 增加了下一个层级(永恒)<br>
	<h3>v0.65.1 Eternity Update (I) 2025/5/4~2025/5/18</h3><br/>
	    - 增加了2个永恒里程碑<br>
		- Endgame:2次永恒<br>
	<h3>v0.65.2 Eternity Update (II) 2025/5/18~2025/6/29</h3><br/>
	    - 增加了1个永恒里程碑、升级树与时间维度<br>
		- Endgame:3次永恒+打破无限<br>
	<h3>v0.65.3 Eternity Update (III) 2025/7/10~2025/7/13</h3><br/>
	    - 增加了"resource-display"<br>
		- 增加了2个成就，1个里程碑，1个升级<br>
		- Endgame:5次永恒<br>
	<h3>v0.65.4 Eternity Update (IV) 2025/7/20~2025/7/24</h3><br/>
	    - 增加了"减速"功能<br>
		- 增加了4个里程碑<br>
		- Endgame:9次永恒<br>
	<h3>v0.65.4.5 a Bug-fixing Update 2025/7/26</h3><br/>
	    - 修复了1次永恒里程碑中一些奖励不生效的bug<br>
		- 修复了一次超人次数过多导致无法超人的bug<br>
		- 增加了一个里程碑与2个成就，并更改了一个成就<br>
		- Endgame:10次永恒<br>
	<h3>v0.65.5 Break-Eternity Update 2025/7/28~2025/8/3</h3><br/>
	    - 增加了6个里程碑与1个升级树上的升级，还有5个成就<br>
		- Endgame:1e365无限点数<br>
	<h3>v0.70 The 2nd Breaking Update 2025/8/7~2025/8/9</h3><br/>
	    - 升级树增加了51~93的升级<br>
		- 增加了3个里程碑，1个新层级与12个新成就<br>
		- 增加了1个永恒挑战<br>
		- Endgame:完成一次永恒挑战1<br>
	<h3>v0.75.1 Eternity Challenge Update(I) 2025/8/13~2025/8/16</h3><br/>
	    - 升级树做到133，增加5个永恒挑战<br>
		- 增加了3个里程碑与15个成就<br>
		- Endgame:42三级成就<br>
	<h3>v0.75.1.1 bug-fix 2025/8/20</h3><br>
	    - 修复了永恒里程碑相关的bug<br>
	<h3>v0.75.2 Eternity Challenge Update(II) 2025/10/3~2025/10/19</h3><br>
	    - 为无限维度增加了软上限<br>
		- 升级树做到171，增加3个永恒挑战<br>
		- 增加了1个EC里程碑，一个DeFe308里程碑与13个成就<br>
		- Endgame:24永恒挑战完成次数<br>
	<h3>v0.99.9 Eternity Challenge Update(END) 2025/11/8~2025/11/9</h3><br>
		- 增加了1个EC里程碑与3个成就<br>
		- 增加了膨胀与<img src="s297.jpg" width="25" height="25"><br>
		- Endgame:购买升级U1-1<br>`
		

let winText = `恭喜！你 >暂时< 通关了！`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
    return !isEndgame()
}

function sc1start(){
    start = n(1e6)
	if (challengeCompletions('DC', 11)) start = start.times(challengeEffect('DC', 11))
	if (inChallenge('DC',11)) start = 1
	return start
}

function sc1power(){
	power = new Decimal(0.1)
	if (hasUpgrade('CT', 43)) power = power.add(buyableEffect('CT', 14))
	if (hasUpgrade('T', 51)) power = power.times(upgradeEffect('T', 51))
	if (hasUpgrade('T', 52)) power = power.times(upgradeEffect('T', 52))
	if (hasUpgrade('T', 53)) power = power.times(upgradeEffect('T', 53))
	if (hasUpgrade('CT', 45)) power = power.times(upgradeEffect('CT', 45))
	if (hasUpgrade('CT', 54)) power = power.times(upgradeEffect('CT', 54))
	if (power.gte(0.8)) power = n(0.8)
	return power
}

function sc2power(){
	power = new Decimal(0.1)
	if (hasAchievement('DC', 11)) power = power.times(achievementEffect('DC', 11))
	if (power.gte(0.5)) power = n(0.5)
	return power
}

function sc3power(){
	power = new Decimal(0.05)
	if (hasAchievement('DC', 33)) power = power.add(0.025)
	return power
}

function sc4power(){
	power = new Decimal(0.5)
	power = power.add(buyableEffect('I', 22))
	if (gcs('E',121)==1) power=power.add(0.2)
	if (inChallenge('I', 26)||inChallenge('E', 12)) power = power.sub(0.2)
	return power
}

function sc5power(){
	power = new Decimal(0.5)
	if (inChallenge('I', 26)||inChallenge('E', 12)) power = power.sub(0.01)
	power = power.add(buyableEffect('I', 24))
	if (gcs('E',192)==1) power=power.add(0.15)
	if (gcs('E',193)==1) power=power.add(0.25)
	root = n(1).div(power)
	return root
}

function sc6power(){
	power = new Decimal(0.33)
	power = power.add(buyableEffect('I', 25))
	root = n(1).div(power)
	return root
}

function sc7power(){
	power = new Decimal(0.1)
	if (hasMilestone('I', 20)) power = power.add(0.05)
	if (hasMilestone('I', 21)) power = power.add(0.03)
	if (hasMilestone('I', 26)) power = power.add(0.02)
	root = n(1).div(power)
	return root
}

function sc8power(){
	power = new Decimal(0.01)
	if (hasAchievement('A2', 73)&&!hasAchievement('A3', 24)) power = power.add(0.49)
	power = power.add(tmp.df.effect5)
	root = n(1).div(power)
	return root
}

function bhcost1(x){s = n(1.5e11)
	a = s.times(n(3.5).pow(x))
	if (x.gte(20)) a = s.times(n(3.5).pow(20)).times((x.times(0.1).add(1.5)).pow(x.sub(20)))
	if (x.gte(50)) a = s.times((x.times(0.2).sub(3.5)).pow(x))
		return a
 }

 function bhcost2(x){s = n(2e11)
	a = s.times(n(4).pow(x))
	if (x.gte(20)) a = s.times(n(4).pow(20)).times((x.times(0.1).add(2)).pow(x.sub(20)))
	if (x.gte(30)) a = s.times((x.sub(25)).pow(x))
		return a
 }

 function bhcost3(x){s = n(1e11)
	a = s.times(n(5).pow(x))
	if (x.gte(20)) a = s.times(n(5).pow(20)).times((x.times(0.1).add(3)).pow(x.sub(20)))
	if (x.gte(50)) a = s.times((x.times(0.2).sub(2)).pow(x))
		return a
 }

 function repcost1(x){s = n(1e150)
	a = s.times(n(1e10).pow(x))
	if (x.gte(20)) a = s.times(n(1e200)).times(n(1e20).pow(x.sub(20)))
	if (x.gte(50)) a = s.times(n('1e700')).times(n(1e50).pow(x.sub(50)))
		return a
 }

 function repcost2(x){s = n(1e155)
	a = s.times(n(1e15).pow(x))
	if (x.gte(20)) a = s.times(n(1e300)).times(n(1e50).pow(x.sub(20)))
	if (x.gte(50)) a = s.times(n('1e1800')).times(n(1e100).pow(x.sub(50)))
		return a
 }

 function repcost3(x){s = n(1e160)
	a = s.times(n(1e20).pow(x))
	if (x.gte(20)) a = s.times(n('1e400')).times(n(1e40).pow(x.sub(20)))
	if (x.gte(50)) a = s.times(n('1e1600')).times(n(1e75).pow(x.sub(50)))
		return a
 }

// Calculate points/sec!
function getPointGen() {
	if(player.bx.points.lt(1)){
	gain = ptgainbeforeexp()

	if (hasMilestone('E', 8)) gain = gain.pow(tmp.qa.ptExp)
	gain = gain.times(ptdirmult())

	if (inChallenge('E',11)) gain = gain.pow(tmp.E.ec1effect)
	if (player.points.gte(1.79e308)&&!hasUpgrade('I', 21)) gain = n(0)
	if (player.points.gte(1.79e308)&&inChallenge('I', 16)) gain = n(0)
	if (player.points.gte('e1.79e308')) gain=n(0)}
	if(player.bx.points.gte(1)) gain=tmp.bx.effect
	return gain
}



// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	devSpeed:new Decimal(1),
	timePlayed:n(0),//游戏时间
    //timeplayed:n(0),//现实时间
}}

// Display extra things at the top of the page
var displayThings = [
	function(){a = '当前Endgame:购买升级U1-1'
	if(player.bx.points.lte(1)){
		if (hasMilestone('E', 8)&&!player.points.gte('e1.79e308')&&!player.bx.points.gte(1)) {a = a + '<br>当前点数获取量：'+format(ptgainbeforeexp())+'<sup>'
			a = a+format(tmp.qa.ptExp)+'</sup>x'+format(ptdirmult())+'='
			a =a+format(getPointGen())}
		if (ptgainbeforeexp().gte(sc1start())&&!getPointGen().gte(1.79e308)&&!hasAchievement('A2', 25)) a = a + '<br/>由于点数获取量超过'+format(sc1start())+'，点数获取量受到软上限限制！<br/>软上限指数：' + format(sc1power())
		if (ptgainbeforeexp().gte(1e9)&&!getPointGen().gte(1.79e308)&&!hasAchievement('A2', 25)) a = a + '<br/>由于点数获取量超过1e9，点数获取量受到二重软上限限制！<br/>二重软上限指数：' + format(sc2power())
		if (ptgainbeforeexp().gte(1e13)&&!getPointGen().gte(1.79e308)&&!hasAchievement('A2', 25)) a = a + '<br/>由于点数获取量超过1e13，点数获取量受到三重软上限限制！<br/>三重软上限指数：' + format(sc3power())
		if (player.points.gte(1.79e308)&&!hasUpgrade('I', 21)) a = a + '<br/>点数到达硬上限！'
		if (ptgainbeforeexp().gte(1.79e308)&&hasUpgrade('I', 21)&&!(sc4power().gte(1))&&!player.points.gte('e9e15')) a = a + '<br/>由于点数获取量超过1.79e308，点数获取量受到四重软上限限制！<br/>四重软上限指数：' + format(sc4power())
		if (ptgainbeforeexp().gte('1e616')&&!(sc5power().gte(1))&&!player.points.gte('e9e15')) a = a + '<br/>由于点数获取量超过1e616，点数获取量指数受到软上限限制！<br/>软上限指数：' + format(n(1).div(sc5power()))
		if (ptgainbeforeexp().gte('1e10000')&&!player.points.gte('e9e15')) a = a + '<br/>由于点数获取量超过1e10000，点数获取量指数受到二重软上限限制！<br/>二重软上限指数：' + format(n(1).div(sc6power()))
		if (ptgainbeforeexp().gte('1e50000')&&!player.points.gte('e9e15')) a = a + '<br/>由于点数获取量超过1e50000，点数获取量指数受到三重软上限限制！<br/>三重软上限指数：' + format(n(1).div(sc7power()))
			if (ptgainbeforeexp().gte('1e208500')&&!player.points.gte('e9e15')) a = a + '<br/>由于点数获取量超过1e208500，点数获取量指数的指数受到软上限限制！<br/>软上限指数：' + format(n(1).div(sc8power()))
			if (hasMilestone('E', 13)&&gcs('E', 511)==0&&!hasAchievement('A3',46)) a = a + quickColor('<br>由于不可抗力因素，从现在开始永恒后无限维度乘数将变成0，需要刷新以恢复！',"#ff0000")
			if (hasMilestone('E', 13)&&gcs('E', 511)==0&&hasAchievement('A3',46)) a = a + quickColor('<br>由于你完成了相关的隐藏成就，不可抗力因素已被移除',"#4bd123")
		if(player.points.gte('e1.79e308')) a=a + quickColor('<br>由于你的点数太膨胀了，点数被限制在e1.79e308！',"#ff0000")}
		return a
	}
]

var QqQe308 = "我睡前要超QqQe308，吃饭前要超QqQe308，学习前要超QqQe308，洗澡前要超QqQe308，拉屎前要超QqQe308，超QqQe308前还要超QqQe308，感觉我的生活除了超QqQe308就没有重要的事的，干什么事之前不超QqQe308就感觉心里刺痛刺痛的，像少了什么重要的事情一样，晚上睡觉前为了保证可以多超一会QqQe308我等到了凌晨4，5点才不安稳的入睡，梦里想的是超QqQe308，醒来想的是超QqQe308，每天超的最长的东西不是涩图而是QqQe308，每天打交道最长的不是老二而是QqQe308，没有QqQe308的生活怎么办啊😭😭😭超不了QqQe308的日子怎么活啊😭😭😭"

// Determines when the game "ends"
function isEndgame() {
	//return player.points.gte(new Decimal("e280000000"))
	//return player.qa.points.gte(1)
	//return hasUpgrade('I', 11)
	//return hasUpgrade('I', 71)
	//return player.E.points.gte(2)
	//return player.E.etr.gte(3)&&hasUpgrade('I', 21)
	//return player.E.etr.gte(5)
	//return player.E.etr.gte(10)
	//return player.I.points.gte('1e365')
	//return n(challengeCompletions('E',11)).gte(1)
	//return player.A3.points.gte(42)
	//return hasAchievement('A3',103)
	return hasUpgrade('bx',11)
}

// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(1e100) // Default is 1 hour which is just arbitrarily large
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

function gba(a,b){return getBuyableAmount(a,b)}

function gcs(a,b){return getClickableState(a,b)}

function ce(a,b) {return clickableEffect(a,b)}
function cc(a,b) {return challengeCompletions(a,b)}
function max(a,b) {if (n(a).gte(n(b))) return n(a)
	else return n(b)
}

function min(a,b) {if (n(a).gte(n(b))) return n(b)
	else return n(a)
}



function ptgainbeforeexp() {	if(!canGenPoints())
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
	if (hasUpgrade('CT', 52)) gain = gain.times(upgradeEffect('CT', 52))
	if (challengeCompletions('CT', 12)) gain = gain.times(challengeEffect('CT', 12))
	if (hasMilestone('Q', 0)&&!inChallenge('DC', 13)) gain = gain.times(1.5)
	if (hasMilestone('Q', 1)&&!inChallenge('DC', 13)) gain = gain.times(2)
	if (hasMilestone('Q', 2)&&!inChallenge('DC', 13)) gain = gain.times(2)
	if (hasMilestone('Q', 3)&&!inChallenge('DC', 13)) gain = gain.times(2)
	if (hasMilestone('Q', 4)&&!inChallenge('DC', 13)) gain = gain.times(2)
	if (hasMilestone('Q', 5)&&!inChallenge('DC', 13)) gain = gain.times(3)
	if (hasMilestone('Qi', 0)&&!inChallenge('DC', 13)) gain = gain.times(5)
	if (hasMilestone('DC', 0)) gain = gain.times(2)
	if (hasMilestone('DC', 2)) gain = gain.times(tmp.DC.effect)
	if (hasAchievement('DC', 12)) gain = gain.times(achievementEffect('DC', 12))
	if (n(challengeCompletions('DC', 14)).gte(1)&&!hasAchievement('DC', 42)) gain = gain.times(challengeEffect('DC', 14))
	if (hasAchievement('DC', 43)) gain = gain.times(achievementEffect('DC', 43))
	if (tmp.I.ipowereffect.gte(1)&&!hasUpgrade('I', 33)) gain = gain.times(tmp.I.ipowereffect)
	if (hasUpgrade('T', 54)&&!inChallenge('T',13)) gain = gain.times(buyableEffect('T', 11))
	gain = gain.times(buyableEffect('qa', 11))
    gain = gain.times(tmp.E.mil0effect1)

	if (hasUpgrade('T', 23)&&gain.lt(1)) gain = gain.pow(0.5)
	if (hasChallenge('T', 12)) gain = gain.pow(1.01)
	if (hasMilestone('DC', 1)) gain = gain.pow(1.01)
	if (hasAchievement('DC', 12)) gain = gain.pow(1.01)
	if (hasChallenge('CT', 11)) gain = gain.pow(1.05)
	if (inChallenge('T', 11)&&gain.lt(1)) gain = gain.pow(2)
	if (inChallenge('T', 11)&&gain.gt(1)) gain = gain.pow(0.5)
	if (inChallenge('I', 11)) gain = gain.pow(0.5)
	if (inChallenge('CT', 12)) gain = gain.pow(0.5)
	if (inChallenge('T', 12)||inChallenge('CT', 14)) gain = gain.add(1).log(10)
	if (inChallenge('T', 13)) gain = new Decimal(0.01)
	if (inChallenge('T', 13)) gain = gain.times(buyableEffect('T', 11))

	if (gain.gte(n(sc1start()))&&!hasAchievement('A2', 25)) gain = gain.div(n(sc1start())).pow(sc1power()).times(n(sc1start())) //sc1
	if (gain.gte(n(1e9))&&!hasAchievement('A2', 25)) gain = gain.div(n(1e9)).pow(sc2power()).times(n(1e9)) //sc2
	if (gain.gte(n(1e13))&&!hasAchievement('A2', 25)) gain = gain.div(n(1e13)).pow(sc3power()).times(n(1e13)) //sc3

	if (hasMilestone('co', 0)) gain = gain.times(1.5)
	if (n(challengeCompletions('DC', 14)).gte(1)&&hasAchievement('DC', 42)) gain = gain.times(challengeEffect('DC', 14))
	if (hasMilestone('Qi', 1)&&!inChallenge('DC', 13)) gain = gain.times(10)
	if (hasMilestone('co', 1)) gain = gain.times(3)
	if (hasMilestone('co', 2)) gain = gain.times(10)
	if (hasMilestone('co', 3)&&!inChallenge('I', 16)) gain = gain.times(tmp.co.effect)
	if (tmp.I.ipowereffect.gte(1)&&hasUpgrade('I', 33)) gain = gain.times(tmp.I.ipowereffect)

	if (gain.gte(n(1.79e308))) gain = gain.div(n(1e308)).pow(sc4power()).times(n(1e308)) //sc4
	if (gain.gte(n('1e616'))) gain = powsoftcap(gain,n('1e616'),sc5power()) //sc5
	if (gain.gte(n('1e10000'))) gain = powsoftcap(gain,n('1e10000'),sc6power()) //sc6
	if (gain.gte(n('1e50000'))) gain = powsoftcap(gain,n('1e50000'),sc7power()) //sc7
	if (gain.gte(n('1e208500'))) gain = expRootSoftcap(gain,n('1e208500'),sc8power()) //sc8
	return gain
}

function ptdirmult(){mult = n(1)
	if (gcs('E',71)==1) mult = mult.times(ce('E', 71))
	if (gcs('E',72)==1) mult = mult.times(ce('E', 72))
	if (gcs('E',73)==1) mult = mult.times(ce('E', 73))
	if (gcs('E',81)==1) mult = mult.times(ce('E', 81))
	if (gcs('E',82)==1) mult = mult.times(ce('E', 82))
	if (gcs('E',83)==1) mult = mult.times(ce('E', 83))
	if (gcs('E',91)==1) mult = mult.times(ce('E', 91))
	if (gcs('E',92)==1) mult = mult.times(ce('E', 92))
	if (gcs('E',101)==1) mult = mult.times(ce('E', 101))
	if (gcs('E',151)==1) mult = mult.times(ce('E', 151))
	if (gcs('E',152)==1) mult = mult.times(ce('E', 152))
	if (gcs('E',153)==1) mult = mult.times(ce('E', 153))
	if (gcs('E',161)==1) mult = mult.times(ce('E', 161))
	if(n(challengeCompletions('E',23)).gte(1)) mult=mult.times(challengeEffect('E',23))
	if(inChallenge('E',23)) mult=n(1)
		return mult
}
