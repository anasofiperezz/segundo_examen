async function registrarPaquete() {
    const id = document.getElementById('paquete-id').value;
    if (!id) {
        alert('Por favor, ingrese un ID de paquete válido.');
        return;
    }
    try {
        const response = await fetch('/paquete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        const data = await response.json();
        alert(data.mensaje);
    } catch (error) {
        console.error('Error al registrar el paquete:', error);
        alert('Hubo un error al registrar el paquete. Consulte la consola para obtener más detalles.');
    }
}

async function consultarEstado() {
    const id = document.getElementById('paquete-id-consulta').value;
    if (!id) {
        alert('Por favor, ingrese un ID de paquete válido.');
        return;
    }
    try {
        const response = await fetch(`/paquete/${id}`);
        const data = await response.json();
        document.getElementById('estado-paquete').innerHTML = `ID: ${data.id}, Estado: ${data.estado}`;
    } catch (error) {
        console.error('Error al consultar el estado del paquete:', error);
        alert('Hubo un error al consultar el estado del paquete. Consulte la consola para obtener más detalles.');
    }
}
