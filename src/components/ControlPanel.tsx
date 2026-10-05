/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Ratio, 
  Sliders, 
  RotateCcw, 
  Code2, 
  Check, 
  CalendarCheck,
  Type,
  MoveVertical,
  ChevronsUpDown,
  Sparkles,
  Bookmark
} from 'lucide-react';
import { 
  AspectRatioType, 
  FrameThemeId, 
  LaoHuangLiData, 
  RATIO_CONFIGS,
  DateFormatStyle,
  TextHierarchy,
  StampPosition,
  BrandStyle
} from '../types/generator';
import { FRAME_THEMES } from '../utils/canvasRenderer';

interface ControlPanelProps {
  data: LaoHuangLiData;
  ratio: AspectRatioType;
  theme: FrameThemeId;
  scale: number;
  showIdBadge: boolean;
  showStamps: boolean;
  onChangeData: (data: LaoHuangLiData) => void;
  onChangeRatio: (ratio: AspectRatioType) => void;
  onChangeTheme: (theme: FrameThemeId) => void;
  onChangeScale: (scale: number) => void;
  onToggleIdBadge: () => void;
  onToggleStamps: () => void;
  onResetDefault: () => void;
}

const DATE_FORMAT_OPTIONS: Array<{ id: DateFormatStyle; label: string; example: string }> = [
  { id: 'cnDate', label: '标准中文（大字直接展示）', example: '2026年9月27日' },
  { id: 'cnDateWithWeek', label: '带星期', example: '2026年9月27日 星期日' },
  { id: 'dash', label: '短横线', example: '2026-09-27' },
  { id: 'traditional', label: '传统汉字大写', example: '二〇二六年九月廿七日' },
];

const HIERARCHY_OPTIONS: Array<{ id: TextHierarchy; label: string; desc: string }> = [
  { 
    id: 'yangliPrimary', 
    label: '阳历大字为主 (推荐)', 
    desc: '阳历是主标题(Title 大字)，农历是副标题(Subtitle 小字)，层次分明' 
  },
  { 
    id: 'yinliPrimary', 
    label: '农历大字为主', 
    desc: '农历干支是主标题(大字)，公历是副标题(小字)' 
  },
  { 
    id: 'equal', 
    label: '双行等大', 
    desc: '阳历与农历两行字号相同平衡' 
  },
];

const STAMP_POSITION_OPTIONS: Array<{ id: StampPosition; label: string; desc: string }> = [
  { 
    id: 'tail', 
    label: '文人落款印 (最推荐)', 
    desc: '紧随农历末尾随形盖印，如书画家题跋钤印，自然雅致不生硬' 
  },
  { 
    id: 'headerTail', 
    label: '对角呼应印', 
    desc: '公历右上引首章 + 农历右下压角章，对角斜势文气平衡' 
  },
  { 
    id: 'bothSides', 
    label: '左右对峙印', 
    desc: '吉与福两枚印章规整对称分立两旁' 
  },
  { 
    id: 'none', 
    label: '纯净留白 (无印章)', 
    desc: '现代极简，纯粹靠书法宋体与山水留白，呼吸感最强' 
  },
];

const BRAND_STYLE_OPTIONS: Array<{ id: BrandStyle; label: string; example: string; desc: string }> = [
  {
    id: 'sealBadge',
    label: '朱砂印标 (故宫文创风 · 最推荐)',
    example: '[歷]  万  年  黄  历',
    desc: '微型朱砂印配合宽间距宋体，如同文创出版藏印，温雅端庄',
  },
  {
    id: 'classic',
    label: '东方雕版双飞线',
    example: '— ✦ 万  年  黄  历 ✦ —',
    desc: '宋代刻本雕线护卫，古典庄严，对称守衡',
  },
  {
    id: 'minimal',
    label: '极简人文舒展',
    example: '· 万  年  黄  历 ·',
    desc: '微弱圆点环绕，空灵自然，极富东方哲学呼吸感',
  },
  {
    id: 'corner',
    label: '右下压角款识',
    example: '右下角落款 · 万年黄历 ·',
    desc: '模拟国画卷轴右下角藏书票与画师题跋，居侧不遮挡中央',
  },
];

export const ControlPanel: React.FC<ControlPanelProps> = ({
  data,
  ratio,
  theme,
  scale,
  showStamps,
  onChangeData,
  onChangeRatio,
  onChangeTheme,
  onChangeScale,
  onToggleStamps,
  onResetDefault,
}) => {
  const [activeTab, setActiveTab] = useState<'params' | 'json'>('params');

  const themeList = Object.values(FRAME_THEMES);

  return (
    <div className="bg-[#151921] border border-slate-800/80 rounded-xl p-5 flex flex-col gap-5 text-slate-300">
      {/* Header with Tab switcher */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold text-white tracking-wide">
            图文封面配置工作台
          </h2>
        </div>

        <div className="inline-flex bg-slate-900 p-0.5 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('params')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
              activeTab === 'params'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            可视化设置
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
              activeTab === 'json'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3 h-3" />
            <span>输入 JSON 数据</span>
          </button>
        </div>
      </div>

      {activeTab === 'json' ? (
        /* JSON Direct Editor */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>当前绑定的老黄历 JSON 数据：</span>
            <button
              onClick={onResetDefault}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              重置默认
            </button>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-amber-200 leading-relaxed overflow-x-auto">
            <pre>
{`{
  "laohuangli": {
    "id": "${data.id}",
    "yangli": "${data.yangli}",
    "yinli": "${data.yinli}"
  },
  "dateFormat": "${data.dateFormat}",
  "hierarchy": "${data.hierarchy || 'yangliPrimary'}",
  "stampPosition": "${data.stampPosition || 'tail'}",
  "textOffsetY": ${data.textOffsetY || 0},
  "yangliFontSize": ${data.yangliFontSize || 38},
  "yinliFontSize": ${data.yinliFontSize || 24},
  "lineSpacing": ${data.lineSpacing || 28}
}`}
            </pre>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                公历日期 (yangli):
              </label>
              <input
                type="text"
                value={data.yangli}
                onChange={(e) => onChangeData({ ...data, yangli: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                placeholder="2026-09-27"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                农历干支 (yinli):
              </label>
              <input
                type="text"
                value={data.yinli}
                onChange={(e) => onChangeData({ ...data, yinli: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                placeholder="丙午(马)年八月十七"
              />
            </div>
          </div>
        </div>
      ) : (
        /* Visual Parameter Controls */
        <div className="space-y-5">
          {/* Dual WeChat Official Ratios Only (2.35:1 & 1:1) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <Ratio className="w-3.5 h-3.5 text-amber-400" />
                <span>微信封面尺寸</span>
              </label>
              <span className="text-[11px] text-amber-400/90 font-mono">
                当前: {ratio}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {(Object.keys(RATIO_CONFIGS) as AspectRatioType[]).map((rKey) => {
                const conf = RATIO_CONFIGS[rKey];
                const isSelected = ratio === rKey;
                return (
                  <button
                    key={rKey}
                    onClick={() => onChangeRatio(rKey)}
                    className={`text-left p-3 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500/70 text-white shadow-md'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold ${isSelected ? 'text-amber-300' : 'text-slate-200'}`}>
                        {conf.label}
                      </span>
                      {rKey === '2.35:1' ? (
                        <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                          头条首图
                        </span>
                      ) : (
                        <span className="text-[10px] px-1.5 py-0.2 bg-blue-500/20 text-blue-300 rounded border border-blue-500/30">
                          次条/分享
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] font-mono text-slate-300">
                      {conf.sublabel}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                      {conf.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4 User Thematic Borderless Backgrounds */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>「十全十美」十大东方吉祥主题（纯净留白，无外框束缚）</span>
              </label>
              <span className="text-[10px] text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 font-medium">
                十全十美 · 彻底无框
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {themeList.map((t) => {
                const isSelected = theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => onChangeTheme(t.id)}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500/70 text-white shadow-md ring-1 ring-amber-400/40'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold ${isSelected ? 'text-amber-300' : 'text-slate-200'}`}>
                        {t.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded">
                        {t.tag}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 line-clamp-1">
                      {t.desc}
                    </p>
                    {isSelected && (
                      <span className="absolute top-2 right-2 text-amber-400">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Text Hierarchy: Title vs Subtitle */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-amber-400" />
                <span>主次视觉层级 (Title vs Subtitle)</span>
              </label>
              <span className="text-[11px] text-amber-400/90 font-mono">
                {data.hierarchy === 'yangliPrimary' ? '阳历主标(大) + 农历副标(小)' : data.hierarchy === 'yinliPrimary' ? '农历主标(大) + 阳历副标(小)' : '双行等大'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {HIERARCHY_OPTIONS.map((hOpt) => {
                const isSelected = (data.hierarchy || 'yangliPrimary') === hOpt.id;
                return (
                  <button
                    key={hOpt.id}
                    onClick={() => onChangeData({ ...data, hierarchy: hOpt.id })}
                    className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500/70 text-white ring-1 ring-amber-400/40 shadow-sm'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className={`text-xs font-bold mb-1 ${isSelected ? 'text-amber-300' : 'text-slate-200'}`}>
                      {hOpt.label}
                    </div>
                    <div className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                      {hOpt.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Format Style Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <CalendarCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>公历日期排版格式</span>
              </label>
              <span className="text-[11px] text-amber-400 font-mono">
                {data.dateFormat === 'cnDate' ? '2026年9月27日' : data.dateFormat === 'cnDateWithWeek' ? '2026年9月27日 星期日' : data.dateFormat === 'dash' ? '2026-09-27' : '二〇二六年九月廿七日'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {DATE_FORMAT_OPTIONS.map((opt) => {
                const isSelected = data.dateFormat === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => onChangeData({ ...data, dateFormat: opt.id })}
                    className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500/60 text-white shadow-sm'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className={`text-xs font-bold ${isSelected ? 'text-amber-300' : 'text-slate-200'}`}>
                      {opt.example}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                      {opt.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Alignment & Sizing (Expanded Range & Finer Granularity) */}
          <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg space-y-3.5">
            {/* 1. Vertical Offset: -60px to +60px with slider & number input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <MoveVertical className="w-3.5 h-3.5 text-amber-400" />
                  <span>文字垂直位置微调 (-60 ~ +60 px)</span>
                </label>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onChangeData({ ...data, textOffsetY: Math.max(-60, (data.textOffsetY || 0) - 1) })}
                    className="w-5 h-5 flex items-center justify-center bg-slate-950 border border-slate-800 rounded hover:border-slate-700 text-slate-300 hover:text-white text-xs font-mono cursor-pointer"
                    title="上移 1px"
                  >
                    -
                  </button>
                  <div className="flex items-center bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5">
                    <input
                      type="number"
                      min="-60"
                      max="60"
                      value={data.textOffsetY ?? 0}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        onChangeData({ ...data, textOffsetY: isNaN(val) ? 0 : Math.max(-60, Math.min(60, val)) });
                      }}
                      className="w-9 text-center bg-transparent text-amber-300 font-mono text-[11px] font-bold focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-500 font-mono">px</span>
                  </div>
                  <button
                    onClick={() => onChangeData({ ...data, textOffsetY: Math.min(60, (data.textOffsetY || 0) + 1) })}
                    className="w-5 h-5 flex items-center justify-center bg-slate-950 border border-slate-800 rounded hover:border-slate-700 text-slate-300 hover:text-white text-xs font-mono cursor-pointer"
                    title="下移 1px"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Smooth Slider */}
              <input
                type="range"
                min="-60"
                max="60"
                step="1"
                value={data.textOffsetY ?? 0}
                onChange={(e) => onChangeData({ ...data, textOffsetY: parseInt(e.target.value, 10) })}
                className="w-full accent-amber-500 bg-slate-950 h-1.5 rounded-lg cursor-pointer"
              />

              {/* 6 Quick Presets */}
              <div className="grid grid-cols-6 gap-1 pt-0.5">
                {[
                  { label: '大上移', val: -30 },
                  { label: '微上移', val: -10 },
                  { label: '正居中', val: 0 },
                  { label: '微下移', val: 8 },
                  { label: '下移多', val: 18 },
                  { label: '深下移', val: 30 },
                ].map((pos) => {
                  const isSelected = (data.textOffsetY || 0) === pos.val;
                  return (
                    <button
                      key={pos.val}
                      onClick={() => onChangeData({ ...data, textOffsetY: pos.val })}
                      className={`py-1 text-[10px] rounded border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {pos.label} ({pos.val > 0 ? `+${pos.val}` : pos.val})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Independent Yangli Font Size Slider: 16 to 100px */}
            <div className="pt-2.5 border-t border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-amber-400" />
                  <span>阳历大字号 (16 ~ 100 px)</span>
                </label>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onChangeData({ ...data, yangliFontSize: Math.max(16, (data.yangliFontSize || 60) - 1) })}
                    className="w-5 h-5 flex items-center justify-center bg-slate-950 border border-slate-800 rounded hover:border-slate-700 text-slate-300 hover:text-white text-xs font-mono cursor-pointer"
                    title="缩小 1px"
                  >
                    -
                  </button>
                  <div className="flex items-center bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5">
                    <input
                      type="number"
                      min="16"
                      max="100"
                      value={data.yangliFontSize ?? 60}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        onChangeData({ ...data, yangliFontSize: isNaN(val) ? 60 : Math.max(16, Math.min(100, val)) });
                      }}
                      className="w-9 text-center bg-transparent text-amber-300 font-mono text-[11px] font-bold focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-500 font-mono">px</span>
                  </div>
                  <button
                    onClick={() => onChangeData({ ...data, yangliFontSize: Math.min(100, (data.yangliFontSize || 60) + 1) })}
                    className="w-5 h-5 flex items-center justify-center bg-slate-950 border border-slate-800 rounded hover:border-slate-700 text-slate-300 hover:text-white text-xs font-mono cursor-pointer"
                    title="加大 1px"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Yangli Slider */}
              <input
                type="range"
                min="16"
                max="100"
                step="1"
                value={data.yangliFontSize ?? 60}
                onChange={(e) => onChangeData({ ...data, yangliFontSize: parseInt(e.target.value, 10) })}
                className="w-full accent-amber-500 bg-slate-950 h-1.5 rounded-lg cursor-pointer"
              />

              {/* Yangli Presets */}
              <div className="grid grid-cols-5 gap-1 pt-0.5">
                {[
                  { label: '清秀', val: 38 },
                  { label: '标准', val: 50 },
                  { label: '大标', val: 60 },
                  { label: '宏阔', val: 72 },
                  { label: '巨幅', val: 86 },
                ].map((s) => {
                  const isCur = (data.yangliFontSize || 60) === s.val;
                  return (
                    <button
                      key={s.val}
                      onClick={() => onChangeData({ ...data, yangliFontSize: s.val })}
                      className={`py-1 text-[10px] rounded border text-center transition-all cursor-pointer ${
                        isCur
                          ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                          : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      {s.label} ({s.val})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Independent Yinli Font Size Slider: 12 to 80px */}
            <div className="pt-2.5 border-t border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-teal-400" />
                  <span>阴历小字号 (12 ~ 80 px)</span>
                </label>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onChangeData({ ...data, yinliFontSize: Math.max(12, (data.yinliFontSize || 41) - 1) })}
                    className="w-5 h-5 flex items-center justify-center bg-slate-950 border border-slate-800 rounded hover:border-slate-700 text-slate-300 hover:text-white text-xs font-mono cursor-pointer"
                    title="缩小 1px"
                  >
                    -
                  </button>
                  <div className="flex items-center bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5">
                    <input
                      type="number"
                      min="12"
                      max="80"
                      value={data.yinliFontSize ?? 41}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        onChangeData({ ...data, yinliFontSize: isNaN(val) ? 41 : Math.max(12, Math.min(80, val)) });
                      }}
                      className="w-9 text-center bg-transparent text-teal-300 font-mono text-[11px] font-bold focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-500 font-mono">px</span>
                  </div>
                  <button
                    onClick={() => onChangeData({ ...data, yinliFontSize: Math.min(80, (data.yinliFontSize || 41) + 1) })}
                    className="w-5 h-5 flex items-center justify-center bg-slate-950 border border-slate-800 rounded hover:border-slate-700 text-slate-300 hover:text-white text-xs font-mono cursor-pointer"
                    title="加大 1px"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Yinli Slider */}
              <input
                type="range"
                min="12"
                max="80"
                step="1"
                value={data.yinliFontSize ?? 41}
                onChange={(e) => onChangeData({ ...data, yinliFontSize: parseInt(e.target.value, 10) })}
                className="w-full accent-teal-500 bg-slate-950 h-1.5 rounded-lg cursor-pointer"
              />

              {/* Yinli Presets */}
              <div className="grid grid-cols-5 gap-1 pt-0.5">
                {[
                  { label: '清秀', val: 24 },
                  { label: '适中', val: 32 },
                  { label: '黄金', val: 41 },
                  { label: '醒目', val: 52 },
                  { label: '大标', val: 64 },
                ].map((s) => {
                  const isCur = (data.yinliFontSize || 41) === s.val;
                  return (
                    <button
                      key={s.val}
                      onClick={() => onChangeData({ ...data, yinliFontSize: s.val })}
                      className={`py-1 text-[10px] rounded border text-center transition-all cursor-pointer ${
                        isCur
                          ? 'bg-teal-500 text-slate-950 font-bold border-teal-400'
                          : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      {s.label} ({s.val})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Line Spacing Adjustment: 0 to 120px */}
            <div className="pt-2.5 border-t border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <ChevronsUpDown className="w-3.5 h-3.5 text-amber-400" />
                  <span>两行文字间距调节 (0 ~ 120 px)</span>
                </label>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onChangeData({ ...data, lineSpacing: Math.max(0, (data.lineSpacing || 56) - 1) })}
                    className="w-5 h-5 flex items-center justify-center bg-slate-950 border border-slate-800 rounded hover:border-slate-700 text-slate-300 hover:text-white text-xs font-mono cursor-pointer"
                    title="缩小 1px"
                  >
                    -
                  </button>
                  <div className="flex items-center bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5">
                    <input
                      type="number"
                      min="0"
                      max="120"
                      value={data.lineSpacing ?? 56}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        onChangeData({ ...data, lineSpacing: isNaN(val) ? 56 : Math.max(0, Math.min(120, val)) });
                      }}
                      className="w-9 text-center bg-transparent text-amber-300 font-mono text-[11px] font-bold focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-500 font-mono">px</span>
                  </div>
                  <button
                    onClick={() => onChangeData({ ...data, lineSpacing: Math.min(120, (data.lineSpacing || 56) + 1) })}
                    className="w-5 h-5 flex items-center justify-center bg-slate-950 border border-slate-800 rounded hover:border-slate-700 text-slate-300 hover:text-white text-xs font-mono cursor-pointer"
                    title="加大 1px"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Line Spacing Slider */}
              <input
                type="range"
                min="0"
                max="120"
                step="1"
                value={data.lineSpacing ?? 56}
                onChange={(e) => onChangeData({ ...data, lineSpacing: parseInt(e.target.value, 10) })}
                className="w-full accent-amber-500 bg-slate-950 h-1.5 rounded-lg cursor-pointer"
              />

              {/* 6 Quick Presets */}
              <div className="grid grid-cols-6 gap-1 pt-0.5">
                {[
                  { label: '紧密', val: 18 },
                  { label: '较近', val: 32 },
                  { label: '标准', val: 44 },
                  { label: '开阔', val: 56 },
                  { label: '疏朗', val: 76 },
                  { label: '高旷', val: 96 },
                ].map((s) => {
                  const isCur = (data.lineSpacing || 56) === s.val;
                  return (
                    <button
                      key={s.val}
                      onClick={() => onChangeData({ ...data, lineSpacing: s.val })}
                      className={`py-1 text-[10px] rounded border text-center transition-all cursor-pointer ${
                        isCur
                          ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                          : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      {s.label} ({s.val})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Smart Stamp Placement & HD Scale */}
          <div className="pt-2 border-t border-slate-800/80 space-y-4">
            {/* Stamp Placement Aesthetics */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-200 font-semibold">东方印章排布美学 (吉/福印):</span>
                <span className="text-[11px] text-amber-400 font-mono">
                  {data.stampPosition === 'tail' ? '落款印 (文人最爱)' : data.stampPosition === 'headerTail' ? '对角呼应' : data.stampPosition === 'bothSides' ? '左右对峙' : '纯净留白'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {STAMP_POSITION_OPTIONS.map((sOpt) => {
                  const isCur = (data.stampPosition || 'tail') === sOpt.id;
                  return (
                    <button
                      key={sOpt.id}
                      onClick={() => onChangeData({ ...data, stampPosition: sOpt.id })}
                      className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                        isCur
                          ? 'bg-amber-500/15 border-amber-500/70 text-white shadow-sm ring-1 ring-amber-400/40'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
                      }`}
                    >
                      <div className={`text-xs font-bold mb-0.5 ${isCur ? 'text-amber-300' : 'text-slate-200'}`}>
                        {sOpt.label}
                      </div>
                      <div className="text-[10px] text-slate-400 line-clamp-1 leading-normal">
                        {sOpt.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Brand Name Customization (万年黄历) */}
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                  <span>底部品牌标识 (如：万年黄历)</span>
                </label>
                <button
                  onClick={() => onChangeData({ ...data, showBrand: data.showBrand === false ? true : false })}
                  className={`px-2.5 py-0.5 rounded text-xs border transition-colors cursor-pointer ${
                    data.showBrand !== false
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}
                >
                  {data.showBrand !== false ? '已开启显示' : '已关闭隐藏'}
                </button>
              </div>

              {data.showBrand !== false && (
                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg space-y-3">
                  {/* Brand text input */}
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      品牌名称文本 (支持自定义修改):
                    </label>
                    <input
                      type="text"
                      value={data.brandText ?? '万年黄历'}
                      onChange={(e) => onChangeData({ ...data, brandText: e.target.value })}
                      placeholder="万年黄历"
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Brand aesthetic style */}
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
                      东方品牌排版风格:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {BRAND_STYLE_OPTIONS.map((bOpt) => {
                        const isSelected = (data.brandStyle || 'sealBadge') === bOpt.id;
                        return (
                          <button
                            key={bOpt.id}
                            onClick={() => onChangeData({ ...data, brandStyle: bOpt.id })}
                            className={`p-2 rounded border text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-amber-500/15 border-amber-500/70 text-white shadow-sm ring-1 ring-amber-400/30'
                                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            <div className={`text-[11px] font-bold ${isSelected ? 'text-amber-300' : 'text-slate-200'}`}>
                              {bOpt.label}
                            </div>
                            <div className="text-[10px] text-amber-400/80 font-mono mt-0.5">
                              {bOpt.example}
                            </div>
                            <div className="text-[9px] text-slate-500 line-clamp-1 mt-0.5">
                              {bOpt.desc}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Brand offset and font size sliders */}
                  <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-800/60">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span>距底边距:</span>
                        <span className="text-amber-300 font-mono">{data.brandOffsetY ?? 22} px</span>
                      </div>
                      <input
                        type="range"
                        min="12"
                        max="46"
                        step="1"
                        value={data.brandOffsetY ?? 22}
                        onChange={(e) => onChangeData({ ...data, brandOffsetY: parseInt(e.target.value, 10) })}
                        className="w-full accent-amber-500 bg-slate-950 h-1.5 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span>标识字号:</span>
                        <span className="text-amber-300 font-mono">{data.brandFontSize ?? 13} px</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="20"
                        step="1"
                        value={data.brandFontSize ?? 13}
                        onChange={(e) => onChangeData({ ...data, brandFontSize: parseInt(e.target.value, 10) })}
                        className="w-full accent-amber-500 bg-slate-950 h-1.5 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Clear HD Scale */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-300 font-medium">清晰度倍率 (导出尺寸):</span>
              <div className="inline-flex bg-slate-900 p-0.5 rounded border border-slate-800">
                {[1, 2, 3].map((sVal) => (
                  <button
                    key={sVal}
                    onClick={() => onChangeScale(sVal)}
                    className={`px-2.5 py-1 text-xs font-medium rounded cursor-pointer ${
                      scale === sVal
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {sVal}x {sVal === 2 ? '(推荐)' : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
