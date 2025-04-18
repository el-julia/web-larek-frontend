//export interface LarekApi {
	// getProductList: () => Promise<ProductList>;
	// getProduct: (id: string) => Promise<Product>;
	// placeOrder: (order: Order) => Promise<OrderResult>;
//}

export type ProductCategory = {
	category: 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';
};

// интерфейс описывающий один наш продукт
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
	id: string;
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

export interface Order extends OrderAddresses, OrderContacts {
	total: number;
	"items": string[];
}

export interface OrderResult {
	id: string;
	total: number;
}

export type FormErrors = Partial<Record<keyof Order, string>>;


export enum EnumApiMethods {
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	GET = 'GET',
}

export type ErrorState = {
	error: string;
};


export class ApiListResponce {}

export interface IOrderForm {
	address: string;
	payment: 'card' | 'cash';
}