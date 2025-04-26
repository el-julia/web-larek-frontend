import { AModel } from '../base/AModel';
import { SuccessEvent } from '../events/SuccessEvent';

// переименовать
export interface ISuccess {
	total: number;
}

export class SuccessModel extends AModel {
	protected total = 0;

	setTotal(total: number) {
		this.total = total;
		this.emitChanges(SuccessEvent.CHANGED, {
			total: total,
		} as ISuccess);
	}
}