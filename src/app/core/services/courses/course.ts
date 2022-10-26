export class Course {
    
    static toData(course: Course): CourseData {
        return { id: course.id, subject: course.subject, number: course.number, prereqs: course.prereqs};
    }

    static toClass(courseData: CourseData): Course {
        const course = new Course(courseData.subject, courseData.number);
        course.prereqs = courseData.prereqs;
        return course;
    }

    public id: string;
    public subject: string;
    public number: number;
    public prereqs: string[] = [];

    constructor(subject: string, number: number) {
        this.subject = subject;
        this.number = number;
        this.id = subject+number;
    }

    addPrereq(course: string) {
        if (!this.prereqs.includes(course)) {
            this.prereqs.push(course);
        }
    }


}

export interface CourseData {
    id: string;
    subject: string;
    number: number;
    prereqs: string[];
}