import { Composition } from "remotion";
import { DigiBucketListVideo } from "./DigiBucketList";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="DigiBucketList"
      component={DigiBucketListVideo}
      durationInFrames={510}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
