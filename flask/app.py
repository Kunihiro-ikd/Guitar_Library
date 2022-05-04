from flask import Flask, render_template
import logging

app = Flask(__name__, static_folder='../vue_template/dist/static', template_folder='../vue_template/dist')
# https://qiita.com/KWS_0901/items/7163e52b4041b909f5bc

app.logger.setLevel(logging.DEBUG)
log_handler = logging.FileHandler(LOGFILE_NAME)
log_handler.setLevel(logging.DEBUG)
app.logger.addHandler(log_handler)
app.logger.info(11111111)

@app.route('/',defaults={'path':''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')

if __name__=='__main__':
    app.run(debug=True)