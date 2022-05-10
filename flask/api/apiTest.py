from flask import Blueprint, render_template, request, Flask
import logging

from sqlalchemy import create_engine, Column, Integer, String ,Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound
import cryptography

from models.users import User 
import config

import os
from models.database import db

db = declarative_base()

apiTest = Blueprint('testA', __name__, url_prefix='/testA')

app = Flask(__name__)
LOGFILE_NAME = 'flask.log'
app.logger.setLevel(logging.DEBUG)
log_handler = logging.FileHandler(LOGFILE_NAME)
log_handler.setLevel(logging.DEBUG)
app.logger.addHandler(log_handler)

@apiTest.route('/')
def hello():
    response = 'testAのレスポンス'
    return response

@apiTest.route('/login',  methods=["POST"])
def login():
    app.logger.info('aaaaaa')
    app.logger.info(request.get_json()['login'])
    result = User.query.filter_by(login='ikeda').all()
    app.logger.info(result)
    if result:
        return render_template(''){'login': 1}
    return {'login': 0}
    # Session = sessionmaker(bind=config.DevelopmentConfig.SQLALCHEMY_DATABASE_URI)
    # db_session = Session()
    # text = request.get_json()['login']

    # if db_session.query(User).filter_by(login=String(text)).one():
    #     return {'login': 1}
    # return {'login': 0}