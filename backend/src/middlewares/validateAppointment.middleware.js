import Appointment from '../schemas/appointment.schema';

export const validateAppointment = async (req, res, next) => {
  const { date, start_time, end_time, veterinarianId } = req.body;

  const isValidDate = (date) => {
    const dateParts = date.split('T');
    return dateParts.length === 1; // Verifica que solo haya una parte (la fecha).
  };

  const isValidTime = (time) => {
    const timeParts = time.split('T');
    return timeParts.length === 2 && timeParts[1].match(/^\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    // Verifica que haya dos partes (fecha y hora) y que la hora tenga el formato correcto.
  };

  const areDatesEqual = (date1, date2) => {
    const formattedDate1 = new Date(date1).toISOString().split('T')[0];
    const formattedDate2 = new Date(date2).toISOString().split('T')[0];
    return formattedDate1 === formattedDate2;
  };

  if (!areDatesEqual(date, start_time) || !areDatesEqual(date, end_time)) {
    return res.status(400).json({ error: 'Las fechas no son iguales' });
  }

  if (!isValidDate(date) || !isValidTime(start_time) || !isValidTime(end_time)) {
    return res.status(400).json({ error: 'Las fechas y horas no tienen el formato correcto' });
  }

  const startTimeMs = new Date(start_time).getTime();
  const endTimeMs = new Date(end_time).getTime();
  const timeDifferenceMinutes = (endTimeMs - startTimeMs) / (1000 * 60);

  if (timeDifferenceMinutes < 30 || timeDifferenceMinutes > 60) {
    return res.status(400).json({ error: 'La diferencia de tiempo debe estar entre 30 y 60 minutos' });
  }

  const overlappingAppointments = await Appointment.find({
    veterinarianId: veterinarianId,
    date: date,
    isActive: true,
    $or: [
      {
        $and: [{ start_time: { $lt: end_time } }, { end_time: { $gt: start_time } }],
      },
    ],
  });

  if (overlappingAppointments.length > 0) {
    return res.status(409).json({ error: 'El veterinario ya tiene una cita programada en ese horario' });
  }

  next();
};
