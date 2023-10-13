import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from './state/api.ts'

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefault) => getDefault().concat(api.middleware),
})
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)

/* Notes
- Redux store configuration.
- Our Redux toolkit query API slice/reducerPath is passed in in reducer.
- middleware is just configuration that we need to setup with our API,
so that redux toolkit works properly. 
- setupListeners is also configuration to get redux toolkit to work properly.

- replaced React.strict wrapper around our App with provider and pass in
the store (redux store) so now our App components have access to this top level...

*/