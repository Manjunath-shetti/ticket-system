from flask import jsonify
import dbconfiguration
import json

def addProjectFunction(deptID,projectName):
    project_Dict = {}
    project_Dict['deptId'] = ""
    project_Dict['name'] = ""
    project_Dict['status'] = False
    project_Dict['message']="Failed to add Project"

    instance = dbconfiguration.getDBInstance()

    cursor = instance.cursor()

    #check if department ID already exist or not.
    cursor.execute("select * from department where id = %s",(deptID,))
    projectInfo = cursor.fetchall()
    if len(projectInfo) == 0:        
        project_Dict['status'] = False
        project_Dict['message'] = "No associate department exist!"
        return project_Dict
    
    cursor.execute("insert into project(name,d_id) values(%s,%s)",(projectName,deptID))
    instance.commit()
    cursor.execute('SELECT last_insert_id()')
    id = cursor.fetchone()
    dbconfiguration.closeDBInstance(cursor)
    project_Dict['id'] = id[0]
    project_Dict['name'] = projectName
    project_Dict['deptId'] = deptID
    project_Dict['status'] = True
    project_Dict['message']="Success"

    return project_Dict

def updateProjectFunction(deptID,projectID,projectName):
    project_Dict = {}
    project_Dict['id'] = ""
    project_Dict['deptId'] = ""
    project_Dict['name'] = ""
    project_Dict['status'] = False
    project_Dict['message']="Failed to update Project"

    instance = dbconfiguration.getDBInstance()
    cursor = instance.cursor()

   #check if Department ID already exist or not.
    cursor.execute("select * from department where id = %s",(deptID,))
    projectInfo = cursor.fetchall()
    if len(projectInfo) == 0:        
        project_Dict['status'] = False
        project_Dict['message'] = "No associate department exist!"
        return project_Dict

     #check if project ID already exist or not.
    cursor.execute("select * from project where id = %s",(projectID,))
    projectIDInfo = cursor.fetchall()
    if len(projectIDInfo) == 0:        
        project_Dict['status'] = False
        project_Dict['message'] = "No project exist!"
        return project_Dict
    
    cursor.execute("update project set name = %s,d_id=%s where id = %s",(projectName,deptID,projectID,))
    instance.commit()
    dbconfiguration.closeDBInstance(cursor)
    project_Dict['id'] = projectID
    project_Dict['deptId'] = deptID
    project_Dict['name'] = projectName
    project_Dict['status'] = True
    project_Dict['message']="Success"

    return project_Dict

def deleteProjectFunction(projectId):
    project_Dict = {}
    project_Dict['id'] = ""
    project_Dict['status'] = False
    project_Dict['message']="Failed to delete Project"

    instance = dbconfiguration.getDBInstance()
    cursor = instance.cursor()

    #check condition to check if any ticket associate with this project then procced with delete project
    cursor.execute("select * from tickets where p_id = %s", (projectId,))
    
    ticketInfo = cursor.fetchall()
    if len(ticketInfo) > 0:        
        project_Dict['message'] = "Cannot delete project since tickets exist for given project!"
        return project_Dict

    #check if already project exist to delete it or not
    cursor.execute("select * from project where id = %s", (projectId,))
    
    projectInfo = cursor.fetchall()
    if len(projectInfo) == 0:        
        project_Dict['message'] = "Department does not exist!"
        return project_Dict
    
    cursor.execute("delete from project where id = %s",(projectId,))
    instance.commit()
    dbconfiguration.closeDBInstance(cursor)
    project_Dict['id'] = projectId
    project_Dict['status'] = True
    project_Dict['message']="Success"

    return project_Dict

def getDepartmentWiseProject(deptId):
    main_dict = {}
    projectList = []
    main_dict['status'] = False
    main_dict['message']="Failed to get project for given department!"

    instance = dbconfiguration.getDBInstance()
    cursor = instance.cursor()

    cursor.execute("select * from project where d_id=%s",(deptId,))
    
    projectInfo = cursor.fetchall()
    dbconfiguration.closeDBInstance(cursor)
    if len(projectInfo) == 0:        
        main_dict['message'] = "project for given depeartment does not exist!"
        return main_dict
    
    for i in range(0,len(projectInfo)):
        project_Dict = {}
        project_Dict['id'] = projectInfo[i][0]
        project_Dict['name'] = projectInfo[i][1]
        project_Dict['deptId'] = projectInfo[i][2]
        projectList.append(project_Dict)

    main_dict['data'] = projectList
    main_dict['status'] = True
    main_dict['message']="Success"

    return main_dict



