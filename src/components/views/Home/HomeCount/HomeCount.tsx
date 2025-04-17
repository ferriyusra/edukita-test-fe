import "swiper/css"
import "swiper/css/pagination"
import { FaMoneyBill, FaPeopleGroup } from "react-icons/fa6";

const stats = [
  {
    icon: <FaPeopleGroup size={80} className="text-teal-600" />,
    title: '200 People',
    desc: 'Graduates are accepted to work in large international companies',
  },
  {
    icon: <FaMoneyBill size={80} className="text-teal-600" />,
    title: 'Rp.300,500,000',
    desc: 'Scholarships from various foundations that we have shared for free',
  },
  {
    icon: <FaPeopleGroup size={80} className="text-teal-600" />,
    title: '1000 People',
    desc: 'Children who are ready to face international education',
  },
]


const HomeCount = () => {
  return (
    <div className="relative flex flex-col pb-[143px] -mb-[73px]">
      <div className="absolute inset-0 bg-gray-100 -z-30" />
      <section
        id="Stats"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 w-full max-w-[1130px] mx-auto"
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col bg-white rounded-3xl p-6 sm:p-[30px] gap-6 shadow-sm"
          >
            {stat.icon}
            <div className="flex flex-col gap-1.5">
              <p className="font-extrabold text-[28px] sm:text-[32px] leading-[44px] sm:leading-[48px]">
                {stat.title}
              </p>
              <p className="font-semibold text-gray-600 leading-[26px] sm:leading-[28px]">
                {stat.desc}
              </p>
            </div>
          </div>
        ))}
      </section>

    </div>
  )
}

export default HomeCount;