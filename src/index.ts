import './scss/styles.scss';
import { ProductModel } from './components/ProductModel';
import { LarekApi } from './components/LarekApi';
import { API_URL } from './utils/constants';

import { EventEmitter } from './components/base/Events';
import { PageView } from './components/PageView';
import { ProductCard } from './components/ProductCardView';
import { cloneTemplate } from './utils/utils';

const page = new PageView(document.querySelector('.page__wrapper') as HTMLElement);

const events = new EventEmitter();
const productModel = new ProductModel(events);
const itemTemplate = document.getElementById('card-catalog') as HTMLTemplateElement;

const api = new LarekApi(API_URL);

api.getProductList()
	.then(response => {
		productModel.products = response.items;
		console.log(productModel);
	})
	.catch(error => {console.log(error)});

events.on('items:changed', () => {
	const htmlItemsArray = productModel.products.map(item => new ProductCard(cloneTemplate(itemTemplate), events).render(item))
	page.render({
		ProductsList: htmlItemsArray
	});
})