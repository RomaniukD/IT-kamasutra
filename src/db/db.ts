export type CourseType = {
  id: number,
  title: string,
  studentsCount: number
}
export type AdressType = {
  id: number,
  title:string
}

export type DBType = {courses: CourseType[], adresess: AdressType[]}

export const db: DBType = {
  courses: [
    {id: 1, title: 'Introduction to Programming', studentsCount: 12},
    {id: 2, title: 'back-end', studentsCount: 12},
    {id: 3, title: 'automation qa', studentsCount: 12},
    {id: 4, title: 'devops', studentsCount: 12}
  ],
  adresess: [
    {id:1, title: 'Nezaleznosti 21'},
    {id:2, title: 'Browarna 1'},
    {id:3, title: 'Mechanizatoriw 16'},

  ]
}
