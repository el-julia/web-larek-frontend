import { FormErrors, IAppState, IOrder, Product } from '../../types';
import { Model } from '../base/Model';

export type CatalogChangeEvent = {
	catalog: Product[]
};

export class AppState extends Model<IAppState> {
	basket: string[];
	loading: boolean;
	order: IOrder = {
		address: '',
		phone: '',
		email: '',
		payment: null,
		items: []
	}
	formErrors: FormErrors = {};


	clearBasket() {
		this.order.items = [];
	}
}