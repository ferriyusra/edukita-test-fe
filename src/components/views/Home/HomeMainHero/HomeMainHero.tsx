import {
  FaCheck,
  FaTrophy,
  FaCrown,
  FaRankingStar,
  FaBuildingLock,
} from 'react-icons/fa6';

const HomeMainHero = () => {
  return (
    <main className='flex flex-col flex-1 justify-center'>
      {/* Pricing Section */}
      <section
        id='pricing'
        className='flex flex-col items-center gap-10 mt-12 px-4 w-full'>
        <div className='flex flex-col items-center gap-2.5 max-w-xl w-full'>
          <p className='flex items-center gap-2 rounded-full py-2 px-4 bg-teal-600'>
            <FaCrown size={20} />
            <span className='font-bold text-sm text-white'>Try Now!</span>
          </p>
          <h1 className='font-bold text-[28px] leading-[42px] text-center'>
            Pricing For Everyone
          </h1>
          <p className='text-gray-500 text-center leading-7'>
            The prices we set are relatively cheap, but the mentors still
            provide international standard quality.
          </p>
        </div>

        <div className='flex flex-col md:flex-row items-center justify-center gap-6 w-full'>
          {/* Beasiswa */}
          <div className='flex flex-col w-full max-w-xs rounded-2xl p-6 border border-gray-200 gap-5 bg-white'>
            <div className='flex items-center gap-4'>
              <FaRankingStar size={30} />
              <h2 className='font-bold text-xl'>Beasiswa</h2>
            </div>
            <div>
              <p className='font-bold text-3xl'>Rp 0</p>
              <p className='mt-1 text-gray-500'>3 months duration</p>
            </div>
            <hr className='border-gray-200' />
            <ul className='flex flex-col gap-2'>
              <li className='flex items-center gap-2 font-semibold'>
                <FaCheck size={20} />
                Get 12 Class in 1 Week
              </li>
              <li className='flex items-center gap-2 font-semibold'>
                <FaCheck size={20} />
                10-15 Student Each Class
              </li>
              <li className='flex items-center gap-2 font-semibold'>
                <FaCheck size={20} />
                Native Speaker Teacher
              </li>
            </ul>
            <hr className='border-gray-200' />
            <button className='w-full h-11 rounded-full bg-gray-200 text-gray-500 font-semibold'>
              Sold Out
            </button>
          </div>

          {/* Pro Talent */}
          <div className='flex flex-col w-full max-w-xs rounded-2xl border-2 border-teal-600 bg-white overflow-hidden'>
            <p className='text-center text-white py-2 bg-teal-600 font-semibold'>
              Most Popular Package
            </p>
            <div className='flex flex-col gap-5 p-6'>
              <div className='flex items-center gap-4'>
                <FaTrophy size={45} />
                <h2 className='font-bold text-xl'>Reguler</h2>
              </div>
              <div>
                <p className='font-bold text-3xl'>Rp 339.000</p>
                <p className='mt-1 text-gray-500'>1 Month Duration</p>
              </div>
              <hr className='border-gray-200' />
              <ul className='flex flex-col gap-2'>
                {[
                  'Access 1500+ Online Courses',
                  'Get Premium Certifications',
                  'High Quality Work Portfolio',
                  'Career Consultation 2025',
                  'Support learning 24/7',
                ].map((feature, idx) => (
                  <li
                    key={idx}
                    className='flex items-center gap-2 font-semibold'>
                    <FaCheck size={20} />
                    {feature}
                  </li>
                ))}
              </ul>
              <hr className='border-gray-200' />
              <a
                href='/checkout'
                className='w-full h-11 rounded-full bg-teal-600 text-white text-center py-2 font-semibold hover:shadow-md transition'>
                Get Class!
              </a>
            </div>
          </div>

          {/* Business */}
          <div className='flex flex-col w-full max-w-xs rounded-2xl p-6 border border-gray-200 gap-5 bg-white'>
            <div className='flex items-center gap-4'>
              <FaBuildingLock size={30}
              />
              <h2 className='font-bold text-xl'>Build your own class</h2>
            </div>
            <hr className='border-gray-200' />
            <p className='text-lg font-bold'>Private</p>
            <p className='text-gray-500 leading-7'>Semi Private</p>
            <p className='text-gray-500 leading-7'>Costumize Program</p>
            <hr className='border-gray-200' />
            <a
              href='#'
              className='w-full h-11 rounded-full border border-gray-300 text-center pt-2 font-semibold hover:border-teal-600 transition'>
              Contact Sales
            </a>
          </div>
        </div>
      </section>

    </main>
  );
};

export default HomeMainHero;
