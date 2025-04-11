const ChatSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 animate-pulse max-w-xl mx-auto w-full">
      {Array(4)
        .fill()
        .map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-10 h-10 bg-white dark:bg-prdark rounded" />
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-10 bg-white dark:bg-prdark rounded w-1/2" />
              <div className="h-12 bg-white dark:bg-prdark rounded w-3/4" />
              <div className="h-8 bg-white dark:bg-prdark rounded w-full" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChatSkeleton;
