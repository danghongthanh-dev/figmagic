/* eslint-ignore */

/***********************************************************/
/* Global properties                                       */
/* https://www.figma.com/developers/api#global-properties  */
/***********************************************************/

type FigmaNode = {
  id: string;
  name: string;
  visible: boolean;
  type: string;
  pluginData: any;
  sharedPluginData: any;
};

/****************************************************/
/* Node types                                       */
/* https://www.figma.com/developers/api#node-types  */
/****************************************************/

// eslint-disable-line
type DOCUMENT = {
  children: FigmaNode[];
};

type CANVAS = {
  children: FigmaNode[];
  backgroundColor: Color;
  prototypeStartNodeID: string;
  exportSettings: ExportSetting[];
};

export interface FRAME {
  absoluteBoundingBox: Rectangle;
  blendMode: BlendMode;
  characters: string;
  children: FigmaNode[];
  clipsContent: boolean;
  constraints: LayoutConstraint;
  cornerRadius: number;
  effects: Effect[];
  exportSettings: ExportSetting[];
  fills: Paint[];
  id: string;
  layoutAlign: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH';
  layoutMode: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
  locked: boolean;
  name: string;
  opacity: number;
  preserveRatio: boolean;
  rectangleCornerRadii: number;
  relativeTransform: Transform;
  size: Vector;
  strokeAlign: 'INSIDE' | 'OUTSIDE' | 'CENTER';
  strokeWeight: number;
  strokes: Paint[];
  style: TypeStyle;
  transitionDuration: number;
  transitionEasing: EasingType;
  transitionNodeID: string;
  type: string;

  counterAxisSizingMode: 'FIXED' | 'AUTO';
  horizontalPadding: number;
  verticalPadding: number;
  itemSpacing: number;
  layoutGrids: LayoutGrid[];
  overflowDirection:
    | 'HORIZONTAL_SCROLLING'
    | 'VERTICAL_SCROLLING'
    | 'HORIZONTAL_AND_VERTICAL_SCROLLING';
  isMask: boolean;
  isMaskOutline: boolean;
}

type GROUP = FRAME;

type VECTOR = {
  absoluteBoundingBox: Rectangle;
  blendMode: BlendMode;
  constraintsLayout: Constraint;
  effects: Effect[];
  exportSettings: ExportSetting[];
  fillGeometry: Path[];
  fills: Paint[];
  isMask: boolean;
  layoutAlign: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH';
  locked: boolean;
  opacity: number;
  preserveRatio: boolean;
  relativeTransform: Transform;
  size: Vector;
  strokeAlignString: 'INSIDE' | 'OUTSIDE' | 'CENTER';
  strokeCap: 'NONE' | 'ROUND' | 'SQUARE' | 'LINE_ARROW' | 'TRIANGLE_ARROW';
  strokeDashes: number[];
  strokeGeometry: Path[];
  strokeJoin: 'MITER' | 'BEVEL' | 'ROUND';
  strokeMiterAngle: number;
  strokeWeight: number;
  strokes: Paint[];
  styles: Map<StyleType, string>;
  transitionDuration: number;
  transitionEasing: EasingType;
  transitionNodeID: string;
};

interface BOOLEAN_OPERATION extends VECTOR {
  booleanOperation: 'UNION' | 'INTERSECT' | 'SUBTRACT' | 'EXCLUDE';
  children: FigmaNode[];
}

type STAR = VECTOR;

type LINE = VECTOR;

type ELLIPSE = VECTOR;

type REGULAR_POLYGON = VECTOR;

interface RECTANGLE extends VECTOR {
  cornerRadius: number;
  rectangleCornerRadii: number[];
}

interface TEXT extends VECTOR {
  characterStyleOverridesNumber: number[];
  characters: string;
  style: TypeStyle;
  styleOverrideTable: Map<number, TypeStyle>;
}

type SLICE = {
  absoluteBoundingBox: Rectangle;
  exportSettings: ExportSetting;
  relativeTransform: Transform;
  size: Vector;
};

type COMPONENT = VECTOR;

interface INSTANCE extends FRAME {
  componentId: string;
}

/*****************************************************/
/* Property types                                    */
/* https://www.figma.com/developers/api#files-types  */
/*****************************************************/

type Color = {
  a: number;
  b: number;
  g: number;
  r: number;
};

type ExportSetting = {
  constraint: Constraint;
  format: 'JPG' | 'PNG' | 'SVG';
  suffix: string;
};

type Constraint = {
  type: 'SCALE' | 'WIDTH' | 'HEIGHT';
  value: number;
};

type Rectangle = {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
};

type BlendMode =
  // Normal blends
  | 'PASS_THROUGH'
  | 'NORMAL'
  // Darken
  | 'DARKEN'
  | 'MULTIPLY'
  | 'LINEAR_BURN'
  | 'COLOR_BURN'
  // Lighten
  | 'LIGHTEN'
  | 'SCREEN'
  | 'LINEAR_DODGE'
  | 'COLOR_DODGE'
  // Contrast
  | 'OVERLAY'
  | 'SOFT_LIGHT'
  | 'HARD_LIGHT'
  // Inversion
  | 'DIFFERENCE'
  | 'EXCLUSION'
  // Component
  | 'HUE'
  | 'SATURATION'
  | 'COLOR'
  | 'LUMINOSITY';

type EasingType = 'EASE_IN' | 'EASE_OUT' | 'EASE_IN_AND_OUT' | 'LINEAR';

type LayoutConstraint = {
  vertical: 'TOP' | 'BOTTOM' | 'CENTER' | 'TOP_BOTTOM' | 'SCALE';
  horizontal: 'LEFT' | 'RIGHT' | 'CENTER' | 'LEFT_RIGHT' | 'SCALE';
};

type LayoutGrid = {
  color: Color;
  pattern: 'COLUMNS' | 'ROWS' | 'GRID';
  sectionSize: number;
  visible: boolean;

  // The following properties are only meaningful for directional grids (COLUMNS or ROWS)
  alignment: 'MIN' | 'STRETCH' | 'CENTER';
  count: number;
  gutterSize: number;
  offset: number;
};

type Effect = {
  radius: number;
  type: 'INNER_SHADOW' | 'DROP_SHADOW' | 'LAYER_BLUR' | 'BACKGROUND_BLUR';
  visible: boolean;

  // The following properties are for shadows only
  blendMode: BlendMode;
  color: Color;
  offset: Vector;
};

type Hyperlink = {
  type: 'URL' | 'NODE';
  url: string;
  nodeID: string;
};

type Paint = {
  //gradients?: Gradients[];
  opacity?: number;
  position?: string;
  type?:
    | 'SOLID'
    | 'GRADIENT_LINEAR'
    | 'GRADIENT_RADIAL'
    | 'GRADIENT_ANGULAR'
    | 'GRADIENT_DIAMOND'
    | 'IMAGE'
    | 'EMOJI';

  // For solid paints
  color?: Color;

  // For gradient paints
  blendMode?: BlendMode;
  gradientHandlePositions: Vector;
  ColorStop?: ColorStop[];

  // For image paints
  gifRef: string;
  imageRef: string;
  imageTransform: Transform;
  rotation: number;
  scaleMode: 'FILL' | 'FIT' | 'TILE' | 'STRETCH';
  scalingFactor: number;
};

type Vector = {
  x: number;
  y: number;
};

type Size = {
  height: number;
  width: number;
};

// TODO: Fix these two...?
type Transform = any;
type Path = any;

type FrameOffset = {
  node_id: string;
  node_offset: Vector;
};

/*
type Gradients = {
  ColorStop: ColorStop[];
};
*/

type ColorStop = {
  color: Color;
  position: string;
};

type Strokes = {
  color: Color;
  length: number;
  type: string;
};

type TypeStyle = {
  fontFamily: string;
  fontPostScriptName: string;
  paragraphSpacing: number;
  paragraphIndent: number;
  italic: boolean;
  fills: Paint[];
  hyperlink: Hyperlink;
  opentypeFlags: Map<string, number>;
  fontSize: number;
  fontWeight: number;
  letterSpacing: number;
  lineHeightPx: number;
  lineHeightPercent: number;
  lineHeightPercentFontSize: number;
  lineHeightUnit: 'PIXELS' | 'FONT_SIZE_%' | 'INTRINSIC_%';
  textAlignHorizontal: 'LEFT' | 'RIGHT' | 'CENTER' | 'JUSTIFIED';
  textAlignVertical: 'TOP' | 'CENTER' | 'BOTTOM';
  textCase: 'LOWER' | 'UPPER' | 'TITLE' | 'SMALL_CAPS' | 'SMALL_CAPS_FORCED';
  textDecoration: 'STRIKETHROUGH' | 'UNDERLINE';
  textAutoResize: 'HEIGHT' | 'WIDTH_AND_HEIGHT';
};

type Component = {
  key: string;
  name: string;
  description: string;
};

type Style = {
  key: string;
  name: string;
  description: string;
  style_type: StyleType;
};

type StyleType = 'FILL' | 'TEXT' | 'EFFECT' | 'GRID';