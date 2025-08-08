import Image from 'next/image';

const supplies = [
  {
    title: 'Kindergarten - Grade 2',
    image: '/images/AFIS.SchoolSupplies.KG.Grade1.2.jpeg',
  },
  {
    title: 'Grade 3 - Grade 6',
    image: '/images/AFIS.SchoolSupplies.Grade3.6.jpeg',
  },
  {
    title: 'Junior High',
    image: '/images/AFIS.SchoolSupplies.JuniorHigh.jpeg',
  },
];

export default function SchoolSuppliesPage() {
  return (
    <div className="container mx-auto px-4 py-8 pt-32 pb-12">
      <h1 className="text-4xl font-bold text-center mb-12">School Supply Lists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {supplies.map((supply) => (
          <div key={supply.title} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">{supply.title}</h2>
            </div>
            <div className="relative">
              <Image
                src={supply.image}
                alt={`School supply list for ${supply.title}`}
                width={800}
                height={1100}
                layout="responsive"
                objectFit="contain"
              />
            </div>
            <div className="p-6 bg-gray-50 text-center">
              <a
                href={supply.image}
                download
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
              >
                Download List
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
