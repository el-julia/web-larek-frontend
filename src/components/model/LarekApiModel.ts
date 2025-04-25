import { Api, ApiListResponse } from '../base/Api';
import { IOrder, OrderResult, Product } from '../../types';

interface ILarekApi {
	getProductItem(id: string): Promise<Product>;

	getProductList(): Promise<Product[]>;

	orderProducts(order: IOrder): Promise<OrderResult>;
}

export class LarekApiModel extends Api implements ILarekApi {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProductItem(id: string): Promise<Product> {
		return this.get<Product>(`/product/${id}`).then((item) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	getProductList(): Promise<Product[]> {
		return this.get<ApiListResponse<Product>>('/product/').then((data) =>
			data.items.map((item: Product) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	orderProducts(order: IOrder): Promise<OrderResult> {
		return this.post<OrderResult>('/order', order).then(
			(data: OrderResult) => data
		);
	}
}
