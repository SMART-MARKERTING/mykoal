import mykoalHeadshot from "@assets/image_1772497805986.png";
import cameronHeadshot from "@assets/image_1772497797113.png";

const teamMembers = [
  {
    name: "Mykoal DeShazo",
    title: "Vice President",
    image: mykoalHeadshot,
    nmls: "NMLS 1912347",
  },
  {
    name: "Cameron Thomas",
    title: "Junior Loan Officer",
    image: cameronHeadshot,
    nmls: "",
  },
];

export default function TeamSection({ variant = "full" }: { variant?: "full" | "compact" }) {
  if (variant === "compact") {
    return (
      <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-center text-white text-xl font-bold mb-6">The Team</h3>
        <div className="flex justify-center gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="text-center">
              <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-blue-400/50">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="text-white font-semibold text-sm">{member.name}</div>
              <div className="text-blue-300 text-xs">{member.title}</div>
              {member.nmls && (
                <div className="text-blue-200/60 text-xs mt-1">{member.nmls}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">The Team</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Dedicated professionals committed to helping you achieve your mortgage and investment goals.
          </p>
        </div>
        <div className="flex justify-center gap-12 flex-wrap">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-8 text-center w-72 hover:shadow-xl transition-shadow"
            >
              <div className="w-36 h-36 mx-auto mb-5 rounded-full overflow-hidden border-4 border-blue-100 dark:border-blue-900">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mt-1">{member.title}</p>
              {member.nmls && (
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{member.nmls}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
