function fetchRecord(recordList) {
    let client_version = GameMgr.Inst.getClientVersion();
    recordList.record_list.forEach(record =>  {
        console.log(record)
        app.NetAgent.sendReq2Lobby(
            "Lobby",
            "fetchGameRecord",
            {game_uuid: record.uuid, client_version_string: client_version}, // anon edit 2
            function(i, results) {
                //let results = parse(record);
                console.log(results)
                //console.log(net.MessageWrapper.decodeMessage(record))
            }
        );
    });
}

for (x = 0; x< 3; x++) {
    app.NetAgent.sendReq2Lobby(
            "Lobby",
            "fetchGameRecordList",
            {start:x * 20, count : 20 }, // anon edit 2
            function(i, record) {
                fetchRecord(record)
            }
);
}