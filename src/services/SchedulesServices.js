// import { fetchUsers } from "./UsersServices"

// const doctorList = arr => arr.map(user => user.id)

export const fetchSchedules = async () => {
  const SCHEDULES_URL = process.env.NEXT_PUBLIC_SCHEDULES_API + `/api/schedules`
  // const doctors = await fetchUsers(SCHEDULES_URL)

  // const docList = doctorList(doctors)
  // console.log('doclist', docList);

  const fetchData = await fetch(SCHEDULES_URL, {
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
      'ngrok-skip-browser-warning': 'any'
    }
  })

  const data = await fetchData.json()

  return data
}

export const fetchSchedule = async (id) => {
  const SCHEDULES_URL = process.env.NEXT_PUBLIC_SCHEDULES_API + `/api/schedules/${id}`

  const data = await fetch(SCHEDULES_URL, {
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
      'ngrok-skip-browser-warning': 'any'
    }
  })
  return data.json()
}


export const fetchScheduleByUser = async (id) => {
  const SCHEDULES_URL = process.env.NEXT_PUBLIC_SHOW_30_DAYS
  const body = {
    usuario_id: id
  }
  const data = await fetch(SCHEDULES_URL, {
    method: "POST",
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
    },
    body: JSON.stringify(body)
  })
  return data.json()
}

export const fetchScheduleByDate = async (id, date) => {
  const SCHEDULES_URL = process.env.NEXT_PUBLIC_SHOW_SCHEDULE_BY_DATE;
  const body = {
    usuario_id: id,
    fecha: date
  }
  const data = await fetch(SCHEDULES_URL, {
    method: "POST",
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*'
    },
    body: JSON.stringify(body)
  })
  return data.json()
}

export const fetchScheduleByAvailability = async (id) => {
  const SCHEDULES_URL = process.env.NEXT_PUBLIC_SHOW_DISPONIBILIDADES;
  const body = {
    id_user: id
  }
  console.log('body', body);
  const data = await fetch(SCHEDULES_URL, {
    method: "POST",
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*'
    },
    body: JSON.stringify(body)
  })
  return data.json()
}

export const createSchedule = async (schedule) => {
  const SCHEDULES_URL = process.env.NEXT_PUBLIC_SCHEDULES_API + `/api/schedules`

  const data = await fetch(SCHEDULES_URL, {
    method: "POST",
    cors: "no-cors",
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
      'ngrok-skip-browser-warning': 'any'
    },
    body: JSON.stringify({
      "usuario_id": schedule.user_id,
      "dia_semana": schedule.day,
      "hora_inicio": schedule.start_time,
      "hora_fin": schedule.end_time
    })
  })

  return data.json()
}

export const updateSchedule = async (schedule, id) => {
  const SCHEDULES_URL = process.env.NEXT_PUBLIC_SCHEDULES_API + `/api/schedules/${id}`

  const data = await fetch(SCHEDULES_URL, {
    method: "PUT",
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
      'ngrok-skip-browser-warning': 'any'
    },
    body: JSON.stringify({
      "usuario_id": schedule.user_id,
      "dia_semana": schedule.day,
      "hora_inicio": schedule.start_time,
      "hora_fin": schedule.end_time
    })
  })
  return data
}


export const deleteSchedule = async (id) => {
  const SCHEDULES_URL = process.env.NEXT_PUBLIC_SCHEDULES_API + `/api/schedules/${id}`
  const data = await fetch(SCHEDULES_URL, {
    method: "DELETE",
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
      'ngrok-skip-browser-warning': 'any'
    }
  })
  return data.json()
}



export const getSpecialities = async () => {
  const SPECIALITIES = process.env.NEXT_PUBLIC_ESPECIALIDADES;
  try {
    const data = await fetch(SPECIALITIES, {
      headers: {
        'content-type': 'application/json',
        'access-control-allow-origin': '*',
        'ngrok-skip-browser-warning': 'any'
      }
    })
    return data.json()
  } catch (error) {
    console.log('Error: ', error)
  }
}