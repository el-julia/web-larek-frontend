import './scss/styles.scss';

import { LarekApi } from './components/LarekApi';
import { API_URL, CDN_URL } from './utils/constants';

import { EventEmitter } from './components/base/Events';
import { Page } from './components/Page';
import { AppState, CatalogChangeEvent } from './components/AppData';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Card } from './components/Card';

//

const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);

// шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');


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
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item)
		});
		return card.render({
			productCategory: item.category,
			productTitle: item.title,
			productImage: item.image,
			productPrice: item.price
		});
	});


});