import { useLoader } from "@react-three/fiber";
import { ARCanvas, useHitTest } from "@react-three/xr";
import { Suspense, useEffect, useRef } from "react";
import { Mesh, Vector3 } from "three";
import { MMDLoader } from "three/examples/jsm/loaders/MMDLoader";
import VConsole from "vconsole";

const ARApp = () => {
  const ref = useRef<Mesh>(null);
  const nodes = useLoader(MMDLoader, "/model/柴田式初音ミク.pmx");

  useHitTest((hitMatrix) => {
    if (!ref.current) {
      return;
    }
    const { position, quaternion } = ref.current;
    hitMatrix.decompose(position, quaternion, new Vector3(0.1, 0.1, 0.1));
  });

  return <primitive ref={ref} object={nodes} dispose={null} scale={0.1} />;
};

const App = () => {
  useEffect(() => {
    const vConsole = new VConsole({ theme: "dark" });
    console.log(new Vector3(1, 1, 1).multiplyScalar(0.01));
    return () => {
      vConsole.destroy();
    };
  }, []);

  return (
    <>
      <ARCanvas sessionInit={{ requiredFeatures: ["hit-test"] }}>
        <Suspense fallback={null}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <ARApp />
        </Suspense>
      </ARCanvas>
    </>
  );
};

export default App;
