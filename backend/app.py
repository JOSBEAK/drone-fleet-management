from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import json


app = Flask(__name__, static_folder='../static')
CORS(app)

# Load data from JSON file
with open('data.json', 'r') as file:
    data = json.load(file)

@app.route('/api/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    
    for user in data['users']:
        if user['username'] == username and user['password'] == password:
            return jsonify({"success": True}), 200
    
    return jsonify({"success": False}), 401

@app.route('/api/drones', methods=['GET'])
def get_drones():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 12, type=int)
    
    start = (page - 1) * per_page
    end = start + per_page
    
    paginated_drones = data['drones'][start:end]
    total_drones = len(data['drones'])
    
    return jsonify({
        "drones": paginated_drones,
        "total": total_drones,
        "page": page,
        "per_page": per_page,
        "total_pages": (total_drones + per_page - 1) // per_page
    })

@app.route('/api/drones/<drone_id>', methods=['GET'])
def get_drone(drone_id):
    for drone in data['drones']:
        if drone['id'] == drone_id:
            return jsonify(drone)
    return jsonify({"error": "Drone not found"}), 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)