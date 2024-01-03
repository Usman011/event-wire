import { Box, Divider, Stack } from '@mui/material'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Centered } from './design'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import EmailIcon from '@mui/icons-material/Email'

const Footer = () => {
  return (
    <Box mt={5} maxWidth='100vw'>
      <Divider />
      <Box pt={3}>
        <Container component='footer' maxWidth='lg'>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant='h6' fontWeight='bold'>
                WeddingWire
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} textAlign='right' justifyContent='space-between'>
              <Centered justifyContent='flex-end'>
                <Stack
                  direction='row'
                  divider={<Divider orientation='vertical' flexItem />}
                  spacing={2}
                >
                  <FacebookIcon />

                  <GitHubIcon />
                  <LinkedInIcon />

                  <EmailIcon />
                </Stack>
              </Centered>
            </Grid>
          </Grid>
          <Typography variant='body1' textAlign='center' mb={4}>
            © 2006 - 2024 The Knot Worldwide Inc.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default Footer
