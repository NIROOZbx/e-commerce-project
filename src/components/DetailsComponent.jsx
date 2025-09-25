import { ShieldCheck, Truck, Headset, Shirt } from 'lucide-react';
import '../styles/details.css';

function WhyChooseUs() {
    return (
        <section className="py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                {/* Section Header */}
                <div className="text-center" data-aos="fade-up">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Why Choose Jersey Hub?
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Your trusted source for authentic football jerseys and fan apparel.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-4">
                    
                    {/* Feature 1: Authentic Quality */}
                    <div className="bg-white p-8 rounded-xl shadow-lg text-center transition-transform hover:scale-105 cards" data-aos="fade-up">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 ">
                            <ShieldCheck size={32} strokeWidth={2} color='#000000'/>
                        </div>
                        <h3 className="mt-6 text-xl font-semibold text-gray-900">Authentic Quality</h3>
                        <p className="mt-4 text-base text-gray-600">
                            Every jersey is a promise of quality. We source only authentic, top-tier apparel so you can wear your team's colors with pride.
                        </p>
                    </div>

                    {/* Feature 2: Fast Shipping */}
                    <div className="bg-white p-8 rounded-xl shadow-lg text-center transition-transform hover:scale-105 cards" data-aos="fade-up">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600">
                            <Truck size={32} strokeWidth={2} color='#000000' />
                        </div>
                        <h3 className="mt-6 text-xl font-semibold text-gray-900">Fast & Reliable Shipping</h3>
                        <p className="mt-4 text-base text-gray-600">
                            Get your gear when you need it. We offer fast, tracked shipping on all orders, ensuring your jersey arrives safely and on time.
                        </p>
                    </div>

                    {/* Feature 3: Customer Support */}
                    <div className="bg-white p-8 rounded-xl shadow-lg text-center transition-transform hover:scale-105 cards" data-aos="fade-up">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600">
                            <Headset size={32} strokeWidth={2} color='#000000'/>
                        </div>
                        <h3 className="mt-6 text-xl font-semibold text-gray-900">Dedicated Support</h3>
                        <p className="mt-4 text-base text-gray-600">
                            Have a question? Our support team is here to help. We're committed to providing a seamless shopping experience.
                        </p>
                    </div>

                    {/* Feature 4: Unmatched Selection */}
                    <div className="bg-white p-8 rounded-xl shadow-lg text-center transition-transform hover:scale-105 cards" data-aos="fade-up">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600">
                            <Shirt size={32} strokeWidth={2} color='#000000'/>
                        </div>
                        <h3 className="mt-6 text-xl font-semibold text-gray-900">Unmatched Selection</h3>
                        <p className="mt-4 text-base text-gray-600">
                            From the latest season's kits to timeless classics, we offer a vast collection of jerseys from leagues all around the world.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WhyChooseUs;
