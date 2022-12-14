import { Deserializable } from "./deserializable.model";

export class UserData implements Deserializable {

	public uid: string = '';
	public displayName: string = '';

	deserialize(input: any): this {
		return Object.assign(this, input);
	}
}