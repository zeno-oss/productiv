import { Text } from "./Text";

type LabelProps = {
  title: string;
  required?: boolean;
};

export const Label: React.FC<LabelProps> = (props) => {
  const { title, required = false } = props;
  return (
    <Text className="text-silver my-3 text-sm" variant="semibold">
      {title}{" "}
      {required && (
        <Text className="text-sm text-red-500" variant="semibold">
          *
        </Text>
      )}
    </Text>
  );
};
