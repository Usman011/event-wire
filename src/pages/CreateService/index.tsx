import { Box, Button, CircularProgress, Container,  Grid,  Typography } from '@mui/material'
import { styled } from '@mui/system'
import { getAllCategoriesApi } from 'api/userApi'
import { InputField } from 'components/InputField'
import { SelectField } from 'components/SelectField'
import { Centered, Flex } from 'components/design'
import {  Formik } from 'formik'
import { useEffect, useState } from 'react'
import { Form } from 'react-router-dom'
import { usePlacesWidget } from 'react-google-autocomplete'
import * as Yup from 'yup'

export interface CreateServiceProps {
  password: string
  email: string
}

interface Category {
  name: string
  description: string
  icon: string
  slug: string
  parent: string
  id: string
}

const CreateService = () => {

  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [catLoading, setCatLoading] = useState(false)
  const initialValues: CreateServiceProps = {
    password: '',
    email: ''
  }

  const CreateServiceValidationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required.')
  })


  const getCategories = async () => {
    setCatLoading(true)
    try {
      const response = await getAllCategoriesApi({ sub: true })
      const data = response.data.categories.map((item: Category) => {
        return { title: item.name, key: item.id }
      })
      setCategories(data)
      console.log('getAllCategoriesApi', response)
    } catch (error) {
      /* empty */
    }
    setCatLoading(false)
  }

  const handleSubmit = async (values: CreateServiceProps) => {
    setLoading(true)
    try {
      //   const response = await CreateServiceUserApi(values)
      //   console.log('response', response)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    getCategories()
  }, [])

 
  return (
    <Container maxWidth='md'>
      <Centered mt={4}>
        <StyledBox>
          <Centered >
            {catLoading ? (
              <Box mt={5}>
                <CircularProgress />
              </Box>
            ) : (
              <Box p={4} width='100%'>
                <Typography
                  variant='h4'
                  color='primary'
                  fontWeight='bold'
                  textAlign='center'
                  pb={5}
                >
                  Create your Service
                </Typography>

                <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validationSchema={CreateServiceValidationSchema}
                >
                  {({ submitForm }) => {
                    return (
                      <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} alignItems='space-between' flex={1}>
                            <InputField name='name' label={'Name'} />
                            <Box mt={2}>
                            <SelectField name='category' label='Category' options={categories}  />
                            </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                            <InputField name='description' label={'Description'} multiline rows={4} />
                            </Grid>
                        </Grid>
                        <Flex flexDirection='column' gap={2}>
                            <Box mt={2}>
                            <InputField name='subCategory' label={'Sub Category'} />

                            </Box>
                          <InputField name='faq1' label={'Frequently Asked Question 1'} />
                          <InputField name='faqAnswer1' label={'Answer'} multiline rows={3} />
                          <InputField name='faq2' label={'Frequently Asked Question 2'} />
                          <InputField name='faqAnswer2' label={'Answer'} multiline rows={3} />
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
                                Create Service
                              </Typography>
                            )}
                          </Button>
                        </Box>
                      </Form>
                    )
                  }}
                </Formik>
              </Box>
            )}
          </Centered>
        </StyledBox>
      </Centered>
    </Container>
  )
}

export default CreateService

const StyledBox = styled(Box)(() => ({
  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  minHeight: '80vh',
  maxWidth: '800px',
  width: '100%'
}))
