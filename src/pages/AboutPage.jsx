import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function AboutPage() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-8 tracking-tight">
            About Jersey Hub
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Your trusted source for authentic football jerseys. 
            Quality gear for passionate fans.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We connect fans with authentic jerseys at fair prices. 
                Every supporter deserves to wear their team's colors with pride.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Simple. Quality. Affordable.
              </p>
            </div>
            <div className="bg-white p-12 rounded-lg">
              <div className="text-center">
                <div className="text-4xl font-light text-gray-900 mb-2">50,000+</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-light text-gray-900 mb-16 text-center">
            Why Choose Us
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Wide Selection</h3>
                <p className="text-gray-600 leading-relaxed">
                  Jerseys from major leagues and teams worldwide. 
                  Find your favorite team and player.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Premium Quality</h3>
                <p className="text-gray-600 leading-relaxed">
                  Authentic materials and construction. 
                  Each jersey meets our high standards.
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Fair Pricing</h3>
                <p className="text-gray-600 leading-relaxed">
                  Quality doesn't require premium prices. 
                  Affordable jerseys without compromise.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Easy Returns</h3>
                <p className="text-gray-600 leading-relaxed">
                  Simple return process with dedicated support. 
                  Your satisfaction is our priority.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-light text-gray-900 mb-2">500+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">Team Jerseys</div>
            </div>
            <div>
              <div className="text-3xl font-light text-gray-900 mb-2">98%</div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-light text-gray-900 mb-2">50+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-light text-gray-900 mb-2">24/7</div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-8">
            Join Our Community
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-12">
            More than a store – we're a community of football fans. 
            Stay connected for latest releases and exclusive offers.
          </p>
          
          <div className="bg-gray-50 p-12 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-4">Get Updates</h3>
            <p className="text-gray-600 mb-8">
              Latest jersey drops and exclusive member offers.
            </p>
            <button className="bg-gray-900 text-white px-8 py-3 rounded font-medium hover:bg-gray-800 transition-colors">
              Join Now
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default AboutPage;