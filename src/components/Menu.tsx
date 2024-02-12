import styled from '@emotion/styled'
import { Box, Grid, Menu, Typography } from '@mui/material'
import { useViewports } from 'helpers/viewports'
import React from 'react'
import { Centered, Flex } from './design'
import { StyledLink } from 'pages/Home'

interface subcategoriesProps {
  slug: string
  name: string
}
interface SimpleMenuProps {
  name: string
  img: string
  subcategories: subcategoriesProps[]
}

function SimpleMenu({ name, subcategories, img }: SimpleMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { isMobile } = useViewports()
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Box onClick={handleClick}>
        <StyledTypography variant='body1' fontWeight='500'>
          {name}
        </StyledTypography>
      </Box>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          marginTop: '10px'
        }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <Box
          sx={{
            width: isMobile ? '100%' : '100vw',
            padding: isMobile ? '1rem' : '2rem 1.5rem'
          }}
        >
          <Centered>
            <Grid container spacing={2}>
              <Grid item sm={12} md={4}>
                <Grid container spacing={2}>
                  {subcategories?.map(item => {
                    return (
                      <Grid item xs={12} md={6}>
                        <Flex
                          sx={{
                            alignItems: 'center'
                          }}
                        >
                          <Box
                            sx={{
                              padding: '4px',
                              background: '#000',
                              marginRight: '10px'
                            }}
                          />
                          <StyledLink to={`services/${item.slug}`} onClick={handleClose}>
                            <StyledTypography variant='body2'>{item.name}</StyledTypography>
                          </StyledLink>
                        </Flex>
                      </Grid>
                    )
                  })}
                </Grid>
              </Grid>
              {!isMobile && (
                <Grid item sm={12} md={4}>
                  <Centered mx={4}>
                    <StyledImg alt='no Img' src={img} />
                  </Centered>
                </Grid>
              )}
              {!isMobile && (
                <Grid item sm={12} md={4} px={2}>
                  <StyledBox>
                    <Flex alignItems='center' justifyContent='space-between'>
                      <Box pr={2}>
                        <Typography variant='body2' fontWeight='600'>
                          Destination Weddings
                        </Typography>
                        <Typography variant='caption' mt={1}>
                          Easily plan your international wedding.
                        </Typography>
                      </Box>
                      <StyledIcon src='https://www.weddingwire.com/assets/img/logos/square-icon-guest.svg' />
                    </Flex>
                  </StyledBox>
                  <StyledBox mt={4}>
                    <Flex alignItems='center' justifyContent='space-between'>
                      <Box pr={2}>
                        <Typography variant='body2' fontWeight='600'>
                          WeddingWire for Guests
                        </Typography>
                        <Typography variant='caption' mt={1}>
                          Share with your guests to collect your wedding photos{' '}
                        </Typography>
                      </Box>
                      <StyledIcon src='https://www.weddingwire.com/assets/img/logos/square-icon-guest.svg' />
                    </Flex>
                  </StyledBox>
                </Grid>
              )}
            </Grid>
          </Centered>
        </Box>
      </Menu>
    </div>
  )
}

export default SimpleMenu

const StyledImg = styled('img')(() => ({
  borderRadius: '5px',
  borderTopRightRadius: '5px',
  height: '200px',
  width: '50%'
}))

const StyledIcon = styled('img')(() => ({
  borderRadius: '5px',
  borderTopRightRadius: '5px',
  height: '50px',
  width: '50px'
}))

const StyledBox = styled(Box)(() => ({
  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
  padding: '1rem',
  width: '100%',
  borderRadius: '5px'
}))

const StyledTypography = styled(Typography)(() => ({
  '&:hover': {
    color: '#19b5bc'
  }
}))
