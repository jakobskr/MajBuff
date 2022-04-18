from ast import For, parse
from turtle import heading
from wsgiref import headers
from flask import Flask, render_template
from datetime import datetime
import os
import json
app = Flask(__name__)

headings = ("MatchId", "Score", "Pos", "Start Time", "Duration")

@app.route("/")
def table():
    heads,datas = parse_records(118331092)
    return render_template("table.html", headings=headings, data=datas)


def parse_records(account_id):
    heads = ()
    datas = []
    for file in os.listdir("records"):
        os.path
        print (file)
        with open("records\\" + file, "r", encoding="utf-8") as handle:
            parsed = json.load(handle)
            #print(parsed["head"])
            head = parsed["head"]
            data = parsed["data"]
            uuid = head["uuid"]
            startTime = datetime.utcfromtimestamp(head["start_time"]).strftime('%Y-%m-%d %H:%M:%S')
            Duration = datetime.utcfromtimestamp(head["end_time"]-head["start_time"]).strftime('%H:%M:%S')
            players = head["accounts"]
            result = head["result"]

            seat = -1
            for x in players:
                if account_id == x["account_id"]:
                    seat = x["seat"]
                    break
            if(seat == -1):
                continue


            #print(type(players))

            placement = 1
            for pos in result["players"]:
                if seat == pos["seat"]:
                    break
                placement += 1

            print(uuid)
            datas.append((uuid, result["players"][placement - 1]["total_point"], placement, startTime, Duration))
    print(datas)
    return heads, (datas)
