import styled from '@emotion/styled'
import { Box, Button, CircularProgress, Container, Typography } from '@mui/material'
import { InputField } from 'components/InputField'
import { Centered, Flex } from 'components/design'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { Form } from 'react-router-dom'
import * as Yup from 'yup'

const Contact = () => {
  const [loading, setLoading] = useState(false)

  const initialValues = {
    name: '',
    email: '',
    message: ''
  }

  const handleSubmit = () => {}
  const loginValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
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
          <Typography variant='h4' fontWeight='bold' mb={3} textAlign='center'>
            Send us Message
          </Typography>

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={loginValidationSchema}
          >
            {({ submitForm, values }) => {
              return (
                <Form>
                  <Flex flexDirection='column' gap={2}>
                    <InputField name='name' label={'Full Name'} />

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
  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  width: '100%',
  padding: '2rem'
}))
