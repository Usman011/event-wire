import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Modal,
  Rating,
  Typography,
  styled
} from '@mui/material'
import { Centered, Flex } from 'components/design'
import { useViewports } from 'helpers/viewports'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { AuthState } from 'store/auth'
import { RootState } from 'store'
import { useSelector } from 'react-redux'
import { ServiceProps } from 'components/PopularServices'
import BoltIcon from '@mui/icons-material/Bolt'
import { Form } from 'react-router-dom'
import { Formik } from 'formik'
import { InputField } from 'components/InputField'
import * as Yup from 'yup'
import LocationTab from 'components/Location'

const demoServiceData: ServiceProps = {
  id: 1,
  title: 'Tech Conference',
  location: 'Convention Center',
  description: 'Explore the latest trends in technology.',
  phone: '+1 (123) 456-7890',
  email: 'john.doe@example.com',
  images: {
    img1: 'https://source.unsplash.com/random/200x200?sig=1',
    img2: 'https://source.unsplash.com/random/200x200?sig=2',
    img3: 'https://source.unsplash.com/random/200x200?sig=3',
    img4: 'https://source.unsplash.com/random/200x200?sig=4',
    img5: 'https://source.unsplash.com/random/200x200?sig=5'
  }
}
const ViewService = () => {
  const auth = useSelector<RootState, AuthState>(state => state.auth)
  const { isLaptop } = useViewports()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const [services, setServices] = useState<ServiceProps>({
    id: '',
    title: '',
    location: '',
    description: '',
    phone: '',
    email: '',
    images: {
      img1: '',
      img2: '',
      img3: ''
    }
  })

  const getServiceDetail = async () => {
    setLoading(true)
    try {
      // const response = await getServiceDetailApi(id)
      // setProperty(response.data)
      setServices(demoServiceData)
    } catch (error) {
      // console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    getServiceDetail()
  }, [])

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

  const handleSubmit = async () => {}

  return (
    <Box minHeight='calc(100vh - 280px)'>
      {loading ? (
        <Centered marginTop='5rem'>
          <CircularProgress />
        </Centered>
      ) : (
        <Container maxWidth='lg'>
          <Grid container spacing={2} my={5}>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <StyledImg src={services.images.img1} height={!isLaptop ? 350 : 500} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container columnSpacing={2} rowSpacing={1}>
                    <Grid item xs={12} md={services.images.img5 || services.images.img4 ? 6 : 12}>
                      <StyledImg src={services.images.img2} height={!isLaptop ? 350 : 243} />
                    </Grid>
                    <Grid item xs={12} md={services.images.img5 || services.images.img4 ? 6 : 12}>
                      <StyledImg src={services.images.img3} height={!isLaptop ? 350 : 243} />
                    </Grid>
                    {services.images.img4 && (
                      <Grid item xs={12} md={services.images.img5 ? 6 : 12}>
                        <StyledImg src={services.images.img4} height={!isLaptop ? 350 : 243} />
                      </Grid>
                    )}
                    {services.images.img5 && (
                      <Grid item xs={12} md={services.images.img4 ? 6 : 12}>
                        <StyledImg src={services.images.img5} height={!isLaptop ? 350 : 243} />
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4} flex={1}>
              <StyledBox>
                <Typography variant='h4' py={1} fontWeight='bold' color='#00458c'>
                  {services.title}
                </Typography>

                {/* <Rating
                    name='simple-controlled'
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue)
                    }}
                  /> */}

                <Rating name='read-only' value={3} readOnly />

                <Centered justifyContent='space-between' pt={4}>
                  <Typography variant='body1' fontWeight='600'>
                    Phone Number:
                  </Typography>

                  <Typography variant='body1' fontWeight='400'>
                    {services.phone}
                  </Typography>
                </Centered>
                <Centered justifyContent='space-between' py={1}>
                  <Typography variant='body1' fontWeight='600'>
                    Email:
                  </Typography>

                  <Typography variant='body1' fontWeight='400'>
                    {services.email}
                  </Typography>
                </Centered>

                <Centered justifyContent='space-between' py={1} pb={5}>
                  <Typography variant='body1' fontWeight='600'>
                    Availability:
                  </Typography>

                  <Typography variant='body1' fontWeight='400'>
                    Contact for Availability
                  </Typography>
                </Centered>

                <Button variant='contained' color='primary' fullWidth onClick={handleOpen}>
                  <Typography variant='body1' color='#fff' py={2} fontWeight='400'>
                    Request Pricing
                  </Typography>
                </Button>
                <Centered pt={2}>
                  <Flex>
                    <Typography variant='caption' fontWeight='400'>
                      Responds within 24 hours
                    </Typography>
                    <BoltIcon color='warning' />
                  </Flex>
                </Centered>
              </StyledBox>
            </Grid>
          </Grid>
          <Grid container spacing={4} my={1}>
            <Grid item xs={12} md={8}>
              <Typography variant='h3' py={1} fontWeight='bold' color='#00458c'>
                {services.title}
              </Typography>

              <Typography variant='body1' fontWeight='400' pb={3}>
                {services.description}
              </Typography>
              <Typography variant='body2' color='#999' fontWeight='400' pb={2}>
                {` ${services.title} is a stunning mansion event space located in Santorini,
                Greece. This property provides couples with the opportunity to wed in a dreamy
                seaside setting. With panoramic views of Santorini's mysterious caldera, the
                stunning volcano, and the dazzling blue Aegean Sea, this property is the ideal venue
                for an unforgettable destination wedding.`}
              </Typography>
              <Typography variant='body1' color='#000' fontWeight='700' pb={2}>
                Facilities
              </Typography>
              <Typography variant='body2' color='#999' fontWeight='400' pb={2}>
                {` ${services.title}  provides guests with a number of picture-perfect gathering
                spaces. You will be welcome to exchange your vows in front of your loved ones under
                a beautiful arch surrounded by candles and flowers as the sun sets on the beach. The
                seaside event space can accommodate up to 100 guests seated for your ceremony and
                for your reception. The space also features a large dance floor, perfect for those
                looking to dance the night away. Situated right next to the venue, the Diamond Rock
                Villa is waiting to host the newlyweds and some guests for an overnight stay. Its
                stylish and contemporary interiors include three elegantly appointed bedrooms, two
                luxurious bathrooms, a fully-equipped colorful kitchen, and tastefully furnished
                living and dining rooms. Here, you can enjoy the marvelous view from the terrace or
                relax with a cocktail in the heated jacuzzi or by the pool.`}
              </Typography>
              <Typography variant='body1' color='#000' fontWeight='700' pb={2}>
                Capacity
              </Typography>
              <Typography variant='body2' color='#999' fontWeight='400' pb={2}>
                {` ${services.title}  provides guests with a number of picture-perfect gathering
                spaces. You will be welcome to exchange your vows in front of your loved ones under
                a beautiful arch surrounded by candles and flowers as the sun sets on the beach. The
                seaside event space can accommodate up to 100 guests seated for your ceremony and
                for your reception. The space also features a large dance floor, perfect for those
                looking to dance the night away. Situated right next to the venue, the Diamond Rock
                Villa is waiting to host the newlyweds and some guests for an overnight stay. Its
                stylish and contemporary interiors include three elegantly appointed bedrooms, two
                luxurious bathrooms, a fully-equipped colorful kitchen, and tastefully furnished
                living and dining rooms. Here, you can enjoy the marvelous view from the terrace or
                relax with a cocktail in the heated jacuzzi or by the pool.`}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <LocationTab />
            </Grid>
          </Grid>
        </Container>
      )}

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
                        <Typography variant={'caption'} fontWeight='400'>
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
    </Box>
  )
}

export default ViewService

const StyledImg = styled('img')(() => ({
  width: '100%'
}))

const StyledBox = styled(Box)(() => ({
  // bo xShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  // background: 'red',
  borderRadius: '5px',
  width: '100%',
  height: '100%',
  padding: '0rem 2rem 2rem 2rem'
  // marginBottom: '2rem'
}))
