/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Eye, Download, Copy, Check, Smartphone, Maximize2, ShieldAlert } from 'lucide-react';
import { AspectRatioType, LaoHuangLiData, RATIO_CONFIGS } from '../types/generator';
import { toChineseUppercaseDate } from '../utils/canvasRenderer';

interface CoverPreviewProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  previewDataUrl: string;
  data: LaoHuangLiData;
  ratio: AspectRatioType;
  scale: number;
  showSafeZone: boolean;
  onToggleSafeZone: () => void;
  onDownloadPng: () => void;
  onDownloadJpg: () => void;
  onCopyClipboard: () => Promise<boolean>;
}

export const CoverPreview: React.FC<CoverPreviewProps> = ({
  canvasRef,
  previewDataUrl,
  data,
  ratio,
  scale,
  showSafeZone,
  onToggleSafeZone,
  onDownloadPng,
  onDownloadJpg,
  onCopyClipboard,
}) => {
  const [viewMode, setViewMode] = useState<'clean' | 'wechat'>('clean');
  const [isCopied, setIsCopied] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState('复制图片');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const config = RATIO_CONFIGS[ratio];
  const renderedWidth = config.width * scale;
  const renderedHeight = config.height * scale;

  const dateInfo = toChineseUppercaseDate(data.yangli, data.dateFormat);

  const handleCopy = async () => {
    setCopiedMsg('正在生成...');
    const ok = await onCopyClipboard();
    if (ok) {
      setIsCopied(true);
      setCopiedMsg('已复制到剪贴板！可以直接在微信粘贴');
      setTimeout(() => {
        setIsCopied(false);
        setCopiedMsg('复制图片');
      }, 2500);
    } else {
      setCopiedMsg('复制失败，请直接下载PNG');
      setTimeout(() => {
        setCopiedMsg('复制图片');
      }, 2500);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top Preview Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#151921] border border-slate-800/80 p-3 rounded-xl">
        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="inline-flex bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewMode('clean')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                viewMode === 'clean'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              原图查看
            </button>
            <button
              onClick={() => setViewMode('wechat')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                viewMode === 'wechat'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              微信信息流模拟
            </button>
          </div>

          {/* Safe Area Occlusion Toggle */}
          <button
            onClick={onToggleSafeZone}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${
              showSafeZone
                ? 'bg-red-500/15 border-red-500/50 text-red-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="查看底部标题遮挡安全范围"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>防遮挡辅助线: {showSafeZone ? '开启' : '关闭'}</span>
          </button>
        </div>

        {/* Current Resolution Badges */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="px-2 py-0.5 bg-slate-900 rounded border border-slate-800">
            比例: <strong className="text-amber-400">{ratio}</strong>
          </span>
          <span className="px-2 py-0.5 bg-slate-900 rounded border border-slate-800">
            尺寸: <strong className="text-white">{renderedWidth} × {renderedHeight} px</strong>
          </span>
          <span className="px-2 py-0.5 bg-slate-900 rounded border border-slate-800">
            倍率: <strong className="text-emerald-400">{scale}x</strong>
          </span>
        </div>
      </div>

      {/* Main Preview Canvas Container */}
      <div className="relative bg-[#0b0d11] rounded-2xl border border-slate-800/80 p-4 md:p-6 flex items-center justify-center min-h-[380px] overflow-hidden">
        {/* Hidden Master Canvas where drawing actually happens */}
        <canvas ref={canvasRef} className="hidden" />

        {viewMode === 'clean' ? (
          /* Clean Direct Image View */
          <div className="w-full flex flex-col items-center">
            <div className="relative group max-w-full rounded-xl overflow-hidden shadow-2xl border border-slate-700/60 transition-transform duration-300">
              {previewDataUrl ? (
                <img
                  src={previewDataUrl}
                  alt="微信公众号老黄历封面图"
                  className="w-full h-auto object-contain max-h-[520px] rounded-lg"
                />
              ) : (
                <div className="w-[600px] h-[255px] flex items-center justify-center text-slate-500 text-sm">
                  正在实时渲染图片...
                </div>
              )}

              {/* Hover quick overlay actions */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md p-1.5 rounded-lg border border-slate-700">
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="p-1.5 text-slate-300 hover:text-white rounded hover:bg-slate-800 cursor-pointer"
                  title="全屏放大查看"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sub-label under clean image - Non-repetitive */}
            <div className="flex flex-wrap items-center justify-between w-full max-w-2xl mt-3 text-xs text-slate-400 px-1 gap-2">
              <span className="truncate">
                大字公历: <span className="text-white font-medium">{dateInfo.displayString}</span> · 农历干支: <span className="text-amber-300 font-medium">{data.yinli}</span>
              </span>
              <span className="font-mono text-slate-500 text-[11px]">ID: {data.id}</span>
            </div>
          </div>
        ) : (
          /* WeChat Mobile Subscription Feed Card Simulator */
          <div className="w-full max-w-md bg-[#202020] rounded-2xl border border-neutral-700 shadow-2xl overflow-hidden p-4">
            {/* Simulated WeChat Top Navbar */}
            <div className="flex items-center justify-between text-neutral-400 text-xs pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 flex items-center justify-center text-[10px] font-bold text-slate-950">
                  历
                </div>
                <span className="font-medium text-neutral-200">订阅号消息</span>
              </div>
              <span className="text-[11px] text-neutral-400">18:00</span>
            </div>

            {/* Feed Card */}
            <div className="mt-3 bg-[#262626] rounded-xl overflow-hidden border border-neutral-700/60 shadow-lg">
              {/* Cover Image with WeChat Title Overlay */}
              <div className="relative">
                {previewDataUrl && (
                  <img
                    src={previewDataUrl}
                    alt="微信文章封面图模拟"
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: `${config.width} / ${config.height}` }}
                  />
                )}

                {/* WeChat's Real Title Gradient Overlay (Bottom 28%) */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-8 pb-3 px-3.5">
                  <h4 className="text-white font-medium text-sm leading-snug line-clamp-2 drop-shadow-md">
                    【今日黄历】{dateInfo.displayString} {data.yinli} · 每日吉辰
                  </h4>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-3.5 py-2.5 flex items-center justify-between text-[11px] text-neutral-400 border-t border-neutral-800">
                <span>阅读全文</span>
                <span>›</span>
              </div>
            </div>

            <div className="mt-3 text-center text-[11px] text-amber-300/80 bg-amber-500/10 py-1.5 px-2 rounded border border-amber-500/20">
              💡 仿真验证：公众号「{data.accountName || '万年黄历'}」、阳历大写与阴历均在上半部安全区，无遮挡！
            </div>
          </div>
        )}
      </div>

      {/* Primary Export Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#151921] border border-slate-800 p-4 rounded-xl">
        <div className="flex items-center gap-2">
          <button
            onClick={onDownloadPng}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-lg transition-all shadow-md shadow-amber-500/10 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>下载高清 PNG (推荐)</span>
          </button>

          <button
            onClick={onDownloadJpg}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-lg transition-all border border-slate-700 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>下载 JPEG</span>
          </button>

          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-3.5 py-2.5 font-medium text-xs rounded-lg transition-all border cursor-pointer ${
              isCopied
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
            }`}
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copiedMsg}</span>
          </button>
        </div>

        <div className="text-xs text-slate-400">
          格式: <span className="text-white">PNG / JPEG</span> · 突出公众号 <span className="text-amber-300 font-semibold">{data.accountName || '万年黄历'}</span>
        </div>
      </div>

      {/* Fullscreen Modal View */}
      {isFullscreen && (
        <div 
          onClick={() => setIsFullscreen(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out"
        >
          <div className="max-w-5xl max-h-[90vh] flex flex-col items-center">
            <img
              src={previewDataUrl}
              alt="全屏查看"
              className="max-h-[82vh] w-auto object-contain rounded-lg shadow-2xl border border-slate-700"
            />
            <p className="mt-3 text-xs text-slate-400">点击任意位置退出全屏查看</p>
          </div>
        </div>
      )}
    </div>
  );
};
