__auther__ = 'Manjunath Shetty'

from flask import Flask,request
import dbconfiguration
from service import UserOperationService
from service import DepartmentOperationService
from service import ProjectOperationService
from service import TicketOperationService
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#************************************USER table ENDPOINTS*******************************************
#get all users
#login api 
@app.route('/getallusers',methods=['GET'])
def getAllUserController():
    return UserOperationService.getAllUser()


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


#************************************DEPARTMENT Table ENDPOINTS*******************************************
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

#************************************PROJECT Table ENDPOINTS*******************************************
#add new project
@app.route('/addproject',methods=['POST'])
def addProjectController():
    deptname = request.form['name']
    deptID = request.form['deptID']
    return ProjectOperationService.addProjectFunction(deptID,deptname)

#update a project
@app.route('/updateproject',methods=['PUT'])
def updateProjectController():
    id = request.form['id']
    projectName = request.form['name']
    deptID = request.form['deptid']
    return ProjectOperationService.updateProjectFunction(deptID,id,projectName)

#delete a project
@app.route('/deleteproject',methods=['DELETE'])
def deleteProjectController():
    id = request.form['id']
    return ProjectOperationService.deleteProjectFunction(id)

#get dept wise a project
@app.route('/getproject',methods=['POST'])
def getProjectController():
    deptId = request.form['id']
    return ProjectOperationService.getDepartmentWiseProject(deptId)

#************************************TICKET table ENDPOINTS*******************************************

#add new ticket
@app.route('/addticket',methods=['POST'])
def addTicketController():
    projectId = request.form['projectId']
    userId = request.form['userId']
    title = request.form['title']
    body = request.form['body']
    return TicketOperationService.addTicketFunction(projectId,userId,title,body)

#update ticket - updateTicketFunction
@app.route('/updateticket',methods=['PUT'])
def updateTicketController():
    projectId = request.form['projectId']
    userId = request.form['userId']
    ticketId = request.form['ticketId']
    title = request.form['title']
    body = request.form['body']
    status = request.form['status']
    return TicketOperationService.updateTicketFunction(projectId,userId,ticketId,title,body,status)

#delete ticket - deleteTicketFunction
@app.route('/deleteticket',methods=['DELETE'])
def deleteTicketController():
    ticketId = request.form['ticketId']
    return TicketOperationService.deleteTicketFunction(ticketId)

#get tickets for project id - getTicketByProjects
@app.route('/getticketforproject',methods=['POST'])
def getprojectWiseTicketController():
    projectId = request.form['projectid']
    return TicketOperationService.getTicketByProjects(projectId)

if __name__ == "__main__":
    app.run()


