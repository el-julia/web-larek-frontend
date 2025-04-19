import './scss/styles.scss';

import { LarekApi } from './components/model/LarekApi';
import { API_URL, CDN_URL } from './utils/constants';

import { EventEmitter } from './components/base/Events';
import { AppState } from './components/model/AppData';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/view/Page';
import { Modal } from './components/view/Modal';
import { Success } from './components/view/Success';
import { Product } from './types';
import { ProductsEvents } from './components/events/ProductsEvents';
import { Catalog } from './components/model/Catalog';
import { ModalEvents } from './components/events/ModalEvents';
import { BasketEvents } from './components/events/BasketEvents';
import { CardCatalog } from './components/view/card/CardCatalog';
import { CardPreview } from './components/view/card/CardPreview';
import { Basket as BasketModel } from './components/model/Basket';
import { Basket } from './components/view/basket/Basket';

const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);

// шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const page = new Page(document.body, events, {
	// при клике по корзине отправляем событие открытия модального окна корзины
	onBasketClick: () => events.emit(ModalEvents.BASKET),
});

// модель данных приложения
const appData = new AppState({}, events);
const productsModel = new Catalog({}, events);
const basketModel = new BasketModel({}, events);

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
let productCardPreview: CardPreview;

// получаем товары с сервера
api
	.getProductList()
	.then((products) => {
		productsModel.setProducts(products);
	})
	.catch((error) => {
		console.error(error);
	});

// рендерим список товаров на странице
events.on(ProductsEvents.CHANGED, (products: Product[]) => {
	page.catalog = products.map((product) => {
		const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit(ModalEvents.PRODUCT_PREVIEW, product),
		});

		return card.render({
			productId: product.id,
			productCategory: product.category,
			productTitle: product.title,
			productImage: product.image,
			productPrice: product.price,
		});
	});
});

// открыт выбранный товар
events.on(ModalEvents.PRODUCT_PREVIEW, (product: Product) => {
	productCardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), {
		onClick: () => events.emit(BasketEvents.ADD, product),
	});

	modal.render({
		content: productCardPreview.render({
			productId: product.id,
			productCategory: product.category,
			productTitle: product.title,
			productImage: product.image,
			productDescription: product.description,
			productPrice: product.price,
			basketProducts: basketModel.getProducts(),
		}),
	});
});

events.on(ModalEvents.BASKET, () => {
	const products = basketModel.getProducts();
	const content = basket.render({
		items: [],
		total: products.reduce((total, item) => total + item.price, 0),
	});
	modal.render({
		content: content,
	})
})

// товар добавили в корзину
events.on(BasketEvents.ADD, (product: Product) => {
	basketModel.add(product);
})

// товар удалили из корзины
events.on(BasketEvents.REMOVE, (product: Product) => {
	basketModel.remove(product);
})

// очищаем корзину
events.on(BasketEvents.CLEAR, () => {
	basketModel.clear();
})

events.on(BasketEvents.CHANGED, (products: Product[]) => {
	page.counter = products.length;

	productCardPreview.cartProducts = products;
})


// отправлена форма заказа
events.on('order:submit', () => {
	api
		.orderProducts(appData.order)
		.then((result) => {
			const success = new Success(cloneTemplate(successTemplate), {
				onClick: () => {
					modal.close();
					appData.clearBasket();
				},
			});

			modal.render({
				content: success.render({}),
			});
		})
		.catch((err) => {
			console.error(err);
		});
});

// Блокируем прокрутку страницы если открыта модалка
events.on(ModalEvents.OPEN, () => {
	page.locked = true;
});

// ... и разблокируем
events.on(ModalEvents.CLOSE, () => {
	page.locked = false;
});
