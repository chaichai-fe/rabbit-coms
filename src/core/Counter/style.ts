import { css } from '@emotion/css'

export const CounterClass = css`
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .counter {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > span {
      user-select: none;
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      cursor: pointer;

      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
      border: none; /* 移除边框 */
      outline: none; /* 移除焦点时的轮廓 */
      background-color: transparent; /* 清除背景色 */
      box-shadow: none; /* 移除阴影效果 */
    }
  }
`
