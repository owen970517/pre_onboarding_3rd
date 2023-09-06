import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import store from "./stores/store";
import { Provider } from 'react-redux';
export const Router = createBrowserRouter([
    {
        path: '/',
        element: 
        <Provider store={store}>
            <App />
        </Provider>,
        children : [
            {
                path : '/home',
                element : <Home/>
            }
        ]
    }
]);