export interface Product {
	id: string;
	description: string;
	image: string;
	title: string;
	category: ProductCategory;
	price: number;
}

export interface OrderResult {
	id: string;
	total: number;
}

export interface IOrder {
	email: string;
	phone: string;
	address: string;
	payment: Payment | null;
	total: number;
	items: string[];
}

export type Payment = 'card' | 'cash';

export type ProductCategory = 'софт-скил' | 'хард-скил' | 'дополнительное' | 'кнопка' | string;