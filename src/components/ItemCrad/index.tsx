import styled from '@emotion/styled'
import { Box, Button, Grid, Typography } from '@mui/material'
import { Flex } from 'components/design'
import { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useNavigate } from 'react-router'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import { ServiceProps } from 'components/PopularServices'

const ItemCard = ({ category }: { category: ServiceProps }) => {
  const [isFav, setIsFav] = useState(false)
  const navigate = useNavigate()

  const handleClick = (item: ServiceProps) => {
    navigate(`/view-service/${item.id}`)
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={category.id} flex={1}>
      <CardBox>
        <Box position='relative'>
          <StyledImg src={category.images.img1} alt='profile img' />
          <Box position='absolute' top={10} right={10} onClick={() => setIsFav(!isFav)}>
            <FavoriteIcon
              sx={{ color: isFav ? 'red' : 'grey', fontSize: '35px', cursor: 'pointer' }}
            />
          </Box>
          <Box position='absolute' top={10} left={10} onClick={() => setIsFav(!isFav)}>
            <LocalFireDepartmentIcon sx={{ color: 'orange', fontSize: '35px' }} />
          </Box>
        </Box>

        <Typography variant='subtitle1' pt={1} fontWeight='bold'>
          {category.title}
        </Typography>

        <Typography variant='body2' fontWeight='400' color='primary'>
          {category.location}
        </Typography>

        <Typography variant='body2' fontWeight='400' py={2}>
          {category.description}
        </Typography>

        <Button variant='outlined' color='primary' fullWidth onClick={() => handleClick(category)}>
          View More
        </Button>
      </CardBox>
    </Grid>
  )
}

export default ItemCard

const CardBox = styled(Box)(() => ({
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

const StyledImg = styled('img')(() => ({
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
  height: '200px',
  width: '100%'
}))
