export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-7 w-7 border border-foreground">
        <div className="absolute inset-1 bg-signal" />
        <div className="absolute right-0 top-0 h-2 w-2 bg-foreground" />
      </div>
      <div className="font-display text-[20px] font-extrabold tracking-tight">
        SYSTEM<span className="text-signal">IQ</span>
      </div>
    </div>
  );
}
