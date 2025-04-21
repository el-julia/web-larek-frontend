import { Model } from '../base/Model';
import { SuccessEvent } from '../events/SuccessEvent';

export interface ISuccess {
	total: number;
}

export class Success extends Model {
	protected total = 0;

	setTotal(total: number) {
		this.total = total;
		this.emitChanges(SuccessEvent.CHANGED, {
			total: total,
		} as ISuccess);
	}
}