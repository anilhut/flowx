import { css, keyframes } from '@emotion/css';

const c = {
  white: '#ffffff',
  red: '#f2495c',
  orange: '#ff9830',
  yellow: '#fade2a',
  green: '#73bf69',
  blue: '#5794f2',
  gray: '#ebebeb',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getNodeStyles(_theme: any) {
  const redBlink = keyframes`
    0%, 49% { background-color: ${c.white}; }
    50%, 100% { background-color: ${c.red}; }
  `;
  const orangeBlink = keyframes`
    0%, 49% { background-color: ${c.white}; }
    50%, 100% { background-color: ${c.orange}; }
  `;
  const yellowBlink = keyframes`
    0%, 49% { background-color: ${c.white}; }
    50%, 100% { background-color: ${c.yellow}; }
  `;
  const greenBlink = keyframes`
    0%, 49% { background-color: ${c.white}; }
    50%, 100% { background-color: ${c.green}; }
  `;
  const blueBlink = keyframes`
    0%, 49% { background-color: ${c.white}; }
    50%, 100% { background-color: ${c.blue}; }
  `;
  const grayBlink = keyframes`
    0%, 49% { background-color: ${c.white}; }
    50%, 100% { background-color: ${c.gray}; }
  `;

  return {
    panelContainer: css`
      width: 100%;
      height: 100%;
      color: black;
      position: relative;
      overflow: hidden;
    `,

    nodeCustomContainer: css`
      border: 1px solid black;
      text-align: center;
      border-radius: 5px;
      margin: 0;
      padding: 0;
      overflow: hidden;
      width: 240px;
      height: 242px;
    `,

    nodeTypeTitle: css`
      width: 240px !important;
      height: 50px !important;
    `,
    nodeTypeOne: css`
      width: 240px !important;
      height: 98px !important;
    `,
    nodeTypeTwo: css`
      width: 240px !important;
      height: 146px !important;
    `,
    nodeTypeThree: css`
      width: 240px !important;
      height: 194px !important;
    `,
    nodeTypeFour: css`
      width: 240px !important;
      height: 242px !important;
    `,
    nodeTypeFive: css`
      width: 240px !important;
      height: 290px !important;
    `,
    nodeTypeSix: css`
      width: 240px !important;
      height: 338px !important;
    `,

    nodeTypeCircle: css`
      width: 100px !important;
      height: 100px !important;
      border: 1px solid black;
      border-radius: 50%;
    `,
    nodeTypeDiamondContainer: css`
      width: 100px !important;
      height: 100px !important;
      display: flex;
      justify-content: center;
      align-items: center;
    `,
    nodeTypeDiamond: css`
      width: 72px;
      height: 72px;
      border: 1px solid black;
      transform: rotate(45deg);
    `,

    nodeCustomValues: css`
      height: 100%;
      display: flex;
      flex-direction: column;
    `,
    nodeCustomTitle: css`
      background-color: ${c.gray};
      border-bottom: 1px solid black;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0 5px;
    `,
    nodeCustomTitleTitle: css`
      background-color: ${c.gray};
      height: 50px;
      line-height: 50px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0 5px;
    `,
    nodeCustomData: css`
      height: calc(100% - 30px);
      display: flex;
      flex-direction: column;
      padding: 5px 0;
      margin: auto 0;
      & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        padding: 0 5px;
        & > b {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    `,

    collapseBtn: css`
      position: absolute;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 1px solid #888;
      background: ${c.white};
      color: #444;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
      z-index: 10;
      padding: 0;
      line-height: 1;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      &:hover {
        background: #f0f0f0;
        border-color: #555;
      }
    `,

    nodeButton: css`
      background-color: ${c.white};
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
      color: #000000;
      cursor: pointer;
      margin: auto;
      padding: 5px 10px;
      position: relative;
      text-decoration: none;
      transition: all 250ms;
      user-select: none;
      touch-action: manipulation;
      vertical-align: baseline;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &:hover,
      &:focus {
        border-color: rgba(0, 0, 0, 0.15);
        box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
      }
      &:active {
        background-color: #f0f0f1;
        border-color: rgba(0, 0, 0, 0.15);
        box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
      }
    `,

    nodePopup: css`
      position: absolute;
      z-index: 999;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 300px;
      box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.2);
      border: 1px solid black;
      padding: 5px;
      border-radius: 5px;
      text-align: center;
    `,
    nodePopupInside: css`
      margin: 10px;
      background-color: ${c.white};
      border: 1px solid black;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 10px;
      & > div,
      & > a {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    `,
    nodePopupTitle: css`
      background-color: ${c.gray};
      border: 1px solid black;
      border-radius: 5px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      padding: 0 5px;
    `,

    nodeBgDefault: css`
      background-color: ${c.white};
      color: black;
    `,
    nodeBgRed: css`background-color: ${c.red};`,
    nodeBgOrange: css`background-color: ${c.orange};`,
    nodeBgYellow: css`background-color: ${c.yellow};`,
    nodeBgGreen: css`background-color: ${c.green};`,
    nodeBgBlue: css`background-color: ${c.blue};`,
    nodeBgGray: css`background-color: ${c.gray};`,
    nodeBgRedBlink: css`animation: ${redBlink} 0.2s infinite;`,
    nodeBgOrangeBlink: css`animation: ${orangeBlink} 0.2s infinite;`,
    nodeBgYellowBlink: css`animation: ${yellowBlink} 0.2s infinite;`,
    nodeBgGreenBlink: css`animation: ${greenBlink} 0.2s infinite;`,
    nodeBgBlueBlink: css`animation: ${blueBlink} 0.2s infinite;`,
    nodeBgGrayBlink: css`animation: ${grayBlink} 0.2s infinite;`,
  };
}

type NodeStyles = ReturnType<typeof getNodeStyles>;

const bgConditionMap: Record<string, keyof NodeStyles> = {
  red: 'nodeBgRed',
  red_blink: 'nodeBgRedBlink',
  orange: 'nodeBgOrange',
  orange_blink: 'nodeBgOrangeBlink',
  yellow: 'nodeBgYellow',
  yellow_blink: 'nodeBgYellowBlink',
  green: 'nodeBgGreen',
  green_blink: 'nodeBgGreenBlink',
  blue: 'nodeBgBlue',
  blue_blink: 'nodeBgBlueBlink',
  gray: 'nodeBgGray',
  gray_blink: 'nodeBgGrayBlink',
};

export function getBgClass(styles: NodeStyles, condition: string): string {
  const key = bgConditionMap[condition];
  return key ? (styles[key] as string) : styles.nodeBgDefault;
}
