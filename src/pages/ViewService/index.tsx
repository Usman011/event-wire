import { Box, CircularProgress, Container, Grid, Typography, styled } from '@mui/material'
import { Centered } from 'components/design'
import { useViewports } from 'helpers/viewports'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { ServiceProps } from 'pages/ServiceList'

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
  const { isLaptop } = useViewports()
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
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  const handleClick = async () => {}

  const getServiceDetail = async () => {
    setLoading(true)
    try {
      // const response = await getServiceDetailApi(id)
      // setProperty(response.data)
      setServices(demoServiceData)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    getServiceDetail()
  }, [])

  return (
    <Box minHeight='calc(100vh - 280px)'>
      {loading ? (
        <Centered marginTop='5rem'>
          <CircularProgress />
        </Centered>
      ) : (
        <Container maxWidth='lg'>
          <Grid container spacing={2} my={4}>
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
          <Grid container spacing={2} my={1}>
            <Grid item xs={12} md={8}>
              <Typography variant='h3' py={1} fontWeight='bold' color='#00458c'>
                {services.title}
              </Typography>
              <Typography variant='body1' fontWeight='400' pb={3}>
                {services.location}
              </Typography>
              <Typography variant='body1' fontWeight='400' pb={3}>
                {services.description}
              </Typography>
              ## Modify Accordingly
              {/* <LocationTab /> */}
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledBox>
                <Typography variant='h6' py={1} fontWeight='bold' color='#00458c'>
                  {services.title}
                </Typography>

                <Typography variant='body2' fontWeight='400' pb={3}>
                  {services.location}
                </Typography>

                <Centered justifyContent='space-between' py={1}>
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

                <Centered justifyContent='space-between' py={1}>
                  <Typography variant='body1' fontWeight='600'>
                    Availability:
                  </Typography>

                  <Typography variant='body1' fontWeight='400'>
                    Contact for Availability
                  </Typography>
                </Centered>
              </StyledBox>
            </Grid>
          </Grid>
        </Container>
      )}
    </Box>
  )
}

export default ViewService

const StyledImg = styled('img')(() => ({
  width: '100%'
}))

const StyledBox = styled(Box)(() => ({
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  padding: '2rem',
  borderRadius: '5px',
  maxWidth: '450px',
  width: '100%',
  marginBottom: '2rem'
}))
