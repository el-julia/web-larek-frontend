import { Api, ApiListResponse } from './base/Api';
import { OrderResult, Product } from '../types';


export class LarekApi extends Api {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProductList(): Promise<Product[]> {
		return this.get('/product/').then((data: ApiListResponse<Product>) =>
			data.items.map((item: Product) => ({
				...item,
				image: this.cdn + item.image
			}))
		);
	}

	orderProducts(order: OrderResult): Promise<OrderResult> {
		return this.post('/order', order).then(
		(data: OrderResult) => data
		);
	}
}
