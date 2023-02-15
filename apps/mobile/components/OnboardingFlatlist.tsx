import { OnboardingSlideData } from "$types";
import { Dimensions, FlatList, NativeScrollEvent, View } from "react-native";
import { Text } from "./Text";

type OnboardingFlatlistProps = {
  data: readonly any[];
  activeSlideIndex: number;
  setActiveSlideIndex: (index: number) => void;
  flatListRef: React.RefObject<FlatList<OnboardingSlideData>>;
};

export const OnboardingFlatlist: React.FC<OnboardingFlatlistProps> = (
  props,
) => {
  const { data, activeSlideIndex, setActiveSlideIndex, flatListRef } = props;

  const width = Dimensions.get("window").width;

  const handleMomentumScrollEnd = (e: { nativeEvent: NativeScrollEvent }) => {
    const offset = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offset / width);

    if (newIndex === activeSlideIndex) {
      // No page change, don't do anything
      return;
    }
    setActiveSlideIndex(newIndex);
  };

  const renderSlide = ({ item }: { item: OnboardingSlideData }) => {
    return (
      <View className="flex-1 " style={{ width }}>
        <View className="flex-1 items-center justify-around">
          <View className="mt-16 min-h-[150px] flex-1 items-center justify-center">
            {item.Icon}
          </View>
          <View className="flex-row items-center px-10 pb-4 pt-[10%]">
            <Text
              allowFontScaling={false}
              variant="bold"
              className="flex-wrap text-center text-2xl"
            >
              {item.title}
            </Text>
          </View>
          <View className="flex-row items-center px-16 pb-8">
            <Text
              allowFontScaling={false}
              className="flex-1 flex-wrap text-center text-sm"
            >
              {item.subtitle}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      pagingEnabled
      data={data}
      contentContainerStyle={{ height: "100%" }}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={renderSlide}
      onMomentumScrollEnd={handleMomentumScrollEnd}
      ref={flatListRef}
      bounces={false}
      style={{ flex: 1, flexDirection: "row" }}
      keyExtractor={(_, index: number) => index.toString()}
    />
  );
};
