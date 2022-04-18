from ast import For, parse
from turtle import heading
from wsgiref import headers
from flask import Flask, render_template
import os
import json
app = Flask(__name__)

headings = ("MatchId", "score", "pos")

data = (("220416-7df9d3be-00a4-4fc9-a6a5-29f2f3302db0", "31400", "1"),
       ("220412-c147b51a-5f3d-4325-bd6c-def1613a00d5", "26600", "3"),
       ("220412-aa86ba25-60c3-4d3f-8f3b-697b99886406", "-900", "4")
)

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
            players = head["accounts"]
            result = head["result"]
            
            seat = -1
            for x in players:
                if account_id == x["account_id"]:
                    seat = x["seat"]
                    break
            if(seat == -1):
                continue
            

            print(type(players))

            placement = 1
            for pos in result["players"]:
                if seat == pos["seat"]:
                    break
                placement += 1
            
            print(uuid)
            datas.append((uuid, result["players"][placement - 1]["total_point"], placement))
    print(datas)
    return heads, (datas)