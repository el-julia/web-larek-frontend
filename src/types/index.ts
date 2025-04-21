export interface Product {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
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

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export type Payment = 'card' | 'cash';