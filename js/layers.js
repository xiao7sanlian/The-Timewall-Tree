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
	    if(isEndgame()) dev=n(0)
	    return dev
	   },
    row: 'side', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    achievementPopups: true,
    achievements: {
        11: {
     name: "时间墙之始",
     done() {return player.T.points.gte(1)}, 
     tooltip: "获得你的第一个时间墙！", 
     textStyle: {'color': '#ffe125'},
        },
    12: {
        name: "进展很慢",
        done() {return hasUpgrade('T', 15)}, 
        tooltip: "购买第一行的5个时间墙升级", 
        textStyle: {'color': '#ffe125'},
    },
    13: {
        name: "结束痛苦",
        done() {return hasUpgrade('T', 23)}, 
        tooltip: "购买时间墙升级23", 
        textStyle: {'color': '#ffe125'},
       },
       14: {
        name: "六六大顺",
        done() {return player.T.points.gte(6)}, 
        tooltip: "同时拥有6个时间墙", 
        textStyle: {'color': '#ffe125'},
       },
       15: {
        name: "一箭双雕",
        done() {return player.points.gte(32)}, 
        tooltip: "在没有对时间墙加成的情况下，一次重置获得2个时间墙（即获得32点数）<br/>奖励：获得3.14倍的时间墙", 
        textStyle: {'color': '#4bdc13'},
       },
       21: {
        name: "双倍点数",
        done() {return player.T.points.gte(31)}, 
        tooltip: "使时间墙升级25的效果达到2x", 
        textStyle: {'color': '#ffe125'},
       },
       22: {
        name: "开始挑战",
        done() {return hasChallenge('T', 11)}, 
        tooltip: "完成一个TC（时间墙挑战）", 
        textStyle: {'color': '#ffe125'},
       },
       23: {
        name: "TS181?",
        done() {return hasUpgrade('T', 35)}, 
        tooltip: "购买时间墙升级35", 
        textStyle: {'color': '#ffe125'},
       },
       24: {
        name: "点数膨胀",
        done() {return player.points.gte(100)}, 
        tooltip: "获得100点数", 
        textStyle: {'color': '#ffe125'},
       },
       25: {
        name: "反客为主",
        done() {return player.points.gte(player.T.points)&&player.T.points.gte(100)}, 
        tooltip: "使你的点数>时间墙>100<br/>奖励：点数获取x5，并解锁时间墙升级42（需要先购买升级41）", 
        textStyle: {'color': '#4bdc13'},
       },
       31: {
        name: "继续挑战",
        done() {return hasChallenge('T', 12)}, 
        tooltip: "完成TC2", 
        textStyle: {'color': '#ffe125'},
       },
       32: {
        name: "TC3?LC3!",
        done() {return hasChallenge('T', 13)}, 
        tooltip: "完成TC3", 
        textStyle: {'color': '#ffe125'},
       },
       33: {
        name: "终于重置",
        done() {return hasUpgrade('CT', 11)}, 
        tooltip: "获得一个压缩时间墙，并购买压缩时间墙升级11", 
        textStyle: {'color': '#ffe125'},
       },
       34: {
        name: "重获TS181",
        done() {return hasUpgrade('CT', 11)&&hasUpgrade('T', 35)}, 
        tooltip: "第一次压缩时间墙重置后购买时间墙升级35", 
        textStyle: {'color': '#ffe125'},
       },
       35: {
        name: "第二次重置",
        done() {return hasUpgrade('CT', 12)}, 
        tooltip: "获得第二个压缩时间墙，并购买压缩时间墙升级12<br/>奖励：时间墙升级35的效果x2，并降低时间墙升级45的价格", 
        textStyle: {'color': '#4bdc13'},
       },
       41: {
        name: "这是什么?",
        done() {return hasUpgrade('T', 45)}, 
        tooltip: "解锁支线层级", 
        textStyle: {'color': '#ffe125'},
       },
       42: {
        name: "这就是支线层级吗?",
        done() {return player.Q.points.gte(1)}, 
        tooltip: "获得一个QqQe308<br/>菜的不能再菜了、[笑哭][笑哭][喜欢][笑哭][笑哭][笑哭][笑哭][笑哭][喜欢][星星眼][打call][吃瓜][打call][打call][星星眼][打call]", 
        textStyle: {'color': '#ffe125'},
       },
       43: {
        name: "终于破百了!",
        done() {return getPointGen().gte(100)}, 
        tooltip: "使点数获取到达100/s", 
        textStyle: {'color': '#ffe125'},
       },
       44: {
        name: "Very hard",
        done() {return hasChallenge('CT', 11)}, 
        tooltip: "完成压缩时间墙挑战1", 
        textStyle: {'color': '#ffe125'},
       },
       45: {
        name: "不是哥们凭什么我完成了压缩时间墙挑战还要手动完成时间墙挑战啊",
        done() {return hasChallenge('CT', 11)&&hasChallenge('T',11)&&hasChallenge('T', 13)}, 
        tooltip: "完成压缩时间墙挑战1后完成3个时间墙挑战<br/>奖励：压缩时间墙重置后保留时间墙挑战完成状态", 
        textStyle: {'color': '#4bdc13'},
       },
       51: {
        name: "QqQe616",
        done() {return player.Q.points.gte(2)}, 
        tooltip: "获得2个QqQe308", 
        textStyle: {'color': '#ffe125'},
       },
       52: {
        name: "一箭双雕 II",
        done() {return player.T.points.gte(160000)}, 
        tooltip: "获得160000时间墙<br/>(能让你在无加成的情况下一次获得2压缩时间墙)", 
        textStyle: {'color': '#ffe125'},
       },
       53: {
        name: "不止这一次",
        done() {return new Decimal(challengeCompletions('CT', 12)).gte(1)}, 
        tooltip: "完成一次CTC2", 
        textStyle: {'color': '#ffe125'},
       },
       54: {
        name: "这不是反反软上限树",
        done() {return getPointGen().gte(1000000)}, 
        tooltip: "使点数获取到达软上限", 
        textStyle: {'color': '#ffe125'},
       },
       55: {
        name: "作者不会没活了吧",
        done() {return player.Q.points.gte(5)}, 
        tooltip: "获得5个QqQe308<br/>奖励：作者都没活了还有啥奖励", 
        textStyle: {'color': '#4bdc13'},
       },
       61: {
        name: "终于有QoL了!",
        done() {return hasUpgrade('CT', 31)}, 
        tooltip: "获得压缩时间墙升级31", 
        textStyle: {'color': '#ffe125'},
       },
       62: {
        name: "完美完成!",
        done() {return new Decimal(challengeCompletions('CT', 12)).gte(5)}, 
        tooltip: "完成5次CTC2", 
        textStyle: {'color': '#ffe125'},
       },
       63: {
        name: "没有TS181你让我怎么活啊",
        done() {return hasChallenge('CT', 13)}, 
        tooltip: "完成CTC3", 
        textStyle: {'color': '#ffe125'},
       },
       64: {
        name: "还来?",
        done() {return hasUpgrade('CT', 42)}, 
        tooltip: "解锁CTC4", 
        textStyle: {'color': '#ffe125'},
       },
       65: {
        name: "终于买到了!",
        done() {return hasUpgrade('T', 53)}, 
        tooltip: "购买时间墙升级53<br/>奖励：时间墙升级35的效果x10，并解锁压缩时间墙升级43(需要先购买升级42)", 
        textStyle: {'color': '#4bdc13'},
       },
       71: {
        name: "软上限快废了，作者正在考虑搞二重软上限",
        done() {return new Decimal(sc1power()).gte(0.2)}, 
        tooltip: "使软上限指数到达0.2", 
        textStyle: {'color': '#ffe125'},
       },
       72: {
        name: "这下真有二重软上限了",
        done() {return n(getPointGen()).gte(1e9)}, 
        tooltip: "使点数获取到达二重软上限", 
        textStyle: {'color': '#ffe125'},
       },
       73: {
        name: "QqQe2772",
        done() {return player.Q.points.gte(9)}, 
        tooltip: "获得9个QqQe308", 
        textStyle: {'color': '#ffe125'},
       },
       74: {
        name: "支线二!",
        done() {return player.Qi.points.gte(1)}, 
        tooltip: "获得1个QqQeInfinity", 
        textStyle: {'color': '#ffe125'},
       },
       75: {
        name: "Top10我最香草的AD群群友——Top1:QqQe308",
        done() {return player.Qi.QqQe308.gte(1)}, 
        tooltip: "超一次QqQe308<br/>奖励：解锁压缩时间墙升级52(需要先购买升级51)", 
        textStyle: {'color': '#4bdc13'},
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
        if (hasMilestone('Q', 2)) mult = mult.times(2)
        if (hasMilestone('Q', 3)) mult = mult.times(2)
        if (hasMilestone('Q', 4)) mult = mult.times(2)
        if (hasMilestone('Q', 5)) mult = mult.times(3)
        if (hasMilestone('Qi', 0)) mult = mult.times(5)
        if (hasUpgrade('CT', 14)) mult = mult.times(upgradeEffect('CT', 14))
        if (hasUpgrade('CT', 25)) mult = mult.times(upgradeEffect('CT', 25))
        if (hasChallenge('CT', 13)) mult = mult.times(challengeEffect('CT', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (hasUpgrade('T',34)) exp = exp.times(1.1)
        if (inChallenge('CT', 11)) exp = exp.times(0.5)
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
    if (hasAchievement('A', 45)) kept.push("challenges")
    if (hasUpgrade('CT', 31)) kept.push("upgrades")
    layerDataReset(this.layer, kept)
       }
    },
    update(diff){
        if (hasUpgrade('CT',51)&&layers.T.buyables[11].canAfford()) layers.T.buyables[11].buy();
    },
    passiveGeneration()
    {
        mult = new Decimal(0)
        if (hasUpgrade('T', 35)||hasChallenge('CT', 11)) mult = new Decimal(0.01)
        if (hasChallenge('T', 12)) mult = mult.times(5)
        if (hasAchievement('A', 35)) mult = mult.times(2)
        if (hasAchievement('A', 65)) mult = mult.times(10)
        if (inChallenge('CT', 13)) mult = 0
        if (isEndgame()) mult = 0
        return mult
    },
    upgrades: {
        11: {
            title: "1-1",
            description: "获得点数*1",
            cost: new Decimal(0),
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
            description: "解锁第三个层级(WIP)",
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
            buy() {
                if(!hasUpgrade('CT', 51)) player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    }
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
        return a
    }, // Can be a function that takes requirement increases into account
    resource: "QqQe308", // Name of prestige currency
    baseResource: "点数", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(0.1)
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "q", description: "Q: 进行QqQe308重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasAchievement('A', 41)},
    doReset(resettingLayer) {
        //if (layers[resettingLayer].row > layers[this.layer].row) {
     //let kept = ["unlocked", "upgrades","auto","challenges","milestones"]
     //layerDataReset(this.layer, kept)
        //}
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
    requires: new Decimal(5000), // Can be a function that takes requirement increases into account
    resource: "压缩时间墙", // Name of prestige currency
    baseResource: "时间墙", // Name of resource prestige is based on
    baseAmount() {return player.T.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('CT',31)) mult = mult.times(2)
        if (hasUpgrade('CT',33)) mult = mult.times(upgradeEffect('CT', 33))
        if (hasMilestone('Q', 5)) mult = mult.times(3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (hasChallenge('CT', 14)) exp = exp.times(1.01)
        return exp
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: 进行压缩时间墙重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasAchievement('A', 32)},
    passiveGeneration()
    {
        mult = n(0)
        if (hasUpgrade('CT', 53)) mult = n(upgradeEffect('CT', 53)).times(0.01)
        if (isEndgame()) mult = 0
        return mult
    },
    branches: ['T','Q'],
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
            unlocked() {return hasUpgrade('CT',15)}
        },
        12: {
            name: "CTC2",
            challengeDescription(){return "点数获取^0.5<br>完成次数:"+challengeCompletions(this.layer,this.id)+"/5"},
            goalDescription(){return "1e"+new Decimal(3).add(challengeCompletions(this.layer,this.id))+"时间墙"},
            rewardDescription(){return "根据挑战完成次数增益点数获取<br/>效果：×"+format(challengeEffect(this.layer,this.id))+"<br/>每次完成后，额外解锁一个新的升级"},
            rewardEffect() {eff= new Decimal(challengeCompletions(this.layer,this.id)).add(1).pow(1.5)
            return eff
            },
            unlocked(){return hasUpgrade('CT', 23)},
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
            unlocked() {return hasUpgrade('CT',35)}
        },
        14: {
            name: "CTC4",
            challengeDescription: "点数获取变为原来的获取量+1再log10",
            goalDescription:"100000 时间墙",
            rewardDescription:"压缩时间墙获取^1.01",
            canComplete: function() {return player.T.points.gte(100000)},
            unlocked() {return hasUpgrade('CT',42)}
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
                player.points = player.points.sub(this.cost())
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
                player.T.points = player.T.points.sub(this.cost())
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
                player.CT.points = player.CT.points.sub(this.cost())
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
                player.points = player.points.sub(this.cost())
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
        Supermantime: new Decimal(0),
        choice: new Decimal(1),
    }},
    color: "#aee308",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
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
        return exp
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: 进行QqQeInfinity重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasMilestone('Q', 6)},
    doReset(resettingLayer) {
        //if (layers[resettingLayer].row > layers[this.layer].row) {
     //let kept = ["unlocked", "upgrades","auto","challenges","milestones"]
     //layerDataReset(this.layer, kept)
        //}
    },
    update(diff){
        if (hasMilestone('Qi', 0)&&player.Qi.choice.eq(n(2))&&!isEndgame()) player.Qi.Supermantime = player.Qi.Supermantime.add(n(diff));
        if (player.Qi.Supermantime.gte(n(tmp.Qi.Supermanspeed))&&hasMilestone('Qi', 0)) player.Qi.QqQe308 = player.Qi.QqQe308.add(1); 
        if (player.Qi.Supermantime.gte(n(tmp.Qi.Supermanspeed))&&hasMilestone('Qi', 0)) player.Qi.Supermantime = player.Qi.Supermantime.sub(n(tmp.Qi.Supermanspeed))
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
                content: [ "milestones"]}, 
            "Superman": {
                unlocked() {return hasMilestone('Qi', 0)},
                content: [["display-text", () => "你超了QqQe308 <h3 style='color: #aee308; text-shadow: 0 0 3px #c2b280'>" + 
                    format(player.Qi.QqQe308) + "</h3> 次, 使QqQe308的获取需求 <h3 style='color: #aee308; text-shadow: 0 0 3px #c2b280'> " + "/" +format(tmp.Qi.QqQe308effect)+ "</h3>.<br>" + 
                    "<h4>" + " 基于你的QqQeInfinity数量，QqQeInfinity每"+ format(tmp.Qi.Supermanspeed) +"秒超一次QqQe308<h4> <br>" + 
                    "当前剩余"+format(n(tmp.Qi.Supermanspeed).sub(player.Qi.Supermantime))+"秒<br/>"+tmp.Qi.Showchoice],
                "clickables"]},
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
            requirementDescription: "1 QqQeInifnity",
            effectDescription: "获得5倍点数与时间墙，并解锁QqQeInfinity的超人功能",
            done() { return player.Qi.points.gte(1) }
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
            canClick() {return true},
            onClick() {player.Qi.choice = n(2)},
        },
    },
    QqQe308effect() {
        a = n(player.Qi.QqQe308).add(1)
        return a
    },
    Supermanspeed() {
        a = n(1200).div(player.Qi.points.min(1))
        return a
    },
    Showchoice() {
        a = "QqQeInfinity当前"
        if (player.Qi.choice.eq(n(1))) a = a + "不在超人"
        if (player.Qi.choice.eq(n(2))) a = a + "正在超QqQe308"
        return a
    },
})
