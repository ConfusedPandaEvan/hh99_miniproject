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
        db.posts.insert_one(doc)
        return jsonify({"result": "success", 'msg': '포스트를 올렸습니다.'})
    except (jwt.ExpiredSignatureError, jwt.exceptions.DecodeError):
        return redirect(url_for("home"))



if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
