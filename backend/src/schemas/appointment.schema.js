import mongoose from 'mongoose';

const appointmentSchemaDefinition = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  veterinarianId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Veterinarian',
    required: true,
  },
  isActive: { type: Boolean, default: true },
});

const Appointment = mongoose.model('Appointment', appointmentSchemaDefinition);

export default Appointment;
