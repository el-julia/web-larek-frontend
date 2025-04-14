import { Api } from './base/Api';
import { Order, OrderResult, Product, ProductList } from '../types';

export class LarekApi extends Api {
	//получаем массив товаров с сервера

	getProductList(): Promise<ProductList> {
		return this.get<ProductList>('/product/');
	}

	placeOrder(order: OrderResult): Promise<OrderResult> {
		return this.post<OrderResult>('/order', order, 'POST');

	}
}
