import { CoursesRequirement } from "./course-requirement.model";
import { Deserializable } from "./deserializable.model";

export class Course implements Deserializable {

	public id: string = '';
	public subject: string = '';
	public number: string = '';
	public title: string = '';
	public description: string = '';
	public prereqs: CoursesRequirement = new CoursesRequirement();
	
	public prereqsText: string = '';
	public searchText: string = '';

	deserialize(input: any): this {
		if (typeof input === 'string') {
			console.warn('Trying to deserialize a course with a string, should be a json array');
		}

		Object.assign(this, input);
			this.prereqs = new CoursesRequirement().deserialize(JSON.parse(input.prereqs));
			return this;
	}
}