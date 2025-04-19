import './scss/styles.scss';

import { LarekApi } from './components/model/LarekApi';
import { API_URL, CDN_URL } from './utils/constants';

import { EventEmitter } from './components/base/Events';
import { AppState } from './components/model/AppData';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/view/Page';
import { Modal } from './components/view/Modal';
import { Basket } from './components/view/Basket';
import { Success } from './components/view/Success';
import { Product } from './types';
import { ProductsEvents } from './components/events/ProductsEvents';
import { Catalog } from './components/model/Catalog';
import { ModalEvents } from './components/events/ModalEvents';
import { CartEvents } from './components/events/CartEvents';
import { CardCatalog } from './components/view/CardCatalog';
import { CardPreview } from './components/view/CardPreview';
import { Cart } from './components/model/Cart';

const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);

// шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const page = new Page(document.body, events);

// модель данных приложения
const appData = new AppState({}, events);
const productsModel = new Catalog({}, events);
const cartModel = new Cart({}, events);

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
		onClick: () => events.emit(CartEvents.ADD, product),
	});

	modal.render({
		content: productCardPreview.render({
			productId: product.id,
			productCategory: product.category,
			productTitle: product.title,
			productImage: product.image,
			productDescription: product.description,
			productPrice: product.price,
			cartProducts: cartModel.getProducts(),
		}),
	});
});

// товар добавили в корзину
events.on(CartEvents.ADD, (product: Product) => {
	cartModel.add(product);
})

// товар удалили из корзины
events.on(CartEvents.REMOVE, (product: Product) => {
	cartModel.remove(product);
})

// очищаем корзину
events.on(CartEvents.CLEAR, () => {
	cartModel.clear();
})

events.on(CartEvents.CHANGED, (products: Product[]) => {
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
