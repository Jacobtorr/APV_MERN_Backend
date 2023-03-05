import Paciente from "../models/Paciente.js";

const agregarPaciente = async (req, res) => {
    
    // Comprobar que el paciente pertenece a ese Veterinario
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;
    
    try {
        // Agregar un Paciente a la BD
        const pacienteGuardado = await paciente.save();
        res.json(pacienteGuardado);
    } catch (error) {
        console.log(error)
    }
};

const obtenerPacientes = async (req, res) => {
    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario);
    res.json(pacientes);
};

const obtenerPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    // Validar que existe el paciente
    if(!paciente) {
        const error = new Error('Usuario no encontrado');
        return res.status(404).json({msg: error.message})
    }

    // Validar que el veterinario en la sesion es el que esta obteniendo el paciente
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
       return res.json({msg: 'Accion no valida'});
    }

    res.json(paciente);
    
}

const actualizarPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    // Validar que existe el paciente
    if(!paciente) {
        const error = new Error('Usuario no encontrado');
        return res.status(404).json({msg: error.message})
    }

    // Validar que el veterinario en la sesion es el que esta actualizando el paciente
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
       return res.json({msg: 'Accion no valida'});
    } 

    // Actualizar Paciente 
    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;

    try {
        const pacienteActualizado = await paciente.save();
        res.json(pacienteActualizado);
    } catch (error) {
        console.log(error);
    }
}

const eliminarPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    // Validar que existe el paciente
    if(!paciente) {
        const error = new Error('Usuario no encontrado');
        return res.status(404).json({msg: error.message})
    }

    // Validar que el veterinario en la sesion es el que esta eliminando el paciente
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
       return res.json({msg: 'Accion no valida'});
    } 

    try {
        await paciente.deleteOne()
        res.json({msg: "Paciente Eliminado"})
    } catch (error) {
        console.log(error);
    }
}

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}