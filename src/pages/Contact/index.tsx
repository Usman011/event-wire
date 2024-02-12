import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { Form } from 'react-router-dom'
import styled from '@emotion/styled'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { IContactUsMessage } from 'utils/interfaces'
import { Box, Button, CircularProgress, Container, Typography } from '@mui/material'
import { InputField } from 'components/InputField'
import { Centered, Flex } from 'components/design'
import { openToaster } from 'store/toast'
import * as API from 'api/userApi'

const Contact = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const initialValues = {
    subject: '',
    username: '',
    email: '',
    message: ''
  }

  const handleSubmit = async (values: IContactUsMessage, { resetForm }) => {
    setLoading(true)
    try {
      await API.contactUs(values)
      resetForm()
      dispatch(
        openToaster({
          type: 'success',
          message: 'Conact email sent successfully'
        })
      )
    } catch (err) {
      /* error */
      openToaster({
        type: 'error',
        message: err.message
      })
    }
    setLoading(false)
  }
  const loginValidationSchema = Yup.object().shape({
    subject: Yup.string().required('Subject is required'),
    username: Yup.string().required('Name is required'),
    email: Yup.string().email().required('Email is required'),
    message: Yup.string().required('Message is required')
  })
  return (
    <Container maxWidth='md'>
      <Centered
        sx={{
          minHeight: 'calc(100vh - 100px)',
          height: '100%'
        }}
      >
        <StyledBox>
          {/* <Typography variant='h4' fontWeight='bold' mb={3} textAlign='center'>
            Send us Message
          </Typography> */}

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={loginValidationSchema}
          >
            {({ submitForm, values }) => {
              return (
                <Form>
                  <Flex flexDirection='column' gap={2}>
                    <InputField name='subject' label={'Subject'} />
                    <InputField name='username' label={'Full Name'} />

                    <InputField name='email' label={'Email'} />

                    <InputField multiline rows={10} name='message' label={'Message'} />
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
                          Send Message
                        </Typography>
                      )}
                    </Button>
                  </Box>
                </Form>
              )
            }}
          </Formik>
        </StyledBox>
      </Centered>
    </Container>
  )
}

export default Contact

const StyledBox = styled(Box)(() => ({
  backgroundColor: 'rgba(255, 255, 255, 1)',
  width: '100%',
  padding: '2rem'
}))
