__auther__ = 'Manjunath Shetty'

from flask import Flask,request
import dbconfiguration
from service import loginService

app = Flask(__name__)

#login api 
@app.route('/login',methods=['POST'])
def loginController():
    email = request.form['email']
    password = request.form['password']
    return loginService.loginFunction(email,password)

if __name__ == "__main__":
    app.run()


