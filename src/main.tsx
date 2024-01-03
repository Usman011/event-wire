import ReactDOM from 'react-dom/client'
import { store } from 'store'
import { Provider } from 'react-redux'
import { CssBaseline } from '@mui/material'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <CssBaseline />
      <App />
  </Provider>
)
