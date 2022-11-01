from ast import main

from flask import jsonify
import dbconfiguration
import json

def addDepartmentFunction(name):
    department_Dict = {}
    department_Dict['id']=""
    department_Dict['departmentName'] = ""
    department_Dict['status'] = False
    department_Dict['message']="Failed to add department"

    instance = dbconfiguration.getDBInstance()

    cursor = instance.cursor()
    
    cursor.execute("insert into department(name) values(%s)",(name,))
    instance.commit()
    cursor.execute('SELECT last_insert_id()')
    id = cursor.fetchone()
    dbconfiguration.closeDBInstance(cursor)
    department_Dict['id'] = id[0]
    department_Dict['departmentName'] = name
    department_Dict['status'] = True
    department_Dict['message']="Success"

    return department_Dict

def updateDepartmentFunction(id,name):
    department_Dict = {}
    department_Dict['id']=""
    department_Dict['departmentName'] = ""
    department_Dict['status'] = False
    department_Dict['message']="Failed to update department"

    instance = dbconfiguration.getDBInstance()
    cursor = instance.cursor()

    cursor.execute("select * from department where id = %s", (id,))
    
    departmentInfo = cursor.fetchall()
    if len(departmentInfo) == 0:        
        department_Dict['message'] = "Department does not exist!"
        return department_Dict
    
    cursor.execute("update department set name = %s where id = %s",(name,id,))
    instance.commit()
    dbconfiguration.closeDBInstance(cursor)
    department_Dict['id'] = id
    department_Dict['departmentName'] = name
    department_Dict['status'] = True
    department_Dict['message']="Success"

    return department_Dict

def deleteDepartmentFunction(id):
    department_Dict = {}
    department_Dict['id']=""
    department_Dict['status'] = False
    department_Dict['message']="Failed to delete department"

    instance = dbconfiguration.getDBInstance()
    cursor = instance.cursor()

    #check if any project is associated with this deaprtment then proceed to delete the department
    cursor.execute("select * from project where d_id = %s", (id,))
    
    projectInfo = cursor.fetchall()
    if len(projectInfo) > 0:        
        department_Dict['message'] = "Cannot delete department since project exist for given department!"
        return department_Dict

    cursor.execute("select * from department where id = %s", (id,))
    
    departmentInfo = cursor.fetchall()
    if len(departmentInfo) == 0:        
        department_Dict['message'] = "Department does not exist!"
        return department_Dict
    
    cursor.execute("delete from department where id = %s",(id,))
    instance.commit()
    dbconfiguration.closeDBInstance(cursor)
    department_Dict['id'] = id
    department_Dict['status'] = True
    department_Dict['message']="Success"

    return department_Dict

def getAllDepartmentFunction():
    main_dict = {}
    departmentList = []
    main_dict['status'] = False
    main_dict['message']="Failed to delete department"

    instance = dbconfiguration.getDBInstance()
    cursor = instance.cursor()

    cursor.execute("select * from department")
    
    departmentInfo = cursor.fetchall()
    dbconfiguration.closeDBInstance(cursor)
    if len(departmentInfo) == 0:     
        main_dict["status"] = True
        main_dict["data"] = departmentList
        main_dict['message'] = "Department does not exist!"
        return main_dict
    
    for i in range(0,len(departmentInfo)):
        department_Dict = {}
        department_Dict['id'] = departmentInfo[i][0]
        department_Dict['name'] = departmentInfo[i][1]
        departmentList.append(department_Dict)

    main_dict['data'] = departmentList
    main_dict['status'] = True
    main_dict['message']="Success"

    return main_dict
