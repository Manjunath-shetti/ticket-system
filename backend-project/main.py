__auther__ = 'Manjunath Shetty'

from flask import Flask,request
import dbconfiguration
from service import UserOperationService

app = Flask(__name__)

#login api 
@app.route('/login',methods=['POST'])
def loginController():
    email = request.form['email']
    password = request.form['password']
    return UserOperationService.loginFunction(email,password)

#create a new user
@app.route('/createuser',methods=['POST'])
def createUserController():
    name = request.form['name']
    designation = request.form['designation']
    email = request.form['email']
    password = request.form['password']
    return UserOperationService.createUserFunction(name,designation,email,password)

#update a user
@app.route('/updateuser',methods=['PUT'])
def updateUserController():
    name = request.form['name']
    designation = request.form['designation']
    email = request.form['email']
    return UserOperationService.updateUserFunction(name,designation,email)

#delete a user
@app.route('/deleteuser',methods=['DELETE'])
def deleteUserController():
    email = request.form['email']
    return UserOperationService.deleteUserFunction(email)

if __name__ == "__main__":
    app.run()


