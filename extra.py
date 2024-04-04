from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://examen2_sistemas_user:uAQZagzeNJiSA9GHxx8dvTn1f2E9FSxz@dpg-co6t61mv3ddc73c8ob30-a.oregon-postgres.render.com/examen2_sistemas'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Paquete(db.Model):
    id = db.Column(db.String, primary_key=True)
    estado = db.Column(db.String, nullable=False)

@app.route('/info_paquetes', methods=['GET'])
def info_paquetes():
    total_paquetes = Paquete.query.count()
    paquetes_registrados = Paquete.query.filter_by(estado='registrado').count()
    paquetes_faltantes = total_paquetes - paquetes_registrados
    return jsonify({
        'total_paquetes': total_paquetes,
        'paquetes_registrados': paquetes_registrados,
        'paquetes_faltantes': paquetes_faltantes
    })

if __name__ == '__main__':
    app.run(debug=True)