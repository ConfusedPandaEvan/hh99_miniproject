from flask import Flask, render_template
# import requests

app = Flask(__name__)


@app.route('/')
def main():
    # r = requests.get('http://openapi.seoul.go.kr:8088/6d4d776b466c656533356a4b4b5872/json/RealtimeCityAir/1/99')
    # response = r.json()
    # rows = response['RealtimeCityAir']['row']
    myname = "아영"
    mytown = "성남시 분당구"
    return render_template("index.html", name=myname, town=mytown)


@app.route('/login')
def login():
    return render_template("login.html")


@app.route('/join')
def join():
    return render_template("join.html")


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
