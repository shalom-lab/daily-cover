/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AspectRatioType = '2.35:1' | '1:1';

export type FrameThemeId = 
  | 'songheSpring'       // 松鹤迎春 (仙鹤苍松·天青画卷)
  | 'wuguHarvest'        // 五谷丰登 (金穗丰饶·岁稔年丰)
  | 'niannianKoi'        // 年年有鱼 (锦鲤荷塘·水波纳祥)
  | 'zhaocaiWealth'      // 招财进宝 (如意金彩·吉庆盈门)
  | 'ziqiDonglai'        // 紫气东来 (祥云晓霭·紫气浩荡)
  | 'fushouShuangquan'   // 福寿双全 (仙桃纳寿·五福捧寿)
  | 'huakaiFugui'        // 花开富贵 (国色牡丹·富贵荣华)
  | 'xishangMeishao'     // 喜上眉梢 (喜鹊报喜·红梅吐蕊)
  | 'jinyuMantang'       // 金玉满堂 (玉兰金桂·满堂金玉)
  | 'zhubaoPingan';      // 竹报平安 (翠竹青翠·岁岁平安)

export type DateFormatStyle = 'cnDate' | 'cnDateWithWeek' | 'dash' | 'traditional';

export type TextHierarchy = 'yangliPrimary' | 'yinliPrimary' | 'equal';

export type StampPosition = 'tail' | 'bothSides' | 'headerTail' | 'none';

export type BrandStyle = 'sealBadge' | 'classic' | 'minimal' | 'corner';
// sealBadge: 精致朱砂小章 + 宽间距宋体 + 英文微注 [歷] 萬 年 黃 曆 · ALMANAC
// classic: 东方雕版双飞线 — 萬 年 黃 曆 —
// minimal: 人文极简舒展 · 萬 年 黃 曆 ·
// corner: 右下角书斋款识 (藏书票小方印)

export interface LaoHuangLiData {
  id: string;
  yangli: string; // "2026-09-27"
  yinli: string;  // "丙午(马)年八月十七"
  accountName: string; // "万年黄历"
  dateFormat: DateFormatStyle;
  hierarchy: TextHierarchy; // 主次视觉层级
  stampPosition: StampPosition; // 印章摆放艺术位置
  textOffsetY: number; // 文字垂直偏移微调，默认 0
  yangliFontSize: number; // 阳历公历独立字号 (基准 px，默认 38)
  yinliFontSize: number;  // 农历干支独立字号 (基准 px，默认 24)
  lineSpacing: number; // 两行文字间距，默认 28
  
  // 底部品牌设置
  showBrand: boolean; // 是否展示底部品牌名字
  brandText: string;  // 品牌主标，默认 "万年黄历"
  brandSubtext: string; // 品牌副标，默认 "ALMANAC · 岁序吉辰"
  brandStyle: BrandStyle; // 品牌设计风格
  brandOffsetY: number; // 距离底部边距 px (默认 22)
  brandFontSize: number; // 品牌字号 (默认 13)
}

export interface DimensionConfig {
  ratio: AspectRatioType;
  label: string;
  sublabel: string;
  description: string;
  width: number;
  height: number;
  actualRatio: number;
  isWechatRecommended?: boolean;
}

export const RATIO_CONFIGS: Record<AspectRatioType, DimensionConfig> = {
  '2.35:1': {
    ratio: '2.35:1',
    label: '头条封面（大图）',
    sublabel: '2.35 : 1 (900 × 383 px)',
    description: '订阅号消息列表、文章顶部打开页（微信首图标准）',
    width: 900,
    height: 383,
    actualRatio: 900 / 383, // ~2.3498:1
    isWechatRecommended: true,
  },
  '1:1': {
    ratio: '1:1',
    label: '次条封面（小图）',
    sublabel: '1 : 1 (200 × 200 / 高清 900 × 900 px)',
    description: '第二条及以后、分享给好友/朋友圈的卡片、历史消息列表',
    width: 900,
    height: 900,
    actualRatio: 1,
  },
};

export const DEFAULT_DATA: LaoHuangLiData = {
  id: "6114",
  yangli: "2026-09-27",
  yinli: "丙午(马)年八月十七",
  accountName: "万年黄历",
  dateFormat: "cnDate", // 默认大字直接就是 "2026年9月27日"（不带“阳历”字样）
  hierarchy: "yinliPrimary", // 农历大字为主 (用户最新默认指定)
  stampPosition: "tail", // 文人落款印 (紧随农历末尾，最自然高级)
  textOffsetY: 7, // 垂直位置微调 7 px
  yangliFontSize: 81, // 阳历字号 81 px
  yinliFontSize: 51,  // 阴历字号 51 px
  lineSpacing: 74, // 两行文字间距 74 px
  
  // 底部品牌名字
  showBrand: true,
  brandText: "万年黄历",
  brandSubtext: "ALMANAC · 岁序吉辰",
  brandStyle: "sealBadge", // 精致朱砂小标 + 宽间距古典宋体
  brandOffsetY: 38, // 距底边距 38 px
  brandFontSize: 13, // 标识字号 13 px
};
