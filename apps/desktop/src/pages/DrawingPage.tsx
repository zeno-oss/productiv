import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";

interface ComponentProps {
  //Your component props
}

let width = 800;
let height = 500;

const DrawArea: React.FC<ComponentProps> = (props: ComponentProps) => {
  //See annotations in JS for more information
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    let cnv = p5.createCanvas(width, height).parent(canvasParentRef);
    p5.background(255, 255, 255);
  };

  function mouseDragged(p5: p5Types): any {
    console.log("Clicked on the canvas. Event:", event, p5.mouseX);
    p5.ellipse(p5.mouseX, p5.mouseY, 20);
    p5.fill(0, 0, 0);
  }

  const draw = (p5: p5Types) => {
    // p5.background(0);
    // p5.ellipse(x, y, 70, 70);
  };

  return <Sketch setup={setup} draw={draw} mouseDragged={mouseDragged} />;
};

const DrawingPage = () => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-col items-center justify-center p-4">
          <DrawArea />
        </div>
      </div>
    </div>
  );
};

export default DrawingPage;
