import './scss/styles.scss';

import { LarekApi } from './components/model/LarekApi';
import { API_URL, CDN_URL } from './utils/constants';

import { EventEmitter } from './components/base/Events';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/view/Page';
import { Modal } from './components/view/Modal';
import { Product } from './types';
import { CatalogEvents } from './components/events/CatalogEvents';
import { Catalog } from './components/model/Catalog';
import { ModalEvents } from './components/events/ModalEvents';
import { BasketEvents } from './components/events/BasketEvents';
import { CardCatalog } from './components/view/card/CardCatalog';
import { CardPreview } from './components/view/card/CardPreview';
import { Basket as BasketModel, IBasketData } from './components/model/Basket';
import { Basket } from './components/view/basket/Basket';
import { CardBasket } from './components/view/basket/CardBasket';
import { IOrderChange, Order as OrderModel } from './components/model/Order';
import { Order } from './components/view/checkout/Order';
import { CheckoutEvent } from './components/events/CheckoutEvents';
import { Contacts } from './components/view/checkout/Contacts';
import {
	Contacts as ContactsModel,
	IContactsChange,
} from './components/model/Contacts';
import { ISuccess, Success as SuccessModel } from './components/model/Success';
import { SuccessEvent } from './components/events/SuccessEvent';
import { Success } from './components/view/Success';

const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);

// шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');

const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const page = new Page(document.body, {
	// при клике по корзине отправляем событие открытия модального окна корзины
	onBasketClick: () => events.emit(ModalEvents.BASKET),
});

// модель данных приложения
const catalogModel = new Catalog(events);
const basketModel = new BasketModel(events);
const orderModel = new OrderModel(events);
const contactModel = new ContactsModel(events);
const successModel = new SuccessModel(events);

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const basket = new Basket(cloneTemplate(basketTemplate), {
	onClick: () => events.emit(ModalEvents.ORDER),
});

const order = new Order(cloneTemplate(orderTemplate), {
	onOnlineClick: () =>
		events.emit<Pick<IOrderChange, 'payment'>>(CheckoutEvent.PAYMENT_SELECT, {
			payment: 'card',
		}),

	onOfflineClick: () =>
		events.emit<Pick<IOrderChange, 'payment'>>(CheckoutEvent.PAYMENT_SELECT, {
			payment: 'cash',
		}),

	onProceedButtonClick: (event) => {
		event.preventDefault();
		events.emit(ModalEvents.CONTACTS);
	},

	onAddressInput: (event) => {
		const target = event.target as HTMLInputElement;
		events.emit<Pick<IOrderChange, 'address'>>(CheckoutEvent.ADDRESS_INPUT, {
			address: target.value,
		});
	},
});

const success = new Success(cloneTemplate(successTemplate), {
	onSuccessButtonClick: (event) => {
		event.preventDefault();
		events.emit(ModalEvents.NONE);
	},
});

//рендер последнего шага формы
const contacts = new Contacts(cloneTemplate(contactsTemplate), {
	onEmailInput: (event) => {
		const target = event.target as HTMLInputElement;
		events.emit<Pick<IContactsChange, 'email'>>(CheckoutEvent.EMAIL_INPUT, {
			email: target.value,
		});
	},
	onPhoneInput: (event) => {
		const target = event.target as HTMLInputElement;
		events.emit<Pick<IContactsChange, 'phone'>>(CheckoutEvent.PHONE_INPUT, {
			phone: target.value,
		});
	},
	onToPayButtonClick: (event) => {
		event.preventDefault();
		api
			.orderProducts({
				items: basketModel.getProducts().map((product) => product.id),
				total: basketModel.getTotal(),
				payment: orderModel.getPayment(),
				address: orderModel.getAddress(),
				email: contactModel.getEmail(),
				phone: contactModel.getPhone(),
			})
			.then(() => {
				successModel.setTotal(basketModel.getTotal());
				basketModel.clear();
				events.emit(ModalEvents.SUCCESS);
			})
			.catch((error) => {
				console.error(error);
			});
	},
});

let productCardPreview: CardPreview;

// получаем товары с сервера
api
	.getProductList()
	.then((products) => {
		catalogModel.setProducts(products);
	})
	.catch((error) => {
		console.error(error);
	});

// рендерим список товаров на странице
events.on(CatalogEvents.CHANGED, (products: Product[]) => {
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
	modal.render({
		content: basket.render({}),
	});
});

// товар добавили в корзину
events.on(BasketEvents.ADD, (product: Product) => {
	basketModel.add(product);
});

// товар удалили из корзины
events.on(BasketEvents.REMOVE, (product: Product) => {
	basketModel.remove(product);
});

// очищаем корзину
events.on(BasketEvents.CLEAR, () => {
	basketModel.clear();
});

events.on(BasketEvents.CHANGED, (data: IBasketData) => {
	page.counter = data.products.length;
});

events.on(BasketEvents.CHANGED, (data: IBasketData) => {
	if (productCardPreview !== undefined) {
		productCardPreview.basketProducts = data.products;
	}
});

events.on(BasketEvents.CHANGED, (data: IBasketData) => {
	const cardBasketItems = data.products.map((product, index) => {
		const cardBasket = new CardBasket(cloneTemplate(cardBasketTemplate), {
			onCardButtonDeleteClick: () => events.emit(BasketEvents.REMOVE, product),
		});

		return cardBasket.render({
			index: index + 1,
			title: product.title,
			price: product.price,
		});
	});

	basket.render({
		items: cardBasketItems,
		total: data.total,
	});
});

//оформление заказа по клику оформить в корзине

events.on(ModalEvents.ORDER, () => {
	modal.render({
		content: order.render({}),
	});
});

events.on(ModalEvents.CONTACTS, () => {
	modal.render({
		content: contacts.render({}),
	});
});

events.on(ModalEvents.SUCCESS, () => {
	modal.render({
		content: success.render({}),
	});
});

events.on(ModalEvents.NONE, () => {
	modal.close();
});

// Блокируем прокрутку страницы если открыта модалка
events.on(ModalEvents.OPEN, () => {
	page.locked = true;
});

// ... и разблокируем
events.on(ModalEvents.CLOSE, () => {
	page.locked = false;
});

events.on(
	CheckoutEvent.PAYMENT_SELECT,
	(data: Pick<IOrderChange, 'payment'>) => {
		orderModel.setPayment(data.payment);
	}
);

events.on(
	CheckoutEvent.ADDRESS_INPUT,
	(data: Pick<IOrderChange, 'address'>) => {
		orderModel.setAddress(data.address);
	}
);

events.on(CheckoutEvent.ORDER_CHANGED, (data: IOrderChange) => {
	order.payment = data.payment;
	order.address = data.address;
	order.valid = data.valid;
	order.error = data.error;
});

events.on(CheckoutEvent.CONTACTS_CHANGED, (data: IContactsChange) => {
	contacts.email = data.email;
	contacts.phone = data.phone;
	contacts.valid = data.valid;
	contacts.error = data.error;
});

events.on(SuccessEvent.CHANGED, (data: ISuccess) => {
	success.total = data.total;
});

events.on(CheckoutEvent.EMAIL_INPUT, (data: Pick<IContactsChange, 'email'>) => {
	contactModel.setEmail(data.email);
});

events.on(CheckoutEvent.PHONE_INPUT, (data: Pick<IContactsChange, 'phone'>) => {
	contactModel.setPhone(data.phone);
});

// для разработки
events.on(CatalogEvents.CHANGED, (products: Product[]) => {
	events.emit(BasketEvents.ADD, products.pop());
	events.emit(ModalEvents.ORDER);
});
