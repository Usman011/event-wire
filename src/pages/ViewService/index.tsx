import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Modal,
  Rating,
  TextField,
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
import BoltIcon from '@mui/icons-material/Bolt'
import { Form } from 'react-router-dom'
import { Formik } from 'formik'
import { InputField } from 'components/InputField'
import * as Yup from 'yup'
import LocationTab from 'components/Location'
import * as API from 'api/userApi'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const ViewService = () => {
  const auth = useSelector<RootState, AuthState>(state => state.auth)
  const { isLaptop } = useViewports()
  const [open, setOpen] = useState(false)
  const [openReview, setOpenReview] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setOpenReview(false)
  }
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const [services, setServices] = useState<any>({
    name: '',
    description: '',
    images: [],
    category: {
      name: '',
      description: '',
      icon: '',
      slug: '',
      parent: '',
      id: ''
    },
    faqs: [
      {
        question: 'How many seats does your venue accommodate?',
        answer:
          ': Our versatile space is perfect for a variety of events, including weddings, anniversaries, corporate gatherings, parties, and more. We cater to your specific needs to ensure your event is a success.'
      },
      {
        question: 'What types of events can be hosted at your venue?',
        answer:
          ': Our versatile space is perfect for a variety of events, including weddings, anniversaries, corporate gatherings, parties, and more. We cater to your specific needs to ensure your event is a success.'
      }
    ],
    rating: 0
  })

  const getServiceDetail = async () => {
    setLoading(true)
    try {
      const response = await API.getServiceDetail(params.id)
      const service = response.data.service
      console.log(service)
      setServices(response.data.service)
    } catch (error) {
      // console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    getServiceDetail()
  }, [params])

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

  const reviewStyle = {
    width: '100%',
    bgcolor: 'background.paper',
    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
    p: 4,
    borderRadius: '5px'
  }

  const reviews = [
    'Hey there! We love your work and are interested in learning more about your services for our wedding',
    'Hey there! We love your work and are interested in learning more about your services for our wedding',
    'Hey there! We love your work and are interested in learning more about your services for our wedding',
    'Hey there! We love your work and are interested in learning more about your services for our wedding'
  ]

  const initialValues = {
    message:
      'Hey there! We love your work and are interested in learning more about your services for our wedding.',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  }

  const [comment, setComment] = useState('')
  const [reviewValue, setReviewValue] = useState(0)

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required.')
  })

  const handleSubmit = async () => {}
  const submitReview = () => {}
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
                  <StyledImg src={services.images[0] || ''} height={!isLaptop ? 350 : 500} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container columnSpacing={2} rowSpacing={1}>
                    <Grid item xs={12} md={services?.images[4] || services?.images[3] ? 6 : 12}>
                      <StyledImg src={services?.images[1]} height={!isLaptop ? 350 : 243} />
                    </Grid>
                    <Grid item xs={12} md={services?.images[4] || services?.images[3] ? 6 : 12}>
                      <StyledImg src={services?.images[2]} height={!isLaptop ? 350 : 243} />
                    </Grid>
                    {services?.images[3] && (
                      <Grid item xs={12} md={services?.images[4] ? 6 : 12}>
                        <StyledImg src={services?.images[3]} height={!isLaptop ? 350 : 243} />
                      </Grid>
                    )}
                    {services?.images[4] && (
                      <Grid item xs={12} md={services?.images[3] ? 6 : 12}>
                        <StyledImg src={services?.images[4]} height={!isLaptop ? 350 : 243} />
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4} flex={1}>
              <StyledBox>
                <Typography variant='h4' py={1} fontWeight='bold' color='#00458c'>
                  {services?.name}
                </Typography>

                <Flex justifyContent='space-between' alignItems='center'>
                  <Flex alignItems='center' gap={1}>
                    <Rating name='read-only' value={3} readOnly />
                    <Typography variant='subtitle1' fontWeight='bold' color='#666'>
                      ( 50 )
                    </Typography>
                  </Flex>
                  <Typography
                    sx={{ cursor: 'pointer' }}
                    variant='body2'
                    color='primary'
                    fontWeight='600'
                    onClick={() => setOpenReview(true)}
                  >
                    Add Review
                  </Typography>
                </Flex>

                <Centered justifyContent='space-between' pt={4}>
                  <Typography variant='body1' fontWeight='600'>
                    Phone Number:
                  </Typography>

                  <Typography variant='body1' fontWeight='400'>
                    {services?.createdBy?.phone || 'No Number provided yet'}
                  </Typography>
                </Centered>
                <Centered justifyContent='space-between' py={1}>
                  <Typography variant='body1' fontWeight='600'>
                    Email:
                  </Typography>

                  <Typography variant='body1' fontWeight='400'>
                    {services?.createdBy?.email}
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
                {services?.name}
              </Typography>

              <Typography variant='body1' fontWeight='400' pb={3}>
                {services?.description}
              </Typography>
              <Typography variant='body2' color='#999' fontWeight='400' pb={2}>
                {` ${services?.name} is a stunning mansion event space located in Santorini,
                Greece. This property provides couples with the opportunity to wed in a dreamy
                seaside setting. With panoramic views of Santorini's mysterious caldera, the
                stunning volcano, and the dazzling blue Aegean Sea, this property is the ideal venue
                for an unforgettable destination wedding.`}
              </Typography>
              <Typography variant='body1' color='#000' fontWeight='700' pb={2}>
                Facilities
              </Typography>
              <Typography variant='body2' color='#999' fontWeight='400' pb={2}>
                {` ${services?.name}  provides guests with a number of picture-perfect gathering
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
                {` ${services?.name}  provides guests with a number of picture-perfect gathering
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
              {services?.location && <LocationTab location={services.location} />}
            </Grid>
          </Grid>
          {services?.faqs &&
            services.faqs.map((item: any) => {
              return (
                <Box>
                  <Typography variant={'body1'} fontWeight='bold' py={2}>
                    {item.question}
                  </Typography>
                  <Typography variant={'body2'}>{item.answer}</Typography>
                </Box>
              )
            })}

          <Grid container spacing={2} mt={4}>
            {reviews.map((item, index) => {
              return (
                <Grid item xs={12} md={6}>
                  <Box sx={reviewStyle} alignItems='center' justifyContent='space-between' gap={2}>
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
                          20 Dec 2024, 11:56
                        </Typography>
                      </Box>
                    </Flex>
                    <Box>
                      <Rating
                        name='read-only'
                        value={index + 2}
                        readOnly
                        sx={{
                          padding: '1rem 0rem'
                        }}
                      />
                    </Box>
                    <Typography variant='body1' fontWeight='500' color='#666' textAlign='left'>
                      {item}
                    </Typography>
                  </Box>
                </Grid>
              )
            })}
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
      <div>
        <Modal
          open={openReview}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography variant={'subtitle1'} fontWeight='700' my={1}>
              Add Review
            </Typography>
            <Typography variant={'body2'} fontWeight='400' mt={1} pb={3}>
              Fill out the form below to add review.
            </Typography>
            <Flex pb={3} alignItems='center' gap={2}>
              <Rating
                name='simple-controlled'
                value={reviewValue}
                onChange={(event, newValue) => {
                  setReviewValue(newValue)
                }}
              />
              <Typography variant='subtitle1' fontWeight='bold' color='#666'>
                {`( ${reviewValue} )`}
              </Typography>
            </Flex>
            <Flex flexDirection='column' gap={2}>
              <TextField
                name='comment'
                multiline={true}
                rows={5}
                label={'comment'}
                onChange={e => setComment(e.target.value)}
              />
            </Flex>
            <Box mt={4}>
              <Box pb={2}>
                <Typography variant={'caption'} fontWeight='400'>
                  By clicking 'Send', I agree to WeddingWire’s Privacy Policy and Terms of use
                </Typography>
              </Box>
              <Button fullWidth size='large' variant='contained' onClick={submitReview}>
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
