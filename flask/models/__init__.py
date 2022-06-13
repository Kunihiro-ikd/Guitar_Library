from flask import Flask, render_template,  request, redirect, url_for, flash, Blueprint
import logging
import models
from flask_sqlalchemy import SQLAlchemy
from datetime import timedelta
from flask_migrate import Migrate


app = Flask(__name__, static_folder='../../vue_template/dist/static', template_folder='../../vue_template/dist')
# todo ファイルを分ける
# app.config.from_object('flask.config.Config')

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://{user}:{password}@{host}/{db_name}?charset=utf8'.format(**{
    'user':  'root',
    'password': 'Mysql92!6',
    'host': 'localhost',
    'db_name': 'test1',
})


db  = SQLAlchemy(app)

db.init_app(app)

migrate = Migrate(app, db)

LOGFILE_NAME = 'flask.log'
app.logger.setLevel(logging.DEBUG)
log_handler = logging.FileHandler(LOGFILE_NAME)
log_handler.setLevel(logging.DEBUG)
app.logger.addHandler(log_handler)

app.permanent_session_lifetime = timedelta(minutes=10)

# 参考 https://qiita.com/shirakiya/items/0114d51e9c189658002e
# init_db(app)
app.secret_key = 'hogehoge'


# ログ
LOGFILE_NAME = 'flask.log'
app.logger.setLevel(logging.DEBUG)
log_handler = logging.FileHandler(LOGFILE_NAME)
log_handler.setLevel(logging.DEBUG)
app.logger.addHandler(log_handler)


@app.route('/',defaults={'path':''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')


if __name__ == '__main__':
    app.run()