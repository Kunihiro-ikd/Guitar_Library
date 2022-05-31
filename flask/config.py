"""FlaskのConfigを提供する"""
import os

class DevelopmentConfig:
    # Flask
    DEBUG = True

    # SQLAlchemy
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{user}:{password}@{host}/{db_name}?charset=utf8'.format(**{
        'user':  'root',
        'password': 'Mysql92!6',
        'host': 'localhost',
        'db_name': 'test1'
        # os.getenv　って何？
        # 'user': os.getenv('DB_USER', 'root'),
        # 'password': os.getenv('DB_PASSWORD', 'Mysql92!6'),
        # 'host': os.getenv('DB_HOST', 'localhost'),
    })
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False


Config = DevelopmentConfig