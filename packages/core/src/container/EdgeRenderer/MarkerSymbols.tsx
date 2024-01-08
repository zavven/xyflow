import React, { useMemo } from 'react';

import { MarkerType } from '../../types';
import type { EdgeMarker } from '../../types';
import { useStoreApi } from '../../hooks/useStore';
import { errorMessages } from '../../contants';

type SymbolProps = Omit<EdgeMarker, 'type'>;

/** 箭头（线型），用于服务关系、访问关系、影响关系 */
const ArrowSymbol = ({ color = 'none', strokeWidth = 1 }: SymbolProps) => {
  return (
    <polyline
      style={{
        stroke: color,
        strokeWidth,
      }}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      points="-5,-4 0,0 -5,4"
    />
  );
};

/** 箭头（填充），用于指派关系终点、触发关系、流量关系 */
const ArrowClosedSymbol = ({ color = 'none', strokeWidth = 1 }: SymbolProps) => {
  return (
    <polyline
      style={{
        stroke: color,
        fill: color,
        strokeWidth,
      }}
      strokeLinecap="round"
      strokeLinejoin="round"
      points="-5,-4 0,0 -5,4 -5,-4"
    />
  );
};

/** 箭头（空心），用于实现关系、专业化关系 */
const ArrowEmptySymbol = ({ color = 'none', strokeWidth = 1 }: SymbolProps) => {
  return (
    <polyline
      style={{
        stroke: color,
        fill: '#fff',
        strokeWidth,
      }}
      strokeLinecap="round"
      strokeLinejoin="round"
      points="-5,-4 0,0 -5,4 -5,-4"
    />
  );
};

/** 箭头（单边），用于关联关系 */
const ArrowSingleSymbol = ({ color = 'none', strokeWidth = 1 }: SymbolProps) => {
  return (
    <polyline
      style={{
        stroke: color,
        strokeWidth,
      }}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      points="-5,-4 0,0"
    />
  );
};

/** 菱形（空心），用于聚合关系 */
const DiagonalSymbol = ({ color = 'none', strokeWidth = 1 }: SymbolProps) => {
  return (
    <polyline
      style={{
        stroke: color,
        fill: '#fff',
        strokeWidth,
      }}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      points="-5,-4 0,0 -5,4 -10, 0"
    />
  );
};

/** 菱形（填充），用于组合关系 */
const DiagonalFilledSymbol = ({ color = 'none', strokeWidth = 1 }: SymbolProps) => {
  return (
    <polyline
      style={{
        stroke: color,
        fill: color,
        strokeWidth,
      }}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      points="-5,-4 0,0 -5,4 -10, 0"
    />
  );
};

/** 圆点（填充），用于指派关系起点、交界点（与） */
const CircleFilledSymbol = ({ color = 'none', strokeWidth = 1 }: SymbolProps) => {
  return (
    <circle
      cx="5"
      cy="5"
      r="5"
      style={{
        fill: color,
        stroke: color,
        strokeWidth,
      }}
    />
  );
};

/** 圆点（空心），用于交界点（或） */
const CircleSymbol = ({ color = 'none', strokeWidth = 1 }: SymbolProps) => {
  return (
    <circle
      cx="5"
      cy="5"
      r="5"
      style={{
        stroke: color,
        fill: '#fff',
        strokeWidth,
      }}
    />
  );
};

export const MarkerSymbols = {
  [MarkerType.Arrow]: ArrowSymbol,
  [MarkerType.ArrowClosed]: ArrowClosedSymbol,
  [MarkerType.ArrowSingle]: ArrowSingleSymbol,
  [MarkerType.ArrowEmpty]: ArrowEmptySymbol,
  [MarkerType.Diagonal]: DiagonalSymbol,
  [MarkerType.DiagonalFilled]: DiagonalFilledSymbol,
  [MarkerType.Circle]: CircleSymbol,
  [MarkerType.CircleFilled]: CircleFilledSymbol,
};

export function useMarkerSymbol(type: MarkerType) {
  const store = useStoreApi();

  const symbol = useMemo(() => {
    const symbolExists = Object.prototype.hasOwnProperty.call(MarkerSymbols, type);

    if (!symbolExists) {
      store.getState().onError?.('009', errorMessages['error009'](type));

      return null;
    }

    return MarkerSymbols[type];
  }, [type]);

  return symbol;
}

export default MarkerSymbols;
