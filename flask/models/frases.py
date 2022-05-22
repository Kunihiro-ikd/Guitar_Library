from datetime import datetime
from models.database import db


class Frases(db.Model):

    __tablename__ = 'frases'

    id          = db.Column(db.Integer, primary_key=True)
    name        = db.Column(db.String(255), nullable=False)
    user_id     = db.Column(db.String(255), nullable=False)
    code_group  = db.Column(db.String(255), nullable=False)
    song_group  = db.Column(db.String(255), nullable=False)
    created_at  = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at  = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)