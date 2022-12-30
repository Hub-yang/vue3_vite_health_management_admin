export function validate_email(value: string) {
  // const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  // return regEmail.test(value)
  return true
}

export function validate_password(value: string) {
  // const regPassword = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
  // return regPassword.test(value)
  return true
}
