import { GoogleLogo } from "$themes";
import { View } from "react-native";
import { PrimaryButton } from "./PrimaryButton";

export interface OnboardingFooterProps {
  activeSlideIndex: number;
  numberOfSlides: number;
  onGoToSlide: (newSlideNumber?: number) => void;
  onStart: () => void;
}

export const OnboardingFooter: React.FC<OnboardingFooterProps> = (props) => {
  const { activeSlideIndex, numberOfSlides } = props;

  return (
    <View>
      <View className="h-12 justify-between p-4">
        <View className="mt-6 flex-row items-center justify-center">
          {new Array(numberOfSlides).fill(1).map((_, index) => (
            <View
              className={`bg-silver mx-1 h-1 w-1 rounded-md ${
                activeSlideIndex === index ? "w-5 bg-teal-500" : ""
              }`}
              key={index}
            />
          ))}
        </View>
      </View>
      <OnboardingFooterButtons {...props} />
    </View>
  );
};

const OnboardingFooterButtons: React.FC<OnboardingFooterProps> = (props) => {
  const { activeSlideIndex, numberOfSlides, onGoToSlide, onStart } = props;

  if (activeSlideIndex < numberOfSlides - 2) {
    return (
      <View className="h-44 flex-row items-center space-x-6">
        <PrimaryButton
          title="Skip"
          textClasses="text-black"
          className="w-32 border border-black bg-transparent"
          onPress={() => {
            onGoToSlide(numberOfSlides - 1);
          }}
        />
        <PrimaryButton
          title="Next"
          className="w-32 bg-teal-500"
          onPress={() => onGoToSlide()}
        />
      </View>
    );
  }

  if (activeSlideIndex === numberOfSlides - 2) {
    return (
      <View className="h-44 flex-row items-center space-x-6">
        <PrimaryButton
          onPress={() => onGoToSlide()}
          title="Start Your Journey"
          className="bg-teal-500"
        />
      </View>
    );
  }

  return (
    <View className="h-44 flex-row items-center space-x-6">
      <PrimaryButton
        onPress={onStart}
        title="Sign in"
        icon={<GoogleLogo />}
        className="bg-teal-500"
        // rightIcon={<GoogleLogo style={{ marginLeft: 10 }} />}
      />
    </View>
  );
};
