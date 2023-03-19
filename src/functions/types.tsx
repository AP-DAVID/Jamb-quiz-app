export type Subjects = {
  id: number;
  name: string;
  questions: {
    question: string;
    options: string[];
    answer: number;
  }[];
};
