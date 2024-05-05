import {
  Render,
  Bodies,
  Engine,
  World,
  MouseConstraint,
  Mouse,
  Events,
  Body,
  IChamferableBodyDefinition,
  Runner,
} from "matter-js";
import { useEffect, useRef } from "react";

export interface CanvasOptions {
  height: number;
  width: number;
}

export const useCanvas = ({ height, width }: CanvasOptions) => {
  const scene = useRef<HTMLInputElement>(null);
  const engine = useRef(Engine.create());

  useEffect(() => {
    // mount
    const cw = width;
    const ch = height;

    const render = Render.create({
      element: scene.current as HTMLElement,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: "transparent",
      },
    });

    // boundaries
    engine.current.gravity.scale = 0;
    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
    ]);

    const ballSize = 20;
    const ball = Bodies.circle(cw / 2, ch / 2, ballSize, {
      mass: 1,
      restitution: 0.9,
      friction: 0.005,
      render: {
        fillStyle: "#0000ff",
      },
    });

    const rectOptions: IChamferableBodyDefinition = {
      mass: 0,
      restitution: 0,
      friction: 0.005,
      render: {
        fillStyle: "#0000ff",
      },
      isStatic: false,
    };

    const getRect = () => Bodies.rectangle(Math.random() * cw, Math.random() * ch, 20, 20, rectOptions);

    World.add(engine.current.world, [ball, ...Array.from({ length: 10 }, getRect)]);

    const mouse = Mouse.create(scene.current as unknown as HTMLElement);
    const mouseConstraint = MouseConstraint.create(engine.current, {
      mouse,
    });

    World.add(engine.current.world, [mouseConstraint]);

    // run the engine
    Runner.run(engine.current);
    Render.run(render);

    Events.on(engine.current, "afterUpdate", () => {
      const margin = 20;
      const isOutsideCanvas =
        mouse.position.x - margin * 2 > 0 &&
        mouse.position.x < cw &&
        mouse.position.y - margin * 2 > 0 &&
        mouse.position.y < ch;

      if (mouseConstraint.mouse.button === -1 && isOutsideCanvas) {
        Body.setPosition(ball, {
          x: mouseConstraint.mouse.position.x - ballSize,
          y: mouseConstraint.mouse.position.y - ballSize,
        });
      }
    });

    // unmount
    return () => {
      // destroy Matter
      Render.stop(render);
      World.clear(engine.current.world, false);
      Engine.clear(engine.current);
      render.canvas.remove();
      render.canvas = null as any;
      render.context = null as any;
      render.textures = {};
    };
  }, []);

  return { scene, engine };
};
