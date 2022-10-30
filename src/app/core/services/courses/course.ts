export interface Course {
    id: string;
    subject: string;
    number: number;
    title: string;
    description: string;
    prereqs: string[];
}

export const SubjectTranslate = {
  ma: "Math",
  ph: "Physics",
  csse: "Computer Science"
}

export function MatchCourseKey(input: string): string {
  const entries = Object.entries(SubjectTranslate);
  for (var x of entries) {
    if (input == x[1]) {
      return x[0];
    }
  }
  return "";
}