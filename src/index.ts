import './scss/styles.scss';
import { ProductModel } from './components/ProductModel';
import { LarekApi } from './components/LarekApi';
import { API_URL, CDN_URL } from './utils/constants';

import { EventEmitter } from './components/base/Events';
import { Page } from './components/Page';
import { ProductCard } from './components/ProductCardView';
import { cloneTemplate } from './utils/utils';


const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);

const page = new Page(document.body, events);

