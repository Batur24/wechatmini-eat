#coding=utf8

from setting import db


class UserMenu(db.Model):
    __tablename__ = 'UserMenu'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    menus = db.Column(db.String(2000))
    city = db.Column(db.String(20))

    def __repr__(self):
        return '<UserMenu %r>' %self.name