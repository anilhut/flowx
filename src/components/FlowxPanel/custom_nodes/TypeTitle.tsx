import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { useStyles2 } from '@grafana/ui';
import CollapseButton from './CollapseButton';
import { getNodeStyles, getBgClass } from './nodeStyles';

interface CustomData extends Record<string, unknown> {
  title: string;
  bgColorCondition: string;
  hasChildren?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface CustomNodeProps extends NodeProps {
  data: CustomData;
}

const TypeTitle: React.FC<CustomNodeProps> = (props) => {
  const styles = useStyles2(getNodeStyles);
  const { title, bgColorCondition, hasChildren, isCollapsed, onToggleCollapse } = props.data;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div className={`${styles.nodeCustomContainer} ${styles.nodeTypeTitle} ${getBgClass(styles, bgColorCondition)}`}>
        {props.targetPosition === 'top' && <Handle type="target" position={Position.Top} />}
        {props.targetPosition === 'left' && <Handle type="target" position={Position.Left} />}
        {props.sourcePosition === 'bottom' && <Handle type="source" position={Position.Bottom} />}
        {props.sourcePosition === 'right' && <Handle type="source" position={Position.Right} />}

        <div className={styles.nodeCustomValues}>
          {title && (
            <div className={styles.nodeCustomTitleTitle} title={title}>
              <b>{title}</b>
            </div>
          )}
        </div>
      </div>

      {hasChildren && onToggleCollapse && (
        <CollapseButton
          isCollapsed={!!isCollapsed}
          onToggle={onToggleCollapse}
          sourcePosition={props.sourcePosition ?? 'bottom'}
        />
      )}
    </div>
  );
};

export default TypeTitle;
