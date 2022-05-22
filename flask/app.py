from flask import Flask, render_template,  request, redirect, url_for, flash, Blueprint
import logging
# from models.database import db_session,Posts
from models.database import init_db
import models

# Apiの読み込み
from api.apiTest import apiTest

app = Flask(__name__, static_folder='../vue_template/dist/static', template_folder='../vue_template/dist')
app.config.from_object('config.Config')
# 参考 https://qiita.com/shirakiya/items/0114d51e9c189658002e
init_db(app)
# セッション
app.secret_key = 'hogehoge'


# https://qiita.com/KWS_0901/items/7163e52b4041b909f5bc
# log ファイル
LOGFILE_NAME = 'flask.log'
app.logger.setLevel(logging.DEBUG)
log_handler = logging.FileHandler(LOGFILE_NAME)
log_handler.setLevel(logging.DEBUG)
app.logger.addHandler(log_handler)


# API
app.register_blueprint(apiTest)

@app.route('/',defaults={'path':''})
@app.route('/<path:path>')
def index(path):
    app.logger.info(request)
    app.logger.info(type(request))
    return render_template('index.html')

if __name__=='__main__':
    app.run(debug=True)