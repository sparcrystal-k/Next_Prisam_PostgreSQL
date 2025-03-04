interface IToggleProps {
  label: string;
  leftLabel?: string;
  checked: boolean;
  onChange?: (value: any) => void;
}

export default function Toggle({
  leftLabel = null,
  label,
  checked,
  onChange,
}: IToggleProps) {
  return (
    <label className="inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        checked={checked || false}
        className="peer sr-only"
        onChange={(e) => {
          onChange(e.target.checked);
        }}
      />
      {leftLabel && (
        <span className="mr-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          {leftLabel}
        </span>
      )}
      <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
      <span className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </span>
    </label>
  );
}
