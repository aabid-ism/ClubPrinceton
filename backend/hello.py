from flask import Flask
from pymongo import MongoClient
import datetime
app = Flask(__name__)

client = MongoClient('mongodb+srv://9projectideas:EfhEWYlNTIYAb8gr@clubprincetoncluster.8gzl1pl.mongodb.net/?retryWrites=true&w=majority')

# creating a database inside the client cluster
db = client.gettingStarted
# creating a collection called characters
characters = db.characters

charactersDocument = {
  "name": { "first": "Eren", "last": "Yeager" },
  "birth": datetime.datetime(1512, 6, 23),
  "death": datetime.datetime(1554, 6, 7),
  "Powers": [ "Attack Titan", "Warhammer Titan", "Founding Titan" ],
  "Popularity": 1250000
}

characters.insert_one(charactersDocument)

@app.route('/')
def hello_world():
   return 'Hello World'

if __name__ == '__main__':
   app.run(debug=True)