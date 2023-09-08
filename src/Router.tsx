import { Navigate, createBrowserRouter } from "react-router-dom";
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
                path: '/',
                element: <Navigate to='/home' replace={true} />,
            },
            {
                path : '/home',
                element : <Home/>
            }
        ]
    }
]);