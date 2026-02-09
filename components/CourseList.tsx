
import React from 'react';
import { Clock, BarChart, ChevronRight } from 'lucide-react';
import { MOCK_COURSES, COLORS } from '../constants.ts';
import { Course } from '../types.ts';

const CourseList: React.FC = () => {
  return (
    <div className="px-6 py-8 sm:py-12 animate-fade-in max-w-7xl mx-auto">
      <div className="mb-10 sm:mb-14">
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">Thư viện khóa học</h2>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">Kiến thức chuẩn FAST quốc tế</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
        {MOCK_COURSES.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <div className="group bg-white rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-teal-900/5 overflow-hidden active:scale-[0.98] transition-all border border-gray-100 flex flex-col h-full">
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" src={course.image} alt={course.title} />
        <div className="absolute top-5 left-5">
          <span className="px-4 py-1.5 bg-white/95 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-[#007c76] shadow-sm">
            {course.tags[0]}
          </span>
        </div>
      </div>
      <div className="p-6 sm:p-8 flex flex-col flex-1">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight mb-4 group-hover:text-[#007c76] transition-colors">
          {course.title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-6 font-medium leading-relaxed flex-1">
          {course.description}
        </p>
        
        <div className="flex items-center gap-5 mb-8">
          <div className="flex items-center text-[10px] sm:text-[11px] font-black text-gray-400 uppercase tracking-tighter">
            <Clock className="mr-2 h-4 w-4 text-teal-500" />
            {course.duration}
          </div>
          <div className="flex items-center text-[10px] sm:text-[11px] font-black text-gray-400 uppercase tracking-tighter">
            <BarChart className="mr-2 h-4 w-4 text-teal-500" />
            {course.level}
          </div>
        </div>

        <button 
          className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 rounded-2xl font-black text-sm text-[#007c76] hover:bg-teal-50 active:scale-95 transition-all group/btn"
        >
          <span>Học ngay</span>
          <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default CourseList;
