/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CSSProperties, ComponentType, HTMLAttributes, ReactNode, MouseEvent as ReactMouseEvent } from 'react';

import { ConnectionStatus, Position } from '.';
import type { Connection, HandleElement, HandleType, Node } from '.';

type EdgeLabelOptions = {
  label?: string | ReactNode;
  labelStyle?: CSSProperties;
  labelShowBg?: boolean;
  labelBgStyle?: CSSProperties;
  labelBgPadding?: [number, number];
  labelBgBorderRadius?: number;
};

// interface for the user edge items
type DefaultEdge<T = any> = {
  id: string;
  type?: string;
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;
  style?: CSSProperties;
  animated?: boolean;
  hidden?: boolean;
  deletable?: boolean;
  data?: T;
  className?: string;
  sourceNode?: Node;
  targetNode?: Node;
  selected?: boolean;
  markerStart?: EdgeMarkerType;
  markerEnd?: EdgeMarkerType;
  zIndex?: number;
  ariaLabel?: string;
  interactionWidth?: number;
  focusable?: boolean;
  updatable?: EdgeUpdatable;
} & EdgeLabelOptions;

export type EdgeUpdatable = boolean | HandleType;

export type SmoothStepPathOptions = {
  offset?: number;
  borderRadius?: number;
};

type SmoothStepEdgeType<T> = DefaultEdge<T> & {
  type: 'smoothstep';
  pathOptions?: SmoothStepPathOptions;
};

export type BezierPathOptions = {
  curvature?: number;
};

type BezierEdgeType<T> = DefaultEdge<T> & {
  type: 'default';
  pathOptions?: BezierPathOptions;
};

export type Edge<T = any> = DefaultEdge<T> | SmoothStepEdgeType<T> | BezierEdgeType<T>;

export type DefaultEdgeOptions = Omit<
  Edge,
  'id' | 'source' | 'target' | 'sourceHandle' | 'targetHandle' | 'sourceNode' | 'targetNode'
>;

export type EdgeMouseHandler = (event: ReactMouseEvent, edge: Edge) => void;

export type WrapEdgeProps<T = any> = Omit<Edge<T>, 'sourceHandle' | 'targetHandle'> & {
  onClick?: EdgeMouseHandler;
  onEdgeDoubleClick?: EdgeMouseHandler;
  sourceHandleId?: string | null;
  targetHandleId?: string | null;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: Position;
  targetPosition: Position;
  elementsSelectable?: boolean;
  onEdgeUpdate?: OnEdgeUpdateFunc;
  onContextMenu?: EdgeMouseHandler;
  onMouseEnter?: EdgeMouseHandler;
  onMouseMove?: EdgeMouseHandler;
  onMouseLeave?: EdgeMouseHandler;
  edgeUpdaterRadius?: number;
  onEdgeUpdateStart?: (event: ReactMouseEvent, edge: Edge, handleType: HandleType) => void;
  onEdgeUpdateEnd?: (event: MouseEvent | TouchEvent, edge: Edge, handleType: HandleType) => void;
  rfId?: string;
  isFocusable: boolean;
  isUpdatable: EdgeUpdatable;
  pathOptions?: BezierPathOptions | SmoothStepPathOptions;
};

// props that get passed to a custom edge
export type EdgeProps<T = any> = Pick<
  Edge<T>,
  'id' | 'animated' | 'data' | 'style' | 'selected' | 'source' | 'target'
> &
  Pick<
    WrapEdgeProps,
    | 'sourceX'
    | 'sourceY'
    | 'targetX'
    | 'targetY'
    | 'sourcePosition'
    | 'targetPosition'
    | 'sourceHandleId'
    | 'targetHandleId'
    | 'interactionWidth'
  > &
  EdgeLabelOptions & {
    markerStart?: string;
    markerEnd?: string;
    // @TODO: how can we get better types for pathOptions?
    pathOptions?: any;
  };

export type BaseEdgeProps = Pick<EdgeProps, 'style' | 'markerStart' | 'markerEnd' | 'interactionWidth'> &
  EdgeLabelOptions & {
    id?: string;
    labelX?: number;
    labelY?: number;
    path: string;
  };

export type SmoothStepEdgeProps<T = any> = EdgeProps<T> & {
  pathOptions?: SmoothStepPathOptions;
};

export type BezierEdgeProps<T = any> = EdgeProps<T> & {
  pathOptions?: BezierPathOptions;
};

export type EdgeTextProps = HTMLAttributes<SVGElement> &
  EdgeLabelOptions & {
    x: number;
    y: number;
  };

export enum ConnectionLineType {
  Bezier = 'default',
  Straight = 'straight',
  Step = 'step',
  SmoothStep = 'smoothstep',
  SimpleBezier = 'simplebezier',
}

export type ConnectionLineComponentProps = {
  connectionLineStyle?: CSSProperties;
  connectionLineType: ConnectionLineType;
  fromNode?: Node;
  fromHandle?: HandleElement;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  fromPosition: Position;
  toPosition: Position;
  connectionStatus: ConnectionStatus | null;
};

export type ConnectionLineComponent = ComponentType<ConnectionLineComponentProps>;

export type OnEdgeUpdateFunc<T = any> = (oldEdge: Edge<T>, newConnection: Connection) => void;

export type EdgeMarker = {
  type: MarkerType;
  color?: string;
  width?: number;
  height?: number;
  markerUnits?: string;
  orient?: string;
  strokeWidth?: number;
};

export type EdgeMarkerType = string | EdgeMarker;

export enum MarkerType {
   /** 箭头（线型），用于服务关系、访问关系、影响关系 */
   Arrow = 'arrow',
   /** 箭头（填充），用于指派关系终点、触发关系、流量关系 */
   ArrowClosed = 'arrowclosed',
   /** 箭头（单边），用于关联关系 */
   ArrowSingle = 'arrow-single',
   /** 箭头（空心），用于实现关系、专业化关系 */
   ArrowEmpty = 'arrow-empty',
   /** 菱形（空心），用于聚合关系 */
   Diagonal = 'diagonal',
   /** 菱形（填充），用于组合关系 */
   DiagonalFilled = 'diagonal-filled',
   /** 圆点（空心），用于交界点（或） */
   Circle = 'circle',
   /** 圆点（填充），用于指派关系起点、交界点（与） */
   CircleFilled = 'circle-filled',
}
