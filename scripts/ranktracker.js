function ranktracker(username) {
	games = []
	//Total games fethced = max * 5	
	var start = 0
	var max = 5
	var c = start
	for (x = start; x < max ; x++) {
		app.NetAgent.sendReq2Lobby(
				"Lobby",
				"fetchGameRecordList",
				{start:x * 5, count : 5 }, // anon edit 2
					function temp(i, ret) {
					//console.log("started", ret)
					
                    if (!ret) {
						return;
					}
					ret.record_list.forEach(result => {
						
						var seat = -1
						var preScore = 0
						var rt = 0
						var endScore = 0	
						var pos = 0
						var points = 0
						var d = new Date(result.end_time * 1000)
						var d1 = new Date(result.start_time * 1000)
						var rankName = ""
											
						if(result.config.meta.mode_id) {
							var roomName = cfg.desktop.matchmode.map_[result.config.meta.mode_id].room_name_en
                            
						}							
						
						var et = d1.toString()
						et = et.substring(0,24)
						
						for (let i = 0; i < result.accounts.length; i++){
							if (result.accounts[i].nickname == username) {
								preScore = result.accounts[i].level.score
								seat = result.accounts[i].seat
								rankName = cfg.level_definition.level_definition.map_[result.accounts[i].level.id].full_name_en
							}
						}
							
						for (let j = 0; j < result.result.players.length; j++){
							if (result.result.players[j].seat == seat) {
								rt = result.result.players[j].grading_score
								pos = j
								points = result.result.players[j].part_point_1
							}				
						}
																				
						endScore = preScore + rt
						
						
						if (rt != 0 ) {
							games.unshift(result.uuid + "," + et + "," + points + "," + pos + "," + preScore + "," + rt + "," + endScore + "," + rankName + "," + roomName + ",")
						}
						
					});
                    c += 1;
                    console.log("#".repeat(c));

					if (c == max){
                        games.forEach(e=> console.log(e))
                    }
                    										
				})

	}
}