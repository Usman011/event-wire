import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { Centered } from 'components/design'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
// import { getAllServicesByCategoryApi } from 'api/userApi'

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
  }
]

const ServiceList = () => {
  const navigate = useNavigate()
  const [services, setServices] = useState<ServiceProps[]>([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  const handleClick = (item: ServiceProps) => {
    navigate(`/view-service/${item.id}`)
  }

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

  useEffect(() => {
    getAllEvents()
  }, [])

  return (
    <Container maxWidth='lg'>
      <Box mb={5}>
        {/* <Flex justifyContent='space-between'>
            <Flex alignItems='center'>
              <Typography variant='subtitle1' color='primary'></Typography>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Type</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Type'
                  value={gender}
                  onChange={handleGenderChange}
                >
                  <MenuItem value='male'>Residential</MenuItem>
                  <MenuItem value='female'>Commercial</MenuItem>
                  <MenuItem value='both'>Both</MenuItem>
                </Select>
              </FormControl>
            </Flex>
            <Box>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Limit</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={limit}
                  label='Limit'
                  onChange={handleLimitChange}
                >
                  <MenuItem value='4'>4</MenuItem>
                  <MenuItem value='8'>8</MenuItem>
                  <MenuItem value='12'>12</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Flex> */}

        <Typography variant='subtitle1' fontWeight='600' mt={4}>
          {`${id} - 80 - Result Found `}
        </Typography>
        <Grid container spacing={3} mt={1}>
          {services &&
            services.map(item => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id} flex={1}>
                <CardBox>
                  <Centered>
                    <StyledImg src={item.images.img1} alt='profile img' />
                  </Centered>

                  <Typography variant='subtitle1' pt={1} fontWeight='bold'>
                    {item.title}
                  </Typography>

                  <Typography variant='body2' fontWeight='400' color='primary'>
                    {item.location}
                  </Typography>

                  <Typography variant='body2' fontWeight='400' py={2}>
                    {item.description}
                  </Typography>

                  <Button
                    variant='outlined'
                    color='primary'
                    fullWidth
                    onClick={() => handleClick(item)}
                  >
                    View More
                  </Button>
                </CardBox>
              </Grid>
            ))}
        </Grid>

        {/* <Flex justifyContent='space-between' my={4}>
            <PaginationButton
              currentPage={currentPage}
              onChange={handleChange}
            />
          </Flex> */}
      </Box>
    </Container>
  )
}

export default ServiceList

export const CardBox = styled(Box)(() => ({
  display: 'grid',
  alignItems: 'center',
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
  padding: '.8rem',
  border: '1px solid #fff',
  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
  height: '100%',
  flex: 1
}))

export const StyledImg = styled('img')(() => ({
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
  height: '200px',
  width: '100%'
}))
