from models import app

# API
from api.apiTest import apiTest

app.register_blueprint(apiTest)

if __name__ == '__main__':
    app.run(debug=True)
