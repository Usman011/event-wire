import { Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { getAllCategoriesWithSubApi } from 'api/userApi'
import { InputField } from 'components/InputField'
import { SelectField } from 'components/SelectField'
import { Centered, Flex } from 'components/design'
import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import { Form } from 'react-router-dom'
import * as Yup from 'yup'
import { createJobApi } from 'api/userApi'

export interface CreateJobProps {
  title: string
  description: string
  priceFrom: number
  priceTo: number
  category: string
  address: string
}

const CreateJob = () => {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])

  const initialValues: CreateJobProps = {
    title: '',
    description: '',
    priceFrom: 0,
    priceTo: 0,
    category: '',
    address: ''
  }

  const jobValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title must required.'),
    description: Yup.string().required('Description must required.'),
    category: Yup.string().required('Category must required.'),
    priceFrom: Yup.number().required('Min Price required.'),
    priceTo: Yup.number().required('Max Price required.'),
    address: Yup.string().required('Address must required.')
  })

  const handleSubmit = async (values: CreateJobProps) => {
    setLoading(true)
    try {
      const response = await createJobApi({
        title: values.title,
        description: values.description,
        category: values.category,
        minPrice: values.priceFrom,
        maxPrice: values.priceTo,
        address: values.address
      })
    } catch (err) {}
    setLoading(false)
  }

  const getCategories = async () => {
    try {
      const response = await getAllCategoriesWithSubApi()
      const options = response.data.categories.map((item: any) => {
        return { title: item.category.name, key: item.category.id }
      })
      setCategories(options)

      console.log('response', response)
    } catch (error) {
      /* empty */
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <Container maxWidth='md'>
      <Centered py={5} minHeight='calc(100vh - 100px)'>
        <StyledBox maxWidth={'500px'} width='100%'>
          <Grid container>
            <Grid item xs={12}>
              <Centered pt={3}>
                <Box p={4} maxWidth='450px' width='100%'>
                  <Typography
                    variant='h4'
                    color='primary'
                    fontWeight='bold'
                    textAlign='center'
                    pb={5}
                  >
                    Lets Post a Job!
                  </Typography>

                  <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={jobValidationSchema}
                  >
                    {({ submitForm, errors }) => {
                      console.log(errors)
                      return (
                        <Form>
                          <Flex flexDirection='column' gap={2}>
                            <InputField name='title' label={'Title'} />
                            <InputField name='description' label={'Description'} />
                            <SelectField name='category' label='Category' options={categories} />
                            <InputField name='priceFrom' type='number' label={'Starting Price'} />
                            <InputField
                              name='priceTo'
                              type='number'
                              label={'Maximum Price Limit'}
                            />
                            <InputField name='address' label={'address'} />
                          </Flex>
                          <Box mt={4}>
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
                                  Create Job
                                </Typography>
                              )}
                            </Button>
                          </Box>
                        </Form>
                      )
                    }}
                  </Formik>
                </Box>
              </Centered>
            </Grid>
          </Grid>
        </StyledBox>
      </Centered>
    </Container>
  )
}

export default CreateJob

const StyledBox = styled(Box)(() => ({
  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  paddingBottom: '3rem'
}))
