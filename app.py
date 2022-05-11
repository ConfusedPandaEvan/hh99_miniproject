from flask import Flask, render_template
from pymongo import MongoClient
import jwt
import datetime
import hashlib
from flask import Flask, render_template, jsonify, request, redirect, url_for
from werkzeug.utils import secure_filename
from datetime import datetime, timedelta

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config['UPLOAD_FOLDER'] = "./static/profile_pics"

SECRET_KEY = 'SPARTA'

client = MongoClient('mongodb+srv://test:sparta@cluster0.yjvro.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbsparta



@app.route('/')
def main():

    myname = "아영"
    mytown = "성남시 분당구"
    return render_template("index.html", name=myname, town=mytown)


@app.route('/login')
def login():
    return render_template("login.html")


@app.route('/join')
def join():
    return render_template("join.html")

# This part is for posting stuffs

@app.route('/')
def home():
    # token_receive = request.cookies.get('mytoken')
    try:
        # payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        payload = {'id': 'qwer1234', 'exp': 1652233044}
        user_info = db.users.find_one({"username": payload["id"]})
        return render_template('index.html', user_info=user_info)

    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))

@app.route('/posting', methods=['POST'])
def posting():
    # token_receive = request.cookies.get('mytoken')
    try:
        # payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        payload = {'id': 'qwer1234', 'exp': 1652233044}
        user_info = db.users.find_one({"username": payload["id"]})
        name_receive = request.form["name_give"]
        about_receive = request.form["about_give"]
        date_receive = request.form["date_give"]
        doc = {
            "username": user_info["username"],
            "profile_name": user_info["profile_name"],
            "profile_pic_real": user_info["profile_pic_real"],
            "post_name": name_receive,
            "post_info": about_receive,
            "date": date_receive
        }
        if 'file_give' in request.files:
            username = payload["id"]
            file = request.files["file_give"]
            filename = secure_filename(file.filename)
            extension = filename.split(".")[-1]
            file_path = f"post_pics/{username}_{date_receive}.{extension}"
            file.save("./static/"+file_path)
            doc["post_pic"] = filename
            doc["post_pic_real"] = file_path
        db.uploads.insert_one(doc)
        return jsonify({"result": "success", 'msg': '포스트를 올렸습니다.'})
    except (jwt.ExpiredSignatureError, jwt.exceptions.DecodeError):
        return redirect(url_for("home"))

@app.route("/get_posts", methods=['GET'])
def get_posts():
    # token_receive = request.cookies.get('mytoken')
    try:
        # payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        payload = {'id': 'qwer1234', 'exp': 1652233044}
        username_receive = request.args.get("username_give")

        if username_receive == "":
            posts = list(db.uploads.find({}).sort("date", -1).limit(20))


        else:
            posts = list(db.uploads.find({"username": username_receive}).sort("date", -1).limit(20))



        # 포스팅 목록 받아오기
        for post in posts:
            post["_id"] = str(post["_id"])
        #     post["count_heart"] = db.likes.count_documents({"post_id": post["_id"], "type": "heart"})
        #     post["heart_by_me"] = bool(db.likes.find_one({"post_id": post["_id"], "type": "heart", "username": payload['id']}))
        return jsonify({"result": "success", "msg": "포스팅을 가져왔습니다.", "posts": posts})
    except (jwt.ExpiredSignatureError, jwt.exceptions.DecodeError):
        return redirect(url_for("home"))

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
