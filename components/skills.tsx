'use client';

import { useRef, MouseEvent, useEffect, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { BrainCircuit, Code2, Microscope, Server } from 'lucide-react';
import Matter from 'matter-js';

const skills = [
  {
    category: "Machine Learning & AI",
    icon: <BrainCircuit className="w-6 h-6 text-indigo-400" />,
    items: ["Deep Learning", "Computer Vision", "Multimodal AI", "Reinforcement Learning", "Qualitative NLP Pipelines"],
    className: "md:col-span-2 md:row-span-2 bg-zinc-900/50"
  },
  {
    category: "Computational Pathology",
    icon: <Microscope className="w-6 h-6 text-emerald-400" />,
    items: ["WSI Processing", "TRIDENT Pipeline", "HistoCartography", "Hover-Net", "StarDist"],
    className: "md:col-span-1 md:row-span-2 bg-zinc-900/50"
  },
  {
    category: "Programming",
    icon: <Code2 className="w-6 h-6 text-sky-400" />,
    items: ["Python", "PyTorch", "scikit-learn", "LangChain", "LangGraph", "Hydra", "MLflow"],
    className: "md:col-span-2 md:row-span-1 bg-zinc-900/50"
  },
  {
    category: "Infrastructure",
    icon: <Server className="w-6 h-6 text-amber-400" />,
    items: ["Git / GitHub", "HPC Clusters (TACC Vista)", "SLURM", "GPU Training Pipelines"],
    className: "md:col-span-1 md:row-span-1 bg-zinc-900/50"
  }
];

function PhysicsTags({ items }: { items: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bodies, setBodies] = useState<{ id: number; text: string; x: number; y: number; angle: number; width: number; height: number }[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    let engine: Matter.Engine;
    let render: Matter.Render;
    let runner: Matter.Runner;
    let mouse: Matter.Mouse;
    let mouseConstraint: Matter.MouseConstraint;
    let animationFrameId: number;
    let isUnmounted = false;

    const initPhysics = () => {
      const { width, height } = container.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      engine = Matter.Engine.create({
        gravity: { x: 0, y: 0, scale: 0 } // No gravity
      });
      const world = engine.world;

      // Create walls
      const wallOptions = { isStatic: true, render: { visible: false }, friction: 0.1, restitution: 0.5 };
      const ground = Matter.Bodies.rectangle(width / 2, height + 25, width + 100, 50, wallOptions);
      const leftWall = Matter.Bodies.rectangle(-25, height / 2, 50, height + 100, wallOptions);
      const rightWall = Matter.Bodies.rectangle(width + 25, height / 2, 50, height + 100, wallOptions);
      const ceiling = Matter.Bodies.rectangle(width / 2, -25, width + 100, 50, wallOptions);

      Matter.World.add(world, [ground, leftWall, rightWall, ceiling]);

      // Measure items
      const newBodies: Matter.Body[] = [];
      let currentX = 10;
      let currentY = 10;
      let rowHeight = 0;

      items.forEach((item, i) => {
        const div = document.createElement('div');
        div.className = "px-3 py-1.5 text-sm font-medium rounded-lg border inline-block absolute invisible whitespace-nowrap";
        div.innerText = item;
        container.appendChild(div);
        const rect = div.getBoundingClientRect();
        container.removeChild(div);

        if (currentX + rect.width > width - 10) {
          currentX = 10;
          currentY += rowHeight + 10;
          rowHeight = 0;
        }

        const body = Matter.Bodies.rectangle(
          currentX + rect.width / 2,
          currentY + rect.height / 2,
          rect.width,
          rect.height,
          {
            restitution: 0.6,
            friction: 0.1,
            frictionAir: 0.05, // Increased air friction so they settle
            chamfer: { radius: 8 },
            label: item,
            inertia: Infinity, // Prevent rotation
          }
        );

        (body as any).originalWidth = rect.width;
        (body as any).originalHeight = rect.height;

        newBodies.push(body);
        currentX += rect.width + 10;
        rowHeight = Math.max(rowHeight, rect.height);
      });

      Matter.World.add(world, newBodies);

      // Add mouse control
      mouse = Matter.Mouse.create(container);
      mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false }
        }
      });

      mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);
      mouse.element.removeEventListener("wheel", (mouse as any).mousewheel);

      Matter.World.add(world, mouseConstraint);

      runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      const updateState = () => {
        if (isUnmounted) return;
        setBodies(newBodies.map(b => ({
          id: b.id,
          text: b.label,
          x: b.position.x,
          y: b.position.y,
          angle: b.angle,
          width: (b as any).originalWidth,
          height: (b as any).originalHeight
        })));
        animationFrameId = requestAnimationFrame(updateState);
      };
      updateState();
    };

    // Delay initialization slightly to ensure DOM is fully rendered and sized
    const timeoutId = setTimeout(initPhysics, 100);

    return () => {
      isUnmounted = true;
      clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (runner) Matter.Runner.stop(runner);
      if (engine) {
        Matter.Engine.clear(engine);
        Matter.World.clear(engine.world, false);
      }
      if (mouse) Matter.Mouse.clearSourceEvents(mouse);
    };
  }, [items]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex-1 overflow-hidden mt-4 min-h-[120px] rounded-xl z-20">
      {bodies.map(b => (
        <div
          key={b.id}
          className="absolute top-0 left-0 px-3 py-1.5 text-sm font-medium rounded-lg bg-zinc-950 border border-zinc-800/80 text-zinc-300 shadow-sm select-none cursor-grab active:cursor-grabbing flex items-center justify-center whitespace-nowrap"
          style={{
            width: b.width,
            height: b.height,
            transform: `translate(${b.x - b.width / 2}px, ${b.y - b.height / 2}px) rotate(${b.angle}rad)`
          }}
        >
          {b.text}
        </div>
      ))}
    </div>
  );
}

function SkillCard({ skillGroup, idx }: { skillGroup: any, idx: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      onMouseMove={handleMouseMove}
      className={`group relative p-4 rounded-2xl border border-zinc-800/80 hover:border-zinc-700 transition-colors flex flex-col overflow-hidden ${skillGroup.className}`}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10 flex items-center gap-3 mb-3 pointer-events-none">
        <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 shadow-inner group-hover:scale-110 transition-transform duration-500">
          {skillGroup.icon}
        </div>
        <h3 className="text-lg font-medium text-zinc-100">
          {skillGroup.category}
        </h3>
      </div>
      
      <PhysicsTags items={skillGroup.items} />
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 border-t border-zinc-800/50">
      <div className="mb-10 md:mb-16">
        <h2 className="font-serif text-2xl sm:text-3xl text-zinc-100 mb-3">Technical Arsenal</h2>
        <p className="text-base text-zinc-400 max-w-2xl">Tools, frameworks, and methodologies powering my research and engineering.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 auto-rows-[minmax(180px,auto)] relative group/grid">
        {skills.map((skillGroup, idx) => (
          <SkillCard 
            key={idx} 
            skillGroup={skillGroup} 
            idx={idx} 
          />
        ))}
      </div>
    </section>
  );
}
