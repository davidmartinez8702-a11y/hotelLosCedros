interface BIHeaderProps {
    title: string;
    subtitle: string;
    tip?: string;
  }
  
  export function BIHeader({ title, subtitle, tip }: BIHeaderProps) {
    return (
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-xl">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
          <p className="text-purple-100 text-lg">{subtitle}</p>
          {tip && <p className="text-purple-200 text-sm mt-2">{tip}</p>}
        </div>
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-32 w-32 rounded-full bg-white/10 blur-3xl"></div>
      </div>
    );
  }