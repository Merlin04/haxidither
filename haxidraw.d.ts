type Pos = { x: number, y: number };

declare class Turtle {
    constructor();
    up(): this;
    down(): this;
    goTo(x: number, y: number): this;
    forward(distance: number): this;
    arc(angle: number, radius: number): this;
    setAngle(theta: number): this;
    right(theta: number): this;
    left(theta: number): this;
    translate(x: number, y: number, origin: Pos): void;
    rotate(angle: number, origin: Pos): void;
    scale(factor: number, origin: Pos): void;
    fromSVG(svgString: string): void;
    extrema(): { xMin: number, xMax: number, yMin: number, yMax: number };
}

declare function drawTurtles(...turtles: Turtle[]): void;