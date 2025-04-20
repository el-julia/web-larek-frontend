import { Api, ApiListResponse } from '../base/Api';
import { IOrder, OrderResult, Product } from '../../types';

interface ILarekApi {
	getProductItem(id: string): Promise<Product>;
	getProductList() : Promise<Product[]>;
	orderProducts(order: IOrder): Promise<OrderResult>;
}

// TODO - вынести сервис в отдельное место
export class LarekApi extends Api implements ILarekApi {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProductItem(id: string): Promise<Product> {
		return this.get(`/product/${id}`).then(
			(item: Product) => ({
				...item,
				image: this.cdn + item.image,
			})
		);

	}

	getProductList(): Promise<Product[]> {
		return this.get('/product/').then((data: ApiListResponse<Product>) =>
			data.items.map((item: Product) => ({
				...item,
				image: this.cdn + item.image
			}))
		);
	}

	orderProducts(order: IOrder): Promise<OrderResult> {
		return this.post('/order', order).then(
		(data: OrderResult) => data
		);
	}
}
