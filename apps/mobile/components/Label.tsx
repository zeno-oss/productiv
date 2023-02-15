import { Text } from "./Text";

type LabelProps = {
  title: string;
};

export const Label: React.FC<LabelProps> = (props) => {
  const { title } = props;
  return (
    <Text className="text-gray my-3 text-sm" variant="semibold">
      {title}
    </Text>
  );
};
