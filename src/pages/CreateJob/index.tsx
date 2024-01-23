import { Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { loginUserApi } from 'api/userApi'
import { InputField } from 'components/InputField'
import { SelectField } from 'components/SelectField'
import { Centered, Flex } from 'components/design'
import { Formik } from 'formik'
import { useViewports } from 'helpers/viewports'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Link, useNavigate } from 'react-router-dom'
import { setUser } from 'store/auth'
import * as Yup from 'yup'

export interface CreateJobProps {
  title: string
  description: string
  priceFrom: number
  priceTo: number
  category: string
  city: string
}

const CreateJob = () => {
  const { isLaptop } = useViewports()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const initialValues: CreateJobProps = {
    title: '',
    description: '',
    priceFrom: 0,
    priceTo: 0,
    category: '',
    city: ''
  }

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required.')
  })

  const handleSubmit = async () => {
    setLoading(true)

    setLoading(false)
  }

  return (
    <Container maxWidth='md'>
      <Centered py={5} minHeight='calc(100vh - 100px)'>
        <StyledBox maxWidth={'500px'} width='100%'>
          <Grid container>
            <Grid item xs={12}>
              <Centered pt={3}>
                <Box p={4} maxWidth='450px' width='100%'>
                  <Typography
                    variant='h4'
                    color='primary'
                    fontWeight='bold'
                    textAlign='center'
                    pb={5}
                  >
                    Lets Post a Job!
                  </Typography>

                  <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={loginValidationSchema}
                  >
                    {({ submitForm }) => {
                      return (
                        <Form>
                          <Flex flexDirection='column' gap={2}>
                            <InputField name='title' label={'Title'} />
                            <InputField name='description' label={'Description'} />
                            <SelectField
                              name='category'
                              label='Category'
                              options={[
                                {
                                  title: 'UI & UX',
                                  key: 'ui&ux'
                                },
                                {
                                  title: 'UI & UX',
                                  key: 'ui&ux'
                                },
                                {
                                  title: 'UI & UX',
                                  key: 'ui&ux'
                                },
                                {
                                  title: 'UI & UX',
                                  key: 'ui&ux'
                                }
                              ]}
                            />
                            <InputField name='priceFrom' type='number' label={'Starting Price'} />
                            <InputField
                              name='priceTo'
                              type='number'
                              label={'Maximum Price Limit'}
                            />
                            <InputField name='city' label={'City'} />
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
                                  Create Job
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

export default CreateJob

const StyledBox = styled(Box)(() => ({
  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  paddingBottom: '3rem'
}))
