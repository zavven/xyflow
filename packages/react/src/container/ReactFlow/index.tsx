import { forwardRef, type CSSProperties } from 'react';
import cc from 'classcat';
import {
  ConnectionLineType,
  PanOnScrollMode,
  SelectionMode,
  infiniteExtent,
  type NodeOrigin,
  type Viewport,
  isMacOs,
} from '@xyflow/system';

import Attribution from '../../components/Attribution';

import SelectionListener from '../../components/SelectionListener';
import StoreUpdater from '../../components/StoreUpdater';
import A11yDescriptions from '../../components/A11yDescriptions';
import GraphView from '../GraphView';
import Wrapper from './Wrapper';
import type { ReactFlowProps, ReactFlowRefType } from '../../types';
import useColorModeClass from '../../hooks/useColorModeClass';

export const initNodeOrigin: NodeOrigin = [0, 0];
const initDefaultViewport: Viewport = { x: 0, y: 0, zoom: 1 };

const wrapperStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  zIndex: 0,
};

const ReactFlow = forwardRef<ReactFlowRefType, ReactFlowProps>(
  (
    {
      nodes,
      edges,
      defaultNodes,
      defaultEdges,
      className,
      nodeTypes,
      edgeTypes,
      onNodeClick,
      onEdgeClick,
      onInit,
      onMove,
      onMoveStart,
      onMoveEnd,
      onConnect,
      onConnectStart,
      onConnectEnd,
      onClickConnectStart,
      onClickConnectEnd,
      onNodeMouseEnter,
      onNodeMouseMove,
      onNodeMouseLeave,
      onNodeContextMenu,
      onNodeDoubleClick,
      onNodeDragStart,
      onNodeDrag,
      onNodeDragStop,
      onNodesDelete,
      onEdgesDelete,
      onDelete,
      onSelectionChange,
      onSelectionDragStart,
      onSelectionDrag,
      onSelectionDragStop,
      onSelectionContextMenu,
      onSelectionStart,
      onSelectionEnd,
      onBeforeDelete,
      connectionMode,
      connectionLineType = ConnectionLineType.Bezier,
      connectionLineStyle,
      connectionLineComponent,
      connectionLineContainerStyle,
      deleteKeyCode = 'Backspace',
      selectionKeyCode = 'Shift',
      selectionOnDrag = false,
      selectionMode = SelectionMode.Full,
      panActivationKeyCode = 'Space',
      multiSelectionKeyCode = isMacOs() ? 'Meta' : 'Control',
      zoomActivationKeyCode = isMacOs() ? 'Meta' : 'Control',
      snapToGrid,
      snapGrid,
      onlyRenderVisibleElements = false,
      selectNodesOnDrag,
      nodesDraggable,
      nodesConnectable,
      nodesFocusable,
      nodeOrigin = initNodeOrigin,
      edgesFocusable,
      edgesUpdatable,
      elementsSelectable = true,
      defaultViewport = initDefaultViewport,
      minZoom = 0.5,
      maxZoom = 2,
      translateExtent = infiniteExtent,
      preventScrolling = true,
      nodeExtent,
      defaultMarkerColor = '#b1b1b7',
      zoomOnScroll = true,
      zoomOnPinch = true,
      panOnScroll = false,
      panOnScrollSpeed = 0.5,
      panOnScrollMode = PanOnScrollMode.Free,
      zoomOnDoubleClick = true,
      panOnDrag = true,
      onPaneClick,
      onPaneMouseEnter,
      onPaneMouseMove,
      onPaneMouseLeave,
      onPaneScroll,
      onPaneContextMenu,
      children,
      onEdgeUpdate,
      onEdgeContextMenu,
      onEdgeDoubleClick,
      onEdgeMouseEnter,
      onEdgeMouseMove,
      onEdgeMouseLeave,
      onEdgeUpdateStart,
      onEdgeUpdateEnd,
      edgeUpdaterRadius = 10,
      onNodesChange,
      onEdgesChange,
      noDragClassName = 'nodrag',
      noWheelClassName = 'nowheel',
      noPanClassName = 'nopan',
      fitView,
      fitViewOptions,
      connectOnClick,
      attributionPosition,
      proOptions,
      defaultEdgeOptions,
      elevateNodesOnSelect,
      elevateEdgesOnSelect,
      disableKeyboardA11y = false,
      autoPanOnConnect,
      autoPanOnNodeDrag,
      connectionRadius,
      isValidConnection,
      onError,
      style,
      id,
      nodeDragThreshold,
      viewport,
      onViewportChange,
      width,
      height,
      colorMode = 'light',
      ...rest
    },
    ref
  ) => {
    const rfId = id || '1';
    const colorModeClassName = useColorModeClass(colorMode);

    return (
      <div
        {...rest}
        style={{ ...style, ...wrapperStyle }}
        ref={ref}
        className={cc(['react-flow', className, colorModeClassName])}
        data-testid="rf__wrapper"
        id={id}
      >
        <Wrapper nodes={nodes} edges={edges} width={width} height={height} fitView={fitView}>
          <GraphView
            onInit={onInit}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            onNodeMouseEnter={onNodeMouseEnter}
            onNodeMouseMove={onNodeMouseMove}
            onNodeMouseLeave={onNodeMouseLeave}
            onNodeContextMenu={onNodeContextMenu}
            onNodeDoubleClick={onNodeDoubleClick}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            connectionLineType={connectionLineType}
            connectionLineStyle={connectionLineStyle}
            connectionLineComponent={connectionLineComponent}
            connectionLineContainerStyle={connectionLineContainerStyle}
            selectionKeyCode={selectionKeyCode}
            selectionOnDrag={selectionOnDrag}
            selectionMode={selectionMode}
            deleteKeyCode={deleteKeyCode}
            multiSelectionKeyCode={multiSelectionKeyCode}
            panActivationKeyCode={panActivationKeyCode}
            zoomActivationKeyCode={zoomActivationKeyCode}
            onlyRenderVisibleElements={onlyRenderVisibleElements}
            defaultViewport={defaultViewport}
            translateExtent={translateExtent}
            minZoom={minZoom}
            maxZoom={maxZoom}
            preventScrolling={preventScrolling}
            zoomOnScroll={zoomOnScroll}
            zoomOnPinch={zoomOnPinch}
            zoomOnDoubleClick={zoomOnDoubleClick}
            panOnScroll={panOnScroll}
            panOnScrollSpeed={panOnScrollSpeed}
            panOnScrollMode={panOnScrollMode}
            panOnDrag={panOnDrag}
            onPaneClick={onPaneClick}
            onPaneMouseEnter={onPaneMouseEnter}
            onPaneMouseMove={onPaneMouseMove}
            onPaneMouseLeave={onPaneMouseLeave}
            onPaneScroll={onPaneScroll}
            onPaneContextMenu={onPaneContextMenu}
            onSelectionContextMenu={onSelectionContextMenu}
            onSelectionStart={onSelectionStart}
            onSelectionEnd={onSelectionEnd}
            onEdgeUpdate={onEdgeUpdate}
            onEdgeContextMenu={onEdgeContextMenu}
            onEdgeDoubleClick={onEdgeDoubleClick}
            onEdgeMouseEnter={onEdgeMouseEnter}
            onEdgeMouseMove={onEdgeMouseMove}
            onEdgeMouseLeave={onEdgeMouseLeave}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
            edgeUpdaterRadius={edgeUpdaterRadius}
            defaultMarkerColor={defaultMarkerColor}
            noDragClassName={noDragClassName}
            noWheelClassName={noWheelClassName}
            noPanClassName={noPanClassName}
            rfId={rfId}
            disableKeyboardA11y={disableKeyboardA11y}
            nodeOrigin={nodeOrigin}
            nodeExtent={nodeExtent}
            viewport={viewport}
            onViewportChange={onViewportChange}
          />
          <StoreUpdater
            nodes={nodes}
            edges={edges}
            defaultNodes={defaultNodes}
            defaultEdges={defaultEdges}
            onConnect={onConnect}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
            onClickConnectStart={onClickConnectStart}
            onClickConnectEnd={onClickConnectEnd}
            nodesDraggable={nodesDraggable}
            nodesConnectable={nodesConnectable}
            nodesFocusable={nodesFocusable}
            edgesFocusable={edgesFocusable}
            edgesUpdatable={edgesUpdatable}
            elementsSelectable={elementsSelectable}
            elevateNodesOnSelect={elevateNodesOnSelect}
            elevateEdgesOnSelect={elevateEdgesOnSelect}
            minZoom={minZoom}
            maxZoom={maxZoom}
            nodeExtent={nodeExtent}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            snapToGrid={snapToGrid}
            snapGrid={snapGrid}
            connectionMode={connectionMode}
            translateExtent={translateExtent}
            connectOnClick={connectOnClick}
            defaultEdgeOptions={defaultEdgeOptions}
            fitView={fitView}
            fitViewOptions={fitViewOptions}
            onNodesDelete={onNodesDelete}
            onEdgesDelete={onEdgesDelete}
            onDelete={onDelete}
            onNodeDragStart={onNodeDragStart}
            onNodeDrag={onNodeDrag}
            onNodeDragStop={onNodeDragStop}
            onSelectionDrag={onSelectionDrag}
            onSelectionDragStart={onSelectionDragStart}
            onSelectionDragStop={onSelectionDragStop}
            onMove={onMove}
            onMoveStart={onMoveStart}
            onMoveEnd={onMoveEnd}
            noPanClassName={noPanClassName}
            nodeOrigin={nodeOrigin}
            rfId={rfId}
            autoPanOnConnect={autoPanOnConnect}
            autoPanOnNodeDrag={autoPanOnNodeDrag}
            onError={onError}
            connectionRadius={connectionRadius}
            isValidConnection={isValidConnection}
            selectNodesOnDrag={selectNodesOnDrag}
            nodeDragThreshold={nodeDragThreshold}
            onBeforeDelete={onBeforeDelete}
          />
          <SelectionListener onSelectionChange={onSelectionChange} />
          {children}
          <Attribution proOptions={proOptions} position={attributionPosition} />
          <A11yDescriptions rfId={rfId} disableKeyboardA11y={disableKeyboardA11y} />
        </Wrapper>
      </div>
    );
  }
);

ReactFlow.displayName = 'ReactFlow';

export default ReactFlow;
