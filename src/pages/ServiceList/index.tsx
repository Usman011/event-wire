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
import * as API from 'api/userApi'

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

const ServiceList = () => {
  const [services, setServices] = useState<ServiceProps[]>([])
  const [loading, setLoading] = useState(false)

  const params = useParams()

  const getAllEvents = async () => {
    try {
      setLoading(true)
      const response = await API.getQueryServices(params.id)
      const services = response.data.services.results
      setServices(services)
    } catch (error) {
      // console.log('error', error)
    }
    setLoading(false)
  }

  const { isLaptop } = useViewports()

  useEffect(() => {
    getAllEvents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

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
