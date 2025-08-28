import React, { useCallback, useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Circle } from "react-konva";
import Konva from "konva";

type Shape = {
  id: string;
  type: "rect" | "circle";
  x: number;
  y: number;
  size: number;
  fill: string;
};

function defaultShapes(): Shape[] {
  const raw = localStorage.getItem("shapes");
  if (raw) return JSON.parse(raw);
  return [
    { id: "r1", type: "rect", x: 100, y: 100, size: 120, fill: "#60a5fa" },
    { id: "c1", type: "circle", x: 320, y: 200, size: 60, fill: "#34d399" },
  ];
}

export default function CanvasEditor() {
  const [shapes, setShapes] = useState<Shape[]>(() => defaultShapes());
  const [selected, setSelected] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const stageRef = useRef<Konva.Stage>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 800, height: 500 });

  // Resize observer for responsive canvas
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) {
        setSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Persist shapes in localStorage
  useEffect(() => {
    localStorage.setItem("shapes", JSON.stringify(shapes));
  }, [shapes]);

  // Zooming
  const onWheel = useCallback((e: any) => {
    e.evt.preventDefault();
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();
    const scaleBy = 1.05;
    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
    stage.scale({ x: newScale, y: newScale });
    setScale(newScale);
    stage.batchDraw();
  }, []);

  // Dragging
  const handleDragEnd = useCallback((id: string, x: number, y: number) => {
    setShapes((prev) => prev.map((s) => (s.id === id ? { ...s, x, y } : s)));
  }, []);

  // Adding new shapes
  const addRect = () =>
    setShapes((prev) => [
      ...prev,
      {
        id: "r" + Math.random().toString(36).slice(2, 7),
        type: "rect",
        x: 80 + prev.length * 20,
        y: 80 + prev.length * 20,
        size: 100,
        fill: "#fbbf24",
      },
    ]);

  const addCircle = () =>
    setShapes((prev) => [
      ...prev,
      {
        id: "c" + Math.random().toString(36).slice(2, 7),
        type: "circle",
        x: 200 + prev.length * 20,
        y: 160 + prev.length * 20,
        size: 50,
        fill: "#a78bfa",
      },
    ]);

  // Keyboard delete
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selected) {
        setShapes((prev) => prev.filter((s) => s.id !== selected));
        setSelected(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="mb-2 flex gap-2 flex-wrap">
        <button
          onClick={addRect}
          className="px-3 py-2 rounded-xl border bg-white hover:bg-gray-100 text-sm"
        >
          Add Rect
        </button>
        <button
          onClick={addCircle}
          className="px-3 py-2 rounded-xl border bg-white hover:bg-gray-100 text-sm"
        >
          Add Circle
        </button>
        <button
          onClick={() => {
            stageRef.current?.scale({ x: 1, y: 1 });
            setScale(1);
          }}
          className="px-3 py-2 rounded-xl border bg-white hover:bg-gray-100 text-sm"
        >
          Reset Zoom
        </button>
      </div>

      {/* Canvas container */}
      <div
        ref={containerRef}
        className="w-full h-[60vh] md:h-[70vh] rounded-2xl border bg-white overflow-hidden"
      >
        <Stage
          ref={stageRef}
          width={size.width}
          height={size.height}
          draggable
          onWheel={onWheel}
          onMouseDown={() => setSelected(null)}
        >
          <Layer>
            {shapes.map((s) =>
              s.type === "rect" ? (
                <Rect
                  key={s.id}
                  x={s.x}
                  y={s.y}
                  width={s.size}
                  height={s.size}
                  fill={s.fill}
                  draggable
                  onClick={() => setSelected(s.id)}
                  onDragEnd={(e) =>
                    handleDragEnd(s.id, e.target.x(), e.target.y())
                  }
                  stroke={selected === s.id ? "black" : undefined}
                  strokeWidth={selected === s.id ? 2 : 0}
                />
              ) : (
                <Circle
                  key={s.id}
                  x={s.x}
                  y={s.y}
                  radius={s.size}
                  fill={s.fill}
                  draggable
                  onClick={() => setSelected(s.id)}
                  onDragEnd={(e) =>
                    handleDragEnd(s.id, e.target.x(), e.target.y())
                  }
                  stroke={selected === s.id ? "black" : undefined}
                  strokeWidth={selected === s.id ? 2 : 0}
                />
              )
            )}
          </Layer>
        </Stage>
      </div>

      <p className="text-xs text-gray-600 mt-2">
        Tip: Use scroll to zoom, drag canvas to pan, select a shape and press
        Delete to remove.
      </p>
    </div>
  );
}
