import { Flex } from "~/components/ui/flex";
import { createEffect, createSignal, onMount, Show } from "solid-js";
import Matter from "matter-js";

export default function Home() {
  let test!: HTMLDivElement;
  const [width, setWidth] = createSignal(0);
  const [height, setHeight] = createSignal(0);

  onMount(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    setTimeout(() => {
      const engine = Matter.Engine.create();

      const renderer = Matter.Render.create({
        element: test,
        engine: engine,
        options: {
          width: width(),
          height: height(),
          wireframes: false, // Set to true for wireframe rendering
        },
      });

      Matter.Render.run(renderer);

      const runner = Matter.Runner.create();
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

      const boundaries = [
        // Top boundary
        Matter.Bodies.rectangle(width() / 2, 0, width(), 100, {
          isStatic: true,
        }),
        // Bottom boundary
        Matter.Bodies.rectangle(width() / 2, height(), width(), 100, {
          isStatic: true,
        }),
        // Left boundary
        Matter.Bodies.rectangle(0, height() / 2, 100, height(), {
          isStatic: true,
        }),
        // Right boundary
        Matter.Bodies.rectangle(width(), height() / 2, 100, height(), {
          isStatic: true,
        }),
      ];

      const rectangle = Matter.Bodies.rectangle(400, 200, 80, 80);
      const circle = Matter.Bodies.circle(200, 200, 50);

      Matter.World.add(engine.world, [rectangle, circle, ...boundaries]);

      return () => {
        Matter.Render.stop(renderer);
        Matter.Engine.clear(engine);
      };
    }, 1000);
  });

  return (
    <>
      <Show when={width() >= 640}>
        <div ref={test} class="fixed"></div>
      </Show>

      <Flex
        justifyContent="start"
        alignItems="start"
        class="fixed z-10 touch-none w-fit p-4 py-10 sm:p-20 gap-4"
        flexDirection="col"
      >
        <Flex alignItems="start" flexDirection="col">
          <code class="font-black text-5xl">TBroz15</code>
          <pre>
            <code>youtube creator and developer</code>
          </pre>
          <code>more content and thingamajigs coming soon!</code>
        </Flex>

        <code class="block sm:hidden">
          recommended for desktop and <b>l o n g</b> screens!
        </code>
      </Flex>
    </>
  );
}
