/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
  Typography
} from '@mui/material'
import { styled } from '@mui/system'
import uploadToCloudinary from 'api/cloudnairy'
import { createNewServiceApi, getCompleteCategoriesApi } from 'api/userApi'
import { InputField } from 'components/InputField'
import { SelectField } from 'components/SelectField'
import { Centered, Flex } from 'components/design'
import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form } from 'react-router-dom'
import { openToaster } from 'store/toast'
import * as Yup from 'yup'

export interface CreateServiceProps {
  name: string
  category: string
  description: string
  subCategory: string
  faq1: string
  faqAnswer1: string
  faq2: string
  faqAnswer2: string
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
  const [subcategories, setSubcategories] = useState([])
  const [catLoading, setCatLoading] = useState(false)
  const dispatch = useDispatch()
  const [selectedFiles, setSelectedFiles] = useState([])

  const initialValues: CreateServiceProps = {
    name: '',
    category: '',
    description: '',
    subCategory: '',
    faq1: '',
    faqAnswer1: '',
    faq2: '',
    faqAnswer2: ''
  }

  // const CreateServiceValidationSchema = Yup.object().shape({
  //   name: Yup.string().required('Name is required'),
  //   category: Yup.string().required('category is required'),
  //   description: Yup.string().required('description is required'),
  //   subCategory: Yup.string().required('subCategory is required'),
  //   faq1: Yup.string().required('This field is required'),
  //   faqAnswer1: Yup.string().required('This field is required'),
  //   faq2: Yup.string().required('This field is required'),
  //   faqAnswer2: Yup.string().required('This field is required')
  // })

  const getCategories = async () => {
    setCatLoading(true)
    try {
      const response = await getCompleteCategoriesApi()

      // const data = response.data.categories.map((item: Category) => {
      //   return { title: item.name, key: item.id }
      // })
      setCategories(response.data.categories)
      // console.log('getAllCategoriesApi', response)
    } catch (error) {
      /* empty */
    }
    setCatLoading(false)
  }

  const handleSubmit = async (values: CreateServiceProps) => {
    console.log(values, 'values')
    if (selectedFiles.length !== 0) {
      setLoading(true)
      try {
        const metaData = await Promise.all(
          selectedFiles.map(item => {
            return uploadToCloudinary(item)
          })
        )
        const formData = {
          name: values.name,
          description: values.description,
          images: metaData,
          category: values.category,
          subcategory: values.subCategory,
          faqs: [
            {
              question: values.faq1,
              answer: values.faqAnswer2
            },
            {
              question: values.faq2,
              answer: values.faqAnswer2
            }
          ]
        }
        console.log(metaData)
        const response = await createNewServiceApi(formData)
        console.log('response', response)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    } else {
      dispatch(
        openToaster({
          type: 'error',
          message: 'No Image uploaded'
        })
      )
      return
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (event: any) => {
    const files = event.target.files

    // Validate the number of selected files
    if (files.length < 3 || files.length > 5) {
      dispatch(
        openToaster({
          type: 'error',
          message: 'file limit is between is 3 to 5'
        })
      )
      event.target.value = null // Clear the file input
    } else {
      setSelectedFiles(Array.from(files))
    }
  }

  // const handleValues = (values: any) => {
  //   // const subcategories = categories.filter(ct => {
  //   //   if (ct.category.id === values.category) {
  //   //     return ct.subcategories.map((sct: any) => {
  //   //       return {
  //   //         title: sct.name,
  //   //         key: sct.id
  //   //       }
  //   //     })
  //   //   }
  //   // })
  //   // setSubcategories(subcategories)
  // }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <Container maxWidth='md'>
      <Centered mt={4}>
        <StyledBox>
          <Centered>
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
                  // validationSchema={CreateServiceValidationSchema}
                >
                  {({ submitForm, errors, values }) => {
                    //
                    // handleValues(values)
                    return (
                      <Form>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6} alignItems='space-between' flex={1}>
                            <InputField name='name' label={'Name'} />
                            <Box mt={2}>
                              <SelectField
                                name='category'
                                label='Category'
                                options={categories.map(ct => {
                                  return {
                                    title: ct.category.name,
                                    key: ct.category.id
                                  }
                                })}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <InputField
                              name='description'
                              label={'Description'}
                              multiline
                              rows={4}
                            />
                          </Grid>
                        </Grid>
                        <Box>
                          <input
                            style={{
                              width: '100%',
                              padding: '1rem',
                              margin: '.5rem 0rem',
                              border: '1px solid #000'
                            }}
                            type='file'
                            multiple
                            onChange={handleFileChange}
                            id='file-input'
                          />

                          <Box>
                            <Typography variant='subtitle1'>
                              <strong>Selected Files:</strong>
                            </Typography>
                            <List>
                              {selectedFiles.map((file, index) => (
                                <ListItem key={index}>
                                  <Typography variant='body1'>{file.name}</Typography>
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        </Box>
                        <Flex flexDirection='column' gap={2}>
                          <Box mt={2}>
                            <SelectField
                              name='subCategory'
                              label='Subcategory'
                              options={subcategories}
                            />
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