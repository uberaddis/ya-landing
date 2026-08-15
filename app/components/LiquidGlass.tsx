'use client'

import { MeshTransmissionMaterial } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'

function GlassSurface() {
    const { viewport } = useThree()

    return (
        <mesh>
            <planeGeometry args={[viewport.width + 0.1, viewport.height + 0.1, 48, 16]} />
            <MeshTransmissionMaterial
                anisotropy={0.04}
                chromaticAberration={0.008}
                color="#ffffff"
                distortion={0.025}
                distortionScale={0.08}
                ior={1.16}
                opacity={0.22}
                roughness={0.16}
                thickness={0.16}
                transmission={1}
                transparent
            />
        </mesh>
    )
}
/**
 * A deliberately subtle WebGL transmission pass. CSS supplies the base blur;
 * this refracts that surface without introducing visible scene objects behind
 * the navbar controls.
 */
export default function LiquidGlass() {
    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden opacity-45">
            <Canvas camera={{ position: [0, 0, 5], fov: 34 }} dpr={[1, 1.5]} frameloop="demand" gl={{ alpha: true, antialias: true }}>
                <ambientLight intensity={1.5} />
                <directionalLight intensity={0.8} position={[-2, 2, 3]} />
                <GlassSurface />
            </Canvas>
        </div>
    )
}
