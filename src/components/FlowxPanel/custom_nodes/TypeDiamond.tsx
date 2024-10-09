import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';

interface CustomData extends Record<string, unknown> {
  bgColorCondition: string;
}

interface CustomNodeProps extends NodeProps {
  data: CustomData;
}

const TypeDiamond: React.FC<CustomNodeProps> = (props) => {
  const { bgColorCondition } = props.data;

  return (
    <div className={`anil-flowx-nodeTypeDiamondContainer`}>
      {props.targetPosition === 'top' && <Handle type="target" position={Position.Top} />}
      {props.targetPosition === 'left' && <Handle type="target" position={Position.Left} />}
      {props.sourcePosition === 'bottom' && <Handle type="source" position={Position.Bottom} />}
      {props.sourcePosition === 'right' && <Handle type="source" position={Position.Right} />}
      <div className={`anil-flowx-nodeTypeDiamond ${bgColorCondition}`}></div>
    </div>
  );
};

export default TypeDiamond;
