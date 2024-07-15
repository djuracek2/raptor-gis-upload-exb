import { type IMThemeVariables, css, type SerializedStyles, getAppStore, polished } from 'jimu-core'

export function getStyle (theme: IMThemeVariables, mobileFlag: boolean, searchOn: boolean, partProps): SerializedStyles {
  const { id, isHeightAuto, isWidthAuto, headerFontSetting, horizontalTag } = partProps
  const themeName = getAppStore().getState()?.appConfig?.theme
  const isViolet = themeName === 'themes/morandi/'
  const isInk = themeName === 'themes/ink/'

  return css`
    ${'&.table-widget-' + id} {
      .table-indent{
        width: calc(100% - 32px);
        height: calc(100% - 26px);
        margin: 10px 16px 16px;
        display: inline-block;
        ${isHeightAuto && 'min-height: 190px;'};
        ${isWidthAuto && 'min-width: 360px;'};
        .horizontal-action-dropdown{
          button{
            width: 32px;
            height: 32px;
          }
        }
        .tool-dividing-line{
          height: 16px;
          width: 1px;
          display: inline-flex;
          background-color: ${theme.colors.palette.light[400]};
          margin: 8px 4px;
        }
        .data-action-btn{
          position: relative;
        }
      }
      .tab-title{
        user-select: none;
        margin: auto;
      }
      .tab-flex{
        width: 100%;
        overflow-x: auto;
        .closeable{
          height: 31px;
        }
      }
      .top-drop{
        width: 30%;
        min-width: 150px;
        button{
          line-height: 1.5;
        }
      }
      .nav-underline{
        height: 32px;
        border-bottom: 1px solid ${theme.colors.palette.light[300]};
        .nav-item{
          ${(isViolet || isInk) && 'height: 30px;'}
        }
      }
      .nav-item + .nav-item{
        margin-left: 0;
      }
      .csv-dropdown-con{
        button{
          border-radius: 13px;
        }
      }
      .vertical-tag-list{
        width: 20%;
        display: inline-block;
        .tagBtn{
          width: 100%;
        }
      }
      .horizontal-tag-list{
        .tagBtn{
          width: 150px;
        }
        .tab-content{
          height: 8px;
        }
      }
      .vertical-tag-list,
      .horizontal-tag-list{
        margin-bottom: 4px;
        .activeBtn{
          color: #fff;
          background-color: #076fe5;
        }
      }
      .dropdown-tag-list{
        height: 40px;
        margin-bottom: 4px;
        .dropdown-button{
          height: 32px;
        }
      }
      .vertical-render-con{
        width: 80%;
        position: absolute;
        left: 20%;
        height: 100%;
        top: 0;
      }
      .dropdown-render-con,
      .horizontal-render-con{
        width: 100%;
        height: calc(100% - 45px);
      }
      .top-button-list{
        ${searchOn && `
          margin: 8px 0;
          position: absolute;
          right: 17px;
          top: 47px;
        `}
        ${!searchOn && !horizontalTag && `
          position: absolute;
          right: 17px;
        `}
        ${mobileFlag ? 'display: none' : 'display: flex'};
        .top-button{
          display: inline-flex;
          button{
            width: 32px;
            height: 32px;
          }
        }
      }
      .table-search-div{
        position: absolute;
        left: 16px;
        .table-search{
          .search-icon{
            z-index: 2;
          }
          .search-input{
            border: 1px solid ${theme.colors.palette.light[400]};
            border-radius: 2px;
            .input-wrapper{
              height: 30px;
              border: none;
            }
          }
        }
      }
      .table-con{
        width: 100%;
        height: 100%;
        .esri-widget{
          background-color: transparent;
        }
        .esri-grid .esri-column__sorter{
          overflow-x: auto;
          overflow-y: hidden;
        }
        .esri-field-column__header-root{
          ${headerFontSetting?.backgroundColor && `background-color: ${headerFontSetting.backgroundColor};`}
          ${headerFontSetting?.fontSize && `font-size: ${headerFontSetting.fontSize}px;`}
          ${headerFontSetting?.bold && 'font-weight: bold;'}
          ${headerFontSetting?.color && `color: ${headerFontSetting.color};`}
        }
        .esri-field-column__header-content{
          width: calc(100% - 26px);
          overflow: unset;
        }
        .esri-feature-table__loader-container{
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: -16px;
          margin-top: -20px;
          z-index: 2;
        }
        .esri-feature-table__header{
          ${!searchOn && 'display: none;'}
        }
        .esri-feature-table__title{
          display: none;
        }
        .esri-feature-table__menu{
          display: none;
        }
        .esri-feature-table__content{
          min-height: 145px;
        }
      }
      .adv-select-con{
        width: 200px;
        visibility: hidden;
        position: absolute;
        right: 17px;
        top: 56px;
      }
      .placeholder-table-con{
        height: calc(100% - 40px);
        width: 100%;
        position: relative;
        top: 40px;
        .jimu-widget-placeholder{
          width: 100%;
        }
        .placeholder-alert-con{
          position: absolute;
          right: 10px;
          bottom: 10px;
        }
      }
      .placeholder-reset-con{
        height: calc(100% - 114px);
        width: calc(100% - 32px);
        position: absolute;
        top: 95px;
        z-index: 1001;
        .placeholder-reset-button{
          position: absolute;
          top: calc(50% + 42px);
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
        }
      }
      .ds-container{
        position: absolute;
        display: none;
      }
      .dropdown-button-content{
        .table-action-option-close{
          display: none;
        }
      }
      .refresh-loading-con {
        right: 0;
        height: ${polished.rem(16)};
        .auto-refresh-loading {
          background: ${polished.rgba(theme.colors?.palette?.light?.[100], 0.65)};
          color: ${theme.colors?.black};
          font-size: ${polished.rem(12)};
          line-height: ${polished.rem(16)};
          ${!mobileFlag && `padding: 0 ${polished.rem(7)};`}
          .icon-btn{
            padding: ${polished.rem(1)};
          }
        }
      }
      .table-count{
        left: 0;
        bottom: 0;
        height: ${polished.rem(16)};
        .total-count-text{
          background: ${polished.rgba(theme.colors?.palette?.light?.[100], 0.65)};
          color: ${theme.colors?.black};
          font-size: ${polished.rem(12)};
          line-height: ${polished.rem(16)};
          padding: 0 ${polished.rem(7)};
        }
      }
      .dropdown-list-container{
        ${searchOn && `
          position: absolute;
          right: 17px;
          top: 55px;
        `}
        ${!searchOn && !horizontalTag && `
          position: absolute;
          right: 17px;
        `}
        .dropdown-list{
          ${!mobileFlag && 'display: none;'}
          width: 32px;
          height: 32px;
        }
      }
    }
  `
}

export function getSuggestionStyle (suggestionWidth?: number): SerializedStyles {
  return css`
    & {
      max-height: ${polished.rem(300)};
      min-width: ${polished.rem(200)};
      overflow: auto;
    }
    button {
      display: block;
      width: 100%;
      text-align: left;
      border: none;
      border-radius: 0;
    }
    button:hover {
      border: none;
    }
  `
}
