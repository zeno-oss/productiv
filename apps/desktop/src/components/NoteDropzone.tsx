import { Group, Text, rem, useMantineTheme } from "@mantine/core";

import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { flushSync } from "react-dom";
import { HiPhotograph, HiX } from "react-icons/hi";

export function NoteDropzone(
  // props: Partial<DropzoneProps>,
  {
    setFiles,
  }: { setFiles: React.Dispatch<React.SetStateAction<File[] | undefined>> },
) {
  const theme = useMantineTheme();
  return (
    <Dropzone
      onDrop={(files) => {
        console.log("accepted files", files);
        flushSync(() => setFiles(files));
      }}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={3 * 1024 ** 2}
      maxFiles={5}
      accept={IMAGE_MIME_TYPE}
      // {...props}
    >
      <Group
        position="center"
        spacing="lg"
        style={{
          minHeight: rem(100),
          pointerEvents: "none",
        }}
      >
        <Dropzone.Accept>
          <HiPhotograph size="3.2rem" />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <HiX
            size="3.2rem"
            color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <HiPhotograph size="3.2rem" />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Attach upto 5 files, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
