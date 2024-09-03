// draggablePiechart.d.ts
declare class DraggablePieChart {
    constructor(setup: {
        canvas: HTMLCanvasElement;
        context?: CanvasRenderingContext2D;
        data?: any[];
        proportions?: any[];
        radius?: number;
        collapsing?: boolean;
        minAngle?: number;
        drawSegment?: (context: CanvasRenderingContext2D, piechart: DraggablePiechart, centerX: number, centerY: number, radius: number, startingAngle: number, arcSize: number, format: any, collapsed: boolean) => void;
        drawNode?: (context: CanvasRenderingContext2D, piechart: DraggablePiechart, x: number, y: number, centerX: number, centerY: number, hover: boolean) => void;
        onchange?: (piechart: DraggablePiechart) => void;
    });

    moveAngle(i: number, amount: number): void;
    getSliceSizePercentage(index: number): number;
    getAllSliceSizePercentages(): number[];
    getGeometry(): { centerX: number, centerY: number, radius: number };
    getTarget(targetLocation: { x: number, y: number }): any;
    setCollapsed(index: number, collapsed: boolean): void;
    getVisibleSegments(): any[];
    getInvisibleSegments(): any[];
    draw(): void;
}

export = DraggablePieChart;