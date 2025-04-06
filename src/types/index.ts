export interface LarekApi {
	getProductList: () => Promise<ProductList>;
	getProduct: (id: string) => Promise<Product>;
	placeOrder: (order: Order) => Promise<OrderResult>;
}

export type ProductCategory = {
	category: 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';
};

export interface Product {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

export interface ProductList {
	items: Product[];
}

export interface CartItem {
	title: string;
	price: number;
}

export interface Cart {
	items: CartItem[];
}

export interface OrderAddresses {
	payment: string;
	address: string;
}

export interface OrderContacts {
	email: string;
	phone: number;
}

export interface Order extends OrderAddresses, OrderContacts {}

export interface OrderResult {
	id: string;
	total: number;
}

export type FormErrors = Partial<Record<keyof Order, string>>;

export type ApiListResponce<Type> = {
	total: number;
	items: Type[];
};

export enum EnumApiMethods {
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	GET = 'GET',
}

export type ErrorState = {
	error: string;
};

export type EventData = object;
export type EventHandler = (args: EventData) => void;
export type EventsMap = Map<string, Set<EventHandler>>;

export interface View<T, S = object> {
	element: HTMLElement; // корневой элемент
	copy(settings?: S): View<T>; // копирующий конструктор
	render(data?: Partial<T>): HTMLElement; // метод рендера
}

export interface ViewConstructor<T, S> {
	// конструктор отображения
	// получает на вход клонированный шаблон
	// или существующий элемент,
	// а также настройки для отображения
	new (root: HTMLElement, settings: S): View<T>;
}

// Чтобы события настраивались единообразно, пропишем их здесь

// Настройки для кликабельного отображения (кнопки, карточки...)
export type ClickableEvent<T> = { event: MouseEvent; item?: T };

export interface Clickable<T> {
	onClick: (args: ClickableEvent<T>) => void;
}

// Настройки для изменяемого отображения (формы, переключатели...)
export type ChangeableEvent<T> = { event: Event; value?: T };

export interface Changeable<T> {
	onChange: (args: ChangeableEvent<T>) => void;
}

// Настройки для выбираемого отображения (списки, таблицы...)
export type SelectableEvent<T> = { event: Event; value?: T };

export interface Selectable<T> {
	onSelect: (args: SelectableEvent<T>) => void;
}
