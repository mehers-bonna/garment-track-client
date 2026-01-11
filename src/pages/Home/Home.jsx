import { Link } from 'react-router';
import Products from '../../components/Home/Products';
import Banner from '../../components/Banner/Banner';
import BrandsSection from '../../components/BrandSection/BrandSection';
import TeamSection from '../../components/TeamSection/TeamSection';
import FeedbackSection from '../../components/FeedbackSection/FeedbackSection';
import CategoriesSection from '../../components/Categories Section/CategoriesSection';
import FAQSection from '../../components/FAQ Section/FAQSection';
import StatisticsSection from '../../components/Statistics Section/StatisticsSection';

// Newly created sections

const Home = () => {
  return (
    <div className="space-y-16 pb-20 overflow-x-hidden bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
      
      {/* 1. Banner Section (Full Width) */}
      <section>
        <Banner />
      </section>

      {/* 2. Statistics Section (Banner-er niche, Standardized w-9/12) */}
      <section >
        <StatisticsSection />
      </section>

      {/* 3. Featured Products Section (Standardized w-9/12) */}
      <section className="w-9/12 mx-auto">
        <h2 className='text-3xl md:text-5xl font-bold text-center mt-8 mb-12 text-[#442C2E] dark:text-[#FEEAE6]'>
          Our Featured Products
        </h2>
        
        <div className="w-full">
          <Products limit={6} />
        </div>

        <div className="text-center mt-12">
          <Link
            to="/all-products"
            className="bg-[#442C2E] dark:bg-[#D6A99D] text-white dark:text-[#442C2E] px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#D6A99D] dark:hover:bg-[#FEEAE6] transition-all"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* 4. Categories Section */}
      <section >
        <CategoriesSection />
      </section>

      {/* 5. Brands Section */}
      <section className="w-9/12 mx-auto">
        <BrandsSection />
      </section>

      {/* 6. Team Section */}
      <section className="w-9/12 mx-auto">
        <TeamSection />
      </section>

      {/* 7. Feedback Section */}
      <section className="w-9/12 mx-auto">
        <FeedbackSection />
      </section>

      {/* 8. FAQ Section */}
      <section >
        <FAQSection />
      </section>

    </div>
  );
};

export default Home;