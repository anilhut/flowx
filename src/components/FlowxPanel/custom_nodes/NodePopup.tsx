import * as React from 'react';
import './style_nodes.css';
import goUrl from 'src/img/arrow-top-right-on-square.svg';

interface NodeData {
  title: string;
  value1_header: string;
  value1_data: string;
  value1_url: string;
  value2_header: string;
  value2_data: string;
  value2_url: string;
  value3_header: string;
  value3_data: string;
  value3_url: string;
  value4_header: string;
  value4_data: string;
  value4_url: string;
  bgColorCondition: string;
  url: string;
  url_label: string;
  [key: string]: unknown;
}

interface NodePopupProps {
  clickedNode: {
    id: string;
    data: NodeData;
  };
  onCancelClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  backgroundColor: string;
}

const NodePopup: React.FC<NodePopupProps> = ({ clickedNode, onCancelClick }) => {
  const { data } = clickedNode;

  const bgColorCondition = data.bgColorCondition;

  return (
    <>
      <div className={`anil-flowx-nodePopup ${bgColorCondition}`} style={{ color: 'black' }}>
        <div className="anil-flowx-nodePopupInside">
          {data.title && (
            <>
              <div className="anil-flowx-nodePopupTitle" title={data.title}>
                {data.title}
              </div>
            </>
          )}

          {data.url && (
            <a
              className="anil-flowx-nodeButton"
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'black' }}
            >
              {data.url_label ? data.url_label : data.url}
            </a>
          )}

          {data.value1_data && (
            <div>
              <b title={data.value1_header}>{data.value1_header}</b>
              <div>
                {data.value1_data}
                {data.value1_url && (
                  <a href={data.value1_url} target="_blank" rel="noopener noreferrer">
                    {' '}
                    <img src={goUrl} height={20} />
                  </a>
                )}
              </div>
            </div>
          )}

          {data.value2_data && (
            <div>
              <b title={data.value2_header}>{data.value2_header}</b>
              <div>
                {data.value2_data}
                {data.value2_url && (
                  <a href={data.value2_url} target="_blank" rel="noopener noreferrer">
                    {' '}
                    <img src={goUrl} height={18} />
                  </a>
                )}
              </div>
            </div>
          )}

          {data.value3_data && (
            <div>
              <b title={data.value3_header}>{data.value3_header}</b>
              <div>
                {data.value3_data}
                {data.value3_url && (
                  <a href={data.value3_url} target="_blank" rel="noopener noreferrer">
                    {' '}
                    <img src={goUrl} height={18} />
                  </a>
                )}
              </div>
            </div>
          )}

          {data.value4_data && (
            <div>
              <b title={data.value4_header}>{data.value4_header}</b>
              <div>
                {data.value4_data}
                {data.value4_url && (
                  <a href={data.value4_url} target="_blank" rel="noopener noreferrer">
                    {' '}
                    <img src={goUrl} height={18} />
                  </a>
                )}
              </div>
            </div>
          )}

          <button className="anil-flowx-nodeButton" onClick={onCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default NodePopup;
