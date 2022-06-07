function ranktracker() {
	games = []
	//Total games fethced = max * 5
	var max = 10 
	var c = 0
	for (x = 0; x < max ; x++) {
		app.NetAgent.sendReq2Lobby(
				"Lobby",
				"fetchGameRecordList",
				{start:x * 5, count : 5 }, // anon edit 2
					function temp(i, ret) {
					//console.log(ret)
					ret.record_list.forEach(result => {
						//console.log(result)
						var seat = -1
						var preScore = 0
						var rt = 0
						var endScore = 0	
						var pos = 0
						var points = 0
						var d = new Date(result.end_time * 1000)
						var d1 = new Date(result.start_time * 1000)
						//console.log(d1.toLocaleString() + " " + d.toLocaleString())
						var et = d1.toString()
						et = et.substring(0,24)
						for (let i = 0; i < result.accounts.length; i++){
							if (result.accounts[i].nickname == "Hzl") {
								preScore = result.accounts[i].level.score
								seat = result.accounts[i].seat
								
							}
						}
							
						for (let j = 0; j < 4; j++){
							if (result.result.players[j].seat == seat) {
								rt = result.result.players[j].grading_score
								pos = j
								points = result.result.players[j].part_point_1
							}				
						}
												
								
						endScore = preScore + rt
						
						
						if (rt != 0 ) {
							games.unshift(result.uuid + "," + et + "," + points + "," + pos + "," + preScore + "," + rt + "," + endScore + ",")
						}
						
					});
					c = c + 1
					//testing(games)
					if	(c == max) {
							games.forEach(e=> console.log(e))
					}
				})

	}
}