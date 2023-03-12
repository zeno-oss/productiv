import { HiCheck } from "react-icons/hi";
import { PALETTE } from "variables";

function ColorCircle({
  backgroundColor,
  selected,
  onPress,
}: {
  backgroundColor: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPress}
      style={{
        backgroundColor: PALETTE[backgroundColor as keyof typeof PALETTE],
      }}
      className={`${
        selected ? "ring-2 ring-black" : ""
      } flex h-8 w-8 items-center justify-center rounded-full shadow-[inset_0_-2px_4px_rgba(0,0,0,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2`}
    >
      {selected && <HiCheck className="text-xl" />}
    </button>
  );
}

export default ColorCircle;
