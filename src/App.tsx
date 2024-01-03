import { CssBaseline, ThemeProvider } from '@mui/material'
import { CustomTheme, ThemeVariantsProps } from 'theme'
import { useMemo } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from 'pages/Home'
import AuthLayout from 'components/AuthLayout'
import Signup from 'pages/Signup'
import Login from 'pages/Login'
import CustomToast from 'components/Toast'
import ServiceList from 'pages/ServiceList'
import ViewService from 'pages/ViewService'
import PublicLayout from 'components/PublicLayout'
import CreateService from 'pages/CreateService'
import VendorServiceList from 'pages/VendorServiceList'

function App() {
  const activeTheme = useMemo(() => CustomTheme(ThemeVariantsProps.light), [])

  const router = createBrowserRouter([
    {
      path: 'signup',
      element: <Signup />
    },
    {
      path: 'login',
      element: <Login />
    },
    {
      path: '/',
      element: <PublicLayout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/services/:id',
          element: <ServiceList />
        },
        {
          path: '/view-service/:id',
          element: <ViewService />
        },
      ]
    },
   

    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
          path: '/create-service',
          element: <CreateService />
        },
        {
          path: '/vendor-services',
          element: <VendorServiceList />
        },
      ]
    }
  ])

  return (
    <ThemeProvider theme={activeTheme}>
      <CustomToast />
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
export default App
