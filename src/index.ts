import './scss/styles.scss';

import { LarekApi } from './components/LarekApi';
import { API_URL, CDN_URL } from './utils/constants';

import { EventEmitter } from './components/base/Events';
import { Page } from './components/Page';
import { AppState, CatalogChangeEvent } from './components/AppData';
import { cloneTemplate } from './utils/utils';



const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);

const page = new Page(document.body, events);

// модель данных приложения
const appData = new AppState({}, events)

// получаем товары с сервера
api.getProductList()
	.then(appData.setCatalog.bind(appData))
	.catch(error => {console.error(error);
	});

events.on<CatalogChangeEvent>('items:changed', () => {
	page.catalog = appData.catalog.map(item => {
		const card = new CatalogItem(cloneTemplate(cardCatalogTemplate))
	})
})