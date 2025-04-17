import Image from "next/image"
import {
  FaFlagUsa,
  FaFlag,
} from 'react-icons/fa6';

const HomeTeacher = () => {
  return (
    <>
      <section className="mt-20 px-4 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center">
          Known Our Teachers
        </h2>

        <div className="space-y-16">
          {/* Teacher Paul */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Image
              src="/images/teacher/paul.png"
              alt="Teacher Paul"
              width={100}
              height={100}
              className="rounded-full border-4 border-white"
            />
            <div>
              <p className="flex items-center gap-2 font-bold text-teal-600">
                <FaFlagUsa className="text-xl" /> Teacher Paul
              </p>
              <p>
                Teacher Paul sudah{' '}
                <span className="font-semibold text-blue-700">
                  berpengalaman mengajar bahasa Inggris selama 7 tahun.
                </span>{' '}
                Berasal dari Amerika Serikat, Teacher Paul pernah tinggal di 3
                negara lainnya dan punya kambing peliharaan yang bernama
                Snowflake
              </p>
            </div>
          </div>

          {/* Teacher Savannah */}
          <div className="flex flex-col sm:flex-row-reverse items-center gap-6">
            <Image
              src="/images/teacher/savannah.png"
              alt="Teacher Savannah"
              width={100}
              height={100}
              className="rounded-full border-4 border-white"
            />
            <div>
              <p className="flex items-center gap-2 font-bold text-teal-600">
                <FaFlag className="text-xl" /> Teacher Savannah
              </p>
              <p>
                Teacher Savannah gemar{' '}
                <span className="font-semibold text-blue-700">
                  menciptakan suasana yang seru selama di kelas!
                </span>{' '}
                Selain menikmati perkembangan muridnya di kelas, Teacher Savannah
                pun senang belajar mengenai kebudayaan Indonesia dari
                murid-muridnya
              </p>
            </div>
          </div>

          {/* Teacher Amanda */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Image
              src="/images/teacher/amanda.png"
              alt="Teacher Amanda"
              width={100}
              height={100}
              className="rounded-full border-4 border-white"
            />
            <div>
              <p className="flex items-center gap-2 font-bold text-teal-600">
                <FaFlagUsa className="text-xl" /> Teacher Amanda
              </p>
              <p>
                Teacher Amanda adalah guru bahasa Inggris dari Ohio, Amerika
                Serikat. Sering menggunakan{' '}
                <span className="italic">headband</span> menggemaskan selama di
                kelas, Teacher Amanda sangat percaya bahwa{' '}
                <span className="font-semibold text-blue-700">
                  belajar itu sudah seharusnya menyenangkan!
                </span>
              </p>
            </div>
          </div>

          {/* Teacher Shawn */}
          <div className="flex flex-col sm:flex-row-reverse items-center gap-6">
            <Image
              src="/images/teacher/shawn.png"
              alt="Teacher Shawn"
              width={100}
              height={100}
              className="rounded-full border-4 border-white"
            />
            <div>
              <p className="flex items-center gap-2 font-bold text-teal-600">
                <FaFlag className="text-xl" /> Teacher Shawn
              </p>
              <p>
                Teacher Shawn adalah guru bahasa Inggris dari Amerika Serikat{' '}
                <span className="font-semibold text-blue-700">
                  dengan spesialisasi dalam mengajar anak usia 7-12 tahun.
                </span>{' '}
                Teacher Shawn ternyata adalah pecinta satwa dan sudah mengadopsi lebih dari 400 satwa!
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default HomeTeacher;