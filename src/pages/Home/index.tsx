import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
  styled
} from '@mui/material'
import { useViewports } from 'helpers/viewports'
import { useEffect, useState } from 'react'
import { getAllCategoriesApi } from 'api/userApi'
import { Centered, Flex } from 'components/design'
import { Link } from 'react-router-dom'

interface Category {
  name: string
  description: string
  icon: string
  slug: string
  parent: string
  id: string
}
const Home = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)

  const getCategories = async () => {
    setLoading(true)
    try {
      const response = await getAllCategoriesApi({ sub: true })
      setCategories(response.data.categories)
      console.log('getAllCategoriesApi', response)
    } catch (error) {
      /* empty */
    }
    setLoading(false)
  }

  useEffect(() => {
    getCategories()
  }, [])

  const { isLaptop } = useViewports()
  return (
    <Box>
      <Container maxWidth='lg'>
        <Grid container flexDirection={isLaptop ? 'row' : 'column-reverse'}>
          <Grid item xs={12} md={6}>
            <StyledBox isLaptop={isLaptop}>
              <Typography variant='h4' fontWeight='bold'>
                Let's find your wedding team
              </Typography>
              <Typography
                variant={isLaptop ? 'subtitle2' : 'body1'}
                my={2}
                fontWeight='400'
                maxWidth='450px'
                textAlign={isLaptop ? 'start' : 'center'}
              >
                Search over 250,000 local professionals with reviews, pricing, availability, and
                more
              </Typography>
            </StyledBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <ImageBackground isLaptop={isLaptop} />
          </Grid>
        </Grid>
      </Container>
      <BorderBox />
      <Container maxWidth='lg'>
        <Box>
          <Typography variant='h4' fontWeight='bold' mt={4}>
            Find every vendor you need
          </Typography>
          <Typography variant={isLaptop ? 'body1' : 'body2'} fontWeight='400' mt={2}>
            Connect with seasoned wedding pros to help bring your day to life.
          </Typography>
          {loading ? (
            <Centered mt={5}>
              <CircularProgress />
            </Centered>
          ) : (
            <Box pb={4}>
              <Grid container spacing={2} p={2} my={2}>
                {categories.map(item => {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} flex={1}>
                      <StyledLink to={`services/${item.slug}`}>
                        <CardBox>
                          <Box position='relative'>
                            <StyledImg src={item.icon} alt='card img' />
                          </Box>

                          <Typography variant='subtitle2' fontWeight='bold' mt={3} pb={2}>
                            {item.name}
                          </Typography>
                          <Typography
                            variant={isLaptop ? 'body2' : 'body1'}
                            color='secondary'
                            fontWeight='400'
                          >
                            {item.description}
                          </Typography>
                        </CardBox>
                      </StyledLink>
                    </Grid>
                  )
                })}
              </Grid>
              <Flex flexWrap='wrap'>
                {categories.map(item => (
                  <StyledLink to={`services/${item.slug}`}>
                    <CategoryBlocks variant='body2'>{item.name}</CategoryBlocks>
                  </StyledLink>
                ))}
                <StyledLink to={`services/all`}>
                  <CategoryBlocks variant='body2'>View All</CategoryBlocks>
                </StyledLink>
              </Flex>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default Home

const ImageBackground = styled('img')(({ isLaptop }: { isLaptop: boolean }) => ({
  backgroundImage: 'url(https://wallpapercave.com/wp/wp7488460.jpg)',
  height: !isLaptop ? '200px' : '400px',
  position: 'relative',

  width: !isLaptop ? '100%' : '49.5vw',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  clipPath: !isLaptop
    ? 'polygon(0 0, 100% 0%, 100% 85%, 0% 100%)'
    : 'polygon(10% 0, 100% 0%, 100% 100%, 0% 100%)'
}))

export const CardBox = styled(Box)(() => ({
  padding: '.8rem',
  border: '1px solid #fff',
  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
  borderRadius: '5px',
  height: '100%',
  cursor: 'pointer'
}))

export const StyledImg = styled('img')(() => ({
  height: '200px',
  width: '100%',
  borderRadius: '5px'
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

const CategoryBlocks = styled(Typography)(() => ({
  border: '1px solid black',
  borderRadius: '5px',
  padding: '10px 20px',
  margin: '1rem .5rem 0rem .5rem',
  display: 'inline-block',
  cursor: 'pointer'
}))

export const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  color: '#000'
}))
