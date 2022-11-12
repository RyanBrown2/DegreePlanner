import { CoursesRequirement } from "./course-requirement.model";
import { CreditRequirement } from "./credit-requirement.model";
import { Deserializable } from "./deserializable.model";

export class Degree implements Deserializable {
	
	public name: string = '';
	public creditRequirements: CreditRequirement[] = [];
	public courseRequirements: CoursesRequirement[] = [];

	setName(name: string) {
		this.name = name;
	}

	addCreditRequirement(req: CreditRequirement) {
		this.creditRequirements.push(req);
	}

	addCourseRequirement(req: CoursesRequirement) {
		this.courseRequirements.push(req);
	}

	deserialize(input: any): this {
		// Assign input to object before deserialization to 
		// prevent already deserialized fields from being overwritten
		Object.assign(this, input);

		this.creditRequirements = input.creditRequirements.map((req: CreditRequirement) => new CreditRequirement().deserialize(req));
		this.courseRequirements = input.courseRequirements.map((req: CoursesRequirement) => new CoursesRequirement().deserialize(req));

		return this;
	}
	
}