import { Car, Package, ShoppingBag, UtensilsCrossed } from 'lucide-react';

export default function Services() {
    const services = [
        {
            icon: Car,
            title: "Ride Hailing",
            description: "Get a ride in minutes with our reliable drivers. Safe, fast, and affordable transportation whenever you need it.",
            color: "from-green-500 to-green-600"
        },
        {
            icon: UtensilsCrossed,
            title: "Food Delivery",
            description: "Delicious meals from your favorite restaurants delivered hot and fresh to your doorstep in under 30 minutes.",
            color: "from-green-400 to-green-500"
        },
        {
            icon: Package,
            title: "Package Delivery",
            description: "Send packages across the city with real-time tracking. Fast, secure, and reliable delivery service you can trust.",
            color: "from-green-600 to-green-700"
        },
        {
            icon: ShoppingBag,
            title: "Grocery Delivery",
            description: "Fresh groceries and essentials delivered from local stores. Shop from home and get everything you need delivered.",
            color: "from-green-500 to-green-600"
        }
    ];

    return (
        <div id='services' className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-16">
                <h2 className='relative w-fit text-2xl font-black pb-3 mb-8 before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-1/2 before:h-2 before:bg-[var(--primary)] before:rounded-full'>Our Services</h2>
                <p className="text-sm text-gray-600 max-w-lg">
                    Experience the future of on-demand services. From rides to deliveries,
                    we&apos;ve got everything you need at your fingertips.
                </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, index) => {
                    const IconComponent = service.icon;
                    return (
                        <div
                            key={index}
                            className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                        >
                            {/* Background gradient on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                            {/* Content */}
                            <div className="relative z-10">
                                {/* Icon */}
                                <div className={`inline-flex p-4 rounded-xl bg-[var(--primary)] mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <IconComponent className="w-8 h-8 text-white" />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl text-black mb-4 group-hover:text-green-600 transition-colors duration-300">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {service.description}
                                </p>

                                {/* Learn More Link */}
                                {/* <div className="mt-6">
                                    <span className="inline-flex items-center text-green-600 group-hover:text-green-700 transition-colors duration-300 cursor-pointer">
                                        Learn more
                                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </div> */}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* CTA Section */}
            {/* <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 md:p-12 text-white">
                        <h3 className="text-2xl md:text-3xl mb-4">
                            Ready to get started?
                        </h3>
                        <p className="text-green-100 mb-8 text-lg max-w-2xl mx-auto">
                            Download our app today and experience the convenience of on-demand services
                            right at your fingertips.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-green-600 px-8 py-4 rounded-xl transition-all duration-300 hover:bg-gray-50 hover:shadow-lg transform hover:-translate-y-1">
                                Download for iOS
                            </button>
                            <button className="bg-green-700 text-white px-8 py-4 rounded-xl border border-green-400 transition-all duration-300 hover:bg-green-800 hover:shadow-lg transform hover:-translate-y-1">
                                Download for Android
                            </button>
                        </div>
                    </div>
                </div> */}
        </div>
    );
}