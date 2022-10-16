from sqlalchemy import false
import dbconfiguration

def createUserFunction(name,designation,email,password):

    login_Dict = {}
    login_Dict['First_Name'] = ""
    login_Dict['designation'] = ""
    login_Dict['email'] = ""
    login_Dict['password'] = ""
    login_Dict['status'] = False
    login_Dict['message']="Failed to create user!"

    instance = dbconfiguration.getDBInstance()

    cursor = instance.cursor()

    cursor.execute("select * from userinfo where email = %s", (email,))
    
    userInfo = cursor.fetchall()
    if len(userInfo) >= 1:        
        login_Dict['status'] = False
        login_Dict['message'] = "User already exist"
        return login_Dict
    
    cursor.execute("insert into userinfo(name,designation,email,pass) values(%s,%s,%s,%s)",(name,designation,email,password,))
    instance.commit()
    dbconfiguration.closeDBInstance(cursor)

    login_Dict['First_Name'] = name
    login_Dict['designation'] = designation
    login_Dict['email'] = email
    login_Dict['password'] = password
    login_Dict['status'] = True
    login_Dict['message']="Success"

    return login_Dict

def deleteUserFunction(email):
    delete_Dict = {}
    delete_Dict['name'] = ""
    delete_Dict['designation'] = ""
    delete_Dict['email'] = ""
    delete_Dict['status'] = False
    delete_Dict['message']="Failed to delete the user"

    instance = dbconfiguration.getDBInstance()

    cursor = instance.cursor()

    cursor.execute("select * from userinfo where email = %s", (email,))
    
    userInfo = cursor.fetchall()
    
    if len(userInfo) == 1:
        cursor.execute("delete from userinfo where email = %s",(email,))
        instance.commit()
        delete_Dict['name'] = userInfo[0][1]
        delete_Dict['designation'] = userInfo[0][2]
        delete_Dict['email'] = userInfo[0][3]
        delete_Dict['status'] = True
        delete_Dict['message'] = "Success"

    dbconfiguration.closeDBInstance(cursor)

    return delete_Dict

def updateUserFunction(name,designation,email):
    update_Dict = {}
    update_Dict['name'] = ""
    update_Dict['designation'] = ""
    update_Dict['email'] = ""
    update_Dict['status'] = False
    update_Dict['message']="Failed to update user data!"

    instance = dbconfiguration.getDBInstance()

    cursor = instance.cursor()

    cursor.execute("select * from userinfo where email = %s", (email,))
    
    userInfo = cursor.fetchall()
    if len(userInfo) == 1:      
        cursor.execute("update userinfo set name = %s, designation = %s where email = %s",(name,designation,email,))
        instance.commit()  
        update_Dict['name'] = name
        update_Dict['designation'] = designation
        update_Dict['email'] = email
        update_Dict['status'] = True
        update_Dict['message']="Success"
    
    dbconfiguration.closeDBInstance(cursor)

    return update_Dict

def loginFunction(email,password):

    login_Dict = {}
    login_Dict['First_Name'] = ""
    login_Dict['designation'] = ""
    login_Dict['email'] = ""
    login_Dict['password'] = ""
    login_Dict['status'] = False
    login_Dict['message']="Failed to login"

    instance = dbconfiguration.getDBInstance()

    cursor = instance.cursor()

    cursor.execute("select * from userinfo where email = %s and pass = %s", (email, password))
    
    userInfo = cursor.fetchall()
    dbconfiguration.closeDBInstance(cursor)

    if len(userInfo) == 1:
        login_Dict['First_Name'] = userInfo[0][1]
        login_Dict['designation'] = userInfo[0][2]
        login_Dict['email'] = userInfo[0][3]
        login_Dict['password'] = userInfo[0][4]
        login_Dict['status'] = True
        login_Dict['message'] = "Success"
        
    return login_Dict
