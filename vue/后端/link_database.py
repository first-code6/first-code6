import pymysql


# 登陆功能
def login_user(username, password):
    # 连接数据库
    conn = pymysql.connect(host="127.0.0.1", port=3306, user='root', passwd="123456", charset='utf8', db='qhdweb')
    cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)

    # 搜寻用户的账号密码信息
    sql = "select * from user_pass where user = %s"
    cursor.execute(sql, username)
    data_list = cursor.fetchall()

    # 关闭数据库
    conn.close()
    cursor.close()

    # 如果没有这个用户或者密码错误
    if not data_list or data_list[0]['password'] != password:
        return '2'
    else:
        if data_list[0]['user_level'] == '管理员用户':
            return '7'
        elif data_list[0]['message'] == '1':
            return '8'
        else:
            return '1'


# 注册功能
def signup_user(username, password):
    # 连接数据库
    conn = pymysql.connect(host="127.0.0.1", port=3306, user='root', passwd="123456", charset='utf8', db='qhdweb')
    cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)

    # 搜索数据库username的信息
    sql = "select uid from user_pass where user = %s"
    cursor.execute(sql, username)
    data_list = cursor.fetchall()

    if not data_list:
        sql_1 = "insert into user_pass(user, password,user_level) value(%s, %s, %s)"
        cursor.execute(sql_1, [username, password, '普通用户'])
        conn.commit()

        # 关闭数据库
        cursor.close()
        conn.close()

        return '3'
    else:
        # 关闭数据库
        cursor.close()
        conn.close()

        return '4'


# 检测账号
def check_user(username):
    # 连接数据库
    conn = pymysql.connect(host="127.0.0.1", port=3306, user='root', passwd="123456", charset='utf8', db='qhdweb')
    cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)

    # 检测账号是否可用
    sql = "select uid from user_pass where user = %s"
    cursor.execute(sql, username)
    data_list = cursor.fetchall()

    if not data_list:
        # 关闭数据库
        cursor.close()
        conn.close()
        return '5'
    else:
        # 关闭数据库
        cursor.close()
        conn.close()
        return '6'


# 信息入库功能
def message_in(data):
    # 连接数据库
    conn = pymysql.connect(host="127.0.0.1", port=3306, user='root', passwd="123456", charset='utf8', db='qhdweb')
    cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
    like = ''
    for i in data['like']:
        like = like + '--' + i

    # 入库信息
    sql = "insert into user_message value (%s, %s, %s, %s, %s, %s, %s)"
    cursor.execute(sql, [data["uid"], data['name'], data['phone'], data['email'], data['sex'], data['date'], like])
    conn.commit()

    # 将用户石头已初始化设置为已初始化
    sql = "update user_pass set message = %s where user = %s"
    cursor.execute(sql, ['0', data["uid"]])
    conn.commit()

    # 关闭数据库
    cursor.close()
    conn.close()
    return '数据入库成功！'
