export interface Degree {
    id: string;
    name: string;
    prefix: string;
    credits: {
        major: number; // major credits
        masc: number; // math and science credits
        hssa: number; // hssa credits
        tech: number; // elective technical credits
        free: number; // free elective credits
    }
}