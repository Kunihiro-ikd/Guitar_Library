from datetime import datetime
from models import db


class Frase(db.Model):

    __tablename__ = 'frases'

    id          = db.Column(db.Integer, primary_key=True)
    name        = db.Column(db.String(255), nullable=False)
    code_list   = db.Column(db.String(8192), nullable=False)
    user_id     = db.Column(db.String(255), nullable=False)
    login       = db.Column(db.String(255), nullable=False)
    code_group  = db.Column(db.String(255), nullable=True)
    song_group  = db.Column(db.String(255), nullable=True)
    created_at  = db.Column(db.DateTime, nullable=True, default=datetime.now)
    updated_at  = db.Column(db.DateTime, nullable=True, default=datetime.now, onupdate=datetime.now)


    # def __init__(self, code, login):
    #     self.code = code
    #     self.login = login
