from flask import Blueprint, render_template, request, Flask, session, jsonify
import logging

from sqlalchemy import create_engine, Column, Integer, String ,Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm.exc import NoResultFound


# 認証 https://fabeee.co.jp/column/employee-blog/mattsun01/
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from sqlalchemy.orm import sessionmaker
import config

from datetime import datetime, timedelta

from models import *
# from models.users import User
# from models.frases import Frase


import os
from models import db

from models.frases import Frase
from models.users import User
import json


# engine = create_engine('mysql+pymysql://{ikedak}:{vmdev}@{localhost}/{test1}?charset=utf8')
# Session = sessionmaker(bind = engine)
# app = Flask(__name__, static_folder='../vue_template/dist/static', template_folder='../vue_template/dist')
# db = declarative_base()

apiTest = Blueprint('testA', __name__, url_prefix='')


# Session = sessionmaker()
Session = sessionmaker(bind=config.DevelopmentConfig.SQLALCHEMY_DATABASE_URI)
# db = Session()
# デバック
# app.logger.info('1111111111111')

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



# @apiTest.route('/')
# def hello():
#     result = 'testAのレスポンス'
#     return result

@apiTest.route('/login',  methods=["POST"])
def login():
    # TODO バリデーション
    user                = User.query.filter_by(login=request.get_json()['login']).first()
    userName            = request.get_json()['login']

    if user and request.get_json()['password'] == user.password:
        # トークンの発行
        print('ログイン')
        session['login']        = request.get_json()['login']
        access_token            = jwt.encode(access_payload, 'SECRET_KEY123', algorithm='HS256')
        session['access_token'] = access_token
        result                  = {'success': 1, 'user': userName, 'access_token': access_token}
        return result

    else:
        print('ログイン失敗')
        # ログイン失敗
        # raise HTTPException(status_code=401, detail='パスワード不一致')
        result = {'success': 0, 'user': userName }
        return result


@apiTest.route('/logout', methods=["POST"])
def logout():
    result = {'test': 'aaaa'}
    session.pop('username', None)
    session.pop('access_token',None)
    return result


@apiTest.route('/save_code',  methods=["POST"])
def savecode():
    # eval(), json.dumps() で変換
    print('SAVE CODE!!!!!!!!!!!!!!!!!!!!')
    frase = Frase(name = 'コードの名前', code_list =json.dumps(request.get_json()['code']), user_id = 'user_id', login =request.get_json()['login'])
    db.session.add(frase)
    db.session.commit()
    result = {'success': 1}
    return result

@apiTest.route('/get_list',  methods=["POST"])
def getList():
    # eval(), json.dumps() で変換
    print('GET LIST!!!!!!!!!!!!!!!!!!!!')

    frases = Frase.query.filter_by(login = 'ikeda').all()
    test = Frase.query.all()

    result = {}
    for index, frase in enumerate(frases):
        print(frase)
        print(frase.name)
        print(frase.code_list)
        print(type(frase.code_list))
        result[index] = {'code_name': frase.name, 'code_list': eval(frase.code_list)}

    return result


