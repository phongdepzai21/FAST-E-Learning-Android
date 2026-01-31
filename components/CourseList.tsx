import React from 'react';
import { Clock, BarChart } from 'lucide-react';
import { MOCK_COURSES, COLORS } from '../constants';
import { Course } from '../types';

interface CourseListProps {
  // Can extend later for filtering
}

const CourseList: React.FC<CourseListProps> = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: COLORS.text }}>
            Danh sách khóa học
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Nâng cao năng lực chuyên môn với các khóa đào tạo chuyên sâu về an toàn thực phẩm.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_COURSES.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="flex-shrink-0">
        <img className="h-48 w-full object-cover" src={course.image} alt={course.title} />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <div className="flex space-x-2">
            {course.tags.map(tag => (
              <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                {tag}
              </span>
            ))}
          </div>
          <a href="#" className="block mt-2">
            <p className="text-xl font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
              {course.title}
            </p>
            <p className="mt-3 text-base text-gray-500 line-clamp-3">
              {course.description}
            </p>
          </a>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
            <p>{course.duration}</p>
          </div>
           <div className="flex items-center text-sm text-gray-500">
            <BarChart className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
            <p>{course.level}</p>
          </div>
        </div>
        <button 
          className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          style={{ backgroundColor: COLORS.primary }}
        >
          Đăng ký ngay
        </button>
      </div>
    </div>
  );
};

export default CourseList;