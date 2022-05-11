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



@app.route('/login')
def login():
    msg = request.args.get("msg")
    return render_template('login.html', msg=msg)


@app.route('/join')
def join():
    return render_template("join.html")

# Login_Signupstuffs

@app.route('/sign_in', methods=['POST'])
def sign_in():
    # 로그인
    username_receive = request.form['username_give']
    password_receive = request.form['password_give']

    pw_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()
    result = db.users.find_one({'username': username_receive, 'password': pw_hash})

    if result is not None:
        payload = {
            'id': username_receive,
            'exp': datetime.utcnow() + timedelta(seconds=60 * 60 * 24)  # 로그인 24시간 유지
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        return jsonify({'result': 'success', 'token': token})
    # 찾지 못하면
    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})


@app.route('/sign_up/save', methods=['POST'])
def sign_up():
    # 회원가입
    username_receive = request.form['username_give']
    password_receive = request.form['password_give']
    password_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()
    # DB에 저장
    doc = {
        "username": username_receive,  # 아이디
        "password": password_hash,  # 비밀번호
        "profile_name": username_receive,
        "profile_pic_real": "profile_pics/profile_placeholder.png"
    }
    db.users.insert_one(doc)
    return jsonify({'result': 'success'})


@app.route('/sign_up/check_dup', methods=['POST'])
def check_dup():
    username_receive = request.form['username_give']
    exists = bool(db.users.find_one({"username": username_receive}))
    return jsonify({'result': 'success', 'exists': exists})


# This part is for posting stuffs

@app.route('/')
def home():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.users.find_one({"username": payload["id"]})
        return render_template('index.html', user_info=user_info)

    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))


@app.route('/posting', methods=['POST'])
def posting():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])

        user_info = db.users.find_one({"username": payload["id"]})
        name_receive = request.form["name_give"]
        about_receive = request.form["about_give"]
        date_receive = request.form["date_give"]
        string_date = date_receive.replace(":", "_").replace(".", "_")
        doc = {
            "username": user_info["username"],
            "profile_name": user_info["profile_name"],
            "profile_pic_real": user_info["profile_pic_real"],
            "post_name": name_receive,
            "post_info": about_receive,
            "date": date_receive,
            "post_pic": "post_pics/placeholder1.png",
            "post_pic2": "post_pics/placeholder1.png",
            "post_pic_real": "post_pics/placeholder1.png",
            "post_pic_real2": "post_pics/placeholder1.png",

        }
        if 'file_give' in request.files:
            username = payload["id"]
            file = request.files["file_give"]
            filename = secure_filename(file.filename)
            extension = filename.split(".")[-1]
            file_path = f"post_pics/{username}_{string_date}.{extension}"
            file.save("./static/" + file_path)
            doc["post_pic"] = filename
            doc["post_pic_real"] = file_path

        if 'file_give2' in request.files:
            username = payload["id"]
            file = request.files["file_give2"]
            filename = secure_filename(file.filename)
            extension = filename.split(".")[-1]
            file_path = f"post_pics/{username}_{string_date}(2).{extension}"
            file.save("./static/" + file_path)
            doc["post_pic2"] = filename
            doc["post_pic_real2"] = file_path
        db.uploads.insert_one(doc)
        return jsonify({"result": "success", 'msg': '포스트를 올렸습니다.'})
    except (jwt.ExpiredSignatureError, jwt.exceptions.DecodeError):
        return redirect(url_for("home"))


@app.route("/get_posts", methods=['GET'])
def get_posts():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])

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
