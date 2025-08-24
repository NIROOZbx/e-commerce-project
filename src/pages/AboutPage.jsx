import Navbar from "../components/Navbar";

function AboutPage() {
  return (
    <> 
    <Navbar/>
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-12 px-6 mt-12">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Jersey Hub</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Welcome to <span className="font-semibold">Jersey Hub</span> – your one-stop destination 
          for authentic football jerseys. Whether you’re a die-hard fan or just love 
          repping your favorite team, we bring you high-quality jerseys at affordable prices.  
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed mb-8">
          At Jersey Hub, our mission is simple: 
          to connect fans with the gear they love. We believe every supporter 
          deserves to wear their team’s colors with pride, without breaking the bank.  
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Us?</h2>
        <ul className="list-disc text-left text-gray-700 space-y-2 pl-6 mb-8 text-black">
          <li>✔ Wide range of teams, leagues, and player jerseys</li>
          <li>✔ Affordable pricing with premium quality</li>
          <li>✔ Easy returns and secure checkout</li>
          <li>✔ Dedicated customer support</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Join the Jersey Hub Community</h2>
        <p className="text-gray-700 leading-relaxed">
          We’re more than just an online store – we’re a community of fans. 
          Stay connected with us for the latest jersey drops, exclusive offers, 
          and football discussions.  
        </p>
      </div>
    </div>
    </>
  );
}

export default AboutPage;
