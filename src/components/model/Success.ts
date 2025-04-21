import { Model } from '../base/Model';

export interface ISuccess {
	total: number;
}

export class Success extends Model<ISuccess> {
	protected total = 0;

	setTotal(total: number) {
		this.total = total;
	}
}