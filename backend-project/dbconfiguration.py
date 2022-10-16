from decouple import config
from mysql import connector
import mysql

def getDBInstance():
    hostname = config('HOST')
    username = config('USER')
    passvalue = config('PASSWORD')
    dbname = config('DATABASE')


    con = mysql.connector.connect(
        host=hostname,
        user=username,
        password=passvalue,
        database=dbname
    )

    return con

def closeDBInstance(instance):
    instance.close()
