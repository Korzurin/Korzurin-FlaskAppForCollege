from logging import debug
from flask import Flask, render_template, request, jsonify
from flask.helpers import make_response
from numpy import deg2rad
from werkzeug.wrappers import response

from back import GettingAndPosting1


application = Flask(__name__)


@application.get("/")
def index_get():
    return render_template("base.html")


@application.post("/predict")
def predict():
    text = request.get_json().get("message") 
    response = GettingAndPosting1(text)
    message = {"answer": response}
    print(f'text: {text}')
    print(f'response: {response}/n')
    print(f'message: {message}')
    return jsonify(message)


if __name__ == "__main__":
    application.run(debug=True, host='0,0,0,0')