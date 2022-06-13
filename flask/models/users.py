from datetime import datetime
from models import db

class User(db.Model):

    __tablename__ = 'users'

    id          = db.Column(db.Integer, primary_key=True)
    name        = db.Column(db.String(255), nullable=True)
    login       = db.Column(db.String(255), nullable=False)
    password    = db.Column(db.String(255), nullable=False)
    created_at  = db.Column(db.DateTime, nullable=True, default=datetime.now)
    updated_at  = db.Column(db.DateTime, nullable=True, default=datetime.now, onupdate=datetime.now)