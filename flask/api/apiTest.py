from flask import Blueprint, render_template, request, Flask, session, jsonify
import logging

from sqlalchemy import create_engine, Column, Integer, String ,Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound
# import cryptography

# 認証 https://fabeee.co.jp/column/employee-blog/mattsun01/
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta
from jose import jwt



from models.users import User 
import config

import os
from models.database import db

db = declarative_base()

apiTest = Blueprint('testA', __name__, url_prefix='')

app = Flask(__name__)
LOGFILE_NAME = 'flask.log'
app.logger.setLevel(logging.DEBUG)
log_handler = logging.FileHandler(LOGFILE_NAME)
log_handler.setLevel(logging.DEBUG)
app.logger.addHandler(log_handler)



######### 認証 #########
# ペイロード作成
access_payload = {
    'token_type': 'access_token',
    'exp': datetime.utcnow() + timedelta(minutes=60),
}

refresh_payload = {
    'token_type': 'refresh_token',
    'exp': datetime.utcnow() + timedelta(days=90),
}

# セッションの保存時間
app.permanent_session_lifetime = timedelta(minutes=10)

# @apiTest.route('/')
# def hello():
#     result = 'testAのレスポンス'
#     return result

@apiTest.route('/login',  methods=["POST"])
def login():
    user = User.query.filter_by(login=request.get_json()['login']).first()
    userName = session.get('userName')

    # セッション 必要あれば
    session['userName'] = request.get_json()['login']

    if user and request.get_json()['password'] == user.password:
        # トークンの発行
        print('ログイン')
        access_payload['login'] = request.get_json()['login']
        access_token            = jwt.encode(access_payload, 'SECRET_KEY123', algorithm='HS256')
        session['access_token'] = access_token
        result                  = {'success': 1, 'user': userName, 'access_token': access_token}

        return result

    else:
        print('ログイン失敗')
        print(user)
        print(request.get_json())
        # ログイン失敗
        # raise HTTPException(status_code=401, detail='パスワード不一致')
        result = {'success': 0, 'user': userName }
        return result


@apiTest.route('/logout',  methods=["POST"])
def logout():
    response = {}
    session.pop('username', None)
    session.pop('access_token',None)
    return response

    # Session = sessionmaker(bind=config.DevelopmentConfig.SQLALCHEMY_DATABASE_URI)
    # db_session = Session()
    # text = request.get_json()['login']

    # if db_session.query(User).filter_by(login=String(text)).one():
    #     return {'login': 1}
    # return {'login': 0}