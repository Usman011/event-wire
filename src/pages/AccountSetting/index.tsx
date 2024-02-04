import { Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { InputField } from 'components/InputField'
import { Centered, Flex } from 'components/design'
import { Formik } from 'formik'
import { useViewports } from 'helpers/viewports'
import { useState } from 'react'
import { Form } from 'react-router-dom'
import { countries } from 'countries-list'
import * as Yup from 'yup'
import { SelectField } from 'components/SelectField'

interface countryListProp {
  key: string
  title: string
}

export interface AccountSettingProps {
  password: string
  email: string
  name: string
  address: {
    country: string
    city: string
  }
  role: string
  phone: string
}
const AccountSetting = () => {
  const { isLaptop } = useViewports()
  const [loading, setLoading] = useState(false)
  const initialValues: AccountSettingProps = {
    name: '',
    email: '',
    password: '',
    address: {
      country: '',
      city: ''
    },
    phone: '',
    role: 'buyer'
  }
  console.log('countries', countries)

  const countryList: countryListProp[] = Object.entries(countries).map(([key, country]) => ({
    key,
    title: country.name
  }))

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character, and be at least 8 characters long'
      ),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    address: Yup.object().shape({
      country: Yup.string().required('Country is required'),
      city: Yup.string().required('City is required')
    }),
    role: Yup.string().required('Role is required')
  })

  const handleSubmit = async (values: AccountSettingProps) => {}

  const { isMobile } = useViewports()

  return (
    <Container maxWidth='md'>
      <Centered py={5}>
        <StyledBox width='100%' maxWidth='500px'>
          <Grid container>
            <Grid item xs={12}>
              <Centered pt={3} minHeight='80vh'>
                <Box p={4} maxWidth='450px' width='100%'>
                  <Typography variant='h4' color='primary' fontWeight='bold' textAlign='center'>
                    Profile Setting
                  </Typography>

                  <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                  >
                    {({ submitForm, values }) => {
                      return (
                        <Form>
                          <Flex flexDirection='column' gap={2}>
                            <InputField name='name' label={'Full Name'} />

                            <InputField name='email' label={'Email'} />
                            <SelectField
                              name='address.country'
                              options={countryList}
                              label='Select your Country'
                            />
                            <InputField name='address.city' label={'City'} />

                            <InputField name='password' type='password' label={'Password'} />
                            <InputField
                              name='confirmPassword'
                              type='password'
                              label={'Confirm Password'}
                            />

                            <SelectField
                              name='role'
                              options={[
                                { title: 'Buyer', key: 'buyer' },
                                { title: 'Vendor', key: 'vendor' }
                              ]}
                              label='Role'
                            />
                            {values.role === 'vendor' && (
                              <InputField name='phone' label={'Phone Number'} />
                            )}
                          </Flex>
                          <Box mt={4}>
                            <Button fullWidth size='large' variant='contained' onClick={submitForm}>
                              {loading ? (
                                <CircularProgress sx={{ color: '#fff' }} />
                              ) : (
                                <Typography
                                  variant={'subtitle2'}
                                  color='#fff'
                                  textTransform='capitalize'
                                  fontWeight='bold'
                                >
                                  Signup
                                </Typography>
                              )}
                            </Button>
                          </Box>
                        </Form>
                      )
                    }}
                  </Formik>
                </Box>
              </Centered>
            </Grid>
          </Grid>
        </StyledBox>
      </Centered>
    </Container>
  )
}

export default AccountSetting

const StyledBox = styled(Box)(() => ({
  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;',
  backgroundColor: 'rgba(255, 255, 255, 1)'
}))
