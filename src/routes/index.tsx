import { Flex } from "~/components/ui/flex";
import { createSignal, onMount } from "solid-js";
import Matter from "matter-js";

export default function Home() {
  let test!: HTMLDivElement;
  const [width, setWidth] = createSignal(0);
  const [height, setHeight] = createSignal(0);

  onMount(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    const engine = Matter.Engine.create();
    engine.world.gravity.y = 1;

    const renderer = Matter.Render.create({
      element: test,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false, // Set to true for wireframe rendering
        background: "#f0f0f0",
      },
    });

    Matter.Render.run(renderer);

    const runner = Matter.Runner.create({ delta: 2 });
    Matter.Runner.run(runner, engine);

    const mouse = Matter.Mouse.create(test);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 1,
        render: {
          visible: true,
        },
      },
    });
    Matter.Composite.add(engine.world, mouseConstraint);

    // Create boundary bodies
    const boundaries = [
      // Top boundary
      Matter.Bodies.rectangle(width() / 2, 0, width(), 50, { isStatic: true }),
      // Bottom boundary
      Matter.Bodies.rectangle(width() / 2, height(), width(), 50, {
        isStatic: true,
      }),
      // Left boundary
      Matter.Bodies.rectangle(0, height() / 2, 50, height(), {
        isStatic: true,
      }),
      // Right boundary
      Matter.Bodies.rectangle(width(), height() / 2, 50, height(), {
        isStatic: true,
      }),
    ];

    const rectangle = Matter.Bodies.rectangle(400, 200, 80, 80);
    const circle = Matter.Bodies.circle(200, 200, 50);
    const ground = Matter.Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight,
      window.innerWidth,
      1,
      {
        isStatic: true,
      }
    );

    Matter.World.add(engine.world, [rectangle, circle, ground, ...boundaries]);

    // Cleanup on unmount (optional)
    return () => {
      Matter.Render.stop(renderer);
      Matter.Engine.clear(engine);
    };
  });

  return <div ref={test} class="w-screen h-screen"></div>;
}
