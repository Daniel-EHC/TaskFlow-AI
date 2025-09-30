import React from 'react';
import { CalendarClock, Flame, ListChecks, PieChart, Target } from 'lucide-react';

interface TaskInsightsProps {
  stats: {
    totalCount: number;
    completedCount: number;
    completionRate: number;
    highPriorityCount: number;
    dueTodayCount: number;
    dueSoonCount: number;
  };
}

export const TaskInsights: React.FC<TaskInsightsProps> = ({ stats }) => {
  const insights = [
    {
      label: 'Total tasks',
      value: stats.totalCount,
      icon: <ListChecks className="w-5 h-5 text-blue-600" />,
      helper: 'Overall tasks you are tracking',
    },
    {
      label: 'Completion rate',
      value: `${stats.completionRate}%`,
      icon: <PieChart className="w-5 h-5 text-emerald-600" />,
      helper: `${stats.completedCount} completed so far`,
    },
    {
      label: 'High priority',
      value: stats.highPriorityCount,
      icon: <Target className="w-5 h-5 text-rose-600" />,
      helper: 'Marked as urgent by AI',
    },
    {
      label: 'Due today',
      value: stats.dueTodayCount,
      icon: <CalendarClock className="w-5 h-5 text-amber-600" />,
      helper: 'Scheduled for the next 24 hours',
    },
    {
      label: 'Due soon',
      value: stats.dueSoonCount,
      icon: <Flame className="w-5 h-5 text-purple-600" />,
      helper: 'Coming up in the next 7 days',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-8">
      {insights.map((insight) => (
        <div
          key={insight.label}
          className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-transparent hover:border-blue-200 transition-colors"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-full bg-blue-50">{insight.icon}</div>
            <div className="text-sm font-semibold text-gray-600">{insight.label}</div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{insight.value}</div>
          <div className="text-xs text-gray-500">{insight.helper}</div>
        </div>
      ))}
    </div>
  );
};
