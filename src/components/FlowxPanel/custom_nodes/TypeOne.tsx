import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { useStyles2 } from '@grafana/ui';
import CollapseButton from './CollapseButton';
import { getNodeStyles, getBgClass } from './nodeStyles';

interface CustomData extends Record<string, unknown> {
  title: string;
  value1_header: string;
  value1_data: string;
  bgColorCondition: string;
  hasChildren?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface CustomNodeProps extends NodeProps {
  data: CustomData;
}

const TypeOne: React.FC<CustomNodeProps> = (props) => {
  const styles = useStyles2(getNodeStyles);
  const { title, value1_header, value1_data, bgColorCondition, hasChildren, isCollapsed, onToggleCollapse } = props.data;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div className={`${styles.nodeCustomContainer} ${styles.nodeTypeOne} ${getBgClass(styles, bgColorCondition)}`}>
        {props.targetPosition === 'top' && <Handle type="target" position={Position.Top} />}
        {props.targetPosition === 'left' && <Handle type="target" position={Position.Left} />}
        {props.sourcePosition === 'bottom' && <Handle type="source" position={Position.Bottom} />}
        {props.sourcePosition === 'right' && <Handle type="source" position={Position.Right} />}

        <div className={styles.nodeCustomValues}>
          {title && (
            <div title={title} className={styles.nodeCustomTitle}>
              <b>{title}</b>
            </div>
          )}
          <div className={styles.nodeCustomData}>
            {value1_header && (
              <div title={value1_header}>
                <b>{value1_header}</b>
              </div>
            )}
            {value1_data && <div>{value1_data}</div>}
          </div>
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

export default TypeOne;
