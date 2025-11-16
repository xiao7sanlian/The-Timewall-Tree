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
        if (hasUpgrade('I', 11)&&player.I.bh1activation.eq(1)&&player.I.bhpaused.neq(1)) dev=dev.times(tmp.I.bh1speed)
        dev = dev.times(tmp.E.TSeffect)
        if (hasAchievement('A3', 25)) dev = dev.times(2)
        if (gcs('E',93)==1) dev = dev.times(ce('E', 93))
        dev = dev.div(n(10).pow(player.E.slowtime))
	    if (isEndgame()||player.T.pause.eq(1)) dev=n(0)
	    return dev
	   },
       doReset(resettingLayer) {
        if ((resettingLayer == 'I'&&!hasChallenge('I', 12))||(resettingLayer == 'E'&&!hasMilestone('E', 2))) {
            let kept = []
            if(!hasMilestone('E', 3)) layerDataReset(this.layer, kept)
        }
    },
    row: 'side', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.bx.points.lt(1)},
    deactivated(){return player.bx.points.gte(1)},
    achievementPopups() {return player.bx.points.lt(1)},
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
    layerShown(){return (hasAchievement('A2', 11)||hasAchievement('A3', 11))&&player.bx.points.lt(1)},
    deactivated(){return player.bx.points.gte(1)},
    doReset(resettingLayer) {
        if (resettingLayer == 'E') {
            let kept = []
            if (hasMilestone('E', 12)) kept.push('achievements')
            if(!hasMilestone('E', 12)) layerDataReset(this.layer, kept)
        }
    },
    achievementPopups() {return player.bx.points.lt(1)},
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
            tooltip: "获得1e200000点数<br>奖励：削弱点数获取量指数的指数的软上限指数", 
            textStyle: {'color': '#4bd123'},
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
    layerShown(){return hasAchievement('A3', 11)&&player.bx.points.lt(1)},
    deactivated(){return player.bx.points.gte(1)},
    achievementPopups() {return player.bx.points.lt(1)},
    achievements: {
        11: {
     name: "Time is relative",
     done() {return player.E.etr.gte(1)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "永恒一次<br>每行的第六个成就是隐藏成就，尝试去完成吧！", 
     textStyle: {'color': '#ffe125'},
        },
    12: {
     name: "Double Eternity",
     done() {return player.E.etr.gte(2)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "永恒2次", 
     textStyle: {'color': '#ffe125'},
        },
    13: {
     name: "Triple Eternity",
     done() {return player.E.etr.gte(3)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "永恒3次", 
     textStyle: {'color': '#ffe125'},
        },
    14: {
     name: "Quadraeternal",
     done() {return player.E.etr.gte(4)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "永恒4次", 
     textStyle: {'color': '#ffe125'},
        },
    15: {
     name: "Five eternity",
     done() {return player.E.etr.gte(5)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "永恒5次<br>奖励：获得一个升级点数（每个完成的绿名三级成就都会额外奖励一个升级点数）", 
     textStyle: {'color': '#4bd123'},
        },
    26: {
     name: "This isn't Cookie Clicker",
     done() {return player.E.clicktime.gte(308)}, 
     //unlocked() {return hasAchievement('A3', 26)},
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip() {a = "点击'永恒后刷新提示开关'按钮308次"
        if (!hasAchievement('A3', 26)) a = 'Tip:游戏里有一个显眼的按钮……'
        return a
     }, 
     textStyle: {'color': '#ffffffff'},
        },
    21: {
     name: "请停止抄袭旋转放置",
     done() {return player.E.slowtime.gt(0)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "进行一次Slowdown", 
     textStyle: {'color': '#ffe125'},
        },
    22: {
     name: "ID Free",
     done() {return player.E.etr.gte(7)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "获得7次永恒的里程碑", 
     textStyle: {'color': '#ffe125'},
        },
    23: {
     name: "全套自动化！",
     done() {return player.E.etr.gte(8)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "获得8次永恒的里程碑", 
     textStyle: {'color': '#ffe125'},
        },
    24: {
     name: "qaqe308的反击",
     done() {return player.E.etr.gte(9)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "获得9次永恒的里程碑<br>获得此成就时，二级成就“这个成就是用来凑数的”的奖励效果被禁用<br>作为补偿，你将额外获得2个升级点数", 
     textStyle: {'color': '#ab4308'},
        },
    25: {
     name: "游戏速度大神啊",
     done() {return player.devSpeed.gte(1e6)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "游戏速度到达1000000<br>奖励：游戏速度x2", 
     textStyle: {'color': '#4bd123'},
        },
    16: {
     name: "Don't miss the Black Hole!",
     done() {return hasMilestone('Qi', 100)&&!hasUpgrade('I', 11)}, 
     //unlocked() {return hasAchievement('A3', 16)},
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip() {a = "在解锁黑洞前超市QqQe308"
        if (!hasAchievement('A3', 16)) a = "Tip:你可能错过了一些东西……"
        return a
     }, 
     textStyle: {'color': '#ffffffff'},
        },
    31: {
     name: "Trillion QqQe308",
     done() {return player.Q.points.gte(1e12)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "获得1e12个QqQe308", 
     textStyle: {'color': '#ffe125'},
        },
    32: {
     name: "Eternity Breakdown",
     done() {return player.E.etr.gte(16)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "打破永恒<br>由于IP增益太过逆天了，这个树将不会再有EP增益了", 
     textStyle: {'color': '#ffe125'},
        },
    33: {
     name: "年度IP",
     done() {return player.I.points.gte('1e365')}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "获得1e365无限点数", 
     textStyle: {'color': '#ffe125'},
        },
    34: {
     name: "墙的不能再墙了",
     done() {return player.Qi.rg.gte(1)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "超一次ReplicantiGalaxy<br>在15三级成就时，解锁新的支线层级", 
     textStyle: {'color': '#ffe125'},
        },
    35: {
     name: "Distorted Fate",
     done() {return player.df.points.gte(1)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "获得一个DeFe308<br>奖励：永恒重置时保留QqQeInfinity层级内容", 
     textStyle: {'color': '#4bd123'},
        },
    36: {
     name: "Happy Year 3473!",
     done() {return n(player.timePlayed).gte(45664128000)}, 
     //unlocked() {return hasAchievement('A3', 16)},
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip() {a = "游戏时间达到1448年"
        if (!hasAchievement('A3', 36)) a = "Tip:3473-2025=?"
        return a
     }, 
     textStyle: {'color': '#ffffffff'},
        },
    41: {
     name: "一箭双雕 IV",
     done() {return player.I.points.gte('1.83e378')}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "获得1.83e378无限点数（允许你一次获得2个永恒点数）", 
     textStyle: {'color': '#ffe125'},
        },
    42: {
     name: "DeFe616",
     done() {return player.df.points.gte(2)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "获得2个DeFe308", 
     textStyle: {'color': '#ffe125'},
        },
    43: {
     name: "三星",
     done() {return player.rg.points.gte(3)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "获得3个ReplicantiGalaxy", 
     textStyle: {'color': '#ffe125'},
        },
    44: {
     name: "一键三连",
     done() {return player.I.points.gte('1.63e419')}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "获得1.63e419无限点数（允许你一次获得3个永恒点数）", 
     textStyle: {'color': '#ffe125'},
        },
    45: {
     name: "DeFe924",
     done() {return player.df.points.gte(3)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "获得3个DeFe308<br>奖励：无限次数获取x2", 
     textStyle: {'color': '#4bd123'},
        },
    46: {
     name: "Maybe you need to refresh",
     done() {return player.I.points.gte(n(2).pow(1024))&&tmp.I.id1mult.eq(0)}, 
     //unlocked() {return hasAchievement('A3', 16)},
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip() {a = "在无限维度倍率为0的情况下达到1.79e308无限点数<br>奖励：移除不可抗力因素"
        if (!hasAchievement('A3', 46)) a = "Tip:你完全不刷新的是吗？"
        return a
     }, 
     textStyle: {'color': '#ffffffff'},
        },
    51: {
     name: "Quadra Eternity",
     done() {return player.I.points.gte('1.86e448')}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "获得1.86e448无限点数（允许你一次获得4个永恒点数）", 
     textStyle: {'color': '#ffe125'},
        },
    52: {
     name: "永恒挑战者",
     done() {return gcs('E', 111)==1}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "解锁永恒挑战", 
     textStyle: {'color': '#ffe125'},
        },
    53: {
     name: "First EC complete!",
     done() {return n(challengeCompletions('E',11)).gte(1)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "完成一个永恒挑战<br>完成一个永恒挑战后，解锁永恒挑战里程碑", 
     textStyle: {'color': '#ffe125'},
        },
    54: {
     name: "DESTRUCTION 3,2,1",
     done() {return player.points.gte('1e321321')}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "获得1e321321点数", 
     textStyle: {'color': '#ffe125'},
        },
    55: {
     name: "Five in One",
     done() {return player.I.points.gte('6.40e470')}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip() {return "获得6.40e470无限点数（允许你一次获得5个永恒点数）<br>奖励：基于ReplicantiGalaxy增加无限点数directMult<br>当前：x"+format(achievementEffect('A3',55))}, 
     effect(){
                return player.rg.points.add(1).pow(10)//6EP:1.66e489IP 7EP:6.15e504IP 8EP:1.89e518IP 9EP:1.48E530IP 10EP:6.50e540IP
            },
     textStyle: {'color': '#4bd123'},
        },
    56: {
     name: "多此一举",
     done() {return inChallenge('E',12)&&(inChallenge('I',21)||inChallenge('I',22)||inChallenge('I',23)||inChallenge('I',24)||inChallenge('I',25)||inChallenge('I',26)||inChallenge('I',27))}, 
     //unlocked() {return hasAchievement('A3', 16)},
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip() {a = "在永恒挑战2内进入无限挑战1~7中的任意一个"
        if (!hasAchievement('A3', 56)) a = "Tip:Eternity Challenge 2"
        return a
     }, 
     textStyle: {'color': '#ffffffff'},
        },
    61: {
     name: "DeFe1232",
     done() {return player.df.points.gte(4)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "获得4个DeFe308", 
     textStyle: {'color': '#ffe125'},
        },
    62: {
     name: "第二个EC不一定是EC2",
     done() {return tmp.E.EcComp.gte(2)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "完成第二个永恒挑战", 
     textStyle: {'color': '#ffe125'},
        },
    63: {
     name: "Ten in one",
     done() {return player.I.points.gte('6.50e540')}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "获得6.50e540无限点数（允许你一次获得10个永恒点数）", 
     textStyle: {'color': '#ffe125'},
        },
    64: {
     name: "Double EC1",
     done() {return n(challengeCompletions('E',11)).gte(2)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "完成两次永恒挑战1", 
     textStyle: {'color': '#ffe125'},
        },
    65: {
     name: "移除削弱 II",
     done() {return player.E.etr.gte(256)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "永恒256次<br>奖励：更改基于永恒次数加成时间维度的公式，永恒重置时保留qaqe308与ReplicantiGalaxy相关的里程碑", 
     textStyle: {'color': '#4bd123'},
        },
    66: {
     name: "You have already failed.",
     done() {return inChallenge('E',14)&&player.I.inf.gt(tmp.E.ec4effect.add(256))}, 
     //unlocked() {return hasAchievement('A3', 16)},
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip() {a = "在永恒挑战4中使无限次数超过限制"
        if (!hasAchievement('A3', 66)) a = "Tip:Eternity Challenge 4"
        return a
     }, 
     textStyle: {'color': '#ffffffff'},
        },
    71: {
     name: "616.sb",
     done() {return player.I.points.gte('6.16e616')}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "获得6.16e616无限点数", 
     textStyle: {'color': '#ffe125'},
        },
    72: {
     name: "DeFe1540",
     done() {return player.df.points.gte(5)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "获得5个DeFe308", 
     textStyle: {'color': '#ffe125'},
        },
    73: {
     name: "DeFe1848",
     done() {return player.df.points.gte(6)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "获得6个DeFe308", 
     textStyle: {'color': '#ffe125'},
        },
    74: {
     name: "你该点升级树了",
     done() {return player.I.points.gte('1e500')&&player.E.upcost.eq(1)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "不购买升级树除11外的任何升级获得1e500IP", 
     textStyle: {'color': '#ffe125'},
        },
    75: {
     name: "超群里所有人",
     done() {return hasMilestone('E',102)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "完成10个永恒挑战<br>奖励：无限点数gainExp+0.1", 
     textStyle: {'color': '#4bd123'},
        },
    76: {
     name: "Breaking without breaking",
     done() {return player.I.points.gte(n(2).pow(1024))&&!hasUpgrade('I',21)}, 
     //unlocked() {return hasAchievement('A3', 16)},
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip() {a = "不打破无限达到1.79e308无限点数<br>奖励：解锁一个可点击，可加速复制器增长，冷却600秒"
        if (!hasAchievement('A3', 76)) a = "Tip:You have 1.79e308 points(Hardcapped)"
        return a
     }, 
     textStyle: {'color': '#ffffffff'},
        },
    81: {
     name: "DeFe2464",
     done() {return player.df.points.gte(8)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "获得8个DeFe308", 
     textStyle: {'color': '#ffe125'},
        },
    82: {
     name: "无限点数太膨胀了",
     done() {return player.I.points.gte('1e1000')}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "获得1e1000无限点数", 
     textStyle: {'color': '#ffe125'},
        },
    83: {
     name: "游戏速度太膨胀了",
     done() {return player.devSpeed.gte('1e9')}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "游戏速度达到1e9", 
     textStyle: {'color': '#ffe125'},
        },
    84: {
     name: "Replicanti exponent is good",
     done() {return tmp.I.formulax.gte(1)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "使复制器复制乘数公式中的x达到1", 
     textStyle: {'color': '#ffe125'},
        },
    85: {
     name: "点数太膨胀了",
     done() {return player.points.gte('1e1000000')}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "达到e1000000点数<br>奖励：点数获取指数+0.05", 
     textStyle: {'color': '#4bd123'},
        },
    86: {
     name: "坚持不懈",
     done() {return player.I.skillusetime.gte(tmp.I.skillcap)}, 
     //unlocked() {return hasAchievement('A3', 16)},
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip() {a = "在一次永恒中耗尽技能“加速复制器”的次数"
        if (!hasAchievement('A3', 86)) a = "Tip:与上面的成就的奖励有关"
        return a
     }, 
     textStyle: {'color': '#ffffffff'},
        },
    91: {
     name: "DeFe3080",
     done() {return player.df.points.gte(10)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "获得10个DeFe308", 
     textStyle: {'color': '#ffe125'},
        },
    92: {
     name: "复制器太膨胀了",
     done() {return player.I.rep.gte('1e1000')}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "达到e1000复制器", 
     textStyle: {'color': '#ffe125'},
        },
    93: {
     name: "TECHNOPOLIS 2085 II",
     done() {return player.I.points.gte('1e2085')}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "获得1e2085无限点数", 
     textStyle: {'color': '#ffe125'},
        },
    94: {
     name: "永恒点数太不膨胀了",
     done() {return player.E.points.gte('1e8')}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "获得1e8永恒点数", 
     textStyle: {'color': '#ffe125'},
        },
    95: {
     name: "无限维度太膨胀了",
     done() {return tmp.I.ipowereffect.gte('e1e9')}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "使无限之力的效果达到e1e9<br>奖励：'无限之力给点数乘数的指数'可购买可无限购买，但是价格大幅增长", 
     textStyle: {'color': '#4bd123'},
        },
    96: {
     name: "更加坚持不懈",
     done() {return player.I.rep.gte(tmp.I.rephardcap)&&tmp.I.rephardcap.gte('1e2000')}, 
     //unlocked() {return hasAchievement('A3', 16)},
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip() {a = "使复制器达到上限，且大于1e2000"
        if (!hasAchievement('A3', 96)) a = "Tip:你有a/a复制器"
        return a
     }, 
     textStyle: {'color': '#ffffffff'},
        },
    101: {
     name: "DeFe4620",
     done() {return player.df.points.gte(15)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "获得15个DeFe308", 
     textStyle: {'color': '#ffe125'},
        },
    102: {
     name: "时间维度太膨胀了",
     done() {return player.E.timeshard.gte('1.79e308')}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "获得1.79e308时间碎片", 
     textStyle: {'color': '#ffe125'},
        },
    103: {
     name: "40% Complete",
     done() {return tmp.E.EcComp.gte(24)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "完成24个永恒挑战", 
     textStyle: {'color': '#ffe125'},
        },
    104: {
     name: "cokecole太膨胀了",
     done() {return player.co.points.gte(5e8)}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "获得5e8个cokecole", 
     textStyle: {'color': '#ffe125'},
        },
    105: {
     name: "最后的膨胀",
     done() {return player.points.gte('e1.79e308')}, 
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip: "达到e1.79e308点数<br>奖励：解锁下一个层级", 
     textStyle: {'color': '#4bd123'},
        },
    106: {
     name: "成就太膨胀了",
     done() {return player.A3.points.gte(59)}, 
     //unlocked() {return hasAchievement('A3', 16)},
     onComplete() {player.A3.points = player.A3.points.add(1)},
     tooltip() {a = "获得59个成就"
        if (!hasAchievement('A3', 106)) a = "Tip:无"
        return a
     }, 
     textStyle: {'color': '#ffffffff'},
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
        if(inChallenge('E',21)) mult = n(0)
            if(player.bx.points.gte(1)) mult=n(0)
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
    layerShown(){return player.bx.points.lt(1)},
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
    if (hasMilestone('E',101)) kept.push("challenges")
    layerDataReset(this.layer, kept)
if(resettingLayer == 'bx') layerDataReset(this.layer,[])
       }
    },
    update(diff){
        if ((hasUpgrade('CT',51)||hasChallenge('I', 12))&&layers.T.buyables[11].canAfford()&&n(getBuyableAmount('T', 11)).lt(500)) layers.T.buyables[11].buy();
        if (gcs('E', 71)==1) setBuyableAmount(this.layer, 11, max(player.points,n(0.001)).log(10).add(3))
        player.devSpeed = tmp.A.devSpeedCal
        player.points=player.points.min('e1.79e308')
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
    deactivated(){return player.bx.points.gte(1)},
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
            purchaseLimit() {a = n(500)
                if (gcs('E', 71)==1) a = n(1.79e309)
                    return a
            },
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
        12: {
            title: "清空时间墙",
            display() {return "清空你的时间墙"},
            canClick() {return true},
            onClick() {player.T.points = n(0)
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
        if(player.bx.points.gte(1)) a=n(2e308)
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
        if (inChallenge('E',22)) exp = exp.div(10)
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
    layerShown(){return hasAchievement('A', 41)&&player.bx.points.lt(1)},
    branches: ['T'],
    doReset(resettingLayer) {
        if (resettingLayer == 'I'&&!hasAchievement('A2', 15)||resettingLayer == 'E') {
            let kept = []
            if (hasMilestone('E',101)) kept.push("milestones")
            layerDataReset(this.layer, kept)
        if(resettingLayer == 'bx') layerDataReset(this.layer,[])
        }
    },
    passiveGeneration()
    {
        mult = 0
        return mult
    },
    deactivated(){return player.bx.points.gte(1)},
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
            if(player.bx.points.gte(1)) a=n(2e308)
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
    if(inChallenge('E',21)) mult = n(0)
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
    layerShown(){return hasAchievement('A', 32)&&player.bx.points.lt(1)},
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
    if (hasMilestone('E',101)) kept.push("challenges")
    layerDataReset(this.layer, kept)
if(resettingLayer == 'bx') layerDataReset(this.layer,[])
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
        "resource-display",
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
    deactivated(){return player.bx.points.gte(1)},
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
        rg: n(0),
        Supermantime: new Decimal(0),
        Supermantime2: new Decimal(0),
        Superqaqe308time: n(0),
        Superrgtime: n(0),
        choice: new Decimal(1),
    }},
    color: "#aee308",
    requires() {a = new Decimal(10)
        if (player.Qi.points.gte(2)) a = a.times(player.Qi.points)
            if (player.Qi.points.gte(160)) a = a.times(n(2).pow(player.Qi.points.sub(159)))
            if (inChallenge('I', 14)) a = n(1.79e309)
                if(player.bx.points.gte(1)) a=n(2e308)
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
    layerShown(){return hasMilestone('Q', 6)&&player.bx.points.lt(1)},
    doReset(resettingLayer) {
        if (resettingLayer == 'I'&&!hasAchievement('A2', 15)||(resettingLayer == 'E'&&!hasAchievement('A3', 35))) {
            let kept = []
            layerDataReset(this.layer, kept)
            if(resettingLayer == 'bx') layerDataReset(this.layer,[])
        }
    if(resettingLayer == 'bx') layerDataReset(this.layer,[])
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
            if (hasMilestone('Qi', 0)&&(player.Qi.choice.eq(n(2))||(hasMilestone('E',102)&&player.Qi.choice.neq(1)))&&!isEndgame()) player.Qi.QqQe308 = player.Qi.QqQe308.add(min(n(diff).div(tmp.Qi.Supermanspeed),n(500)));
            if (hasMilestone('Qi', 1)&&(player.Qi.choice.eq(n(3))||(hasMilestone('E',102)&&player.Qi.choice.neq(1)))&&!isEndgame()) player.Qi.cokecole = player.Qi.cokecole.add(min(n(diff).div(tmp.Qi.Supermanspeed2),n(500)));
            if (hasUpgrade('I', 63)&&(player.Qi.choice.eq(n(4))||(hasMilestone('E',102)&&player.Qi.choice.neq(1)))&&!isEndgame()) player.Qi.qaqe308 = player.Qi.qaqe308.add(min(n(diff).div(tmp.Qi.Superqaqe308speed),n(500)));
            if (hasMilestone('E', 17)&&(player.Qi.choice.eq(n(5))||(hasMilestone('E',102)&&player.Qi.choice.neq(1)))&&!isEndgame()) player.Qi.rg = player.Qi.rg.add(min(n(diff).div(tmp.Qi.Superrgspeed),n(500)));
        }

    },
    passiveGeneration()
    {
        mult = 0
        return mult
    },
    deactivated(){return player.bx.points.gte(1)},
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
                unlocked() {return hasAchievement('A2', 35)},
                content: [ ["milestones",[100,101,102,103]]]}, 
        },
        },
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
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
        103: {
            requirementDescription: "超市ReplicantiGalaxy（需要超10000次）",
            effectDescription: "超ReplicantiGalaxy次数也给予你额外的升级点数，并加快复制器复制速度<br>在超10000次ReplicantiGalaxy后，超ReplicantiGalaxy的速度将减慢！",
            done() { return player.Qi.rg.gte(10000) }
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
        15: {
            title: "超ReplicantiGalaxy",
            display() {return "点击以选择超ReplicantiGalaxy"},
            unlocked() {return hasMilestone('E', 17)},
            canClick() {return hasMilestone('E', 17)&&hasAchievement('A2', 35)},
            onClick() {player.Qi.choice = n(5)},
        },
        
    },
    QqQe308effect() {
        a = n(player.Qi.QqQe308).add(1)
        if (hasMilestone('Qi', 100)) a = n(2).pow(player.Qi.QqQe308)
            if (inChallenge('E',22)) a=n(1)
        return a
    },
    cokecoleffect() {
        a = n(player.Qi.cokecole).add(1)
        if (hasMilestone('Qi', 101)) a = n(2).pow(player.Qi.cokecole.pow(0.33))
            if (inChallenge('E',22)) a=n(1)
        return a
    },
    cokecoleffect2() {
        a = n(player.Qi.cokecole).add(1).pow(1.5)
        if (hasMilestone('Qi', 101)) a = n(2).pow(player.Qi.cokecole.pow(0.4))
            if (inChallenge('E',22)) a=n(1)
        return a
    },
    qaqe308effect() {
        a = n(10).pow(player.Qi.qaqe308)
        if (a.gte(1e100)) a = powsoftcap(a,n('1e100'),2)
        if (a.gte('1e5555')) a = powsoftcap(a,n('1e5555'),4)
            if (inChallenge('E',22)) a=n(1)
        return a
    },
    qaqe308effect2() {
        a = player.Qi.qaqe308.pow(10)
        if (inChallenge('E',22)) a=n(1)
        return a
    },
    RGeffect() {
        a = n(10).pow(player.Qi.rg)
        if (a.gte(n(10).pow(75))) a = powsoftcap(a,n(10).pow(75),10)
        if (inChallenge('E',22)) a=n(1)
        return a
    },
    RGeffect2() {a=n(0)
        if(player.Qi.rg.gte(10000)) a = player.Qi.rg.log(10)
        //if (a.gte(n(10).pow(75))) a = powsoftcap(a,n(10).pow(75),10)
        //if (inChallenge('E',22)) a=n(1)
        return a
    },
    RGeffect3() {a=n(1)
        if(player.Qi.rg.gte(10000)) a = player.Qi.rg.div(10000)
        //if (a.gte(n(10).pow(75))) a = powsoftcap(a,n(10).pow(75),10)
        if (inChallenge('E',22)) a=n(1)
        return a
    },
    Supermanspeed() {
        a = n(1200)
        a = a.div(challengeEffect('DC',13))
        if (hasAchievement('DC', 14)) a = a.div(achievementEffect('DC', 14))
        a = a.times(tmp.Qi.superbonustoall)
        if (player.Qi.QqQe308.gte(50000)) a = a.times(n(10).pow(player.Qi.QqQe308.div(50000).sub(1)))
        if (a.lte(player.devSpeed.div(50000))&&player.devSpeed.neq(0)) a = player.devSpeed.div(50000)
        return a
    },
    Supermanspeed2() {
        a = n(14400)
        if (hasAchievement('DC', 34)) a = a.div(achievementEffect('DC', 34))
        a = a.times(tmp.Qi.superbonustoall)
        if (player.Qi.cokecole.gte(25000)) a = a.times(n(10).pow(player.Qi.cokecole.div(25000).sub(1)))
        if (a.lte(player.devSpeed.div(25000))&&player.devSpeed.neq(0)) a = player.devSpeed.div(25000)
        return a
    },
    Superqaqe308speed() {
        a = n(6480000)
        a = a.times(tmp.Qi.superbonustoall)
        if (player.Qi.qaqe308.gte(5000)) a = a.times(n(10).pow(player.Qi.qaqe308.div(5000).sub(1)))
        if (a.lte(player.devSpeed.div(5000))&&player.devSpeed.neq(0)) a = player.devSpeed.div(5000)
        return a
    },
        Superrgspeed() {
        a = n(1e20)
        a = a.times(tmp.Qi.superbonustoall)
        if (player.Qi.rg.gte(10000)) a = a.times(n(10).pow(player.Qi.rg.div(10000).sub(1)))
        if (a.lte(player.devSpeed.div(5000))&&player.devSpeed.neq(0)) a = player.devSpeed.div(5000)
        return a
    },
    Showdetail() {
        a = "你超了QqQe308 <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'>" + format(player.Qi.QqQe308) + "</h3> 次, 使QqQe308的获取需求 <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'> " + "/" +format(tmp.Qi.QqQe308effect)+ "</h3>.<br>" + "基于你的QqQeInfinity数量，QqQeInfinity每 <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'>"+ format(tmp.Qi.Supermanspeed) +"</h3> 秒超一次QqQe308<br>"
            if (!hasAchievement('A2', 35)) a = a + "当前剩余 <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'>"+format(n(tmp.Qi.Supermanspeed).sub(player.Qi.Supermantime))+"</h3> 秒<br/>"
            if (hasAchievement('A2', 35)) a = a + "等效于每秒超 <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'>"+format(n(1).div(tmp.Qi.Supermanspeed))+"</h3> 次QqQe308<br/>算上游戏速度，你每秒正在超 <h3 style='color: #eee308; text-shadow: 0 0 3px #c2b280'>"+format(n(1).div(tmp.Qi.Supermanspeed).times(player.devSpeed))+"</h3> 次QqQe308<br/>"
        if (hasMilestone('Qi', 1)) {a = a + "<br/>你超了cokecole <h3 style='color: #cce308; text-shadow: 0 0 3px #c2b280'>" + format(player.Qi.cokecole) + "</h3> 次, 使二重压缩时间墙的获取需求 <h3 style='color: #cce308; text-shadow: 0 0 3px #c2b280'> " + "/" +format(tmp.Qi.cokecoleffect)+ "</h3>.<br>" + "基于你的QqQeInfinity数量，QqQeInfinity每 <h3 style='color: #cce308; text-shadow: 0 0 3px #c2b280'>"+ format(tmp.Qi.Supermanspeed2) +"</h3> 秒超一次cokecole<br>" 
            if (!hasAchievement('A2', 35)) a = a + "当前剩余 <h3 style='color: #cce308; text-shadow: 0 0 3px #c2b280'>"+format(n(tmp.Qi.Supermanspeed2).sub(player.Qi.Supermantime2))+"</h3> 秒<br/>"
            if (hasAchievement('A2', 35)) a = a + "等效于每秒超 <h3 style='color: #cce308; text-shadow: 0 0 3px #c2b280'>"+format(n(1).div(tmp.Qi.Supermanspeed2))+"</h3> 次cokecole<br/>算上游戏速度，你每秒正在超 <h3 style='color: #cce308; text-shadow: 0 0 3px #c2b280'>"+format(n(1).div(tmp.Qi.Supermanspeed2).times(player.devSpeed))+"</h3> 次cokecole<br/>"
        if (hasMilestone('DC', 9)) a = a + "由于200二重压缩时间墙里程碑，这也使二重压缩时间墙获取 <h3 style='color: #cce308; text-shadow: 0 0 3px #c2b280'> " + "x" +format(tmp.Qi.cokecoleffect2)+ "</h3>.<br>"
        }
        if (hasUpgrade('I', 63)) {a = a + "<br/>你超了qaqe308 <h3 style='color: #ab4308; text-shadow: 0 0 3px #c2b280'>" + format(player.Qi.qaqe308) + "</h3> 次, 使无限维度 <h3 style='color: #ab4308; text-shadow: 0 0 3px #c2b280'> " + "x" +format(tmp.Qi.qaqe308effect)+ "</h3>.<br>" + "基于你的QqQeInfinity数量，QqQeInfinity每 <h3 style='color: #ab4308; text-shadow: 0 0 3px #c2b280'>"+ format(tmp.Qi.Superqaqe308speed) +"</h3> 秒超一次qaqe308<br>"
            if (!hasAchievement('A2', 35)) a = a + "当前剩余 <h3 style='color: #ab4308; text-shadow: 0 0 3px #c2b280'>"+format(n(tmp.Qi.Superqaqe308speed).sub(player.Qi.Superqaqe308time))+"</h3> 秒<br/>"
            if (hasAchievement('A2', 35)) a = a + "等效于每秒超 <h3 style='color: #ab4308; text-shadow: 0 0 3px #c2b280'>"+format(n(1).div(tmp.Qi.Superqaqe308speed))+"</h3> 次qaqe308<br/>算上游戏速度，你每秒正在超 <h3 style='color: #ab4308; text-shadow: 0 0 3px #c2b280'>"+format(n(1).div(tmp.Qi.Superqaqe308speed).times(player.devSpeed))+"</h3> 次qaqe308<br/>"
            if (hasMilestone('Qi', 102)) a = a + "由于“超市qaqe308”里程碑，这也使无限点数获取 <h3 style='color: #ab4308; text-shadow: 0 0 3px #c2b280'> " + "x" +format(tmp.Qi.qaqe308effect2)+ "</h3>.<br>"
        }
        if (hasMilestone('E', 17)) {a = a + "<br/>你超了ReplicantiGalaxy <h3 style='color: #998e15; text-shadow: 0 0 3px #c2b280'>" + format(player.Qi.rg) + "</h3> 次, 使复制器上限 <h3 style='color: #998e15; text-shadow: 0 0 3px #c2b280'> " + "x" +format(tmp.Qi.RGeffect)+ "</h3>.<br>" + "基于你的QqQeInfinity数量，QqQeInfinity每 <h3 style='color: #998e15; text-shadow: 0 0 3px #c2b280'>"+ format(tmp.Qi.Superrgspeed) +"</h3> 秒超一次ReplicantiGalaxy<br>"
            //if (!hasAchievement('A2', 35)) a = a + "当前剩余 <h3 style='color: #998e15; text-shadow: 0 0 3px #c2b280'>"+format(n(tmp.Qi.Superrgspeed).sub(player.Qi.Superqaqe308time))+"</h3> 秒<br/>"
            if (hasAchievement('A2', 35)) a = a + "等效于每秒超 <h3 style='color: #998e15; text-shadow: 0 0 3px #c2b280'>"+format(n(1).div(tmp.Qi.Superrgspeed))+"</h3> 次ReplicantiGalaxy<br/>算上游戏速度，你每秒正在超 <h3 style='color: #998e15; text-shadow: 0 0 3px #c2b280'>"+format(n(1).div(tmp.Qi.Superrgspeed).times(player.devSpeed))+"</h3> 次ReplicantiGalaxy<br/>"
            if (hasMilestone('Qi', 103)) a = a + "由于“超市ReplicantiGalaxy”里程碑，这也给予你 <h3 style='color: #998e15; text-shadow: 0 0 3px #c2b280'> " +format(tmp.Qi.RGeffect2)+ "</h3> 个额外的升级点数，并使复制器乘数公式中的a值<h3 style='color: #998e15; text-shadow: 0 0 3px #c2b280'> " +'x'+format(tmp.Qi.RGeffect3)+ "</h3>.<br>"
            
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
        if (player.Qi.choice.eq(n(5))) a = a + "正在超ReplicantiGalaxy"
        return a
    },
    superbonustoall(){a = n(1)
        if (player.Qi.points.gte(1)) a = a.div(player.Qi.points)
        if (hasAchievement('A', 95)) a = a.div(1.05)
        if (hasMilestone('I', 24)) a = a.div(tmp.I.mil24effect)
        if (hasMilestone('I', 25)) a = a.div(tmp.I.mil25effect)
        if(gcs('E', 31)==1) a = a.div(ce('E', 31))
        a = a.div(challengeEffect('E',22))
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
            if(player.bx.points.gte(1)) a=n(2e308)
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
    if(inChallenge('E',21)) mult = n(0)
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
    deactivated(){return player.bx.points.gte(1)},
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
        "resource-display",
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
        if(resettingLayer == 'bx') layerDataReset(this.layer,[])
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
                if(player.bx.points.gte(1)) a=n(2e308)
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
            if (hasMilestone('E',101)) kept.push("milestones")
            layerDataReset(this.layer, kept)
        if(resettingLayer == 'bx') layerDataReset(this.layer,[])
        }
    },
    deactivated(){return player.bx.points.gte(1)},
    autoPrestige() {a = false
        if (hasChallenge('I', 16)) a = true
        return a
    },
    update(diff){
        if(hasMilestone('E',104)) player.co.points=player.DC.points.add(10).log(2).times(tmp.co.directMult)
    },
    effect(){
        a = n(10).pow(n(5).times(player.co.points))
        if (a.gte(1e290)&&!hasMilestone('E',104)) a = n(1e290)
            return a
      },
      effectDescription() { 
        if (hasMilestone('co', 3)) {
            a = "使点数获取x"+format(tmp.co.effect)
            if (tmp.co.effect.gte(1e290)&&!hasMilestone('E',104)) a = a + "(已到达硬上限)"
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
        resetTime: 0,
        rep: n(1),
        skillusetime:n(0),
    }},
    color: "#b67f33",
    requires(){a = new Decimal(1.79e308)
        if(player.bx.points.gte(1)) a=n(2e308)
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
        if (hasMilestone('qa', 1)&&!hasMilestone('qa', 3)) mult = mult.times(tmp.qa.effect)
        mult = mult.times(buyableEffect('qa', 14))
        if (hasChallenge('I', 26)) mult = mult.times(challengeEffect('I', 26))
        if (hasMilestone('Qi', 102)) mult = mult.times(tmp.Qi.qaqe308effect2)
        if (hasChallenge('I', 27)) mult = mult.times(challengeEffect('I', 27))
        mult = mult.times(tmp.E.mil0effect3)
        if(inChallenge('E',24)) mult=n(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (hasMilestone('I', 22)) exp = exp.add(tmp.I.mil22effect)
        if (hasMilestone('I', 26)) exp = exp.add(buyableEffect('I', 26))
        if (gcs('E',121)==1) exp =exp.add(0.2)
        if (inChallenge('E',13)) exp = exp.times(tmp.E.ec1effect)
        if(hasAchievement('A3',75))exp=exp.add(0.1)
        return exp
    },
    directMult() {a = n(1)
        if (hasMilestone('I', 23)) a = a.times(77777)
        if (hasAchievement('A2', 65)) a = a.times(achievementEffect('A2', 65))
        if (hasMilestone('E', 8)) a = a.times(buyableEffect('qa', 14))
        if (hasMilestone('qa', 3)) a = a.times(tmp.qa.effect)
        a = a.times(tmp.df.effect3)
    if (hasAchievement('A3', 55)) a = a.times(achievementEffect('A3', 55))
        if (gcs('E', 61)==1) a = a.times(1e10)
        a = a.times(challengeEffect('E',13))
        if (gcs('E', 131)==1) a = a.times(ce('E',131))
        if (gcs('E', 132)==1) a = a.times(ce('E',132))
        if (gcs('E', 133)==1) a = a.times(ce('E',133))
        if (inChallenge('E',13)) a = a.pow(tmp.E.ec1effect)
        if(inChallenge('E',24)) a=n(1)
            return a
    },
    deactivated(){return player.bx.points.gte(1)},
    canReset() {return player.points.gte(1.79e308)&&(player.I.points.lt(n(2).pow(1024))||hasMilestone('E', 15))},
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
        if (inChallenge('I', 27)||inChallenge('I', 28)||inChallenge('E', 12)) player.I.bhpaused = n(1)
        if (hasUpgrade('I', 71)&&player.devSpeed.gte(1)&&player.I.rep.lt(tmp.I.rephardcap)) player.I.rep = player.I.rep.times(tmp.I.repmult.pow(n(diff).div(player.devSpeed)))
        if (player.I.rep.gt(tmp.I.rephardcap)) player.I.rep = n(tmp.I.rephardcap)
        if (player.I.points.gt(n(2).pow(1024))&&!hasMilestone('E', 15)) player.I.points = n(2).pow(1024)
        if (player.E.IPmultauto == true&&hasMilestone('I', 2)&&layers.I.buyables[21].canAfford()) layers.I.buyables[21].buy()
            if (player.E.IPmultauto == true&&n(cc('E',24)).gte(1)) setBuyableAmount(this.layer, 21, player.I.points.max(1).log(10))
        if ((hasMilestone('E',5)&&player.E.scnerfauto == true&&n(getBuyableAmount('I', 22)).lt(6)&&layers.I.buyables[22].canAfford())) layers.I.buyables[22].buy();
        if ((hasMilestone('E',5)&&player.E.ipowauto == true&&(n(getBuyableAmount('I', 23)).lt(36)||hasAchievement('A3',95))&&layers.I.buyables[23].canAfford())) layers.I.buyables[23].buy();
        if ((hasMilestone('E',5)&&player.E.scnerf2auto == true&&n(getBuyableAmount('I', 24)).lt(10)&&layers.I.buyables[24].canAfford())) layers.I.buyables[24].buy();
        if ((hasMilestone('E',5)&&player.E.scnerf3auto == true&&n(getBuyableAmount('I', 25)).lt(14)&&layers.I.buyables[25].canAfford())) layers.I.buyables[25].buy();
        if ((hasMilestone('E',5)&&player.E.ipexpauto == true&&n(getBuyableAmount('I', 26)).lt(6)&&layers.I.buyables[26].canAfford())) layers.I.buyables[26].buy();
        if ((hasMilestone('E',6)&&player.E.id1auto == true&&layers.I.buyables[11].canAfford())) layers.I.buyables[11].buy();
        if ((hasMilestone('E',6)&&player.E.id2auto == true&&layers.I.buyables[12].canAfford())) layers.I.buyables[12].buy();
        if ((hasMilestone('E',6)&&player.E.id3auto == true&&layers.I.buyables[13].canAfford())) layers.I.buyables[13].buy();
        if ((hasMilestone('E',6)&&player.E.id4auto == true&&layers.I.buyables[14].canAfford())) layers.I.buyables[14].buy();
        if ((hasMilestone('E',7)&&player.E.id5auto == true&&layers.I.buyables[15].canAfford())) layers.I.buyables[15].buy();
        if ((hasMilestone('E',7)&&player.E.id6auto == true&&layers.I.buyables[16].canAfford())) layers.I.buyables[16].buy();
        if ((hasMilestone('E',7)&&player.E.id7auto == true&&layers.I.buyables[17].canAfford())) layers.I.buyables[17].buy();
        if ((hasMilestone('E',7)&&player.E.id8auto == true&&layers.I.buyables[18].canAfford())) layers.I.buyables[18].buy();
        if ((hasMilestone('E',10)&&player.E.bhupg1auto == true&&layers.I.buyables[31].canAfford())) layers.I.buyables[31].buy();
        if ((hasMilestone('E',10)&&player.E.bhupg2auto == true&&layers.I.buyables[32].canAfford())) layers.I.buyables[32].buy();
        if ((hasMilestone('E',10)&&player.E.bhupg3auto == true&&layers.I.buyables[33].canAfford())) layers.I.buyables[33].buy();
        if ((hasMilestone('E',12)&&player.E.repupg1auto == true&&layers.I.buyables[41].canAfford())) layers.I.buyables[41].buy();
        if ((hasMilestone('E',12)&&player.E.repupg2auto == true&&layers.I.buyables[42].canAfford())) layers.I.buyables[42].buy();
        if ((hasMilestone('E',12)&&player.E.repupg3auto == true&&layers.I.buyables[43].canAfford())) layers.I.buyables[43].buy();
        if (hasMilestone('E', 3)&&player.I.inf.lt(256)) player.I.inf=n(256) //4 etr mil
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
                    +format(player.I.ipower)+"无限之力，使点数获取x"+format(player.I.ipower)+"^"+format(tmp.I.ipowerexp)+"="+format(tmp.I.ipowereffect)+tmp.I.ipowsctip
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
                ["display-text", () => tmp.I.repshow],["clickables", [3]],["buyables", [4]]]}, 
        },     
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        ["display-text", () => "无限点数gainMult："+format(tmp.I.gainMult)+"<br>无限点数gainExp："+format(tmp.I.gainExp)+"<br>无限点数directMult："+format(tmp.I.directMult)],
        "resource-display",
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
    doReset(resettingLayer) {
        if (resettingLayer=='I') {player.I.inf = player.I.inf.add(tmp.I.infgain)
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
     if (hasMilestone('E', 10)) kept.push('milestones')
    if (hasMilestone('E', 12)) kept.push('challenges')
        if(resettingLayer == 'bx') kept = []
     layerDataReset(this.layer, kept)
        }
    },
    autoUpgrade() {if (hasMilestone('E', 9)) return player.E.infupgauto},
    passiveGeneration()
    {
        mult = 0
        if(gcs('E',201)==1) mult=n(0.01)
        return mult
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(2).pow(x) },
            title: '第一无限维度',
            display() { return "花费："+format(this.cost())+"无限点数<br>维度倍率：x"+format(tmp.I.id1mult)+"<br>当前数量："+format(player.I.id1)+"<br>已购买了"+format(getBuyableAmount(this.layer, this.id))+"次"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                if (!hasMilestone('E', 6)) player[this.layer].points = player[this.layer].points.sub(this.cost())
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
                if (!hasMilestone('E', 6)) player[this.layer].points = player[this.layer].points.sub(this.cost())
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
                if (!hasMilestone('E', 6)) player[this.layer].points = player[this.layer].points.sub(this.cost())
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
                if (!hasMilestone('E', 6))player[this.layer].points = player[this.layer].points.sub(this.cost())
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
                if (!hasMilestone('E', 6))player[this.layer].points = player[this.layer].points.sub(this.cost())
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
                if (!hasMilestone('E', 6))player[this.layer].points = player[this.layer].points.sub(this.cost())
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
                if (!hasMilestone('E', 6))player[this.layer].points = player[this.layer].points.sub(this.cost())
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
                if (!hasMilestone('E', 6))player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.I.id8 = player.I.id8.add(1)
            },
        },
        21: {
            title(){text = 'IP倍增'
                return text
            },
            cost(x) { return new Decimal(10).pow(x.add(1)) },
            effect(x) {return tmp.I.doubleipbase.pow(x)},
            display() { return "每次购买使无限点数x"+format(tmp.I.doubleipbase)+"<br/>当前已购买了"+ getBuyableAmount('I', 21) +"次<br/>效果：无限点数获取x"+format(buyableEffect('I', 21))+'<br/>下一次花费'+format(new Decimal(10).pow(n(getBuyableAmount('I', 21)).add(1)))+'无限点数' },
            unlocked() {return hasMilestone('I', 2)},
            canAfford() { return player.I.points.gte(this.cost()) },
            buy() {
                if (!hasMilestone('E', 5)) player.I.points = player.I.points.sub(this.cost())
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
            canAfford() { return player.I.points.gte(this.cost())&&hasMilestone('I', 3) },
            purchaseLimit: n(6),
            buy() {
                if (!hasMilestone('E', 5)) player.I.points = player.I.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        23: {
            title(){text = '增加无限之力给点数乘数的指数'
                return text
            },
            cost(x) { a= new Decimal(8).pow(x.add(3))
                if(x.gte(36)) a=n(10).pow(n(10).pow(x.sub(28)).pow(0.25))
                    return a
             },
            effect(x) {return new Decimal(0.125).times(x)},
            display() { return "每次购买使无限之力给点数乘数的指数+0.125<br/>当前已购买了"+ getBuyableAmount('I', 23) +"/"+format(this.purchaseLimit(),0)+"次<br/>效果：无限之力给点数乘数的指数+"+format(buyableEffect('I', 23))+'<br/>下一次花费'+format(this.cost())+'无限点数' },
            unlocked() {return hasMilestone('I', 4)},
            canAfford() { return player.I.points.gte(this.cost())&&hasMilestone('I', 4) },
            purchaseLimit() {a=n(36)
                if(hasAchievement('A3',95)) a=n(1.79e309)
                return a
            },
            buy() {
                if (!hasMilestone('E', 5)) player.I.points = player.I.points.sub(this.cost())
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
            canAfford() { return player.I.points.gte(this.cost())&&hasMilestone('I', 16) },
            purchaseLimit: n(10),
            buy() {
                if (!hasMilestone('E', 5)) player.I.points = player.I.points.sub(this.cost())
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
            canAfford() { return player.I.points.gte(this.cost())&&hasMilestone('I', 22) },
            purchaseLimit: n(14),
            buy() {
                if (!hasMilestone('E', 5)) player.I.points = player.I.points.sub(this.cost())
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
            canAfford() { return player.I.points.gte(this.cost())&&hasMilestone('I', 25) },
            purchaseLimit: n(6),
            buy() {
                if (!hasMilestone('E', 5)) player.I.points = player.I.points.sub(this.cost())
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
                if (!hasMilestone('E', 10))player.I.points = player.I.points.sub(this.cost())
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
                if (!hasMilestone('E', 10))player.I.points = player.I.points.sub(this.cost())
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
                if (!hasMilestone('E', 10))player.I.points = player.I.points.sub(this.cost())
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
                if (!hasMilestone('E', 12))player.I.points = player.I.points.sub(this.cost())
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
                if (!hasMilestone('E', 12))player.I.points = player.I.points.sub(this.cost())
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
                if (!hasMilestone('E', 12))player.I.points = player.I.points.sub(this.cost())
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
                if (player.points.gte(1.79e308)) player.I.points = player.I.points.add(1)
                if (player.points.gte(1.79e308)) player.I.inf = player.I.inf.add(1)
            },
            onEnter(){player.I.inf = player.I.inf.sub(1)},
            onExit(){player.I.inf = player.I.inf.sub(1)},
            canComplete: function() {a = n(1.79e308)
                if (hasMilestone('E', 2)) a = n(0)
                return player.points.gte(a)},
        },
        12: {
            name: "Normal Challenge 2",
            challengeDescription(){return "所有无限前资源获取^0.9"},
            goalDescription(){return "1.79e308 点数"},
            rewardDescription(){return "自动购买之前层级的可购买，无限后保留成就"},
            unlocked(){return hasAchievement('A2', 12)},
            onComplete(){
                if (player.points.gte(1.79e308))player.I.points = player.I.points.add(1)
                if (player.points.gte(1.79e308))player.I.inf = player.I.inf.add(1)
            },
            onEnter(){player.I.inf = player.I.inf.sub(1)},
            onExit(){player.I.inf = player.I.inf.sub(1)},
            canComplete: function() {a = n(1.79e308)
                if (hasMilestone('E', 2)) a = n(0)
                return player.points.gte(a)},
        },
        13: {
            name: "Normal Challenge 3",
            challengeDescription(){return "游戏速度x0.5"},
            goalDescription(){return "1.79e308 点数"},
            rewardDescription(){return "解锁黑洞，无限后保留之前主线层级的升级、挑战与里程碑"},
            unlocked(){return hasAchievement('A2', 12)},
            onComplete(){
                if (player.points.gte(1.79e308))player.I.points = player.I.points.add(1)
                if (player.points.gte(1.79e308))player.I.inf = player.I.inf.add(1)
            },
            onEnter(){player.I.inf = player.I.inf.sub(1)},
            onExit(){player.I.inf = player.I.inf.sub(1)},
            canComplete: function() {a = n(1.79e308)
                if (hasMilestone('E', 2)) a = n(0)
                return player.points.gte(a)},
        },
        14: {
            name: "Normal Challenge 4",
            challengeDescription(){return "你不能获得QqQeInfinity，QqQe308的获取需求大幅上升"},
            goalDescription(){return "1.79e308 点数"},
            rewardDescription(){return "自动获取QqQe308与QqQeInfinity且不重置任何东西"},
            unlocked(){return hasAchievement('A2', 12)},
            onComplete(){
                if (player.points.gte(1.79e308))player.I.points = player.I.points.add(1)
                if (player.points.gte(1.79e308))player.I.inf = player.I.inf.add(1)
            },
            onEnter(){player.I.inf = player.I.inf.sub(1)},
            onExit(){player.I.inf = player.I.inf.sub(1)},
            canComplete: function() {a = n(1.79e308)
                if (hasMilestone('E', 2)) a = n(0)
                return player.points.gte(a)},
        },
        15: {
            name: "Normal Challenge 5",
            challengeDescription(){return "所有被动生成资源的QoL均被禁用"},
            goalDescription(){return "1.79e308 点数"},
            rewardDescription(){return "所有被动生成资源且效果x10"},
            unlocked(){return hasAchievement('A2', 12)},
            onComplete(){
                if (player.points.gte(1.79e308))player.I.points = player.I.points.add(1)
                if (player.points.gte(1.79e308))player.I.inf = player.I.inf.add(1)
            },
            onEnter(){player.I.inf = player.I.inf.sub(1)},
            onExit(){player.I.inf = player.I.inf.sub(1)},
            canComplete: function() {a = n(1.79e308)
                if (hasMilestone('E', 2)) a = n(0)
                return player.points.gte(a)},
        },
        16: {
            name: "Normal Challenge 6",
            challengeDescription(){return "你不能获得cokecole，二重压缩时间墙加成硬上限增加"},
            goalDescription(){return "1.79e308 点数"},
            rewardDescription(){return "自动获取cokecole且不重置任何东西，解锁第四个支线层级"},
            unlocked(){return hasAchievement('A2', 12)},
            onComplete(){
                if (player.points.gte(1.79e308))player.I.points = player.I.points.add(1)
                if (player.points.gte(1.79e308))player.I.inf = player.I.inf.add(1)
            },
            onEnter(){player.I.inf = player.I.inf.sub(1)},
            onExit(){player.I.inf = player.I.inf.sub(1)},
            canComplete: function() {a = n(1.79e308)
                if (hasMilestone('E', 2)) a = n(0)
                return player.points.gte(a)},
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
            onExit(){player.I.inf = player.I.inf.sub(1)
                player.I.bhpaused = n(0)
            },
            canComplete: function() {return player.points.gte('1e5000')},
        },
        28: {
            name: "Infinity Challenge 8",
            challengeDescription(){return "黑洞被禁用，无限维度倍率迅速衰减"},
            goalDescription(){return "1e20000 点数"},
            rewardDescription(){return "基于第一与第八维度乘数加成第1~7无限维度<br/>当前：×"+format(challengeEffect(this.layer,this.id))+'<br>并解锁一个新的界面'},
            rewardEffect() {eff= tmp.I.id1mult.times(tmp.I.id8mult).pow(0.1)
                if (hasAchievement('A3',46)) eff = eff.max(1)
                return eff
                },
            unlocked(){return hasMilestone('I', 17)},
            onComplete(){
                player.I.inf = player.I.inf.add(1)
            },
            onEnter(){player.I.inf = player.I.inf.sub(1)},
            onExit(){player.I.inf = player.I.inf.sub(1)
                player.I.bhpaused = n(0)
            },
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
            if (player.I.bhpaused.neq(0)) a = a + '开'
            return a
            },
            //unlocked() {return !tmp.I.bh1percent.gte(0.9999)},
            canClick() {return !inChallenge('I', 27)&&!inChallenge('I', 28)&&!inChallenge('E', 12)},
            onClick() {player.I.bhpaused = player.I.bhpaused.add(1)
                if (player.I.bhpaused.gt(1)) player.I.bhpaused = n(0)
                    player.devSpeed = n(0)
            },
        },
        31: {
            title: "加速复制器",
            display() {a = "使复制器复制速度公式中a x"+format(tmp.I.skilltoa,1)+",x x"+format(tmp.I.skilltox,1)+"，并去除软上限，持续"+format(tmp.I.skilllast,0)+"s，冷却"+format(tmp.I.skillcd,0)+"s<br>本次永恒还能使用"+format(tmp.I.skillcap.sub(player.I.skillusetime),0)+'次'
            if (player.E.repskillacttime.gte(0)) a = a + '<br>剩余生效时长：'+formatTime(player.E.repskillacttime)
            if (player.E.repskillcd.gte(0)) a = a + '<br>冷却剩余：'+formatTime(player.E.repskillcd)
            return a
            },
            unlocked() {return hasAchievement('A3',76)},
            canClick() {return player.E.repskillacttime.eq(0)&&player.E.repskillcd.eq(0)&&player.I.skillusetime.lt(tmp.I.skillcap)},
            onClick() {player.E.repskillacttime = n(tmp.I.skilllast)
                player.I.skillusetime = player.I.skillusetime.add(1)
                    //player.devSpeed = n(0)
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
        if (inChallenge('I', 21)||inChallenge('E', 12)) a = n(1)
            return a
    },
    ipowereffect() {a = player.I.ipower.pow(tmp.I.ipowerexp)
        if(a.gte('e5e7')) a=powsoftcap(a,n('e5e7'),2)
        return a
    },
    ipowsctip(){a=''
        if(tmp.I.ipowereffect.gte('e5e7')) a='(受软上限限制)'
        return a
    },
    allidmult() {a = n(1)
        if (hasUpgrade('I', 32)) a = a.times(upgradeEffect('I', 32))
        if (hasUpgrade('I', 42)) a = a.times(upgradeEffect('I', 42))
        if (hasUpgrade('I', 52)) a = a.times(upgradeEffect('I', 52))
        if (hasUpgrade('I', 61)) a = a.times(upgradeEffect('I', 61))
        if (hasUpgrade('I', 62)) a = a.times(upgradeEffect('I', 62))
        if (!inChallenge('I', 27)&&!inChallenge('E', 12)) a = a.times(tmp.Qi.qaqe308effect)
        if (hasUpgrade('I', 71)) a = a.pow(tmp.I.repeff)
        a = a.times(tmp.qa.monikatoidmult)
        if (inChallenge('I', 23)||inChallenge('E', 12)) a = a.div(1e20)
        if (hasChallenge('I', 23)) a = a.times(challengeEffect(this.layer,23))
        if (inChallenge('I', 24)||inChallenge('E', 12)) a = a.times(n(Math.sin(player.I.resetTime)+1).times(0.5))
        if (hasChallenge('I', 24)) a = a.times(challengeEffect(this.layer,24))
        if ((inChallenge('I', 25)||inChallenge('E', 12))&&n(player.I.resetTime).lte(27705)) a = a.div(1e40).times(n(2).pow(n(player.I.resetTime).div(208.5)))
        if (inChallenge('I', 28)) a = a.div(n(1e10).pow(player.I.resetTime))
        if (hasAchievement('A2', 25)) a = a.times(2)
        a = a.times(tmp.E.mil0effect4)
        a = a.times(tmp.df.effect2)
        a = a.times(challengeEffect('E',12))
            return a
    },
    id1mult() {b = n(1)
        a = a.times(tmp.I.idmult)
        a = a.times(tmp.I.allidmult)
        a = a.times(tmp.I.chaltoidmult)
        a = a.times(tmp.I.ictoidmult)
        a = a.times(n(2).pow(0.125).pow(n(getBuyableAmount(this.layer, 11))))
        if (hasUpgrade('I', 43)) a = a.times(upgradeEffect('I', 43))
        if (hasUpgrade('I', 53)) a = a.times(upgradeEffect('I', 53))
        if (hasChallenge('I', 28)) a = a.times(challengeEffect('I', 28))//bug发源地
        if (inChallenge('I', 22)||inChallenge('E', 12)) a = a.pow(2)
        if (hasUpgrade('I', 71)) a = a.pow(tmp.I.repeff)
        if(hasMilestone('df',1)) a=a.pow(tmp.qa.monikatoidmult)
        if (inChallenge('E',11)) a = a.pow(tmp.E.ec1effect)
        if (inChallenge('E',21)) a = a.pow(0.1)
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
        if (inChallenge('I', 22)||inChallenge('E', 12)) a = n(1)
        if (hasUpgrade('I', 71)) a = a.pow(tmp.I.repeff)
            if(hasMilestone('df',1)) a=a.pow(tmp.qa.monikatoidmult)
            if (inChallenge('E',11)) a = a.pow(tmp.E.ec1effect)
                if (inChallenge('E',21)) a = a.pow(0.1)
        return a
    },
    id3mult() {a = n(1)
        a = a.times(tmp.I.idmult)
        a = a.times(tmp.I.allidmult)
        a = a.times(tmp.I.chaltoidmult)
        a = a.times(tmp.I.ictoidmult)
        a = a.times(n(2).pow(0.125).pow(n(getBuyableAmount(this.layer, 13))))
        if (hasChallenge('I', 28)) a = a.times(challengeEffect('I', 28))
        if (inChallenge('I', 22)||inChallenge('E', 12)) a = n(1)
        if (hasUpgrade('I', 71)) a = a.pow(tmp.I.repeff)
            if(hasMilestone('df',1)) a=a.pow(tmp.qa.monikatoidmult)
            if (inChallenge('E',11)) a = a.pow(tmp.E.ec1effect)
                if (inChallenge('E',21)) a = a.pow(0.1)
        return a
    },
    id4mult() {a = n(1)
        a = a.times(tmp.I.idmult)
        a = a.times(tmp.I.allidmult)
        a = a.times(tmp.I.chaltoidmult)
        a = a.times(tmp.I.ictoidmult)
        a = a.times(n(2).pow(0.125).pow(n(getBuyableAmount(this.layer, 14))))
        if (hasChallenge('I', 28)) a = a.times(challengeEffect('I', 28))
        if (inChallenge('I', 22)||inChallenge('E', 12)) a = n(1)
        if (hasUpgrade('I', 71)) a = a.pow(tmp.I.repeff)
            if(hasMilestone('df',1)) a=a.pow(tmp.qa.monikatoidmult)
            if (inChallenge('E',11)) a = a.pow(tmp.E.ec1effect)
                if (inChallenge('E',21)) a = a.pow(0.1)
        return a
    },
    id5mult() {a = n(1)
        a = a.times(tmp.I.idmult)
        a = a.times(tmp.I.allidmult)
        a = a.times(tmp.I.chaltoidmult)
        a = a.times(tmp.I.ictoidmult)
        a = a.times(n(2).pow(0.125).pow(n(getBuyableAmount(this.layer, 15))))
        if (hasChallenge('I', 28)) a = a.times(challengeEffect('I', 28))
        if (inChallenge('I', 22)||inChallenge('E', 12)) a = n(1)
        if (hasUpgrade('I', 71)) a = a.pow(tmp.I.repeff)
            if(hasMilestone('df',1)) a=a.pow(tmp.qa.monikatoidmult)
            if (inChallenge('E',11)) a = a.pow(tmp.E.ec1effect)
                if (inChallenge('E',21)) a = a.pow(0.1)
        return a
    },
    id6mult() {a = n(1)
        a = a.times(tmp.I.idmult)
        a = a.times(tmp.I.allidmult)
        a = a.times(tmp.I.chaltoidmult)
        a = a.times(tmp.I.ictoidmult)
        a = a.times(n(2).pow(0.125).pow(n(getBuyableAmount(this.layer, 16))))
        if (hasChallenge('I', 28)) a = a.times(challengeEffect('I', 28))
        if (inChallenge('I', 22)||inChallenge('E', 12)) a = n(1)
        if (hasUpgrade('I', 71)) a = a.pow(tmp.I.repeff)
            if(hasMilestone('df',1)) a=a.pow(tmp.qa.monikatoidmult)
            if (inChallenge('E',11)) a = a.pow(tmp.E.ec1effect)
                if (inChallenge('E',21)) a = a.pow(0.1)
        return a
    },
    id7mult() {a = n(1)
        a = a.times(tmp.I.idmult)
        a = a.times(tmp.I.allidmult)
        a = a.times(tmp.I.chaltoidmult)
        a = a.times(tmp.I.ictoidmult)
        a = a.times(n(2).pow(0.125).pow(n(getBuyableAmount(this.layer, 17))))
        if (hasChallenge('I', 28)) a = a.times(challengeEffect('I', 28))
        if (inChallenge('I', 22)||inChallenge('E', 12)) a = n(1)
        if (hasUpgrade('I', 71)) a = a.pow(tmp.I.repeff)
            if(hasMilestone('df',1)) a=a.pow(tmp.qa.monikatoidmult)
            if (inChallenge('E',11)) a = a.pow(tmp.E.ec1effect)
                if (inChallenge('E',21)) a = a.pow(0.1)
        return a
    },
    id8mult() {a = n(1)
        a = a.times(tmp.I.idmult)
        a = a.times(tmp.I.allidmult)
        a = a.times(tmp.I.chaltoidmult)
        a = a.times(tmp.I.ictoidmult)
        a = a.times(n(2).pow(0.125).pow(n(getBuyableAmount(this.layer, 18))))
        if (inChallenge('I', 22)||inChallenge('E', 12)) a = n(1)
        if (hasUpgrade('I', 71)) a = a.pow(tmp.I.repeff)
            if(hasMilestone('df',1)) a=a.pow(tmp.qa.monikatoidmult)
            if (inChallenge('E',11)) a = a.pow(tmp.E.ec1effect)
                if (inChallenge('E',21)) a = a.pow(0.1)
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
        if (hasUpgrade('I', 71)) {a = "你的复制器数量每秒(现实时间)x <h3 style='color:rgb(0, 17, 255); text-shadow: 0 0 3px #5b6efdff'>"+ format(tmp.I.repmult) + "</h3>"
            a = "你有 <h3 style='color:rgb(0, 17, 255); text-shadow: 0 0 3px #c2b280'>" + format(player.I.rep) + '/' +format(tmp.I.rephardcap)+"</h3> 个复制器，使无限维度^ <h3 style='color:rgb(0, 17, 255); text-shadow: 0 0 3px #c2b280'>"+format(tmp.I.repeff)+"</h3><br>" + a
            a = a + "<br>乘数公式：y=a<sup>x</sup>，其中a="+format(tmp.I.formulaa)+",x="+format(tmp.I.formulax)
            if (player.I.rep.gte(tmp.I.repmultsoft)) a = a + "<br>由于你的复制器数量超过了 <h3 style='color:rgb(0, 17, 255); text-shadow: 0 0 3px #5b6efd'>"+format(tmp.I.repmultsoft)+"</h3> ，复制速度将变为原来的 <h3 style='color:rgb(0, 17, 255); text-shadow: 0 0 3px #c2b280'>"+format(n(tmp.I.repmultsoft).log(player.I.rep).pow(2))+"</h3> 次方！"
            if (player.I.rep.gte(tmp.I.rephardcap)) a = a + "<br>由于你的复制器数量到达了 <h3 style='color:rgb(0, 17, 255); text-shadow: 0 0 3px #5b6efd'>"+format(tmp.I.rephardcap)+"</h3> ，复制器将停止增长！"
        }
        return a
        },
    formulaa() {a = n(2)
        a = a.times(buyableEffect('I', 41))
        if(gcs('E',142)==1) a = a.times(1.5)
        if(player.E.repskillacttime.gt(0)) a=a.times(tmp.I.skilltoa)
        if(hasMilestone('Qi',103)) a=a.times(tmp.Qi.RGeffect3)
        return a
    },
    formulax() {x = n(0.01)
        x = x.add(buyableEffect('I', 42))
        x = x.times(tmp.E.mil0effect6)
        if (gcs('E', 102)==1) x = x.times(ce('E', 102))
        if(gcs('E',143)==1) x = x.times(0.1)
        if(player.E.repskillacttime.gt(0)) x=x.times(tmp.I.skilltox)
        return x
            },
    repmultsoft() {s = n(5)
        s= s.times(buyableEffect('I', 43))
        if(gcs('E', 32, 1)) s = s.times(ce('E', 32))
        if(hasMilestone('df',1)) s=s.pow(tmp.df.effect7)
        if(player.E.repskillacttime.gt(0)) s=n(1.79e309)
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
    rephardcap() {a = n(1048576)
        if (hasMilestone('E', 16)) a = a.times(tmp.Qi.RGeffect)
            a= a.times(tmp.df.effect)
            return a
    },
    infgain() {a = n(1)
        a = a.times(tmp.df.effect4)
        if (hasAchievement('A3', 45)) a = a.times(2)
        a = a.times(challengeEffect('E',14))
        if (inChallenge('E',14)) a = n(1)
        return a
    },
    skillcap() {a=n(6)
        if(gcs('E',172)==1) a=n(10)
        return a
    },
    skillcd() {a=n(600)
        if(gcs('E',171)==1) a=n(300)
        return a
    },
    skilllast() {a=n(15)
        if(gcs('E',173)==1) a=n(30)
        return a
    },
    skilltoa() {a=n(1.5)
        if(gcs('E',171)==1) a=n(2)
        return a
    },
    skilltox() {a=n(1.5)
        if(gcs('E',173)==1) a=n(2)
        return a
    },
    doubleipbase() {a=n(2)
        a=a.times(challengeEffect('E',24))
        return a
    }
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
            if(player.bx.points.gte(1)) a=n(2e308)
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
    directMult() {mult = n(1)
        mult = mult.times(tmp.E.mil0effect5)
        return mult
    },
    deactivated(){return player.bx.points.gte(1)},
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
            if (hasAchievement('A3',65))kept.push('milestones')
                if(resettingLayer == 'bx') kept = []
            layerDataReset(this.layer, kept)
               }
    },
    update(diff){
        player.qa.monika = player.qa.monika.add(tmp.qa.effect2.times(diff))
        if ((hasMilestone('E',18)&&player.E.moupg1auto == true&&layers.qa.buyables[11].canAfford())) layers.qa.buyables[11].buy();
        if ((hasMilestone('E',18)&&player.E.moupg2auto == true&&n(getBuyableAmount('qa', 12)).lt(8)&&layers.qa.buyables[12].canAfford())) layers.qa.buyables[12].buy();
        if ((hasMilestone('E',18)&&player.E.moupg3auto == true&&layers.qa.buyables[13].canAfford())) layers.qa.buyables[13].buy();
        if ((hasMilestone('E',18)&&player.E.moupg4auto == true&&layers.qa.buyables[14].canAfford())) layers.qa.buyables[14].buy();
    },
    autoPrestige() {a = player.E.qaqe308auto
        return a
    },
    resetsNothing() {return hasMilestone('E', 18)},
    passiveGeneration()
    {
        mult = 0
        return mult
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
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
            display() { a = "每次购买使点数x1e100<br/>当前已购买了"+ getBuyableAmount('qa', 11) +"次<br/>效果：点数获取x"+format(buyableEffect('qa', 11))+'<br/>下一次花费 '+format(new Decimal(1e3).pow(n(getBuyableAmount('qa', 11)).add(1)))+' Monika点数'
                if (hasMilestone('E', 8)) a = "每次购买使点数x1e100 并^1.005(作用在所有软上限后)<br/>当前已购买了"+ getBuyableAmount('qa', 11) +"次<br/>效果：点数获取x"+format(buyableEffect('qa', 11))+' 并^'+format(tmp.qa.upg1effect2)+'<br/>下一次花费 '+format(new Decimal(1e3).pow(n(getBuyableAmount('qa', 11)).add(1)))+' Monika点数'
                return a
             },
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
            display() { a = "每次购买使Monika点数给无限维度的加成公式中的底数-1<br/>当前已购买了"+ getBuyableAmount('qa', 12) +"/8次<br/>效果：底数-"+format(buyableEffect('qa', 12))+'<br/>下一次花费 '+format(new Decimal(1e4).pow(n(getBuyableAmount('qa', 12)).add(1)))+' Monika点数'
                if (hasMilestone('E', 8)) a = "每次购买使Monika点数给无限维度的加成公式 与时间碎片给游戏速度 中的底数-1<br/>当前已购买了"+ getBuyableAmount('qa', 12) +"/8次<br/>效果：底数-"+format(buyableEffect('qa', 12))+'<br/>下一次花费 '+format(new Decimal(1e4).pow(n(getBuyableAmount('qa', 12)).add(1)))+' Monika点数'
                return a
             },
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
            effect(x) {a = new Decimal(5).pow(x)
                if (hasMilestone('E', 8)) a = n(25).pow(x)
                    return a
            },
            display() { a = "每次购买使Monika点数x5<br/>当前已购买了"+ getBuyableAmount('qa', 13) +"次<br/>效果：Monika点数获取x"+format(buyableEffect('qa', 13))+'<br/>下一次花费 '+format(new Decimal(1e4).pow(n(getBuyableAmount('qa', 13)).add(1)))+' Monika点数' 
                if (hasMilestone('E', 8)) a = "每次购买使Monika点数x(5^2)<br/>当前已购买了"+ getBuyableAmount('qa', 13) +"次<br/>效果：Monika点数获取x"+format(buyableEffect('qa', 13))+'<br/>下一次花费 '+format(new Decimal(1e4).pow(n(getBuyableAmount('qa', 13)).add(1)))+' Monika点数'
                return a
            },
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
            effect(x) {a= new Decimal(2).pow(x)
                if (hasMilestone('E', 8)) a = n(16).pow(x)
                    return a
            },
            display() { a = "每次购买使无限点数x2<br/>当前已购买了"+ getBuyableAmount('qa', 14) +"次<br/>效果：无限点数获取x"+format(buyableEffect('qa', 14))+'<br/>下一次花费 '+format(new Decimal(1e5).pow(n(getBuyableAmount('qa', 14)).add(1)))+' Monika点数'
                if (hasMilestone('E',8)) a = "每次购买使无限点数x(2^4)(无视软上限)<br/>当前已购买了"+ getBuyableAmount('qa', 14) +"次<br/>效果：无限点数获取x"+format(buyableEffect('qa', 14))+'<br/>下一次花费 '+format(new Decimal(1e5).pow(n(getBuyableAmount('qa', 14)).add(1)))+' Monika点数'
                return a
             },
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
        if(hasMilestone('df',1))a = "你有 <h3 style='color: #ab4308; text-shadow: 0 0 3px #c2b280'>" + format(player.qa.monika) + "</h3> Monika点数，使你的无限维度<h3 style='color: #ab4308; text-shadow: 0 0 3px #c2b280'> ^" +format(tmp.qa.monikatoidmult)+ "</h3>."
        a = a + "<br/>你有 <h3 style='color:#ab4308; text-shadow: 0 0 3px #c2b280'>" + format(player.qa.points) + "</h3> qaqe308, 每秒生产 <h3 style='color: #ab4308; text-shadow: 0 0 3px #c2b280'> " +format(tmp.qa.effect2)+ "</h3> Monika点数."
        return a
    },
    effect2() {a = player.qa.points.pow(2)
        if(hasMilestone('df',1)) a=n(2).pow(player.qa.points)
        a = a.times(buyableEffect('qa', 13))
        if (hasMilestone('I', 11)) a = a.times(2)
        if (hasChallenge('I', 25)) a = a.times(challengeEffect('I', 25))
        if (hasMilestone('I', 23)) a = a.times(77777)
        return a
    },
    monikatoidmult() {a = player.qa.monika.add(1).log(n(10).sub(buyableEffect('qa', 12))).add(1)
        if(hasMilestone('df',1)) a=a.pow(0.02)
        return a
    },
    effect(){
        a = n(2).pow(player.qa.points)
        if (hasMilestone('qa', 2)) a = n(3).pow(player.qa.points)
            if (hasMilestone('qa', 3)) a = n(10).pow(player.qa.points)
                if (a.gte(1e100)) a = a.div(1e100).pow(0.5).times(1e100)
            return a
      },
      effectDescription() { 
        if (hasMilestone('qa', 1)) {
            a = "使无限点数获取x"+format(tmp.qa.effect)
            if (tmp.qa.effect.gte(1e100)) a = a + '(受软上限限制)'
            if (hasMilestone('qa', 3)) a = a + '(无视IP软上限)'
        } else {
            a = "使无限点数获取x1.00"
        }
        return a
    },
    upg1effect2() {a = gba('qa', 11).times(0.005).add(1)
        return a
    },
    ptExp() {a = n(tmp.qa.upg1effect2)
	if (gcs('E', 51)==1) a = a.add(ce('E', 51))
    if (gcs('E', 62)==1) a = a.add(0.05)
    a = a.add(challengeEffect('E',21))
    if(hasAchievement('A3',85)) a=a.add(0.05)
    if(hasMilestone('E',103)) a=a.add(tmp.E.EcComp.div(4).floor().times(0.01))
    if(inChallenge('E',23)) a=n(1)
		return a
    }
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
        if(player.bx.points.gte(1)) a=n(2e308)
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
    deactivated(){return player.bx.points.gte(1)},
    directMult() { 
        mult = new Decimal(1)
        if(gcs('E',141)==1) mult = mult.times(1.5)
        return mult
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
        if (hasAchievement('A3',65))kept.push('milestones')
        if(resettingLayer == 'bx') kept = []
        layerDataReset(this.layer, kept)
           }
    },
    update(diff){

    },
    autoPrestige() {a = player.E.rgauto&&hasMilestone('E',19)&&!gcs('E',141)==1
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
        if(gcs('E',142)==1) a = a.pow(1.4)
        if(gcs('E',143)==1) a = a.pow(1.5)
        if(gcs('E',181)==1) a=a.pow(ce('E',181))
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
        timeshard: n(10),
        up: n(0),
        uptotal: n(0),
        upbybuy: n(0),
        upcost: n(0),
        slowtime: n(0),
        clicktime: n(0),
        repskillacttime:n(0),
        repskillcd:n(0),
    }},
    color: "#b743de",
    requires(){a = new Decimal(2).pow(1024)
        if(player.bx.points.gte(1)) a=n(2e308)
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
    deactivated(){return player.bx.points.gte(1)},
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "E: 进行永恒", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasAchievement('A2', 75)||hasAchievement('A3', 11)},
    branches: ['I'],
    microtabs: {
        stuff: {       
        "Milestones": {
            unlocked() {return true},
            content: ["milestones"]},
        "Upgrade Tree": {
            unlocked() {return hasMilestone('E',1)},
        content: [["buyables",[1]],"blank",
     ["display-text", () => "你有" + format(player.E.up) + "升级点数<br>你累计有" + format(player.E.uptotal) + "升级点数<br>("+format(player.E.upbybuy)+"购买+"+format(tmp.E.upbyach)+"成就奖励+"+format(tmp.E.upbydef)+"DeFe308奖励+"+format(tmp.E.upbyec)+"永恒挑战奖励+"+format(tmp.Qi.RGeffect2)+"超ReplicantiGalaxy奖励)"],
     ['row',[['clickable',11]]],"blank",
       ['row',[['clickable',21]]],"blank","blank","blank","blank","blank",
       ['row',[['clickable',31],"blank",['clickable',32]]],"blank","blank","blank","blank","blank",
       ['row',[['clickable',41]]],"blank","blank","blank","blank","blank",
       ['row',[['clickable',51],"blank",['clickable',52]]],"blank","blank","blank","blank","blank",
       ['row',[['clickable',61],"blank",['clickable',62]]],"blank","blank","blank","blank","blank",
       ['row',[['clickable',71],'blank',['clickable',72],'blank',['clickable',73]]],"blank","blank","blank","blank","blank",
       ['row',[['clickable',81],'blank',['clickable',82],'blank',['clickable',83]]],"blank","blank","blank","blank","blank",
       ['row',[['clickable',91],'blank',['clickable',92],'blank',['clickable',93]]],"blank","blank","blank","blank","blank",
       ['row',[['clickable',101],'blank',['clickable',102],'blank',['clickable',103]]],"blank","blank","blank","blank","blank",
       ['row',[['clickable',111],'blank',['clickable',112],'blank',['clickable',113]]],"blank","blank","blank","blank","blank",
       ['row',[['clickable',121]]],"blank","blank","blank","blank","blank",
       ['row',[['clickable',131],'blank',['clickable',132],'blank',['clickable',133]]],"blank","blank","blank","blank","blank",
       ['row',[['clickable',144],'blank',['clickable',141],'blank',['clickable',142],'blank',['clickable',143],"blank",['clickable',145]]],"blank","blank","blank","blank",
       ['row',[['clickable',151],'blank',['clickable',152],'blank',['clickable',153]]],"blank","blank","blank","blank","blank",
       ['row',[['clickable',161]]],"blank","blank","blank","blank","blank",
       ['row',[['clickable',171],'blank',['clickable',172],'blank',['clickable',173]]],"blank","blank","blank","blank","blank",
       ['row',[['clickable',181]]],"blank","blank","blank","blank","blank",
       ['row',[['clickable',191],'blank',['clickable',192],'blank',['clickable',193],'blank',['clickable',194]]],"blank","blank","blank","blank","blank",
       ['row',[['clickable',201]]],"blank","blank","blank","blank","blank",
       //tabf
        ],
    },
        "Time Dimensions": {
            unlocked() {return gcs('E', 21)},
            content: [ ["display-text", () => "你永恒了"+format(player.E.etr)+"次，使时间维度x"+format(tmp.E.etrtotdmult)+
            "<br>你有"
            +format(player.E.timeshard)+"时间碎片，使游戏速度x log<sub>"+format(tmp.E.tsbase)+"</sub>"+format(player.E.timeshard)+"="+format(tmp.E.TSeffect)
            +"<br>你当前正在生产"+format(player.E.td1.times(tmp.E.td1mult))+"时间碎片每秒"],
            ["buyables", [2]]]}, 
        "Slowdown": {
            unlocked() {return hasMilestone('E', 4)},
            content: [ ["display-text", () => "你进行了"+format(player.E.slowtime)+"次减速，使时间维度x"+format(tmp.E.slowtotdmult)+
            "<br>每次减速会使游戏速度/10，并使时间维度x5<br>游戏速度大于10时可以减速"],
            ['clickable',501],['clickable',502]]}, 
            "Eternity Challenges": {
                unlocked() {return hasAchievement('A3', 52)},
                content: [ ["display-text", () => "你完成了"+format(tmp.E.EcComp)+"个永恒挑战，给予"+format(tmp.E.upbyec)+"个额外的升级点数<br>永恒挑战只有解锁后才会显示，每个永恒挑战最多可以完成5次<br>已完成过且未解锁的永恒挑战信息将在下面显示：<br>"],
                ["display-text", () => tmp.E.ectext],
                ["challenges", [1,2,3]]]}, 
        },
        
      },
    doReset(resettingLayer) {
        if(resettingLayer == 'E'&&player.I.points.gte(n(2).pow(1024))) player.E.etr = player.E.etr.add(1)
        if (resettingLayer == 'E') {player.E.timeshard = n(10)
            player.E.td1 = gba('E', 21)
        player.E.td2 = gba('E', 22)
        player.E.td3 = gba('E', 23)
        player.E.td4 = gba('E', 24)
        player.E.td5 = gba('E', 25)
        player.E.td6 = gba('E', 26)
        player.E.td7 = gba('E', 27)
        player.E.td8 = gba('E', 28)
        player.devSpeed = n(0)
        player.E.slowtime = n(0)
        }
        if(resettingLayer == 'bx') layerDataReset(this.layer,[])
    },
    update(diff){
        player.E.upbybuy=n(gba('E', 11)).add(gba('E', 12)).add(gba('E', 13))
        player.E.uptotal=player.E.upbybuy.add(tmp.E.upbyach).add(tmp.E.upbydef).add(tmp.E.upbyec).add(tmp.Qi.RGeffect2)
        player.E.up=player.E.uptotal.sub(player.E.upcost)
        //if (getBuyableAmount(this.layer, 28).gte(1)) player.E.td7 = player.E.td7.add(player.E.td8.times(tmp.E.td8mult).times(diff).div(player.devSpeed))
        //if (getBuyableAmount(this.layer, 27).gte(1)) player.E.td6 = player.E.td6.add(player.E.td7.times(tmp.E.td7mult).times(diff).div(player.devSpeed))
        //if (getBuyableAmount(this.layer, 26).gte(1)) player.E.td5 = player.E.td5.add(player.E.td6.times(tmp.E.td6mult).times(diff).div(player.devSpeed))
        //if (getBuyableAmount(this.layer, 25).gte(1)) player.E.td4 = player.E.td4.add(player.E.td5.times(tmp.E.td5mult).times(diff).div(player.devSpeed))
        if (getBuyableAmount(this.layer, 24).gte(1)&&player.devSpeed.gt(0)) player.E.td3 = player.E.td3.add(player.E.td4.times(tmp.E.td4mult).times(diff).div(player.devSpeed))
        if (getBuyableAmount(this.layer, 23).gte(1)&&player.devSpeed.gt(0)) player.E.td2 = player.E.td2.add(player.E.td3.times(tmp.E.td3mult).times(diff).div(player.devSpeed))
        if (getBuyableAmount(this.layer, 22).gte(1)&&player.devSpeed.gt(0)) player.E.td1 = player.E.td1.add(player.E.td2.times(tmp.E.td2mult).times(diff).div(player.devSpeed))
        if (getBuyableAmount(this.layer, 21).gte(1)&&player.devSpeed.gt(0)) player.E.timeshard = player.E.timeshard.add(player.E.td1.times(tmp.E.td1mult).times(diff).div(player.devSpeed))
        if (canReset(this.layer)&&hasMilestone('E',16)&&player.E.etrauto==true) doReset(this.layer)
        if(player.devSpeed.neq(0)) {if(player.E.repskillacttime.gt(0)) player.E.repskillacttime =player.E.repskillacttime.sub(n(diff).div(player.devSpeed))
            if(player.E.repskillacttime.lt(0)) {player.E.repskillacttime =n(0)
                player.E.repskillcd=n(tmp.I.skillcd)
            }
            if(player.E.repskillcd.gt(0)) player.E.repskillcd =player.E.repskillcd.sub(n(diff).div(player.devSpeed)).max(0)
         }
    },
    passiveGeneration()
    {
        mult = 0
        return mult
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        ['clickable',511],
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
            done() { return player.E.etr.gte(2) },
            toggles:[["E", "IPmultauto"]]
        },
        2: {
            requirementDescription: "3次永恒",
            effectDescription() {return "无限层级所有普通挑战目标为0"},
            done() { return player.E.etr.gte(3) }
        },
        3: {
            requirementDescription: "4次永恒",
            effectDescription() {return "永恒后保留所有一级成就，且每次永恒以256次无限开始"},
            done() { return player.E.etr.gte(4) }
        },
        4: {
            requirementDescription: "5次永恒",
            effectDescription() {return "解锁“减速”功能"},
            done() { return player.E.etr.gte(5) }
        },
        5: {
            requirementDescription: "6次永恒",
            effectDescription() {return "解锁其他自动打破无限可购买购买器（5个），购买打破无限可购买不消耗无限点数"},
            done() { return player.E.etr.gte(6) },
            toggles:[["E", "scnerfauto"],["E", "ipowauto"],["E", "scnerf2auto"],["E", "scnerf3auto"],["E", "ipexpauto"]]
        },
        6: {
            requirementDescription: "7次永恒",
            effectDescription() {return "解锁第1~4无限维度自动购买器，购买无限维度不消耗无限点数"},
            done() { return player.E.etr.gte(7) },
            toggles:[["E", "id1auto"],["E", "id2auto"],["E", "id3auto"],["E", "id4auto"]]
        },
        7: {
            requirementDescription: "8次永恒",
            effectDescription() {return "解锁第5~8无限维度自动购买器"},
            done() { return player.E.etr.gte(8) },
            toggles:[["E", "id5auto"],["E", "id6auto"],["E", "id7auto"],["E", "id8auto"]]
        },
        8: {
            requirementDescription: "9次永恒",
            effectDescription() {return "Monika升级太弱了，我给你加强一下"},
            done() { return player.E.etr.gte(9) },
        },
        9: {
            requirementDescription: "10次永恒",
            effectDescription() {return "解锁无限升级自动购买器"},
            done() { return player.E.etr.gte(10) },
            toggles:[["E", "infupgauto"]]
        },
        10: {
            requirementDescription: "11次永恒",
            effectDescription() {return "解锁黑洞相关的可购买自动购买器，购买相关可购买不消耗无限点数"},
            done() { return player.E.etr.gte(11) },
            toggles:[["E", "bhupg1auto"],["E", "bhupg2auto"],["E", "bhupg3auto"]]
        },
        11: {
            requirementDescription: "12次永恒",
            effectDescription() {return "永恒后保留所有点数里程碑"},
            done() { return player.E.etr.gte(12) },
        },
        12: {
            requirementDescription: "13次永恒",
            effectDescription() {return "解锁复制器相关的可购买自动购买器，购买相关可购买不消耗无限点数"},
            done() { return player.E.etr.gte(13) },
            toggles:[["E", "repupg1auto"],["E", "repupg2auto"],["E", "repupg3auto"]]
        },
        13: {
            requirementDescription: "14次永恒",
            effectDescription() {return "永恒后保留所有无限挑战与二级成就"},
            done() { return player.E.etr.gte(14) },
        },
        14: {
            requirementDescription: "15次永恒",
            effectDescription() {return "解锁qaqe308自动重置器"},
            done() { return player.E.etr.gte(15) },
            toggles:[["E", "qaqe308auto"]]
        },
        15: {
            requirementDescription: "16次永恒",
            effectDescription() {return "打破永恒，允许你获得超过1.79e308无限点数，并解锁无限点数里程碑（3个）"},
            done() { return player.E.etr.gte(16) },
        },
        16: {
            requirementDescription: "100次永恒",
            effectDescription() {return "解锁自动永恒"},
            done() { return player.E.etr.gte(100) },
            toggles:[["E", "etrauto"]]
        },
        17: {
            requirementDescription: "1e365无限点数",
            effectDescription() {return "解锁QqQeInfinity超ReplicantiGalaxy的功能"},
            done() { return player.I.points.gte('1e365') },
            unlocked() {return player.E.etr.gte(16)}
        },
        18: {
            requirementDescription: "1e400无限点数",
            effectDescription() {return "qaqe308不重置任何东西，解锁monika升级自动购买器"},
            done() { return player.I.points.gte('1e400') },
            toggles:[["E", "moupg1auto"],["E", "moupg2auto"],["E", "moupg3auto"],["E", "moupg4auto"]],
            unlocked() {return player.E.etr.gte(16)}
        },
        19: {
            requirementDescription: "1e450无限点数",
            effectDescription() {return "解锁ReplicantiGalaxy自动重置器"},
            done() { return player.I.points.gte('1e450') },
            toggles:[["E", "rgauto"]],
            unlocked() {return player.E.etr.gte(16)}
        },
        101: {
            requirementDescription: "2永恒挑战完成次数",
            effectDescription() {return "永恒不重置无限前的所有挑战与里程碑"},
            done() { return tmp.E.EcComp.gte(2) },
            unlocked() {return tmp.E.EcComp.gte(1)}
        },
        102: {
            requirementDescription: "10永恒挑战完成次数",
            effectDescription() {return "允许QqQeInfinity同时超所有人"},
            done() { return tmp.E.EcComp.gte(10) },
            unlocked() {return tmp.E.EcComp.gte(1)}
        },
        103: {
            requirementDescription: "20永恒挑战完成次数",
            effectDescription() {return "每4个永恒挑战完成次数使点数指数+0.01"},
            done() { return tmp.E.EcComp.gte(20) },
            unlocked() {return tmp.E.EcComp.gte(1)}
        },
        104: {
            requirementDescription: "24永恒挑战完成次数",
            effectDescription() {return "最大化重置cokecole并大幅提升其获取量，cokecole的效果无上限"},
            done() { return tmp.E.EcComp.gte(24) },
            unlocked() {return tmp.E.EcComp.gte(1)}
        },
    },
    buyables: {
        13: {
            a() { 
             let a=n(2)
             return a},
             cost() {
             let b=gba(this.layer, this.id)
             cost=this.a().pow(b)
            return cost
            },
            title(){return "升级点数 III"},
            display() { return "你可以用永恒点数购买升级点数购买“升级”<br>价格："+format(this.cost())+"永恒点数<br>数量："+format(gba(this.layer, this.id))},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                
                setBuyableAmount(this.layer, this.id, gba(this.layer, this.id).add(1))
            },
            //buyMax() {
					//if (!this.canAfford()) return;
					//let tempBuy = player.r.points.log(this.a())
					//let target = tempBuy.plus(1).floor();
					//player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target)
				//},
            unlocked() {return hasMilestone('E',1)},
            style: {'height':'100px'},
        },
        11: {
            a() {let a=n("1e100000")
             return a
            },
            cost() {
             cost = this.a().mul(n("1e50000").pow(gba(this.layer, this.id).pow(1.25)))
            if (n(challengeCompletions('E',11)).gte(1)) cost = cost.pow(challengeEffect('E',11))
                return cost
            },
            title(){return "升级点数 I"},
            display() { return "你可以用点数购买升级点数购买“升级”<br>价格："+format(this.cost())+" 点数<br>数量："+format(gba(this.layer, this.id))},
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, gba(this.layer, this.id).add(1))
            },
            //buyMax() {
					//if (!this.canAfford()) return;
					//let tempBuy = player.points.div(this.a()).log("e50000").root(1.25)
					//let target = tempBuy.plus(1).floor();
					//player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target)
				//},
            unlocked() {return hasMilestone('E',1)},
            style: {'height':'100px'},
        },
        12: {
            a() {
             let a=n(2)
             //if(hasUpgrade('sp',53)) a=n(3)
             //if(hasUpgrade('ri',32)) a=n(8)
             return a},
            cost() { return n(1e100).pow(gba(this.layer,this.id).add(1)) },
            title(){return "升级点数 II"},
            display() { return "你可以用无限点数购买升级点数购买“升级”<br>价格："+format(this.cost())+" 无限点数<br>数量："+format(gba(this.layer, this.id))},
            canAfford() { return player.I.points.gte(this.cost()) },
            buy() {
                player.I.points = player.I.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            //buyMax() {
					//if (!this.canAfford()) return;
					//let tempBuy = player.mi.points.log(10).root(2).sub(20).mul(this.a())
					//let target = tempBuy.plus(1).floor();
					//player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target)
				//},
            unlocked() {return hasMilestone('E',1)},
            style: {'height':'100px'},
        },
        21: {
            cost(x) { return new Decimal(3).pow(x) },
            title: '第一时间维度',
            display() { return "花费："+format(this.cost())+"永恒点数<br>维度倍率：x"+format(tmp.E.td1mult)+"<br>当前数量："+format(player.E.td1)+"<br>已购买了"+format(getBuyableAmount(this.layer, this.id))+"次"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.E.td1 = player.E.td1.add(1)
            },
        },
        22: {
            cost(x) { return n(9).pow(x).times(5) },
            title: '第二时间维度',
            display() { return "花费："+format(this.cost())+"永恒点数<br>维度倍率：x"+format(tmp.E.td2mult)+"<br>当前数量："+format(player.E.td2)+"<br>已购买了"+format(getBuyableAmount(this.layer, this.id))+"次"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.E.td2 = player.E.td2.add(1)
            },
        },
        23: {
            cost(x) { return new Decimal(27).pow(x).times(100) },
            title: '第三时间维度',
            display() { return "花费："+format(this.cost())+"永恒点数<br>维度倍率：x"+format(tmp.E.td3mult)+"<br>当前数量："+format(player.E.td3)+"<br>已购买了"+format(getBuyableAmount(this.layer, this.id))+"次"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.E.td3 = player.E.td3.add(1)
            },
        },
        24: {
            cost(x) { return new Decimal(81).pow(x).times(1000) },
            title: '第四时间维度',
            display() { return "花费："+format(this.cost())+"永恒点数<br>维度倍率：x"+format(tmp.E.td4mult)+"<br>当前数量："+format(player.E.td4)+"<br>已购买了"+format(getBuyableAmount(this.layer, this.id))+"次"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.E.td4 = player.E.td4.add(1)
            },
        },
    },
    clickables:{       
    11: {//rot11
           title(){return "reset"},
           display: "点击重置升级树并且退还升级点数(升级11不能被重置)<br>注意：会强制进行一次永恒重置！",
          canClick() {return true},
          tooltip() {
           //if(layers.r.inChal()) return "在挑战中不能重置升级树！"
           },
           onClick() {
            //setClickableState("E",21,0)
            doReset('E',true)
            setClickableState("E",31,0)
            setClickableState("E",32,0)
            setClickableState("E",41,0)
            setClickableState("E",51,0)
            setClickableState("E",52,0)
            setClickableState("E",61,0)
            setClickableState("E",62,0)
            setClickableState("E",71,0)
            setClickableState("E",73,0)
            setClickableState("E",72,0)
            setClickableState("E",81,0)
            setClickableState("E",82,0)
            setClickableState("E",83,0)
            setClickableState("E",91,0)
            setClickableState("E",92,0)
            setClickableState("E",93,0)
            setClickableState("E",101,0)
            setClickableState("E",102,0)
            setClickableState("E",103,0)
            setClickableState("E",111,0)
            setClickableState("E",112,0)
            setClickableState("E",113,0)
            setClickableState("E",121,0)
            setClickableState("E",131,0)
            setClickableState("E",132,0)
            setClickableState("E",133,0)
            setClickableState("E",141,0)
            setClickableState("E",142,0)
            setClickableState("E",143,0)
            setClickableState("E",144,0)
            setClickableState("E",145,0)
            setClickableState("E",151,0)
            setClickableState("E",152,0)
            setClickableState("E",153,0)
            setClickableState("E",161,0)
            setClickableState("E",171,0)
            setClickableState("E",172,0)
            setClickableState("E",173,0)
            setClickableState("E",181,0)
            setClickableState("E",191,0)
            setClickableState("E",192,0)
            setClickableState("E",193,0)
            setClickableState("E",194,0)
            setClickableState("E",201,0)
            doReset("E")
            player.E.upcost=n(0).add(n(gcs('E', 21)))
           },
            unlocked(){return hasMilestone('E',1)},
        },
    21: {
           title(){return "11" },
           display() {return "解锁新的维度<br>价格: 1 升级点数"},
           tooltip() {
           return "购买要求: 无<br>这里的代码都是抄QqQe308的音乐游戏树的"
           },
   style() { return { 'background-color': getClickableState('E',21)==1?"#b743de":layers.E.clickables[this.id].canClick()?"#d8ade6":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',21)==1) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(1)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(1)
           },
            unlocked(){return hasMilestone('E',1)},
        },
    31: {
           title(){return "21" },
           display() {return "时间碎片以削弱的效果加快QqQeInfinity超人的速度<br>当前：x"+format(this.effect())+"<br>价格: 2 升级点数"},
           effect() {a = player.E.timeshard.add(10).log(10).pow(0.5)
            return a
           },
           tooltip() {
           return "购买要求: 11"
           },
   style() { return { 'background-color': getClickableState('E',31)==1?"#b743de":layers.E.clickables[this.id].canClick()?"#d8ade6":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',31)==1||!gcs('E', 21)==1) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(2)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(2)
           },
           branches(){return ["21"]},
            unlocked(){return hasMilestone('E',1)},
        },
    32: {
           title(){return "22" },
           display() {return "时间碎片以削弱的效果推迟复制器软上限出现<br>当前：x"+format(this.effect())+"<br>价格: 2 升级点数"},
           effect() {a = player.E.timeshard.add(10).log(10).log(10).add(1)
            return a
           },
           tooltip() {
           return "购买要求: 11"
           },
   style() { return { 'background-color': getClickableState('E',32)==1?"#b743de":layers.E.clickables[this.id].canClick()?"#d8ade6":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',32)==1||!gcs('E', 21)==1) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(2)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(2)
           },
           branches(){return ["21"]},
            unlocked(){return hasMilestone('E',1)},
        },
        41: {
           title(){return "31" },
           display() {return "游戏速度以削弱的效果加强时间维度<br>当前：x"+format(this.effect())+"<br>价格: 2 升级点数"},
           effect() {a = player.devSpeed.add(1).log(10).add(1)
            return a
           },
           tooltip() {
           return "购买要求: 21|22"
           },
   style() { return { 'background-color': getClickableState('E',41)==1?"#b743de":layers.E.clickables[this.id].canClick()?"#d8ade6":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',41)==1||(!gcs('E', 31)==1&&!gcs('E', 32)==1)) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(2)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(2)
           },
           branches(){return ["31","32"]},
            unlocked(){return hasMilestone('E',1)},
        },
        51: {
           title(){return "41" },
           display() {return "基于QqQe308数量增加点数获取的指数<br>当前：+"+format(this.effect())+"<br>价格: 6 升级点数"},
           effect() {a = max(player.Q.points.pow(0.005).sub(1),n(0))
            return a
           },
           tooltip() {
           return "购买要求: 31"
           },
   style() { return { 'background-color': getClickableState('E',51)==1?"#b743de":layers.E.clickables[this.id].canClick()?"#d8ade6":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',51)==1||(!gcs('E', 41)==1)) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(6)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(6)
           },
           branches(){return ["41"]},
            unlocked(){return hasMilestone('E',1)},
        },
        52: {
           title(){return "EC4" },
           display() {return "解锁永恒挑战4<br>价格: 25 升级点数"},
           tooltip() {
           return "购买要求: 41"
           },
   style() { return { 'background-color': getClickableState('E',this.id)==1?"#d8ade6":layers.E.clickables[this.id].canClick()?"#d8bee6ff":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',this.id)==1||(!gcs('E', 51)==1)) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(25)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(25)
           },
           branches(){return ["51"]},
            unlocked(){return hasMilestone('E',1)},
        },
        61: {
           title(){return "51" },
           display() {return "获得1e10倍的无限点数（无视软上限）<br>价格: 4 升级点数"},
           tooltip() {
           return "购买要求: 41"
           },
   style() { return { 'background-color': getClickableState('E',61)==1?"#b743de":layers.E.clickables[this.id].canClick()?"#d8ade6":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',61)==1||(!gcs('E', 51)==1)) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(4)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(4)
           },
           branches(){return ["51"]},
            unlocked(){return hasMilestone('E',1)},
        },
        62: {
           title(){return "52" },
           display() {return "点数获取指数增加0.05<br>价格: 5 升级点数"},
           tooltip() {
           return "购买要求: 51"
           },
   style() { return { 'background-color': getClickableState('E',62)==1?"#b743de":layers.E.clickables[this.id].canClick()?"#d8ade6":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',62)==1||(!gcs('E', 61)==1)) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(5)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(5)
           },
           branches(){return ["61"]},
            unlocked(){return hasMilestone('E',1)},
        },
        71: {
           title(){return "61 pre-Infinity" },
           display() {return "“点数翻倍”可购买可以被无限购买，其效果的0.05次方无视软上限<br>当前：x"+format(this.effect())+"<br>价格: 2 升级点数"},
           effect() {a = max(buyableEffect('T', 11).pow(0.05),n(1))
            return a
           },
           tooltip() {
           return "购买要求: 51&&!62&&!63"
           },
   style() { return { 'background-color': getClickableState('E',71)==1?"#4db123":layers.E.clickables[this.id].canClick()?"#4bd123":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',71)==1||(!gcs('E', 61)==1)||gcs('E', 73)==1||gcs('E', 72)==1) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(2)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(2)
           },
           branches(){return ["61"]},
            unlocked(){return hasMilestone('E',1)},
        },
        81: {
           title(){return "71 pre-Infinity" },
           display() {return "压缩时间墙层级点数加成可购买效果的0.25次方无视软上限<br>当前：x"+format(this.effect())+"<br>价格: 3 升级点数"},
           effect() {a = max(buyableEffect('CT', 11).times(buyableEffect('CT', 12)).times(buyableEffect('CT', 13)).pow(0.25),n(1))
            return a
           },
           tooltip() {
           return "购买要求: 61"
           },
   style() { return { 'background-color': getClickableState('E',81)==1?"#4db123":layers.E.clickables[this.id].canClick()?"#4bd123":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',81)==1||(!gcs('E', 71)==1)) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(3)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(3)
           },
           branches(){return ["71"]},
            unlocked(){return hasMilestone('E',1)},
        },
        91: {
           title(){return "81 pre-Infinity" },
           display() {return "基于QqQeInfinity数量加成点数，无视软上限<br>当前：x"+format(this.effect())+"<br>价格: 3 升级点数"},
           effect() {a = n(1e100).pow(player.Qi.points)
            return a
           },
           tooltip() {
           return "购买要求: 71"
           },
   style() { return { 'background-color': getClickableState('E',91)==1?"#4db123":layers.E.clickables[this.id].canClick()?"#4bd123":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',91)==1||(!gcs('E', 81)==1)) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(3)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(3)
           },
           branches(){return ["81"]},
            unlocked(){return hasMilestone('E',1)},
        },
        101: {
           title(){return "91 pre-Infinity" },
           display() {return "基于二重压缩时间墙加成点数，无视软上限<br>当前：x"+format(this.effect())+"<br>价格: 3 升级点数"},
           effect() {a = max(player.DC.points.pow(8),n(1))
            return a
           },
           tooltip() {
           return "购买要求: 81"
           },
   style() { return { 'background-color': getClickableState('E',101)==1?"#4db123":layers.E.clickables[this.id].canClick()?"#4bd123":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',101)==1||(!gcs('E', 91)==1)) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(3)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(3)
           },
           branches(){return ["91"]},
            unlocked(){return hasMilestone('E',1)},
        },
        111: {
           title(){return "EC1" },
           display() {return "解锁永恒挑战1<br>价格: 1 升级点数"},
           tooltip() {
           return "购买要求: 91"
           },
   style() { return { 'background-color': getClickableState('E',111)==1?"#d8ade6":layers.E.clickables[this.id].canClick()?"#d8bee6ff":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',111)==1||(!gcs('E', 101)==1)) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(1)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(1)
           },
           branches(){return ["101"]},
            unlocked(){return hasMilestone('E',1)},
        },
        72: {
           title(){return "62 Infinity" },
           display() {return "无限之力给点数加成的0.025次方无视软上限<br>当前：x"+format(this.effect())+"<br>价格: 3 升级点数"},
           effect() {a = max(player.I.ipower.pow(0.025),n(1))
            if( a.gte('1e100000'))a = powsoftcap(a,n('1e100000'),4)
            if(a.gte('e1000000'))a=n('e1000000')
            return a
           },
           tooltip() {
           return "购买要求: 51&&!61&&!63<br>本升级软上限：1e100000<br>硬上限：e1000000"
           },
   style() { return { 'background-color': getClickableState('E',72)==1?"#b67f33":layers.E.clickables[this.id].canClick()?"#b69f33":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',72)==1||(!gcs('E', 61)==1)||gcs('E', 71)==1||gcs('E', 73)==1) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(3)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(3)
           },
           branches(){return ["61"]},
            unlocked(){return hasMilestone('E',1)},
        },
        82: {
           title(){return "72 Infinity" },
           display() {return "基于无限点数增加点数获取，无视软上限<br>当前：x"+format(this.effect())+"<br>价格: 4 升级点数"},
           effect() {a = max(player.I.points.pow(25),n(1))
            return a
           },
           tooltip() {
           return "购买要求: 62"
           },
   style() { return { 'background-color': getClickableState('E',82)==1?"#b67f33":layers.E.clickables[this.id].canClick()?"#b69f33":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',82)==1||(!gcs('E', 72)==1)) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(4)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(4)
           },
           branches(){return ["72"]},
            unlocked(){return hasMilestone('E',1)},
        },
        92: {
           title(){return "82 Infinity" },
           display() {return "基于无限次数增加点数获取，无视软上限<br>当前：x"+format(this.effect())+"<br>价格: 3 升级点数"},
           effect() {a = max(player.I.inf.pow(5000),n(1))
            return a
           },
           tooltip() {
           return "购买要求: 72"
           },
   style() { return { 'background-color': getClickableState('E',92)==1?"#b67f33":layers.E.clickables[this.id].canClick()?"#b69f33":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',92)==1||(!gcs('E', 82)==1)) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(3)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(3)
           },
           branches(){return ["82"]},
            unlocked(){return hasMilestone('E',1)},
        },
        102: {
           title(){return "92 Infinity" },
           display() {return "基于无限次数增加复制器复制速度中的x值<br>当前：x"+format(this.effect())+"<br>价格: 4 升级点数"},
           effect() {a = max(player.I.inf.pow(0.05),n(1))
            return a
           },
           tooltip() {
           return "购买要求: 82"
           },
   style() { return { 'background-color': getClickableState('E',102)==1?"#b67f33":layers.E.clickables[this.id].canClick()?"#b69f33":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',102)==1||(!gcs('E', 92)==1)) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(4)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(4)
           },
           branches(){return ["92"]},
            unlocked(){return hasMilestone('E',1)},
        },
        112: {
           title(){return "EC2" },
           display() {return "解锁永恒挑战2<br>价格: 2 升级点数"},
           tooltip() {
           return "购买要求: 92"
           },
   style() { return { 'background-color': getClickableState('E',112)==1?"#d8ade6":layers.E.clickables[this.id].canClick()?"#d8bee6ff":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',112)==1||(!gcs('E', 102)==1)) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(2)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(2)
           },
           branches(){return ["102"]},
            unlocked(){return hasMilestone('E',1)},
        },
        73: {
           title(){return "63 Eternity" },
           display() {return "基于总升级点数加成点数，无视软上限<br>当前：x"+format(this.effect())+"<br>价格: 3 升级点数"},
           effect() {a = max(player.E.uptotal.pow(10000),n(1))
            return a
           },
           tooltip() {
           return "购买要求: 51&&!61&&!62"
           },
   style() { return { 'background-color': getClickableState('E',73)==1?"#b743de":layers.E.clickables[this.id].canClick()?"#d8ade6":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',73)==1||(!gcs('E', 61)==1)||gcs('E', 71)==1||gcs('E', 72)==1) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(3)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(3)
           },
           branches(){return ["61"]},
            unlocked(){return hasMilestone('E',1)},
        },
        83: {
           title(){return "73 Eternity" },
           display() {return "基于永恒次数加成点数，无视软上限<br>当前：x"+format(this.effect())+"<br>价格: 4 升级点数"},
           effect() {a = max(player.E.etr.pow(8888),n(1))
            return a
           },
           tooltip() {
           return "购买要求: 63"
           },
   style() { return { 'background-color': getClickableState('E',83)==1?"#b743de":layers.E.clickables[this.id].canClick()?"#d8ade6":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',83)==1||(!gcs('E', 73)==1)) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(4)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(4)
           },
           branches(){return ["73"]},
            unlocked(){return hasMilestone('E',1)},
        },
        93: {
           title(){return "83 Eternity" },
           display() {return "基于永恒次数加成游戏速度<br>当前：x"+format(this.effect())+"<br>价格: 4 升级点数"},
           effect() {a = min(player.E.etr.times(0.5).pow(0.75),n(100000))
            return a
           },
           tooltip() {
           return "购买要求: 73<br>硬上限：100000"
           },
   style() { return { 'background-color': getClickableState('E',93)==1?"#b743de":layers.E.clickables[this.id].canClick()?"#d8ade6":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',93)==1||(!gcs('E', 83)==1)) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(4)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(4)
           },
           branches(){return ["83"]},
            unlocked(){return hasMilestone('E',1)},
        },
        103: {
           title(){return "93 Eternity" },
           display() {return "基于复制器加成时间维度<br>当前：x"+format(this.effect())+"<br>价格: 4 升级点数"},
           effect() {a = max(player.I.rep.pow(0.25),n(1))
            if(a.gte(1e100)) a=n(1e100)
            return a
           },
           tooltip() {
           return "购买要求: 83<br>硬上限：1e100"
           },
   style() { return { 'background-color': getClickableState('E',103)==1?"#b743de":layers.E.clickables[this.id].canClick()?"#d8ade6":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',103)==1||(!gcs('E', 93)==1)) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(4)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(4)
           },
           branches(){return ["93"]},
            unlocked(){return hasMilestone('E',1)},
        },
        113: {
           title(){return "EC3" },
           display() {return "解锁永恒挑战3<br>价格: 3 升级点数"},
           tooltip() {
           return "购买要求: 93"
           },
   style() { return { 'background-color': getClickableState('E',this.id)==1?"#d8ade6":layers.E.clickables[this.id].canClick()?"#d8bee6ff":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',113)==1||(!gcs('E', 103)==1)) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(3)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(3)
           },
           branches(){return ["103"]},
            unlocked(){return hasMilestone('E',1)},
        },
        121: {
           title(){return "101" },
           display() {return "点数四重软上限指数与无限点数gainExp增加0.20<br>价格: 10 升级点数"},
           tooltip() {
           return "购买要求: EC1&&EC2&&EC3&&(91||92||93)"
           },
   style() { return { 'background-color': getClickableState('E',this.id)==1?"#b743de":layers.E.clickables[this.id].canClick()?"#d8ade6":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',this.id)==1||(!n(cc('E',11)).gte(1)||!n(cc('E',12)).gte(1)||!n(cc('E',13)).gte(1))||(!gcs('E', 101)==1&&!gcs('E', 102)==1&&!gcs('E', 103)==1)) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(10)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(10)
           },
           branches(){return ["111",'112','113']},
            unlocked(){return hasMilestone('E',1)},
        },
        131: {
           title(){return "111 Active" },
           display() {return "无限点数directMult x1e50,但是随本次永恒时间降低<br>当前：x"+format(this.effect())+"<br>价格: 4 升级点数"},
           tooltip() {
           return "购买要求: 101&&!112&&!113"
           },
           effect() {a = max(n(1e50).div(n(player.E.resetTime).add(1).pow(2)),n(1))
            return a
           },
   style() { return { 'background-color': getClickableState('E',this.id)==1?"#ff0000":layers.E.clickables[this.id].canClick()?"#e18686ff":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',this.id)==1||!gcs('E', 121)==1||gcs('E', 132)==1||gcs('E', 133)==1) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(4)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(4)
           },
           branches(){return ["121"]},
            unlocked(){return hasMilestone('E',1)},
        },
        141: {
           title(){return "121 Active" },
           display() {return "获得1.5倍的ReplicantiGalaxy,但是ReplicantiGalaxy自动购买器被禁用<br>价格: 6 升级点数"},
           tooltip() {
           return "购买要求: 111"
           },
   style() { return { 'background-color': getClickableState('E',this.id)==1?"#ff0000":layers.E.clickables[this.id].canClick()?"#e18686ff":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',this.id)==1||!gcs('E', 131)==1) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(6)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(6)
           },
           branches(){return ["131"]},
            unlocked(){return hasMilestone('E',1)},
        },
        151: {
           title(){return "131 Active" },
           display() {return "点数获取x1e30000(无视软上限),但是随本次永恒时间降低<br>当前：x"+format(this.effect())+"<br>价格: 6 升级点数"},
           tooltip() {
           return "购买要求: 121"
           },
           effect() {a = max(n('1e30000').div(n(player.E.resetTime).add(1).pow(1000)),n(1))
            return a
           },
   style() { return { 'background-color': getClickableState('E',this.id)==1?"#ff0000":layers.E.clickables[this.id].canClick()?"#e18686ff":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',this.id)==1||!gcs('E', 141)==1) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(6)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(6)
           },
           branches(){return ["141"]},
            unlocked(){return hasMilestone('E',1)},
        },
        144: {
           title(){return "EC5" },
           display() {return "解锁永恒挑战5<br>价格: 10 升级点数"},
           tooltip() {
           return "购买要求: 111"
           },
   style() { return { 'background-color': getClickableState('E',this.id)==1?"#d8ade6":layers.E.clickables[this.id].canClick()?"#d8bee6ff":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',this.id)==1||(!gcs('E', 131)==1)) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(10)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(10)
           },
           branches(){return ["131"]},
            unlocked(){return hasMilestone('E',1)},
        },
        132: {
           title(){return "112 Passive" },
           display() {return "无限点数directMult x1e30<br>当前：x"+format(this.effect())+"<br>价格: 4 升级点数"},
           tooltip() {
           return "购买要求: 101&&!111&&!113"
           },
           effect() {a = n(1e30)
            return a
           },
   style() { return { 'background-color': getClickableState('E',this.id)==1?"#5e33b6":layers.E.clickables[this.id].canClick()?"#7d5ebaff":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',this.id)==1||!gcs('E', 121)==1||gcs('E', 131)==1||gcs('E', 133)==1) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(4)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(4)
           },
           branches(){return ["121"]},
            unlocked(){return hasMilestone('E',1)},
        },
        142: {
           title(){return "122 Passive" },
           display() {return "ReplicantiGalaxy的效果^1.4，复制器复制速度中a值x1.5<br>价格: 6 升级点数"},
           tooltip() {
           return "购买要求: 112"
           },
   style() { return { 'background-color': getClickableState('E',this.id)==1?"#5e33b6":layers.E.clickables[this.id].canClick()?"#7d5ebaff":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',this.id)==1||!gcs('E', 132)==1) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(6)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(6)
           },
           branches(){return ["132"]},
            unlocked(){return hasMilestone('E',1)},
        },
        152: {
           title(){return "132 Passive" },
           display() {return "点数获取x1e15000，无视软上限<br>当前：x"+format(this.effect())+"<br>价格: 6 升级点数"},
           tooltip() {
           return "购买要求: 122"
           },
           effect() {a = n('1e15000')
            return a
           },
   style() { return { 'background-color': getClickableState('E',this.id)==1?"#5e33b6":layers.E.clickables[this.id].canClick()?"#7d5ebaff":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',this.id)==1||!gcs('E', 142)==1) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(6)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(6)
           },
           branches(){return ["142"]},
            unlocked(){return hasMilestone('E',1)},
        },
        133: {
           title(){return "113 Idle" },
           display() {return "无限点数directMult基于本次永恒时间增加<br>当前：x"+format(this.effect())+"<br>价格: 4 升级点数"},
           tooltip() {
           return "购买要求: 101&&!111&&!112"
           },
           effect() {a = n(player.E.resetTime).add(1).pow(3)
            return a
           },
   style() { return { 'background-color': getClickableState('E',this.id)==1?"#0080ff":layers.E.clickables[this.id].canClick()?"#51a8ffff":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',this.id)==1||!gcs('E', 121)==1||gcs('E', 131)==1||gcs('E', 132)==1) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(4)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(4)
           },
           branches(){return ["121"]},
            unlocked(){return hasMilestone('E',1)},
        },
        143: {
           title(){return "123 Idle" },
           display() {return "ReplicantiGalaxy的效果^1.5，但是复制器复制速度中x值x0.1<br>价格: 6 升级点数"},
           tooltip() {
           return "购买要求: 113"
           },
   style() { return { 'background-color': getClickableState('E',this.id)==1?"#0080ff":layers.E.clickables[this.id].canClick()?"#51a8ff":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',this.id)==1||!gcs('E', 133)==1) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(6)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(6)
           },
           branches(){return ["133"]},
            unlocked(){return hasMilestone('E',1)},
        },
        153: {
           title(){return "133 Idle" },
           display() {return "点数获取基于本次永恒时间增加，无视软上限<br>当前：x"+format(this.effect())+"<br>价格: 6 升级点数"},
           tooltip() {
           return "购买要求: 123"
           },
           effect() {a = n(player.E.resetTime).add(1).pow(1000)
            return a
           },
   style() { return { 'background-color': getClickableState('E',this.id)==1?"#0080ff":layers.E.clickables[this.id].canClick()?"#51a8ffff":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',this.id)==1||!gcs('E', 143)==1) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(6)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(6)
           },
           branches(){return ["143"]},
            unlocked(){return hasMilestone('E',1)},
        },
        145: {
           title(){return "EC6" },
           display() {return "解锁永恒挑战6<br>价格: 15 升级点数"},
           tooltip() {
           return "购买要求: 113"
           },
   style() { return { 'background-color': getClickableState('E',this.id)==1?"#d8ade6":layers.E.clickables[this.id].canClick()?"#d8bee6ff":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',this.id)==1||(!gcs('E', 133)==1)) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(15)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(15)
           },
           branches(){return ["133"]},
            unlocked(){return hasMilestone('E',1)},
        },
        161: {
           title(){return "141" },
           display() {return "基于完成的永恒挑战数量加成点数，无视软上限<br>当前：x"+format(this.effect())+"<br>价格: 15 升级点数"},
           tooltip() {
           return "购买要求: 131||132||133"
           },
           effect() {a = n('1e2500').pow(tmp.E.EcComp)
            return a
           },
   style() { return { 'background-color': getClickableState('E',this.id)==1?"#b743de":layers.E.clickables[this.id].canClick()?"#d8ade6":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',this.id)==1||(!gcs('E', 151)==1&&!gcs('E', 152)==1&&!gcs('E', 153)==1)) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(15)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(15)
           },
           branches(){return ["151",'152','153']},
            unlocked(){return hasMilestone('E',1)},
        },
        171: {
           title(){return "151" },
           display() {return "“加速复制器”技能的冷却时间减半，对a的加成改为x2<br>价格: 10 升级点数"},
           tooltip() {
           return "购买要求: 141"
           },
           //effect() {a = n('1e2500').pow(tmp.E.EcComp)
           // return a
           //},
   style() { return { 'background-color': getClickableState('E',this.id)==1?"#b743de":layers.E.clickables[this.id].canClick()?"#d8ade6":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',this.id)==1||!gcs('E', 161)==1) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(10)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(10)
           },
           branches(){return ["161"]},
            unlocked(){return hasMilestone('E',1)},
        },
        172: {
           title(){return "152" },
           display() {return "“加速复制器”技能每次永恒的可用次数变为10次<br>价格: 10 升级点数"},
           tooltip() {
           return "购买要求: 141"
           },
           //effect() {a = n('1e2500').pow(tmp.E.EcComp)
           // return a
           //},
   style() { return { 'background-color': getClickableState('E',this.id)==1?"#b743de":layers.E.clickables[this.id].canClick()?"#d8ade6":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',this.id)==1||!gcs('E', 161)==1) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(10)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(10)
           },
           branches(){return ["161"]},
            unlocked(){return hasMilestone('E',1)},
        },
        173: {
           title(){return "153" },
           display() {return "“加速复制器”技能的持续时间翻倍，对x的加成改为x2<br>价格: 10 升级点数"},
           tooltip() {
           return "购买要求: 141"
           },
           //effect() {a = n('1e2500').pow(tmp.E.EcComp)
           // return a
           //},
   style() { return { 'background-color': getClickableState('E',this.id)==1?"#b743de":layers.E.clickables[this.id].canClick()?"#d8ade6":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',this.id)==1||!gcs('E', 161)==1) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(10)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(10)
           },
           branches(){return ["161"]},
            unlocked(){return hasMilestone('E',1)},
        },
        181: {
           title(){return "161" },
           display() {return "基于总升级点数提升ReplicantiGalaxy的效果<br>当前：^"+format(this.effect())+"<br>价格: 12 升级点数"},
           tooltip() {
           return "购买要求: 151||152||153"
           },
           effect() {a = player.E.uptotal.pow(0.5)
            return a
           },
   style() { return { 'background-color': getClickableState('E',this.id)==1?"#b743de":layers.E.clickables[this.id].canClick()?"#d8ade6":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',this.id)==1||(!gcs('E', 171)==1&&!gcs('E', 172)==1&&!gcs('E', 173)==1)) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(12)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(12)
           },
           branches(){return ["171",'172','173']},
            unlocked(){return hasMilestone('E',1)},
        },
        191: {
           title(){return "EC7" },
           display() {return "解锁永恒挑战7<br>价格: 10 升级点数"},
           tooltip() {
           return "购买要求: 171"
           },
   style() { return { 'background-color': getClickableState('E',this.id)==1?"#d8ade6":layers.E.clickables[this.id].canClick()?"#d8bee6ff":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',this.id)==1||(!gcs('E', 192)==1)) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(10)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(10)
           },
           branches(){return ["192"]},
            unlocked(){return hasMilestone('E',1)},
        },
        192: {
           title(){return "171" },
           display() {return "点数指数软上限的指数+0.15<br>价格: 25 升级点数"},
           tooltip() {
           return "购买要求: 161"
           },
           //effect() {a = n('1e2500').pow(tmp.E.EcComp)
           // return a
           //},
   style() { return { 'background-color': getClickableState('E',this.id)==1?"#b743de":layers.E.clickables[this.id].canClick()?"#d8ade6":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',this.id)==1||!gcs('E', 181)==1) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(25)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(25)
           },
           branches(){return ["181"]},
            unlocked(){return hasMilestone('E',1)},
        },
         193: {
           title(){return "172" },
           display() {return "点数指数软上限的指数+0.25<br>价格: 35 升级点数"},
           tooltip() {
           return "购买要求: 161"
           },
           //effect() {a = n('1e2500').pow(tmp.E.EcComp)
           // return a
           //},
   style() { return { 'background-color': getClickableState('E',this.id)==1?"#b743de":layers.E.clickables[this.id].canClick()?"#d8ade6":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',this.id)==1||!gcs('E', 181)==1) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(35)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(35)
           },
           branches(){return ["181"]},
            unlocked(){return hasMilestone('E',1)},
        },
        194: {
           title(){return "EC8" },
           display() {return "解锁永恒挑战8<br>价格: 15 升级点数"},
           tooltip() {
           return "购买要求: 172"
           },
   style() { return { 'background-color': getClickableState('E',this.id)==1?"#d8ade6":layers.E.clickables[this.id].canClick()?"#d8bee6ff":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',this.id)==1||(!gcs('E', 193)==1)) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(15)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(15)
           },
           branches(){return ["193"]},
            unlocked(){return hasMilestone('E',1)},
        },
        201: {
           title(){return "181" },
           display() {return "每秒获得1%重置时可获得的无限点数<br>价格: 50 升级点数"},
           tooltip() {
           return "购买要求: (171||172)&&200总升级点数"
           },
           //effect() {a = n('1e2500').pow(tmp.E.EcComp)
           // return a
           //},
   style() { return { 'background-color': getClickableState('E',this.id)==1?"#b743de":layers.E.clickables[this.id].canClick()?"#d8ade6":"#BF8F8F"}},
          canClick() {
           if(getClickableState('E',this.id)==1||(!gcs('E', 192)==1&&!gcs('E',193)==1)) return false
           //if(inChallenge('r',13)) return false
           return player.E.up.gte(50)&&player.E.uptotal.gte(200)
          },
           onClick() {setClickableState(this.layer, this.id,1)
             player.E.upcost=player.E.upcost.add(50)
           },
           branches(){return ["193",'192']},
            unlocked(){return hasMilestone('E',1)},
        },
    501:
    {
           title(){return "Slowdown" },
           display() {return ""},
          canClick() {
            return player.devSpeed.gte(10)
          },
           onClick() {player.E.slowtime = player.E.slowtime.add(1)
           },
            unlocked(){return hasMilestone('E',4)},
        },    
    502:
    {
           title(){return "Speedup" },
           display() {return ""},
          canClick() {
            return player.E.slowtime.gt(0)
          },
           onClick() {player.E.slowtime = player.E.slowtime.sub(1)
           },
            unlocked(){return hasMilestone('E',4)},
        },
    511:
    {
           title(){return "永恒后刷新提示开关" },
           display() {a = "<br>当前："
            if(gcs('E', 511)==1) a = a+'关'
            if(gcs('E', 511)==0) a = a+'开'
            return a
           },
                     canClick() {
            return true
          },
           onClick() {player.E.clicktime = player.E.clicktime.add(1)
            if(gcs('E', 511)==0) setClickableState(this.layer, this.id,1)
            else setClickableState(this.layer, this.id,0)
           
           },
            unlocked(){return hasMilestone('E',13)},
        }, 
   },
   challenges: {
        11: {
            name: "Eternity Challenge 1",
            challengeDescription(){return "基于点数给点数与无限维度一个小于1的指数<br>当前：^"+tmp.E.ec1effect+"<br>完成次数："+challengeCompletions(this.layer,this.id)+"/5"},
            goalDescription(){return format(this.goal())+" 无限点数"},
            rewardDescription(){return "降低用点数购买升级点数的价格<br>当前：^"+format(this.rewardEffect())},
            unlocked(){return gcs('E',111)==1},
            onComplete(){
            },
        goal(){
                let a=[n('1.79e308'),n('e400'),n('2.5e510'),n('e1000'),n('e2085'),n(1.79e309)]
                return a[challengeCompletions(this.layer,this.id)]
            },
        rewardEffect() {let a=[n(1.0),n(0.8),n(0.6),n(0.5),n(0.35),n(0.3)]
                return a[challengeCompletions(this.layer,this.id)]
        },
            onEnter(){},
            onExit(){},
            completionLimit() {return new Decimal(5)},
            canComplete: function() {
                return player.I.points.gte(this.goal())},
        },
        12: {
            name: "Eternity Challenge 2",
            challengeDescription(){return "无限挑战1~7同时激活<br>完成次数："+challengeCompletions(this.layer,this.id)+"/5"},
            goalDescription(){return format(this.goal())+" 无限点数"},
            rewardDescription(){return "基于无限之力增强无限维度<br>当前：x"+format(this.rewardEffect())},
            unlocked(){return gcs('E',112)==1},
            onComplete(){
            },
        goal(){
                let a=[n('1.79e308'),n('e404'),n('e480'),n('e1500'),n('e2085'),n(1.79e309)]
                return a[challengeCompletions(this.layer,this.id)]
            },
        rewardEffect() {let a=[n(0),n(0.01),n(0.015),n(0.02),n(0.025),n(0.03)]
                b=player.I.ipower.pow(a[challengeCompletions(this.layer,this.id)])
                c=n('e25000000').pow(a[challengeCompletions(this.layer,this.id)])
                if(b.gte(c)) b=powsoftcap(b,c,4)
                return b
        },
            onEnter(){},
            onExit(){},
            completionLimit() {return new Decimal(5)},
            canComplete: function() {
                return player.I.points.gte(this.goal())},
        },
        13: {
            name: "Eternity Challenge 3",
            challengeDescription(){return "基于点数给无限点数的directMult和gainMult一个小于1的指数<br>当前：^"+tmp.E.ec1effect+"<br>完成次数："+challengeCompletions(this.layer,this.id)+"/5"},
            goalDescription(){return format(this.goal())+" 无限点数"},
            rewardDescription(){return "基于无限点数的gainMult提升无限点数的directMult<br>当前：x"+format(this.rewardEffect())},
            unlocked(){return gcs('E',113)==1},
            onComplete(){
            },
        goal(){
                let a=[n('1.79e308'),n('e375'),n('e500'),n('e1000'),n('e5000'),n(1.79e309)]
                return a[challengeCompletions(this.layer,this.id)]
            },
        rewardEffect() {let a=[n(0),n(0.05),n(0.1),n(0.125),n(0.14),n(0.15)]
                return tmp.I.gainMult.pow(a[challengeCompletions(this.layer,this.id)])
        },
            onEnter(){},
            onExit(){},
            completionLimit() {return new Decimal(5)},
            canComplete: function() {
                return player.I.points.gte(this.goal())},
        },
        14: {
            name: "Eternity Challenge 4",
            challengeDescription(){return "无限次数倍率被禁用，你最多只能无限"+tmp.E.ec4effect+"次，超出则无法完成挑战<br>完成次数："+challengeCompletions(this.layer,this.id)+"/5"},
            goalDescription(){return format(this.goal())+" 无限点数"},
            rewardDescription(){return "基于无限点数提升无限次数获取<br>当前：x"+format(this.rewardEffect())},
            unlocked(){return gcs('E',52)==1},
            onComplete(){
            },
        goal(){
                let a=[n('1e450'),n('e616'),n('e800'),n('e700'),n('e3000'),n(1.79e309)]
                return a[challengeCompletions(this.layer,this.id)]
            },
        rewardEffect() {let a=[n(1.79e308),n(1e10),n(1e5),n(1e3),n(100),n(10)]
                if (n(cc(this.layer,this.id)).gte(1)) return player.I.points.add(1).log(a[challengeCompletions(this.layer,this.id)]).add(1)
                return n(1)
        },
            onEnter(){},
            onExit(){},
            completionLimit() {return new Decimal(5)},
            canComplete: function() {
                return player.I.points.gte(this.goal())&&player.I.inf.lte(tmp.E.ec4effect.add(256))},
        },
        21: {
            name: "Eternity Challenge 5",
            challengeDescription(){return "无限维度被大幅削弱(^0.1)，你无法获得时间墙、压缩时间墙与二重压缩时间墙<br>完成次数："+challengeCompletions(this.layer,this.id)+"/5"},
            goalDescription(){return format(this.goal())+" 无限点数"},
            rewardDescription(){return "增加点数获取指数<br>当前：+"+format(this.rewardEffect())},
            unlocked(){return gcs('E',144)==1},
            onComplete(){
            },
        goal(){
                let a=[n('1e450'),n('e567'),n('e960'),n('e1500'),n('e2085'),n(1.79e309)]
                return a[challengeCompletions(this.layer,this.id)]
            },
        rewardEffect() {let a=[n(0),n(0.05),n(0.1),n(0.14),n(0.17),n(0.2)]
                return a[challengeCompletions(this.layer,this.id)]
        },
            onEnter(){},
            onExit(){},
            completionLimit() {return new Decimal(5)},
            canComplete: function() {
                return player.I.points.gte(this.goal())},
        },
        22: {
            name: "Eternity Challenge 6",
            challengeDescription(){return "QqQeInfinity超人的所有效果被禁用，QqQe308的价格^10<br>完成次数："+challengeCompletions(this.layer,this.id)+"/5"},
            goalDescription(){return format(this.goal())+" 无限点数"},
            rewardDescription(){return "基于永恒次数加快QqQeInfinity超人的速度<br>当前：x"+format(this.rewardEffect())},
            unlocked(){return gcs('E',145)==1},
            onComplete(){
            },
        goal(){
                let a=[n('1e616'),n('e1145'),n('e1750'),n('e5000'),n('e10231'),n(1.79e309)]
                return a[challengeCompletions(this.layer,this.id)]
            },
        rewardEffect() {let a=[n(0),n(3),n(6),n(10),n(15),n(20)]
            //if(challengeCompletions('E',22)==0) return n(1)
                return player.E.etr.add(10).log(10).pow(a[challengeCompletions(this.layer,this.id)])
        },
            onEnter(){},
            onExit(){},
            completionLimit() {return new Decimal(5)},
            canComplete: function() {
                return player.I.points.gte(this.goal())},
        },
        23: {
            name: "Eternity Challenge 7",
            challengeDescription(){return "点数获取指数与直接加成均无效<br>完成次数："+challengeCompletions(this.layer,this.id)+"/5"},
            goalDescription(){return format(this.goal())+" 无限点数"},
            rewardDescription(){return "基于时间碎片加成点数获取，无视软上限<br>当前：x"+format(this.rewardEffect())},
            unlocked(){return gcs('E',191)==1},
            onComplete(){
            },
        goal(){
                let a=[n('1e1024'),n('e5000'),n('e10000'),n('e15000'),n('e19728'),n(1.79e309)]
                return a[challengeCompletions(this.layer,this.id)]
            },
        rewardEffect() {let a=[n(0),n(500),n(1000),n(1500),n(1800),n(2100)]
            //if(challengeCompletions('E',22)==0) return n(1)
            if (n(cc(this.layer,this.id)).gte(1)) return player.E.timeshard.pow(a[challengeCompletions(this.layer,this.id)])
                return n(1)
        },
            onEnter(){},
            onExit(){},
            completionLimit() {return new Decimal(5)},
            canComplete: function() {
                return player.I.points.gte(this.goal())},
        },
        24: {
            name: "Eternity Challenge 8",
            challengeDescription(){return "无限点数的GainMult与DirectMult保持为1<br>完成次数："+challengeCompletions(this.layer,this.id)+"/5"},
            goalDescription(){return format(this.goal())+" 无限点数"},
            rewardDescription(){return "增加'IP倍增'可购买的基数，第一次完成后可自动最大化购买'IP倍增'可购买<br>当前：x"+format(this.rewardEffect())},
            unlocked(){return gcs('E',194)==1},
            onComplete(){
            },
        goal(){
                let a=[n('1e1024'),n('e1800'),n('e5000'),n('e15000'),n('e19728'),n(1.79e309)]
                return a[challengeCompletions(this.layer,this.id)]
            },
        rewardEffect() {let a=[n(1),n(1.2),n(1.4),n(1.5),n(1.6),n(1.75)]
            //if(challengeCompletions('E',22)==0) return n(1)
            if (n(cc(this.layer,this.id)).gte(1)) return a[challengeCompletions(this.layer,this.id)]
                return n(1)
        },
            onEnter(){},
            onExit(){},
            completionLimit() {return new Decimal(5)},
            canComplete: function() {
                return player.I.points.gte(this.goal())},
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
        if (player.E.etr.gte(10)) a = n(15).add(player.E.etr).pow(5)
        return a
    },//ID mult
    mil0effect5() {a = player.E.etr.add(1).log(10).add(1)
        return a
    },//qaqe308
    mil0effect6() {a = player.E.etr.add(1).log(2).times(0.01).add(1)
        return a
    },//rep x(add)
    etrtotdmult() {a = player.E.etr.div(256)
        if (hasAchievement('A3',65)) a=n(2).pow(player.E.etr.sub(256).div(64))
        return a
    },
    TSeffect() {a = player.E.timeshard.log(tmp.E.tsbase)
        return a
    },
    alltdmult() {a = tmp.E.etrtotdmult
        if (gcs('E', 41)==1) a = a.times(ce('E', 41))
        if (gcs('E', 103)==1) a = a.times(ce('E', 103)) 
        a = a.times(tmp.E.slowtotdmult)
        return a
    },
    td1mult() {a = tmp.E.alltdmult
        a = a.times(n(4).pow(gba('E', 21)))
        return a
    },
    td2mult() {a = tmp.E.alltdmult
        a = a.times(n(4).pow(gba('E', 22)))
        return a
    },
    td3mult() {a = tmp.E.alltdmult
        a = a.times(n(4).pow(gba('E', 23)))
        return a
    },
    td4mult() {a = tmp.E.alltdmult
        a = a.times(n(4).pow(gba('E', 24)))
        return a
    },
    td5mult() {a = tmp.E.alltdmult
        a = a.times(n(4).pow(gba('E', 25)))
        return a
    },
    td6mult() {a = tmp.E.alltdmult
        a = a.times(n(4).pow(gba('E', 26)))
        return a
    },
    td7mult() {a = tmp.E.alltdmult
        a = a.times(n(4).pow(gba('E', 27)))
        return a
    },
    td8mult() {a = tmp.E.alltdmult
        a = a.times(n(4).pow(gba('E', 28)))
        return a
    },
    upbyach() {a = n(0)
        if (hasAchievement('A3', 15)) a = a.add(1)
        if (hasAchievement('A3', 24)) a = a.add(2)
        if (hasAchievement('A3', 25)) a = a.add(1)
        if (hasAchievement('A3', 35)) a = a.add(1)
        if (hasAchievement('A3', 45)) a = a.add(1)
        if (hasAchievement('A3', 55)) a = a.add(1)
        if (hasAchievement('A3', 65)) a = a.add(1)
        if (hasAchievement('A3', 75)) a = a.add(1)
        if (hasAchievement('A3', 85)) a = a.add(1)
        if (hasAchievement('A3', 95)) a = a.add(1)
        return a
    },
    upbydef(){a = tmp.df.effect6
        return a
    },
    slowtotdmult() {a = n(1)
        a = a.times(n(5).pow(player.E.slowtime))
        return a
    },
    tsbase() {a = n(10)
        if (hasMilestone('E',8)) a = a.sub(gba('qa', 12))
            return a
    },
    EcComp() {a = n(0)
        a = a.add(challengeCompletions('E',11))
        a = a.add(challengeCompletions('E',12))
        a = a.add(challengeCompletions('E',13))
        a = a.add(challengeCompletions('E',14))
        a = a.add(challengeCompletions('E',21))
        a = a.add(challengeCompletions('E',22))
        a = a.add(challengeCompletions('E',23))
        a = a.add(challengeCompletions('E',24))
        return a
    },
    upbyec() {a = tmp.E.EcComp
        return a
    },
    ectext(){a = ''
        if(n(challengeCompletions('E',11)).gte(1)&&!gcs('E',111)==1) a = a+'EC1：'+tmp[this.layer].challenges[11].challengeDescription+'<br>目标：'+tmp[this.layer].challenges[11].goalDescription+'<br>奖励：'+tmp[this.layer].challenges[11].rewardDescription
        if(n(challengeCompletions('E',12)).gte(1)&&!gcs('E',112)==1) a = a+'<br>EC2：'+tmp[this.layer].challenges[12].challengeDescription+'<br>目标：'+tmp[this.layer].challenges[12].goalDescription+'<br>奖励：'+tmp[this.layer].challenges[12].rewardDescription
        if(n(challengeCompletions('E',13)).gte(1)&&!gcs('E',113)==1) a = a+'<br>EC3：'+tmp[this.layer].challenges[13].challengeDescription+'<br>目标：'+tmp[this.layer].challenges[13].goalDescription+'<br>奖励：'+tmp[this.layer].challenges[13].rewardDescription
        if(n(challengeCompletions('E',14)).gte(1)&&!gcs('E',52)==1) a = a+'<br>EC4：'+tmp[this.layer].challenges[14].challengeDescription+'<br>目标：'+tmp[this.layer].challenges[14].goalDescription+'<br>奖励：'+tmp[this.layer].challenges[14].rewardDescription
        if(n(challengeCompletions('E',21)).gte(1)&&!gcs('E',144)==1) a = a+'<br>EC5：'+tmp[this.layer].challenges[21].challengeDescription+'<br>目标：'+tmp[this.layer].challenges[21].goalDescription+'<br>奖励：'+tmp[this.layer].challenges[21].rewardDescription
        if(n(challengeCompletions('E',22)).gte(1)&&!gcs('E',145)==1) a = a+'<br>EC6：'+tmp[this.layer].challenges[22].challengeDescription+'<br>目标：'+tmp[this.layer].challenges[22].goalDescription+'<br>奖励：'+tmp[this.layer].challenges[22].rewardDescription
        if(n(challengeCompletions('E',23)).gte(1)&&!gcs('E',191)==1) a = a+'<br>EC7：'+tmp[this.layer].challenges[23].challengeDescription+'<br>目标：'+tmp[this.layer].challenges[23].goalDescription+'<br>奖励：'+tmp[this.layer].challenges[23].rewardDescription
        if(n(challengeCompletions('E',24)).gte(1)&&!gcs('E',194)==1) a = a+'<br>EC8：'+tmp[this.layer].challenges[24].challengeDescription+'<br>目标：'+tmp[this.layer].challenges[24].goalDescription+'<br>奖励：'+tmp[this.layer].challenges[24].rewardDescription
        return a
    },
    ec1effect() {a = n(1.03)
                b = player.points.add(1).log(2).add(1).log(2)
                c = a.pow(b).sub(n(a).pow(b.times(-1))).div(a.pow(b).add(a.pow(b.times(-1))))
            return c},
    ec4effect(){a = n(4).sub(cc('E',14)).max(0)
        return a
    },
})

addLayer("df", {
    name: "DeFe308", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "DF", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: n(0),
    }},
    color: "#d8ade6",
    requires(){a = new Decimal('1e250000')
        if(player.bx.points.gte(1)) a=n(2e308)
        return a
    }, // Can be a function that takes requirement increases into account
    resource: "DeFe308", // Name of prestige currency
    baseResource: "点数", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    base: n('1e10000'),
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        //if (hasAchievement('A3',55)) mult = mult.div('1e10000')
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        //if(player.df.points.gte(15)) exp=player.df.points.sub(14).pow(-1)
        return exp
    },
    deactivated(){return player.bx.points.gte(1)},
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "D", description: "D(大写): 获得DeFe308", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.A3.points.gte(15)&&player.bx.points.lt(1)},
    branches: ['E'],
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
    resetsNothing() {return false},
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
            requirementDescription: "1 DeFe308",
            effectDescription(){return "基于DeFe308数量获得各种加成 当前：<br>复制器上限x"+format(tmp.df.effect)+"<br>无限维度x"+format(tmp.df.effect2)+"(基于Monika点数)<br>无限点数DirectMult x"+format(tmp.df.effect3)+"(基于永恒点数)<br>无限次数获取x"+format(tmp.df.effect4)+"<br>双指数软上限指数+"+format(tmp.df.effect5)+"<br>升级点数+"+format(tmp.df.effect6)},
            done() { return player.df.points.gte(1) }
        },
        1: {
            requirementDescription: "10 DeFe308",
            effectDescription(){return "基于DeFe308数量获得进一步的加成 当前：<br>复制器软上限起始复制器^"+format(tmp.df.effect7)+"<br>Monika点数基础获取公式x^2→2^x<br>Monika点数对无限维度的加成变为指数加成"},
            done() { return player.df.points.gte(10) }
        },
    },
    effect(){
        c = n(1e3).pow(player.df.points)
            return c
      },
    effect2(){
        c = max(player.qa.monika,1).pow(player.df.points.times(50))
            return c
      },
    effect3(){
        c = max(player.E.points,1).pow(player.df.points.pow(0.5).times(10))
            return c
      },
    effect4(){
        c = player.df.points.pow(2).add(1)
            return c
      },
    effect5(){
        c = max(n(1.015).pow(player.df.points).sub(n(1.015).pow(player.df.points.times(-1))).div(n(1.015).pow(player.df.points).add(n(1.015).pow(player.df.points.times(-1)))).sub(0.01),n(0))
        if (c.gte(0.1))c = c.times(10).pow(0.5).div(10)
            return c
      },
    effect6(){
        c = player.df.points.times(2)
        return c
    },
    effect7(){
        c = player.df.points.add(1).log(2).pow(2)
            return c
    },
})

addLayer("A4", {
    name: "Achievement4", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: 'A<sup><img src="s297.jpg" width="25" height="25"></sup>', // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        ach: new Decimal(0)
    }},
    color: "#ffe125",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource(){return '<img src="s297.jpg" width="25" height="25">'+'级成就'}, // Name of prestige currency
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
        if (hasUpgrade('I', 11)&&player.I.bh1activation.eq(1)&&player.I.bhpaused.neq(1)) dev=dev.times(tmp.I.bh1speed)
        dev = dev.times(tmp.E.TSeffect)
        if (hasAchievement('A3', 25)) dev = dev.times(2)
        if (gcs('E',93)==1) dev = dev.times(ce('E', 93))
        dev = dev.div(n(10).pow(player.E.slowtime))
	    if (isEndgame()||player.T.pause.eq(1)) dev=n(0)
	    return dev
	   },
       doReset(resettingLayer) {
        if ((resettingLayer == 'I'&&!hasChallenge('I', 12))||(resettingLayer == 'E'&&!hasMilestone('E', 2))) {
            let kept = []
            if(!hasMilestone('E', 3)) layerDataReset(this.layer, kept)
        }
    },
    row: 'side', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.bx.points.gte(1)},
    achievementPopups: true,
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
    achievements: {
        11: {
     name: "拜谢之始",
     done() {return player.bx.points.gte(1)}, 
     onComplete() {player.A4.points = player.A4.points.add(1)},
     tooltip: "获得你的第一个拜谢帝！", 
     textStyle: {'color': '#ffe125'},
        },
        12: {
     name: "66686太膨胀了",
     done() {return player.bx.points.gte(1)&&player.points.gte(6.6686)}, 
     onComplete() {player.A4.points = player.A4.points.add(1)},
     tooltip: "获得6.6686点数", 
     textStyle: {'color': '#ffe125'},
        },
        13: {
     name: "Clicker Heroes?",
     done() {return player.bx.bestlevel.gt(5)}, 
     onComplete() {player.A4.points = player.A4.points.add(1)},
     tooltip: "通过Liuliu66686关卡5", 
     textStyle: {'color': '#ffe125'},
        },
        14: {
     name: "攻击破百",
     done() {return tmp.bx.dps.gte(100)}, 
     onComplete() {player.A4.points = player.A4.points.add(1)},
     tooltip: "每秒伤害达到100", 
     textStyle: {'color': '#ffe125'},
        },
        15: {
     name: "攻击破千",
     done() {return tmp.bx.dps.gte(1000)}, 
     onComplete() {player.A4.points = player.A4.points.add(1)},
     tooltip: "每秒伤害达到1000", 
     textStyle: {'color': '#ffe125'},
        },
        21: {
     name: "点数膨胀 II",
     done() {return player.bx.points.gte(1)&&player.points.gte(10000)}, 
     onComplete() {player.A4.points = player.A4.points.add(1)},
     tooltip: "获得10000点数<br>还记得点数膨胀 I在哪里吗？", 
     textStyle: {'color': '#ffe125'},
        },
    }
})

addLayer("bx", {
    name: "baixie", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: '<img src="s297.jpg" width="100" height="100">', // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: n(0),
        daheiHP:n(10),
        bestlevel:n(1),
        level:n(1),
        defeat:n(0),
        leveltime:n(0),
        mode:n(0),
    }},
    color: "#d3f928ff",
    requires(){a = new Decimal('e1.79e308')
        return a
    }, // Can be a function that takes requirement increases into account
    resource: "拜谢帝", // Name of prestige currency
    baseResource: "点数", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    base: n(2e308),
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        //if (hasAchievement('A3',55)) mult = mult.div('1e10000')
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        //if(player.df.points.gte(15)) exp=player.df.points.sub(14).pow(-1)
        return exp
    },
    row: 7, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        //{key: "b", description: "B: 获得拜谢帝", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.A3.points.gte(60)||player.bx.points.gt(0)},
    branches: ['E','df'],
    //microtabs: {

      //  },
    doReset(resettingLayer) {        
        if (layers[resettingLayer].row > layers[this.layer].row) {
        let kept = []
        layerDataReset(this.layer, kept)
           }
        if (layers[resettingLayer].row = layers[this.layer].row) {
            player.devSpeed=n(0)
            player.points=n(0)
           }
    },
    update(diff){
        if(player.bx.points.gte(1)){player.T.points=n(0)
        player.Q.points=n(0)
    player.CT.points=n(0)
player.Qi.points=n(0)
player.DC.points=n(0)
player.co.points=n(0)
player.I.points=n(0)
player.qa.points=n(0)
player.rg.points=n(0)
player.E.points=n(0)
player.df.points=n(0)
player.A3.points=n(0)
player.A.points=n(0)
player.A2.points=n(0)
player.A3.achievements=[]
player.A.achievements=[]
player.A2.achievements=[]}//kill previous resources
            player.bx.daheiHP=player.bx.daheiHP.sub(tmp.bx.dps.times(diff))
        if(player.bx.daheiHP.lte(0)){player.bx.defeat=player.bx.defeat.add(1)
            player.points=player.points.add(tmp.bx.getpt)
            if (player.bx.defeat.gte(tmp.bx.levelgoal)){player.bx.defeat=n(0)
                if(player.bx.level.eq(player.bx.bestlevel))player.bx.bestlevel = player.bx.bestlevel.add(1)
                if(player.bx.mode.eq(0))player.bx.level=player.bx.level.add(1)
            }
            player.bx.leveltime=n(0)
            player.bx.daheiHP = HPformula(player.bx.level)
        }//defeat
        player.bx.leveltime=player.bx.leveltime.add(diff)
        if(player.bx.leveltime.gte(tmp.bx.timelimit)){player.bx.level=player.bx.level.sub(1)
            player.bx.defeat=n(0)
        player.bx.leveltime=n(0)
            player.bx.daheiHP = HPformula(player.bx.level)
        }
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
        microtabs: {
        stuff: {       
            "General": {
                unlocked() {return true},
                content: [ "milestones",'upgrades']}, 
            "Liuliu66686": {
                unlocked() {return hasMilestone('bx', 0)},
                content: [["display-text", () => tmp.bx.Showdetail
                    ],["blank", "25px"],'clickables','buyables']},
            }
        },
    upgrades: {
        11: {
            fullDisplay(){a= '<h3>U1-1</h3><br>拜谢帝效果x2<br>花费：1 点数'
                return a
            },
            canAfford(){return player.bx.points.gte(1)&&player.points.gte(1)},
            pay(){player.points = player.points.sub(1)},
        },
        12: {
            fullDisplay(){a= '<h3>U1-2</h3><br>拜谢帝效果x2<br>花费：2.5 点数'
                return a
            },
            unlocked(){return true},
            canAfford(){return player.bx.points.gte(1)&&player.points.gte(2.5)},
            pay(){player.points = player.points.sub(2.5)},
        },
        13: {
            fullDisplay(){a= '<h3>U1-3</h3><br>解锁攻击<br>购买时清除所有点数<br>需求：6.6686 点数'
                return a
            },
            unlocked(){return hasUpgrade('bx',11)},
            canAfford(){return player.bx.points.gte(1)&&player.points.gte(6.6686)},
            pay(){player.points = n(0)},
        },
        21: {
            fullDisplay(){a= '<h3>U2-1</h3><br>解锁关卡切换功能<br>本行每个升级使你的攻击按钮伤害+1<br>花费：1.15 点数'
                return a
            },
            unlocked(){return hasUpgrade('bx',13)},
            canAfford(){return player.bx.points.gte(1)&&player.points.gte(1.15)},
            pay(){player.points = player.points.sub(1.15)},
        },
        22: {
            fullDisplay(){a= '<h3>U2-2</h3><br>解锁第零拜谢维度<br>花费：2.3 点数'
                return a
            },
            unlocked(){return hasUpgrade('bx',13)},
            canAfford(){return player.bx.points.gte(1)&&player.points.gte(2.3)},
            pay(){player.points = player.points.sub(2.3)},
        },
        23: {
            fullDisplay(){a= '<h3>U2-3</h3><br>解锁游玩模式切换功能<br><br>花费：3.7 点数'
                return a
            },
            unlocked(){return hasUpgrade('bx',13)},
            canAfford(){return player.bx.points.gte(1)&&player.points.gte(3.7)},
            pay(){player.points = player.points.sub(3.7)},
        },
        24: {
            fullDisplay(){a= '<h3>U2-4</h3><br>解锁拜谢维度<br>与无限维度、时间维度不同，拜谢维度不会生产上一级拜谢维度<br>花费：8.9 点数'
                return a
            },
            unlocked(){return hasUpgrade('bx',13)},
            canAfford(){return player.bx.points.gte(1)&&player.points.gte(8.9)},
            pay(){player.points = player.points.sub(8.9)},
        },
        25: {
            fullDisplay(){a= '<h3>U2-5</h3><br>解锁与拜谢维度有关的升级<br>花费：25 点数'
                return a
            },
            unlocked(){return hasUpgrade('bx',13)},
            canAfford(){return player.bx.points.gte(1)&&player.points.gte(25)},
            pay(){player.points = player.points.sub(25)},
        },
        31: {
            fullDisplay(){a= '<h3>U3-1</h3><br>第一维度与第零维度效果x2<br>需求：10 第一维度<br>花费：15 点数'
                return a
            },
            unlocked(){return hasUpgrade('bx',25)&&getBuyableAmount('bx',21).gte(1)},
            canAfford(){return player.bx.points.gte(1)&&getBuyableAmount('bx',21).gte(10)&&player.points.gte(15)},
            pay(){player.points = player.points.sub(15)},
        },
        32: {
            fullDisplay(){a= '<h3>U3-2</h3><br>第一维度与第零维度效果x2<br>需求：25 第一维度<br>花费：150 点数'
                return a
            },
            unlocked(){return hasUpgrade('bx',25)&&getBuyableAmount('bx',21).gte(10)},
            canAfford(){return player.bx.points.gte(1)&&getBuyableAmount('bx',21).gte(25)&&player.points.gte(150)},
            pay(){player.points = player.points.sub(150)},
        },
        33: {
            fullDisplay(){a= '<h3>U3-3</h3><br>第一维度与第零维度效果x2<br>需求：50 第一维度<br>花费：5000 点数'
                return a
            },
            unlocked(){return hasUpgrade('bx',25)&&getBuyableAmount('bx',21).gte(25)},
            canAfford(){return player.bx.points.gte(1)&&getBuyableAmount('bx',21).gte(50)&&player.points.gte(5000)},
            pay(){player.points = player.points.sub(5000)},
        },
        34: {
            fullDisplay(){a= '<h3>U3-3</h3><br>第一维度与第零维度效果x2<br>需求：75 第一维度<br>花费：250000 点数'
                return a
            },
            unlocked(){return hasUpgrade('bx',25)&&getBuyableAmount('bx',21).gte(50)},
            canAfford(){return player.bx.points.gte(1)&&getBuyableAmount('bx',21).gte(75)&&player.points.gte(250000)},
            pay(){player.points = player.points.sub(250000)},
        },
        41: {
            fullDisplay(){a= '<h3>U4-1</h3><br>第二维度与拜谢帝效果x2<br>需求：10 第二维度<br>花费：200 点数'
                return a
            },
            unlocked(){return hasUpgrade('bx',25)&&getBuyableAmount('bx',22).gte(1)},
            canAfford(){return player.bx.points.gte(1)&&getBuyableAmount('bx',22).gte(10)&&player.points.gte(200)},
            pay(){player.points = player.points.sub(200)},
        },
        42: {
            fullDisplay(){a= '<h3>U4-2</h3><br>第二维度与拜谢帝效果x1.5<br>需求：25 第二维度<br>花费：2500 点数'
                return a
            },
            unlocked(){return hasUpgrade('bx',25)&&getBuyableAmount('bx',22).gte(10)},
            canAfford(){return player.bx.points.gte(1)&&getBuyableAmount('bx',22).gte(25)&&player.points.gte(2500)},
            pay(){player.points = player.points.sub(2500)},
        },
        43: {
            fullDisplay(){a= '<h3>U4-3</h3><br>第二维度效果x2<br>需求：50 第二维度<br>花费：20000 点数'
                return a
            },
            unlocked(){return hasUpgrade('bx',25)&&getBuyableAmount('bx',22).gte(25)},
            canAfford(){return player.bx.points.gte(1)&&getBuyableAmount('bx',22).gte(50)&&player.points.gte(2e4)},
            pay(){player.points = player.points.sub(2e4)},
        },
        51: {
            fullDisplay(){a= '<h3>U5-1</h3><br>第三维度效果x2，除第零维度外所有维度效果x1.5<br>需求：10 第三维度<br>花费：30000 点数'
                return a
            },
            unlocked(){return hasUpgrade('bx',25)&&getBuyableAmount('bx',23).gte(1)},
            canAfford(){return player.bx.points.gte(1)&&getBuyableAmount('bx',23).gte(10)&&player.points.gte(3e4)},
            pay(){player.points = player.points.sub(3e4)},
        },
    },
    clickables:{
        12: {
            title: "攻击",
            display() {return "对溜溜溜达嘿造成"+format(tmp.bx.attackeffect)+"伤害"},
            unlocked(){return hasUpgrade('bx',13)},
            canClick() {return player.devSpeed.gt(0)},
            onClick() {player.bx.daheiHP = player.bx.daheiHP.sub(tmp.bx.attackeffect)
            },
        },
        11: {
            title: "上一关",
            display() {return "清除本关进度，切换到上一关"},
            unlocked(){return hasUpgrade('bx',21)},
            canClick() {return player.devSpeed.gt(0)&&player.bx.level.gt(1)},
            onClick() {player.bx.level=player.bx.level.sub(1)
            player.bx.defeat=n(0)
            player.bx.leveltime=n(0)
            player.bx.daheiHP = HPformula(player.bx.level)
            },
        },
        13: {
            title: "下一关",
            display() {return "清除本关进度，切换到下一关"},
            unlocked(){return hasUpgrade('bx',21)},
            canClick() {return player.devSpeed.gt(0)&&player.bx.level.lt(player.bx.bestlevel)},
            onClick() {player.bx.level=player.bx.level.add(1)
            player.bx.defeat=n(0)
            player.bx.leveltime=n(0)
            player.bx.daheiHP = HPformula(player.bx.level)
            },
        },
        21: {
            title: "切换游玩模式",
            display() {a= "当前游玩模式为："
                if(player.bx.mode.eq(0)) a=a+'推关模式'
                if(player.bx.mode.eq(1)) a=a+'刷怪模式'
                return a
            },
            tooltip(){return '推关模式：通过一关后立即进入下一关<br>刷怪模式：通过一关后留在这一关'},
            unlocked(){return hasUpgrade('bx',23)},
            canClick() {return player.devSpeed.gt(0)},
            onClick() {player.bx.mode=n(1).sub(player.bx.mode)
            },
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1.1).pow(x) },
            title: '第零拜谢维度',
            display() { return "花费："+format(this.cost())+"点数<br>已购买了"+format(getBuyableAmount(this.layer, this.id))+"次，使攻击伤害+"+format(buyableEffect(this.layer,this.id))+'<br>每购买25次，该维度效果翻倍'},
            canAfford() { return player.points.gte(this.cost()) },
            effect(){a=getBuyableAmount(this.layer,this.id).times(n(2).pow(getBuyableAmount(this.layer,this.id).div(25).floor()))
                if(hasUpgrade('bx',31)) a=a.times(2)
                if(hasUpgrade('bx',32)) a=a.times(2)
                if(hasUpgrade('bx',33)) a=a.times(2)
                if(hasUpgrade('bx',34)) a=a.times(2)
                return a
            },
            unlocked(){return hasUpgrade('bx',22)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        21: {
            cost(x) { return new Decimal(1.1).pow(x).times(5) },
            title: '第一拜谢维度',
            display() { return "花费："+format(this.cost())+"点数<br>已购买了"+format(getBuyableAmount(this.layer, this.id))+"次，使每秒伤害+"+format(buyableEffect(this.layer,this.id))},
            canAfford() { return player.points.gte(this.cost()) },
            effect(){a=getBuyableAmount(this.layer,this.id)
                a=a.times(tmp.bx.allbxdmult)
                if(hasUpgrade('bx',31)) a=a.times(2)
                if(hasUpgrade('bx',32)) a=a.times(2)
                if(hasUpgrade('bx',33)) a=a.times(2)
                if(hasUpgrade('bx',34)) a=a.times(2)
                return a
            },
            unlocked(){return hasUpgrade('bx',24)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        22: {
            cost(x) { return new Decimal(1.1).pow(x).times(100) },
            title: '第二拜谢维度',
            display() { return "花费："+format(this.cost())+"点数<br>已购买了"+format(getBuyableAmount(this.layer, this.id))+"次，使每秒伤害+"+format(buyableEffect(this.layer,this.id))},
            canAfford() { return player.points.gte(this.cost()) },
            effect(){a=getBuyableAmount(this.layer,this.id).times(10)
                if(hasUpgrade('bx',41)) a=a.times(2)
                if(hasUpgrade('bx',42)) a=a.times(1.5)
                if(hasUpgrade('bx',43)) a=a.times(2)
                a=a.times(tmp.bx.allbxdmult)
                return a
            },
            unlocked(){return hasUpgrade('bx',24)&&getBuyableAmount(this.layer,21).gte(1)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        23: {
            cost(x) { return new Decimal(1.1).pow(x).times(1.25e4) },
            title: '第三拜谢维度',
            display() { return "花费："+format(this.cost())+"点数<br>已购买了"+format(getBuyableAmount(this.layer, this.id))+"次，使每秒伤害+"+format(buyableEffect(this.layer,this.id))},
            canAfford() { return player.points.gte(this.cost()) },
            effect(){a=getBuyableAmount(this.layer,this.id).times(150)
                if(hasUpgrade('bx',51)) a=a.times(2)
                a=a.times(tmp.bx.allbxdmult)
                return a
            },
            unlocked(){return hasUpgrade('bx',24)&&getBuyableAmount(this.layer,22).gte(1)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        24: {
            cost(x) { return new Decimal(1.1).pow(x).times(2e6) },
            title: '第四拜谢维度',
            display() { return "花费："+format(this.cost())+"点数<br>已购买了"+format(getBuyableAmount(this.layer, this.id))+"次，使每秒伤害+"+format(buyableEffect(this.layer,this.id))},
            canAfford() { return player.points.gte(this.cost()) },
            effect(){a=getBuyableAmount(this.layer,this.id).times(2e3)
                a=a.times(tmp.bx.allbxdmult)
                return a
            },
            unlocked(){return hasUpgrade('bx',24)&&getBuyableAmount(this.layer,23).gte(1)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    },
    milestones: {
        0: {
            requirementDescription: "6.6686点数",
            effectDescription(){return "由于你的点数太膨胀了，引来了溜溜溜达嘿入侵，使你的点数获取/4！"},
            done() { return player.bx.points.gte(1)&&player.points.gte(6.6686) }
        },
    },
    effect(){a=n(0.001).times(player.bx.points)
        if(hasUpgrade('bx',11))a=a.times(2)
        if(hasUpgrade('bx',12))a=a.times(2)
        if(hasMilestone('bx',0)) a=a.times(0.25)
        if(hasUpgrade('bx',41)) a=a.times(2)
        if(hasUpgrade('bx',42)) a=a.times(1.5)
        return a
    },
    effectDescription(){a='每秒生产'+format(tmp.bx.effect)+'点数'
        return a
    },
    Showdetail() {a='<h2>关卡'+format(player.bx.level,0)+'/'+format(player.bx.bestlevel,0)
        if(player.bx.level.div(5).floor().eq(player.bx.level.div(5))) a=quickColor(a,'#FF0000')
        a=a+'</h2><br>本关你击败了'+format(player.bx.defeat,0)+'/'+format(tmp.bx.levelgoal,0)+'个溜溜溜达嘿'
        a=a+'<br>当前溜溜溜达嘿血量为'+format(player.bx.daheiHP)
        if(tmp.bx.dps.gt(0)) a=a+'(-'+format(tmp.bx.dps)+'/s)'
        a=a+'<br>击败后掉落'+format(tmp.bx.getpt)+'点数'
        if(player.bx.level.div(5).floor().eq(player.bx.level.div(5))) a=a+'<br>BOSS关卡限时：'+formatTime(player.bx.leveltime)+'/'+formatTime(tmp.bx.timelimit)
        return a
    },
    getpt(){a=player.bx.level.pow(1.1).times(tmp.bx.effect).times(10)
        if(player.bx.level.gt(25)) a=a.times(n(1.15).pow(player.bx.level.sub(25)).pow(1.05))
        if(player.bx.level.div(5).floor().eq(player.bx.level.div(5))) a=a.times(10)
        return a
    },
    levelgoal(){a=player.bx.level.div(100).floor().add(10)
        if(player.bx.level.div(5).floor().eq(player.bx.level.div(5))) a=n(1)
        return a
    },
    timelimit(){a=n(1.79e309)
        if(player.bx.level.div(5).floor().eq(player.bx.level.div(5))) a=n(30).sub(player.bx.level.sub(1).div(20).floor())
        return a
    },
    attackeffect(){a=n(1)
        if(hasUpgrade('bx',21))a=a.add(1)
        if(hasUpgrade('bx',22))a=a.add(1)
        if(hasUpgrade('bx',23))a=a.add(1)
        if(hasUpgrade('bx',24))a=a.add(1)
        if(hasUpgrade('bx',25))a=a.add(1)
        a=a.add(buyableEffect(this.layer,11))
        return a
    },
    dps(){a=n(0)
        a=a.add(buyableEffect('bx',21))
        a=a.add(buyableEffect('bx',22))
        a=a.add(buyableEffect('bx',23))
        a=a.add(buyableEffect('bx',24))
        return a
    },
    allbxdmult(){a=n(1)
        if(hasUpgrade('bx',51)) a=a.times(1.5)
        return a
    },
})