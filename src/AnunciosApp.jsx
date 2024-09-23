import { AppRouter } from "./router/AppRouter";
import { Provider } from 'react-redux';
import { store } from './store';

export const AnunciosApp = () => {
  return (
    <div className="bg-blue-500">
      <Provider store={store}>
        <AppRouter/>
      </Provider>
    </div>
  )
}


