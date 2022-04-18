function download_help(filename, log) {
    let element = document.createElement("a");
    console.log("downloading " + filename)
    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify(log))
    );
    element.setAttribute("download", filename)
    element.style.display = "none";
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    return
};

function download_log(logID) {
    console.log(logID)
    app.NetAgent.sendReq2Lobby(
        "Lobby",
        "fetchGameRecord",
        {game_uuid: logID, client_version_string: GameMgr.Inst.getClientVersion()}, // anon edit 2
        function(i, results) {
            
            console.log(results)
            download_help(logID + ".json", results)
            return
        }
    );
}


for (x = 0; x< 2; x++) {
    app.NetAgent.sendReq2Lobby(
            "Lobby",
            "fetchGameRecordList",
            {start:x * 10, count : 10 }, // anon edit 2
            function(i, ret) {
                console.log(ret)
                ret.record_list.forEach(record => {
                    console.log(record)
                    download_log(record.uuid)                    
                });
            }
);
}