// Utility Types

// Partial

interface Assignment {
  studentId: string;
  title: string;
  grade: number;
  verified?: boolean;
}
const updateAssignment = (
  assign: Assignment,
  propsToUpdate: Partial<Assignment>,
): Assignment => {
  return { ...assign, ...propsToUpdate };
};

const assign1: Assignment = {
  studentId: 'CompSci-101',
  title: 'Homework 1',
  grade: 100,
};

console.log(updateAssignment(assign1, { grade: 90 }));
const assignGraded: Assignment = updateAssignment(assign1, { grade: 90 });

// Required and Readonly

const recordAssignment = (assign: Required<Assignment>): Assignment => {
  // send to database, etc
  return assign;
};

const assignVerified: Readonly<Assignment> = {
  ...assignGraded,
  verified: true,
};

// assignVerified.grade = 88;
recordAssignment({ ...assignGraded, verified: true });

// Record
const hexColorMap: Record<string, string> = {
  red: 'FF0000',
  green: '00FF00',
  blue: '0000FF',
};

type Students = 'Sara' | 'Kelly';
type LetterGrades = 'A' | 'B' | 'C' | 'D' | 'F';

const finalGrades: Record<Students, LetterGrades> = {
  Sara: 'B',
  Kelly: 'D',
};

interface Grades {
  assign1: number;
  assign2: number;
}

const gradeData: Record<Students, Grades> = {
  Sara: { assign1: 90, assign2: 85 },
  Kelly: { assign1: 70, assign2: 75 },
};

// Pick and Omit
type AssignResult = Pick<Assignment, 'studentId' | 'grade'>;

const score: AssignResult = {
  studentId: 'CompSci-101',
  grade: 90,
};

type AssignPreview = Omit<Assignment, 'grade' | 'verified'>;

const preview: AssignPreview = {
  studentId: 'CompSci-101',
  title: 'Homework 1',
};

// Exclude and Extract

type adjustedGrade = Exclude<LetterGrades, 'F'>;

type highGrades = Extract<LetterGrades, 'A' | 'B'>;

// Nonnullable

type AllPossibleGrades = 'Dave' | 'John' | null | undefined;

type NamesOnly = NonNullable<AllPossibleGrades>;

// ReturnType

// type newAssign = { title: string; points: number };

const createNewAssign = (title: string, points: number) => {
  return { title, points };
};

type newAssign = ReturnType<typeof createNewAssign>;

const tsAssign: newAssign = createNewAssign('Utility Types', 100);
console.log(tsAssign);

// Parameters

type AssignParams = Parameters<typeof createNewAssign>;

const assignArgs: AssignParams = ['Generics', 100];

const tsAssign2: newAssign = createNewAssign(...assignArgs);
console.log(tsAssign2);

// Awaited - Utility Type - Helps us with the ReturnType of a Promise

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const data = await fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      if (err instanceof Error) console.log(err.message);
    });
  return data;
};

type FetchUsersReturnType = Awaited<ReturnType<typeof fetchUsers>>;

fetchUsers().then((users) => console.log(users));
