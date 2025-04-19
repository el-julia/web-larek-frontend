import './scss/styles.scss';

import { LarekApi } from './components/LarekApi';
import { API_URL, CDN_URL } from './utils/constants';

import { EventEmitter } from './components/base/Events';
import { Page } from './components/Page';
import { AppState, CatalogChangeEvent, ProductItem } from './components/AppData';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Card } from './components/Card';
import { Modal } from './components/common/Modal';

//

const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);

// шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');

const page = new Page(document.body, events);

// модель данных приложения
const appData = new AppState({}, events);

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);


// получаем товары с сервера
api
	.getProductList()
	.then(appData.setCatalog.bind(appData))
	.catch((error) => {
		console.error(error);
	});

// рендерим список товаров на странице
events.on<CatalogChangeEvent>('items:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			productCategory: item.category,
			productTitle: item.title,
			productImage: item.image,
			productPrice: item.price,
		});
	});
});



// открыть товар
events.on('card:select', (item: ProductItem) => {
	appData.setPreview(item);
});

// открыт выбранный товар
events.on('preview:changed', (item: ProductItem) => {
	const showItem = (item: ProductItem) => {
		const card = new Card(cloneTemplate(cardPreviewTemplate));

		modal.render({
			content: card.render({
				productCategory: item.category,
				productTitle: item.title,
				productImage: item.image,
				productDescription: item.description,
			})
		});
	};
	if (item) {
		api.getProductItem(item.id)
			.then((result) => {
				item.description = result.description;
				showItem(item);
			})
			.catch((err) => {
				console.error(err);
			})
	} else {
		modal.close();
	}
});


// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
	page.locked = false;
});