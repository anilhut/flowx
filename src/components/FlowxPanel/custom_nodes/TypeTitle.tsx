import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';

interface CustomData extends Record<string, unknown> {
  title: string;
  bgColorCondition: string;
}

interface CustomNodeProps extends NodeProps {
  data: CustomData;
}

const TypeTitle: React.FC<CustomNodeProps> = (props) => {
  const { title, bgColorCondition } = props.data;

  return (
    <div className={`nodeCustomContainer nodeTypeTitle ${bgColorCondition}`}>
      {props.targetPosition === 'top' && <Handle type="target" position={Position.Top} />}
      {props.targetPosition === 'left' && <Handle type="target" position={Position.Left} />}
      {props.sourcePosition === 'bottom' && <Handle type="source" position={Position.Bottom} />}
      {props.sourcePosition === 'right' && <Handle type="source" position={Position.Right} />}

      <div className="nodeCustomValues">
        {title && (
          <div className="nodeCustomTitleTitle" title={title}>
            <b>{title}</b>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypeTitle;
