import React from 'react';
import { useStyles2 } from '@grafana/ui';
import { getNodeStyles } from './nodeStyles';

interface CollapseButtonProps {
  isCollapsed: boolean;
  onToggle: () => void;
  sourcePosition: string;
}

const CollapseButton: React.FC<CollapseButtonProps> = ({ isCollapsed, onToggle, sourcePosition }) => {
  const styles = useStyles2(getNodeStyles);
  const isRight = sourcePosition === 'right';

  const style: React.CSSProperties = isRight
    ? { right: -10, top: '50%', transform: 'translateY(-50%)' }
    : { bottom: -10, left: '50%', transform: 'translateX(-50%)' };

  return (
    <button
      className={styles.collapseBtn}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      title={isCollapsed ? 'Expand' : 'Collapse'}
    >
      {isCollapsed ? '+' : '−'}
    </button>
  );
};

export default CollapseButton;
