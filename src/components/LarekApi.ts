import { Api } from './base/Api';
import { Product, ProductList } from '../types';

export class LarekApi extends Api {
	//получаем массив товаров с сервера

	getProductList(): Promise<ProductList> {
		return this.get<ProductList>('/product/');
	}
}
