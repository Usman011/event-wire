import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material'
import ItemCard from 'components/ItemCrad'
import { Centered, Flex } from 'components/design'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import SearchIcon from '@mui/icons-material/Search'
import styled from '@emotion/styled'
import { useViewports } from 'helpers/viewports'
import { Link } from 'react-router-dom'

interface ServiceImages {
  img1: string
  img2: string
  img3: string
  img4?: string
  img5?: string
}
export interface ServiceProps {
  id: number | string
  title: string
  location: string
  description: string
  phone: string
  email: string
  images: ServiceImages
}

const demoServiceData: ServiceProps[] = [
  {
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
  },
  {
    id: 2,
    title: 'Art Exhibition',
    location: 'Art Gallery',
    description: 'Showcasing diverse artworks from local artists.',
    phone: '+1 (987) 654-3210',
    email: 'alice.smith@example.com',
    images: {
      img1: 'https://source.unsplash.com/random/200x200?sig=6',
      img2: 'https://source.unsplash.com/random/200x200?sig=7',
      img3: 'https://source.unsplash.com/random/200x200?sig=8'
    }
  },
  {
    id: 3,
    title: 'Startup Pitch Night',
    location: 'Co-working Space',
    description: 'Entrepreneurs pitch their innovative startup ideas.',
    phone: '+1 (555) 123-4567',
    email: 'ryan.patel@example.com',
    images: {
      img1: 'https://source.unsplash.com/random/200x200?sig=9',
      img2: 'https://source.unsplash.com/random/200x200?sig=10',
      img3: 'https://source.unsplash.com/random/200x200?sig=11'
    }
  },
  {
    id: 4,
    title: 'Science Symposium',
    location: 'Research Institute',
    description: 'Discover breakthroughs in scientific research.',
    phone: '+1 (111) 222-3333',
    email: 'emma.johnson@example.com',
    images: {
      img1: 'https://source.unsplash.com/random/200x200?sig=12',
      img2: 'https://source.unsplash.com/random/200x200?sig=13',
      img3: 'https://source.unsplash.com/random/200x200?sig=14'
    }
  },
  {
    id: 5,
    title: 'Community Volunteer Day',
    location: 'Community Park',
    description: 'Join us for a day of community service and teamwork.',
    phone: '+1 (999) 888-7777',
    email: 'sarah.thompson@example.com',
    images: {
      img1: 'https://source.unsplash.com/random/200x200?sig=15',
      img2: 'https://source.unsplash.com/random/200x200?sig=16',
      img3: 'https://source.unsplash.com/random/200x200?sig=17'
    }
  },
  {
    id: 6,
    title: 'Art Exhibition',
    location: 'Art Gallery',
    description: 'Showcasing diverse artworks from local artists.',
    phone: '+1 (987) 654-3210',
    email: 'alice.smith@example.com',
    images: {
      img1: 'https://source.unsplash.com/random/200x200?sig=6',
      img2: 'https://source.unsplash.com/random/200x200?sig=7',
      img3: 'https://source.unsplash.com/random/200x200?sig=8'
    }
  },
  {
    id: 7,
    title: 'Startup Pitch Night',
    location: 'Co-working Space',
    description: 'Entrepreneurs pitch their innovative startup ideas.',
    phone: '+1 (555) 123-4567',
    email: 'ryan.patel@example.com',
    images: {
      img1: 'https://source.unsplash.com/random/200x200?sig=9',
      img2: 'https://source.unsplash.com/random/200x200?sig=10',
      img3: 'https://source.unsplash.com/random/200x200?sig=11'
    }
  },
  {
    id: 8,
    title: 'Science Symposium',
    location: 'Research Institute',
    description: 'Discover breakthroughs in scientific research.',
    phone: '+1 (111) 222-3333',
    email: 'emma.johnson@example.com',
    images: {
      img1: 'https://source.unsplash.com/random/200x200?sig=12',
      img2: 'https://source.unsplash.com/random/200x200?sig=13',
      img3: 'https://source.unsplash.com/random/200x200?sig=14'
    }
  },
  {
    id: 9,
    title: 'Community Volunteer Day',
    location: 'Community Park',
    description: 'Join us for a day of community service and teamwork.',
    phone: '+1 (999) 888-7777',
    email: 'sarah.thompson@example.com',
    images: {
      img1: 'https://source.unsplash.com/random/200x200?sig=15',
      img2: 'https://source.unsplash.com/random/200x200?sig=16',
      img3: 'https://source.unsplash.com/random/200x200?sig=17'
    }
  }
]

const ServiceList = () => {
  const [services, setServices] = useState<ServiceProps[]>([])
  const [loading, setLoading] = useState(false)

  const { id } = useParams()

  const getAllEvents = async () => {
    try {
      // const response = await getAllServicesByCategoryApi()
      // setProperties(response.data)
      setServices(demoServiceData)
      // console.log('response', response)
    } catch (error) {
      // console.log('error', error)
    }
  }

  const { isLaptop } = useViewports()

  useEffect(() => {
    getAllEvents()
  }, [])

  return (
    <Container maxWidth='lg'>
      <Grid container flexDirection={isLaptop ? 'row' : 'column-reverse'}>
        <Grid item xs={12} md={6}>
          <StyledBox isLaptop={isLaptop}>
            <Breadcrumbs aria-label='breadcrumb'>
              <Typography variant='body2' fontWeight='bold'>
                Weddings
              </Typography>
              <Typography variant='body2' fontWeight='bold'>
                Wedding Venues
              </Typography>
            </Breadcrumbs>
            <Typography variant='h3' fontWeight='bold' pt={2}>
              Greece Wedding Venues
            </Typography>

            <TextField
              sx={{
                marginTop: '1rem'
              }}
              variant='outlined'
              label='Search here.'
              InputProps={{
                endAdornment: (
                  <IconButton size='large'>
                    <SearchIcon />
                  </IconButton>
                )
              }}
            />
          </StyledBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <ImageBackground isLaptop={isLaptop} />
        </Grid>
      </Grid>
      {/* <BorderBox /> */}
      <Box mb={5}>
        <Grid container alignItems='center' mt={3}>
          <Grid item xs={12} md={6}>
            <Typography variant='subtitle1' fontWeight='600'>
              My Services
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} alignItems='center'>
            <Flex justifyContent='flex-end'>
              <TextField
                variant='outlined'
                label='Search Services here.'
                InputProps={{
                  endAdornment: (
                    <IconButton size='large'>
                      <SearchIcon />
                    </IconButton>
                  )
                }}
              />
            </Flex>
          </Grid>
        </Grid>
        {loading ? (
          <Centered mt={5}>
            <CircularProgress />
          </Centered>
        ) : (
          <Grid container spacing={3} mt={1}>
            {services.map(item => {
              return <ItemCard category={item} />
            })}
          </Grid>
        )}
      </Box>
    </Container>
  )
}

export default ServiceList

const ImageBackground = styled('img')(({ isLaptop }: { isLaptop: boolean }) => ({
  backgroundImage:
    'url(https://cdn0.weddingwire.com/vendor/125394/original/960/jpeg/image_51_493521-168087040726835.webp)',
  height: !isLaptop ? '200px' : '300px',
  position: 'relative',
  width: !isLaptop ? '100%' : '49.5vw',
  backgroundRepeat: 'no-repeat',
  clipPath: !isLaptop
  ? 'polygon(0 0, 100% 0%, 100% 85%, 0% 100%)'
  : 'polygon(10% 0, 100% 0%, 100% 100%, 0% 100%)',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}))

const StyledBox = styled(Box)(({ isLaptop }: { isLaptop: boolean }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: isLaptop ? 'flex-start' : 'center',
  marginTop: isLaptop ? '0px' : '0px'
}))

const BorderBox = styled(Divider)(() => ({
  position: 'relative',
  top: '-6.5px'
}))
