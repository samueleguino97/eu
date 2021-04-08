import { makeStyles } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
const useStyles = makeStyles({
  container: {
    height: '100%',
  },
});

function Camera(props) {
  const ref = useRef();
  const { setDefaultCamera } = useThree();
  // Make the camera known to the system
  useEffect(() => void setDefaultCamera(ref.current), []);
  // Update it every frame
  useFrame(() => ref.current.updateMatrixWorld());
  return <perspectiveCamera ref={ref} {...props} />;
}
export type HomeProps = {};
function Plane({ children, ...props }) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    // mesh.current.rotation.x = -Math.PI / 3;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      receiveShadow
      rotation={[5, 0, 0]}
      position={[0, -1, 0]}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <planeGeometry args={[2000, 4000, 256, 256]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'brown'} />
      {children}
    </mesh>
  );
}
function Sphere() {
  const ref = useRef();

  return (
    <mesh
      ref={ref}
      visible
      userData={{ test: 'hello' }}
      rotation={[0, 0, 0]}
      position={[0, 4, 1]}
      castShadow
    >
      <sphereGeometry attach="geometry" args={[1, 32, 32]} />
      <meshStandardMaterial
        attach="material"
        color="red"
        transparent
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
}

function Home({}: HomeProps) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        <Plane>
          <fog args={['black', 1, 2]} />
          <Sphere />
        </Plane>
      </Canvas>
    </div>
  );
}

export default Home;
