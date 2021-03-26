from flask import Flask
from flask import request, make_response, jsonify
from flask_cors import CORS
from dblib import select_with_key

app = Flask(__name__, static_folder="./builder/static", template_folder="./build")
CORS(app) #Cross Origin Resource Sharing

@app.route("/", methods=['GET'])
def index():
    return "Tracking"

@app.route("/track", methods=['GET','POST'])
def track():
    #print(request.get_json())
    data = request.get_json()
    email = data['email']
    email = "'" + email + "'"

    res = select_with_key('./users.db','USERS', 'user_email',email)
    print(type(res))
    print(res)
    response = {'result': res}
    
    #print(response)
    return make_response(jsonify(response))

if __name__ == "__main__":
    app.debug = True
    app.run(host='127.0.0.1', port=5000)