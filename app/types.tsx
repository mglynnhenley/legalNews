export type IndividualPost = {
  id: string;
  type: string;
  image: string;
  title: string;
  subtitle: string;
  text?: string;
};

export type Posts = IndividualPost[];
