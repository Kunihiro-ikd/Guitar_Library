from flask import Flask, render_template
# import logging

app = Flask(__name__, static_folder='../vue_template/dist/static', template_folder='../vue_template/dist')
# https://qiita.com/KWS_0901/items/7163e52b4041b909f5bc


@app.route('/',defaults={'path':''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')

if __name__=='__main__':
    app.run(debug=True)