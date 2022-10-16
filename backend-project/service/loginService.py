from sqlalchemy import false
import dbconfiguration

def loginFunction(email,password):

    login_Dict = {}
    login_Dict['First_Name'] = ""
    login_Dict['designation'] = ""
    login_Dict['email'] = ""
    login_Dict['password'] = ""
    login_Dict['status'] = False

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
        
    return login_Dict
