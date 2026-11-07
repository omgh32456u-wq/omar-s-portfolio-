import { useRef, type MutableRefObject, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { Group } from "three";
import { stackLayers } from "@/content/site";
import { useLanguage } from "./language";

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
const PARTS: PartDef[] = [
  { id: "screen", base: [0, 1.05, -1.12], dir: [0, 1, -0.4], mag: 2.3, start: 0.0, end: 0.62 },
  { id: "deck", base: [0, 0.12, 0], dir: [0, 1, 0], mag: 1.65, start: 0.08, end: 0.7 },
  { id: "board", base: [0.15, 0.06, -0.25], dir: [0, 1, 0], mag: 0.95, start: 0.16, end: 0.78 },
  { id: "chip", base: [0.15, 0.12, -0.4], dir: [0, 1, 0], mag: 1.5, start: 0.24, end: 0.86 },
  { id: "memory", base: [-0.85, 0.1, 0.05], dir: [-0.25, 1, 0.1], mag: 1.25, start: 0.32, end: 0.92 },
  { id: "battery", base: [0.1, 0.05, 0.75], dir: [0, -1, 0.25], mag: 0.85, start: 0.4, end: 0.97 },
  { id: "fan", base: [1.2, 0.09, -0.55], dir: [0.3, 1, -0.1], mag: 1.15, start: 0.48, end: 1.0 },
];

const BODY = "#262b3a";
const BODY_DARK = "#1b1f2c";
const TEAL = "#38c6b0";
const VIOLET = "#a77bfa";

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

function PartLabel({ text, tone, position, progressRef }: { text: string; tone: string; position: Vec3; progressRef: MutableRefObject<number> }) {
  const ref = useRef<HTMLDivElement>(null);
  useFrame(() => {
    if (ref.current) ref.current.style.opacity = progressRef.current > 0.2 ? "1" : "0";
  });
  return (
    <Html position={position} center zIndexRange={[20, 0]} wrapperClass="scene-labels">
      <div ref={ref} className={`scene-label ${tone === "primary" ? "scene-label-primary" : "scene-label-accent"}`}>{text}</div>
    </Html>
  );
}

function Laptop({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const { t } = useLanguage();
  const root = useRef<Group>(null);
  useFrame(() => {
    const g = root.current;
    if (!g) return;
    // Gentle cinematic turn as the laptop opens up.
    g.rotation.y = -0.5 + progressRef.current * 0.75;
  });
  const layer = (id: string) => stackLayers.find((l) => l.id === id)!;

  return (
    <group ref={root} position={[0, -0.9, 0]}>
      {/* Chassis / base */}
      <group>
        <mesh position={[0, -0.02, 0]}>
          <boxGeometry args={[3.5, 0.1, 2.4]} />
          <meshStandardMaterial color={BODY_DARK} metalness={0.55} roughness={0.45} />
        </mesh>
      </group>

      {/* Display assembly */}
      <Part def={PARTS[0]!} progressRef={progressRef}>
        <group rotation={[-1.72, 0, 0]} position={[0, -1.0, 0]}>
          <mesh position={[0, 1.1, 0]}>
            <boxGeometry args={[3.4, 2.2, 0.09]} />
            <meshStandardMaterial color={BODY} metalness={0.6} roughness={0.4} />
          </mesh>
          <mesh position={[0, 1.1, 0.055]}>
            <planeGeometry args={[3.1, 1.9]} />
            <meshStandardMaterial color="#10131d" emissive={TEAL} emissiveIntensity={0.16} roughness={0.25} />
          </mesh>
          {/* Suggested UI bars on the screen */}
          <mesh position={[-0.7, 1.45, 0.06]}>
            <planeGeometry args={[1.5, 0.16]} />
            <meshBasicMaterial color={TEAL} />
          </mesh>
          <mesh position={[-0.95, 1.15, 0.06]}>
            <planeGeometry args={[1.0, 0.12]} />
            <meshBasicMaterial color={VIOLET} />
          </mesh>
          <mesh position={[-1.05, 0.9, 0.06]}>
            <planeGeometry args={[0.8, 0.12]} />
            <meshBasicMaterial color={TEAL} />
          </mesh>
        </group>
        <PartLabel text={t(layer("screen").part)} tone="primary" position={[0, 1.4, 0]} progressRef={progressRef} />
      </Part>

      {/* Keyboard deck */}
      <Part def={PARTS[1]!} progressRef={progressRef}>
        <mesh>
          <boxGeometry args={[3.4, 0.07, 2.3]} />
          <meshStandardMaterial color={BODY} metalness={0.55} roughness={0.42} />
        </mesh>
        <mesh position={[0, 0.045, 0.68]}>
          <boxGeometry args={[1.1, 0.02, 0.7]} />
          <meshStandardMaterial color={BODY_DARK} metalness={0.4} roughness={0.5} />
        </mesh>
        {/* Key field suggestion */}
        <mesh position={[0, 0.045, -0.35]}>
          <boxGeometry args={[2.9, 0.02, 1.1]} />
          <meshStandardMaterial color="#20242f" metalness={0.3} roughness={0.6} />
        </mesh>
        <PartLabel text={t(layer("deck").part)} tone="accent" position={[0, 0.45, 0]} progressRef={progressRef} />
      </Part>

      {/* Logic board */}
      <Part def={PARTS[2]!} progressRef={progressRef}>
        <mesh>
          <boxGeometry args={[1.9, 0.05, 1.3]} />
          <meshStandardMaterial color="#17393c" metalness={0.35} roughness={0.55} />
        </mesh>
        <mesh position={[0.55, 0.04, 0.3]}>
          <boxGeometry args={[0.35, 0.03, 0.35]} />
          <meshStandardMaterial color={BODY_DARK} metalness={0.5} roughness={0.4} />
        </mesh>
        <PartLabel text={t(layer("board").part)} tone="primary" position={[0, 0.4, 0]} progressRef={progressRef} />
      </Part>

      {/* Processor */}
      <Part def={PARTS[3]!} progressRef={progressRef}>
        <mesh>
          <boxGeometry args={[0.5, 0.07, 0.5]} />
          <meshStandardMaterial color={BODY_DARK} emissive={VIOLET} emissiveIntensity={0.55} metalness={0.6} roughness={0.35} />
        </mesh>
        <PartLabel text={t(layer("chip").part)} tone="accent" position={[0, 0.4, 0]} progressRef={progressRef} />
      </Part>

      {/* Memory & storage */}
      <Part def={PARTS[4]!} progressRef={progressRef}>
        <mesh position={[0, 0, -0.16]}>
          <boxGeometry args={[0.95, 0.05, 0.22]} />
          <meshStandardMaterial color={BODY_DARK} emissive={TEAL} emissiveIntensity={0.4} metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.16]}>
          <boxGeometry args={[0.95, 0.05, 0.22]} />
          <meshStandardMaterial color={BODY_DARK} emissive={TEAL} emissiveIntensity={0.4} metalness={0.5} roughness={0.4} />
        </mesh>
        <PartLabel text={t(layer("memory").part)} tone="primary" position={[0, 0.4, 0]} progressRef={progressRef} />
      </Part>

      {/* Battery */}
      <Part def={PARTS[5]!} progressRef={progressRef}>
        <mesh>
          <boxGeometry args={[2.2, 0.09, 0.8]} />
          <meshStandardMaterial color="#232838" metalness={0.45} roughness={0.5} />
        </mesh>
        <PartLabel text={t(layer("battery").part)} tone="accent" position={[0, -0.4, 0]} progressRef={progressRef} />
      </Part>

      {/* Cooling fan */}
      <Part def={PARTS[6]!} progressRef={progressRef}>
        <mesh rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.38, 0.38, 0.07, 24]} />
          <meshStandardMaterial color={BODY} metalness={0.55} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.045, 0]}>
          <torusGeometry args={[0.26, 0.025, 8, 24]} />
          <meshStandardMaterial color={VIOLET} emissive={VIOLET} emissiveIntensity={0.35} metalness={0.4} roughness={0.4} />
        </mesh>
        <PartLabel text={t(layer("fan").part)} tone="primary" position={[0, 0.42, 0]} progressRef={progressRef} />
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
  return (
    <Canvas
      frameloop={visible ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [4.4, 2.6, 5.4], fov: 36 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      onCreated={onReady}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 4]} intensity={1.1} />
      <pointLight position={[-5, 3, 4]} intensity={18} color={TEAL} />
      <pointLight position={[5, 2, -4]} intensity={14} color={VIOLET} />
      <Laptop progressRef={progressRef} />
    </Canvas>
  );
}
