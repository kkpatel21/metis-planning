export function registerUser(firstname, lastname, email, password) {
  return {
    type: 'REGISTER_USER',
    firstname,
    lastname,
    email,
    password,
  }
}
