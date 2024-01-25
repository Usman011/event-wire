import styled from '@emotion/styled'
import { Box, Button, CircularProgress, Grid, Modal, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Flex } from './design'
import { useState } from 'react'
import { Formik } from 'formik'
import { Form } from 'react-router-dom'
import { InputField } from './InputField'
import * as Yup from 'yup'

const BuyerRequest = () => {
  const initialLimit = 30
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [limit, setLimit] = useState(initialLimit)
  const [loading, setLoading] = useState(false)

  const handleToggleContent = () => {
    setLimit(prevLimit => (prevLimit === initialLimit ? Infinity : initialLimit))
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 700,
    width: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '5px'
  }
  const getContentPreview = (text: string) => {
    const words = text.split(' ')
    return words.slice(0, limit).join(' ') + (words.length > limit ? '...' : '')
  }

  const initialValues = {
    message:
      'Hey there! We love your work and are interested in learning more about your services for our wedding.',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
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
    <StyledBox>
      <Flex alignItems='center' justifyContent='space-between' gap={2}>
        <Flex gap={2} alignItems='center'>
          <AccountCircleIcon
            sx={{
              fontSize: '55px',
              color: '#666666'
            }}
          />
          <Box>
            <Typography variant='subtitle2' color='#555' fontWeight='600'>
              Usman Nasir
            </Typography>
            <Typography variant='caption' color='#555' fontWeight='400'>
              20 April 2000
            </Typography>
          </Box>
        </Flex>
        <Flex flexDirection='column'>
          <Typography variant='body1' fontWeight='bold' color='#666' textAlign='center'>
            UI & UX
          </Typography>
          <Typography variant='caption' fontWeight='500' color='#666' textAlign='end'>
            Lahore
          </Typography>
        </Flex>
      </Flex>
      <Typography variant='subtitle2' color='#444' fontWeight='700' mt={2}>
        Create new website Design
      </Typography>
      <Typography variant='body2' color='#777' pb={2} pt={1}>
        {getContentPreview(
          '@mui/icons-material includes the 2,100+ official Material Icons converted to SvgIcon components. It depends on @mui/material, which requires Emotion packages. Use one of the following commands to install it:  @mui/icons-material includes the 2,100+ official Material Icons converted to SvgIcon components. It depends on @mui/material, which requires Emotion packages. Use one of the following commands to install it: @mui/icons-material includes the 2,100+ official Material Icons converted to SvgIcon components. It depends on @mui/material, which requires Emotion packages. Use one of the following commands to install it: @mui/icons-material includes the 2,100+ official Material Icons converted to SvgIcon components. It depends on @mui/material, which requires Emotion packages. Use one of the following commands to install it:'
        )}
        <Button color='primary' size='small' onClick={handleToggleContent}>
          {limit === initialLimit ? 'Read More' : 'Read Less'}
        </Button>
      </Typography>

      <Flex mt={2} gap={3} justifyContent='space-between'>
        <Box>
          <Typography variant='subtitle2' fontWeight='700' color='#666'>
            $3000 - $4000
          </Typography>
        </Box>
        <Button variant='contained' color='primary' onClick={handleOpen}>
          <Typography variant='body2' color='#fff'>
            Contact User
          </Typography>
        </Button>
      </Flex>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={loginValidationSchema}
            >
              {({ submitForm }) => {
                return (
                  <Form>
                    <Typography variant={'subtitle1'} fontWeight='700' my={1}>
                      Message vendor
                    </Typography>
                    <Typography variant={'body2'} fontWeight='400' mt={1} pb={3}>
                      Fill out the form below to request information.
                    </Typography>
                    <Flex flexDirection='column' gap={2}>
                      <InputField name='message' multiline={true} rows={5} label={'Message'} />
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <InputField name='firstNamMessagee' label={'First Name'} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <InputField name='lastName' label={'Last Name'} />
                        </Grid>
                      </Grid>
                      <InputField name='email' label={'Email'} />
                      <InputField name='phoneNumber' label={'Phone number'} />
                    </Flex>
                    <Box mt={4}>
                      <Box pb={2}>
                        <Typography variant={'caption'} fontWeight='400' >
                          By clicking 'Send', I agree to WeddingWire’s Privacy Policy and Terms of
                          use
                        </Typography>
                      </Box>
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
                            Send
                          </Typography>
                        )}
                      </Button>
                    </Box>
                  </Form>
                )
              }}
            </Formik>
          </Box>
        </Modal>
      </div>
    </StyledBox>
  )
}

export default BuyerRequest

export const StyledBox = styled(Box)(() => ({
  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
  padding: '1.5rem',
  borderRadius: '5px'
}))

export const CustomTag = styled(Box)(() => ({
  padding: '.5rem 1rem',
  color: '#666666',
  fontSize: '1rem',
  borderRadius: '5px',
  display: 'inline-block',
  background: '#19b5bc'
}))