import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.sass';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AuthProvider from './auth/AuthProvider';
import { LocaleProvider } from 'antd';
import el_GR from 'antd/lib/locale-provider/el_GR';
import moment from 'moment';
import 'moment/locale/el';

moment.locale('el');

const app = (
    <BrowserRouter>
        <AuthProvider>
            <LocaleProvider locale={el_GR}>
                <App />
            </LocaleProvider>
        </AuthProvider>
    </BrowserRouter>
);
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
