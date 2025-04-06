export interface IProductItems {
	getProductList: () => Promise<ProductList>;
	getProduct: (id: string) => Promise<Product>;
	placeOrder: (order: Order) => Promise<OrderResult>;
}

// описание типа категории товара
export type ProductCategory = {
	category: 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';
};

//описание интерфейса карточки товара
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
	PUT = 'PUT', //надо?
	DELETE = 'DELETE', //надо?
	GET = 'GET',
}

export type ErrorState = {
	error: string;
};

export type EventData = object;
export type EventHandler = (args: EventData) => void;
export type EventsMap = Map<string, Set<EventHandler>>;

export interface IView<T, S = object> {
	// отображение для заданного типа данных
	element: HTMLElement; // корневой элемент
	copy(settings?: S): IView<T>; // копирующий конструктор
	render(data?: Partial<T>): HTMLElement; // метод рендера
}

export interface IViewConstructor<T, S> {
	// конструктор отображения
	// получает на вход клонированный шаблон
	// или существующий элемент,
	// а также настройки для отображения
	new (root: HTMLElement, settings: S): IView<T>;
}

// Чтобы события настраивались единообразно, пропишем их здесь

// Настройки для кликабельного отображения (кнопки, карточки...)
export type IClickableEvent<T> = { event: MouseEvent; item?: T };

export interface IClickable<T> {
	onClick: (args: IClickableEvent<T>) => void;
}

// Настройки для изменяемого отображения (формы, переключатели...)
export type IChangeableEvent<T> = { event: Event; value?: T };

export interface IChangeable<T> {
	onChange: (args: IChangeableEvent<T>) => void;
}

// Настройки для выбираемого отображения (списки, таблицы...)
export type ISelectableEvent<T> = { event: Event; value?: T };

export interface ISelectable<T> {
	onSelect: (args: ISelectableEvent<T>) => void;
}
