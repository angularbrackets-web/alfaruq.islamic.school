import { getTeachers } from '../../lib/getTeachers';
import Image from 'next/image';

export default async function TeachersPage() {
  const teachers = await getTeachers();

  return (
    <div className="container mx-auto px-4 py-8 pt-32 pb-12">
      <h1 className="text-4xl font-bold text-center mb-8">Meet Our Teachers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {teachers.map(teacher => (
          <div key={teacher.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-96">
              <Image
                src={teacher.posterUrl}
                alt={`Poster of ${teacher.name}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{teacher.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
