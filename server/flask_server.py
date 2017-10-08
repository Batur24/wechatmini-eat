# coding=utf8
import json
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
    test = json.dumps({"result": "ok"})
    data = json.loads(request.data)
    user = UserMenu.query.filter_by(name=data["name"]).first()
    if data["menu"] in user.menus:
        return test
    user.menus = user.menus + "," + data["menu"]
    db.session.commit()
    return test
