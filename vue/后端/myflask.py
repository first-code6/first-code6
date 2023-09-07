from flask import Flask, request
from flask_cors import cross_origin  # 跨域
import link_database

app = Flask(__name__)


@app.route("/index/server", methods=["GET", "POST"])
@cross_origin()    # 设置允许跨域
def index():
    if request.method == 'POST':
        # 获取前端数据
        data = request.get_json()
        if data['pd'] == 3:
            back = link_database.check_user(data["new"])
            return back
        # 判断如果是登录输入
        elif data['pd'] == 1:
            back = link_database.login_user(data["id"], data["pass"])
            return back
        # 判断如果是注册输入
        else:
            back = link_database.signup_user(data["add_id"], data["add_pass"])
            return back


@app.route("/massage/server", methods=["GET", "POST"])
@cross_origin()
def massage():
    # 获取前端数据
    data = request.get_json()
    back = link_database.message_in(data)
    return back


if __name__ == '__main__':
    # 设置端口为5173
    app.run(port=5173, debug=True)
