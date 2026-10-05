/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AspectRatioType } from '../types/generator';

interface WeChatRatioExplainerProps {
  currentRatio: AspectRatioType;
  onSelectRatio: (ratio: AspectRatioType) => void;
}

export const WeChatRatioExplainer: React.FC<WeChatRatioExplainerProps> = ({
  currentRatio,
  onSelectRatio,
}) => {
  return (
    <div className="bg-[#151921] border border-slate-800/80 rounded-xl p-5 text-slate-300">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-base font-semibold text-white tracking-wide">
            微信公众号封面规格对照表
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            官方标准：头条大图认准 2.35:1，次条小图认准 1:1
          </p>
        </div>
        <span className="text-xs font-mono text-amber-300">
          当前选中: {currentRatio}
        </span>
      </div>

      {/* User's Exact Specification Table with 1-Click Interactive Row Switcher */}
      <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/60 mb-4">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
              <th className="py-2.5 px-4 font-semibold">类型</th>
              <th className="py-2.5 px-4 font-semibold">比例</th>
              <th className="py-2.5 px-4 font-semibold">像素</th>
              <th className="py-2.5 px-4 font-semibold">用在哪</th>
              <th className="py-2.5 px-3 text-right">切换</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {/* Row 1: 头条封面（大图） 2.35:1 */}
            <tr 
              onClick={() => onSelectRatio('2.35:1')}
              className={`cursor-pointer transition-colors ${
                currentRatio === '2.35:1'
                  ? 'bg-amber-500/10 text-white font-medium'
                  : 'hover:bg-slate-800/40 text-slate-300'
              }`}
            >
              <td className="py-3.5 px-4 font-bold text-amber-400 flex items-center gap-1.5">
                <span>头条封面（大图）</span>
                {currentRatio === '2.35:1' && (
                  <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                    使用中
                  </span>
                )}
              </td>
              <td className="py-3.5 px-4 font-mono font-bold text-white">2.35:1</td>
              <td className="py-3.5 px-4 font-mono text-amber-300">900 × 383 px</td>
              <td className="py-3.5 px-4 text-slate-300">
                订阅号消息列表、文章顶部打开页（微信首图标准）
              </td>
              <td className="py-3.5 px-3 text-right">
                <button
                  type="button"
                  className={`px-3 py-1 rounded text-xs transition-all cursor-pointer ${
                    currentRatio === '2.35:1'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {currentRatio === '2.35:1' ? '当前选用' : '选用此尺寸'}
                </button>
              </td>
            </tr>

            {/* Row 2: 次条封面（小图） 1:1 */}
            <tr 
              onClick={() => onSelectRatio('1:1')}
              className={`cursor-pointer transition-colors ${
                currentRatio === '1:1'
                  ? 'bg-blue-500/10 text-white font-medium'
                  : 'hover:bg-slate-800/40 text-slate-300'
              }`}
            >
              <td className="py-3.5 px-4 font-bold text-blue-400 flex items-center gap-1.5">
                <span>次条封面（小图）</span>
                {currentRatio === '1:1' && (
                  <span className="text-[10px] px-1.5 py-0.2 bg-blue-500/20 text-blue-300 rounded border border-blue-500/30">
                    使用中
                  </span>
                )}
              </td>
              <td className="py-3.5 px-4 font-mono font-bold text-white">1:1</td>
              <td className="py-3.5 px-4 font-mono text-blue-300">200 × 200 px (高清 900 × 900)</td>
              <td className="py-3.5 px-4 text-slate-300">
                第二条及以后、分享给好友/朋友圈的卡片、历史消息列表
              </td>
              <td className="py-3.5 px-3 text-right">
                <button
                  type="button"
                  className={`px-3 py-1 rounded text-xs transition-all cursor-pointer ${
                    currentRatio === '1:1'
                      ? 'bg-blue-500 text-slate-950 font-bold shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {currentRatio === '1:1' ? '当前选用' : '选用此尺寸'}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-xs text-slate-400 leading-relaxed bg-slate-900/40 p-3 rounded-lg border border-slate-800/60">
        已按照你的要求剔除多余尺寸，仅保留微信最核心的两个规格：<strong className="text-amber-300">头条大图 2.35:1（900×383）</strong>与<strong className="text-blue-300">次条小图 1:1（200×200 / 900×900）</strong>。点击表格即可直接切换。
      </div>
    </div>
  );
};
