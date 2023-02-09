import * as yup from 'yup'

const schemes = {
  name: yup.string('Enter contact name').required('Name is required'),
  number: yup.number('Enter contact number').required('Number is required'),
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
}

export const generateValidationSchema = arr => {
  let res = {}
  for (const property in schemes) {
    if (arr.includes(property)) res[property] = schemes[property]
  }
  return yup.object(res)
}
