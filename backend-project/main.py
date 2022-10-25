__auther__ = 'Manjunath Shetty'

from flask import Flask,request
import dbconfiguration
from service import UserOperationService
from service import DepartmentOperationService

app = Flask(__name__)

#************************************USER ENDPOINTS*******************************************
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


#************************************DEPARTMENT ENDPOINTS*******************************************
#add new department
@app.route('/adddepartment',methods=['POST'])
def addDepartmentController():
    deptname = request.form['name']
    return DepartmentOperationService.addDepartmentFunction(deptname)

#update new department
@app.route('/updatedepartment',methods=['PUT'])
def updateDepartmentController():
    deptname = request.form['name']
    id = request.form['id']
    return DepartmentOperationService.updateDepartmentFunction(id,deptname) 

#delete department     
@app.route('/deletedepartment',methods=['DELETE'])
def deleteDepartmentController():
    id = request.form['id']
    return DepartmentOperationService.deleteDepartmentFunction(id)

#get all department 
@app.route('/getalldepartment',methods=['GET'])
def getAllDepartmentController():
    return DepartmentOperationService.getAllDepartmentFunction()

if __name__ == "__main__":
    app.run()


