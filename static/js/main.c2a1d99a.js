(()=>{"use strict";var e={9016:(e,t,i)=>{i.r(t),i.d(t,{default:()=>D});var n=i(8894),o=i(296),l=i(6665),r=i(3668),s=i(3929),a=i(6283),c=i(4701),d=i(7509),u=i(1815),f=i(9685),g=i(8264),h=i(8198),p=i(932),b=i(5458),m=i(6725),x=i(397),y=function(e){var t=e?1.5:1;return r.default.create({container:{alignItems:"center",justifyContent:"center",padding:20,paddingTop:30,position:"relative",height:340,backgroundColor:"#E8F5E9",borderRadius:15,marginVertical:15,marginTop:20},webContainer:{width:"80%",maxWidth:600,height:"auto",minHeight:340,marginHorizontal:"auto"},pointsDisplay:{alignItems:"center",marginBottom:25,backgroundColor:"#4CAF50",paddingVertical:14,paddingHorizontal:35,borderRadius:30,shadowColor:"#000",shadowOffset:{width:0,height:4},shadowOpacity:.35,shadowRadius:7,elevation:10,borderWidth:2,borderColor:"#388E3C"},webPointsDisplay:{width:"100%",maxWidth:500},pointsValue:{fontSize:38,fontWeight:"bold",color:"white",textShadowColor:"rgba(0, 0, 0, 0.2)",textShadowOffset:{width:1,height:1},textShadowRadius:3},webPointsValue:{fontSize:38*t},pointsLabel:{fontSize:16,color:"#E8F5E9",fontWeight:"600",marginTop:2},webPointsLabel:{fontSize:16*t},clickButton:{width:150,height:150,borderRadius:75,backgroundColor:"#4CAF50",justifyContent:"center",alignItems:"center",shadowColor:"#000",shadowOffset:{width:0,height:4},shadowOpacity:.3,shadowRadius:5,elevation:8},webClickButton:{width:150*t,height:150*t,borderRadius:75*t},innerCircle:{width:130,height:130,borderRadius:65,backgroundColor:"#81C784",justifyContent:"center",alignItems:"center",borderWidth:3,borderColor:"#388E3C"},webInnerCircle:{width:130*t,height:130*t,borderRadius:65*t},buttonText:{fontSize:48,marginBottom:5},webButtonText:{fontSize:48*t},buttonSubtext:{fontSize:12,color:"#1B5E20",fontWeight:"bold"},webButtonSubtext:{fontSize:12*t},floatingText:{position:"absolute",zIndex:1,fontSize:30,fontWeight:"bold",color:"#2f8032"},pointsPerSecondContainer:{marginTop:15,alignItems:"center",backgroundColor:"#81C784",paddingVertical:6,paddingHorizontal:15,borderRadius:15},webPointsPerSecondContainer:{width:"100%",maxWidth:500},pointsPerSecondValue:{fontSize:18,fontWeight:"bold",color:"white"},webPointsPerSecondValue:{fontSize:18*t},pointsPerSecondLabel:{fontSize:12,color:"#E8F5E9"},webPointsPerSecondLabel:{fontSize:12*t},valueText:{marginTop:10,fontSize:16,color:"#1B5E20",fontWeight:"500"},webValueText:{fontSize:16*t}})};const v=function(e){var t=e.onPress,i=e.clickValue,n=e.ecoPoints,r=e.pointsPerSecond,c=e.formatNumber,d=!0,u=m.default.get("window"),g=(u.width,u.height,y(d)),p=(0,l.useState)([]),v=(0,o.default)(p,2),C=v[0],j=v[1],P=(0,l.useState)(0),w=(0,o.default)(P,2),k=w[0],S=w[1];return(0,x.jsxs)(s.default,{style:[g.container,g.webContainer],children:[(0,x.jsxs)(s.default,{style:[g.pointsDisplay,g.webPointsDisplay],children:[(0,x.jsx)(a.default,{style:[g.pointsValue,g.webPointsValue],children:c(n)}),(0,x.jsx)(a.default,{style:[g.pointsLabel,g.webPointsLabel],children:"Eco Points"})]}),C.map((function(e){return(0,x.jsx)(h.default.Text,{style:[g.floatingText,{opacity:e.opacity,transform:[{translateX:e.position.x},{translateY:e.translateY}]}],children:e.value},e.id)})),(0,x.jsx)(f.default,{style:[g.clickButton,g.webClickButton],onPress:function(){t();var e={id:k,position:{x:80*Math.random()-40,y:-20-30*Math.random()},opacity:new h.default.Value(1),translateY:new h.default.Value(0),value:`+${i}`};S(k+1),j([].concat((0,b.default)(C),[e])),h.default.parallel([h.default.timing(e.opacity,{toValue:0,duration:1500,useNativeDriver:!0}),h.default.timing(e.translateY,{toValue:-100,duration:1500,useNativeDriver:!0})]).start((function(){j((function(t){return t.filter((function(t){return t.id!==e.id}))}))}))},activeOpacity:.7,children:(0,x.jsxs)(s.default,{style:[g.innerCircle,g.webInnerCircle],children:[(0,x.jsx)(a.default,{style:[g.buttonText,g.webButtonText],children:"\ud83c\udf0d"}),(0,x.jsx)(a.default,{style:[g.buttonSubtext,g.webButtonSubtext],children:"Click to help!"})]})}),(0,x.jsxs)(s.default,{style:[g.pointsPerSecondContainer,g.webPointsPerSecondContainer],children:[(0,x.jsxs)(a.default,{style:[g.pointsPerSecondValue,g.webPointsPerSecondValue],children:["+",c(r)]}),(0,x.jsx)(a.default,{style:[g.pointsPerSecondLabel,g.webPointsPerSecondLabel],children:"points per second"})]}),(0,x.jsxs)(a.default,{style:[g.valueText,g.webValueText],children:["+",i," eco points per click"]})]})};var C=r.default.create({container:{flex:1,padding:10,backgroundColor:"#E8F5E9",borderRadius:10,marginVertical:10},title:{fontSize:20,fontWeight:"bold",color:"#2E7D32",marginBottom:10,textAlign:"center"},buildingsList:{flex:1},buildingItem:{flexDirection:"row",borderRadius:8,padding:12,marginBottom:10,alignItems:"center"},affordableBuilding:{backgroundColor:"#C8E6C9",borderWidth:1,borderColor:"#43A047"},unaffordableBuilding:{backgroundColor:"#DCEDC8",borderWidth:1,borderColor:"#AED581",opacity:.8},maxedBuilding:{backgroundColor:"#B3E5FC",borderWidth:1,borderColor:"#29B6F6"},buildingIcon:{width:50,height:50,borderRadius:25,backgroundColor:"#FFFFFF",justifyContent:"center",alignItems:"center",marginRight:10,shadowColor:"#000",shadowOffset:{width:0,height:2},shadowOpacity:.1,shadowRadius:3,elevation:3},iconText:{fontSize:24},buildingInfo:{flex:1},buildingHeader:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginBottom:4},buildingName:{fontSize:16,fontWeight:"bold",color:"#1B5E20"},buildingLevel:{fontSize:14,fontWeight:"500",color:"#388E3C"},prestigeLevel:{color:"#FF6F00",fontWeight:"bold"},buildingDescription:{fontSize:14,color:"#33691E",marginBottom:6},prestigeBonus:{fontSize:12,color:"#FF6F00",fontWeight:"bold",marginBottom:6},buildingFooter:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},costText:{fontSize:14,fontWeight:"bold"},affordableText:{color:"#2E7D32"},unaffordableText:{color:"#BF360C"},maxedText:{color:"#0288D1"},effectText:{fontSize:13,color:"#33691E",fontStyle:"italic"},emptyContainer:{padding:20,alignItems:"center",justifyContent:"center"},emptyText:{fontSize:16,color:"#689F38",textAlign:"center"},prestigeContainer:{marginTop:5,backgroundColor:"#FFF3E0",padding:8,borderRadius:5,borderWidth:1,borderColor:"#FFB74D"},prestigeText:{fontSize:13,color:"#E65100",marginBottom:5,textAlign:"center"},prestigeButton:{backgroundColor:"#FF9800",paddingVertical:5,paddingHorizontal:10,borderRadius:4,alignSelf:"center"},prestigeButtonText:{color:"white",fontWeight:"bold",fontSize:14}});const j=function(e){var t=e.buildings,i=e.ecoPoints,n=e.onPurchase,o=e.prestigeBuilding,l=e.checkCanPrestige,r=e.getPrestigeBonus,c=e.getBuildingCost,u=t.filter((function(e){return e.unlocked}));return(0,x.jsxs)(s.default,{style:C.container,children:[(0,x.jsx)(a.default,{style:C.title,children:"Buildings"}),0===u.length?(0,x.jsx)(s.default,{style:C.emptyContainer,children:(0,x.jsx)(a.default,{style:C.emptyText,children:"No buildings available yet! Keep clicking to unlock more."})}):(0,x.jsx)(d.default,{style:C.buildingsList,children:u.map((function(e){var t=c(e.id),d=i>=t,u=e.level>=e.maxLevel,g=l&&l(e.id),h=r(e.id),p=e.prestigeLevel>0?(e.prestigeLevel*h*100).toFixed(0):0;return(0,x.jsxs)(f.default,{style:[C.buildingItem,u?C.maxedBuilding:d?C.affordableBuilding:C.unaffordableBuilding],onPress:function(){return g?o(e.id):n(e.id)},disabled:!d&&!g,children:[(0,x.jsx)(s.default,{style:C.buildingIcon,children:(0,x.jsx)(a.default,{style:C.iconText,children:e.icon})}),(0,x.jsxs)(s.default,{style:C.buildingInfo,children:[(0,x.jsxs)(s.default,{style:C.buildingHeader,children:[(0,x.jsx)(a.default,{style:C.buildingName,children:e.name}),(0,x.jsxs)(a.default,{style:C.buildingLevel,children:["Lvl ",e.level,"/",e.maxLevel,e.prestigeLevel>0&&(0,x.jsxs)(a.default,{style:C.prestigeLevel,children:[" \ud83c\udf1f",e.prestigeLevel]})]})]}),(0,x.jsx)(a.default,{style:C.buildingDescription,children:e.description}),e.prestigeLevel>0&&(0,x.jsxs)(a.default,{style:C.prestigeBonus,children:["Current prestige bonus: +",p,"%"]}),g?(0,x.jsxs)(s.default,{style:C.prestigeContainer,children:[(0,x.jsxs)(a.default,{style:C.prestigeText,children:["Prestige now for +",(100*h).toFixed(0),"% permanent bonus!"]}),(0,x.jsx)(f.default,{style:C.prestigeButton,onPress:function(){return o(e.id)},children:(0,x.jsx)(a.default,{style:C.prestigeButtonText,children:"PRESTIGE \ud83c\udf1f"})})]}):(0,x.jsxs)(s.default,{style:C.buildingFooter,children:[(0,x.jsx)(a.default,{style:[C.costText,u?C.maxedText:d?C.affordableText:C.unaffordableText],children:u?"MAX LEVEL":`Cost: ${t} eco points`}),"passive"===e.type&&(0,x.jsxs)(a.default,{style:C.effectText,children:["+",(e.baseEffect*(e.level+1)*(1+(e.prestigeLevel*h||0))).toFixed(1)," pts/sec"]}),"click"===e.type&&(0,x.jsxs)(a.default,{style:C.effectText,children:["+",(e.baseEffect*(e.level+1)*(1+(e.prestigeLevel*h||0))).toFixed(1)," per click"]}),"multiplier"===e.type&&(0,x.jsxs)(a.default,{style:C.effectText,children:["+",(e.baseEffect*(e.level+1)*(1+(e.prestigeLevel*h||0))*100).toFixed(1),"% bonus"]})]})]})]},e.id)}))})]})};var P=r.default.create({container:{flex:1,padding:10,backgroundColor:"#E8F5E9",borderRadius:10,marginVertical:10},title:{fontSize:20,fontWeight:"bold",color:"#2E7D32",marginBottom:15,textAlign:"center"},statsContainer:{flexDirection:"row",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap"},statItem:{alignItems:"center",minWidth:"22%",marginBottom:10},statValue:{fontSize:18,fontWeight:"bold",color:"#1B5E20"},statLabel:{fontSize:12,color:"#388E3C"},divider:{height:1,backgroundColor:"#81C784",marginVertical:10},sectionTitle:{fontSize:16,fontWeight:"bold",color:"#2E7D32",marginVertical:10},impactContainer:{flexDirection:"row",justifyContent:"space-around",marginBottom:15},impactItem:{flexDirection:"row",alignItems:"center"},impactIcon:{fontSize:24,marginRight:8},impactTextContainer:{alignItems:"flex-start"},impactValue:{fontSize:16,fontWeight:"bold",color:"#1B5E20"},impactLabel:{fontSize:12,color:"#388E3C"},achievementsContainer:{maxHeight:200},achievementItem:{flexDirection:"row",alignItems:"center",backgroundColor:"#C8E6C9",borderRadius:8,padding:10,marginBottom:8},lockedAchievement:{backgroundColor:"#F1F8E9",opacity:.6},achievementIcon:{fontSize:24,marginRight:10},achievementInfo:{flex:1},achievementName:{fontSize:14,fontWeight:"bold",color:"#1B5E20"},achievementDescription:{fontSize:12,color:"#33691E"},lockedAchievementName:{fontSize:14,fontWeight:"bold",color:"#689F38"},lockedAchievementDescription:{fontSize:12,color:"#689F38",fontStyle:"italic"}});const w=function(e){var t=e.stats,i=e.resources,n=e.pointsPerSecond,o=e.achievements,l=o.filter((function(e){return e.unlocked})),r=o.filter((function(e){return!e.unlocked}));return(0,x.jsxs)(s.default,{style:P.container,children:[(0,x.jsx)(a.default,{style:P.title,children:"Stats & Achievements"}),(0,x.jsxs)(s.default,{style:P.statsContainer,children:[(0,x.jsxs)(s.default,{style:P.statItem,children:[(0,x.jsx)(a.default,{style:P.statValue,children:Math.floor(i.ecoPoints)}),(0,x.jsx)(a.default,{style:P.statLabel,children:"Eco Points"})]}),(0,x.jsxs)(s.default,{style:P.statItem,children:[(0,x.jsx)(a.default,{style:P.statValue,children:n.toFixed(2)}),(0,x.jsx)(a.default,{style:P.statLabel,children:"Points/sec"})]}),(0,x.jsxs)(s.default,{style:P.statItem,children:[(0,x.jsx)(a.default,{style:P.statValue,children:t.totalClicks}),(0,x.jsx)(a.default,{style:P.statLabel,children:"Total Clicks"})]}),(0,x.jsxs)(s.default,{style:P.statItem,children:[(0,x.jsx)(a.default,{style:P.statValue,children:Math.floor(t.totalEcoPoints)}),(0,x.jsx)(a.default,{style:P.statLabel,children:"Total Points"})]})]}),(0,x.jsx)(s.default,{style:P.divider}),(0,x.jsx)(a.default,{style:P.sectionTitle,children:"Environmental Impact"}),(0,x.jsxs)(s.default,{style:P.impactContainer,children:[(0,x.jsxs)(s.default,{style:P.impactItem,children:[(0,x.jsx)(a.default,{style:P.impactIcon,children:"\ud83c\udf33"}),(0,x.jsxs)(s.default,{style:P.impactTextContainer,children:[(0,x.jsx)(a.default,{style:P.impactValue,children:t.treesPlanted.toFixed(2)}),(0,x.jsx)(a.default,{style:P.impactLabel,children:"Trees Planted"})]})]}),(0,x.jsxs)(s.default,{style:P.impactItem,children:[(0,x.jsx)(a.default,{style:P.impactIcon,children:"\ud83d\udca8"}),(0,x.jsxs)(s.default,{style:P.impactTextContainer,children:[(0,x.jsxs)(a.default,{style:P.impactValue,children:[t.co2Reduced.toFixed(2)," kg"]}),(0,x.jsx)(a.default,{style:P.impactLabel,children:"CO2 Reduced"})]})]})]}),(0,x.jsx)(s.default,{style:P.divider}),(0,x.jsxs)(a.default,{style:P.sectionTitle,children:["Achievements (",l.length,"/",o.length,")"]}),(0,x.jsxs)(d.default,{style:P.achievementsContainer,children:[l.map((function(e){return(0,x.jsxs)(s.default,{style:P.achievementItem,children:[(0,x.jsx)(a.default,{style:P.achievementIcon,children:e.icon}),(0,x.jsxs)(s.default,{style:P.achievementInfo,children:[(0,x.jsx)(a.default,{style:P.achievementName,children:e.name}),(0,x.jsx)(a.default,{style:P.achievementDescription,children:e.description})]})]},e.id)})),r.map((function(e){return(0,x.jsxs)(s.default,{style:[P.achievementItem,P.lockedAchievement],children:[(0,x.jsx)(a.default,{style:P.achievementIcon,children:"\ud83d\udd12"}),(0,x.jsxs)(s.default,{style:P.achievementInfo,children:[(0,x.jsx)(a.default,{style:P.lockedAchievementName,children:"???"}),(0,x.jsx)(a.default,{style:P.lockedAchievementDescription,children:"Keep playing to unlock!"})]})]},e.id)}))]})]})};var k=i(4467);const S=JSON.parse('[{"id":"solar_panel","name":"Solar Panel","description":"Generate 1 eco point per second","baseCost":10,"maxLevel":50,"baseEffect":1,"type":"passive","resource":"ecoPoints","unlocked":true,"icon":"\u2600\ufe0f"},{"id":"recycling_center","name":"Recycling Center","description":"Increase click value by 1","baseCost":25,"maxLevel":30,"baseEffect":1,"type":"click","resource":"ecoPoints","unlocked":true,"icon":"\u267b\ufe0f"},{"id":"tree_plantation","name":"Tree Plantation","description":"Plant trees and generate 5 eco points per second","baseCost":100,"maxLevel":20,"baseEffect":5,"type":"passive","resource":"ecoPoints","unlocked":false,"unlockAt":50,"icon":"\ud83c\udf33"},{"id":"wind_farm","name":"Wind Farm","description":"Generate 10 eco points per second","baseCost":250,"maxLevel":15,"baseEffect":10,"type":"passive","resource":"ecoPoints","unlocked":false,"unlockAt":150,"icon":"\ud83c\udf2c\ufe0f"},{"id":"eco_education","name":"Eco Education","description":"Increase all production by 10%","baseCost":500,"maxLevel":10,"baseEffect":0.1,"type":"multiplier","resource":"ecoPoints","unlocked":false,"unlockAt":300,"icon":"\ud83d\udcda"}]'),T=JSON.parse('[{"id":"first_click","name":"First Step to Change","description":"Make your first eco-click","unlocked":false,"conditionType":"totalClicks","conditionValue":1,"conditionText":"Clicked the Earth 1 time","icon":"\ud83d\udc46"},{"id":"eco_warrior","name":"Eco Warrior","description":"Reach 100 eco points","unlocked":false,"conditionType":"totalEcoPoints","conditionValue":100,"conditionText":"Earned 100 Eco Points","icon":"\ud83c\udf31"},{"id":"environmental_hero","name":"Environmental Hero","description":"Reach 1000 eco points","unlocked":false,"conditionType":"totalEcoPoints","conditionValue":1000,"conditionText":"Earned 1000 Eco Points","icon":"\ud83e\uddb8"},{"id":"building_master","name":"Building Master","description":"Purchase 10 buildings","unlocked":false,"conditionType":"totalBuildings","conditionValue":10,"conditionText":"Purchased 10 buildings in total","icon":"\u2b06\ufe0f"},{"id":"prestige_pioneer","name":"Prestige Pioneer","description":"Prestige your first building","unlocked":false,"conditionType":"totalPrestiges","conditionValue":1,"conditionText":"Prestiged a building for the first time","icon":"\ud83c\udf1f"},{"id":"prestige_master","name":"Prestige Master","description":"Prestige buildings 10 times total","unlocked":false,"conditionType":"totalPrestiges","conditionValue":10,"conditionText":"Prestiged buildings 10 times in total","icon":"\u2728"}]');function E(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function B(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?E(Object(i),!0).forEach((function(t){(0,k.default)(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):E(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}var F=.1,I={resources:{ecoPoints:0,carbonOffset:0,renewableEnergy:0},stats:{totalClicks:0,totalEcoPoints:0,treesPlanted:0,co2Reduced:0,totalPrestiges:0},multipliers:{clickMultiplier:1,passiveMultiplier:1},buildings:S.map((function(e){return B(B({},e),{},{level:0,prestigeLevel:0})})),achievements:T.map((function(e){return B(B({},e),{},{unlocked:!1})})),notifications:[],settings:{soundEnabled:!0,particlesEnabled:!0},lastSaved:null},z=function(e,t,i){var n=e*Math.pow(1.5,i);return Math.floor(n*Math.pow(1.15,t))},L=function(e,t){return e.filter((function(e){return"passive"===e.type&&e.level>0})).reduce((function(e,t){var i=1+t.prestigeLevel*F;return e+t.baseEffect*t.level*i}),0)*t.passiveMultiplier},V=function(e,t){return(1+e.filter((function(e){return"click"===e.type&&e.level>0})).reduce((function(e,t){var i=1+t.prestigeLevel*F;return e+t.baseEffect*t.level*i}),0))*t.clickMultiplier};const O=function(){var e=(0,l.useState)((function(){var e=localStorage.getItem("ecoClickerSave");if(e)try{var t=JSON.parse(e);return B(B(B({},I),t),{},{stats:B(B(B({},I.stats),t.stats),{},{totalPrestiges:t.stats.totalPrestiges||0}),buildings:I.buildings.map((function(e){var i=t.buildings.find((function(t){return t.id===e.id}));return i?B(B({},e),{},{level:i.level||0,unlocked:void 0!==i.unlocked?i.unlocked:e.unlocked,prestigeLevel:i.prestigeLevel||0}):e})),achievements:I.achievements.map((function(e){var i=t.achievements.find((function(t){return t.id===e.id}));return i?B(B({},e),{},{unlocked:i.unlocked||!1}):e})),notifications:[]})}catch(i){return console.error("Failed to parse saved game state:",i),localStorage.removeItem("ecoClickerSave"),I}return I})),t=(0,o.default)(e,2),i=t[0],n=t[1];(0,l.useEffect)((function(){var e=function(){var e=B(B({},i),{},{lastSaved:(new Date).toISOString()});localStorage.setItem("ecoClickerSave",JSON.stringify(e))},t=setInterval(e,3e4);return function(){clearInterval(t),e()}}),[i]),(0,l.useEffect)((function(){var e=L(i.buildings,i.multipliers);if(e>0){var t=setInterval((function(){n((function(t){var i=t.buildings.find((function(e){return"tree_plantation"===e.id})),n=0;if(i&&i.level>0){var o=1+i.prestigeLevel*F;n=i.baseEffect*i.level*o*t.multipliers.passiveMultiplier}var l=.02*n,r=.05*e;return B(B({},t),{},{resources:B(B({},t.resources),{},{ecoPoints:t.resources.ecoPoints+e}),stats:B(B({},t.stats),{},{totalEcoPoints:t.stats.totalEcoPoints+e,treesPlanted:t.stats.treesPlanted+l,co2Reduced:t.stats.co2Reduced+r})})}))}),1e3);return function(){return clearInterval(t)}}}),[i.buildings,i.multipliers]),(0,l.useEffect)((function(){if(i.notifications.length>0){var e=setTimeout((function(){n((function(e){return B(B({},e),{},{notifications:e.notifications.slice(1)})}))}),5e3);return function(){return clearTimeout(e)}}}),[i.notifications]),(0,l.useEffect)((function(){var e=!1,t=B({},i),o=(0,b.default)(i.notifications);t.buildings=i.buildings.map((function(t){return!t.unlocked&&t.unlockAt&&i.resources.ecoPoints>=t.unlockAt?(e=!0,o.push({id:`building-${t.id}`,type:"building",title:"New Building Unlocked!",message:`${t.name} (${t.icon}) is now available for purchase!`,icon:t.icon}),B(B({},t),{},{unlocked:!0})):t})),t.achievements=i.achievements.map((function(t){return!t.unlocked&&function(e,t){switch(e.conditionType){case"totalClicks":return t.stats.totalClicks>=e.conditionValue;case"totalEcoPoints":return t.stats.totalEcoPoints>=e.conditionValue;case"totalBuildings":return t.buildings.reduce((function(e,t){return e+t.level}),0)>=e.conditionValue;case"totalPrestiges":return t.stats.totalPrestiges>=e.conditionValue;default:return!1}}(t,i)?(e=!0,o.push({id:`achievement-${t.id}`,type:"achievement",title:"Achievement Unlocked!",message:`${t.name}: ${t.description}`,condition:t.conditionText,icon:t.icon}),B(B({},t),{},{unlocked:!0})):t})),e&&n(B(B({},t),{},{notifications:o}))}),[i.resources,i.stats,i.buildings]);return{gameState:i,handleClick:function(){var e=V(i.buildings,i.multipliers),t=.05*e;n((function(i){return B(B({},i),{},{resources:B(B({},i.resources),{},{ecoPoints:i.resources.ecoPoints+e}),stats:B(B({},i.stats),{},{totalClicks:i.stats.totalClicks+1,totalEcoPoints:i.stats.totalEcoPoints+e,co2Reduced:i.stats.co2Reduced+t})})}))},purchaseBuilding:function(e){var t=i.buildings.findIndex((function(t){return t.id===e}));if(-1===t)return!1;var o=i.buildings[t];if(o.level>=o.maxLevel)return!1;var l=z(o.baseCost,o.level,o.prestigeLevel);if(i.resources.ecoPoints<l)return!1;var r=(0,b.default)(i.buildings);r[t]=B(B({},o),{},{level:o.level+1});var s=B({},i.multipliers);if("multiplier"===o.type){var a=1+o.prestigeLevel*F,c=o.baseEffect*a;s={clickMultiplier:i.multipliers.clickMultiplier+c,passiveMultiplier:i.multipliers.passiveMultiplier+c}}return n((function(e){return B(B({},e),{},{resources:B(B({},e.resources),{},{ecoPoints:e.resources.ecoPoints-l}),buildings:r,multipliers:s})})),!0},prestigeBuilding:function(e){var t=i.buildings.findIndex((function(t){return t.id===e}));if(-1===t)return!1;var o=i.buildings[t];if(o.level<o.maxLevel)return!1;var l=(0,b.default)(i.buildings);l[t]=B(B({},o),{},{level:0,prestigeLevel:o.prestigeLevel+1});var r=B({},i.multipliers);if("multiplier"===o.type){var s=o.baseEffect*o.level;o.prestigeLevel;r={clickMultiplier:i.multipliers.clickMultiplier-s,passiveMultiplier:i.multipliers.passiveMultiplier-s}}var a=(0,b.default)(i.notifications);return a.push({id:`prestige-${o.id}-${Date.now()}`,type:"prestige",title:"Building Prestiged!",message:`${o.name} has been prestiged to level ${o.prestigeLevel+1}!`,icon:"\ud83c\udf1f"}),n((function(e){return B(B({},e),{},{buildings:l,multipliers:r,stats:B(B({},e.stats),{},{totalPrestiges:e.stats.totalPrestiges+1}),notifications:a})})),!0},resetGame:function(){window.confirm("Are you sure you want to reset your progress? This cannot be undone.")&&(localStorage.removeItem("ecoClickerSave"),n(I))},pointsPerSecond:L(i.buildings,i.multipliers),clickValue:V(i.buildings,i.multipliers),getBuildingCost:function(e){var t=i.buildings.find((function(t){return t.id===e}));return t?z(t.baseCost,t.level,t.prestigeLevel):null},checkCanPrestige:function(e){var t=i.buildings.find((function(t){return t.id===e}));return!!t&&t.level>=t.maxLevel},getPrestigeBonus:function(e){return F}}};var W=r.default.create({safeArea:{flex:1,backgroundColor:"#F1F8E9"},header:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:16,backgroundColor:"#4CAF50"},title:{fontSize:24,fontWeight:"bold",color:"white"},infoButton:{fontSize:24},tabBar:{flexDirection:"row",borderBottomWidth:1,borderBottomColor:"#81C784"},tab:{flex:1,paddingVertical:10,alignItems:"center"},activeTab:{borderBottomWidth:3,borderBottomColor:"#4CAF50"},tabText:{fontSize:16,color:"#689F38"},activeTabText:{fontWeight:"bold",color:"#2E7D32"},contentContainer:{flex:1,padding:10},footer:{padding:10,alignItems:"center",borderTopWidth:1,borderTopColor:"#E0E0E0"},resetButton:{padding:10},resetButtonText:{color:"#BF360C",fontSize:14},modalOverlay:{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0, 0, 0, 0.5)"},modalContent:{width:"90%",maxHeight:"80%",backgroundColor:"white",borderRadius:10,padding:20,alignItems:"center"},modalTitle:{fontSize:22,fontWeight:"bold",color:"#2E7D32",marginBottom:15},modalScrollView:{width:"100%",marginBottom:15},sectionTitle:{fontSize:18,fontWeight:"bold",color:"#388E3C",marginTop:15,marginBottom:8},modalText:{fontSize:16,color:"#333",marginBottom:10,lineHeight:22},factContainer:{marginBottom:15,padding:10,backgroundColor:"#E8F5E9",borderRadius:8},factTitle:{fontSize:16,fontWeight:"bold",color:"#2E7D32",marginBottom:5},factText:{fontSize:14,color:"#333",lineHeight:20},closeButton:{backgroundColor:"#4CAF50",paddingHorizontal:20,paddingVertical:10,borderRadius:5},closeButtonText:{color:"white",fontSize:16,fontWeight:"bold"},notificationsContainer:{position:"absolute",top:70,right:10,zIndex:1e3,maxWidth:"80%",maxHeight:150,position:"fixed"},notificationsList:{},notification:{flexDirection:"row",borderRadius:8,padding:10,marginVertical:5,alignItems:"center",shadowColor:"#000",shadowOffset:{width:0,height:2},shadowOpacity:.3,shadowRadius:3,elevation:4},notificationIconContainer:{width:40,height:40,borderRadius:20,justifyContent:"center",alignItems:"center",marginRight:10},notificationIcon:{fontSize:20},notificationContent:{flex:1},notificationTitle:{fontWeight:"bold",color:"white",fontSize:16},notificationMessage:{color:"white",fontSize:14},notificationCondition:{color:"rgba(255, 255, 255, 0.8)",fontSize:12,fontStyle:"italic",marginTop:2}});const R=function(){var e=O(),t=e.gameState,i=e.handleClick,n=e.purchaseBuilding,r=e.prestigeBuilding,b=e.resetGame,m=e.pointsPerSecond,y=e.clickValue,C=e.getBuildingCost,P=e.checkCanPrestige,k=e.getPrestigeBonus,S=(0,l.useState)("buildings"),T=(0,o.default)(S,2),E=T[0],B=T[1],F=(0,l.useState)(!1),I=(0,o.default)(F,2),z=I[0],L=I[1];return(0,x.jsxs)(c.default,{style:W.safeArea,children:[(0,x.jsx)(u.default,{barStyle:"dark-content",backgroundColor:"#E8F5E9"}),(0,x.jsxs)(s.default,{style:W.header,children:[(0,x.jsx)(a.default,{style:W.title,children:"EcoClicker"}),(0,x.jsx)(f.default,{onPress:function(){return L(!0)},children:(0,x.jsx)(a.default,{style:W.infoButton,children:"\u2139\ufe0f"})})]}),(0,x.jsx)((function(){if(0===t.notifications.length)return null;return(0,x.jsx)(s.default,{style:W.notificationsContainer,children:(0,x.jsx)(p.default,{data:t.notifications,renderItem:function(e){var t=e.item,i="#4CAF50",n="#E8F5E9";return"achievement"===t.type?(i="#FFC107",n="#FFF9C4"):"prestige"===t.type&&(i="#FF9800",n="#FFF3E0"),(0,x.jsxs)(h.default.View,{style:[W.notification,{backgroundColor:i}],children:[(0,x.jsx)(s.default,{style:[W.notificationIconContainer,{backgroundColor:n}],children:(0,x.jsx)(a.default,{style:W.notificationIcon,children:t.icon})}),(0,x.jsxs)(s.default,{style:W.notificationContent,children:[(0,x.jsx)(a.default,{style:W.notificationTitle,children:t.title}),(0,x.jsx)(a.default,{style:W.notificationMessage,children:t.message}),t.condition&&(0,x.jsxs)(a.default,{style:W.notificationCondition,children:["Condition: ",t.condition]})]})]})},keyExtractor:function(e){return e.id},contentContainerStyle:W.notificationsList})})}),{}),(0,x.jsx)(v,{onPress:i,clickValue:y,ecoPoints:t.resources.ecoPoints,pointsPerSecond:m,formatNumber:function(e){return e<1e3?Math.floor(e).toString():e<1e6?(Math.floor(e/100)/10).toFixed(1)+"K":e<1e9?(Math.floor(e/1e5)/10).toFixed(1)+"M":(Math.floor(e/1e8)/10).toFixed(1)+"B"}}),(0,x.jsxs)(s.default,{style:W.tabBar,children:[(0,x.jsx)(f.default,{style:[W.tab,"buildings"===E&&W.activeTab],onPress:function(){return B("buildings")},children:(0,x.jsx)(a.default,{style:[W.tabText,"buildings"===E&&W.activeTabText],children:"Buildings"})}),(0,x.jsx)(f.default,{style:[W.tab,"stats"===E&&W.activeTab],onPress:function(){return B("stats")},children:(0,x.jsx)(a.default,{style:[W.tabText,"stats"===E&&W.activeTabText],children:"Stats"})})]}),(0,x.jsx)(s.default,{style:W.contentContainer,children:function(){switch(E){case"buildings":return(0,x.jsx)(j,{buildings:t.buildings,ecoPoints:t.resources.ecoPoints,onPurchase:n,prestigeBuilding:r,checkCanPrestige:P,getPrestigeBonus:k,getBuildingCost:C});case"stats":return(0,x.jsx)(w,{stats:t.stats,resources:t.resources,pointsPerSecond:m,achievements:t.achievements});default:return(0,x.jsx)(j,{})}}()}),(0,x.jsx)(s.default,{style:W.footer,children:(0,x.jsx)(f.default,{style:W.resetButton,onPress:b,children:(0,x.jsx)(a.default,{style:W.resetButtonText,children:"Reset Game"})})}),(0,x.jsx)((function(){return(0,x.jsx)(g.default,{animationType:"slide",transparent:!0,visible:z,onRequestClose:function(){return L(!1)},children:(0,x.jsx)(s.default,{style:W.modalOverlay,children:(0,x.jsxs)(s.default,{style:W.modalContent,children:[(0,x.jsx)(a.default,{style:W.modalTitle,children:"About EcoClicker"}),(0,x.jsxs)(d.default,{style:W.modalScrollView,children:[(0,x.jsx)(a.default,{style:W.sectionTitle,children:"How to Play"}),(0,x.jsx)(a.default,{style:W.modalText,children:"Click the Earth to generate eco points. Use your points to purchase buildings that will help you generate more points automatically or increase your click value."}),(0,x.jsx)(a.default,{style:W.sectionTitle,children:"Ecological Impact"}),(0,x.jsx)(a.default,{style:W.modalText,children:"While EcoClicker is just a game, it aims to raise awareness about ecological issues. Each building represents real-world actions we can take to help our planet."}),(0,x.jsx)(a.default,{style:W.sectionTitle,children:"Eco Facts"}),(0,x.jsxs)(s.default,{style:W.factContainer,children:[(0,x.jsx)(a.default,{style:W.factTitle,children:"\ud83c\udf33 Trees"}),(0,x.jsx)(a.default,{style:W.factText,children:"A single mature tree can absorb up to 48 pounds of carbon dioxide per year."})]}),(0,x.jsxs)(s.default,{style:W.factContainer,children:[(0,x.jsx)(a.default,{style:W.factTitle,children:"\u2600\ufe0f Solar Energy"}),(0,x.jsx)(a.default,{style:W.factText,children:"The sunlight that hits the Earth's surface in just one hour could power the entire world for a year."})]}),(0,x.jsxs)(s.default,{style:W.factContainer,children:[(0,x.jsx)(a.default,{style:W.factTitle,children:"\u267b\ufe0f Recycling"}),(0,x.jsx)(a.default,{style:W.factText,children:"Recycling one aluminum can saves enough energy to run a TV for three hours."})]}),(0,x.jsxs)(s.default,{style:W.factContainer,children:[(0,x.jsx)(a.default,{style:W.factTitle,children:"\ud83c\udf2c\ufe0f Wind Energy"}),(0,x.jsx)(a.default,{style:W.factText,children:"Wind turbines can reduce carbon dioxide emissions by 2,000 tons per year compared to fossil fuels."})]})]}),(0,x.jsx)(f.default,{style:W.closeButton,onPress:function(){return L(!1)},children:(0,x.jsx)(a.default,{style:W.closeButtonText,children:"Close"})})]})})})}),{})]})};(0,n.default)(R);const D=R}},t={};function i(n){var o=t[n];if(void 0!==o)return o.exports;var l=t[n]={exports:{}};return e[n](l,l.exports,i),l.exports}i.m=e,(()=>{var e=[];i.O=(t,n,o,l)=>{if(!n){var r=1/0;for(d=0;d<e.length;d++){for(var[n,o,l]=e[d],s=!0,a=0;a<n.length;a++)(!1&l||r>=l)&&Object.keys(i.O).every((e=>i.O[e](n[a])))?n.splice(a--,1):(s=!1,l<r&&(r=l));if(s){e.splice(d--,1);var c=o();void 0!==c&&(t=c)}}return t}l=l||0;for(var d=e.length;d>0&&e[d-1][2]>l;d--)e[d]=e[d-1];e[d]=[n,o,l]}})(),i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}(),i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={792:0};i.O.j=t=>0===e[t];var t=(t,n)=>{var o,l,[r,s,a]=n,c=0;if(r.some((t=>0!==e[t]))){for(o in s)i.o(s,o)&&(i.m[o]=s[o]);if(a)var d=a(i)}for(t&&t(n);c<r.length;c++)l=r[c],i.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return i.O(d)},n=self.webpackChunkweb=self.webpackChunkweb||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var n=i.O(void 0,[644],(()=>i(8879)));n=i.O(n)})();
//# sourceMappingURL=main.c2a1d99a.js.map