/**
 * @file 主题构建相关配置
 * @author ssshooter(472356884@qq.com)
 */

'use strict'

// 定义主题列表
let themeList = {

    // 定义主题名称
  myTheme: {
    themeColor: {
      primary: 'rgb(40, 116, 240)',
      accent: '$blue.accent-2',
      secondary: '$grey.darken-3',
      info: '$blue.base',
      warning: '$amber.base',
      error: '$red.accent-2',
      success: '$green.base'
    },
    materialDesign: {
      'bg-color': '#fff',
      'fg-color': '#000',
      'text-color': '#000',
      'primary-text-percent': 0.87,
      'secondary-text-percent': 0.54,
      'disabledORhints-text-percent': 0.38,
      'divider-percent': 0.12,
      'active-icon-percent': 0.54,
      'inactive-icon-percent': 0.38
    }
  }
}

module.exports = {
  theme: themeList.myTheme // 和主题列表中的主题名称对应
}
