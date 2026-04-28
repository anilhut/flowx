import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { useStyles2 } from '@grafana/ui';
import CollapseButton from './CollapseButton';
import { getNodeStyles, getBgClass } from './nodeStyles';

interface CustomData extends Record<string, unknown> {
  bgColorCondition: string;
  hasChildren?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface CustomNodeProps extends NodeProps {
  data: CustomData;
}

const TypeCircle: React.FC<CustomNodeProps> = (props) => {
  const styles = useStyles2(getNodeStyles);
  const { bgColorCondition, hasChildren, isCollapsed, onToggleCollapse } = props.data;

  return (
    <div className={`${styles.nodeTypeCircle} ${getBgClass(styles, bgColorCondition)}`} style={{ position: 'relative' }}>
      {props.targetPosition === 'top' && <Handle type="target" position={Position.Top} />}
      {props.targetPosition === 'left' && <Handle type="target" position={Position.Left} />}
      {props.sourcePosition === 'bottom' && <Handle type="source" position={Position.Bottom} />}
      {props.sourcePosition === 'right' && <Handle type="source" position={Position.Right} />}

      {hasChildren && onToggleCollapse && (
        <CollapseButton isCollapsed={!!isCollapsed} onToggle={onToggleCollapse} sourcePosition={props.sourcePosition ?? 'bottom'} />
      )}
    </div>
  );
};

export default TypeCircle;
