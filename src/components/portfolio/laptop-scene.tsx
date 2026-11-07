import { useEffect, useState, useRef, type MutableRefObject, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import type { Group } from "three";


/**
 * Scroll-driven exploded laptop — an artistic concept model, not real hardware.
 * Geometry is procedural (no external model). Explosion progress comes from the
 * wrapper's scroll listener via a ref, so scrolling never re-renders React.
 */

type Vec3 = [number, number, number];
type PartDef = { id: string; base: Vec3; dir: Vec3; mag: number; start: number; end: number };

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (v: number) => { const x = clamp01(v); return x * x * (3 - 2 * x); };

// Assembled positions; dir/mag describe how each part separates while scrolling.
const PARTS = [
  { id: "screen", base: [0, 1.05, -1.12], dir: [0, 1, -0.4], mag: 2.3, start: 0.0, end: 0.62 },
  { id: "deck", base: [0, 0.12, 0], dir: [0, 1, 0], mag: 1.65, start: 0.08, end: 0.7 },
  { id: "board", base: [0.15, 0.06, -0.25], dir: [0, 1, 0], mag: 0.95, start: 0.16, end: 0.78 },
  { id: "chip", base: [0.15, 0.12, -0.4], dir: [0, 1, 0], mag: 1.5, start: 0.24, end: 0.86 },
  { id: "memory", base: [-0.85, 0.1, 0.05], dir: [-0.25, 1, 0.1], mag: 1.25, start: 0.32, end: 0.92 },
  { id: "battery", base: [0.1, 0.05, 0.75], dir: [0, -1, 0.25], mag: 0.85, start: 0.4, end: 0.97 },
  { id: "fan", base: [1.2, 0.09, -0.55], dir: [0.3, 1, -0.1], mag: 1.15, start: 0.48, end: 1.0 },
] satisfies PartDef[];

type Palette = { body: string; dark: string; teal: string; violet: string; board: string; screen: string };

function Part({ def, progressRef, children }: { def: PartDef; progressRef: MutableRefObject<number>; children: ReactNode }) {
  const ref = useRef<Group>(null);
  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const local = smooth((progressRef.current - def.start) / (def.end - def.start));
    g.position.set(
      def.base[0] + def.dir[0] * def.mag * local,
      def.base[1] + def.dir[1] * def.mag * local,
      def.base[2] + def.dir[2] * def.mag * local,
    );
  });
  return <group ref={ref}>{children}</group>;
}

function Laptop({ progressRef, palette }: { progressRef: MutableRefObject<number>; palette: Palette }) {
  const { body: BODY, dark: BODY_DARK, teal: TEAL, violet: VIOLET } = palette;
  const root = useRef<Group>(null);
  useFrame(() => {
    const g = root.current;
    if (!g) return;
    // Gentle cinematic turn as the laptop opens up.
    g.rotation.y = -0.25 + progressRef.current * 0.38;
  });

  return (
    <group ref={root} position={[0, -0.5, 0]}>
      {/* Chassis / base */}
      <group>
        <mesh position={[0, -0.02, 0]}>
          <boxGeometry args={[3.5, 0.1, 2.4]} />
          <meshStandardMaterial color={BODY_DARK} metalness={0.55} roughness={0.45} />
        </mesh>
      </group>

      {/* Display assembly */}
      <Part def={PARTS[0] as PartDef} progressRef={progressRef}>
        <group rotation={[-0.3, 0, 0]}>
          <mesh>
            <boxGeometry args={[3.4, 2.2, 0.09]} />
            <meshStandardMaterial color={BODY} metalness={0.6} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.055]}>
            <planeGeometry args={[3.1, 1.9]} />
            <meshStandardMaterial color={palette.screen} emissive={TEAL} emissiveIntensity={0.08} roughness={0.25} />
          </mesh>
          {/* Suggested UI bars on the screen */}
          <mesh position={[-0.7, 0.35, 0.06]}>
            <planeGeometry args={[1.5, 0.16]} />
            <meshBasicMaterial color={TEAL} />
          </mesh>
          <mesh position={[-0.95, 0.05, 0.06]}>
            <planeGeometry args={[1.0, 0.12]} />
            <meshBasicMaterial color={VIOLET} />
          </mesh>
          <mesh position={[-1.05, -0.2, 0.06]}>
            <planeGeometry args={[0.8, 0.12]} />
            <meshBasicMaterial color={TEAL} />
          </mesh>
        </group>
      </Part>

      {/* Keyboard deck */}
      <Part def={PARTS[1] as PartDef} progressRef={progressRef}>
        <mesh>
          <boxGeometry args={[3.4, 0.07, 2.3]} />
          <meshStandardMaterial color={BODY} metalness={0.55} roughness={0.42} />
        </mesh>
        <mesh position={[0, 0.045, 0.68]}>
          <boxGeometry args={[1.1, 0.02, 0.7]} />
          <meshStandardMaterial color={BODY_DARK} metalness={0.4} roughness={0.5} />
        </mesh>
        {/* Individually modeled keys */}
        {Array.from({ length: 60 }, (_, i) => <mesh key={i} position={[-1.3 + (i % 12) * 0.235, 0.067, -0.82 + Math.floor(i / 12) * 0.2]}><boxGeometry args={[0.195, 0.035, 0.145]} /><meshStandardMaterial color={BODY} metalness={0.25} roughness={0.45} /></mesh>)}
        <mesh position={[0, 0.045, -0.35]}>
          <boxGeometry args={[2.9, 0.02, 1.1]} />
          <meshStandardMaterial color={BODY_DARK} metalness={0.3} roughness={0.6} />
        </mesh>
      </Part>

      {/* Logic board */}
      <Part def={PARTS[2] as PartDef} progressRef={progressRef}>
        <mesh>
          <boxGeometry args={[1.9, 0.05, 1.3]} />
          <meshStandardMaterial color={palette.board} metalness={0.35} roughness={0.55} />
        </mesh>
        <mesh position={[0.55, 0.04, 0.3]}>
          <boxGeometry args={[0.35, 0.03, 0.35]} />
          <meshStandardMaterial color={BODY_DARK} metalness={0.5} roughness={0.4} />
        </mesh>
      </Part>

      {/* Processor */}
      <Part def={PARTS[3] as PartDef} progressRef={progressRef}>
        <mesh>
          <boxGeometry args={[0.5, 0.07, 0.5]} />
          <meshStandardMaterial color={BODY_DARK} emissive={VIOLET} emissiveIntensity={0.55} metalness={0.6} roughness={0.35} />
        </mesh>
      </Part>

      {/* Memory & storage */}
      <Part def={PARTS[4] as PartDef} progressRef={progressRef}>
        <mesh position={[0, 0, -0.16]}>
          <boxGeometry args={[0.95, 0.05, 0.22]} />
          <meshStandardMaterial color={BODY_DARK} emissive={TEAL} emissiveIntensity={0.4} metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.16]}>
          <boxGeometry args={[0.95, 0.05, 0.22]} />
          <meshStandardMaterial color={BODY_DARK} emissive={TEAL} emissiveIntensity={0.4} metalness={0.5} roughness={0.4} />
        </mesh>
      </Part>

      {/* Battery */}
      <Part def={PARTS[5] as PartDef} progressRef={progressRef}>
        <mesh>
          <boxGeometry args={[2.2, 0.09, 0.8]} />
          <meshStandardMaterial color={BODY_DARK} metalness={0.45} roughness={0.5} />
        </mesh>
      </Part>

      {/* Cooling fan */}
      <Part def={PARTS[6] as PartDef} progressRef={progressRef}>
        <mesh rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.38, 0.38, 0.07, 24]} />
          <meshStandardMaterial color={BODY} metalness={0.55} roughness={0.4} />
        </mesh>
        {Array.from({length: 8}, (_, i) => <mesh key={i} position={[Math.cos(i * Math.PI / 4) * 0.16, 0.05, Math.sin(i * Math.PI / 4) * 0.16]} rotation={[0, -i * Math.PI / 4, 0]}><boxGeometry args={[0.2, 0.02, 0.055]} /><meshStandardMaterial color={BODY_DARK} metalness={0.5} roughness={0.35} /></mesh>)}
        <mesh position={[0, 0.045, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.26, 0.025, 8, 24]} />
          <meshStandardMaterial color={VIOLET} emissive={VIOLET} emissiveIntensity={0.35} metalness={0.4} roughness={0.4} />
        </mesh>
      </Part>
    </group>
  );
}

export default function LaptopScene({
  progressRef,
  visible,
  onReady,
}: {
  progressRef: MutableRefObject<number>;
  visible: boolean;
  onReady: () => void;
}) {
  const [palette, setPalette] = useState<Palette | null>(null);
  useEffect(() => {
    const update = () => {
      const css = getComputedStyle(document.documentElement);
      const read = (name: string) => css.getPropertyValue(name).trim();
      setPalette({ body: read("--laptop-body"), dark: read("--laptop-dark"), teal: read("--laptop-teal"), violet: read("--laptop-violet"), board: read("--laptop-board"), screen: read("--laptop-screen") });
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  if (!palette) return null;
  return (
    <Canvas frameloop="demand" dpr={[1, 1.5]}
      camera={{ position: [5.8, 4.2, 7.5], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 8, 4]} intensity={2.5} />
      <pointLight position={[-5, 3, 4]} intensity={22} color={palette.teal} />
      <pointLight position={[5, 2, -4]} intensity={18} color={palette.violet} />
      <Environment resolution={64}>
        <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} />
        <Lightformer intensity={1.5} color={palette.teal} position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[10, 10, 1]} />
      </Environment>
      <FrameDriver visible={visible} onReady={onReady} />
      <Laptop progressRef={progressRef} palette={palette} />
    </Canvas>
  );
}

function FrameDriver({ visible, onReady }: { visible: boolean; onReady: () => void }) {
  const { invalidate } = useThree();
  const ready = useRef(false);
  useEffect(() => {
    if (!visible) return;
    invalidate();
    const refresh = () => invalidate();
    window.addEventListener("portfolio-laptop-scroll", refresh);
    return () => window.removeEventListener("portfolio-laptop-scroll", refresh);
  }, [visible, invalidate]);
  useFrame(() => {
    if (ready.current) return;
    ready.current = true;
    // Signal after the frame is drawn, not merely after context creation.
    requestAnimationFrame(onReady);
  });
  return null;
}
