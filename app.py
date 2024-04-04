from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://examen2_sistemas_user:uAQZagzeNJiSA9GHxx8dvTn1f2E9FSxz@dpg-co6t61mv3ddc73c8ob30-a/examen2_sistemas'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Paquete(db.Model):
    id = db.Column(db.String, primary_key=True)
    estado = db.Column(db.String, nullable=False)

    def _repr_(self):
        return f'<Paquete {self.id} {self.estado}>'

@app.route('/paquetes', methods=['GET'])
def get_paquetes():
    paquetes = Paquete.query.all()
    return jsonify({paquete.id: {'estado': paquete.estado} for paquete in paquetes})

@app.route('/paquete', methods=['POST'])
def registrar_paquete():
    datos = request.json
    paquete = Paquete(id=datos['id'], estado='registrado')
    db.session.add(paquete)
    db.session.commit()
    return jsonify({'mensaje': 'Paquete registrado con éxito'}), 201

@app.route('/paquete/<id>', methods=['GET'])
def obtener_estado_paquete(id):
    paquete = Paquete.query.get(id)
    if paquete:
        return jsonify({'id': id, 'estado': paquete.estado})
    else:
        return jsonify({'mensaje': 'Paquete no encontrado'}), 404

@app.route('/paquete/<id>', methods=['PUT'])
def actualizar_estado_paquete(id):
    datos = request.json
    paquete = Paquete.query.get(id)
    if paquete:
        paquete.estado = datos.get('estado')
        db.session.commit()
        return jsonify({'mensaje': 'Estado actualizado'})
    else:
        return jsonify({'mensaje': 'Paquete no encontrado'}), 404

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)