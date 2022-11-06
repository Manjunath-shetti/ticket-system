from os import stat
from sqlalchemy import false
import dbconfiguration

def addTicketFunction(projectId,userId,title,body):
    ticket_Dict = {}
    ticket_Dict["title"] = ""
    ticket_Dict["body"] = ""
    ticket_Dict["ticketstatus"] = ""#default status for add ticket is open
    ticket_Dict["projectId"] = ""
    ticket_Dict["userId"] = ""
    ticket_Dict['status'] = False
    ticket_Dict['message'] = "Failed to create the ticket"

    instance = dbconfiguration.getDBInstance()
    cursor = instance.cursor()

    #check if projectId exist or not in project able 
    cursor.execute("select * from project where id = %s", (projectId,))
    
    projectInfo = cursor.fetchall()
    if len(projectInfo) == 0:        
        ticket_Dict['status'] = False
        ticket_Dict['message'] = "Failed to create the ticket because given project for the ticket doesnt exist"
        return ticket_Dict

    #check if userId exist or not in user Table 
    cursor.execute("select * from userinfo where id = %s", (userId,))
    
    userInfo = cursor.fetchall()
    if len(userInfo) == 0:        
        ticket_Dict['status'] = False
        ticket_Dict['message'] = "Failed to create the ticket because given user for the ticket doesnt exist"
        return ticket_Dict
        
    #Insert into Ticket table
    cursor.execute("insert into tickets(title,body,status,p_id,u_id) values(%s,%s,%s,%s,%s)",(title,body,"OPEN",projectId,userId,))
    instance.commit()

    #return the ticket id and all other data
    cursor.execute('SELECT last_insert_id()')
    ticketId = cursor.fetchone()

    dbconfiguration.closeDBInstance(cursor)
     
    ticket_Dict["titleId"] = ticketId[0]
    ticket_Dict["title"] = title
    ticket_Dict["body"] = body
    ticket_Dict["ticketstatus"] = "OPEN"
    ticket_Dict["projectId"] = projectId
    ticket_Dict["userId"] = userId
    ticket_Dict['status'] = True
    ticket_Dict['message'] = "SUCCESS"

    return ticket_Dict

def updateTicketFunction(projectId,userId,ticketId,title,body,status):
    ticket_Dict = {}
    ticket_Dict["titleId"] = ""
    ticket_Dict["title"] = ""
    ticket_Dict["body"] = ""
    ticket_Dict["ticketstatus"] = ""
    ticket_Dict["projectId"] = ""
    ticket_Dict["userId"] = ""
    ticket_Dict['status'] = False
    ticket_Dict['message'] = "Failed to update the ticket"

    instance = dbconfiguration.getDBInstance()
    cursor = instance.cursor()

    #check if projectId exist or not in project able 
    cursor.execute("select * from project where id = %s", (projectId,))
    
    projectInfo = cursor.fetchall()
    if len(projectInfo) == 0:        
        ticket_Dict['status'] = False
        ticket_Dict['message'] = "Failed to update the ticket because given project for the ticket doesnt exist"
        return ticket_Dict

    #check if userId exist or not in user Table 
    cursor.execute("select * from userinfo where id = %s", (userId,))
    
    userInfo = cursor.fetchall()
    if len(userInfo) == 0:        
        ticket_Dict['status'] = False
        ticket_Dict['message'] = "Failed to update the ticket because given user for the ticket doesnt exist"
        return ticket_Dict
    
    #check if ticket exist or not
    cursor.execute("select * from tickets where id = %s", (ticketId,))
    
    ticketInfo = cursor.fetchall()
    if len(ticketInfo) == 0:        
        ticket_Dict['status'] = False
        ticket_Dict['message'] = "Failed to update the ticket because given ticket doesnt exist"
        return ticket_Dict 

    #update the ticket 
    cursor.execute("update tickets set title = %s, body = %s, status= %s,p_id = %s, u_id= %s where id = %s",(title,body,status,projectId,userId,ticketId,))
    instance.commit()
    dbconfiguration.closeDBInstance(cursor)

    ticket_Dict["titleId"] = ticketId
    ticket_Dict["title"] = title
    ticket_Dict["body"] = body
    ticket_Dict["ticketstatus"] = status
    ticket_Dict["projectId"] = projectId
    ticket_Dict["userId"] = userId
    ticket_Dict['status'] = True
    ticket_Dict['message'] = "SUCCESS"

    return ticket_Dict

 
#function to delete the ticket
def deleteTicketFunction(ticketId):
    ticket_Dict = {}
    ticket_Dict['id']=""
    ticket_Dict['status'] = False
    ticket_Dict['message']="Failed to delete ticket"

    instance = dbconfiguration.getDBInstance()
    cursor = instance.cursor()

    #check if ticket exist or not 
    cursor.execute("select * from tickets where id = %s", (ticketId,))
    
    ticketInfo = cursor.fetchall()
    if len(ticketInfo) == 0:        
        ticket_Dict['message'] = "Ticket does not exist!"
        return ticket_Dict
    
    #delete the ticket
    cursor.execute("delete from tickets where id = %s",(ticketId,))
    instance.commit()
    dbconfiguration.closeDBInstance(cursor)
    ticket_Dict['id'] = ticketId
    ticket_Dict['status'] = True
    ticket_Dict['message']="Success"

    return ticket_Dict 

# get tickets project wise 
def getTicketByProjects(projectId):
    main_dict = {}
    ticketList = []
    main_dict['status'] = False
    main_dict['message']="Failed to get tickets for given project!"

    instance = dbconfiguration.getDBInstance()
    cursor = instance.cursor()

    #cursor.execute("select * from tickets where p_id=%s",(projectId,))
    cursor.execute("select * from tickets t JOIN userinfo u ON t.u_id = u.id where p_id =%s",(projectId,))
    
    ticketInfo = cursor.fetchall()
    dbconfiguration.closeDBInstance(cursor)
    if len(ticketInfo) == 0:      
        main_dict['status'] = True  
        main_dict['message'] = "tickets for given project does not exist!"
        main_dict["data"] = ticketList
        return main_dict
    
    print(ticketInfo)
    
    for i in range(0,len(ticketInfo)):
        ticket_Dict = {}
        ticket_Dict['id'] = ticketInfo[i][0]
        ticket_Dict['title'] = ticketInfo[i][1]
        ticket_Dict['body'] = ticketInfo[i][2]
        ticket_Dict['ticketstatus'] = ticketInfo[i][3]
        ticket_Dict['projectId'] = ticketInfo[i][4]
        ticket_Dict['username'] = ticketInfo[i][7]
        ticketList.append(ticket_Dict)

    main_dict['data'] = ticketList
    main_dict['status'] = True
    main_dict['message']="Success"

    return main_dict 