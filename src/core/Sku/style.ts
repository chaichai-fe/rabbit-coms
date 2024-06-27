import { css } from '@emotion/css'

const skuClass = css`
  padding-left: 10px;
  padding-top: 20px;
  font-size: 13px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      > img {
        width: 50px;
        height: 50px;
        margin-bottom: 4px;
        border: 1px solid #e4e4e4;
        margin-right: 10px;
        cursor: pointer;

        &.selected {
          border-color: #27ba9b;
        }

        &.disabled {
          opacity: 0.6;
          border-style: dashed;
          cursor: not-allowed;
        }
      }

      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-bottom: 4px;
        border: 1px solid #e4e4e4;
        margin-right: 10px;
        cursor: pointer;

        &.selected {
          border-color: #27ba9b;
        }

        &.disabled {
          opacity: 0.6;
          border-style: dashed;
          cursor: not-allowed;
        }
      }
    }
  }
`
export { skuClass }
