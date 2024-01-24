import { Box, Container, Grid } from '@mui/material'
import BuyerRequest from 'components/BuyerRequest'

const ViewJobs = () => {
  return (
    <Container maxWidth='lg'>
      <Box pt={5} minHeight='calc(100vh - 100px)'>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} md={6}>
            <BuyerRequest />
          </Grid>
          <Grid item xs={12} md={6}>
            <BuyerRequest />
          </Grid>
          <Grid item xs={12} md={6}>
            <BuyerRequest />
          </Grid>
          <Grid item xs={12} md={6}>
            <BuyerRequest />
          </Grid>
          <Grid item xs={12} md={6}>
            <BuyerRequest />
          </Grid>
          <Grid item xs={12} md={6}>
            <BuyerRequest />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default ViewJobs
