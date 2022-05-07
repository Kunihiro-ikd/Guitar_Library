from flask import Blueprint, render_template, request

apiTest = Blueprint('testA', __name__, url_prefix='/testA')

@apiTest.route('/')
def hello():
    response = 'testAのレスポンス'
    return response