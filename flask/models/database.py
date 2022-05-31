from sqlalchemy import create_engine, Column, Integer, String ,Text
from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
# from sqlalchemy.orm.exc import NoResultFound
# import cryptography
from flask_sqlalchemy import SQLAlchemy
# from models.database import init_db

from flask_migrate import Migrate 


db = SQLAlchemy()

def init_db(app):
    db.init_app(app)
    Migrate(app, db)

# engine = create_engine('mysql+pymysql://{ikedak}:{vmdev}@{localhost}/{guitar}?charset=utf8')

# db = declarative_base()

# class Posts(db):
#     __tablename__ = "post" #テーブル名
#     post_id = db.Column(Integer(), primary_key=True)
#     title = db.Column(String(225),unique=True)
#     body = db.Column(Text)

# Session = sessionmaker(bind=engine)
# db_session = Session()
# db.metadata.create_all(engine)