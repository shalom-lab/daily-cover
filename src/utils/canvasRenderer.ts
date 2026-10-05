/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LaoHuangLiData, AspectRatioType, FrameThemeId, RATIO_CONFIGS, DateFormatStyle } from '../types/generator';

// 10 Auspicious Borderless Thematic Backgrounds (十全十美)
import bgSongheSpring from '../assets/images/bg_songhe_spring_1791166957659.jpg';
import bgWuguHarvest from '../assets/images/bg_wugu_harvest_1791166967608.jpg';
import bgNiannianKoi from '../assets/images/bg_niannian_koi_1791166977957.jpg';
import bgZhaocaiWealth from '../assets/images/bg_zhaocai_wealth_1791166985906.jpg';
import bgZiqiDonglai from '../assets/images/bg_ziqi_donglai_1791167168147.jpg';
import bgFushouShuangquan from '../assets/images/bg_fushou_shuangquan_1791167183126.jpg';
import bgHuakaiFugui from '../assets/images/bg_huakai_fugui_1791167194362.jpg';
import bgXishangMeishao from '../assets/images/bg_xishang_meishao_1791167202632.jpg';
import bgJinyuMantang from '../assets/images/bg_jinyu_mantang_1791167356082.jpg';
import bgZhubaoPingan from '../assets/images/bg_zhubao_pingan_1791167365953.jpg';

export interface RenderOptions {
  data: LaoHuangLiData;
  ratio: AspectRatioType;
  theme: FrameThemeId;
  scale?: number; // 1, 2, or 3 for HD
  showSafeZone?: boolean;
  showIdBadge?: boolean;
  showStamps?: boolean;
  onImageLoaded?: () => void;
}

export interface FrameThemeMeta {
  id: FrameThemeId;
  name: string;
  tag: string;
  desc: string;
  imageSrc: string;
  bgColor: string;
  primaryTextColor: string;   // For Line 2 (农历干支)
  secondaryTextColor: string; // For Line 1 (公历大字)
  sealBg: string;
}

export const FRAME_THEMES: Record<FrameThemeId, FrameThemeMeta> = {
  songheSpring: {
    id: 'songheSpring',
    name: '松鹤迎春',
    tag: '宋韵水墨·松青鹤鸣',
    desc: '苍劲青松、白羽仙鹤、天青微云，中心纯净留白，无框无拘',
    imageSrc: bgSongheSpring,
    bgColor: '#F1F6F4',
    secondaryTextColor: '#821616', // 阳历公历深朱砂红
    primaryTextColor: '#134E4A',   // 农历干支松针墨青色
    sealBg: '#9E2A2B',
  },
  wuguHarvest: {
    id: 'wuguHarvest',
    name: '五谷丰登',
    tag: '金穗丰饶·岁稔年丰',
    desc: '麦穗沉甸、秋丰稻浪、暖金微熹，中央开阔通透无杂纹',
    imageSrc: bgWuguHarvest,
    bgColor: '#FAF6ED',
    secondaryTextColor: '#8C1B14',
    primaryTextColor: '#542006',
    sealBg: '#A02B20',
  },
  niannianKoi: {
    id: 'niannianKoi',
    name: '年年有鱼',
    tag: '锦鲤送祥·清荷纳福',
    desc: '游弋锦鲤、清雅荷花、涟漪微漾，文人绢本自然舒展',
    imageSrc: bgNiannianKoi,
    bgColor: '#FAF5EE',
    secondaryTextColor: '#8B1E1E',
    primaryTextColor: '#701A24',
    sealBg: '#C53030',
  },
  zhaocaiWealth: {
    id: 'zhaocaiWealth',
    name: '招财进宝',
    tag: '如意金彩·吉庆盈门',
    desc: '如意祥云、铜钱锦带、淡雅象牙金笺，满纸富贵清朗',
    imageSrc: bgZhaocaiWealth,
    bgColor: '#FDF8F0',
    secondaryTextColor: '#8A1818',
    primaryTextColor: '#661212',
    sealBg: '#B91C1C',
  },
  ziqiDonglai: {
    id: 'ziqiDonglai',
    name: '紫气东来',
    tag: '祥云晓霭·紫气浩荡',
    desc: '霞蔚紫金、晓风翠竹、仙禽迎朝，天地纳祥开阔大度',
    imageSrc: bgZiqiDonglai,
    bgColor: '#FAF6F8',
    secondaryTextColor: '#7A1838',
    primaryTextColor: '#4C1D4F',
    sealBg: '#831843',
  },
  fushouShuangquan: {
    id: 'fushouShuangquan',
    name: '福寿双全',
    tag: '仙桃纳寿·五福捧寿',
    desc: '红晕寿桃、灵枝翠叶、红蝠祥云，祈福延年温润如玉',
    imageSrc: bgFushouShuangquan,
    bgColor: '#FAF6F0',
    secondaryTextColor: '#8B1C1C',
    primaryTextColor: '#7C2D12',
    sealBg: '#9A3412',
  },
  huakaiFugui: {
    id: 'huakaiFugui',
    name: '花开富贵',
    tag: '国色牡丹·富贵荣华',
    desc: '盛世牡丹、彩蝶翩跹、工笔清丽，雍容华贵大气质感',
    imageSrc: bgHuakaiFugui,
    bgColor: '#FAF5F1',
    secondaryTextColor: '#881337',
    primaryTextColor: '#4C0519',
    sealBg: '#9F1239',
  },
  xishangMeishao: {
    id: 'xishangMeishao',
    name: '喜上眉梢',
    tag: '喜鹊报喜·红梅吐蕊',
    desc: '傲骨寒梅、喜鹊登枝、古法水墨，开门见喜欢欣洋溢',
    imageSrc: bgXishangMeishao,
    bgColor: '#FAF6F2',
    secondaryTextColor: '#881313',
    primaryTextColor: '#3B0707',
    sealBg: '#991B1B',
  },
  jinyuMantang: {
    id: 'jinyuMantang',
    name: '金玉满堂',
    tag: '玉兰金桂·满堂金玉',
    desc: '洁白玉兰、幽香金桂、暖玉生辉，满堂和气富贵祥和',
    imageSrc: bgJinyuMantang,
    bgColor: '#FAF6EE',
    secondaryTextColor: '#8C1C14',
    primaryTextColor: '#713F12',
    sealBg: '#B45309',
  },
  zhubaoPingan: {
    id: 'zhubaoPingan',
    name: '竹报平安',
    tag: '翠竹青翠·岁岁平安',
    desc: '修竹挺拔、露润青翠、天青晓雾，文人风骨平安顺遂',
    imageSrc: bgZhubaoPingan,
    bgColor: '#F1F6F3',
    secondaryTextColor: '#821616',
    primaryTextColor: '#14532D',
    sealBg: '#9E2A2B',
  },
};

// Global image cache for instant canvas rendering
const imageCache: Map<string, HTMLImageElement> = new Map();

function getLoadedImage(src: string, onLoaded?: () => void): HTMLImageElement | null {
  if (imageCache.has(src)) {
    const img = imageCache.get(src)!;
    if (img.complete && img.naturalWidth > 0) {
      return img;
    }
  }

  const img = new Image();
  img.src = src;
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    imageCache.set(src, img);
    if (onLoaded) {
      onLoaded();
    }
  };
  imageCache.set(src, img);
  return img.complete ? img : null;
}

/**
 * Format Gregorian date with day style
 * Default big text: "2026年9月27日" (No "阳历" label prefix per user request)
 */
export function formatYangliDate(yangliStr: string, dateFormat: DateFormatStyle = 'cnDate') {
  const parts = yangliStr.split('-');
  const y = parts[0] || '2026';
  const m = parseInt(parts[1] || '9', 10);
  const d = parseInt(parts[2] || '27', 10);

  const numToCn = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const yearCn = y.split('').map(c => numToCn[parseInt(c, 10)] || c).join('') + '年';
  const monthCn = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'][m - 1] || `${m}月`;

  let dayTraditional = '';
  if (d < 10) dayTraditional = `初${numToCn[d]}`;
  else if (d === 10) dayTraditional = '初十';
  else if (d < 20) dayTraditional = `十${numToCn[d % 10]}`;
  else if (d === 20) dayTraditional = '二十';
  else if (d < 30) dayTraditional = `廿${numToCn[d % 10]}`;
  else if (d === 30) dayTraditional = '三十';
  else if (d === 31) dayTraditional = '卅一';

  const mm = m < 10 ? `0${m}` : `${m}`;
  const dd = d < 10 ? `0${d}` : `${d}`;

  let weekday = '星期日';
  try {
    const dateObj = new Date(parseInt(y, 10), m - 1, d);
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    weekday = weekdays[dateObj.getDay()] || '星期日';
  } catch {}

  let displayString = `${y}年${m}月${d}日`;
  if (dateFormat === 'cnDateWithWeek') {
    displayString = `${y}年${m}月${d}日 ${weekday}`;
  } else if (dateFormat === 'dash') {
    displayString = `${y}-${mm}-${dd}`;
  } else if (dateFormat === 'traditional') {
    displayString = `${yearCn}${monthCn}${dayTraditional}`;
  }

  return {
    raw: yangliStr,
    displayString,
    fullYangliUppercase: displayString,
    year: y,
    month: mm,
    day: dd,
    weekday,
  };
}

export const toChineseUppercaseDate = formatYangliDate;

/**
 * Master Canvas Renderer
 */
export function renderCoverToCanvas(canvas: HTMLCanvasElement, options: RenderOptions) {
  const { data, ratio, theme, scale = 1, showSafeZone = false, showStamps = true, onImageLoaded } = options;
  const config = RATIO_CONFIGS[ratio] || RATIO_CONFIGS['2.35:1'];
  const w = config.width * scale;
  const h = config.height * scale;

  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const themeMeta = FRAME_THEMES[theme] || FRAME_THEMES.songheSpring;
  const yangliInfo = formatYangliDate(data.yangli, data.dateFormat || 'cnDate');

  ctx.save();

  // 1. Draw Illustrated Background
  let imageDrawn = false;
  if (themeMeta.imageSrc) {
    const img = getLoadedImage(themeMeta.imageSrc, onImageLoaded);
    if (img && img.complete && img.naturalWidth > 0) {
      drawCoverImage(ctx, img, w, h);
      imageDrawn = true;
    }
  }

  if (!imageDrawn) {
    ctx.fillStyle = themeMeta.bgColor;
    ctx.fillRect(0, 0, w, h);

    const radial = ctx.createRadialGradient(w / 2, h / 2, 20 * scale, w / 2, h / 2, w * 0.6);
    radial.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
    radial.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, w, h);
  }

  // 2. Draw Pure Borderless Floating Typography (NO outer boxes, NO frames, NO cartouche borders!)
  drawPureFloatingText(ctx, w, h, scale, data, yangliInfo, themeMeta, showStamps);

  // 3. Draw Bottom Cultural Brand Colophon (万年黄历)
  if (data.showBrand !== false) {
    drawBottomBrandColophon(ctx, w, h, scale, data, themeMeta);
  }

  // 4. Safe zone indicator
  if (showSafeZone && ratio === '2.35:1') {
    drawSafeZoneIndicator(ctx, w, h, scale);
  }

  ctx.restore();
}

/**
 * Draws background image scaled and center-cropped to fill the canvas
 */
function drawCoverImage(ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) {
  const imgW = img.naturalWidth || img.width;
  const imgH = img.naturalHeight || img.height;
  const imgAspect = imgW / imgH;
  const canvasAspect = w / h;

  let renderW = w;
  let renderH = h;
  let offsetX = 0;
  let offsetY = 0;

  if (imgAspect > canvasAspect) {
    renderW = h * imgAspect;
    offsetX = (w - renderW) / 2;
  } else {
    renderH = w / imgAspect;
    offsetY = (h - renderH) / 2;
  }

  ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
}

/**
 * Pure Borderless Floating Typography
 * Completely free of any boxes, borders, or wooden/gold frames!
 * Line 1: Big Date Title (2026年9月27日)
 * Line 2: Refined Lunar Subtitle (丙午(马)年八月十七)
 */
function drawPureFloatingText(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  scale: number,
  data: LaoHuangLiData,
  yangliInfo: ReturnType<typeof formatYangliDate>,
  meta: FrameThemeMeta,
  showStamps: boolean
) {
  ctx.save();

  const isSquare = h >= 600 * scale;
  const centerX = w / 2;
  const hierarchy = data.hierarchy || 'yangliPrimary';

  // Independent font sizes for YangLi (阳历) and YinLi (阴历)
  const baseYangli = data.yangliFontSize || 38;
  const baseYinli = data.yinliFontSize || 24;

  let fSize1 = baseYangli * (isSquare ? 1.25 : 1.0) * scale;
  let fSize2 = baseYinli * (isSquare ? 1.25 : 1.0) * scale;

  // Target safe center Y (account for WeChat bottom title safe zone)
  const baseCenterY = isSquare ? h * 0.48 : h * 0.48;
  const userOffsetY = (data.textOffsetY || 0) * scale;
  const centerY = baseCenterY + userOffsetY;

  const lineSpacing = ((data.lineSpacing || 28) * (isSquare ? 1.4 : 1.0)) * scale;
  const halfGap = lineSpacing / 2;

  const line1Y = centerY - halfGap;
  const line2Y = centerY + halfGap;

  // Max allowed width: up to 92% of screen width so wide font size adjustments render unconstrained
  const maxAllowedWidth = w * 0.92;

  // Auto-fit check
  ctx.font = `bold ${fSize1}px "Noto Serif SC", "Songti SC", serif`;
  let w1 = ctx.measureText(yangliInfo.displayString).width;
  if (w1 > maxAllowedWidth) {
    fSize1 = fSize1 * (maxAllowedWidth / w1);
    ctx.font = `bold ${fSize1}px "Noto Serif SC", "Songti SC", serif`;
    w1 = ctx.measureText(yangliInfo.displayString).width;
  }

  ctx.font = `${hierarchy === 'yangliPrimary' ? '600' : 'bold'} ${fSize2}px "Noto Serif SC", "Songti SC", serif`;
  let w2 = ctx.measureText(data.yinli).width;
  if (w2 > maxAllowedWidth) {
    fSize2 = fSize2 * (maxAllowedWidth / w2);
    ctx.font = `${hierarchy === 'yangliPrimary' ? '600' : 'bold'} ${fSize2}px "Noto Serif SC", "Songti SC", serif`;
    w2 = ctx.measureText(data.yinli).width;
  }

  // Draw Line 1: Big Date (Title)
  ctx.font = `bold ${fSize1}px "Noto Serif SC", "Songti SC", serif`;
  ctx.fillStyle = meta.secondaryTextColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Soft luminous paper halo around characters ensures 100% crystal legibility over watercolors
  ctx.shadowColor = 'rgba(255, 255, 255, 0.95)';
  ctx.shadowBlur = 10 * scale;
  ctx.fillText(yangliInfo.displayString, centerX, line1Y);

  // Draw Line 2: Lunar Calendar (Subtitle)
  ctx.font = `${hierarchy === 'yangliPrimary' ? '600' : 'bold'} ${fSize2}px "Noto Serif SC", "Songti SC", serif`;
  ctx.fillStyle = meta.primaryTextColor;
  ctx.fillText(data.yinli, centerX, line2Y);

  ctx.shadowColor = 'transparent';

  // Stamps: Organic Traditional Chinese Placement
  const stampPos = data.stampPosition || (showStamps ? 'tail' : 'none');
  if (stampPos !== 'none') {
    const stampSize = (isSquare ? 26 : 20) * scale;
    
    if (stampPos === 'tail') {
      // 农历末尾落款印 (最自然文雅，如名家题跋盖印)
      const tailX = centerX + w2 / 2 + stampSize * 0.85;
      drawSealStamp(ctx, '吉', tailX, line2Y, stampSize, scale, meta.sealBg);
    } else if (stampPos === 'headerTail') {
      // 阳历右上引首章 + 农历右下落款印 (对角呼应)
      const topSealX = centerX + w1 / 2 + stampSize * 0.85;
      const btmSealX = centerX + w2 / 2 + stampSize * 0.85;
      drawSealStamp(ctx, '吉', topSealX, line1Y, stampSize * 0.9, scale, meta.sealBg);
      drawSealStamp(ctx, '福', btmSealX, line2Y, stampSize * 0.9, scale, meta.sealBg);
    } else if (stampPos === 'bothSides') {
      // 传统对称护卫式 (吉/福分列左右)
      const maxTextW = Math.max(w1, w2);
      const stampDist = maxTextW / 2 + stampSize * 1.5;
      if (stampDist * 2 < w * 0.92) {
        drawSealStamp(ctx, '吉', centerX - stampDist, line2Y, stampSize, scale, meta.sealBg);
        drawSealStamp(ctx, '福', centerX + stampDist, line2Y, stampSize, scale, meta.sealBg);
      }
    }
  }

  ctx.restore();
}

/**
 * Square Cinnabar Seal Stamp
 */
function drawSealStamp(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  size: number,
  s: number,
  bgColor: string = '#B91C1C'
) {
  ctx.save();
  ctx.translate(x, y);

  const radius = 3 * s;
  ctx.fillStyle = bgColor;
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 1 * s;

  ctx.beginPath();
  ctx.roundRect(-size / 2, -size / 2, size, size, radius);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold ${Math.floor(size * 0.58)}px "Noto Serif SC", "STKaiti", "KaiTi", serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 0, 1 * s);

  ctx.restore();
}

/**
 * Draw Bottom Cultural Brand Colophon (万年黄历)
 */
function drawBottomBrandColophon(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  scale: number,
  data: LaoHuangLiData,
  meta: FrameThemeMeta
) {
  ctx.save();

  const brandText = data.brandText || '万年黄历';
  const brandStyle = data.brandStyle || 'sealBadge';
  const fontSize = (data.brandFontSize || 13) * scale;
  const offsetY = (data.brandOffsetY || 22) * scale;
  const bottomY = h - offsetY;
  const centerX = w / 2;

  // Elegant text styling with spaced letters
  const spacedText = brandText.split('').join('  ');

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Subtle luminous paper halo
  ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
  ctx.shadowBlur = 6 * scale;

  if (brandStyle === 'sealBadge') {
    // 典雅朱砂印标 + 宽间距古典宋体
    ctx.font = `600 ${fontSize}px "Noto Serif SC", "Songti SC", serif`;
    const textWidth = ctx.measureText(spacedText).width;
    const badgeSize = fontSize * 1.25;
    const gap = 8 * scale;
    const totalWidth = badgeSize + gap + textWidth;
    const startX = centerX - totalWidth / 2;

    // Small cinnabar seal mark on the left
    drawSealStamp(ctx, '歷', startX + badgeSize / 2, bottomY, badgeSize, scale, meta.sealBg);

    // Text on the right
    ctx.fillStyle = meta.primaryTextColor;
    ctx.textAlign = 'left';
    ctx.fillText(spacedText, startX + badgeSize + gap, bottomY);

  } else if (brandStyle === 'classic') {
    // 东方雕版双飞线: —— ✦ 万  年  黄  历 ✦ ——
    ctx.font = `600 ${fontSize}px "Noto Serif SC", "Songti SC", serif`;
    const textWithSymbols = `✦  ${spacedText}  ✦`;
    const textWidth = ctx.measureText(textWithSymbols).width;
    const lineWidth = 36 * scale;
    const lineGap = 12 * scale;

    ctx.fillStyle = meta.secondaryTextColor;
    ctx.fillText(textWithSymbols, centerX, bottomY);

    // Left line
    ctx.strokeStyle = meta.secondaryTextColor;
    ctx.lineWidth = 1 * scale;
    ctx.beginPath();
    ctx.moveTo(centerX - textWidth / 2 - lineGap - lineWidth, bottomY);
    ctx.lineTo(centerX - textWidth / 2 - lineGap, bottomY);
    ctx.stroke();

    // Right line
    ctx.beginPath();
    ctx.moveTo(centerX + textWidth / 2 + lineGap, bottomY);
    ctx.lineTo(centerX + textWidth / 2 + lineGap + lineWidth, bottomY);
    ctx.stroke();

  } else if (brandStyle === 'corner') {
    // 右下角书斋款识 (压角藏书印)
    const rightMargin = 28 * scale;
    const cornerX = w - rightMargin;
    ctx.font = `bold ${fontSize}px "Noto Serif SC", "Songti SC", serif`;
    ctx.textAlign = 'right';
    ctx.fillStyle = meta.primaryTextColor;
    ctx.fillText(`· ${brandText} ·`, cornerX, bottomY);

  } else {
    // 'minimal': 极简人文纯字
    ctx.font = `500 ${fontSize}px "Noto Serif SC", "Songti SC", serif`;
    ctx.fillStyle = meta.primaryTextColor;
    ctx.fillText(`·  ${spacedText}  ·`, centerX, bottomY);
  }

  ctx.restore();
}

/**
 * WeChat Safe Zone Indicator
 */
function drawSafeZoneIndicator(ctx: CanvasRenderingContext2D, w: number, h: number, s: number) {
  ctx.save();

  const occlusionHeight = h * 0.28;
  const occlusionY = h - occlusionHeight;

  ctx.fillStyle = 'rgba(239, 68, 68, 0.18)';
  ctx.fillRect(0, occlusionY, w, occlusionHeight);

  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2 * s;
  ctx.setLineDash([6 * s, 4 * s]);
  ctx.beginPath();
  ctx.moveTo(0, occlusionY);
  ctx.lineTo(w, occlusionY);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#dc2626';
  ctx.font = `bold ${12 * s}px sans-serif`;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillText('⚠ 微信公众号底部标题遮挡危险区 (约28%高度)', w - 24 * s, h - 12 * s);

  ctx.fillStyle = '#16a34a';
  ctx.textAlign = 'left';
  ctx.fillText('✓ 核心视觉安全展示区（大字日期与农历绝不被遮挡）', 24 * s, occlusionY - 10 * s);

  ctx.restore();
}

export function downloadCanvasImage(canvas: HTMLCanvasElement, filename: string, format: 'image/png' | 'image/jpeg' = 'image/png') {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL(format, format === 'image/jpeg' ? 0.95 : 1.0);
  link.click();
}

export async function copyCanvasToClipboard(canvas: HTMLCanvasElement): Promise<boolean> {
  return new Promise((resolve) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        resolve(false);
        return;
      }
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        resolve(true);
      } catch (err) {
        console.error('Clipboard copy error:', err);
        resolve(false);
      }
    }, 'image/png');
  });
}
