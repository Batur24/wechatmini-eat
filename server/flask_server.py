# coding=utf8
import json
import os
from datetime import datetime
from setting import app, db
from model import UserMenu
from flask import request

@app.route('/login', methods=['POST'])
def home():
    data = json.loads(request.data)
    menus, name = data["menu"], data["name"]
    user = UserMenu.query.filter_by(name=name).first()
    if not user:
        user = UserMenu(name=name, menus=menus)
        db.session.add(user)
        db.session.commit()
    else:
        try:
            menus = UserMenu.query.filter_by(name=name).first().menus.split(",")
        except:
            pass
    return json.dumps(menus)


@app.route('/mymenu/')
def mymenu():
    name = request.args.get("name")
    try:
        menus = UserMenu.query.filter_by(name=name).first().menus.split(",")
    except:
        menus = []
    return json.dumps(menus)


@app.route('/addmenu/', methods=['POST'])
def addmenu():
    result = {"result": "fail", "msg": ""}

    data = json.loads(request.data)
    print(data)
    user = UserMenu.query.filter_by(name=data["name"]).first()
    if data["menu"] in user.menus:
        result["msg"] = "exist"
        return json.dumps(result)
    user.menus = user.menus + "," + data["menu"]
    db.session.commit()
    result["result"] = "success"
    return json.dumps(result)

@app.route('/deletemenu/', methods=['POST'])
def deletemenu():
    result = {"result": "fail", "msg": ""}

    data = json.loads(request.data)
    print(data)
    user = UserMenu.query.filter_by(name=data["name"]).first()
    menus = user.menus.split(",")

    print(data["menus"])
    for del_menu in data["menus"]:
        menus.remove(del_menu["name"])
    # menus.remove(data["menu"].name)
    user.menus = ",".join(menus)
    try:
        db.session.commit()
        result["result"] = "success"
    except:
        raise
        result["msg"] = "err"
    return json.dumps(result)

@app.route('/feedback/', methods=['POST'])
def feedback():
    result = {"result": "fail", "msg": ""}

    data = json.loads(request.data)
    print(data)
    try:
        user = UserMenu.query.filter_by(name=data["name"]).first()
        feedback = json.loads(user.feedback)
        new_feedback = {"time": datetime.now.strftime("%Y-%m-%d %H:%M:%S"), "content": data}
        feedback.append(new_feedback)
        user.feedback = feedback
        db.session.commit()
        result["result"] = "success"
    except:
        raise
        result["msg"] = "err"
    return json.dumps(result)

