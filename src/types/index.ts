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



export interface Order extends OrderAddresses, IContactForm {
	total: number;
	"items": string[];
}






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




// точно использую

// интерфейс описывающий один наш продукт
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

export interface IOrder extends IOrderForm, IContactForm {
	items: string[];
}

export interface IOrderForm {
	address: string;
	payment: Payment | null;
}

export interface IContactForm {
	email: string;
	phone: string;
}

export interface IAppState {
	catalog: Product[];
	basket: string[];
	preview: string | null;
	order: IOrder | null;
	loading: boolean;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;


// переделываю
export type Payment = 'card' | 'cash';