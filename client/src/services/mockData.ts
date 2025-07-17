import { faker } from '@faker-js/faker';

export interface Data {
 id?: string;
 name?: string;
 avatar?: string;
}


const data: Data[] = new Array(100).fill(0).map((_, i) => {
  return { id: i, name: faker.person.fullName(),
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