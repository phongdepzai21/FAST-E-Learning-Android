
import React from 'react';
import { Clock, BarChart, ChevronRight } from 'lucide-react';
import { MOCK_COURSES, COLORS } from '../constants.ts';
import { Course } from '../types.ts';

const CourseList: React.FC = () => {
  return (
    <div className="bg-[#f8fafb] min-h-screen px-6 py-8 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Thư viện khóa học</h2>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Nâng tầm kiến thức chuẩn FAST</p>
      </div>

      <div className="space-y-6">
        {MOCK_COURSES.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <div className="group bg-white rounded-[2rem] shadow-sm overflow-hidden active:scale-[0.98] transition-all border border-gray-50">
      <div className="relative h-40">
        <img className="h-full w-full object-cover" src={course.image} alt={course.title} />
        <div className="absolute top-4 left-4 flex gap-2">
          {course.tags.slice(0, 1).map(tag => (
            <span key={tag} className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[9px] font-black uppercase tracking-widest text-[#007c76]">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 group-hover:text-[#007c76] transition-colors">
          {course.title}
        </h3>
        
        <div className="flex items-center gap-4 mt-4 mb-6">
          <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-tighter">
            <Clock className="mr-1 h-3 w-3" />
            {course.duration}
          </div>
          <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-tighter">
            <BarChart className="mr-1 h-3 w-3" />
            {course.level}
          </div>
        </div>

        <button 
          className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 rounded-2xl font-black text-sm text-[#007c76] active:bg-teal-50 transition-colors"
        >
          <span>Bắt đầu học ngay</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default CourseList;
