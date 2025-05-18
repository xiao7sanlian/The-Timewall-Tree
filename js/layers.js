addLayer("A", {
    name: "Achievement", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        ach: new Decimal(0)
    }},
    color: "#ffe125",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "成就", // Name of prestige currency
    baseResource: "点数", // Name of resource prestige is based on
    //baseAmount() {return player.points}, // Get the current amount of baseResource
    //type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    devSpeedCal() {//我也不知道为什么放这里
	    let dev=n(1)
        if (inChallenge('I', 13)) dev=dev.div(2)
        if (hasUpgrade('I', 11)&&player.I.bh1activation.eq(1)&&player.I.bhpaused.eq(0)) dev=dev.times(tmp.I.bh1speed)
	    if (isEndgame()||player.T.pause.eq(1)) dev=n(0)
	    return dev
	   },
       doReset(resettingLayer) {
        if (resettingLayer == 'I'&&!hasChallenge('I', 12)||resettingLayer == 'E') {
            let kept = []
            layerDataReset(this.layer, kept)
        }
    },
    row: 'side', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    achievementPopups: true,
    achievements: {
        11: {
     name: "时间墙之始",
     done() {return player.T.points.gte(1)}, 
     onComplete() {player.A.points = player.A.points.add(1)},
     tooltip: "获得你的第一个时间墙！", 
     textStyle: {'color': '#ffe125'},
        },
    12: {
        name: "进展很慢",
        done() {return hasUpgrade('T', 15)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "购买第一行的5个时间墙升级", 
        textStyle: {'color': '#ffe125'},
    },
    13: {
        name: "结束痛苦",
        done() {return hasUpgrade('T', 23)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "购买时间墙升级23", 
        textStyle: {'color': '#ffe125'},
       },
       14: {
        name: "六六大顺",
        done() {return player.T.points.gte(6)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "同时拥有6个时间墙", 
        textStyle: {'color': '#ffe125'},
       },
       15: {
        name: "一箭双雕",
        done() {return player.points.gte(32)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "在没有对时间墙加成的情况下，一次重置获得2个时间墙（即获得32点数）<br/>奖励：获得3.14倍的时间墙", 
        textStyle: {'color': '#4bdc13'},
       },
       21: {
        name: "双倍点数",
        done() {return player.T.points.gte(31)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "使时间墙升级25的效果达到2x", 
        textStyle: {'color': '#ffe125'},
       },
       22: {
        name: "开始挑战",
        done() {return hasChallenge('T', 11)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "完成一个TC（时间墙挑战）", 
        textStyle: {'color': '#ffe125'},
       },
       23: {
        name: "TS181?",
        done() {return hasUpgrade('T', 35)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "购买时间墙升级35", 
        textStyle: {'color': '#ffe125'},
       },
       24: {
        name: "点数膨胀",
        done() {return player.points.gte(100)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "获得100点数", 
        textStyle: {'color': '#ffe125'},
       },
       25: {
        name: "反客为主",
        done() {return player.points.gte(player.T.points)&&player.T.points.gte(100)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "使你的点数>时间墙>100<br/>奖励：点数获取x5，并解锁时间墙升级42（需要先购买升级41）", 
        textStyle: {'color': '#4bdc13'},
       },
       31: {
        name: "继续挑战",
        done() {return hasChallenge('T', 12)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "完成TC2", 
        textStyle: {'color': '#ffe125'},
       },
       32: {
        name: "TC3?LC3!",
        done() {return hasChallenge('T', 13)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "完成TC3", 
        textStyle: {'color': '#ffe125'},
       },
       33: {
        name: "终于重置",
        done() {return hasUpgrade('CT', 11)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "获得一个压缩时间墙，并购买压缩时间墙升级11", 
        textStyle: {'color': '#ffe125'},
       },
       34: {
        name: "重获TS181",
        done() {return hasUpgrade('CT', 11)&&hasUpgrade('T', 35)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "第一次压缩时间墙重置后购买时间墙升级35", 
        textStyle: {'color': '#ffe125'},
       },
       35: {
        name: "第二次重置",
        done() {return hasUpgrade('CT', 12)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "获得第二个压缩时间墙，并购买压缩时间墙升级12<br/>奖励：时间墙升级35的效果x2，并降低时间墙升级45的价格", 
        textStyle: {'color': '#4bdc13'},
       },
       41: {
        name: "这是什么?",
        done() {return hasUpgrade('T', 45)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "解锁支线层级", 
        textStyle: {'color': '#ffe125'},
       },
       42: {
        name: "这就是支线层级吗?",
        done() {return player.Q.points.gte(1)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "获得一个QqQe308<br/>菜的不能再菜了、[笑哭][笑哭][喜欢][笑哭][笑哭][笑哭][笑哭][笑哭][喜欢][星星眼][打call][吃瓜][打call][打call][星星眼][打call]", 
        textStyle: {'color': '#ffe125'},
       },
       43: {
        name: "终于破百了!",
        done() {return getPointGen().gte(100)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "使点数获取到达100/s", 
        textStyle: {'color': '#ffe125'},
       },
       44: {
        name: "Very hard",
        done() {return hasChallenge('CT', 11)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "完成压缩时间墙挑战1", 
        textStyle: {'color': '#ffe125'},
       },
       45: {
        name: "不是哥们凭什么我完成了压缩时间墙挑战还要手动完成时间墙挑战啊",
        done() {return hasChallenge('CT', 11)&&hasChallenge('T',11)&&hasChallenge('T', 13)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "完成压缩时间墙挑战1后完成3个时间墙挑战<br/>奖励：压缩时间墙重置后保留时间墙挑战完成状态", 
        textStyle: {'color': '#4bdc13'},
       },
       51: {
        name: "QqQe616",
        done() {return player.Q.points.gte(2)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "获得2个QqQe308", 
        textStyle: {'color': '#ffe125'},
       },
       52: {
        name: "一箭双雕 II",
        done() {return player.T.points.gte(160000)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "获得160000时间墙<br/>(能让你在无加成的情况下一次获得2压缩时间墙)", 
        textStyle: {'color': '#ffe125'},
       },
       53: {
        name: "不止这一次",
        done() {return new Decimal(challengeCompletions('CT', 12)).gte(1)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "完成一次CTC2", 
        textStyle: {'color': '#ffe125'},
       },
       54: {
        name: "这不是反反软上限树",
        done() {return getPointGen().gte(1000000)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "使点数获取到达软上限", 
        textStyle: {'color': '#ffe125'},
       },
       55: {
        name: "作者不会没活了吧",
        done() {return player.Q.points.gte(5)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "获得5个QqQe308<br/>奖励：作者都没活了还有啥奖励", 
        textStyle: {'color': '#4bdc13'},
       },
       61: {
        name: "终于有QoL了!",
        done() {return hasUpgrade('CT', 31)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "获得压缩时间墙升级31", 
        textStyle: {'color': '#ffe125'},
       },
       62: {
        name: "完美完成!",
        done() {return new Decimal(challengeCompletions('CT', 12)).gte(5)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "完成5次CTC2", 
        textStyle: {'color': '#ffe125'},
       },
       63: {
        name: "没有TS181你让我怎么活啊",
        done() {return hasChallenge('CT', 13)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "完成CTC3", 
        textStyle: {'color': '#ffe125'},
       },
       64: {
        name: "还来?",
        done() {return hasUpgrade('CT', 42)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "解锁CTC4", 
        textStyle: {'color': '#ffe125'},
       },
       65: {
        name: "终于买到了!",
        done() {return hasUpgrade('T', 53)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "购买时间墙升级53<br/>奖励：时间墙升级35的效果x10，并解锁压缩时间墙升级43(需要先购买升级42)", 
        textStyle: {'color': '#4bdc13'},
       },
       71: {
        name: "软上限快废了，作者正在考虑搞二重软上限",
        done() {return new Decimal(sc1power()).gte(0.2)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "使软上限指数到达0.2", 
        textStyle: {'color': '#ffe125'},
       },
       72: {
        name: "这下真有二重软上限了",
        done() {return n(getPointGen()).gte(1e9)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "使点数获取到达二重软上限", 
        textStyle: {'color': '#ffe125'},
       },
       73: {
        name: "QqQe2772",
        done() {return player.Q.points.gte(9)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "获得9个QqQe308", 
        textStyle: {'color': '#ffe125'},
       },
       74: {
        name: "支线二!",
        done() {return player.Qi.points.gte(1)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "获得1个QqQeInfinity", 
        textStyle: {'color': '#ffe125'},
       },
       75: {
        name: "Top10我最香草的AD群群友——Top1:QqQe308",
        done() {return player.Qi.QqQe308.gte(1)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "超一次QqQe308<br/>奖励：解锁压缩时间墙升级52(需要先购买升级51)", 
        textStyle: {'color': '#4bdc13'},
       },
       81: {
        name: "第三层级!",
        done() {return player.DC.points.gte(1)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "获得一个二重压缩时间墙", 
        textStyle: {'color': '#ffe125'},
       },
       82: {
        name: "So Easy",
        done() {return new Decimal(challengeCompletions('DC', 11)).gte(1)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "完成一次DCTC1<br/>二重压缩时间墙不重置成就与支线层级导致的", 
        textStyle: {'color': '#ffe125'},
       },
       83: {
        name: "更多成就",
        done() {return player.DC.ach.gte(1)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "获得一个二重压缩成就", 
        textStyle: {'color': '#ffe125'},
       },
       84: {
        name: "成就里程碑",
        done() {return hasMilestone('DC',101)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "获得一个二重压缩成就里程碑", 
        textStyle: {'color': '#ffe125'},
       },
       85: {
        name: "即日起，此树正式改名为QQ企鹅树",
        done() {return player.Q.points.gte(15)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "获得15个QqQe308<br/>奖励：解锁DCTC4", 
        textStyle: {'color': '#4bdc13'},
       },
       91: {
        name: "新的支线",
        done() {return hasMilestone('DC',102)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "解锁cokecole", 
        textStyle: {'color': '#ffe125'},
       },
       92: {
        name: "强大的里程碑效果",
        done() {return player.co.points.gte(1)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "获得一个cokecole", 
        textStyle: {'color': '#ffe125'},
       },
       93: {
        name: "终于有QoL^2了!",
        done() {return hasMilestone('DC', 7)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "获得12二重压缩时间墙的里程碑", 
        textStyle: {'color': '#ffe125'},
       },
       94: {
        name: "Very Timewall",
        done() {return hasMilestone('Qi', 1)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "解锁QqQeInfinity超cokecole的功能", 
        textStyle: {'color': '#ffe125'},
       },
       95: {
        name: "一箭双雕 III",
        done() {return player.CT.points.gte(51200000)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "获得51200000压缩时间墙<br/>(能让你在无加成的情况下一次获得2二重压缩时间墙)<br/>奖励：QqQeInfinity超人的速度x1.05", 
        textStyle: {'color': '#4bd123'},
       },
       101: {
        name: "就结束了?",
        done() {return hasMilestone('DC',104)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "完成所有二重压缩成就", 
        textStyle: {'color': '#ffe125'},
       },
       102: {
        name: "cokecole*2",
        done() {return hasMilestone('co', 1)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "获得2个cokecole", 
        textStyle: {'color': '#ffe125'},
       },
       103: {
        name: "终于有加成了",
        done() {return hasMilestone('DC', 9)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "获得200二重压缩时间墙的里程碑", 
        textStyle: {'color': '#ffe125'},
       },
       104: {
        name: "QokeQole3",
        done() {return hasMilestone('co', 2)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "获得3个cokecole", 
        textStyle: {'color': '#ffe125'},
       },
       105: {
        name: "Infinity in AD",
        done() {return player.points.gte(1.79e308)}, 
        onComplete() {player.A.points = player.A.points.add(1)},
        tooltip: "获得1.79e308点数<br/>奖励：解锁下一个层级(会重置之前所有内容)", 
        textStyle: {'color': '#4bd123'},
       },
    }
})

addLayer("A2", {
    name: "Achievement2", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A<sup>2</sup>", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        ach: new Decimal(0)
    }},
    color: "#ffe125",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "二级成就", // Name of prestige currency
    baseResource: "点数", // Name of resource prestige is based on
    //baseAmount() {return player.points}, // Get the current amount of baseResource
    //type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 'side', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasAchievement('A2', 11)||hasAchievement('A3', 11)},
    doReset(resettingLayer) {
        if (resettingLayer == 'E') {
            let kept = []
            layerDataReset(this.layer, kept)
        }
    },
    achievementPopups: true,
    achievements: {
        11: {
     name: "真正的重置",
     done() {return player.I.points.gte(1)}, 
     onComplete() {player.A2.points = player.A2.points.add(1)},
     tooltip: "无限一次", 
     textStyle: {'color': '#ffe125'},
        },
    12: {
            name: "再次重置",
            done() {return player.I.inf.gte(2)}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "无限2次<br>奖励：解锁普通挑战", 
            textStyle: {'color': '#4bd123'},
               },
        13: {
        name: "Infinity QoL",
        done() {return n(tmp.I.NcComp).gte(1)}, 
        onComplete() {player.A2.points = player.A2.points.add(1)},
        tooltip: "完成一个普通挑战", 
        textStyle: {'color': '#ffe125'},
        },
    14: {
    name: "打破限制",
        done() {return hasUpgrade('I', 21)}, 
        onComplete() {player.A2.points = player.A2.points.add(1)},
        tooltip: "打破无限", 
        textStyle: {'color': '#ffe125'},
    },
    15: {
    name: "移除削弱",
        done() {return player.I.inf.gte(256)}, 
        onComplete() {player.A2.points = player.A2.points.add(1)},
        tooltip: "无限256次<br>奖励：无限重置时保留支线层级", 
        textStyle: {'color': '#4bd123'},
    },
    21: {
        name: "双倍IP",
            done() {return buyableEffect('I', 21).gte(2)}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "购买一个IP倍增升级", 
            textStyle: {'color': '#ffe125'},
    },
    22: {
        name: "Halfway",
            done() {return player.I.id4.gte(1)}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "购买一个第四无限维度", 
            textStyle: {'color': '#ffe125'},
    },
    23: {
        name: "稍微好了一些",
            done() {return buyableEffect('I', 22).gte(0.05)}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "购买一个软上限削弱升级", 
            textStyle: {'color': '#ffe125'},
    },
    24: {
        name: "对成就的渴望",
            done() {return hasUpgrade('I', 61)}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "购买BIU41", 
            textStyle: {'color': '#ffe125'},
    },
    25: {
        name: "无限挑战者",
            done() {return hasChallenge('I', 21)}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "完成一个无限挑战<br>奖励：移除前三重软上限", 
            textStyle: {'color': '#4bd123'},
    },
    31: {
        name: "支线四！",
            done() {return player.qa.points.gte(1)}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "获得一个qaqe308", 
            textStyle: {'color': '#ffe125'},
    },
    32: {
        name: "极致的时间墙",
            done() {return hasUpgrade('I', 63)}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "解锁QqQeInfinity超qaqe308的功能", 
            textStyle: {'color': '#ffe125'},
    },
    33: {
        name: "1e8 并非很多",
            done() {return player.I.points.gte(1e8)}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "获得1e8无限点数", 
            textStyle: {'color': '#ffe125'},
    },
    34: {
        name: "支线升级",
            done() {return hasChallenge('I', 22)}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "解锁Monika升级", 
            textStyle: {'color': '#ffe125'},
    },
    35: {
        name: "	Is this an Interstellar reference?",
            done() {return hasUpgrade('I', 11)}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "解锁黑洞<br>奖励：更改QqQeInfinity超人次数的计算方式", 
            textStyle: {'color': '#4bd123'},
    },
    41: {
        name: "QqQe308被超市了",
            done() {return hasMilestone('Qi', 100)}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "超市QqQe308", 
            textStyle: {'color': '#ffe125'},
    },
    42: {
        name: "TECHNOPOLIS 2085",
            done() {return player.points.gte('1e2085')}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "获得1e2085点数", 
            textStyle: {'color': '#ffe125'},
    },
    43: {
        name: "黑洞的魅力",
            done() {return player.Qi.qaqe308.gte(1)}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "超一次qaqe308", 
            textStyle: {'color': '#ffe125'},
    },
    44: {
        name: "还有多少挑战？",
            done() {return hasChallenge('I', 26)}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "完成无限挑战6", 
            textStyle: {'color': '#ffe125'},
    },
    45: {
        name: "反客为主 II",
            done() {return tmp.I.bh1duration.lt(tmp.I.bh1acttime)}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "使黑洞的冷却时间小于激活时间<br>奖励：黑洞的游戏速度加成+10%", 
            textStyle: {'color': '#4bd123'},
    },
    51: {
        name: "这个树太膨胀了",
            done() {return player.I.id8.gte(1)}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "购买一个第八无限维度", 
            textStyle: {'color': '#ffe125'},
    },
    52: {
        name: "此成就不存在",
            done() {return player.points.gte('9.999e9999')}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "获得9.999e9999点数", 
            textStyle: {'color': '#ffe125'},
    },
    53: {
        name: "此成就不存在 1.5",
            done() {return player.I.points.gte('9.999e99')}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "获得9.999e99无限点数", 
            textStyle: {'color': '#ffe125'},
    },
    54: {
        name: "终于结束了",
            done() {return hasChallenge('I', 28)}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "完成无限挑战8", 
            textStyle: {'color': '#ffe125'},
    },
    55: {
        name: "新的时间墙",
            done() {return hasUpgrade('I', 71)}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "解锁复制器（无限点数在此受到软上限限制）<br>奖励：无限维度*2(太敷衍了)", 
            textStyle: {'color': '#4bd123'},
    },
    61: {
        name: "请停止软上限",
            done() {return player.I.rep.gte(5)}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "拥有5个复制器", 
            textStyle: {'color': '#ffe125'},
    },
    62: {
        name: "通往永恒的一半",
            done() {return player.I.points.gte(n(2).pow(512))}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "获得1.33e154无限点数", 
            textStyle: {'color': '#ffe125'},
    },
    63: {
        name: "名不副实",
            done() {return tmp.I.ipowereffect.gte('1e1000000')}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "使无限之力给点数的加成达到1e1000000", 
            textStyle: {'color': '#ffe125'},
    },
    64: {
        name: "复制器星系",
            done() {return player.rg.points.gte(1)}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "获得一个ReplicantiGalaxy", 
            textStyle: {'color': '#ffe125'},
    },
    65: {
        name: "Big Big Crunch",
            done() {return player.I.points.gte(1e200)}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip() {return "获得1e200无限点数<br>奖励：基于无限点数提升无限点数获取（无视软上限与其他指数）<br>当前：x"+format(achievementEffect('A2', 65))}, 
            effect(){
                return player.I.points.add(10).log(10)
            },
            textStyle: {'color': '#4bd123'},
    },
    71: {
        name: "逸一时，误一世",
            done() {return player.points.gte('1e114514')}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "获得1e114514点数", 
            textStyle: {'color': '#ffe125'},
    },
    72: {
        name: "我感觉我没有必要再给加成了",
            done() {return player.I.points.gte('1e250')}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "获得1e250无限点数", 
            textStyle: {'color': '#ffe125'},
    },
    73: {
        name: "这个成就是用来凑数的",
            done() {return player.points.gte('1e200000')}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "获得1e200000点数", 
            textStyle: {'color': '#ffe125'},
    },
    74: {
        name: "最终的试炼",
            done() {return player.I.points.gte('1e300')}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "获得1e300无限点数", 
            textStyle: {'color': '#ffe125'},
    },
    75: {
        name: "达到永恒！",
            done() {return player.I.points.gte('1.79e308')}, 
            onComplete() {player.A2.points = player.A2.points.add(1)},
            tooltip: "获得1.79e308无限点数<br>奖励：解锁下一个层级", 
            textStyle: {'color': '#4bd123'},
    },
    }
})

addLayer("A3", {
    name: "Achievement3", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A<sup>3</sup>", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        ach: new Decimal(0)
    }},
    color: "#ffe125",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "三级成就", // Name of prestige currency
    baseResource: "点数", // Name of resource prestige is based on
    //baseAmount() {return player.points}, // Get the current amount of baseResource
    //type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 'side', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasAchievement('A3', 11)},
    achievementPopups: true,
    achievements: {
        11: {
     name: "Time is relative",
     done() {return player.E.points.gte(1)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "永恒一次", 
     textStyle: {'color': '#ffe125'},
        },
    12: {
     name: "Twice Eternity",
     done() {return player.E.points.gte(2)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "永恒2次", 
     textStyle: {'color': '#ffe125'},
        },
    }
})

addLayer("T", {
    name: "Timewall", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        pause: n(0)
    }},
    color: "#4adb13",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "时间墙", // Name of prestige currency
    baseResource: "点数", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasAchievement('A', 15)) mult = mult.times(3.14)
        if (hasUpgrade('T', 31)) mult = mult.times(2)
        if (hasChallenge('T', 11)) mult = mult.times(2.085)
        if (hasMilestone('Q', 2)&&!inChallenge('DC', 13)) mult = mult.times(2)
        if (hasMilestone('Q', 3)&&!inChallenge('DC', 13)) mult = mult.times(2)
        if (hasMilestone('Q', 4)&&!inChallenge('DC', 13)) mult = mult.times(2)
        if (hasMilestone('Q', 5)&&!inChallenge('DC', 13)) mult = mult.times(3)
        if (hasMilestone('Qi', 0)&&!inChallenge('DC', 13)) mult = mult.times(5)
        if (hasMilestone('Qi', 1)&&!inChallenge('DC', 13)) mult = mult.times(10)
        if (hasUpgrade('CT', 14)) mult = mult.times(upgradeEffect('CT', 14))
        if (hasUpgrade('CT', 25)) mult = mult.times(upgradeEffect('CT', 25))
        if (hasChallenge('CT', 13)) mult = mult.times(challengeEffect('CT', 13))
        if (n(challengeCompletions('DC', 14)).gte(1)) mult = mult.times(challengeEffect('DC', 14))
        if (hasAchievement('DC', 22)) mult = mult.times(achievementEffect('DC', 22))
        mult = mult.times(tmp.E.mil0effect1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (hasUpgrade('T',34)) exp = exp.times(1.1)
        if (inChallenge('CT', 11)) exp = exp.times(0.5)
        if (inChallenge('I', 12)) exp = exp.times(0.9)
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: 进行时间墙重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > layers[this.layer].row) {
    let kept = []
    if (hasAchievement('A', 45)&&resettingLayer!='I') kept.push("challenges")
    if (hasUpgrade('CT', 31)||hasAchievement('DC', 41)) kept.push("upgrades")
    if (hasChallenge('I', 13)) {kept.push('challenges')
        kept.push('upgrades')
    kept.push('milestones')
    kept.push('achievements')
    }
    if (hasMilestone('I', 6)) kept.push('buyables')
    if (resettingLayer == 'E') kept = []
    layerDataReset(this.layer, kept)
       }
    },
    update(diff){
        if ((hasUpgrade('CT',51)||hasChallenge('I', 12))&&layers.T.buyables[11].canAfford()&&n(getBuyableAmount('T', 11)).lt(500)) layers.T.buyables[11].buy();
        player.devSpeed = tmp.A.devSpeedCal
    },
    passiveGeneration()
    {
        mult = new Decimal(0)
        if (hasUpgrade('T', 35)||hasChallenge('CT', 11)||hasMilestone('DC', 4)) mult = new Decimal(0.01)
        if (hasChallenge('T', 12)) mult = mult.times(5)
        if (hasAchievement('A', 35)) mult = mult.times(2)
        if (hasAchievement('A', 65)) mult = mult.times(10)
        if (hasChallenge('I', 15)) mult = mult.times(10)
            if (inChallenge('I', 15)) mult = n(0)
        if (inChallenge('CT', 13)) mult = 0
        if (isEndgame()) mult = 0
        return mult
    },
    autoUpgrade() {if (hasChallenge('I', 11)) return true},
    upgrades: {
        11: {
            title: "1-1",
            description: "获得点数*1",
            cost(){
                a = new Decimal(0)
            if (inChallenge('DC', 14)) a = n(1.79e308)
            return a},
        },
        12: {
            title: "1-2",
            description: "获得点数*1.01",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade('T', 11)},
        },
        13: {
            title: "1-3",
            description: "获得点数*1.02",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade('T', 12)},
        },
        14: {
            title: "1-4",
            description: "获得点数*1.03",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade('T', 13)},
        },
        15: {
            title: "1-5",
            description: "获得点数*1.04",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade('T', 14)},
        },
        21: {
            title: "2-1",
            description: "基础获得点数+0.001",
            cost: new Decimal(5),
            unlocked() {return hasUpgrade('T', 14)},
        },
        22: {
            title: "2-2",
            description: "基础获得点数+0.002",
            cost: new Decimal(5),
            unlocked() {return hasUpgrade('T', 21)},
        },
        23: {
            title: "2-3",
            description: "获得点数^0.5(仅在获得点数<1时有效)",
            cost: new Decimal(5),
            unlocked() {return hasUpgrade('T', 22)},
        },
        24: {
            title: "2-4",
            description: "获得点数*1.2",
            cost: new Decimal(10),
            unlocked() {return hasUpgrade('T', 23)},
        },
        25: {
            title: "2-5",
            description: "基于时间墙数量加成点数获取",
            cost: new Decimal(20),
            effect() {
                return player[this.layer].points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('T', 24)},
        },
        31: {
            title: "3-1",
            description: "时间墙获取x2",
            cost: new Decimal(50),
            unlocked() {return hasUpgrade('T', 25)},
        },
        32: {
            title: "3-2",
            description: "解锁时间墙挑战",
            cost: new Decimal(50),
            unlocked() {return hasUpgrade('T', 31)},
        },
        33: {
            title: "3-3",
            description: "基于点数加成点数获取",
            cost: new Decimal(150),
            effect() {
                return player.points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('T', 32)},
        },
        34: {
            title: "3-4",
            description: "时间墙获取^1.1",
            cost: new Decimal(250),
            unlocked() {return hasUpgrade('T', 33)},
        },
        35: {
            title: "3-5",
            description: "每秒自动获取1%的时间墙",
            cost: new Decimal(500),
            unlocked() {return hasUpgrade('T', 34)},
        },
        41: {
            title: "4-1",
            description: "再次基于时间墙增加点数获取",
            cost: new Decimal(500),
            effect() {
                return player[this.layer].points.add(10).log(10)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('T', 34)},
        },
        42: {
            title: "4-2",
            description: "解锁第二个时间墙挑战",
            cost: new Decimal(1000),
            unlocked() {return hasUpgrade('T', 41)&&hasAchievement('A', 25)},
        },
        43: {
            title: "4-3",
            description: "再次基于点数增加点数获取",
            cost: new Decimal(1500),
            effect() {
                return player.points.add(10).log(10)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasChallenge('T', 12)},
        },
        44: {
            title: "4-4",
            description: "解锁第三个时间墙挑战",
            cost: new Decimal(3000),
            unlocked() {return hasUpgrade('T', 43)},
        },
        45: {
            title: "4-5",
            description: "解锁一个支线层级",
            cost() {
                cost = new Decimal(1.79e308)
                if (hasAchievement('A', 35)) cost = new Decimal(500)
                return cost
            },
            unlocked() {return hasUpgrade('T', 44)},
        },
        51: {
            title: "5-1",
            description: "基于点数削弱点数获取软上限的效果",
            cost: new Decimal(1e7),
            effect() {
                return player.points.add(1).pow(0.1).log(10).times(0.1).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('CT', 32)},
        },
        52: {
            title: "5-2",
            description: "基于时间墙削弱点数获取软上限的效果",
            cost: new Decimal(1e8),
            effect() {
                return player.T.points.add(1).pow(0.1).log(10).times(0.1).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('T', 51)},
        },
        53: {
            title: "5-3",
            description: "基于压缩时间墙削弱点数获取软上限的效果",
            cost: new Decimal(1e9),
            effect() {
                return player.CT.points.add(1).pow(0.1).log(2).times(0.1).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('T', 52)},
        },
        54: {
            title: "5-4",
            description: "使点数翻倍在TC3外也可购买，且效果在TC3外也能生效",
            cost: new Decimal(5e9),
            unlocked() {return hasUpgrade('T', 53)},
        },
        55: {
            title: "5-5",
            description: "解锁第三个层级",
            cost: new Decimal(6.66e12),
            unlocked() {return hasUpgrade('T', 54)},
        },
    },
    challenges: {
        11: {
            name: "TC1",
            challengeDescription: "当点数获取<1时，点数获取^2，反之^0.5",
            goalDescription:"2.085 点数",
            rewardDescription:"点数与时间墙获取x2.085",
            canComplete: function() {return player.points.gte(2.085)},
            unlocked() {return hasUpgrade('T',32)||hasAchievement('A', 45)}
        },
        12: {
            name: "TC2",
            challengeDescription: "点数获取变为原来的获取量+1再log10",
            goalDescription:"3.08 点数",
            rewardDescription:"时间墙升级35的效果x5，点数获取^1.01，并解锁一个新的升级",
            canComplete: function() {return player.points.gte(3.08)},
            unlocked() {return hasUpgrade('T',42)||hasAchievement('A', 45)}
        },
        13: {
            name: "TC3",
            challengeDescription: "所有加成点数获取的升级无效，但是…",
            goalDescription:"419 点数",
            rewardDescription:"解锁下一个层级",
            canComplete: function() {return player.points.gte(419)},
            unlocked() {return hasUpgrade('T',44)||hasAchievement('A', 45)}
        },
    },
    buyables: {
        11: {
            title(){text = '点数翻倍'
                if (!hasUpgrade('T',54)) text = text + "（仅在TC3中生效）"
                return text
            },
            cost(x) { return new Decimal(10).pow(x.sub(3)) },
            effect(x) {return new Decimal(3).pow(x)},
            display() { return "每次购买使点数x3<br/>当前已购买了"+ getBuyableAmount('T', 11) +"次<br/>效果：点数获取x"+format(buyableEffect('T', 11))+'<br/>下一次花费'+format(new Decimal(10).pow(getBuyableAmount('T', 11).sub(3)))+'点数' },
            unlocked() {return inChallenge('T', 13)||hasUpgrade('T', 54)},
            canAfford() { return player.points.gte(this.cost()) },
            purchaseLimit: n(500),
            buy() {
                if(!hasUpgrade('CT', 51)) player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    },
    clickables:{
        11: {
            title: "暂停游戏",
            display() {return "点击暂停游戏，再次点击以恢复"},
            canClick() {return true},
            onClick() {player.T.pause = player.T.pause.add(1)
                if (player.T.pause.gt(1)) player.T.pause = n(0)
            },
        },
    },
})

addLayer("Q", {
    name: "QqQe308", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Qq", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#eee308",
    requires(){a = new Decimal(1024)
        a = a.div(tmp.Qi.QqQe308effect)
        if (hasAchievement('DC',31)) a = a.div(2)
        if (player.Q.points.gte(20)) a = a.times(player.Q.points.sub(18).pow(2))
            if (inChallenge('I', 14)) a = a.times(1024)
        return a
    }, // Can be a function that takes requirement increases into account
    resource: "QqQe308", // Name of prestige currency
    baseResource: "点数", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (inChallenge('I', 14)) mult = mult.times(10)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(0.1)
        return exp
    },
    directMult() {mult = n(1)
        mult = mult.times(tmp.E.mil0effect2)
        return mult
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "q", description: "Q: 进行QqQe308重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    autoPrestige() {a = false
        if (hasChallenge('I', 14)) a = true
        return a
    },
    canBuyMax() {a = false
        if (hasMilestone('I', 0)) a = true
        return a
    },
    resetsNothing() {return hasChallenge('I', 14)},
    layerShown(){return hasAchievement('A', 41)},
    branches: ['T'],
    doReset(resettingLayer) {
        if (resettingLayer == 'I'&&!hasAchievement('A2', 15)||resettingLayer == 'E') {
            let kept = []
            layerDataReset(this.layer, kept)
        }
    },
    passiveGeneration()
    {
        mult = 0
        return mult
    },
    milestones: {
        0: {
            requirementDescription: "1 QqQe308",
            effectDescription: "获得1.5倍点数",
            done() { return player.Q.points.gte(1) }
        },
        1: {
            requirementDescription: "2 QqQe308",
            effectDescription: "获得2倍点数",
            done() { return player.Q.points.gte(2) }
        },
        2: {
            requirementDescription: "3 QqQe308",
            effectDescription: "获得2倍点数与时间墙",
            done() { return player.Q.points.gte(3) }
        },
        3: {
            requirementDescription: "4 QqQe308",
            effectDescription: "获得2倍点数与时间墙",
            done() { return player.Q.points.gte(4) }
        },
        4: {
            requirementDescription: "5 QqQe308",
            effectDescription: "获得2倍点数与时间墙",
            done() { return player.Q.points.gte(5) }
        },
        5: {
            requirementDescription: "9 QqQe308",
            effectDescription: "获得3倍点数、时间墙与压缩时间墙",
            done() { return player.Q.points.gte(9) }
        },
        6: {
            requirementDescription: "10 QqQe308",
            effectDescription: "解锁第二个支线层级",
            done() { return player.Q.points.gte(10) }
        },
    },
})

addLayer("CT", {
    name: "C_Timewall", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CT", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
	    points: new Decimal(0),
    }},
    color: "#ab4abc",
    requires() {a = new Decimal(5000)
        if (inChallenge('DC', 12)) a = n('1.79e308')
            return a
    }, // Can be a function that takes requirement increases into account
    resource: "压缩时间墙", // Name of prestige currency
    baseResource: "时间墙", // Name of resource prestige is based on
    baseAmount() {return player.T.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('CT',31)) mult = mult.times(2)
        if (hasUpgrade('CT',33)) mult = mult.times(upgradeEffect('CT', 33))
        if (hasMilestone('Q', 5)&&!inChallenge('DC', 13)) mult = mult.times(3)
        if (n(challengeCompletions('DC', 12)).gte(1)) mult = mult.times(challengeEffect('DC', 12))
        if (n(challengeCompletions('DC', 14)).gte(1)) mult = mult.times(challengeEffect('DC', 14))
        if (hasAchievement('DC', 21)) mult = mult.times(achievementEffect('DC', 21))
        if (hasAchievement('DC', 24)) mult = mult.times(achievementEffect('DC', 24))
        mult = mult.times(tmp.E.mil0effect1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (hasChallenge('CT', 14)) exp = exp.times(1.01)
        if (hasAchievement('DC', 23)) exp = exp.times(1.05)
            if (inChallenge('I', 12)) exp = exp.times(0.9)
        return exp
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: 进行压缩时间墙重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasAchievement('A', 32)},
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > layers[this.layer].row) {
    let kept = []
    if (hasMilestone('DC', 7)) kept.push("challenges")
    if (hasMilestone('DC', 103)) kept.push("upgrades")
        if (hasChallenge('I', 13)) {kept.push('challenges')
            kept.push('upgrades')
        kept.push('milestones')
        kept.push('achievements')
        }
    if (hasMilestone('I', 6)) kept.push('buyables')
    if (resettingLayer == 'E') kept = []
    layerDataReset(this.layer, kept)
       }
    },
    autoUpgrade() { if (hasMilestone("DC",7)||hasChallenge('I', 11)) return true},
    passiveGeneration()
    {
        mult = n(0)
        if (hasUpgrade('CT', 53)||hasAchievement('DC', 32)) mult = n(upgradeEffect('CT', 53)).times(0.01)
        if (hasAchievement('DC', 44)) mult = mult.times(10)
            if (hasChallenge('I', 15)) mult = mult.times(10)
                if (inChallenge('I', 15)) mult = n(0)
        if (isEndgame()) mult = 0
        return mult
    },
    branches: ['T','Q'],
    update(diff){
        if ((hasMilestone('DC',6)||hasChallenge('I', 12))&&layers.CT.buyables[11].canAfford()) layers.CT.buyables[11].buy();
        if ((hasMilestone('DC',6)||hasChallenge('I', 12))&&layers.CT.buyables[12].canAfford()) layers.CT.buyables[12].buy();
        if ((hasMilestone('DC',6)||hasChallenge('I', 12))&&layers.CT.buyables[13].canAfford()) layers.CT.buyables[13].buy();
        if ((hasMilestone('DC',6)||hasChallenge('I', 12))&&layers.CT.buyables[14].canAfford()) layers.CT.buyables[14].buy();
        if (hasMilestone('I', 18)&&player.points.gt(1)) setBuyableAmount(this.layer, 11, player.points.log(2))
        if (hasMilestone('I', 18)&&player.T.points.gt(1)) setBuyableAmount(this.layer, 12, player.T.points.log(10))
        if (hasMilestone('I', 18)&&player.CT.points.gt(1)) setBuyableAmount(this.layer, 13, player.CT.points.log(2))
        if (hasMilestone('I', 18)&&player.points.gt(1e6)) setBuyableAmount(this.layer, 14, player.points.div(1e6).log(2))
    },
    microtabs: {
        stuff: {       
            "Upgrades": {
                unlocked() {return true},
                content: [ "upgrades"]}, 
            "Buyables": {
                unlocked() {return hasUpgrade('CT', 12)},
                content: [ "buyables"]}, 
            "Challenges": {
                unlocked() {return hasUpgrade('CT', 15)},
                content: [ "challenges"]}, 
        }
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
    upgrades: {
        11: {
            title: "1-1",
            description: "基础获得点数+0.005",
            cost: new Decimal(1),
        },
        12: {
            title: "1-2",
            description: "解锁一个可购买项目",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade('CT', 11)},
        },
        13: {
            title: "1-3",
            description: "解锁第二个可购买",
            cost: new Decimal(2),
            unlocked() {return hasUpgrade('CT', 12)},
        },
        14: {
            title: "1-4",
            description: "基于点数加成时间墙获取",
            cost: new Decimal(2),
            effect() {
                return player.points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('CT', 13)},
        },
        15: {
            title: "1-5",
            description: "解锁压缩时间墙挑战",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade('CT', 14)},
        },
        21: {
            title: "2-1",
            description: "解锁第三个可购买",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade('CT', 15)},
        },
        22: {
            title: "2-2",
            description: "基于压缩时间墙数量增加点数获取",
            cost: new Decimal(2),
            effect() {
                return player.CT.points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('CT', 21)},
        },
        23: {
            title: "2-3",
            description: "解锁第二个压缩时间墙挑战",
            cost: new Decimal(10),
            unlocked() {return hasUpgrade('CT', 22)},
        },
        24: {
            title: "2-4",
            description: "基于QqQe308数量增加点数获取(2个起效)",
            cost: new Decimal(1),
            effect() {eff = new Decimal(1)
                if (player.Q.points.gte(2)) eff = eff.times(player.Q.points).pow(2)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return new Decimal(challengeCompletions('CT', 12)).gte(1)},
        },
        25: {
            title: "2-5",
            description: "基于QqQe308数量增加时间墙获取(3个起效)",
            cost: new Decimal(1),
            effect() {eff = new Decimal(1)
                if (player.Q.points.gte(3)) eff = eff.times(player.Q.points)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return new Decimal(challengeCompletions('CT', 12)).gte(2)},
        },
        31: {
            title: "3-1",
            description: "压缩时间墙获取数量*2，且压缩时间墙重置后保留时间墙升级",
            cost: new Decimal(10),
            unlocked() {return new Decimal(challengeCompletions('CT', 12)).gte(3)},
        },
        32: {
            title: "3-2",
            description: "解锁新的时间墙升级",
            cost: new Decimal(25),
            unlocked() {return new Decimal(challengeCompletions('CT', 12)).gte(4)},
        },
        33: {
            title: "3-3",
            description: "基于QqQe308数量增加压缩时间墙获取(4个起效)",
            cost: new Decimal(100),
            effect() {eff = new Decimal(1)
                if (player.Q.points.gte(4)) eff = eff.times(player.Q.points).pow(0.5)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return new Decimal(challengeCompletions('CT', 12)).gte(5)},
        },
        34: {
            title: "3-4",
            description: "基于可购买1的购买次数增加点数获取",
            cost: new Decimal(150),
            effect() {
                return new Decimal(1.1).pow(new Decimal(getBuyableAmount('CT', 11)))
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('CT', 33)},
        },
        35: {
            title: "3-5",
            description: "解锁第三个压缩时间墙挑战",
            cost: new Decimal(200),
            unlocked() {return hasUpgrade('CT', 34)},
        },
        41: {
            title: "4-1",
            description: "基于可购买2的购买次数增加点数获取",
            cost: new Decimal(350),
            effect() {
                return new Decimal(1.5).pow(new Decimal(getBuyableAmount('CT', 12)))
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasChallenge('CT', 13)},
        },
        42: {
            title: "4-2",
            description: "解锁第四个压缩时间墙挑战",
            cost: new Decimal(1000),
            unlocked() {return hasUpgrade('CT', 41)},
        },
        43: {
            title: "4-3",
            description: "解锁第四个可购买",
            cost: new Decimal(1500),
            unlocked() {return hasUpgrade('CT', 42)&&hasAchievement('A', 65)},
        },
        44: {
            title: "4-4",
            description: "基于点数增加压缩时间墙获取",
            cost: new Decimal(2000),
            effect() {
                return player.points.add(10).log(10).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('CT', 43)},
        },
        45: {
            title: "4-5",
            description: "基于QqQe308数量增加软上限指数(5个起效)",
            cost: new Decimal(3000),
            effect() {eff = new Decimal(1)
                if (player.Q.points.gte(5)) eff = eff.times(player.Q.points).sub(1).pow(0.5).log(2)
                return eff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('CT', 44)},
        },
        51: {
            title: "5-1",
            description: "自动购买\"点数翻倍\"可购买，并且不消耗点数",
            cost: new Decimal(5000),
            unlocked() {return hasUpgrade('CT', 45)},
        },
        52: {
            title: "5-2",
            description: "基于超QqQe308的次数增加点数获取",
            cost: new Decimal(20000),
            effect() {
                return player.Qi.QqQe308.add(1).pow(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('CT', 51)&&hasAchievement('A', 75)},
        },
        53: {
            title: "5-3",
            description: "基于超QqQe308的次数，每秒自动获取一定比例的压缩时间墙",
            cost: new Decimal(20850),
            effect() {
                return player.Qi.QqQe308.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"%/s" },
            unlocked() {return hasUpgrade('CT', 52)},
        },
        54: {
            title: "5-4",
            description: "基于超QqQe308的次数削弱点数获取软上限的效果",
            cost: new Decimal(30000),
            effect() {
                return player.Qi.QqQe308.add(1).pow(0.2).log(10).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('CT', 53)},
        },
    },
    challenges: {
        11: {
            name: "CTC1",
            challengeDescription: "时间墙获取^0.5",
            goalDescription:"100 时间墙",
            rewardDescription:"点数获取^1.05，且保持时间墙升级35的效果",
            canComplete: function() {return player.T.points.gte(100)},
            unlocked() {return hasUpgrade('CT',15)||hasMilestone('DC', 7)}
        },
        12: {
            name: "CTC2",
            challengeDescription(){return "点数获取^0.5<br>完成次数:"+challengeCompletions(this.layer,this.id)+"/5"},
            goalDescription(){return "1e"+new Decimal(3).add(challengeCompletions(this.layer,this.id))+"时间墙"},
            rewardDescription(){return "根据挑战完成次数增益点数获取<br/>效果：×"+format(challengeEffect(this.layer,this.id))+"<br/>每次完成后，额外解锁一个新的升级"},
            rewardEffect() {eff= new Decimal(challengeCompletions(this.layer,this.id)).add(1).pow(1.5)
            return eff
            },
            unlocked(){return hasUpgrade('CT', 23)||hasMilestone('DC', 7)},
            completionLimit() {return new Decimal(5)},
            canComplete: function() {return player.T.points.gte(new Decimal(10).pow(3).mul(new Decimal(10).pow(new Decimal(challengeCompletions(this.layer,this.id)))))},
        },
        13: {
            name: "CTC3",
            challengeDescription: "禁用自动获取时间墙的效果",
            goalDescription:"2e7 时间墙",
            rewardDescription(){return "基于压缩时间墙增益时间墙获取<br/>当前：×"+format(challengeEffect(this.layer,this.id))+"<br/>并解锁一个新的升级"},
            rewardEffect() {eff= player.CT.points.add(1).pow(0.2)
                return eff
                },
            canComplete: function() {return player.T.points.gte(2e7)},
            unlocked() {return hasUpgrade('CT',35)||hasMilestone('DC', 7)}
        },
        14: {
            name: "CTC4",
            challengeDescription: "点数获取变为原来的获取量+1再log10",
            goalDescription:"100000 时间墙",
            rewardDescription:"压缩时间墙获取^1.01",
            canComplete: function() {return player.T.points.gte(100000)},
            unlocked() {return hasUpgrade('CT',42)||hasMilestone('DC', 7)}
        },
    },
    buyables: {
        rows: 4,
		cols: 4,
        11: {
            title:'点数加成',
            cost(x) { return new Decimal(2).pow(x) },
            effect(x) {return new Decimal(1.01).pow(x)},
            display() { return "每次购买使点数x1.01<br/>当前已购买了"+ getBuyableAmount('CT', 11) +"次<br/>效果：点数获取x"+format(buyableEffect('CT', 11))+'<br/>下一次花费'+format(new Decimal(2).pow(getBuyableAmount('CT', 11)))+'点数' },
            unlocked() {return hasUpgrade('CT', 12)},
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                if (!hasMilestone('DC',6)) player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        12: {
            title:'点数加成 II',
            cost(x) { return new Decimal(10).pow(x) },
            effect(x) {return new Decimal(1.1).pow(x)},
            display() { return "每次购买使点数x1.1<br/>当前已购买了"+ getBuyableAmount('CT', 12) +"次<br/>效果：点数获取x"+format(buyableEffect('CT', 12))+'<br/>下一次花费'+format(new Decimal(10).pow(getBuyableAmount('CT', 12)))+'时间墙' },
            unlocked() {return hasUpgrade('CT', 13)},
            canAfford() { return player.T.points.gte(this.cost()) },
            buy() {
                if (!hasMilestone('DC',6)) player.T.points = player.T.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        13: {
            title:'点数加成 III',
            cost(x) { return new Decimal(2).pow(x) },
            effect(x) {return new Decimal(1.5).pow(x)},
            display() { return "每次购买使点数x1.5<br/>当前已购买了"+ getBuyableAmount('CT', 13) +"次<br/>效果：点数获取x"+format(buyableEffect('CT', 13))+'<br/>下一次花费'+format(new Decimal(2).pow(getBuyableAmount('CT', 13)))+'压缩时间墙' },
            unlocked() {return hasUpgrade('CT', 21)},
            canAfford() { return player.CT.points.gte(this.cost()) },
            buy() {
                if (!hasMilestone('DC',6)) player.CT.points = player.CT.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        14: {
            title:'软上限削弱',
            cost(x) { return new Decimal(10).pow(x).times(1e6) },
            effect(x) {return x.times(0.01)},
            display() { return "每次购买使基础软上限指数+0.01<br/>当前已购买了"+ getBuyableAmount('CT', 14) +"次<br/>效果：软上限指数+"+format(buyableEffect('CT', 14))+'<br/>下一次花费'+format(new Decimal(10).pow(getBuyableAmount('CT', 14)).times(1e6))+'点数' },
            unlocked() {return hasUpgrade('CT', 43)},
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                if (!hasMilestone('DC',6)) player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        }
    }
})

addLayer("Qi", {
    name: "QqQeInfinity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Qi", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        QqQe308: new Decimal(0),
        cokecole: n(0),
        qaqe308: n(0),
        Supermantime: new Decimal(0),
        Supermantime2: new Decimal(0),
        Superqaqe308time: n(0),
        choice: new Decimal(1),
    }},
    color: "#aee308",
    requires() {a = new Decimal(10)
        if (player.Qi.points.gte(2)) a = a.times(player.Qi.points)
            if (player.Qi.points.gte(160)) a = a.times(n(2).pow(player.Qi.points.sub(159)))
            if (inChallenge('I', 14)) a = n(1.79e309)
        return a}, // Can be a function that takes requirement increases into account
    resource: "QqQeInfinity", // Name of prestige currency
    baseResource: "QqQe308", // Name of resource prestige is based on
    baseAmount() {return player.Q.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        //if (player.Qi.points.gte(160)) exp = exp.div(player.Qi.points.times(0.05).add(1))
        return exp
    },
    directMult() {mult = n(1)
        mult = mult.times(tmp.E.mil0effect2)
        return mult
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: 进行QqQeInfinity重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasMilestone('Q', 6)},
    doReset(resettingLayer) {
        if (resettingLayer == 'I'&&!hasAchievement('A2', 15)||resettingLayer == 'E') {
            let kept = []
            layerDataReset(this.layer, kept)
        }
    },
    autoPrestige() {a = false
        if (hasChallenge('I', 14)) a = true
        return a
    },
    resetsNothing() {return hasChallenge('I', 14)},
    update(diff){
        if (!hasAchievement('I', 35)){
            if (hasMilestone('Qi', 0)&&player.Qi.choice.eq(n(2))&&!isEndgame()) player.Qi.Supermantime = player.Qi.Supermantime.add(n(diff));
            if (player.Qi.Supermantime.gte(n(tmp.Qi.Supermanspeed))&&hasMilestone('Qi', 0)) player.Qi.QqQe308 = player.Qi.QqQe308.add(1); 
            if (player.Qi.Supermantime.gte(n(tmp.Qi.Supermanspeed))&&hasMilestone('Qi', 0)) player.Qi.Supermantime = player.Qi.Supermantime.sub(n(tmp.Qi.Supermanspeed))
            if (hasMilestone('Qi', 1)&&player.Qi.choice.eq(n(3))&&!isEndgame()) player.Qi.Supermantime2 = player.Qi.Supermantime2.add(n(diff));
            if (player.Qi.Supermantime2.gte(n(tmp.Qi.Supermanspeed2))&&hasMilestone('Qi', 1)) player.Qi.cokecole = player.Qi.cokecole.add(1); 
            if (player.Qi.Supermantime2.gte(n(tmp.Qi.Supermanspeed2))&&hasMilestone('Qi', 1)) player.Qi.Supermantime2 = player.Qi.Supermantime2.sub(n(tmp.Qi.Supermanspeed2))
            if (hasUpgrade('I', 63)&&player.Qi.choice.eq(n(4))&&!isEndgame()) player.Qi.Superqaqe308time = player.Qi.Superqaqe308time.add(n(diff));
            if (player.Qi.Superqaqe308time.gte(n(tmp.Qi.Superqaqe308speed))&&hasMilestone('Qi', 1)) player.Qi.qaqe308 = player.Qi.qaqe308.add(1); 
            if (player.Qi.Superqaqe308time.gte(n(tmp.Qi.Superqaqe308speed))&&hasMilestone('Qi', 1)) player.Qi.Superqaqe308time = player.Qi.Superqaqe308time.sub(n(tmp.Qi.Superqaqe308speed))
        }
        if (hasAchievement('A2', 35)){
            if (player.Qi.Supermantime.gt(0)) {player.Qi.QqQe308 = player.Qi.QqQe308.add(player.Qi.Supermantime.div(tmp.Qi.Supermanspeed))
                player.Qi.Supermantime = n(0)
            }
            if (player.Qi.Supermantime2.gt(0)) {player.Qi.cokecole = player.Qi.cokecole.add(player.Qi.Supermantime2.div(tmp.Qi.Supermanspeed2))
                player.Qi.Supermantime2 = n(0)
            }
            if (player.Qi.Superqaqe308time.gt(0)) {player.Qi.qaqe308 = player.Qi.qaqe308.add(player.Qi.Superqaqe308time.div(tmp.Qi.Superqaqe308speed))
                player.Qi.Superqaqe308time = n(0)
            }
            if (hasMilestone('Qi', 0)&&player.Qi.choice.eq(n(2))&&!isEndgame()) player.Qi.QqQe308 = player.Qi.QqQe308.add(n(diff).div(tmp.Qi.Supermanspeed));
            if (hasMilestone('Qi', 1)&&player.Qi.choice.eq(n(3))&&!isEndgame()) player.Qi.cokecole = player.Qi.cokecole.add(n(diff).div(tmp.Qi.Supermanspeed2));
            if (hasUpgrade('I', 63)&&player.Qi.choice.eq(n(4))&&!isEndgame()) player.Qi.qaqe308 = player.Qi.qaqe308.add(n(diff).div(tmp.Qi.Superqaqe308speed));
        }

    },
    passiveGeneration()
    {
        mult = 0
        return mult
    },
    branches: ['Q'],
    microtabs: {
        stuff: {       
            "Milestones": {
                unlocked() {return true},
                content: [ ["milestones",[0,1]]]}, 
            "Superman": {
                unlocked() {return hasMilestone('Qi', 0)},
                content: [["display-text", () => tmp.Qi.Showdetail//"你超了QqQe308 <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'>" + 
                    //format(player.Qi.QqQe308) + "</h3> 次, 使QqQe308的获取需求 <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'> " + "/" +format(tmp.Qi.QqQe308effect)+ "</h3>.<br>" + 
                    //" 基于你的QqQeInfinity数量，QqQeInfinity每"+ format(tmp.Qi.Supermanspeed) +"秒超一次QqQe308<br>" + 
                    //"当前剩余"+format(n(tmp.Qi.Supermanspeed).sub(player.Qi.Supermantime))+"秒<br/>"+tmp.Qi.Showchoice
                    ],
                "clickables"]},
            "Supermarket": {
                unlocked() {return hasMilestone('Qi', 0)},
                content: [ ["milestones",[100,101,102]]]}, 
        },
        },
    tabFormat: [
        "main-display",
        "prestige-button",
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
    milestones: {
        0: {
            requirementDescription: "1 QqQeInfinity",
            effectDescription: "获得5倍点数与时间墙，并解锁QqQeInfinity的超人功能",
            done() { return player.Qi.points.gte(1) }
        },
        1: {
            requirementDescription: "2 QqQeInfinity",
            effectDescription: "获得10倍点数(忽略软上限)与时间墙，使QqQeInfinity可以超cokecole",
            done() { return player.Qi.points.gte(2) }
        },
        100: {
            requirementDescription: "超市QqQe308（需要超1024次）",
            effectDescription: "改进超QqQe308效果的公式<br>在超50000次QqQe308后，超QqQe308的速度将减慢！",
            done() { return player.Qi.QqQe308.gte(1024) }
        },
        101: {
            requirementDescription: "超市cokecole（需要超2085次）",
            effectDescription: "改进超cokecole效果的公式<br>在超25000次cokecole后，超cokecole的速度将减慢！",
            done() { return player.Qi.cokecole.gte(2085) }
        },
        102: {
            requirementDescription: "超市qaqe308（需要超9190次）",
            effectDescription: "超qaqe308次数也加成无限点数<br>在超5000次qaqe308后，超qaqe308的速度将减慢！",
            done() { return player.Qi.qaqe308.gte(9190) }
        },
    },
    clickables:{
        11: {
            title: "停止超人",
            display() {return "点击以停止超人"},
            canClick() {return true},
            onClick() {player.Qi.choice = n(1)},
        },
        12: {
            title: "超QqQe308",
            display() {return "点击以选择超QqQe308"},
            unlocked() {return hasMilestone('Qi', 0)},
            canClick() {return hasMilestone('Qi', 0)},
            onClick() {player.Qi.choice = n(2)},
        },
        13: {
            title: "超cokecole",
            display() {return "点击以选择超cokecole"},
            unlocked() {return hasMilestone('Qi', 1)},
            canClick() {return hasMilestone('Qi', 1)},
            onClick() {player.Qi.choice = n(3)},
        },
        14: {
            title: "超qaqe308",
            display() {return "点击以选择超qaqe308"},
            unlocked() {return hasUpgrade('I', 63)},
            canClick() {return hasUpgrade('I', 63)},
            onClick() {player.Qi.choice = n(4)},
        },
    },
    QqQe308effect() {
        a = n(player.Qi.QqQe308).add(1)
        if (hasMilestone('Qi', 100)) a = n(2).pow(player.Qi.QqQe308)
        return a
    },
    cokecoleffect() {
        a = n(player.Qi.cokecole).add(1)
        if (hasMilestone('Qi', 101)) a = n(2).pow(player.Qi.cokecole.pow(0.33))
        return a
    },
    cokecoleffect2() {
        a = n(player.Qi.cokecole).add(1).pow(1.5)
        if (hasMilestone('Qi', 101)) a = n(2).pow(player.Qi.cokecole.pow(0.4))
        return a
    },
    qaqe308effect() {
        a = n(10).pow(player.Qi.qaqe308)
        if (a.gte(1e100)) a = powsoftcap(a,n('1e100'),2)
        if (a.gte('1e5555')) a = powsoftcap(a,n('1e5555'),4)
        return a
    },
    qaqe308effect2() {
        a = player.Qi.qaqe308.pow(10)
        return a
    },
    Supermanspeed() {
        a = n(1200)
        if (player.Qi.points.gte(1)) a = a.div(player.Qi.points).div(challengeEffect('DC',13))
        if (hasAchievement('DC', 14)) a = a.div(achievementEffect('DC', 14))
        if (hasAchievement('A', 95)) a = a.div(1.05)
        if (hasMilestone('I', 24)) a = a.div(tmp.I.mil24effect)
        if (hasMilestone('I', 25)) a = a.div(tmp.I.mil25effect)
        if (player.Qi.QqQe308.gte(50000)) a = a.times(n(10).pow(player.Qi.QqQe308.div(50000).sub(1)))
        return a
    },
    Supermanspeed2() {
        a = n(14400)
        if (player.Qi.points.gte(1)) a = a.div(player.Qi.points)
        if (hasAchievement('DC', 34)) a = a.div(achievementEffect('DC', 34))
        if (hasAchievement('A', 95)) a = a.div(1.05)
        if (hasMilestone('I', 24)) a = a.div(tmp.I.mil24effect)
        if (hasMilestone('I', 25)) a = a.div(tmp.I.mil25effect)
        if (player.Qi.cokecole.gte(25000)) a = a.times(n(10).pow(player.Qi.cokecole.div(25000).sub(1)))
        return a
    },
    Superqaqe308speed() {
        a = n(6480000)
        if (player.Qi.points.gte(1)) a = a.div(player.Qi.points)
        if (hasAchievement('A', 95)) a = a.div(1.05)
        if (hasMilestone('I', 24)) a = a.div(tmp.I.mil24effect)
        if (hasMilestone('I', 25)) a = a.div(tmp.I.mil25effect)
        if (player.Qi.qaqe308.gte(5000)) a = a.times(n(10).pow(player.Qi.qaqe308.div(5000).sub(1)))
        return a
    },
    Showdetail() {
        a = "你超了QqQe308 <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'>" + format(player.Qi.QqQe308) + "</h3> 次, 使QqQe308的获取需求 <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'> " + "/" +format(tmp.Qi.QqQe308effect)+ "</h3>.<br>" + "基于你的QqQeInfinity数量，QqQeInfinity每 <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'>"+ format(tmp.Qi.Supermanspeed) +"</h3> 秒超一次QqQe308<br>"
            if (!hasAchievement('A2', 35)) a = a + "当前剩余 <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'>"+format(n(tmp.Qi.Supermanspeed).sub(player.Qi.Supermantime))+"</h3> 秒<br/>"
            if (hasAchievement('A2', 35)) a = a + "等效于每秒超 <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'>"+format(n(1).div(tmp.Qi.Supermanspeed))+"</h3> 次QqQe308<br/>算上游戏速度，你每秒正在超 <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'>"+format(n(1).div(tmp.Qi.Supermanspeed).times(player.devSpeed))+"</h3> 次QqQe308<br/>"
        if (hasMilestone('Qi', 1)) {a = a + "<br/>你超了cokecole <h3 style='color: #cce308; text-shadow: 0 0 3px #c2b280'>" + format(player.Qi.cokecole) + "</h3> 次, 使二重压缩时间墙的获取需求 <h3 style='color: #cce308; text-shadow: 0 0 3px #c2b280'> " + "/" +format(tmp.Qi.cokecoleffect)+ "</h3>.<br>" + "基于你的QqQeInfinity数量，QqQeInfinity每 <h3 style='color: #cce308; text-shadow: 0 0 3px #c2b280'>"+ format(tmp.Qi.Supermanspeed2) +"</h3> 秒超一次cokecole<br>" 
            if (!hasAchievement('A2', 35)) a = a + "当前剩余 <h3 style='color: #cce308; text-shadow: 0 0 3px #c2b280'>"+format(n(tmp.Qi.Supermanspeed2).sub(player.Qi.Supermantime2))+"</h3> 秒<br/>"
            if (hasAchievement('A2', 35)) a = a + "等效于每秒超 <h3 style='color: #cce308; text-shadow: 0 0 3px #c2b280'>"+format(n(1).div(tmp.Qi.Supermanspeed2))+"</h3> 次cokecole<br/>算上游戏速度，你每秒正在超 <h3 style='color: #cce308; text-shadow: 0 0 3px #c2b280'>"+format(n(1).div(tmp.Qi.Supermanspeed2).times(player.devSpeed))+"</h3> 次cokecole<br/>"
        }
        if (hasMilestone('DC', 9)) a = a + "由于200二重压缩时间墙里程碑，这也使二重压缩时间墙获取 <h3 style='color: #cce308; text-shadow: 0 0 3px #c2b280'> " + "x" +format(tmp.Qi.cokecoleffect2)+ "</h3>.<br>"
        if (hasUpgrade('I', 63)) {a = a + "<br/>你超了qaqe308 <h3 style='color: #ab4308; text-shadow: 0 0 3px #c2b280'>" + format(player.Qi.qaqe308) + "</h3> 次, 使无限维度 <h3 style='color: #ab4308; text-shadow: 0 0 3px #c2b280'> " + "x" +format(tmp.Qi.qaqe308effect)+ "</h3>.<br>" + "基于你的QqQeInfinity数量，QqQeInfinity每 <h3 style='color: #ab4308; text-shadow: 0 0 3px #c2b280'>"+ format(tmp.Qi.Superqaqe308speed) +"</h3> 秒超一次qaqe308<br>"
            if (!hasAchievement('A2', 35)) a = a + "当前剩余 <h3 style='color: #ab4308; text-shadow: 0 0 3px #c2b280'>"+format(n(tmp.Qi.Superqaqe308speed).sub(player.Qi.Superqaqe308time))+"</h3> 秒<br/>"
            if (hasAchievement('A2', 35)) a = a + "等效于每秒超 <h3 style='color: #ab4308; text-shadow: 0 0 3px #c2b280'>"+format(n(1).div(tmp.Qi.Superqaqe308speed))+"</h3> 次qaqe308<br/>算上游戏速度，你每秒正在超 <h3 style='color: #ab4308; text-shadow: 0 0 3px #c2b280'>"+format(n(1).div(tmp.Qi.Superqaqe308speed).times(player.devSpeed))+"</h3> 次qaqe308<br/>"
            if (hasMilestone('Qi', 102)) a = a + "由于“超市qaqe308”里程碑，这也使无限点数获取 <h3 style='color: #ab4308; text-shadow: 0 0 3px #c2b280'> " + "x" +format(tmp.Qi.qaqe308effect2)+ "</h3>.<br>"
        }
        a = a + tmp.Qi.Showchoice
        return a
    },
    Showchoice() {
        a = "QqQeInfinity当前"
        if (player.Qi.choice.eq(n(1))) a = a + "不在超人"
        if (player.Qi.choice.eq(n(2))) a = a + "正在超QqQe308"
        if (player.Qi.choice.eq(n(3))) a = a + "正在超cokecole"
        if (player.Qi.choice.eq(n(4))) a = a + "正在超qaqe308"
        return a
    },
})

addLayer("DC", {
    name: "DC_Timewall", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "DC", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        ach: n(0)
    }},
    color: "#dcadc2",
    requires() {a = new Decimal(50000)
        if (n(tmp.Qi.cokecoleffect).gte(1)) a = a.div(tmp.Qi.cokecoleffect)
            return a
    }, // Can be a function that takes requirement increases into account
    resource: "二重压缩时间墙", // Name of prestige currency
    baseResource: "压缩时间墙", // Name of resource prestige is based on
    baseAmount() {return player.CT.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasMilestone('DC', 9)) mult = mult.times(tmp.Qi.cokecoleffect2)
        mult = mult.times(tmp.E.mil0effect1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(0.5)
        if (inChallenge('I', 12)) exp = exp.times(0.9)
        return exp
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "D: 进行二重压缩时间墙重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    effect(){
        a = player.DC.points.times(0.05).add(1)
        if (hasMilestone('DC', 8)) a = n(10).pow(n(a).pow(2))
        if (a.gte(1e6)) a = n(10).pow(a.log(10).div(6).pow(0.5).times(6))
        if (a.gte(tmp.DC.hardcap)) a = tmp.DC.hardcap
            return a
      },
    hardcap(){
        a = n('1e2085')
        if (inChallenge('I', 16)) a = n('1e24191')
            return a
    },
      effectDescription() { 
        if (hasMilestone('DC', 2)) {
            a = "使点数获取x"+format(tmp.DC.effect)
            if (tmp.DC.effect.gte(1e6)&&tmp.DC.effect.lt(tmp.DC.hardcap)) a = a + "(受软上限限制)"
            if (tmp.DC.effect.gte(tmp.DC.hardcap)) a = a + "(已到达硬上限)"
        } else {
            a = "使点数获取x1.00"
        }
        return a
    },
    layerShown(){return hasUpgrade('T', 55)||hasAchievement('A', 81)},
    passiveGeneration()
    {
        mult = n(0)
        if (hasMilestone('I', 1)) mult = mult.add(1)
        if (isEndgame()) mult = 0
        return mult
    },
    branches: ['Qi','CT'],
    microtabs: {
        stuff: {       
            "Milestones": {
                unlocked() {return true},
                content: [ ["milestones",[0,1,2,3,4,5,6,7,8,9]]]}, 
            "Challenges": {
                unlocked() {return hasMilestone('DC', 0)},
                content: [ "challenges"]}, 
            "DC_Achievements": {
                unlocked() {return hasMilestone('DC', 0)},
                content: [["display-text", () => "你有"+player.DC.ach+"个二重压缩成就"],
                    "achievements"]}, 
            "DC_Ach_Milestones": {
                unlocked() {return hasMilestone('DC', 5)},
                content: [["display-text", () => "你有"+player.DC.ach+"个二重压缩成就"],
                    ["milestones",[101,102,103,104]]]}, 
        }
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > layers[this.layer].row) {
    let kept = []
    if (hasChallenge('I', 13)) {kept.push('challenges')
        kept.push('upgrades')
    kept.push('milestones')
    kept.push('achievements')
    }
    layerDataReset(this.layer, kept)
    if (resettingLayer == 'E') kept = []
    if (hasChallenge('I', 13)) player.DC.ach = n(16)
       }
    },
    milestones:{
        0: {
            requirementDescription: "1 二重压缩时间墙",
            effectDescription: "点数获取*2，解锁二重压缩时间墙挑战",
            done() { return player.DC.points.gte(1) }
        },
        1: {
            requirementDescription: "2 二重压缩时间墙",
            effectDescription: "点数获取^1.01",
            done() { return player.DC.points.gte(2) }
        },
        2: {
            requirementDescription: "3 二重压缩时间墙",
            effectDescription: "解锁二重压缩时间墙对点数获取的加成效果",
            done() { return player.DC.points.gte(3) }
        },
        3: {
            requirementDescription: "4 二重压缩时间墙",
            effectDescription: "解锁DCTC2",
            done() { return player.DC.points.gte(4) }
        },
        4: {
            requirementDescription: "5 二重压缩时间墙",
            effectDescription: "保留自动获取时间墙的效果",
            done() { return player.DC.points.gte(5) }
        },
        5: {
            requirementDescription: "6 二重压缩时间墙",
            effectDescription: "解锁二重压缩成就里程碑",
            done() { return player.DC.points.gte(6) }
        },
        6: {
            requirementDescription: "10 二重压缩时间墙",
            effectDescription: "自动购买压缩时间墙层级中的可购买且不消耗资源",
            done() { return player.DC.points.gte(10) }
        },
        7: {
            requirementDescription: "12 二重压缩时间墙",
            effectDescription: "二重压缩重置后保留挑战完成状态且自动购买升级",
            done() { return player.DC.points.gte(12) }
        },
        8: {
            requirementDescription: "15 二重压缩时间墙",
            effectDescription: "改进二重压缩时间墙对点数获取的加成效果",
            done() { return player.DC.points.gte(15) }
        },
        9: {
            requirementDescription: "200 二重压缩时间墙",
            effectDescription: "QqQeInfinity超cokecole的次数也加成二重压缩时间墙获取",
            done() { return player.DC.points.gte(200) }
        },
        101: {
            requirementDescription: "4 二重压缩成就",
            effectDescription: "解锁DCTC3",
            done() { return player.DC.ach.gte(4)&&hasMilestone('DC',5) }
        },
        102: {
            requirementDescription: "8 二重压缩成就",
            effectDescription: "解锁第三个支线层级",
            done() { return player.DC.ach.gte(8)&&hasMilestone('DC',5) }
        },
        103: {
            requirementDescription: "12 二重压缩成就",
            effectDescription: "每次重置后保留压缩时间墙升级",
            done() { return player.DC.ach.gte(12)&&hasMilestone('DC',5) }
        },
        104: {
            requirementDescription: "16 二重压缩成就",
            effectDescription: "解锁下一层级(需要1.79e308点数)",
            done() { return player.DC.ach.gte(16)&&hasMilestone('DC',5) }
        },
    },
    challenges: {
        11: {
            name: "DCTC1",
            challengeDescription(){return "点数获取软上限在1处就开始出现<br>完成次数:"+challengeCompletions(this.layer,this.id)+'/100'},
            goalDescription(){return format(n(10).pow(new Decimal(3).add(n(challengeCompletions(this.layer,this.id)).pow(2))))+" 点数"},
            rewardDescription(){return "根据挑战完成次数推迟软上限出现<br/>效果：×"+format(challengeEffect(this.layer,this.id))},
            rewardEffect() {eff= new Decimal(challengeCompletions(this.layer,this.id)).add(1).pow(0.5)
            return eff
            },
            unlocked(){return hasMilestone('DC', 0)},
            completionLimit() {return new Decimal(100)},
            canComplete: function() {return player.points.gte(n(10).pow(new Decimal(3).add(n(challengeCompletions(this.layer,this.id)).pow(2))))},
        },
        12: {
            name: "DCTC2",
            challengeDescription(){return "大幅增加压缩时间墙的获取需求<br>完成次数："+challengeCompletions(this.layer,this.id)+'/100'},
            goalDescription(){return format(n(10).pow(new Decimal(3).add(n(challengeCompletions(this.layer,this.id)).times(3))))+" 点数"},
            rewardDescription(){return "根据挑战完成次数加成压缩时间墙获取<br/>效果：×"+format(challengeEffect(this.layer,this.id))},
            rewardEffect() {eff= n(1.5).pow(new Decimal(challengeCompletions(this.layer,this.id)))
            return eff
            },
            unlocked(){return hasMilestone('DC', 3)},
            completionLimit() {return new Decimal(100)},
            canComplete: function() {return player.points.gte(n(10).pow(new Decimal(3).add(n(challengeCompletions(this.layer,this.id)).times(3))))},
        },
        13: {
            name: "DCTC3",
            challengeDescription(){return "所有QqQe308与QqQeInfinity里程碑无效<br>完成次数："+challengeCompletions(this.layer,this.id)+'/100'},
            goalDescription(){return format(n(10).pow(n(challengeCompletions(this.layer,this.id)).add(3).pow(2)))+" 点数"},
            rewardDescription(){return "根据挑战完成次数加成QqQeInfinity超QqQe308的速度<br/>效果：×"+format(challengeEffect(this.layer,this.id))},
            rewardEffect() {eff= n(1.01).pow(new Decimal(challengeCompletions(this.layer,this.id)))
            return eff
            },
            unlocked(){return hasMilestone('DC', 101)},
            completionLimit() {return new Decimal(100)},
            canComplete: function() {return player.points.gte(n(10).pow(n(challengeCompletions(this.layer,this.id)).add(3).pow(2)))},
        },
        14: {
            name: "DCTC4",
            challengeDescription(){return "第一个时间墙升级价格大幅上升<br>完成次数："+challengeCompletions(this.layer,this.id)+'/100'},
            goalDescription(){return format(n(10).pow(n(challengeCompletions('DC',14)).add(2).pow(2)))+" 点数"},
            rewardDescription(){return "根据挑战完成次数加成点数、时间墙与压缩时间墙获取<br/>效果：×"+format(challengeEffect(this.layer,this.id))},
            rewardEffect() {eff= n(1.2).pow(new Decimal(challengeCompletions(this.layer,this.id)))
            return eff
            },
            unlocked(){return hasAchievement('A', 85)},
            completionLimit() {return new Decimal(100)},
            canComplete: function() {return player.points.gte(n(10).pow(n(challengeCompletions(this.layer,this.id)).add(2).pow(2)))},
        },
    },
    achievements:{
        11: {
            name: "这不是很简单",
            done() {return n(challengeCompletions('DC',11)).gte(3)}, 
            tooltip(){ return "完成3次DCTC1<br/>奖励：DCTC1的奖励以削弱的效果影响二重软上限指数<br/>当前：x"+format(achievementEffect('DC', 11))}, 
            onComplete(){player.DC.ach = player.DC.ach.add(1)},
            effect(){
                return challengeEffect('DC', 11).pow(0.5)
            },
            textStyle: {'color': '#ffe125'},
           },
        12: {
            name: "很有挑战性",
            done() {return inChallenge('DC', 11)&&player.CT.points.gte(50000)}, 
            tooltip(){ return "在DCTC1中获得50000压缩时间墙<br/>奖励：基于压缩时间墙加成点数获取<br/>当前：x"+format(achievementEffect('DC', 12))}, 
            onComplete(){player.DC.ach = player.DC.ach.add(1)},
            effect(){
                return player.CT.points.add(1).pow(0.25)
            },
            textStyle: {'color': '#ffe125'},
           },
        13: {
            name: "我们需要二重软上限",
            done() {return inChallenge('DC', 11)&&n(getPointGen()).gte(1e9)}, 
            tooltip(){ return "在DCTC1中使点数获取到达1e9/s<br/>奖励：点数获取^1.05"}, 
            onComplete(){player.DC.ach = player.DC.ach.add(1)},
            textStyle: {'color': '#ffe125'},
           },
        14: {
            name: "强的不能再强了、",
            done() {return n(challengeCompletions('DC',11)).gte(4)}, 
            tooltip(){ return "完成4次DCTC1<br/>奖励：基于完成DCTC1的次数加快QqQeInfinity超QqQe308的速度<br/>当前：x"+format(achievementEffect('DC', 14))}, 
            onComplete(){player.DC.ach = player.DC.ach.add(1)},
            effect(){
                return n(challengeCompletions('DC', 11)).times(0.01).add(1)
            },
            textStyle: {'color': '#ffe125'},
           },
        21: {
            name: "无法压缩",
            done() {return n(challengeCompletions('DC',12)).gte(3)}, 
            tooltip(){ return "完成3次DCTC2<br/>奖励：二重压缩时间墙加成压缩时间墙获取<br/>当前：x"+format(achievementEffect('DC', 21))}, 
            onComplete(){player.DC.ach = player.DC.ach.add(1)},
            effect(){
                return player.DC.points.add(1).log(10).add(1)
            },
            textStyle: {'color': '#ffe125'},
        },
        22: {
            name: "Very hard...?",
            done() {return inChallenge('DC', 12)&&n(getPointGen()).gte(1e8)}, 
            tooltip(){ return "在DCTC2中使点数获取到达1e8/s<br/>奖励：基于压缩时间墙加成时间墙获取<br/>当前：x"+format(achievementEffect('DC', 22))}, 
            effect(){
                return player.CT.points.add(1).pow(0.2)
            },
            onComplete(){player.DC.ach = player.DC.ach.add(1)},
            textStyle: {'color': '#ffe125'},
        },
        23: {
            name: "怎么做到的?",
            done() {return inChallenge('DC', 12)&&hasUpgrade('CT', 11)}, 
            tooltip(){ return "在DCTC2中获得压缩时间墙升级11<br/>奖励：压缩时间墙获取^1.05"}, 
            onComplete(){player.DC.ach = player.DC.ach.add(1)},
            textStyle: {'color': '#ffe125'},
        },
        24: {
            name: "快要结束了",
            done() {return n(challengeCompletions('DC',12)).gte(5)}, 
            tooltip(){ return "完成5次DCTC2<br/>奖励：二重压缩时间墙加成压缩时间墙获取<br/>当前：x"+format(achievementEffect('DC', 24))}, 
            onComplete(){player.DC.ach = player.DC.ach.add(1)},
            effect(){
                return player.DC.points.add(1).pow(0.25)
            },
            textStyle: {'color': '#ffe125'},
        },
        31: {
            name: "QQ企鹅没力时刻",
            done() {return n(challengeCompletions('DC',13)).gte(1)}, 
            tooltip(){ return "完成1次DCTC3<br/>奖励：QqQe308的获取需求/2"}, 
            onComplete(){player.DC.ach = player.DC.ach.add(1)},
            textStyle: {'color': '#ffe125'},
        },
        32: {
            name: "不是很难",
            done() {return inChallenge('DC', 13)&&player.CT.points.gte(50000)}, 
            tooltip(){ return "在DCTC3中获得50000压缩时间墙<br/>奖励：保留自动获得压缩时间墙的效果"}, 
            onComplete(){player.DC.ach = player.DC.ach.add(1)},
            textStyle: {'color': '#ffe125'},
        },
        33: {
            name: "三重软上限!",
            done() {return inChallenge('DC', 13)&&n(getPointGen()).gte(1e13)}, 
            tooltip(){ return "在DCTC3中使点数获取到达1e13/s<br/>奖励：三重软上限指数增加0.025"}, 
            onComplete(){player.DC.ach = player.DC.ach.add(1)},
            textStyle: {'color': '#ffe125'},
        },
        34: {
            name: "You don't need it anyway",
            done() {return n(challengeCompletions('DC',13)).gte(2)}, 
            tooltip(){ return "完成2次DCTC3<br/>奖励：DCTC3的奖励以削弱的效果影响QqQeInfinity超cokecole的速度<br/>当前：x"+format(achievementEffect('DC', 34))}, 
            effect(){
                return challengeEffect('DC', 13).pow(0.5)
            },
            onComplete(){player.DC.ach = player.DC.ach.add(1)},
            textStyle: {'color': '#ffe125'},
        },
        41: {
            name: "升级是什么？",
            done() {return n(challengeCompletions('DC',14)).gte(2)}, 
            tooltip(){ return "完成2次DCTC4<br/>奖励：在二重压缩时间墙重置时保留时间墙升级"}, 
            onComplete(){player.DC.ach = player.DC.ach.add(1)},
            textStyle: {'color': '#ffe125'},
           },
        42: {
            name: "无效的挑战效果",
            done() {return inChallenge('DC', 14)&&hasUpgrade('T', 11)}, 
            tooltip(){ return "在DCTC4中获得升级11<br/>奖励：使DCTC4奖励效果对点数的加成不受软上限影响"}, 
            onComplete(){player.DC.ach = player.DC.ach.add(1)},
            textStyle: {'color': '#ffe125'},
           },
        43: {
            name: "就像正常游玩一样",
            done() {return n(challengeCompletions('DC',14)).gte(3)}, 
            tooltip(){ return "完成3次DCTC4<br/>奖励：基于完成二重压缩成就的数量加成点数获取<br/>当前：x"+format(achievementEffect('DC', 43))}, 
            effect(){
                return player.DC.ach
            },
            onComplete(){player.DC.ach = player.DC.ach.add(1)},
            textStyle: {'color': '#ffe125'},
        },
        44: {
            name: "一箭双雕 in DCTC4",
            done() {return inChallenge('DC', 14)&&player.CT.points.gte(51200000)}, 
            tooltip(){ return "在DCTC4中获得51200000压缩时间墙<br/>奖励：压缩时间墙升级53的效果x10"}, 
            onComplete(){player.DC.ach = player.DC.ach.add(1)},
            textStyle: {'color': '#ffe125'},
           },
    },
})

addLayer("co", {
    name: "cokecole", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Co", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#cce308",
    requires(){a = new Decimal(1e5)
        if (player.co.points.gte(2)) a = a.times(player.co.points.pow(3))
        if (player.co.points.gte(5)) a = a.times(n(2).pow(player.co.points))
            if (inChallenge('I', 16)) a = n(1.79e309)
        return a
    }, // Can be a function that takes requirement increases into account
    resource: "cokecole", // Name of prestige currency
    baseResource: "压缩时间墙", // Name of resource prestige is based on
    baseAmount() {return player.CT.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(0.1)
        return exp
    },
    directMult() {mult = n(1)
        mult = mult.times(tmp.E.mil0effect2)
        return mult
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "o", description: "O: 进行cokecole重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasAchievement('A', 91)},
    branches: ['DC'],
    doReset(resettingLayer) {
        if (resettingLayer == 'I'&&!hasAchievement('A2', 15)||resettingLayer == 'E') {
            let kept = []
            layerDataReset(this.layer, kept)
        }
    },
    autoPrestige() {a = false
        if (hasChallenge('I', 16)) a = true
        return a
    },
    effect(){
        a = n(10).pow(n(5).times(player.co.points))
        if (a.gte(1e290)) a = n(1e290)
            return a
      },
      effectDescription() { 
        if (hasMilestone('co', 3)) {
            a = "使点数获取x"+format(tmp.co.effect)
            if (tmp.co.effect.gte(1e290)) a = a + "(已到达硬上限)"
        } else {
            a = "使点数获取x1.00"
        }
        return a
    },
    resetsNothing() {return hasChallenge('I', 16)},
    passiveGeneration()
    {
        mult = 0
        return mult
    },
    milestones: {
        0: {
            requirementDescription: "1 cokecole",
            effectDescription: "获得1.5倍点数，忽略软上限与其他指数加成",
            done() { return player.co.points.gte(1) }
        },
        1: {
            requirementDescription: "2 cokecole",
            effectDescription: "获得3倍点数，忽略软上限与其他指数加成",
            done() { return player.co.points.gte(2) }
        },
        2: {
            requirementDescription: "3 cokecole",
            effectDescription: "获得10倍点数，忽略软上限与其他指数加成",
            done() { return player.co.points.gte(3) }
        },
        3: {
            requirementDescription: "4 cokecole",
            effectDescription: "cokecole数量加成点数获取，无视软上限与其他指数",
            done() { return player.co.points.gte(4) }
        },
    },
})

addLayer("I", {
    name: "Infinity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        inf: n(0),
        ipower: n(1),
        id1: n(0),
        id2: n(0),
        id3: n(0),
        id4: n(0),
        id5: n(0),
        id6: n(0),
        id7: n(0),
        id8: n(0),
        chal: n(0),
        AutoInf: n(0),
        bh1activation: n(0),
        bh1duration: n(0),
        bhpaused: n(0),
        resetTime: n(0),
        rep: n(1)
    }},
    color: "#b67f33",
    requires(){a = new Decimal(1.79e308)
        return a
    }, // Can be a function that takes requirement increases into account
    resource: "无限点数", // Name of prestige currency
    baseResource: "点数", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0032, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.times(buyableEffect('I', 21))
        if (hasMilestone('qa', 1)) mult = mult.times(tmp.qa.effect)
        mult = mult.times(buyableEffect('qa', 14))
        if (hasChallenge('I', 26)) mult = mult.times(challengeEffect('I', 26))
        if (hasMilestone('Qi', 102)) mult = mult.times(tmp.Qi.qaqe308effect2)
        if (hasChallenge('I', 27)) mult = mult.times(challengeEffect('I', 27))
        mult = mult.times(tmp.E.mil0effect3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (hasMilestone('I', 22)) exp = exp.add(tmp.I.mil22effect)
        if (hasMilestone('I', 26)) exp = exp.add(buyableEffect('I', 26))
        return exp
    },
    directmult() {a = n(1)
        if (hasMilestone('I', 23)) a = a.times(77777)
        if (hasAchievement('A2', 65)) a = a.times(achievementEffect('A2', 65))
            return a
    },
    canReset() {return player.points.gte(1.79e308)&&player.I.points.lt(1.79e308)},
    softcap: n(1e140),
    softcapPower: 0.1,
    update(diff){
        if (player.points.gte(1.79e308)&&!hasUpgrade('I', 21)) player.points = n(1.79e308)
        if (getBuyableAmount(this.layer, 18).gte(1)) player.I.id7 = player.I.id7.add(player.I.id8.times(tmp.I.id8mult).times(diff))
        if (getBuyableAmount(this.layer, 17).gte(1)) player.I.id6 = player.I.id6.add(player.I.id7.times(tmp.I.id7mult).times(diff))
        if (getBuyableAmount(this.layer, 16).gte(1)) player.I.id5 = player.I.id5.add(player.I.id6.times(tmp.I.id6mult).times(diff))
        if (getBuyableAmount(this.layer, 15).gte(1)) player.I.id4 = player.I.id4.add(player.I.id5.times(tmp.I.id5mult).times(diff))
        if (getBuyableAmount(this.layer, 14).gte(1)) player.I.id3 = player.I.id3.add(player.I.id4.times(tmp.I.id4mult).times(diff))
        if (getBuyableAmount(this.layer, 13).gte(1)) player.I.id2 = player.I.id2.add(player.I.id3.times(tmp.I.id3mult).times(diff))
        if (getBuyableAmount(this.layer, 12).gte(1)) player.I.id1 = player.I.id1.add(player.I.id2.times(tmp.I.id2mult).times(diff))
        if (getBuyableAmount(this.layer, 11).gte(1)) player.I.ipower = player.I.ipower.add(player.I.id1.times(tmp.I.id1mult).times(diff))
        if (player.I.AutoInf.eq(1)&&canReset(this.layer)) doReset(this.layer)
        if (player.devSpeed.gt(0)&&player.I.bhpaused.eq(0)) {
        if (player.I.bh1activation.eq(0)&&hasUpgrade('I', 11)&&tmp.I.bh1percent.lt(0.9999)) player.I.bh1duration = player.I.bh1duration.add(diff)
        if (player.I.bh1activation.eq(0)&&player.I.bh1duration.gte(tmp.I.bh1duration)) {player.I.bh1duration = n(0)
            player.I.bh1activation = n(1)}
        if (player.I.bh1activation.eq(1)&&hasUpgrade('I', 11)&&tmp.I.bh1percent.lt(0.9999)) player.I.bh1duration = player.I.bh1duration.add(n(diff).div(player.devSpeed))
            if (player.I.bh1activation.eq(1)&&player.I.bh1duration.gte(tmp.I.bh1acttime)) {player.I.bh1duration = n(0)
            player.I.bh1activation = n(0)}}
        if (tmp.I.bh1percent.gte(0.9999)) player.I.bh1activation = n(1)
        if (inChallenge('I', 27)||inChallenge('I', 28)) player.I.bhpaused = n(1)
        if (hasUpgrade('I', 71)&&player.devSpeed.gt(1)&&player.I.rep.lt(1048576)) player.I.rep = player.I.rep.times(tmp.I.repmult.pow(n(diff).div(player.devSpeed)))
        if (player.I.rep.gt(1048576)) player.I.rep = n(1048576)
        if (player.I.points.gt(n(2).pow(1024))) player.I.points = n(2).pow(1024)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "I", description: "I(大写): 无限", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasAchievement('A', 105)||hasAchievement('A2', 11)},
    branches: ['DC'],
    microtabs: {
        stuff: {       
            "Dimensions": {
                unlocked() {return true},
                content: [ ["display-text", () => "你无限了"+format(player.I.inf)+"次，使无限维度x"+format(tmp.I.idmult)+
                    "<br>你需要完成所有普通挑战以打破无限。<br>你有"
                    +format(player.I.ipower)+"无限之力，使点数获取x"+format(player.I.ipower)+"^"+format(tmp.I.ipowerexp)+"="+format(tmp.I.ipowereffect)
                    +"<br>你当前正在生产"+format(player.I.id1.times(tmp.I.id1mult))+"无限之力每秒"],
                    ["buyables", [1]]]}, 
            "Challenges": {
                unlocked() {return hasAchievement('A2', 12)},
                content: [ ["display-text", () => "你完成了"+format(tmp.I.NcComp)+"个普通挑战，使无限维度x"+format(tmp.I.chaltoidmult)],
                ["challenges", [1]]]}, 
            "Black Hole": {
                unlocked() {return hasChallenge('I', 13)},
                content: [ ["upgrades", [1]],
                ["display-text", () => tmp.I.bhshow],
            ['clickables',[2]], ['buyables', [3]] ,
            ["display-text", () => "当黑洞激活时间占比大于99.99%时，黑洞将永久激活<br>当前："+format(tmp.I.bh1percent.times(100))+"%"]]}, 
            "Breaking Infinity": {
                unlocked() {return tmp.I.NcComp.gte(6)},
                content: [ ["upgrades", [2,3,4,5,6]],
                ["buyables", [2]],
                    ["display-text", () => "打破无限也将使你解锁点数里程碑与新的无限升级"]]},
            "Points Milestone": {
                unlocked() {return hasUpgrade('I', 21)},
                content: ["milestones"]},
            "Automatic": {
                unlocked() {return hasUpgrade('I', 41)},
                content: [["clickables",[1]]],},
            "Infinity Challenges": {
                unlocked() {return hasMilestone('I', 5)},
                content: [ ["display-text", () => "你完成了"+format(tmp.I.IcComp)+"个无限挑战，使无限维度x"+format(tmp.I.ictoidmult)],
                ["challenges", [2]]]}, 
            "Replicanti": {
                unlocked() {return hasChallenge('I', 28)},
                content: [ ["upgrades", [7]],
                ["display-text", () => tmp.I.repshow],["buyables", [4]]]}, 
        },     
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
    doReset(resettingLayer) {
        if (resettingLayer=='I') {player.I.inf = player.I.inf.add(1)
            player.I.ipower = n(1)
        player.I.id1 = n(getBuyableAmount(this.layer, 11))
        player.I.id2 = n(getBuyableAmount(this.layer, 12))
        player.I.id3 = n(getBuyableAmount(this.layer, 13))
        player.I.id4 = n(getBuyableAmount(this.layer, 14))
        player.I.id5 = n(getBuyableAmount(this.layer, 15))
        player.I.id6 = n(getBuyableAmount(this.layer, 16))
        player.I.id7 = n(getBuyableAmount(this.layer, 17))
        player.I.id8 = n(getBuyableAmount(this.layer, 18))
        if (player.I.rep.gte(tmp.rg.effect)) player.I.rep = tmp.rg.effect
        }
        if (layers[resettingLayer].row > layers[this.layer].row) {
     let kept = []
     layerDataReset(this.layer, kept)
        }
    },
    passiveGeneration()
    {
        mult = 0
        return mult
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(2).pow(x) },
            title: '第一无限维度',
            display() { return "花费："+format(this.cost())+"无限点数<br>维度倍率：x"+format(tmp.I.id1mult)+"<br>当前数量："+format(player.I.id1)+"<br>已购买了"+format(getBuyableAmount(this.layer, this.id))+"次"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.I.id1 = player.I.id1.add(1)
            },
        },
        12: {
            cost(x) { return n(4).times(new Decimal(4).pow(x)) },
            title: '第二无限维度',
            display() { return "花费："+format(this.cost())+"无限点数<br>维度倍率：x"+format(tmp.I.id2mult)+"<br>当前数量："+format(player.I.id2)+"<br>已购买了"+format(getBuyableAmount(this.layer, this.id))+"次"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.I.id2 = player.I.id2.add(1)
            },
        },
        13: {
            cost(x) { return n(16).times(new Decimal(8).pow(x)) },
            title: '第三无限维度',
            display() { return "花费："+format(this.cost())+"无限点数<br>维度倍率：x"+format(tmp.I.id3mult)+"<br>当前数量："+format(player.I.id3)+"<br>已购买了"+format(getBuyableAmount(this.layer, this.id))+"次"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.I.id3 = player.I.id3.add(1)
            },
        },
        14: {
            cost(x) { return n(2).pow(8).times(new Decimal(16).pow(x)) },
            title: '第四无限维度',
            display() { return "花费："+format(this.cost())+"无限点数<br>维度倍率：x"+format(tmp.I.id4mult)+"<br>当前数量："+format(player.I.id4)+"<br>已购买了"+format(getBuyableAmount(this.layer, this.id))+"次"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.I.id4 = player.I.id4.add(1)
            },
        },
        15: {
            cost(x) { return n(2).pow(16).times(new Decimal(2).pow(5).pow(x)) },
            title: '第五无限维度',
            display() { return "花费："+format(this.cost())+"无限点数<br>维度倍率：x"+format(tmp.I.id5mult)+"<br>当前数量："+format(player.I.id5)+"<br>已购买了"+format(getBuyableAmount(this.layer, this.id))+"次"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.I.id5 = player.I.id5.add(1)
            },
        },
        16: {
            cost(x) { return n(2).pow(32).times(new Decimal(2).pow(6).pow(x)) },
            title: '第六无限维度',
            display() { return "花费："+format(this.cost())+"无限点数<br>维度倍率：x"+format(tmp.I.id6mult)+"<br>当前数量："+format(player.I.id6)+"<br>已购买了"+format(getBuyableAmount(this.layer, this.id))+"次"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.I.id6 = player.I.id6.add(1)
            },
        },
        17: {
            cost(x) { return n(2).pow(64).times(new Decimal(2).pow(7).pow(x)) },
            title: '第七无限维度',
            display() { return "花费："+format(this.cost())+"无限点数<br>维度倍率：x"+format(tmp.I.id7mult)+"<br>当前数量："+format(player.I.id7)+"<br>已购买了"+format(getBuyableAmount(this.layer, this.id))+"次"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.I.id7 = player.I.id7.add(1)
            },
        },
        18: {
            cost(x) { return n(2).pow(128).times(new Decimal(2).pow(8).pow(x)) },
            title: '第八无限维度',
            display() { return "花费："+format(this.cost())+"无限点数<br>维度倍率：x"+format(tmp.I.id8mult)+"<br>当前数量："+format(player.I.id8)+"<br>已购买了"+format(getBuyableAmount(this.layer, this.id))+"次"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.I.id8 = player.I.id8.add(1)
            },
        },
        21: {
            title(){text = 'IP倍增'
                return text
            },
            cost(x) { return new Decimal(10).pow(x.add(1)) },
            effect(x) {return new Decimal(2).pow(x)},
            display() { return "每次购买使无限点数x2<br/>当前已购买了"+ getBuyableAmount('I', 21) +"次<br/>效果：无限点数获取x"+format(buyableEffect('I', 21))+'<br/>下一次花费'+format(new Decimal(10).pow(n(getBuyableAmount('I', 21)).add(1)))+'无限点数' },
            unlocked() {return hasMilestone('I', 2)},
            canAfford() { return player.I.points.gte(this.cost()) },
            buy() {
                player.I.points = player.I.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        22: {
            title(){text = '软上限削弱'
                return text
            },
            cost(x) { return new Decimal(1000).pow(x.add(1)) },
            effect(x) {return new Decimal(0.05).times(x)},
            display() { return "每次购买使四重软上限指数+0.05<br/>当前已购买了"+ getBuyableAmount('I', 22) +"/6次<br/>效果：四重软上限指数+"+format(buyableEffect('I', 22))+'<br/>下一次花费'+format(new Decimal(1000).pow(n(getBuyableAmount('I', 22)).add(1)))+'无限点数' },
            unlocked() {return hasMilestone('I', 3)},
            canAfford() { return player.I.points.gte(this.cost()) },
            purchaseLimit: n(6),
            buy() {
                player.I.points = player.I.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        23: {
            title(){text = '增加无限之力给点数乘数的指数'
                return text
            },
            cost(x) { return new Decimal(8).pow(x.add(3)) },
            effect(x) {return new Decimal(0.125).times(x)},
            display() { return "每次购买使无限之力给点数乘数的指数+0.125<br/>当前已购买了"+ getBuyableAmount('I', 23) +"/36次<br/>效果：无限之力给点数乘数的指数+"+format(buyableEffect('I', 23))+'<br/>下一次花费'+format(new Decimal(8).pow(n(getBuyableAmount('I', 23)).add(3)))+'无限点数' },
            unlocked() {return hasMilestone('I', 4)},
            canAfford() { return player.I.points.gte(this.cost()) },
            purchaseLimit: n(36),
            buy() {
                player.I.points = player.I.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        24: {
            title(){text = '指数软上限削弱'
                return text
            },
            cost(x) { return new Decimal(1e70).times(n(1e10).pow(x)) },
            effect(x) {return new Decimal(0.01).times(x)},
            display() { return "每次购买使指数软上限指数+0.01<br/>当前已购买了"+ getBuyableAmount('I', 24) +"/10次<br/>效果：指数软上限指数+"+format(buyableEffect('I', 24))+'<br/>下一次花费'+format(new Decimal(1e10).pow(n(getBuyableAmount('I', 24)).add(7)))+'无限点数' },
            unlocked() {return hasMilestone('I', 16)},
            canAfford() { return player.I.points.gte(this.cost()) },
            purchaseLimit: n(10),
            buy() {
                player.I.points = player.I.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        25: {
            title(){text = '指数二重软上限削弱'
                return text
            },
            cost(x) { return new Decimal(1e170).times(n(1e10).pow(x)) },
            effect(x) {return new Decimal(0.03).times(x)},
            display() { return "每次购买使指数二重软上限指数+0.03<br/>当前已购买了"+ getBuyableAmount('I', 25) +"/14次<br/>效果：指数二重软上限指数+"+format(buyableEffect('I', 25))+'<br/>下一次花费'+format(new Decimal(1e10).pow(n(getBuyableAmount('I', 25)).add(17)))+'无限点数' },
            unlocked() {return hasMilestone('I', 22)},
            canAfford() { return player.I.points.gte(this.cost()) },
            purchaseLimit: n(14),
            buy() {
                player.I.points = player.I.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        26: {
            title(){text = '无限点数指数增加'
                return text
            },
            cost(x) { return new Decimal(1e200).times(n(1e20).pow(x)) },
            effect(x) {return new Decimal(0.1).times(x)},
            display() { return "每次购买使无限点数指数+0.1<br/>当前已购买了"+ getBuyableAmount('I', 26) +"/6次<br/>效果：无限点数指数+"+format(buyableEffect('I', 26))+'<br/>下一次花费'+format(new Decimal(1e20).pow(n(getBuyableAmount('I', 26)).add(10)))+'无限点数' },
            unlocked() {return hasMilestone('I', 25)},
            canAfford() { return player.I.points.gte(this.cost()) },
            purchaseLimit: n(6),
            buy() {
                player.I.points = player.I.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        31: {
            title(){text = '缩短黑洞冷却'
                return text
            },
            cost(x) { a = bhcost1(x)//new Decimal(1.5e9).times(n(3.5).pow(x))
                //if (x.gte(30)) a = new Decimal(1.5e9).times(n(3.5).pow(30)).times((x.times(0.1).add(0.5)).pow(x.sub(30)))
                //if (x.gte(100)) a = new Decimal(1.5e9).times((x.times(0.2).sub(5.5)).pow(x))
                    return a
             },
            effect(x) {return new Decimal(0.8).pow(x)},
            display() { return "每次购买使黑洞冷却-20%<br/>当前已购买了"+ getBuyableAmount('I', 31) +"次<br/>效果：黑洞冷却为"+format(tmp.I.bh1duration)+'s<br/>下一次花费'+format(bhcost1(getBuyableAmount('I', 31)))+'无限点数' },
            unlocked() {return hasUpgrade('I', 11)&&!tmp.I.bh1percent.gte(0.9999)},
            canAfford() { return player.I.points.gte(this.cost()) },
            buy() {
                player.I.points = player.I.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        32: {
            title(){text = '增加黑洞强度'
                return text
            },
            cost(x) { a = bhcost2(x)//new Decimal(1.5e9).times(n(3.5).pow(x))
                //if (x.gte(30)) a = new Decimal(1.5e9).times(n(3.5).pow(30)).times((x.times(0.1).add(0.5)).pow(x.sub(30)))
                //if (x.gte(100)) a = new Decimal(1.5e9).times((x.times(0.2).sub(5.5)).pow(x))
                    return a
             },
            effect(x) {return new Decimal(1.35).pow(x)},
            display() { return "每次购买使黑洞加速+35%<br/>当前已购买了"+ getBuyableAmount('I', 32) +"次<br/>效果：黑洞使游戏速度x"+format(tmp.I.bh1speed)+'<br/>下一次花费'+format(bhcost2(getBuyableAmount('I', 32)))+'无限点数' },
            unlocked() {return hasUpgrade('I', 11)&&tmp.I.bh1speed.lt(72000)},
            canAfford() { return player.I.points.gte(this.cost()) },
            buy() {
                player.I.points = player.I.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        33: {
            title(){text = '延长黑洞时间'
                return text
            },
            cost(x) { a = bhcost3(x)//new Decimal(1.5e9).times(n(3.5).pow(x))
                //if (x.gte(30)) a = new Decimal(1.5e9).times(n(3.5).pow(30)).times((x.times(0.1).add(0.5)).pow(x.sub(30)))
                //if (x.gte(100)) a = new Decimal(1.5e9).times((x.times(0.2).sub(5.5)).pow(x))
                    return a
             },
            effect(x) {return new Decimal(1.3).pow(x)},
            display() { return "每次购买使黑洞激活时间+30%<br/>当前已购买了"+ getBuyableAmount('I', 33) +"次<br/>效果：黑洞持续时间为"+format(tmp.I.bh1acttime)+'s<br/>下一次花费'+format(bhcost3(getBuyableAmount('I', 33)))+'无限点数' },
            unlocked() {return hasUpgrade('I', 11)&&!tmp.I.bh1percent.gte(0.9999)},
            canAfford() { return player.I.points.gte(this.cost()) },
            buy() {
                player.I.points = player.I.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        41: {
            title(){text = 'a值强化'
                return text
            },
            cost(x) { a = repcost1(x)//new Decimal(1.5e9).times(n(3.5).pow(x))
                //if (x.gte(30)) a = new Decimal(1.5e9).times(n(3.5).pow(30)).times((x.times(0.1).add(0.5)).pow(x.sub(30)))
                //if (x.gte(100)) a = new Decimal(1.5e9).times((x.times(0.2).sub(5.5)).pow(x))
                    return a
             },
            effect(x) {return new Decimal(1.05).pow(x)},
            display() { return "每次购买使a值x1.05<br/>当前已购买了"+ getBuyableAmount('I', 41) +"次<br/>效果：a x"+format(buyableEffect('I', 41))+'<br/>下一次花费'+format(repcost1(getBuyableAmount('I', 41)))+'无限点数' },
            unlocked() {return hasMilestone('I', 19)},
            canAfford() { return player.I.points.gte(this.cost()) },
            buy() {
                player.I.points = player.I.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        42: {
            title(){text = 'x值强化'
                return text
            },
            cost(x) { a = repcost2(x)//new Decimal(1.5e9).times(n(3.5).pow(x))
                //if (x.gte(30)) a = new Decimal(1.5e9).times(n(3.5).pow(30)).times((x.times(0.1).add(0.5)).pow(x.sub(30)))
                //if (x.gte(100)) a = new Decimal(1.5e9).times((x.times(0.2).sub(5.5)).pow(x))
                    return a
             },
            effect(x) {return new Decimal(0.01).times(x)},
            display() { return "每次购买使x值+0.01<br/>当前已购买了"+ getBuyableAmount('I', 42) +"次<br/>效果：x +"+format(buyableEffect('I', 42))+'<br/>下一次花费'+format(repcost2(getBuyableAmount('I', 42)))+'无限点数' },
            unlocked() {return hasMilestone('I', 19)},
            canAfford() { return player.I.points.gte(this.cost()) },
            buy() {
                player.I.points = player.I.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        43: {
            title(){text = '软上限延迟'
                return text
            },
            cost(x) { a = repcost3(x)//new Decimal(1.5e9).times(n(3.5).pow(x))
                //if (x.gte(30)) a = new Decimal(1.5e9).times(n(3.5).pow(30)).times((x.times(0.1).add(0.5)).pow(x.sub(30)))
                //if (x.gte(100)) a = new Decimal(1.5e9).times((x.times(0.2).sub(5.5)).pow(x))
                    return a
             },
            effect(x) {return new Decimal(2).pow(x)},
            display() { return "每次购买使软上限起始复制器x2<br/>当前已购买了"+ getBuyableAmount('I', 43) +"次<br/>效果：x"+format(buyableEffect('I', 43))+'<br/>下一次花费'+format(repcost3(getBuyableAmount('I', 43)))+'无限点数' },
            unlocked() {return hasMilestone('I', 19)},
            canAfford() { return player.I.points.gte(this.cost()) },
            buy() {
                player.I.points = player.I.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    },
    challenges: {
        11: {
            name: "Normal Challenge 1",
            challengeDescription(){return "点数获取^0.5"},
            goalDescription(){return "1.79e308 点数"},
            rewardDescription(){return "自动购买之前层级的所有升级"},
            unlocked(){return hasAchievement('A2', 12)},
            onComplete(){
                player.I.points = player.I.points.add(1)
                player.I.inf = player.I.inf.add(1)
            },
            onEnter(){player.I.inf = player.I.inf.sub(1)},
            onExit(){player.I.inf = player.I.inf.sub(1)},
            canComplete: function() {return player.points.gte(1.79e308)},
        },
        12: {
            name: "Normal Challenge 2",
            challengeDescription(){return "所有无限前资源获取^0.9"},
            goalDescription(){return "1.79e308 点数"},
            rewardDescription(){return "自动购买之前层级的可购买，无限后保留成就"},
            unlocked(){return hasAchievement('A2', 12)},
            onComplete(){
                player.I.points = player.I.points.add(1)
                player.I.inf = player.I.inf.add(1)
            },
            onEnter(){player.I.inf = player.I.inf.sub(1)},
            onExit(){player.I.inf = player.I.inf.sub(1)},
            canComplete: function() {return player.points.gte(1.79e308)},
        },
        13: {
            name: "Normal Challenge 3",
            challengeDescription(){return "游戏速度x0.5"},
            goalDescription(){return "1.79e308 点数"},
            rewardDescription(){return "解锁黑洞，无限后保留之前主线层级的升级、挑战与里程碑"},
            unlocked(){return hasAchievement('A2', 12)},
            onComplete(){
                player.I.points = player.I.points.add(1)
                player.I.inf = player.I.inf.add(1)
            },
            onEnter(){player.I.inf = player.I.inf.sub(1)},
            onExit(){player.I.inf = player.I.inf.sub(1)},
            canComplete: function() {return player.points.gte(1.79e308)},
        },
        14: {
            name: "Normal Challenge 4",
            challengeDescription(){return "你不能获得QqQeInfinity，QqQe308的获取需求大幅上升"},
            goalDescription(){return "1.79e308 点数"},
            rewardDescription(){return "自动获取QqQe308与QqQeInfinity且不重置任何东西"},
            unlocked(){return hasAchievement('A2', 12)},
            onComplete(){
                player.I.points = player.I.points.add(1)
                player.I.inf = player.I.inf.add(1)
            },
            onEnter(){player.I.inf = player.I.inf.sub(1)},
            onExit(){player.I.inf = player.I.inf.sub(1)},
            canComplete: function() {return player.points.gte(1.79e308)},
        },
        15: {
            name: "Normal Challenge 5",
            challengeDescription(){return "所有被动生成资源的QoL均被禁用"},
            goalDescription(){return "1.79e308 点数"},
            rewardDescription(){return "所有被动生成资源且效果x10"},
            unlocked(){return hasAchievement('A2', 12)},
            onComplete(){
                player.I.points = player.I.points.add(1)
                player.I.inf = player.I.inf.add(1)
            },
            onEnter(){player.I.inf = player.I.inf.sub(1)},
            onExit(){player.I.inf = player.I.inf.sub(1)},
            canComplete: function() {return player.points.gte(1.79e308)},
        },
        16: {
            name: "Normal Challenge 6",
            challengeDescription(){return "你不能获得cokecole，二重压缩时间墙加成硬上限增加"},
            goalDescription(){return "1.79e308 点数"},
            rewardDescription(){return "自动获取cokecole且不重置任何东西，解锁第四个支线层级"},
            unlocked(){return hasAchievement('A2', 12)},
            onComplete(){
                player.I.points = player.I.points.add(1)
                player.I.inf = player.I.inf.add(1)
            },
            onEnter(){player.I.inf = player.I.inf.sub(1)},
            onExit(){player.I.inf = player.I.inf.sub(1)},
            canComplete: function() {return player.points.gte(1.79e308)},
        },
        21: {
            name: "Infinity Challenge 1",
            challengeDescription(){return "无限之力给点数乘数的指数固定为1"},
            goalDescription(){return "1e355 点数"},
            rewardDescription(){return "去除无限次数给无限维度的加成的上限"},
            unlocked(){return hasMilestone('I', 5)},
            onComplete(){
                player.I.inf = player.I.inf.add(1)
            },
            onEnter(){player.I.inf = player.I.inf.sub(1)},
            onExit(){player.I.inf = player.I.inf.sub(1)},
            canComplete: function() {return player.points.gte('1e355')},
        },
        22: {
            name: "Infinity Challenge 2",
            challengeDescription(){return "无限维度1乘数^2，但其他所有无限维度乘数为1"},
            goalDescription(){return "1e1515 点数"},
            rewardDescription(){return "解锁Monika升级"},
            unlocked(){return hasMilestone('I', 7)},
            onComplete(){
                player.I.inf = player.I.inf.add(1)
            },
            onEnter(){player.I.inf = player.I.inf.sub(1)},
            onExit(){player.I.inf = player.I.inf.sub(1)},
            canComplete: function() {return player.points.gte('1e1515')},
        },
        23: {
            name: "Infinity Challenge 3",
            challengeDescription(){return "所有无限维度乘数/1e20"},
            goalDescription(){return "1e1505 点数"},
            rewardDescription(){return "基于无限之力加成无限维度<br/>当前：×"+format(challengeEffect(this.layer,this.id))},
            rewardEffect() {eff= player.I.ipower.add(1).log(100).add(1)
                return eff
                },
            unlocked(){return hasMilestone('I', 8)},
            onComplete(){
                player.I.inf = player.I.inf.add(1)
            },
            onEnter(){player.I.inf = player.I.inf.sub(1)},
            onExit(){player.I.inf = player.I.inf.sub(1)},
            canComplete: function() {return player.points.gte('1e1505')},
        },
        24: {
            name: "Infinity Challenge 4",
            challengeDescription(){return "所有无限维度乘数x[sin(t)+1]/2，其中t为进入挑战后经过的时间"},
            goalDescription(){return "1e1990 点数"},
            rewardDescription(){return "基于二重压缩时间墙加成无限维度<br/>当前：×"+format(challengeEffect(this.layer,this.id))},
            rewardEffect() {eff= player.DC.points.add(1).pow(0.5)
                return eff
                },
            unlocked(){return hasMilestone('I', 10)},
            onComplete(){
                player.I.inf = player.I.inf.add(1)
            },
            onEnter(){player.I.inf = player.I.inf.sub(1)},
            onExit(){player.I.inf = player.I.inf.sub(1)},
            canComplete: function() {return player.points.gte('1e1990')},
        },
        25: {
            name: "Infinity Challenge 5",
            challengeDescription(){return "所有无限维度乘数/1e40，但是每208.5秒x2"},
            goalDescription(){return "1e1795 点数"},
            rewardDescription(){return "基于时间墙加成Monika点数<br/>当前：×"+format(challengeEffect(this.layer,this.id))},
            rewardEffect() {eff= player.T.points.add(10).log(10)
                return eff
                },
            unlocked(){return hasMilestone('I', 12)},
            onComplete(){
                player.I.inf = player.I.inf.add(1)
            },
            onEnter(){player.I.inf = player.I.inf.sub(1)},
            onExit(){player.I.inf = player.I.inf.sub(1)},
            canComplete: function() {return player.points.gte('1e1795')},
        },
        26: {
            name: "Infinity Challenge 6",
            challengeDescription(){return "加强四重软上限与指数软上限"},
            goalDescription(){return "1e1800 点数"},
            rewardDescription(){return "基于无限次数加成无限点数<br/>当前：×"+format(challengeEffect(this.layer,this.id))},
            rewardEffect() {eff= player.I.inf.times(0.05).add(1)
                return eff
                },
            unlocked(){return hasMilestone('I', 14)},
            onComplete(){
                player.I.inf = player.I.inf.add(1)
            },
            onEnter(){player.I.inf = player.I.inf.sub(1)},
            onExit(){player.I.inf = player.I.inf.sub(1)},
            canComplete: function() {return player.points.gte('1e1800')},
        },
        27: {
            name: "Infinity Challenge 7",
            challengeDescription(){return "黑洞被禁用，超qaqe308效果被禁用"},
            goalDescription(){return "1e5000 点数"},
            rewardDescription(){return "基于无限之力加成无限点数<br/>当前：×"+format(challengeEffect(this.layer,this.id))},
            rewardEffect() {eff= player.I.ipower.add(1).log(100).add(1)
                return eff
                },
            unlocked(){return hasMilestone('I', 15)},
            onComplete(){
                player.I.inf = player.I.inf.add(1)
            },
            onEnter(){player.I.inf = player.I.inf.sub(1)},
            onExit(){player.I.inf = player.I.inf.sub(1)},
            canComplete: function() {return player.points.gte('1e5000')},
        },
        28: {
            name: "Infinity Challenge 8",
            challengeDescription(){return "黑洞被禁用，无限维度倍率迅速衰减"},
            goalDescription(){return "1e20000 点数"},
            rewardDescription(){return "基于第一与第八维度乘数加成第2~7无限维度<br/>当前：×"+format(challengeEffect(this.layer,this.id))+'<br>并解锁一个新的界面'},
            rewardEffect() {eff= tmp.I.id1mult.times(tmp.I.id8mult).pow(0.1)
                return eff
                },
            unlocked(){return hasMilestone('I', 17)},
            onComplete(){
                player.I.inf = player.I.inf.add(1)
            },
            onEnter(){player.I.inf = player.I.inf.sub(1)},
            onExit(){player.I.inf = player.I.inf.sub(1)},
            canComplete: function() {return player.points.gte('1e20000')},
        },
    },
    upgrades: {
        11: {
            title: "解锁黑洞",
            description: "基础情况下，黑洞每3473秒激活一次，每次持续20.85秒，使游戏速度x63.65",
            cost: new Decimal(1e10),
            unlocked() {return hasChallenge('I', 13)},
        },
        21: {
            title: "打破无限！",
            description: "你的点数可以超过1.79e308，但在这之后增长更慢",
            cost: new Decimal(0),
            unlocked() {return tmp.I.NcComp.gte(6)},
        },
        31: {
            title: "BIU11",
            description: "增加无限之力给点数乘数的指数<br>^2→^2.5",
            cost: new Decimal(25),
            unlocked() {return hasUpgrade('I', 21)},
        },
        32: {
            title: "BIU12",
            description: "基于点数加成无限维度",
            effect() {
                return player.points.add(1).log(10).add(1).log(10).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(25),
            unlocked() {return hasUpgrade('I', 21)},
        },
        33: {
            title: "BIU13",
            description: "无限之力给点数乘数忽略前三重软上限",
            cost: new Decimal(50),
            unlocked() {return hasUpgrade('I', 21)},
        },
        41: {
            title: "BIU21",
            description: "解锁自动无限",
            cost: new Decimal(25),
            unlocked() {return hasUpgrade('I', 21)},
        },
        42: {
            title: "BIU22",
            description: "基于无限点数加成无限维度",
            effect() {
                return player.I.points.add(1).pow(0.33)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(100),
            unlocked() {return hasUpgrade('I', 21)},
        },
        43: {
            title: "BIU23",
            description: "基于无限次数加成第一无限维度",
            effect() {
                return player.I.inf.add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(250),
            unlocked() {return hasUpgrade('I', 21)},
        },
        51: {
            title: "BIU31",
            description: "基于QqQe308数量加成第二无限维度",
            effect() {
                return player.Q.points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(1000),
            unlocked() {return hasUpgrade('I', 21)},
        },
        52: {
            title: "BIU32",
            description: "基于超QqQe308与cokecole的次数加成无限维度",
            effect() {
                return player.Qi.QqQe308.add(1).times(player.Qi.cokecole.add(1))
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(2085),
            unlocked() {return hasUpgrade('I', 21)},
        },
        53: {
            title: "BIU33",
            description: "基于cokecole数量加成第一无限维度",
            effect() {
                return player.co.points.add(1).times(5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(10000),
            unlocked() {return hasUpgrade('I', 21)},
        },
        61: {
            title: "BIU41",
            description: "基于二级成就数量加成无限维度",
            effect() {
                return player.A2.points.add(1).pow(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(20000),
            unlocked() {return hasUpgrade('I', 21)},
        },
        62: {
            title: "BIU42",
            description: "再次基于点数加成无限维度",
            effect() {
                return player.points.add(10).log(10).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(2000000),
            unlocked() {return hasUpgrade('I', 21)},
        },
        63: {
            title: "BIU43",
            description: "解锁QqQeInfinity超qaqe308的功能",
            cost: new Decimal(5e7),
            unlocked() {return hasUpgrade('I', 21)},
        },
        71: {
            title: "解锁复制器",
            description: "如题",
            cost: new Decimal(1e140),
            unlocked() {return hasChallenge('I', 28)},
        },
    },
    milestones:{
        0: {
            requirementDescription: "1e325 点数",
            effectDescription: "最大化重置QqQe308",
            done() { return player.points.gte(n('1e325')) }
        },
        1: {
            requirementDescription: "1e330 点数",
            effectDescription: "每秒获得100%的二重压缩时间墙",
            done() { return player.points.gte(n('1e330')) }
        },
        2: {
            requirementDescription: "1e340 点数",
            effectDescription: "解锁IP倍增升级",
            done() { return player.points.gte(n('1e340')) }
        },
        3: {
            requirementDescription: "1e360 点数",
            effectDescription: "解锁软上限削弱升级",
            done() { return player.points.gte(n('1e360')) }
        },
        4: {
            requirementDescription: "1e370 点数",
            effectDescription: "解锁“无限之力给点数乘数的指数”升级",
            done() { return player.points.gte(n('1e370')) }
        },
        5: {
            requirementDescription: "1e390 点数",
            effectDescription: "解锁第一个无限挑战",
            done() { return player.points.gte(n('1e390')) }
        },
        6: {
            requirementDescription: "1e1400 点数",
            effectDescription: "无限后保留之前层级的可购买",
            done() { return player.points.gte(n('1e1400')) }
        },
        7: {
            requirementDescription: "1e1550 点数",
            effectDescription: "解锁第二个无限挑战",
            done() { return player.points.gte(n('1e1550')) }
        },
        8: {
            requirementDescription: "1e1600 点数",
            effectDescription: "解锁第三个无限挑战",
            done() { return player.points.gte(n('1e1600')) }
        },
        9: {
            requirementDescription: "1e1750 点数",
            effectDescription: "qaqe308的需求/1e110",
            done() { return player.points.gte(n('1e1750')) }
        },
        10: {
            requirementDescription: "1e1995 点数",
            effectDescription: "解锁第四个无限挑战",
            done() { return player.points.gte(n('1e1995')) }
        },
        11: {
            requirementDescription: "1e2085 点数",
            effectDescription: "Monika点数获取翻倍",
            done() { return player.points.gte(n('1e2085')) }
        },
        12: {
            requirementDescription: "1e2110 点数",
            effectDescription: "解锁第五个无限挑战",
            done() { return player.points.gte(n('1e2110')) }
        },
        13: {
            requirementDescription: "1e2200 点数",
            effectDescription: "降低qaqe308的需求",
            done() { return player.points.gte(n('1e2200')) }
        },
        14: {
            requirementDescription: "1e2400 点数",
            effectDescription: "解锁第六个无限挑战",
            done() { return player.points.gte(n('1e2400')) }
        },
        15: {
            requirementDescription: "1e11500 点数",
            effectDescription: "解锁第七个无限挑战",
            done() { return player.points.gte(n('1e11500')) }
        },
        16: {
            requirementDescription: "1e15000 点数",
            effectDescription: "解锁指数软上限削弱升级",
            done() { return player.points.gte(n('1e15000')) }
        },
        17: {
            requirementDescription: "1e20000 点数",
            effectDescription: "解锁第八个无限挑战",
            done() { return player.points.gte(n('1e20000')) }
        },
        18: {
            requirementDescription: "1e35000 点数",
            effectDescription: "最大化购买CT层的可购买",
            done() { return player.points.gte(n('1e35000')) }
        },
        19: {
            requirementDescription: "1e50000 点数",
            effectDescription: "解锁复制器相关的可购买",
            done() { return player.points.gte(n('1e50000')) }
        },
        20: {
            requirementDescription: "1e52000 点数",
            effectDescription: "指数三重软上限指数+0.05",
            done() { return player.points.gte(n('1e52000')) }
        },
        21: {
            requirementDescription: "1e56000 点数",
            effectDescription: "指数三重软上限指数+0.03",
            done() { return player.points.gte(n('1e56000')) }
        },
        22: {
            requirementDescription: "1e66686 点数",
            effectDescription() {return "基于点数增加无限点数获取指数 当前：+"+format(tmp.I.mil22effect)+"<br>并解锁一个新的可购买"},
            done() { return player.points.gte(n('1e66686')) }
        },
        23: {
            requirementDescription: "7e77777 点数",
            effectDescription() {return "获得77777倍的Monika点数与无限点数（忽略软上限与其他指数）"},
            done() { return player.points.gte(n('7e77777')) }
        },
        24: {
            requirementDescription: "1e80000 点数 & 1e185 无限点数",
            effectDescription() {return "基于点数加快QqQeInfinity超人的速度 当前：x"+format(tmp.I.mil24effect)+"<br>并解锁一个新的支线层级"},
            done() { return player.points.gte(n('1e80000'))&&player.I.points.gte(1e185) }
        },
        25: {
            requirementDescription: "1e100000 点数 & 1e195 无限点数",
            effectDescription() {return "基于二重压缩时间墙加快QqQeInfinity超人的速度 当前：x"+format(tmp.I.mil25effect)+"<br>并解锁一个新的可购买"},
            done() { return player.points.gte(n('1e100000'))&&player.I.points.gte(1e195) }
        },
        26: {
            requirementDescription: "1e150000 点数 & 1e220 无限点数",
            effectDescription() {return "指数三重软上限指数+0.02"},
            done() { return player.points.gte(n('1e150000'))&&player.I.points.gte(1e220) }
        },
    },
    clickables:{
        11: {
            title: "自动无限",
            display() {a = "当前状态："
            if (player.I.AutoInf.eq(0)) a = a + '关'
            if (player.I.AutoInf.eq(1)) a = a + '开'
            return a
            },
            canClick() {return true},
            onClick() {player.I.AutoInf = player.I.AutoInf.add(1)
                if (player.I.AutoInf.gt(1)) player.I.AutoInf = n(0)
            },
        },
        21: {
            title: "暂停黑洞",
            display() {a = "当前状态："
            if (player.I.bhpaused.eq(0)) a = a + '关'
            if (player.I.bhpaused.eq(1)) a = a + '开'
            return a
            },
            canClick() {return !inChallenge('I', 27)&&!inChallenge('I', 28)},
            onClick() {player.I.bhpaused = player.I.bhpaused.add(1)
                if (player.I.bhpaused.gt(1)) player.I.bhpaused = n(0)
            },
        },
    },
    idmult() {a = player.I.inf.div(256)
        if (a.gte(1)&&!hasChallenge('I', 21)) a = n(1)
            return a
    },
    chaltoidmult() {a = n(6).pow(n(1).div(6)).pow(tmp.I.NcComp)
        return a
    },
    ictoidmult() {a = n(2).pow(tmp.I.IcComp)
        return a
    },
    ipowerexp() {a = n(2)
        if (hasUpgrade('I', 31)) a = a.add(0.5)
        a = a.add(buyableEffect('I', 23))
        if (inChallenge('I', 21)) a = n(1)
            return a
    },
    ipowereffect() {a = player.I.ipower.pow(tmp.I.ipowerexp)
        return a
    },
    allidmult() {a = n(1)
        if (hasUpgrade('I', 32)) a = a.times(upgradeEffect('I', 32))
        if (hasUpgrade('I', 42)) a = a.times(upgradeEffect('I', 42))
        if (hasUpgrade('I', 52)) a = a.times(upgradeEffect('I', 52))
        if (hasUpgrade('I', 61)) a = a.times(upgradeEffect('I', 61))
        if (hasUpgrade('I', 62)) a = a.times(upgradeEffect('I', 62))
        if (!inChallenge('I', 27)) a = a.times(tmp.Qi.qaqe308effect)
        if (hasUpgrade('I', 71)) a = a.pow(tmp.I.repeff)
        a = a.times(tmp.qa.monikatoidmult)
        if (inChallenge('I', 23)) a = a.div(1e20)
        if (hasChallenge('I', 23)) a = a.times(challengeEffect(this.layer,23))
        if (inChallenge('I', 24)) a = a.times(n(Math.sin(player.I.resetTime)+1).times(0.5))
        if (hasChallenge('I', 24)) a = a.times(challengeEffect(this.layer,24))
        if (inChallenge('I', 25)&&n(player.I.resetTime).lte(27705)) a = a.div(1e40).times(n(2).pow(n(player.I.resetTime).div(208.5)))
        if (inChallenge('I', 28)) a = a.div(n(1e10).pow(player.I.resetTime))
        if (hasAchievement('A2', 25)) a = a.times(2)
        a = a.times(tmp.E.mil0effect4)
            return a
    },
    id1mult() {a = n(1)
        a = a.times(tmp.I.idmult)
        a = a.times(tmp.I.allidmult)
        a = a.times(tmp.I.chaltoidmult)
        a = a.times(tmp.I.ictoidmult)
        a = a.times(n(2).pow(0.125).pow(n(getBuyableAmount(this.layer, 11))))
        if (hasUpgrade('I', 43)) a = a.times(upgradeEffect('I', 43))
        if (hasUpgrade('I', 53)) a = a.times(upgradeEffect('I', 53))
        if (hasChallenge('I', 28)) a = a.times(challengeEffect('I', 28))
        if (inChallenge('I', 22)) a = a.pow(2)
        if (hasUpgrade('I', 71)) a = a.pow(tmp.I.repeff)
        return a
    },
    id2mult() {a = n(1)
        a = a.times(tmp.I.idmult)
        a = a.times(tmp.I.allidmult)
        a = a.times(tmp.I.chaltoidmult)
        a = a.times(tmp.I.ictoidmult)
        a = a.times(n(2).pow(0.125).pow(n(getBuyableAmount(this.layer, 12))))
        if (hasUpgrade('I', 51)) a = a.times(upgradeEffect('I', 51))
        if (hasChallenge('I', 28)) a = a.times(challengeEffect('I', 28))
        if (inChallenge('I', 22)) a = n(1)
        if (hasUpgrade('I', 71)) a = a.pow(tmp.I.repeff)
        return a
    },
    id3mult() {a = n(1)
        a = a.times(tmp.I.idmult)
        a = a.times(tmp.I.allidmult)
        a = a.times(tmp.I.chaltoidmult)
        a = a.times(tmp.I.ictoidmult)
        a = a.times(n(2).pow(0.125).pow(n(getBuyableAmount(this.layer, 13))))
        if (hasChallenge('I', 28)) a = a.times(challengeEffect('I', 28))
        if (inChallenge('I', 22)) a = n(1)
        if (hasUpgrade('I', 71)) a = a.pow(tmp.I.repeff)
        return a
    },
    id4mult() {a = n(1)
        a = a.times(tmp.I.idmult)
        a = a.times(tmp.I.allidmult)
        a = a.times(tmp.I.chaltoidmult)
        a = a.times(tmp.I.ictoidmult)
        a = a.times(n(2).pow(0.125).pow(n(getBuyableAmount(this.layer, 14))))
        if (hasChallenge('I', 28)) a = a.times(challengeEffect('I', 28))
        if (inChallenge('I', 22)) a = n(1)
        if (hasUpgrade('I', 71)) a = a.pow(tmp.I.repeff)
        return a
    },
    id5mult() {a = n(1)
        a = a.times(tmp.I.idmult)
        a = a.times(tmp.I.allidmult)
        a = a.times(tmp.I.chaltoidmult)
        a = a.times(tmp.I.ictoidmult)
        a = a.times(n(2).pow(0.125).pow(n(getBuyableAmount(this.layer, 15))))
        if (hasChallenge('I', 28)) a = a.times(challengeEffect('I', 28))
        if (inChallenge('I', 22)) a = n(1)
        if (hasUpgrade('I', 71)) a = a.pow(tmp.I.repeff)
        return a
    },
    id6mult() {a = n(1)
        a = a.times(tmp.I.idmult)
        a = a.times(tmp.I.allidmult)
        a = a.times(tmp.I.chaltoidmult)
        a = a.times(tmp.I.ictoidmult)
        a = a.times(n(2).pow(0.125).pow(n(getBuyableAmount(this.layer, 16))))
        if (hasChallenge('I', 28)) a = a.times(challengeEffect('I', 28))
        if (inChallenge('I', 22)) a = n(1)
        if (hasUpgrade('I', 71)) a = a.pow(tmp.I.repeff)
        return a
    },
    id7mult() {a = n(1)
        a = a.times(tmp.I.idmult)
        a = a.times(tmp.I.allidmult)
        a = a.times(tmp.I.chaltoidmult)
        a = a.times(tmp.I.ictoidmult)
        a = a.times(n(2).pow(0.125).pow(n(getBuyableAmount(this.layer, 17))))
        if (hasChallenge('I', 28)) a = a.times(challengeEffect('I', 28))
        if (inChallenge('I', 22)) a = n(1)
        if (hasUpgrade('I', 71)) a = a.pow(tmp.I.repeff)
        return a
    },
    id8mult() {a = n(1)
        a = a.times(tmp.I.idmult)
        a = a.times(tmp.I.allidmult)
        a = a.times(tmp.I.chaltoidmult)
        a = a.times(tmp.I.ictoidmult)
        a = a.times(n(2).pow(0.125).pow(n(getBuyableAmount(this.layer, 18))))
        if (inChallenge('I', 22)) a = n(1)
        if (hasUpgrade('I', 71)) a = a.pow(tmp.I.repeff)
        return a
    },
    NcComp() {a = n(0)
        if (hasChallenge('I', 11)) a = a.add(1)
            if (hasChallenge('I', 12)) a = a.add(1)
                if (hasChallenge('I', 13)) a = a.add(1)
                    if (hasChallenge('I', 14)) a = a.add(1)
                        if (hasChallenge('I', 15)) a = a.add(1)
                            if (hasChallenge('I', 16)) a = a.add(1)
            return a
    },
    IcComp() {a = n(0)
        if (hasChallenge('I', 21)) a = a.add(1)
            if (hasChallenge('I', 22)) a = a.add(1)
                if (hasChallenge('I', 23)) a = a.add(1)
                    if (hasChallenge('I', 24)) a = a.add(1)
                        if (hasChallenge('I', 25)) a = a.add(1)
                            if (hasChallenge('I', 26)) a = a.add(1)
                                if (hasChallenge('I', 27)) a = a.add(1)
                                    if (hasChallenge('I', 28)) a = a.add(1)
            return a
    },
    bh1duration() {a = n(3473)
        a = a.times(buyableEffect('I', 31))
        return a
    },
    bh1speed() {a = n(63.65)
        a = a.times(buyableEffect('I', 32))
        if (hasAchievement('I', 45)) a = a.times(1.1)
        if (a.gte(72000)) a = n(72000)
        return a
    },
    bh1acttime() {a = n(20.85)
        a = a.times(buyableEffect('I', 33))
        return a
    },
    bh1percent() {a = tmp.I.bh1acttime.div(tmp.I.bh1duration.add(tmp.I.bh1acttime))
        return a
    },
    bhshow() {a = ''
        if (hasUpgrade('I', 11)&&player.I.bh1activation.eq(0)) a = "<h3 style='color: #b67f33; text-shadow: 0 0 3px #c2b280'>黑洞当前没有激活</h3><br>黑洞每 <h3 style='color: #b67f33; text-shadow: 0 0 3px #c2b280'>"+format(tmp.I.bh1duration)+ "</h3> 秒激活一次，" + "距离黑洞激活还有 <h3 style='color: #b67f33; text-shadow: 0 0 3px #c2b280'>"+format(n(tmp.I.bh1duration).sub(player.I.bh1duration))+"</h3> 秒<br/>"
        if (hasUpgrade('I', 11)&&player.I.bh1activation.eq(1)) {a = "<h3 style='color: #b67f33; text-shadow: 0 0 3px #c2b280'>黑洞激活了！</h3><br>黑洞激活时时游戏速度 <h3 style='color: #b67f33; text-shadow: 0 0 3px #c2b280'>x"+format(tmp.I.bh1speed)+ "</h3>"
        if (tmp.I.bh1speed.eq(86400)) a = a + "（已达到硬上限）"
        if (tmp.I.bh1percent.lt(0.9999)) a = a +"<br>黑洞激活持续时长为 <h3 style='color: #b67f33; text-shadow: 0 0 3px #c2b280'>" +format(tmp.I.bh1acttime)+ "</h3> 秒，距离黑洞激活结束还有 <h3 style='color: #b67f33; text-shadow: 0 0 3px #c2b280'>"+format(n(tmp.I.bh1acttime).sub(player.I.bh1duration))+"</h3> 秒<br/>"
        }
    return a},
    repshow() {a = ''
        if (hasUpgrade('I', 71)) {a = "你的复制器数量每秒(现实时间)x <h3 style='color:rgb(0, 17, 255); text-shadow: 0 0 3px #c2b280'>"+ format(tmp.I.repmult) + "</h3>"
            a = "你有 <h3 style='color:rgb(0, 17, 255); text-shadow: 0 0 3px #c2b280'>" + format(player.I.rep) + "</h3> 个复制器，使无限维度^ <h3 style='color:rgb(0, 17, 255); text-shadow: 0 0 3px #c2b280'>"+format(tmp.I.repeff)+"</h3><br>" + a
            a = a + "<br>乘数公式：y=a<sup>x</sup>，其中a="+format(tmp.I.formulaa)+",x="+format(tmp.I.formulax)
            if (player.I.rep.gte(tmp.I.repmultsoft)) a = a + "<br>由于你的复制器数量超过了 <h3 style='color:rgb(0, 17, 255); text-shadow: 0 0 3px #c2b280'>"+format(tmp.I.repmultsoft)+"</h3> ，复制速度将变为原来的 <h3 style='color:rgb(0, 17, 255); text-shadow: 0 0 3px #c2b280'>"+format(n(tmp.I.repmultsoft).log(player.I.rep).pow(2))+"</h3> 次方！"
            if (player.I.rep.gte(1048576)) a = a + "<br>由于你的复制器数量到达了 <h3 style='color:rgb(0, 17, 255); text-shadow: 0 0 3px #c2b280'>"+format(1048576)+"</h3> ，复制器将停止增长！"
        }
        return a
        },
    formulaa() {a = n(2)
        a = a.times(buyableEffect('I', 41))
        return a
    },
    formulax() {x = n(0.01)
        x = x.add(buyableEffect('I', 42))
        x = x.times(tmp.E.mil0effect6)
        return x
            },
    repmultsoft() {s = n(5)
        s= s.times(buyableEffect('I', 43))
        return s
    },
    repmult() {y = n(tmp.I.formulaa).pow(tmp.I.formulax)
        if (player.I.rep.gte(tmp.I.repmultsoft)) y = y.pow(n(tmp.I.repmultsoft).log(player.I.rep).pow(2))
        return y
    },
    repeff() {a = player.I.rep.add(9).log(10).log(10).add(1)
        return a
    },
    mil22effect() {a = player.points.add(9).log(10).log(10).times(0.05)
        return a
    },
    mil24effect() {a = player.points.add(10).log(10).pow(0.75)
        return a
    },
    mil25effect() {a = player.DC.points.add(10).log(10)
        return a
    },
})

addLayer("qa", {
    name: "qaqe308", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Qa", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        monika: n(0)
    }},
    color: "#ab4308",
    requires(){a = new Decimal('1e919')
        if (hasMilestone('I', 9)) a = a.div(1e110)
        return a
    }, // Can be a function that takes requirement increases into account
    resource: "qaqe308", // Name of prestige currency
    baseResource: "点数", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (hasMilestone('I', 13)) exp = exp.add(1)
        return exp
    },
    directmult() {mult = n(1)
        mult = mult.times(tmp.E.mil0effect5)
        return mult
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: 进行qaqe308重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasChallenge('I', 16)},
    branches: ['I'],
    microtabs: {
        stuff: {       
            "Milestones": {
                unlocked() {return true},
                content: [ "milestones"]}, 
            "Monika": {
                unlocked() {return hasMilestone('qa', 0)},
                content: [["display-text", () => tmp.qa.Showdetail
                    ],
                "buyables"]},
        },
        },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > layers[this.layer].row) {
            let kept = []
            layerDataReset(this.layer, kept)
               }
    },
    update(diff){
        player.qa.monika = player.qa.monika.add(tmp.qa.effect2.times(diff))
    },
    autoPrestige() {a = false
        return a
    },
    resetsNothing() {return false},
    passiveGeneration()
    {
        mult = 0
        return mult
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
    milestones: {
        0: {
            requirementDescription: "1 qaqe308",
            effectDescription: "解锁Monika",
            done() { return player.qa.points.gte(1) }
        },
        1: {
            requirementDescription: "6 qaqe308",
            effectDescription: "qaqe308加成无限点数获取",
            done() { return player.qa.points.gte(6) }
        },
        2: {
            requirementDescription: "11 qaqe308",
            effectDescription: "qaqe308进一步加成无限点数获取",
            done() { return player.qa.points.gte(11) }
        },
        3: {
            requirementDescription: "14 qaqe308",
            effectDescription: "qaqe308更进一步加成无限点数获取",
            done() { return player.qa.points.gte(14) }
        },
    },
    buyables: {
        rows: 4,
		cols: 4,
        11: {
            title:'点数加成',
            cost(x) { return new Decimal(1e3).pow(x.add(1)) },
            effect(x) {return new Decimal(1e100).pow(x)},
            display() { return "每次购买使点数x1e100<br/>当前已购买了"+ getBuyableAmount('qa', 11) +"次<br/>效果：点数获取x"+format(buyableEffect('qa', 11))+'<br/>下一次花费 '+format(new Decimal(1e3).pow(n(getBuyableAmount('qa', 11)).add(1)))+' Monika点数' },
            unlocked() {return hasChallenge('I', 22)},
            canAfford() { return player.qa.monika.gte(this.cost()) },
            buy() {
                player.qa.monika = player.qa.monika.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        12: {
            title:'公式改进',
            cost(x) { return new Decimal(1e4).pow(x.add(1)) },
            effect(x) {return new Decimal(1).pow(x)},
            display() { return "每次购买使Monika点数给无限维度的加成公式中的底数-1<br/>当前已购买了"+ getBuyableAmount('qa', 12) +"/8次<br/>效果：底数-"+format(buyableEffect('qa', 12))+'<br/>下一次花费 '+format(new Decimal(1e4).pow(n(getBuyableAmount('qa', 12)).add(1)))+' Monika点数' },
            unlocked() {return hasChallenge('I', 22)},
            canAfford() { return player.qa.monika.gte(this.cost()) },
            purchaseLimit:n(8),
            buy() {
                player.qa.monika = player.qa.monika.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        13: {
            title:'Monika点数加成',
            cost(x) { return new Decimal(1e4).pow(x.add(1)) },
            effect(x) {return new Decimal(5).pow(x)},
            display() { return "每次购买使Monika点数x5<br/>当前已购买了"+ getBuyableAmount('qa', 13) +"次<br/>效果：Monika点数获取x"+format(buyableEffect('qa', 13))+'<br/>下一次花费 '+format(new Decimal(1e4).pow(n(getBuyableAmount('qa', 13)).add(1)))+' Monika点数' },
            unlocked() {return hasChallenge('I', 22)},
            canAfford() { return player.qa.monika.gte(this.cost()) },
            buy() {
                player.qa.monika = player.qa.monika.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        14: {
            title:'无限点数加成',
            cost(x) { return new Decimal(1e5).pow(x.add(1)) },
            effect(x) {return new Decimal(2).pow(x)},
            display() { return "每次购买使无限点数x2<br/>当前已购买了"+ getBuyableAmount('qa', 14) +"次<br/>效果：无限点数获取x"+format(buyableEffect('qa', 14))+'<br/>下一次花费 '+format(new Decimal(1e5).pow(n(getBuyableAmount('qa', 14)).add(1)))+' Monika点数' },
            unlocked() {return hasChallenge('I', 22)},
            canAfford() { return player.qa.monika.gte(this.cost()) },
            buy() {
                player.qa.monika = player.qa.monika.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    },
    Showdetail() {
        a = "你有 <h3 style='color: #ab4308; text-shadow: 0 0 3px #c2b280'>" + format(player.qa.monika) + "</h3> Monika点数，使你的无限维度<h3 style='color: #ab4308; text-shadow: 0 0 3px #c2b280'> x" +format(tmp.qa.monikatoidmult)+ "</h3>."
        a = a + "<br/>你有 <h3 style='color:#ab4308; text-shadow: 0 0 3px #c2b280'>" + format(player.qa.points) + "</h3> qaqe308, 每秒生产 <h3 style='color: #ab4308; text-shadow: 0 0 3px #c2b280'> " +format(tmp.qa.effect2)+ "</h3> Monika点数."
        return a
    },
    effect2() {a = player.qa.points.pow(2)
        a = a.times(buyableEffect('qa', 13))
        if (hasMilestone('I', 11)) a = a.times(2)
        if (hasChallenge('I', 25)) a = a.times(challengeEffect('I', 25))
        if (hasMilestone('I', 23)) a = a.times(77777)
        return a
    },
    monikatoidmult() {a = player.qa.monika.add(1).log(n(10).sub(buyableEffect('qa', 12))).add(1)
        return a
    },
    effect(){
        a = n(2).pow(player.qa.points)
        if (hasMilestone('qa', 2)) a = n(3).pow(player.qa.points)
            if (hasMilestone('qa', 3)) a = n(1e10).pow(player.qa.points)
            return a
      },
      effectDescription() { 
        if (hasMilestone('qa', 1)) {
            a = "使无限点数获取x"+format(tmp.qa.effect)
        } else {
            a = "使无限点数获取x1.00"
        }
        return a
    },
})

addLayer("rg", {
    name: "ReplicantiGalaxy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RG", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        monika: n(0)
    }},
    color: "#998e15",
    requires(){a = new Decimal('1e190')
        return a
    }, // Can be a function that takes requirement increases into account
    resource: "ReplicantiGalaxy", // Name of prestige currency
    baseResource: "无限点数", // Name of resource prestige is based on
    baseAmount() {return player.I.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.1, // Prestige currency exponent
    base: n(1e100),
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: 获得ReplicantiGalaxy", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasMilestone('I', 24)},
    branches: ['I'],
    //microtabs: {

      //  },
    doReset(resettingLayer) {        
        if (layers[resettingLayer].row > layers[this.layer].row) {
        let kept = []
        layerDataReset(this.layer, kept)
           }
    },
    update(diff){

    },
    autoPrestige() {a = false
        return a
    },
    resetsNothing() {return true},
    passiveGeneration()
    {
        mult = 0
        return mult
    },
    //tabFormat: [
    //    "main-display",
    //    "prestige-button",
    //    ["microtabs", "stuff"],
    //    ["blank", "25px"],
    //],
    milestones: {
        0: {
            requirementDescription: "1 ReplicantiGalaxy",
            effectDescription: "无限重置后保留部分复制器",
            done() { return player.rg.points.gte(1) }
        },

    },
    buyables: {

    },
    effect(){
        a = n(1e3).pow(player.rg.points)
            return a
      },
      effectDescription() { 
        if (hasMilestone('rg', 0)) {
            a = "使无限后保留"+format(tmp.rg.effect)+"个复制器"
        } else {
            a = "使无限后保留1个复制器"
        }
        return a
    },
})

addLayer("E", {
    name: "Eternity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Et", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        etr: n(0),
        td1: n(0),
        td2: n(0),
        td3: n(0),
        td4: n(0),
        td5: n(0),
        td6: n(0),
        td7: n(0),
        td8: n(0),
    }},
    color: "#b743de",
    requires(){a = new Decimal(2).pow(1024)
        return a
    }, // Can be a function that takes requirement increases into account
    resource: "永恒点数", // Name of prestige currency
    baseResource: "无限点数", // Name of resource prestige is based on
    baseAmount() {return player.I.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0043, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "E: 进行永恒", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasAchievement('A2', 75)||hasAchievement('A3', 11)},
    branches: ['I'],
    microtabs: {
        stuff: {       
        "Milestone": {
            unlocked() {return true},
            content: ["milestones"]},
        }
      },
    doReset(resettingLayer) {
        if(resettingLayer == 'E') player.E.etr = player.E.etr.add(1)
    },
    update(diff){

    },
    passiveGeneration()
    {
        mult = 0
        return mult
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
    milestones:{
        0: {
            requirementDescription: "1次永恒",
            effectDescription() {return "基于永恒次数对永恒前资源给予各种加成 当前：<br>无限前所有主线资源获取x"+format(tmp.E.mil0effect1)+" 所有支线资源获取x"+format(tmp.E.mil0effect2)+"<br>无限点数获取x"+format(tmp.E.mil0effect3)+" 无限维度倍率x"+format(tmp.E.mil0effect4)+"<br>qaqe308获取x"+format(tmp.E.mil0effect5)+" 复制器速度公式中x值x"+format(tmp.E.mil0effect6)+"<br>你当前的永恒次数："+format(player.E.etr)},
            done() { return player.E.etr.gte(1) }
        },
        1: {
            requirementDescription: "2次永恒",
            effectDescription() {return "解锁升级树，解锁自动IP倍增购买器"},
            done() { return player.E.etr.gte(2) }
        },
    },
    mil0effect1() {a = player.E.etr.add(1).pow(3)
        return a
    },//pre-inf mainline
    mil0effect2() {a = player.E.etr.add(1).pow(1.5)
        return a
    },//pre-inf side-story
    mil0effect3() {a = player.E.etr.add(1)
        return a
    },//IP mult
    mil0effect4() {a = n(5).pow(player.E.etr)
        return a
    },//ID mult
    mil0effect5() {a = player.E.etr.add(1).log(2).add(1)
        return a
    },//qaqe308
    mil0effect6() {a = player.E.etr.add(1).log(2).times(0.01).add(1)
        return a
    },//rep x(add)
})