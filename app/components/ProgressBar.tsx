const ProgressBar = ({ progress }: { progress: number }) => (
    <div className="relative rounded-full w-15 h-2 bg-neutral-0 border border-neutral-9">
        <div
            className="absolute top-0 left-0 h-full bg-neutral-9 rounded-full"
            style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
        />
    </div>
);

export default ProgressBar;
