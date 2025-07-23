import { faker } from '@faker-js/faker';

export interface Data {
 id?: string;
 name?: string;
 post?: string;
 likers?: string[];
 avatar?: string;
 likeTotal: number;
 commentTotal: number;
}


const data: Data[] = new Array(10).fill(0).map((_, i) => {
  return { id: i, name: faker.person.fullName(), post: faker.helpers.arrayElement([
    faker.lorem.sentence(),
    faker.lorem.sentences({ min: 2, max: 5 }),
    faker.lorem.paragraphs({ min: 1, max: 3 }),
    faker.lorem.text(),
  ]), isLiked: false, likeTotal: 0, commentTotal: 0, likers: [], 
  avatar: faker.image.avatar() };
});

export const searchData = async (query: string) => {
  const result = await new Promise((resolve) => {
    setTimeout(() => {
      const filteredData = data.filter(person => person.name.toLowerCase().includes(query.toLowerCase()));
      resolve(filteredData); 
    }, 500)
  });
  return result;
};
