import { ThemeProvider } from '@mui/material'
import { CustomTheme, ThemeVariantsProps } from 'theme'
import { useMemo } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from 'pages/Home/index.tsx'
import AuthLayout from 'components/AuthLayout'
import Signup from 'pages/Signup'
import Login from 'pages/Login'
import CustomToast from 'components/Toast'
import ServiceList from 'pages/ServiceList'
import ViewService from 'pages/ViewService'

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
      element: <AuthLayout />,
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
        }
      ]
    }
  ])

  return (
    <ThemeProvider theme={activeTheme}>
      <CustomToast />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
export default App
