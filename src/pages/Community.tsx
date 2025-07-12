import React from 'react';

const testimonials = [
  {
    name: 'Aarav Shah',
    message: 'I saved money and the planet — all while finding the coolest vintage jackets!',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Meera Patel',
    message: 'The community is so positive and helpful. I swapped 6 outfits in a month!',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Liam Johnson',
    message: 'Swapping clothes here is so easy. I love seeing my old clothes get a new life!',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    name: 'Sophia Lee',
    message: 'I’ve met so many like-minded people. Sustainable fashion is the future!',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'Carlos Martinez',
    message: 'Great platform for eco-friendly fashion. Highly recommend to everyone!',
    image: 'https://randomuser.me/api/portraits/men/28.jpg',
  },
  {
    name: 'Emily Chen',
    message: 'I found unique pieces and made new friends. The swap process is seamless!',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

const Community: React.FC = () => {
  return (
    <div className="min-h-screen bg-green-50 py-12 px-6 md:px-20">
      <h1 className="text-4xl font-bold text-center mb-10 text-green-800">Our Community</h1>

      <div className="mb-16 text-center max-w-2xl mx-auto text-lg text-gray-700">
        <p>
          ReWear is more than just clothing exchange — it's a movement. Our community is made up of eco-conscious individuals who believe in sustainable fashion, reducing waste, and building a better world together.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        {testimonials.map((user, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <div className="flex items-center mb-4">
              <img
                src={user.image}
                alt={user.name}
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <h4 className="text-lg font-semibold">{user.name}</h4>
            </div>
            <p className="text-gray-600 italic">“{user.message}”</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;