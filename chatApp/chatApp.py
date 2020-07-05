import os 
import requests
from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit

# initialize the app
app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

votes = {"yes": 0, "no": 0, "maybe": 0}

@app.route("/")
def index():
    return render_template("index.html", votes=votes)

@socketio.on("submit vote")
def vote(data):
    selection = data["selection"]
    votes[selection] += 1
    emit("vote totals", votes, broadcast=True)

# if __name__ == '__main__':
#     socketio.run(app)