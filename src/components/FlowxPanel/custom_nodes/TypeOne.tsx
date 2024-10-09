import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';

interface CustomData extends Record<string, unknown> {
  title: string;
  value1_header: string;
  value1_data: string;
  bgColorCondition: string;
}

interface CustomNodeProps extends NodeProps {
  data: CustomData;
}

const TypeOne: React.FC<CustomNodeProps> = (props) => {
  const { title, value1_header, value1_data, bgColorCondition } = props.data;

  return (
    <div className={`anil-flowx-nodeCustomContainer anil-flowx-nodeTypeOne ${bgColorCondition}`}>
      {props.targetPosition === 'top' && <Handle type="target" position={Position.Top} />}
      {props.targetPosition === 'left' && <Handle type="target" position={Position.Left} />}
      {props.sourcePosition === 'bottom' && <Handle type="source" position={Position.Bottom} />}
      {props.sourcePosition === 'right' && <Handle type="source" position={Position.Right} />}

      <div className="anil-flowx-nodeCustomValues">
        {title && (
          <div title={title} className="anil-flowx-nodeCustomTitle">
            <b>{title}</b>
          </div>
        )}
        <div className="anil-flowx-nodeCustomData">
          {value1_header && (
            <div title={value1_header}>
              <b>{value1_header}</b>
            </div>
          )}
          {value1_data && <div>{value1_data}</div>}
        </div>
      </div>
    </div>
  );
};

export default TypeOne;
