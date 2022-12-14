/**
 * all the request to api will be written here
 */

// any header to be passed in here
const header = new Headers({})

// fetch patient from next
export const fetchPatients = async () => await fetch('/api/getPatients')

// post patient  from next
export const postPatient = async (patientId: string) => {
  return await fetch('/api/postPatient', {
    method: 'POST',
    body: JSON.stringify(patientId),
  })
}
