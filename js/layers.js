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
        tooltip: "一次重置获得2个时间墙<br/>奖励：获得3.14倍的时间墙", 
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
    color: "#4BDC13",
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
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (hasChallenge('T',34)) exp = exp.times(1.1)
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: 进行时间墙重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    passiveGeneration()
    {
        mult = 0
        if (hasUpgrade('T', 35)) mult = new Decimal(0.01)
        if (hasChallenge('T', 12)) mult = mult.times(5)
        if (isEndgame()) mult = 0
        return mult
    },
    upgrades: {
        11: {
            name: "1-1",
            description: "每秒获得0.01点数",
            cost: new Decimal(1),
        },
        12: {
            name: "1-2",
            description: "获得点数*1.01",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade('T', 11)},
        },
        13: {
            name: "1-3",
            description: "获得点数*1.02",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade('T', 12)},
        },
        14: {
            name: "1-4",
            description: "获得点数*1.03",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade('T', 13)},
        },
        15: {
            name: "1-5",
            description: "获得点数*1.04",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade('T', 14)},
        },
        21: {
            name: "2-1",
            description: "基础获得点数+0.001",
            cost: new Decimal(5),
            unlocked() {return hasUpgrade('T', 14)},
        },
        22: {
            name: "2-2",
            description: "基础获得点数+0.002",
            cost: new Decimal(5),
            unlocked() {return hasUpgrade('T', 21)},
        },
        23: {
            name: "2-3",
            description: "获得点数^0.5(仅在获得点数<1时有效)",
            cost: new Decimal(5),
            unlocked() {return hasUpgrade('T', 22)},
        },
        24: {
            name: "2-4",
            description: "获得点数*1.2",
            cost: new Decimal(10),
            unlocked() {return hasUpgrade('T', 23)},
        },
        25: {
            name: "2-5",
            description: "基于时间墙数量加成点数获取",
            cost: new Decimal(20),
            effect() {
                return player[this.layer].points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('T', 24)},
        },
        31: {
            name: "3-1",
            description: "时间墙获取x2",
            cost: new Decimal(50),
            unlocked() {return hasUpgrade('T', 25)},
        },
        32: {
            name: "3-2",
            description: "解锁时间墙挑战",
            cost: new Decimal(50),
            unlocked() {return hasUpgrade('T', 31)},
        },
        33: {
            name: "3-3",
            description: "基于点数加成点数获取",
            cost: new Decimal(150),
            effect() {
                return player.points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('T', 32)},
        },
        34: {
            name: "3-4",
            description: "时间墙获取^1.1",
            cost: new Decimal(250),
            unlocked() {return hasUpgrade('T', 33)},
        },
        35: {
            name: "3-5",
            description: "每秒自动获取1%的时间墙",
            cost: new Decimal(500),
            unlocked() {return hasUpgrade('T', 34)},
        },
        41: {
            name: "4-1",
            description: "再次基于时间墙增加点数获取",
            cost: new Decimal(500),
            effect() {
                return player[this.layer].points.add(10).log(10)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasUpgrade('T', 34)},
        },
        42: {
            name: "4-2",
            description: "解锁第二个时间墙挑战",
            cost: new Decimal(1000),
            unlocked() {return hasUpgrade('T', 41)&&hasAchievement('A', 25)},
        },
        43: {
            name: "4-3",
            description: "再次基于点数增加点数获取",
            cost: new Decimal(1500),
            effect() {
                return player.points.add(10).log(10)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {return hasChallenge('T', 12)},
        },
        44: {
            name: "4-4",
            description: "解锁第三个时间墙挑战",
            cost: new Decimal(3000),
            unlocked() {return hasUpgrade('T', 43)},
        },
        45: {
            name: "4-5",
            description: "解锁一个支线层级",
            cost: new Decimal(1.79e308),
            unlocked() {return hasUpgrade('T', 44)},
        },
    },
    challenges: {
        11: {
            name: "TC1",
            challengeDescription: "当点数获取<1时，点数获取^2，反之^0.5",
            goalDescription:"2.085 点数",
            rewardDescription:"点数与时间墙获取x2.085",
            canComplete: function() {return player.points.gte(2.085)},
            unlocked() {return hasUpgrade('T',32)}
        },
        12: {
            name: "TC2",
            challengeDescription: "点数获取变为原来的获取量+1再log10",
            goalDescription:"3.08 点数",
            rewardDescription:"时间墙升级35的效果x5，点数获取^1.01，并解锁一个新的升级",
            canComplete: function() {return player.points.gte(3.08)},
            unlocked() {return hasUpgrade('T',42)}
        },
        13: {
            name: "TC3",
            challengeDescription: "所有加成点数获取的升级无效，但是…",
            goalDescription:"419 点数",
            rewardDescription:"解锁下一个层级，但还没做",
            canComplete: function() {return player.points.gte(419)},
            unlocked() {return hasUpgrade('T',44)}
        },
    },
    buyables: {
        11: {
            title:'点数翻倍（仅在TC3中生效）',
            cost(x) { return new Decimal(10).pow(x.sub(3)) },
            effect(x) {return new Decimal(3).pow(x)},
            display() { return "每次购买使点数x3<br/>当前已购买了"+ getBuyableAmount('T', 11) +"次<br/>效果：点数获取x"+buyableEffect('T', 11)+'<br/>下一次花费'+new Decimal(10).pow(getBuyableAmount('T', 11).sub(3))+'点数' },
            unlocked() {return inChallenge('T', 13)},
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    }
})
