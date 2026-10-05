# 微信公众号老黄历封面图生成器（万年黄历）

专为**微信公众号每日老黄历推文**量身打造的高清封面图排版与生成工具。严格遵循微信公众号 **2.35:1 头条封面（900 × 383）** 与 **1:1 次条小图（900 × 900）** 官方视觉标准，内置「十全十美」东方吉祥意境画卷，彻底去除生硬矩形画框，采用宣纸自然留白与文人落款排版美学。

---

## 🌟 核心特性

- **「十全十美」十大东方吉祥意境主题**：松鹤迎春、五谷丰登、年年有鱼、招财进宝、紫气东来、福寿双全、花开富贵、喜上眉梢、金玉满堂、竹报平安。
- **彻底无框·纯净留白**：摒弃任何沉重木框、金框或矩形色块，文字与印章如书法般自然浮现在宣纸上。
- **公历与农历独立字号滑块**：阳历大字与阴历小字字号完全独立自由调节，支持两行文字间距微调。
- **东方文人印章美学**：支持文人落款印（农历末尾随形钤印）、对角呼应印、左右对称印与纯净留白。
- **故宫文创风底部品牌标识**：支持自定义底部品牌名称（如“万年黄历”），采用宽字距宋体与朱砂印标，距底边距与字号自由微调。
- **一键复制与 2x/3x 高清导出**：直接写入系统剪贴板，秒贴进微信公众号图文后台；或一键下载超清 PNG。
- **自动化无头调用（Headless）友好**：原生支持 URL 参数与 Node.js / Python 无头脚本批量生成。

---

## ⚙️ 默认黄金推荐配置 (Default Configuration)

系统已默认内置了兼具视觉冲击力与文人雅致的黄金排版参数：

```json
{
  "id": "6114",
  "yangli": "2026-09-27",
  "yinli": "丙午(马)年八月十七",
  "accountName": "万年黄历",
  "dateFormat": "cnDate",
  "hierarchy": "yinliPrimary",
  "stampPosition": "tail",
  "textOffsetY": 7,
  "yangliFontSize": 81,
  "yinliFontSize": 51,
  "lineSpacing": 74,
  "showBrand": true,
  "brandText": "万年黄历",
  "brandSubtext": "ALMANAC · 岁序吉辰",
  "brandStyle": "sealBadge",
  "brandOffsetY": 38,
  "brandFontSize": 13,
  "scale": 2,
  "ratio": "2.35:1",
  "theme": "songheSpring"
}
```

### 参数详细说明表：

| 参数字段 | 默认设定值 | 说明与设计意图 |
| :--- | :--- | :--- |
| **主次层级** (`hierarchy`) | `yinliPrimary` | **农历大字为主**（农历干支为主标题，公历为副标题） |
| **日期格式** (`dateFormat`) | `cnDate` | 标准中文直显：`2026年9月27日`（不带“阳历”字样） |
| **垂直微调** (`textOffsetY`) | `+7 px` | 微调 7px，视觉重心恰到好处，避免顶头感 |
| **阳历字号** (`yangliFontSize`) | `81 px` | 公历大字饱满醒目，读者在公众号订阅号列表一眼看清 |
| **阴历字号** (`yinliFontSize`) | `51 px` | 农历干支字号适中舒展，与公历大字形成黄金主从比例 |
| **两行字间距** (`lineSpacing`) | `74 px` | 空间疏朗开阔，呼吸感极强 |
| **印章美学** (`stampPosition`) | `tail` | **文人落款印**：紧随农历末尾随形盖印，自然雅致不板滞 |
| **底部品牌开关** (`showBrand`) | `true` | 开启底部品牌标识展示 |
| **品牌名称文本** (`brandText`) | `万年黄历` | 支持自定义修改为公众号名称或栏目名称 |
| **品牌排版风格** (`brandStyle`) | `sealBadge` | **朱砂印标**：微型朱砂小印 `[歷]` + 宽间距古典宋体 |
| **品牌距底边距** (`brandOffsetY`) | `38 px` | 距画布底端 38px，完美避开微信订阅号卡片遮挡区 |
| **品牌字号** (`brandFontSize`) | `13 px` | 克制精致，彰显权威出版品质 |
| **默认主题** (`theme`) | `songheSpring` | **松鹤迎春**（白羽仙鹤、苍劲青松、宋代水墨天青） |
| **默认尺寸** (`ratio`) | `2.35:1` | 微信头条首图标准（900 × 383 px，2x 导出为 1800 × 766 px） |

---

## 🤖 自动化无头调用（Headless Invocation）代码示例

用于每日定时自动化抓取黄历数据、无人值守自动生成公众号封面图并推送到发布后台。

### 方式一：Node.js + Puppeteer 无头一键批量渲染（最推荐）

适合 Node.js 后端服务、GitHub Actions 或定时任务脚本：

```bash
npm install puppeteer
```

创建 `generate-cover.js`：

```javascript
/**
 * 微信公众号老黄历封面图 - Node.js 无头批量生成脚本
 */
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function generateHuangLiCover({
  yangli = '2026-09-27',
  yinli = '丙午(马)年八月十七',
  brandText = '万年黄历',
  theme = 'songheSpring', // 可选: songheSpring, wuguHarvest, niannianKoi, zhaocaiWealth, ziqiDonglai, fushouShuangquan, huakaiFugui, xishangMeishao, jinyuMantang, zhubaoPingan
  ratio = '2.35:1',      // 2.35:1 (头条大图) 或 1:1 (次条小图)
  outputPath = './laohuangli_cover.png',
  appUrl = 'http://localhost:3000', // 部署的服务端地址或本地地址
}) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // 1. 设置高分屏视口 (Retina 2x 高清)
  await page.setViewport({
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
  });

  // 2. 构建携带黄金配置参数的无头请求 URL
  const queryParams = new URLSearchParams({
    yangli,
    yinli,
    brandText,
    theme,
    ratio,
    hierarchy: 'yinliPrimary',
    textOffsetY: '7',
    yangliFontSize: '81',
    yinliFontSize: '51',
    lineSpacing: '74',
    brandOffsetY: '38',
  });

  const fullUrl = `${appUrl}/?${queryParams.toString()}`;
  console.log(`[Headless] 正在无头加载: ${fullUrl}`);

  await page.goto(fullUrl, { waitUntil: 'networkidle0' });

  // 3. 等待主画布渲染完毕
  await page.waitForSelector('canvas');

  // 4. 直接从页面 Canvas 提取高质量 2x PNG Base64 数据
  const base64Data = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    return canvas ? canvas.toDataURL('image/png') : null;
  });

  if (!base64Data) {
    throw new Error('Canvas 节点未找到或导出失败');
  }

  // 5. 保存到本地文件
  const base64Image = base64Data.replace(/^data:image\/png;base64,/, '');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, base64Image, 'base64');

  console.log(`[Headless] 封面图已成功生成至: ${outputPath}`);
  await browser.close();
}

// 执行生成调用
generateHuangLiCover({
  yangli: '2026-09-27',
  yinli: '丙午(马)年八月十七',
  outputPath: './output/laohuangli_20260927.png',
}).catch(console.error);
```

---

### 方式二：Python + Playwright 自动化推文流水线脚本

适合使用 Python 开发的公众号自动发文机器人、定时推文脚本：

```bash
pip install playwright
playwright install chromium
```

创建 `generate_cover.py`：

```python
"""
微信公众号老黄历封面图 - Python 无头自动化生成脚本
"""
import asyncio
import base64
from pathlib import Path
from urllib.parse import urlencode
from playwright.async_api import async_playwright

async def generate_cover(
    yangli: str = "2026-09-27",
    yinli: str = "丙午(马)年八月十七",
    brand_text: str = "万年黄历",
    theme: str = "songheSpring",
    ratio: str = "2.35:1",
    output_path: str = "./cover.png",
    app_url: str = "http://localhost:3000"
):
    # 采用默认黄金参数
    params = {
        "yangli": yangli,
        "yinli": yinli,
        "brandText": brand_text,
        "theme": theme,
        "ratio": ratio,
        "hierarchy": "yinliPrimary",
        "textOffsetY": 7,
        "yangliFontSize": 81,
        "yinliFontSize": 51,
        "lineSpacing": 74,
        "brandOffsetY": 38,
    }
    target_url = f"{app_url}/?{urlencode(params)}"
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(device_scale_factor=2)
        page = await context.new_page()
        
        print(f"[Python] 加载无头页面: {target_url}")
        await page.goto(target_url, wait_until="networkidle")
        await page.wait_for_selector("canvas")
        
        # 提取 Canvas 生成的图片数据
        data_url = await page.evaluate("document.querySelector('canvas').toDataURL('image/png')")
        _, encoded = data_url.split(",", 1)
        
        # 保存图片
        out_file = Path(output_path)
        out_file.parent.mkdir(parents=True, exist_ok=True)
        out_file.write_bytes(base64.b64decode(encoded))
        
        print(f"[Python] 封面图生成完成: {out_file.resolve()}")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(generate_cover(
        yangli="2026-09-27",
        yinli="丙午(马)年八月十七",
        output_path="./output/huangli_today.png"
    ))
```

---

### 方式三：直接 URL 查询参数调用规范

前端原生支持接收 Query Parameters，直接在链接中指定即可自动预设渲染：

```text
http://localhost:3000/?yangli=2026-09-27&yinli=丙午(马)年八月十七&theme=songheSpring&ratio=2.35:1&hierarchy=yinliPrimary&yangliFontSize=81&yinliFontSize=51&lineSpacing=74&textOffsetY=7&brandOffsetY=38
```

#### 支持的 URL 参数：

- `yangli`: 阳历日期（如 `2026-09-27`）
- `yinli`: 阴历干支（如 `丙午(马)年八月十七`）
- `brandText`: 底部品牌文字（如 `万年黄历`）
- `theme`: 主题标识符（见下文主题表）
- `ratio`: `2.35:1` 或 `1:1`
- `hierarchy`: `yinliPrimary` (农历大字为主) 或 `yangliPrimary`
- `yangliFontSize`: 阳历字号（默认 `81`）
- `yinliFontSize`: 阴历字号（默认 `51`）
- `lineSpacing`: 两行文字间距（默认 `74`）
- `textOffsetY`: 垂直微调（默认 `7`）
- `brandOffsetY`: 底部边距（默认 `38`）

---

## 🎨 十大东方吉祥主题代码与意境一览

在调用参数中指定 `theme` 即可一键更换对应底图意境：

| `theme` 参数值 | 主题名称 | 元素与意境 | 适合推文场景 |
| :--- | :--- | :--- | :--- |
| `songheSpring` | **松鹤迎春** | 苍劲青松 · 白羽仙鹤 · 天青云霭 | 日常老黄历、延年纳福、节庆 |
| `wuguHarvest` | **五谷丰登** | 金黄麦穗 · 秋熟稻浪 · 温暖秋晖 | 丰收时节、秋分立秋、财运吉日 |
| `niannianKoi` | **年年有鱼** | 双尾锦鲤 · 清雅荷花 · 涟漪清波 | 初一十五、转运祈福、开运 |
| `zhaocaiWealth` | **招财进宝** | 玉雕如意 · 铜钱锦带 · 金线祥云 | 求财纳吉、开市开业、动土纳财 |
| `ziqiDonglai` | **紫气东来** | 霞蔚紫云 · 晓风翠竹 · 祥禽瑞霭 | 清晨第一条、鸿运当头、正能量 |
| `fushouShuangquan` | **福寿双全** | 鲜红寿桃 · 灵枝翠叶 · 祥蝠献瑞 | 敬老祝寿、祈安康、平安节气 |
| `huakaiFugui` | **花开富贵** | 雍容牡丹 · 翩跹彩蝶 · 工笔工雅 | 婚嫁合婚、开花结果、大吉大利 |
| `xishangMeishao` | **喜上眉梢** | 傲骨红梅 · 喜鹊登枝 · 水墨飞白 | 喜事盈门、立春除夕、好运连连 |
| `jinyuMantang` | **金玉满堂** | 洁白玉兰 · 幽香金桂 · 暖玉底纹 | 阖家团聚、和气生财、满堂吉庆 |
| `zhubaoPingan` | **竹报平安** | 挺拔青竹 · 苍润露珠 · 天青远山 | 岁岁平安、升学升迁、清雅修身 |

---

## 📐 微信公众号封面图规范与避坑提示

1. **头条封面（大图）规范：2.35 : 1**
   - 官方标准像素为 `900 × 383 px`，系统默认以 **2x 高清导出（1800 × 766 px）**，在视网膜高分屏手机上字体边缘分外锐利。
   - **标题遮挡安全区**：微信在订阅号信息流中会在底部叠加约 25%~28% 的黑色半透明渐变蒙层及图文标题。当前默认配置已将主字居中偏上，并将底部品牌标上提至 `38 px`，确保 100% 避开微信标题遮挡区！
2. **次条封面（小图）规范：1 : 1**
   - 第二条及以后的次条在历史列表或图文卡片中以正方形展现（900 × 900 px），中心留白完全适应各种缩放尺寸。

---

## 🚀 GitHub Pages 自动化部署与在线访问

本项目已配置专属 GitHub Actions 自动化流水线，并完美适配仓库 **`shalom-lab/daily-cover`**：

- **GitHub Pages 在线访问地址**：[https://shalom-lab.github.io/daily-cover/](https://shalom-lab.github.io/daily-cover/)
- **源码仓库**：`shalom-lab/daily-cover`

### 首次启用 GitHub Pages 步骤（只需操作一次）：

1. 打开 GitHub 仓库页面：`https://github.com/shalom-lab/daily-cover`
2. 点击顶部 **Settings**（设置）标签页
3. 在左侧菜单中找到 **Pages**
4. 在 **Build and deployment** 下方的 **Source** 下拉菜单中，选择 **GitHub Actions**
5. 保存后，每次你向 `main` 分支执行 `git push`，项目中的 `.github/workflows/deploy.yml` 就会全自动构建并秒级部署至 GitHub Pages！

---

## 💻 本地运行与二次开发

```bash
# 1. 安装依赖
npm install

# 2. 启动本地开发服务 (默认端口 3000)
npm run dev

# 3. 检查与构建生产版本
npm run build
```

---

## 📄 开源与使用许可

基于 Apache-2.0 协议开源。欢迎自由集成至各类微信公众号自动化运营工具、定时发布流水线与内容管理系统中。
