/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Download, 
  Sparkles, 
  FileText, 
  Calendar, 
  CheckCircle,
  HelpCircle,
  Layers,
  Share2
} from 'lucide-react';
import { 
  LaoHuangLiData, 
  AspectRatioType, 
  FrameThemeId, 
  DEFAULT_DATA, 
  RATIO_CONFIGS 
} from './types/generator';
import { 
  renderCoverToCanvas, 
  downloadCanvasImage, 
  copyCanvasToClipboard,
  FRAME_THEMES
} from './utils/canvasRenderer';
import { CoverPreview } from './components/CoverPreview';
import { ControlPanel } from './components/ControlPanel';
import { WeChatRatioExplainer } from './components/WeChatRatioExplainer';

export default function App() {
  // Support URL params for headless automation pipelines
  const [data, setData] = useState<LaoHuangLiData>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return {
        ...DEFAULT_DATA,
        id: params.get('id') || DEFAULT_DATA.id,
        yangli: params.get('yangli') || DEFAULT_DATA.yangli,
        yinli: params.get('yinli') || DEFAULT_DATA.yinli,
        brandText: params.get('brandText') || DEFAULT_DATA.brandText,
        textOffsetY: params.has('textOffsetY') ? parseInt(params.get('textOffsetY')!, 10) : DEFAULT_DATA.textOffsetY,
        yangliFontSize: params.has('yangliFontSize') ? parseInt(params.get('yangliFontSize')!, 10) : DEFAULT_DATA.yangliFontSize,
        yinliFontSize: params.has('yinliFontSize') ? parseInt(params.get('yinliFontSize')!, 10) : DEFAULT_DATA.yinliFontSize,
        lineSpacing: params.has('lineSpacing') ? parseInt(params.get('lineSpacing')!, 10) : DEFAULT_DATA.lineSpacing,
        brandOffsetY: params.has('brandOffsetY') ? parseInt(params.get('brandOffsetY')!, 10) : DEFAULT_DATA.brandOffsetY,
      };
    } catch {
      return DEFAULT_DATA;
    }
  });

  const [ratio, setRatio] = useState<AspectRatioType>(() => {
    try {
      const p = new URLSearchParams(window.location.search).get('ratio');
      if (p === '1:1' || p === '2.35:1') return p;
    } catch {}
    return '2.35:1';
  });

  const [theme, setTheme] = useState<FrameThemeId>(() => {
    try {
      const t = new URLSearchParams(window.location.search).get('theme');
      if (t && t in FRAME_THEMES) return t as FrameThemeId;
    } catch {}
    return 'songheSpring';
  });
  const [scale, setScale] = useState<number>(2); // 2x HD recommended for Retina displays
  const [showSafeZone, setShowSafeZone] = useState<boolean>(false);
  const [showIdBadge, setShowIdBadge] = useState<boolean>(true);
  const [showStamps, setShowStamps] = useState<boolean>(true);

  // Hidden Canvas & rendered image preview data URL
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [previewDataUrl, setPreviewDataUrl] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Re-render canvas whenever parameters change
  const triggerRender = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    renderCoverToCanvas(canvas, {
      data,
      ratio,
      theme,
      scale,
      showSafeZone,
      showIdBadge,
      showStamps,
      onImageLoaded: () => {
        // Trigger fresh dataURL when background image completes loading
        try {
          const url = canvas.toDataURL('image/png');
          setPreviewDataUrl(url);
        } catch {}
      },
    });

    try {
      const url = canvas.toDataURL('image/png');
      setPreviewDataUrl(url);
    } catch (e) {
      console.error('Error generating preview data url', e);
    }
  }, [data, ratio, theme, scale, showSafeZone, showIdBadge, showStamps]);

  useEffect(() => {
    // Wait for fonts to load or next tick
    const timer = setTimeout(() => {
      triggerRender();
    }, 50);
    return () => clearTimeout(timer);
  }, [triggerRender]);

  // Export handlers
  const handleDownloadPng = () => {
    if (!canvasRef.current) return;
    const filename = `wechat-cover-laohuangli-${data.yangli}-${ratio.replace(':', '_')}-${scale}x.png`;
    downloadCanvasImage(canvasRef.current, filename, 'image/png');
    showToast(`已成功下载 ${filename}`);
  };

  const handleDownloadJpg = () => {
    if (!canvasRef.current) return;
    const filename = `wechat-cover-laohuangli-${data.yangli}-${ratio.replace(':', '_')}.jpg`;
    downloadCanvasImage(canvasRef.current, filename, 'image/jpeg');
    showToast(`已成功下载 ${filename}`);
  };

  const handleCopyClipboard = async (): Promise<boolean> => {
    if (!canvasRef.current) return false;
    const success = await copyCanvasToClipboard(canvasRef.current);
    if (success) {
      showToast('图片已复制到剪贴板，可直接在微信公众号图文编辑器中粘贴！');
    }
    return success;
  };

  const handleResetDefault = () => {
    setData(DEFAULT_DATA);
    setRatio('2.35:1');
    setTheme('songheSpring');
    setScale(2);
    showToast('已重置为默认数据：【松鹤迎春】· 纯净无框 · 2026年9月27日 (ID: 6114)');
  };

  return (
    <div className="min-h-screen bg-[#0e1117] text-slate-100 flex flex-col font-sans">
      {/* Top Bar Contract: Zone 1 (Wordmark), Zone 2 (Nav Links), Zone 3 (Action) */}
      <header className="h-16 px-6 border-b border-slate-800/80 bg-[#12161f]/90 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a href="#editor" className="text-base font-bold tracking-tight text-white hover:text-amber-400 transition-colors">
          万年黄历 · 微信图文首图生成器
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
          <a href="#preview" className="hover:text-amber-400 transition-colors">实时预览</a>
          <a href="#specs" className="hover:text-amber-400 transition-colors">2.35与2.45规范</a>
          <a href="#parameters" className="hover:text-amber-400 transition-colors">版式与主题</a>
          <a href="#quick-guide" className="hover:text-amber-400 transition-colors">防遮挡说明</a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadPng}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-500 rounded-lg hover:bg-amber-400 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>导出封面图</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Quiet Kicker and Header Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800/60">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
              <span>微信公众号图文封面</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-400 font-mono">官方 2.35:1 & 2.45:1 代码光栅化</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-300 font-semibold">【{data.accountName || '万年黄历'}】</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {data.accountName || '万年黄历'} · 图文首图生成工作台
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              突出公众号 <strong className="text-amber-400">【{data.accountName || '万年黄历'}】</strong> 品牌，阳历日子大写（如 <span className="text-white font-serif-sc font-medium">二〇二六年九月廿七日</span> 或大字 <span className="text-amber-300 font-serif-sc font-bold">廿七</span>），阴历干支 <span className="text-amber-300 font-serif-sc font-semibold">{data.yinli}</span>，信息绝不重复，黄金中置防遮挡。
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleResetDefault}
              className="text-xs text-slate-400 hover:text-amber-400 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/60 transition-colors"
            >
              重置数据 (ID 6114)
            </button>
          </div>
        </div>

        {/* Two-Column Primary Workspace: Left Preview, Right Controls */}
        <div id="preview" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Visual Preview Canvas & WeChat Simulator (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <CoverPreview
              canvasRef={canvasRef}
              previewDataUrl={previewDataUrl}
              data={data}
              ratio={ratio}
              scale={scale}
              showSafeZone={showSafeZone}
              onToggleSafeZone={() => setShowSafeZone(!showSafeZone)}
              onDownloadPng={handleDownloadPng}
              onDownloadJpg={handleDownloadJpg}
              onCopyClipboard={handleCopyClipboard}
            />

            {/* Quick Specs Adjacency Box */}
            <div className="grid grid-cols-3 gap-3 text-center bg-[#151921] border border-slate-800/80 p-3.5 rounded-xl">
              <div>
                <div className="text-[11px] text-slate-400">输出分辨率</div>
                <div className="text-xs sm:text-sm font-bold font-mono text-white mt-0.5">
                  {RATIO_CONFIGS[ratio].width * scale} × {RATIO_CONFIGS[ratio].height * scale}
                </div>
              </div>
              <div className="border-x border-slate-800">
                <div className="text-[11px] text-slate-400">长宽比规范</div>
                <div className="text-xs sm:text-sm font-bold font-mono text-amber-400 mt-0.5">
                  {ratio} {ratio === '2.35:1' ? '(官方)' : ''}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400">中置安全区</div>
                <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5">
                  100% 防标题遮挡
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Generation Controls & Ratio Selector (5 cols) */}
          <div id="parameters" className="lg:col-span-5 flex flex-col gap-5">
            <ControlPanel
              data={data}
              ratio={ratio}
              theme={theme}
              scale={scale}
              showIdBadge={showIdBadge}
              showStamps={showStamps}
              onChangeData={(d) => setData(d)}
              onChangeRatio={(r) => setRatio(r)}
              onChangeTheme={(t) => setTheme(t)}
              onChangeScale={(s) => setScale(s)}
              onToggleIdBadge={() => setShowIdBadge(!showIdBadge)}
              onToggleStamps={() => setShowStamps(!showStamps)}
              onResetDefault={handleResetDefault}
            />
          </div>
        </div>

        {/* WeChat Ratio Explainer Section */}
        <section id="specs" className="pt-4">
          <WeChatRatioExplainer
            currentRatio={ratio}
            onSelectRatio={(r) => setRatio(r)}
          />
        </section>

        {/* Quick Instructions & Code Reference */}
        <section id="quick-guide" className="bg-[#151921] border border-slate-800/80 rounded-xl p-5 text-slate-300">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>微信公众平台封面上传小贴士</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-400 leading-relaxed">
            <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800/60">
              <strong className="text-slate-200 block mb-1">1. 点击「下载高清 PNG」</strong>
              微信公众平台对 PNG 格式支持极佳，色彩纯正且无压缩斑纹。建议优先使用 2x 高清导出的 1800×766 分辨率图片。
            </div>
            <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800/60">
              <strong className="text-slate-200 block mb-1">2. 或点击「复制图片」</strong>
              支持直接写入系统剪贴板（PNG 二进制流），可以在微信公众号后台图文编辑器中直接 Ctrl+V / Cmd+V 粘贴。
            </div>
            <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800/60">
              <strong className="text-slate-200 block mb-1">3. 为什么标题不会遮挡文字？</strong>
              本代码专为微信首图研发，字样和印章全部精确计算在画布上半部黄金区域，无论微信标题两行还是一行，均不会产生任何重合。
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 px-6 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>微信公众号老黄历图文首图生成器 · 支持 2.35:1 / 2.45:1 官方规范 · 纯前端 Canvas 代码光栅化</p>
      </footer>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-amber-300 text-xs px-4 py-3 rounded-lg border border-amber-500/40 shadow-xl flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
